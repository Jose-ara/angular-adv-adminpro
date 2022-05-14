import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];

  constructor(
    private sidebar: SidebarService
  ) { }

  ngOnInit(): void {
    this.menuItems = this.sidebar.menu;
    console.log('este', this.menuItems);
  }

}
