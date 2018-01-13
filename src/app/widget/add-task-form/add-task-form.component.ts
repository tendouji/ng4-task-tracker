import { Component, OnInit, Renderer } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GlobalDataService } from '../../services/globaldata.services';
import { IMyDpOptions } from 'mydatepicker';
import { BaseUtilities } from '../../services/base.utilities';
import { TaskModal } from './task.model';
import { TaskUtilities } from './task.utilities';
import { FirebaseService } from '../../services/firebase.service';

interface Validator<T extends FormControl> {
  (c:T): {[error: string]:any};
}

@Component({
  selector: 'task-add-task-form',
  templateUrl: './add-task-form.component.html',
  styleUrls: ['./add-task-form.component.scss'],
})
export class AddTaskFormComponent implements OnInit {
  userDataArr;
  categoryDataArr;
  currentUser: number;
  taskPriorityArr: Array<number>;

  datePickerOptions: IMyDpOptions = {
    dateFormat: 'dd-mm-yyyy',
    openSelectorTopOfInput: true, 
    showSelectorArrow : false
  };

  clickedOnce: boolean = false;
  errorMessages: object = {
    'taskName': {
      'blank': 'Please enter a title.',
      'too-short': 'Please enter a longer title.'
    },
    'taskAssignedTo': {
      'blank': 'Please assign a name.'
    },
    'taskCategory': {
      'blank': 'Please select a category.'
    },
    'taskPriority': {
      'blank': 'Please set a priority level.'
    },
    'taskDescription': {
      'blank': 'Please enter a description.',
      'too-short': 'Please enter a longer message.'
    },
    'taskCompletedBy': {
      'blank': 'Please enter a date.'
    }
  };
  taskNameErrorText: string = '';
  taskAssignedToErrorText: string = '';
  taskCategoryErrorText: string = '';
  taskPriorityErrorText: string = '';
  taskDescriptionErrorText: string = '';
  taskCompletedByErrorText: string = '';

  public addTaskForm = new FormGroup({
    taskCreatedBy: new FormControl({ disabled: true }, [Validators.required]),
    taskCreatedById: new FormControl({ disabled: true }, [Validators.required]),
    taskCreatedOn: new FormControl({ disabled: true }, [Validators.required]),
    taskName: new FormControl(null, [Validators.required, Validators.minLength(5)]),
    taskAssignedTo: new FormControl(null, [Validators.required]),
    taskCategory: new FormControl(null, [Validators.required]),
    taskPriority: new FormControl(null, [Validators.required]),
    taskDescription: new FormControl(null, [Validators.required, Validators.minLength(5)]),
    taskCompletedBy: new FormControl(null, [Validators.required])
  });
  
  constructor(
    private renderer: Renderer,
    private globalData: GlobalDataService,
    private firebaseService: FirebaseService
  ) { 
  }
  
  ngOnInit() { 
    this.globalData.routeChange.subscribe(data => {
      if(data) {
        this.initAddTask();
      }
    });
    this.initAddTask();
  }

  initAddTask() {
    this.userDataArr = this.globalData.userData;
    this.currentUser = this.globalData.currentUser;
    this.categoryDataArr = this.globalData.categoryData;
    this.taskPriorityArr = Array.apply(null, { length: this.globalData.taskPriority })
                            .map((n, i) => n = i+1 );

    // set defaults
    this.addTaskForm.controls['taskCreatedBy'].setValue(this.userDataArr[this.currentUser].name, { onlySelf: true });
    this.addTaskForm.controls['taskCreatedById'].setValue(this.userDataArr[this.currentUser].id, { onlySelf: true });
    this.addTaskForm.controls['taskCreatedOn'].setValue(BaseUtilities.getCurrentDate(), { onlySelf: true });
    this.addTaskForm.controls['taskAssignedTo'].setValue(this.currentUser, { onlySelf: true });
    this.addTaskForm.controls['taskCategory'].setValue(0, { onlySelf: true });
    this.addTaskForm.controls['taskPriority'].setValue(this.taskPriorityArr[0], { onlySelf: true });
  }

  setDate(): void {
    // Set today date using the patchValue function
    let date = new Date();
    this.addTaskForm.patchValue({
      taskCompletedBy: {
        date: {
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          day: date.getDate()
        }
      }
    });
  }

  clearDate(): void {
    // Clear the date using the patchValue function
    this.addTaskForm.patchValue({ taskCompletedBy: null });
  }

  doLogin(event) {
    this.clickedOnce = true;
    let submitData = this.addTaskForm.value, 
      submitSuccess = true;

    let taskNameError = this.addTaskForm.controls['taskName'].errors;
    if (taskNameError != null) {
      if (taskNameError.required) this.taskNameErrorText = this.errorMessages['taskName']['blank'];
      if (taskNameError.minlength) this.taskNameErrorText = this.errorMessages['taskName']['too-short'];
      submitSuccess = false;
    }

    let taskAssignedToError = this.addTaskForm.controls['taskAssignedTo'].errors;
    if (taskAssignedToError != null) {
      if (taskAssignedToError.required) this.taskAssignedToErrorText = this.errorMessages['taskAssignedTo']['blank'];
      submitSuccess = false;
    } 

    let taskCategoryError = this.addTaskForm.controls['taskCategory'].errors;
    if (taskCategoryError != null) {
      if (taskCategoryError.required) this.taskCategoryErrorText = this.errorMessages['taskCategory']['blank'];
      submitSuccess = false;
    } 

    let taskPriorityError = this.addTaskForm.controls['taskPriority'].errors;
    if (taskPriorityError != null) {
      if (taskPriorityError.required) this.taskPriorityErrorText = this.errorMessages['taskPriority']['blank'];
      submitSuccess = false;
    } 

    let taskDescriptionError = this.addTaskForm.controls['taskDescription'].errors;
    if (taskDescriptionError != null) {
      if (taskDescriptionError.required) this.taskDescriptionErrorText = this.errorMessages['taskDescription']['blank'];
      if (taskDescriptionError.minlength) this.taskDescriptionErrorText = this.errorMessages['taskDescription']['too-short'];
      submitSuccess = false;
    }

    let taskCompletedByError = this.addTaskForm.controls['taskCompletedBy'].errors;
    if (taskCompletedByError != null) {
      if (taskCompletedByError.required) this.taskCompletedByErrorText = this.errorMessages['taskCompletedBy']['blank'];
      submitSuccess = false;
    } 

    if(submitSuccess) {
      let formattedData: TaskModal.TaskRecord = <TaskModal.TaskRecord>{};
      formattedData.id = TaskUtilities.getHighestID(this.globalData.taskData) + 1;
      formattedData.assignedTo = parseInt(submitData['taskAssignedTo'], 10);
      formattedData.category = parseInt(submitData['taskCategory'], 10);
      formattedData.completed = 1;
      formattedData.createdBy = parseInt(submitData['taskCreatedById'], 10);
      formattedData.dateCompleted = TaskUtilities.getDatePickerDateFormat(submitData['taskCompletedBy']);
      formattedData.dateStarted = submitData['taskCreatedOn'];
      formattedData.description = submitData['taskDescription'];
      formattedData.name = submitData['taskName'];
      formattedData.priority = parseInt(submitData['taskPriority'], 10);

      this.firebaseService.addTaskRecord(formattedData);
    }
  }


  
}