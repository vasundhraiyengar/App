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
  hideDes = {};
  itemName;
  itemDescription;

  constructor(private itemService: ItemService, private route: ActivatedRoute) {
  this.hideDes = {};
  }

  ngOnInit() {
    this.itemService.getItemsById(this.route.snapshot.params.id).subscribe(
      response => this.items = response
    );
  }

  alertDelete(resp){
    if(resp>0){
      alert("Task Completed")
    }else{
      alert("Task not found");
    }

  }

  delete(id) {
    this.itemService.deleteItemById(id).subscribe(
      response => this.alertDelete(response)
    );
    this.ngOnInit();
  }

  addItem() {
    this.itemService.addItem(this.itemName, this.route.snapshot.params.id, this.itemDescription).subscribe(
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
    this.itemService.duplicateItems(this.route.snapshot.params.id).subscribe(
      response => {this.res = response;
        alert(this.res.response);
      },
      Error => {
        alert("Unable to start task. Try again!")
      }
    );
  }
}
