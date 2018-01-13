import { Component, OnInit, Input, OnChanges, ElementRef, ViewChild, Renderer } from '@angular/core';
import { GlobalDataService } from '../../services/globaldata.services';

@Component({
  selector: 'task-dimmer',
  templateUrl: './dimmer.component.html',
  styleUrls: ['./dimmer.component.scss']
})
export class DimmerComponent implements OnInit, OnChanges {
  @ViewChild('dimmer') dimmer: ElementRef;
  @Input('show') show:boolean; 
  
  constructor(
    private renderer: Renderer, 
    private globalData: GlobalDataService
  ) { }
  
  ngOnInit() { }

  ngOnChanges() {
    if(this.show) {
      this.renderer.setElementStyle(this.dimmer.nativeElement, 'display', 'block');
      setTimeout(() => {
        this.renderer.setElementClass(this.dimmer.nativeElement, 'show', this.show);
      }, 0);
      return;
    }
    this.renderer.setElementClass(this.dimmer.nativeElement, 'show', this.show);
    /* setTimeout(() => {
      this.renderer.setElementStyle(this.dimmer.nativeElement, 'display', 'none');
    }, this.globalData.transitionTimeStandard); */
  }

}
