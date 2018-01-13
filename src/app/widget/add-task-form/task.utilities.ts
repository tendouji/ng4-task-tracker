export class TaskUtilities {
  static getHighestID(data: any): number {
    let maxValue: number = 0;
    for(let i in data) {
      maxValue = maxValue > parseInt(data[i].id, 10) ? maxValue : parseInt(data[i].id, 10);
    }
    return maxValue; 
  }

  static getDatePickerDateFormat(obj: any): string {
    return obj['formatted'];
  }
}