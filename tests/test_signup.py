import os
import pytest

from app import app
from app import db as tdb
from models import User
import json

@pytest.fixture(scope="session")
def url(root_url):
    return root_url+'add/user'

@pytest.fixture()
def _test_app():
    app_test = app
    app_test.testing = True
    return app_test.test_client()

@pytest.fixture(scope="session")
def db():
    return tdb

def test_signup(_test_app, db):

    with open('tests/new_user.json') as json_file:
        json_data = json.load(json_file)

    print(json_data)
    response = _test_app.post('http://localhost:5000/api/add/user', json=json_data)

    assert response.status_code == 200
    assert json_of_response(response) == {"response": 'User added'}

    user=db.session.query(User).filter(User.username==json_data['username']).first()

    assert user.id > 0
    assert user.name == json_data['name']

    db.session.delete(user)
    db.session.commit()

def json_of_response(response):
    """Decode json from response"""
    return json.loads(response.data.decode('utf8'))
