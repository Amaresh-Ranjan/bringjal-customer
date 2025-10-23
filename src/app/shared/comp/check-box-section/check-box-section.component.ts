import { Component } from '@angular/core';
import { FullScreenModalComponent } from '../../modal-comp/full-screen-modal/full-screen-modal.component';
import { MediumScreenModalComponent } from '../../modal-comp/medium-screen-modal/medium-screen-modal.component';

@Component({
  selector: 'app-check-box-section',
  standalone: true,
  imports: [FullScreenModalComponent, MediumScreenModalComponent],
  templateUrl: './check-box-section.component.html',
  styleUrl: './check-box-section.component.scss',
})
export class CheckBoxSectionComponent {
  isModalOpen = false;
  isMediumModalOpen = false;

  constructor() {}

  openModal(): void {
    this.isModalOpen = true;
  }
  closeModal(): void {
    this.isModalOpen = false;
  }
  openModalMd(): void {
    this.isMediumModalOpen = true;
  }
  closeModalMd(): void {
    this.isMediumModalOpen = false;
  }
}
