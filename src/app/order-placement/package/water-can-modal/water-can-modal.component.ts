import { Component, Input, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-water-can-modal',
  standalone: true,
  imports: [],
  templateUrl: './water-can-modal.component.html',
  styleUrl: './water-can-modal.component.scss'
})
export class WaterCanModalComponent {
  activeModal = inject(NgbActiveModal);

	@Input() name: string|any;
}
