import { Component, OnInit } from '@angular/core';
import { BubbleComponent } from '../bubble/bubble.component';

interface Bubble {
  id: number;
  size: number;
  x: number;
  y: number;
  delay: number;
}

@Component({
  selector: 'app-background-effect',
  standalone: true,
  imports: [BubbleComponent],
  templateUrl: './background-effect.component.html',
  styleUrls: ['./background-effect.component.scss'],
})
export class BackgroundEffectComponent implements OnInit {
  bubbles: Bubble[] = [];
  bubblesCount = 75;

  ngOnInit() {
    for (let i = 0; i < this.bubblesCount; i++) {
      const bubble = {
        id: i,
        size: parseFloat((Math.random() * 70 + 10).toFixed(1)),
        x: parseFloat((Math.random() * 100).toFixed(1)),
        y: parseFloat((Math.random() * 100).toFixed(1)),
        delay: parseFloat((Math.random() * 5).toFixed(1)),
      };
      this.bubbles.push(bubble);
    }
  }
}
