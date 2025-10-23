import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-trial-component',
  standalone: true,
  imports: [],
  templateUrl: './trial-component.component.html',
  styleUrl: './trial-component.component.scss'
})
export class TrialComponentComponent {
  @ViewChild('card1') card1!: ElementRef;
  @ViewChild('card2') card2!: ElementRef;
  @ViewChild('svg') svg!: ElementRef;

  cards = [
    { id: 1, title: 'Card 1' },
    { id: 2, title: 'Card 2' }
  ];

  constructor() {}

  ngAfterViewInit(): void {
    this.drawLineBetweenCards();
  }

  private drawLineBetweenCards(): void {
    const card1Rect = this.card1.nativeElement.getBoundingClientRect();
    const card2Rect = this.card2.nativeElement.getBoundingClientRect();

    const svg = this.svg.nativeElement;

    const x1 = card1Rect.left + card1Rect.width / 2;
    const y1 = card1Rect.bottom;
    const x2 = card2Rect.left + card2Rect.width / 2;
    const y2 = card2Rect.top;

    svg.innerHTML = `
      <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="black" stroke-width="2" marker-end="url(#arrow)" />
    `;
  }
}
