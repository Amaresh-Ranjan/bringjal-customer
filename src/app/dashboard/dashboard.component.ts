import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet, NavigationEnd, Router } from '@angular/router';
import { SideBarComponent } from './side-bar/side-bar.component';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    SideBarComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  @ViewChild(SideBarComponent) sidebar!: SideBarComponent;
  sidebarExpanded = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Close sidebar when route changes
    this.router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.sidebarExpanded = false;
    });
  }

  // Handle click outside of sidebar
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const sidebarElement = document.querySelector('.sider-bar');
    const toggleButton = document.querySelector('.toggle-button');
    
    // Check if click is outside sidebar and not on toggle button
    if (this.sidebarExpanded && 
        !sidebarElement?.contains(target) && 
        !toggleButton?.contains(target)) {
      this.sidebarExpanded = false;
    }
  }

  // Handle toggle from sidebar
  onToggleSidebar(expanded: boolean) {
    this.sidebarExpanded = expanded;
  }
}
