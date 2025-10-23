import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { DateTime, WeekdayNumbers } from 'luxon';

@Component({
  selector: 'app-deleivery-schedule-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './deleivery-schedule-section.component.html',
  styleUrl: './deleivery-schedule-section.component.scss',
})
export class DeleiveryScheduleSectionComponent {
  @Input() eta: any;
  private sanitizer = inject(DomSanitizer);

  ngOnInit() {
    console.log('deliveryDays ----->>>>>', this.eta);
  }

  // objectKeys(obj: any): string[] {
  //   return Object.keys(obj);
  // }

  // selectedDay: string = '';
  // toggleDropdown(day: string) {
  //   this.selectedDay = this.selectedDay === day ? '' : day;
  // }

  // // Method to check if at least one slot is enabled for a given day
  // hasEnabledSlots(day: string): boolean {
  //   return this.deliveryDays[day]?.slots.some((slot:any) => slot.enable === true);
  // }

  // // Method to generate delivery message
  // generateDeliveryMessage(dayData: any, dayName: string): SafeHtml[] {
  //   const messages: any[] = [];

  //   if (!dayData.enable) {
  //     return messages;
  //   }

  //   for (const slot of dayData.slots) {
  //     if (!slot.enable) {
  //       continue;
  //     }

  //     let deliveryEndTime = DateTime.fromFormat(
  //       slot.deliveryEndTime,
  //       'HH:mm'
  //     ).set({ weekday:this.getWeekdayNumber(dayName) });
  //     deliveryEndTime = deliveryEndTime.plus({ days: slot.slackDays });
  //     const weekName = deliveryEndTime.toFormat('cccc');
  //     const formattedDeliveryEndTime = deliveryEndTime.toFormat('hh:mm a');
  //     const d_nat = DateTime.fromFormat(slot.cutoff, 'HH:mm');
  //     const rawMessage = `
  //      <div
  //               class="max-w-screen mx-auto bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 shadow-lg rounded-lg overflow-hidden mb-6 hover:shadow-2xl transition-shadow duration-300 ease-in-out"
  //             >
  //               <div class="flex flex-col sm:flex-row items-center p-4 sm:p-6">
  //                 <!-- Clock Icon with larger size and smooth hover effect -->
  //                 <i
  //                   class="bi bi-clock text-blue-600 mr-4 text-4xl sm:text-5xl transform transition-transform duration-200 hover:scale-110 mb-4 sm:mb-0"
  //                 ></i>

  //                 <div>
  //                   <!-- Delivery Info Badge with Glow Effect -->
  //                   <div>
  //                     <span
  //                       class="inline-block bg-blue-500 text-white text-xs sm:text-sm font-medium rounded-full px-3 py-1 mr-2 hover:shadow-lg hover:text-blue-100 hover:scale-105 transition-all duration-300 ease-in-out shadow-xl shadow-blue-400/50"
  //                     >
  //                       Delivery Info
  //                     </span>
  //                   </div>

  //                   <!-- Enhanced Text with responsive typography -->
  //                   <p
  //                     class="text-sm sm:text-base text-gray-800 font-semibold leading-relaxed mt-2"
  //                   >
  //                     If order is placed before
  //                     <strong class="text-blue-700"
  //                       >${dayName} ${d_nat.toFormat('hh:mm a')}</strong
  //                     >,
  //                     <br />
  //                     <i class="bi bi-truck mr-2 text-green-600 text-xl"></i>
  //                     you will get delivery before
  //                     <strong class="text-blue-700"
  //                       >${weekName} ${formattedDeliveryEndTime}</strong
  //                     >
  //                   </p>
  //                 </div>
  //               </div>
  //             </div>

  //     `;

  //     // Sanitize and log the sanitized HTML
  //     const sanitizedMessage =
  //       this.sanitizer.bypassSecurityTrustHtml(rawMessage);

  //     messages.push(sanitizedMessage);
  //   }

  //   return messages;
  // }

  // private getWeekdayNumber(dayName: string): WeekdayNumbers {
  //   const days: { [key: string]: WeekdayNumbers } = {
  //     Sunday: 7,
  //     Monday: 1,
  //     Tuesday: 2,
  //     Wednesday: 3,
  //     Thursday: 4,
  //     Friday: 5,
  //     Saturday: 6,
  //   };
  //   return days[dayName];
  // }
}
