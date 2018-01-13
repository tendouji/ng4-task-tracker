import { Component, ElementRef, ViewChild, OnInit, OnChanges, Input } from '@angular/core';
import * as Chart from 'chart.js';
import { ChartModal } from './chart.modal';

@Component({
  selector: 'task-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, OnChanges {

  @Input('dataInput') dataInput: ChartModal.ChartInput;
  @ViewChild('chartCanvas') chartCanvas: ElementRef;
  
  private chart;
  private canvas: any;
  private ctx: any;

  constructor() { }

  ngOnInit() {
    this.canvas = this.chartCanvas.nativeElement;
    this.ctx = this.canvas.getContext('2d');
    this.createChart(this.dataInput);
  }

  createChart(dataInput) {
    if(this.chart instanceof Chart) {
      this.chart.destroy();
    }
    this.chart = new Chart(this.ctx, {
      type: dataInput.type,
      data: dataInput.data,
      options: dataInput.options
    });
  }

  ngOnChanges() {
    if(this.ctx) {
      this.createChart(this.dataInput);
    }
  }
}
