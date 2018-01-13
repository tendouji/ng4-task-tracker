import { Injectable, EventEmitter } from '@angular/core';
import {  } from 'selenium-webdriver';

interface UserData {
  id: string;
  email: string;
  name: string;
  position: string;
}

@Injectable()
export class GlobalDataService {
  // general web behaviour 
  transitionTimeStandard: number = 200; //same as CSS variable
  paddingLarge: number = 16; //in em same as CSS variable

  // user data
  userData: Array<UserData> = [];
  currentUser: number = 0;

  // category data
  categoryData: Array<any> = [];

  // monthly achievements data
  monthlyAchievementData: Array<any> = [];

  // task data
  taskData: Array<any> = [];
  taskPriority: number = 5; // 1 to 5 levels

  routeChange: EventEmitter<any> = new EventEmitter();
}
