import { Component, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-the-ultimate-guide-to-water-intake',
  standalone: true,
  imports: [],
  templateUrl: './the-ultimate-guide-to-water-intake.component.html',
  styleUrl: './the-ultimate-guide-to-water-intake.component.scss'
})
export class TheUltimateGuideToWaterIntakeComponent {
  titleService = inject(Title);
  meta = inject(Meta);

  ngOnInit(){
    this.titleService.setTitle("The Ultimate Guide to Water Intake from Mineral Water Home Delivery Service Online Near You - Order Water doorstep");
    this.meta.updateTag({ name: 'description', content: "Here at BringJal, we totally get that drinking mineral water is like, super important for your health and stuff. With our water can delivery service, you can have fresh, clean 20 litre delivered right to your door, so you don't have to worry about finding a water source nearby. And hey, knowing that we can help you and your fam stay hydrated makes us feel all warm and fuzzy inside. Cheers to a hydrated and healthy lifestyle!"});
    this.meta.updateTag({name: 'image', content: "https://res.cloudinary.com/dug99qncm/image/upload/c_thumb,q_auto:low,w_521/"})
  }


}
