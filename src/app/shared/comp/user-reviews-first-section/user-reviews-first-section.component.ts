import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';

interface Testimonial {
  image: string;
  text: string;
  name: string;
}

@Component({
  selector: 'app-user-reviews-first-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-reviews-first-section.component.html',
  styleUrls: ['./user-reviews-first-section.component.scss'],
})
export class UserReviewsFirstSectionComponent
  implements AfterViewInit, OnDestroy, OnInit
{
  testimonials: Testimonial[] = [
    {
      image:
        'https://res.cloudinary.com/dug99qncm/image/upload/q_auto:eco,f_auto,w_500,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1598616775/website/bringjal_customer_hemalatha_sridhar.jpg',
      text: "Had bad experience with Bisleri water delivery service. Googled about other water services in our area when I stumbled upon Bringjal. Didn't know anything about it and called about delivery to our place in Mahadevapura. I got water the same day and whenever I have placed an order, I get it the same day.",
      name: 'Hemalatha Sridhar',
    },
    {
      image:
        'https://res.cloudinary.com/dug99qncm/image/upload/q_auto:eco,f_auto,w_500,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1598616775/website/bringjal_customer_priyanka_moktan.jpg',
      text: "It's was a great relief when I got to know about Bringjal when I visited a friends house. The local 20 litre Bisleri water that I had been ordering was not meeting the quality and hygiene standards.",
      name: 'Priyanka Moktan',
    },
    {
      image:
        'https://res.cloudinary.com/dug99qncm/image/upload/q_auto:eco,f_auto,w_500,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1598616775/website/bringjal_customer_sayani_basu.jpg',
      text: 'I have been taking the service for more than 4 months now and I must give 5 star. Ordering water cans is made hassle free with just a press on a device. Water quality is brilliant, cans are sanitised and I appreciate the polite behaviour of the team.',
      name: 'Sayini Basu',
    },
    {
      image: 'https://picsum.photos/1024/1024/?random=1',
      text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est consequuntur accusantium eveniet quas soluta maxime quod fuga animi aspernatur sapiente, repellendus ducimus, pariatur eius aut vel sunt, tenetur cumque placeat.Laudantium quam impedit odit quo, soluta omnis autem similique velit perspiciatis magni accusantium harum necessitatibus! Neque, laborum inventore nam repellat earum deleniti quaerat tempore aut voluptas eius, quia debitis modi.',
      name: 'Sudheer Kumar',
    },
    {
      image: 'https://picsum.photos/1024/1024/?random=2',
      text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas suscipit sunt illum impedit eligendi, nulla, dolorem vel illo dolorum qui beatae enim quisquam dicta quis minus officiis? Ipsam, accusantium libero?Facilis dicta tempore fugit fugiat laboriosam! Officia id omnis odio sint excepturi ipsum asperiores maiores quia architecto! Libero nostrum dolorem veniam non, quisquam laboriosam nisi iste error doloribus aliquam! Temporibus.Laborum vel esse expedita illum recusandae, minima reprehenderit modi ipsa similique repellendus cumque unde quasi autem ducimus, praesentium, animi cum saepe exercitationem earum.Temporibus voluptate, dolorem iure voluptatibus enim aspernatur.Qui magni quas, hic nisi maiores cupiditate consectetur.Nihil recusandae iusto esse temporibus deleniti fugit aut, repudiandae ut ullam eos reprehenderit? Dolorum harum non sequi qui quod tempora ad provident.',
      name: 'Emily Smith',
    },
    {
      image: 'https://picsum.photos/1024/1024/?random=3',
      text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia repellat dolorem officiis accusantium odit. Quasi, corporis sunt. Harum, omnis quibusdam praesentium repellendus, alias nihil quidem non soluta perspiciatis officiis voluptatum.',
      name: 'John Doe',
    },
  ];
  ngOnInit(): void {
    console.log('testimonials are ==>>', this.testimonials);
  }
  @ViewChild('container') containerRef!: ElementRef;
  @ViewChild('slider') sliderRef!: ElementRef;

  currentIndex = 0;
  translateX = 0;
  private autoScrollInterval: any;

  ngAfterViewInit() {
    this.startAutoScroll();
    window.addEventListener('resize', () => this.updateTranslateX());
  }

  ngOnDestroy() {
    this.stopAutoScroll();
  }

  private startAutoScroll() {
    this.autoScrollInterval = setInterval(() => {
      if (this.currentIndex < this.testimonials.length - 1) {
        this.nextSlide();
      } else {
        this.currentIndex = 0;
        this.updateTranslateX();
      }
    }, 5000);
  }

  private stopAutoScroll() {
    if (this.autoScrollInterval) {
      clearInterval(this.autoScrollInterval);
    }
  }

  prevSlide() {
    this.stopAutoScroll();
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updateTranslateX();
    }
    this.startAutoScroll();
  }

  nextSlide() {
    this.stopAutoScroll();
    if (this.currentIndex < this.testimonials.length - 1) {
      this.currentIndex++;
      this.updateTranslateX();
    }
    this.startAutoScroll();
  }

  private updateTranslateX() {
    this.translateX = -100 * this.currentIndex;
  }
}
