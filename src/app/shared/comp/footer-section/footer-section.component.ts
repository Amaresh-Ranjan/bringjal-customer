import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer-section',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './footer-section.component.html',
  styleUrl: './footer-section.component.scss',
})
export class FooterSectionComponent {
  footerInfo = {
    socialLinks: [
      { platform: 'Website', url: 'https://bringjal.com', icon: 'bi-globe' },
      {
        platform: 'Whatsapp',
        url: 'https://wa.me/918801063999',
        icon: 'bi-whatsapp',
      },

      {
        platform: 'instagram',
        url: 'https://www.instagram.com/bringjal/',
        icon: 'bi-instagram',
      },
      {
        platform: 'facebook',
        url: 'https://www.facebook.com/Bringjal',
        icon: 'bi-facebook',
      },
      {
        platform: 'twitter',
        url: 'https://twitter.com/BringJal',
        icon: 'bi-twitter',
      },
      {
        platform: 'youtube',
        url: 'https://www.youtube.com/channel/UCyZ8iHbupDaaSioXoEIdg8Q',
        icon: 'bi-youtube',
      },
      {
        platform: 'linkedin',
        url: 'https://in.linkedin.com/company/bringjal-innovations-pvt-ltd',
        icon: 'bi-linkedin',
      },
    ],
    companyLinks: [
      { label: 'About us', url: '/info/about-us' },
      {
        label: 'Partner with us',
        url: 'https://goo.gl/forms/0K1bAFZ2iATILNvE2',
      },
      {
        label: 'Deliver with us',
        url: 'https://goo.gl/forms/h3pyK8yKL4LDUrpB2',
      },
    ],
    legalLinks: [
      { label: 'Terms & conditions', url: '/info/terms' },
      { label: 'Refund & Cancellation', url: '/info/refund' },
      { label: 'Privacy policy', url: '/info/privacy' },
      { label: 'Disclaimer', url: '/info/disclaimer' },
    ],
    contact: {
      phone: '+918801063999',
      email: 'info@bringjal.com',
    },
    address: {
      company: 'Bringjal Innovations Pvt. Ltd.',
      line1: '2nd Main Road, Vignan Nagar,',
      line2: 'Bangalore - 560075',
    },
  };

  copyright: any;

  ngOnInit(): void {
    this.updateIST();
  }

  updateIST(): void {
    setInterval(() => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        weekday: 'long',
      };
      const currentDate = new Date().toLocaleString('en-IN', options);
      this.copyright = `© ${new Date().getFullYear()} Copyright: Bringjal Innovations Pvt. Ltd. All rights reserved. - ${currentDate}`;
    }, 1000);
  }
}
