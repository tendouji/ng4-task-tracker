import { Component, OnInit } from '@angular/core';
import { GlobalDataService } from '../../services/globaldata.services';

@Component({
  selector: 'task-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  userDataArr: Array<any>;

  constructor(public globalData: GlobalDataService) { }

  ngOnInit() {
    this.globalData.routeChange.subscribe(data => {
      if (data) {
        this.userDataArr = this.globalData.userData;
      }
    });
    
    this.userDataArr = this.globalData.userData;
  }

}
