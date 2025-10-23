import { trigger, transition, style, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-full-screen-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './full-screen-modal.component.html',
  styleUrl: './full-screen-modal.component.scss',
  animations: [
    trigger('modalAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.95)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
      transition(':leave', [
        animate(
          '150ms ease-in',
          style({ opacity: 0, transform: 'scale(0.95)' })
        ),
      ]),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FullScreenModalComponent {
  @Input() isOpen = false;
  @Input() title = 'Modal Title';
  @Input() showCancelButton = true;
  @Input() cancelButtonText = 'Cancel';

  @Output() closeModal = new EventEmitter<void>();

  onBackdropClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (target.classList.contains('bg-opacity-5')) {
      this.close();
    }
  }

  close(): void {
    this.closeModal.emit();
  }
}
