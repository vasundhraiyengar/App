import { Component, OnInit } from '@angular/core';
import {ItemService} from '../item.service';
import{ActivatedRoute} from'@angular/router';
import {Router} from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  res;
  item;
  itemName;
  itemDescription;

  constructor(private itemService: ItemService, private router: Router, private route: ActivatedRoute) {  }

  ngOnInit() {
    this.itemService.getItemDetails(this.route.snapshot.params.id).subscribe(
      response => {
        console.log(response);
        this.item = response;
        console.log(this.item);
      }
    );
  }

  editItem() {
    this.itemService.editItem(this.route.snapshot.params.id, this.itemName, this.itemDescription).subscribe(
      response => {this.res = response;
      alert(this.res.response);
      this.router.navigate(["dashboard/"+this.item.user_id]);
      },
      Error => {
        alert("Unable to edit task. Try again!")
      }
    );
  }

}
