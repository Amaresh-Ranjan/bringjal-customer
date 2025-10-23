import { Component, Input } from '@angular/core';
import { RelativeDatePipe } from '../../pipes/luxondate.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-details-section',
  standalone: true,
  imports: [RelativeDatePipe, CommonModule],
  templateUrl: './order-details-section.component.html',
  styleUrl: './order-details-section.component.scss',
})
export class OrderDetailsSectionComponent {
  @Input() order: any;

  ngOnInit() {
    console.log('order', this.order);
  }
}