import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'task-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @ViewChild('sidebar') sidebar: ElementRef;
  
  isMenuOpen: boolean = false; 

  constructor(
    private renderer: Renderer2
  ) { }

  ngOnInit() {
  }

  showHideMenu() {
    if (!this.isMenuOpen) {
      this.renderer.addClass(this.sidebar.nativeElement, 'show');
      this.isMenuOpen = true;
      return;
    }
    this.renderer.removeClass(this.sidebar.nativeElement, 'show');
    this.isMenuOpen = false;
  }

}
