import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as Chart from 'chart.js';
import { GlobalDataService } from '../../services/globaldata.services';
import { ChartModal } from '../../widget/chart/chart.modal';
import { BaseUtilities } from '../../services/base.utilities';
import { FirebaseService } from '../../services/firebase.service';
import { ActivatedRoute, Router, ParamMap, NavigationEnd } from '@angular/router';

@Component({
  selector: 'task-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  userDataArr: Array<any> = [];
  taskDataArr: Array<any> = [];
  monthDataArr: Array<any> = [];
  categoryDataArr: Array<any> = [];
  
  tasksCategoryOfMonthData: ChartModal.ChartInput;
  userTasksProgressData: ChartModal.ChartInput;
  monthlyAchievementData: ChartModal.ChartInput;
  
  currentUser: number = 0;
  currentYear: string = '2017';
  paramId: number;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,    
    public fireDB: AngularFireDatabase,
    private globalData: GlobalDataService,
    private firebaseService: FirebaseService
  ) { }

  ngOnInit() {
    this.router.events.subscribe((val) => {
      if(val instanceof NavigationEnd) {
        this.initDashboard();
      }
    });

    this.firebaseService.taskAddedEvent.subscribe(data => {
      if (data) {
        this.initDashboard();
      }
    }) 

    this.initDashboard();
  }

  initDashboard() {
    this.userDataArr = this.globalData.userData;
    this.categoryDataArr = this.globalData.categoryData;
    this.monthDataArr = this.globalData.monthlyAchievementData;
    this.taskDataArr = this.globalData.taskData;

    this.paramId = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    if (isNaN(this.paramId)) {
      this.paramId = this.currentUser;
    }
    this.currentUser = this.paramId;
    this.globalData.currentUser = this.currentUser;
    this.globalData.routeChange.emit(true);

    this.generateTasksCategoryOfMonthData();
    this.generateUserTasksProgress();
    this.generateMonthlyAchievementData(this.currentYear);
  }

  generateTasksCategoryOfMonthData() {
    let labelArr: Array<any> = [],
      dataArr: Array<any> = [],
      backgroundColorArr: Array<any> = [];
    
    for(let item of this.taskDataArr) {
      let categoryName = this.categoryDataArr[item.category].name;
      if (labelArr.indexOf(categoryName) < 0) {
        labelArr.push(categoryName);
        backgroundColorArr.push(ChartModal.ChartColorList[labelArr.length - 1]);
        dataArr[labelArr.length-1] = 1;
      } else {
        dataArr[labelArr.indexOf(categoryName)]++;
      }
    }

    let chartInput: ChartModal.ChartInput = <ChartModal.ChartInput>{};
    chartInput.type = (ChartModal.ChartType[ChartModal.ChartType.Bar]).toLowerCase();

    let data: ChartModal.ChartData = <ChartModal.ChartData>{};
    data.labels = labelArr;

    let dataSet: ChartModal.ChartDataSet = <ChartModal.ChartDataSet>{};
    dataSet.label = '# of tasks for the month';
    dataSet.data = dataArr;
    dataSet.backgroundColor = backgroundColorArr;
    data.datasets = [dataSet];

    chartInput.data = data;
    chartInput.options = {
      layout: {
        padding: ChartModal.ChartPadding
      }, 
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        xAxes: [],
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    };

    this.tasksCategoryOfMonthData = chartInput;
  }

  generateUserTasksProgress() {
    let labelArr: Array<any> = [],
      dataSetLabel = [
        { name: 'Remaining Time', data: [] }, 
        { name: 'Completed', data: [] }
      ];
    
    for (let item of this.taskDataArr) {
      if (parseInt(item['assignedTo']) != this.currentUser) {
        continue;
      }

      labelArr.push(item.name);
      dataSetLabel[1].data.push(item.completed);

      let fullTime = BaseUtilities.getDaysBetween(item['dateStarted'], item['dateCompleted']),
        remainingTime = BaseUtilities.getDaysBetween(new Date(), item['dateCompleted']);
      dataSetLabel[0].data.push(Math.round(remainingTime / fullTime * 100));
    }

    let chartInput: ChartModal.ChartInput = <ChartModal.ChartInput>{};
    chartInput.type = (ChartModal.ChartType[ChartModal.ChartType.Bar]).toLowerCase();

    let data: ChartModal.ChartData = <ChartModal.ChartData>{};
    data.labels = labelArr;
    data.datasets = [];
    
    for (let i in dataSetLabel) {
      let dataSet: ChartModal.ChartDataSet = <ChartModal.ChartDataSet>{};
      dataSet.label = dataSetLabel[i].name;
      dataSet.data = dataSetLabel[i].data;
      dataSet.backgroundColor = ChartModal.ChartColorList[i];
      data.datasets.push(dataSet);
    }

    chartInput.data = data;
    chartInput.options = {
      layout: {
        padding: 5
      },
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        xAxes: [],
        yAxes: [{
          ticks: {
            beginAtZero: true,
            max: 100
          }
        }]
      }
    };

    this.userTasksProgressData = chartInput; 
  } 

  generateMonthlyAchievementData(year: string, update?: boolean) {
    let chartTitle: string = 'Monthly Achievements',
      labelArr: Array<any> = [], 
      dataSetArr: Array<ChartModal.ChartDataSet> = [];

    let userData = this.monthDataArr.filter((data) => {
      return data.user == this.currentUser;
    });

    let userAchievedData = userData[0].achieved, 
      progressData = userAchievedData.filter((data) => {
        return data.year == year;
    });

    for (let i in progressData[0].count) {
      labelArr.push(ChartModal.MonthList[i]);
    }

    let dataSet: ChartModal.ChartDataSet = <ChartModal.ChartDataSet>{}; 
    dataSet.label = chartTitle;
    let randomNum = BaseUtilities.generateRandomNum(0, ChartModal.ChartColorList.length-1);
    dataSet.backgroundColor = ChartModal.ChartColorList[randomNum];
    dataSet.borderColor = ChartModal.ChartColorList[randomNum];
    dataSet.data = progressData[0].count;
    dataSet.fill = false;

    dataSetArr.push(dataSet);

    let chartInput: ChartModal.ChartInput = <ChartModal.ChartInput>{};
    chartInput.type = (ChartModal.ChartType[ChartModal.ChartType.Line]).toLowerCase();

    let data: ChartModal.ChartData = <ChartModal.ChartData>{};
    data.labels = labelArr;
    data.datasets = dataSetArr;
    chartInput.data = data;

    chartInput.options = {
      layout: {
        padding: 5
      },
      responsive: true,
      maintainAspectRatio: false,
      title: {
        display: true,
        text: chartTitle
      },
      tooltips: {
        mode: 'index',
        intersect: false,
      },
      hover: {
        mode: 'nearest',
        intersect: true
      },
      scales: {
        xAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Month'
          }
        }],
        yAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Tasks completed'
          }
        }]
      }
    };

    this.monthlyAchievementData = chartInput; 
  } 

  changeMonthlyAchievement(evt) {
    this.currentYear = evt.target.value;
    this.generateMonthlyAchievementData(this.currentYear, true);
  }

}
