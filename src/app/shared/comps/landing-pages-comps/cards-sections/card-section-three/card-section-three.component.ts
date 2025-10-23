import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-card-section-three',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-section-three.component.html',
  styleUrl: './card-section-three.component.scss'
})
export class CardSectionThreeComponent {
  constructor() { }
  // Array of card data
  cards = [
    {
      "title": "Excel Essentials: Get Started Right",
      "content": "Master Excel basics: navigation, formatting, data entry in one workshop."
    },
    // {
    //   "title": "Introduction to Python Programming",
    //   "content": "Learn Python fundamentals: syntax, variables, loops, and functions in a beginner-friendly course."
    // },
    // {
    //   "title": "Mastering PowerPoint Presentations",
    //   "content": "Create impactful presentations with design tips, transitions, and advanced features in PowerPoint."
    // },
    // {
    //   "title": "Getting Started with SQL",
    //   "content": "Understand SQL queries, database design, and data manipulation to manage databases effectively."
    // },
    // {
    //   "title": "Basics of Digital Marketing",
    //   "content": "Explore digital marketing strategies including SEO, content marketing, and social media for business growth."
    // },
    // {
    //   "title": "Fundamentals of JavaScript",
    //   "content": "Learn JavaScript essentials: syntax, functions, and DOM manipulation for web development."
    // },
    // {
    //   "title": "Introduction to Graphic Design",
    //   "content": "Discover graphic design principles, tools, and techniques for creating visual content."
    // },
    // {
    //   "title": "Getting Started with Data Analysis",
    //   "content": "Analyze data using tools like Excel and Python to extract valuable insights."
    // },
    // {
    //   "title": "Fundamentals of Project Management",
    //   "content": "Understand key project management concepts, tools, and techniques for successful project execution."
    // },
    // {
    //   "title": "Basics of Web Development",
    //   "content": "Learn HTML, CSS, and JavaScript basics to build and style functional websites."
    // }
  ]


  // Index of the currently open card
  activeCardIndex: number | null = null;

  // Toggle card visibility
  toggleCard(index: number): void {
    // If the same card is clicked, close it
    if (this.activeCardIndex === index) {
      this.activeCardIndex = null;
    } else {
      // Otherwise, open the clicked card and close any other open cards
      this.activeCardIndex = index;
    }
  }
}
