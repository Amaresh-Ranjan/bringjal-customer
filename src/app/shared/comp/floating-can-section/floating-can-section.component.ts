import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  message: string;
}

@Component({
  selector: 'app-floating-can-section',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './floating-can-section.component.html',
  styleUrls: ['./floating-can-section.component.scss'],
})
export class FloatingCanSectionComponent {
  contactForm: ContactForm = {
    name: '',
    email: '',
    phone: '',
    message: ''
  };

  onSubmit() {
    console.log('Form submitted:', this.contactForm);
    // Add your form submission logic here
    // You can integrate with your backend API
  }
}
