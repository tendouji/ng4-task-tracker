import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';


import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'task-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  items: FirebaseListObservable<any[]>;
  
  constructor(public fireDB: AngularFireDatabase ) { }

  ngOnInit() {
  }

}
