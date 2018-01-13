export class BaseUtilities {
  static parseDate(str: any): any {
    if (str instanceof Date) return str;

    let mdy = str.split('-');
    return new Date(+mdy[2], +mdy[1] - 1, +mdy[0]); //yyyy, mm, dd
  }

  static getDaysBetween(startDate: any, endDate: any) {
    let millisecondsPerDay = 24 * 60 * 60 * 1000;
    return Math.round((this.parseDate(endDate) - this.parseDate(startDate)) / millisecondsPerDay);
  } 

  static generateRandomNum(startRange: number, endRange: number): number {
    return Math.floor(Math.random() * (endRange - startRange + 1) + startRange);
  }

  static getCurrentDate(): string {
    let date = new Date();
    return this.leadingZero(date.getDate(), 2) + '-' + 
            this.leadingZero(date.getMonth()+1, 2) + '-' + 
            date.getFullYear();
  }

  static leadingZero(num: number, size: number): string {
    var s = "000000000" + num.toString();
    return s.substr(s.length - size);
  }
}