import { Component } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { FirebaseService } from './services/firebase.service';
import { GlobalDataService } from './services/globaldata.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  allDataLoaded: boolean = false;

  constructor(
    private globalData: GlobalDataService,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit() {
    // load data first and set to global
    // users
    this.firebaseService.loadData('users').subscribe(data => {
      this.globalData.userData = data;
      this.checkDataLoaded();
    });

    // categories
    this.firebaseService.loadData('categories').subscribe(data => {
      this.globalData.categoryData = data;
      this.checkDataLoaded();
    });

    // monthly-achievements
    this.firebaseService.loadData('monthly-achievements').subscribe(data => {
      this.globalData.monthlyAchievementData = data;
      this.checkDataLoaded();
    });

    // task-items
    this.firebaseService.loadData('task-items').subscribe(data => {
      this.globalData.taskData = data;
      this.checkDataLoaded();
    });
  }
  
  checkDataLoaded() {
    this.allDataLoaded = ( (this.globalData.userData.length > 0) &&
      (this.globalData.categoryData.length > 0) &&
      (this.globalData.monthlyAchievementData.length > 0) &&
      (this.globalData.taskData.length > 0) );
  }
}
