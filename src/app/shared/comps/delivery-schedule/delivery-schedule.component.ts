import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { timePipe } from '../../pipes/luxontime.pipe';

@Component({
  selector: 'app-delivery-schedule',
  standalone: true,
  imports: [CommonModule, timePipe],
  templateUrl: './delivery-schedule.component.html',
  styleUrl: './delivery-schedule.component.scss'
})
export class DeliveryScheduleComponent {
@Input() deliveryDays: any;
}
