import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-bubble',
  standalone: true,
  imports: [],
  templateUrl: './bubble.component.html',
  styleUrl: './bubble.component.scss'
})
export class BubbleComponent {
  @Input() size!: number;
  @Input() x!: number;
  @Input() y!: number;
  @Input() delay!: number;
}
