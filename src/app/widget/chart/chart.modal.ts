export module ChartModal {
  export const MonthList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  export const ChartPadding: number = 20;
  
  export const ChartColorList: Array<string> = [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)'
  ];
  
  export enum ChartType {
    Line = 0,
    Bar = 1,
    Radar = 2,
    Doughnut = 3,
    Pie = 4
  }
  
  export interface ChartInput {
    type: string,
    data: ChartData,
    options?: any
  }

  export interface ChartData {
    labels: Array<string>,
    datasets: Array<ChartDataSet>
  }

  export interface ChartDataSet {
    label: string,
    data: Array<number>,
    backgroundColor?: Array<string> | string,
    fillColor?: string,
    borderColor?: Array<string> | string,
    borderWidth?: number,
    fill?: boolean
  }
}