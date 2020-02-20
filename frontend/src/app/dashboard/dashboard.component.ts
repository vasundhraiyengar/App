import {ItemService} from '../item.service';
import { Component, OnInit } from '@angular/core';
import{ActivatedRoute} from'@angular/router';
// import {Router} from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  items;
  res;
  additem;
  hide_des = {};
  item_name;
  item_description;
  // edit_description;

  constructor(private itemService: ItemService, private route: ActivatedRoute) {
  this.hide_des = {};
  }

  ngOnInit() {
    this.itemService.get_items_by_id(this.route.snapshot.params.id).subscribe(
      response => this.items = response
    );
  }

  alert_delete(resp){
    if(resp>0){
      alert("Task Completed")
    }else{
      alert("Task not found");
    }

  }

  delete(id) {
    this.itemService.delete_item_by_id(id).subscribe(
      response => this.alert_delete(response)
    );
    this.ngOnInit();
  }

  add_item() {
    this.itemService.add_item(this.item_name, this.route.snapshot.params.id, this.item_description).subscribe(
      response => {this.res = response;
      alert(this.res.response);
      this.ngOnInit();},
      Error => {
        alert("Unable to add task. Try again!")
        this.ngOnInit();
      }
    );

  }

  duplicate(){
    this.itemService.duplicate_items(this.route.snapshot.params.id).subscribe(
      response => {this.res = response;
        alert(this.res.response);
      },
      Error => {
        alert("Unable to start task. Try again!")
      }
    );
  }
}
