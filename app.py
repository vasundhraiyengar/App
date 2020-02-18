from flask import Flask, request,jsonify
from flask_sqlalchemy import SQLAlchemy
import os
from flask_cors import CORS, cross_origin
# from celery import Celery
import time
from flask_celery import celery, db


app = Flask(__name__)
app.app_context().push()
app.config.from_object(os.environ['APP_SETTINGS'])
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)
CORS(app)

celery.init_app(app)
celery.conf.update(app.config)


from models import User, Item

@celery.task
def long_task(id):
    time.sleep(10)
    items=Item.query.filter_by(user_id=id)
    items_to_add=[]
    for item in items:
        temp=Item(
            user_id=item.user_id,
            name=item.name,
            description=item.description
        )
        items_to_add.append(temp)
    db.session.bulk_save_objects(items_to_add)
    db.session.commit()


@app.route('/api/duplicate/items', methods=['POST'])
def duplicate():
    text=request.json
    id=text['id']
    task = long_task.delay(id)
    return jsonify({"response":"Duplication started"})

@app.route("/api/add/user", methods=['POST'])
def add_user():
    text=request.json
    name=text['name']
    username=text['username']
    password=text['password']
    try:
        user=User(
            name=name,
            username=username,
            password=password
        )
        db.session.add(user)
        db.session.commit()
        return jsonify({"response":"User added"})
    except Exception as e:
	    return(str(e))

@app.route("/api/get/userid/<username>")
def get_id_by_name(username):
    try:
        user=User.query.filter_by(username=username).first()
        return jsonify(user.serialize())
    except Exception as e:
	    return(str(e))

@app.route("/api/add/item", methods=['POST'])
def add_item():
    text=request.json
    name=text['name']
    user_id=text['user_id']
    description=text['description']
    try:
        item=Item(
            user_id=user_id,
            name=name,
            description=description
        )
        db.session.add(item)
        db.session.commit()
        return jsonify({"response":"Task added"})
    except Exception as e:
	    return(str(e))


@app.route("/api/get/<id>")
def get_items_by_id(id):
    try:
        items=Item.query.filter_by(user_id=id)
        return  jsonify([e.serialize() for e in items])
    except Exception as e:
	    return(str(e))

@app.route("/api/get/item/<id>")
def get_item_details(id):
    try:
        item=Item.query.filter_by(id=id).first()
        return jsonify(item.serialize())
    except Exception as e:
	    return(str(e))


@app.route("/api/delete/item/<id>")
def delete_item_by_id(id):
    try:
        item=Item.query.filter_by(id=id).delete()
        db.session.commit()
        return str(item)
    except Exception as e:
	    return(str(e))

@app.route("/api/edit/item", methods=['POST'])
def edit_item():
    text=request.json
    id=text['id']
    name=text['name']
    description=text['description']
    item=Item.query.filter_by(id=id).first()
    try:
        item.name = name
        item.description = description
        db.session.commit()
        return jsonify({"response":"Task edited"})
    except Exception as e:
	    return(str(e))


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
