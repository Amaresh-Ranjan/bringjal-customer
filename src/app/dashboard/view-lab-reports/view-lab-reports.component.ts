import { Component } from '@angular/core';

@Component({
  selector: 'app-view-lab-reports',
  standalone: true,
  imports: [],
  templateUrl: './view-lab-reports.component.html',
  styleUrl: './view-lab-reports.component.scss'
})
export class ViewLabReportsComponent {

  public myAngularxQrCode: string|any = null;
  constructor () {
  }
}
