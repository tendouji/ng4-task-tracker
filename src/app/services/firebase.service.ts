import { Injectable, EventEmitter } from '@angular/core';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { GlobalDataService } from './globaldata.services';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class FirebaseService {
  taskAddedEvent: EventEmitter<any> = new EventEmitter();
  
  listItems: FirebaseListObservable<any[]>;
  
  taskItems: FirebaseListObservable<any[]>;
  taskDataArr: Array<any> = [];

  constructor(
    private fireDB: AngularFireDatabase,
    private globalData: GlobalDataService    
  ) {
  }

  loadData(path: string): Observable<any> {
    this.listItems = this.fireDB.list('/' + path);
    return new Observable(observable => {
      this.listItems.subscribe(data => {
        if (!data) return Observable.throw('No Data');
        observable.next(data);
        observable.complete();
      });
    });
  }

  addTaskRecord(item: any) {
    this.taskItems = this.fireDB.list('/task-items');
    this.taskItems.push(item);
    this.taskAddedEvent.emit(true);

    this.taskItems.subscribe(taskData => {
      if (!taskData) return;
      this.taskDataArr = taskData;
      this.globalData.taskData = this.taskDataArr;
    });
    
    return 'success';
  }
}
