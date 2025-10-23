import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { RelativeDatePipe } from '../shared/pipes/luxondate.pipe';
import { HttpClient } from '@angular/common/http';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [CommonModule, RelativeDatePipe],
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss'],
})
export class InvoiceComponent {
  OriginalInvoiceTemplate: boolean = true;
  @ViewChild('invoiceContent') invoiceContent!: ElementRef;
  invoiceEntries: any[] = [];
  allInvoices: any[] = [];
  totalAmount: any;
  totalInWords: any;
  totalQuantity: any;
  constructor(private _http: HttpClient) { }
  ngOnInit(): void {
    this.getAllEntries();
    this.getAllInvoices();
    this.calculateTotalAmount();
    this.calculateTotalQuantity(); // Calculate total quantity
    this.totalInWords = this.convertNumberToWords(this.totalAmount);
  }
  // Download the invoice as a PDF
  // 1
  // downloadPDF(): void {
  //   const element = this.invoiceContent.nativeElement;

  //   html2canvas(element, { scale: 2 }).then((canvas) => {
  //     const imgData = canvas.toDataURL('image/jpeg', 1); // Adjust quality for compression
  //     const pdf = new jsPDF('p', 'mm', 'a4'); // Portrait, millimeters, A4 size

  //     const imgWidth = 210; // A4 width in mm
  //     const pageHeight = 295; // A4 height in mm
  //     const imgHeight = (canvas.height * imgWidth) / canvas.width; // Calculate image height

  //     let heightLeft = imgHeight;
  //     let position = 0;

  //     while (heightLeft > 0) {
  //       pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
  //       heightLeft -= pageHeight;
  //       position -= pageHeight;

  //       if (heightLeft > 0) {
  //         pdf.addPage();
  //       }
  //     }
  //     // Save as dialog
  //     const filename = prompt(
  //       'Enter the filename for your PDF',
  //       'BringJal-Invoice.pdf'
  //     );
  //     if (filename) {
  //       pdf.save(filename);
  //     } else {
  //       // If no filename was provided, use a default name
  //       pdf.save('BringJal-Invoice.pdf');
  //     }
  //   });
  //   console.log('Downloaded PDF');
  // }
  // 2
  // downloadPDF(): void {
  //   const content = this.invoiceContent.nativeElement;
  //   html2canvas(content).then(canvas => {
  //     const imgData = canvas.toDataURL('image/png');
  //     console.log("Image Data ====>>", imgData);
  //     const pdf = new jsPDF();
  //     console.log("PDF ====>>", pdf);
  //     pdf.addImage(imgData, 'PNG', 0, 0, 210, 295); // Adjust dimensions to fit A4 size

  //     // Save as dialog
  //     const filename = prompt(
  //       'Enter the filename for your PDF',
  //       'BringJal-Invoice.pdf'
  //     );
  //     console.log("Filename ====>>", filename);
  //     if (filename) {
  //       // Save the PDF with the provided filename
  //       pdf.save(filename);
  //     } else {
  //       // If no filename was provided, use a default name
  //       pdf.save('BringJal-Invoice.pdf');
  //     }
  //   });
  //   console.log('Downloaded PDF')
  // }
  // 3
  // downloadPDF(): void {
  //   const content = this.invoiceContent.nativeElement;
  //   html2canvas(content).then(canvas => {
  //     const imgData = canvas.toDataURL('image/png');
  //     const pdf = new jsPDF();
  //     const pageWidth = 210; // A4 width in mm
  //     const pageHeight = 295; // A4 height in mm
  //     const imgWidth = 210; // Image width to fit the page width
  //     const imgHeight = canvas.height * imgWidth / canvas.width; // Scale the image height
  //     let position = 0; // Start position on the page
  //     let heightLeft = imgHeight; // Remaining height to cover

  //     // Add the first page
  //     pdf.addImage(imgData, 'PNG', 0, position, imgWidth, pageHeight);
  //     heightLeft -= pageHeight; // Update remaining height

  //     while (heightLeft > 0) {
  //       pdf.addPage(); // Add a new page if there's more content to be added
  //       position = heightLeft - imgHeight; // Update position for the new page
  //       pdf.addImage(imgData, 'PNG', 0, position, imgWidth, pageHeight);
  //       heightLeft -= pageHeight; // Update remaining height
  //     }

  //     // Save as dialog
  //     const filename = prompt('Enter the filename for your PDF', 'BringJal-Invoice.pdf');
  //     if (filename) {
  //       pdf.save(filename);
  //     } else {
  //       pdf.save('BringJal-Invoice.pdf');
  //     }
  //   });
  //   console.log('Downloaded PDF');
  // }
  generatePdf() {
    const content = this.invoiceContent.nativeElement;

    if (content) {
      html2canvas(content, { scale: 2 }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'px', 'a4');

        // Convert canvas dimensions to PDF units (pixels to mm)
        const pdfWidth = 210;  // A4 width in mm
        const pdfHeight = 297; // A4 height in mm
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const pdfRatio = pdfWidth / pdfHeight;
        const imgRatio = imgWidth / imgHeight;

        let pdfPageWidth, pdfPageHeight;
        if (imgRatio > pdfRatio) {
          pdfPageWidth = pdfWidth;
          pdfPageHeight = pdfWidth / imgRatio;
        } else {
          pdfPageHeight = pdfHeight;
          pdfPageWidth = pdfHeight * imgRatio;
        }

        pdf.addImage(imgData, 'PNG', 0, 0, pdfPageWidth, pdfPageHeight);
        pdf.save('order-invoice.pdf');
      });
    }
  }
  // 4
  // downloadPDF(): void {
  //   const content = this.invoiceContent.nativeElement;

  //   html2canvas(content).then(canvas => {
  //     const imgData = canvas.toDataURL('image/png');
  //     const pdf = new jsPDF({
  //       orientation: 'portrait',
  //       unit: 'mm',
  //       format: 'a4'
  //     });

  //     const pageWidth = pdf.internal.pageSize.getWidth();
  //     const pageHeight = pdf.internal.pageSize.getHeight();
  //     const imgWidth = pageWidth;
  //     const imgHeight = canvas.height * imgWidth / canvas.width;

  //     let position = 0;
  //     let heightLeft = imgHeight;

  //     // Add the first page
  //     pdf.addImage(imgData, 'PNG', 0, position, imgWidth, pageHeight);
  //     heightLeft -= pageHeight;

  //     // Add additional pages if needed
  //     while (heightLeft > 0) {
  //       pdf.addPage();
  //       position = heightLeft - imgHeight;
  //       pdf.addImage(imgData, 'PNG', 0, position, imgWidth, pageHeight);
  //       heightLeft -= pageHeight;
  //     }

  //     // Prompt for filename and save PDF
  //     const filename = prompt('Enter the filename for your PDF', 'Invoice.pdf') || 'Invoice.pdf';
  //     pdf.save(filename);
  //   }).catch(error => {
  //     console.error('Error generating PDF:', error);
  //   });
  // }

  // Define the list of invoice entries
  getAllEntries() {
    this._http
      .get<any>('../../assets/Json Files/invoiceEntries.json')
      .subscribe((data) => {
        this.invoiceEntries = data.OrdersEntries;
        console.table('All OrdersEntries', this.invoiceEntries);
      });
  }
  getAllInvoices() {
    this._http
      .get<any>('../../assets/Json Files/invoices.json')
      .subscribe((data) => {
        this.allInvoices = data.InvoicesAll;
        console.table('All Invoices', this.allInvoices);
      });
  }

  // Calculate the total amount from invoice entries
  private calculateTotalAmount(): void {
    this.totalAmount = this.invoiceEntries.reduce(
      (sum, entry) => sum + entry.quantity * entry.ratePerUnit,
      0
    );
  }

  // Calculate the total quantity from invoice entries
  private calculateTotalQuantity(): void {
    this.totalQuantity = this.invoiceEntries.reduce(
      (sum, entry) => sum + entry.quantity,
      0
    );
  }

  // Convert number to words
  private convertNumberToWords(num: number): string {
    const ones: string[] = [
      'Zero',
      'One',
      'Two',
      'Three',
      'Four',
      'Five',
      'Six',
      'Seven',
      'Eight',
      'Nine',
      'Ten',
      'Eleven',
      'Twelve',
      'Thirteen',
      'Fourteen',
      'Fifteen',
      'Sixteen',
      'Seventeen',
      'Eighteen',
      'Nineteen',
    ];
    const tens: string[] = [
      '',
      '',
      'Twenty',
      'Thirty',
      'Forty',
      'Fifty',
      'Sixty',
      'Seventy',
      'Eighty',
      'Ninety',
    ];
    const scales: string[] = [
      'Hundred',
      'Thousand',
      'Million',
      'Billion',
      'Trillion',
    ];

    function numberToWordsHelper(number: number): string {
      if (number === 0) return 'Zero';
      if (number < 20) return ones[number];
      if (number < 100)
        return (
          tens[Math.floor(number / 10)] +
          (number % 10 === 0 ? '' : ' ' + ones[number % 10])
        );
      if (number < 1000)
        return (
          ones[Math.floor(number / 100)] +
          ' Hundred' +
          (number % 100 === 0
            ? ''
            : ' and ' + numberToWordsHelper(number % 100))
        );

      for (let i = 0; i < scales.length; i++) {
        const divisor = Math.pow(1000, i + 1);
        if (number < divisor) {
          return (
            numberToWordsHelper(Math.floor(number / (divisor / 1000))) +
            ' ' +
            scales[i] +
            (number % (divisor / 1000) === 0
              ? ''
              : ' ' + numberToWordsHelper(number % (divisor / 1000)))
          );
        }
      }
      return '';
    }

    return (
      numberToWordsHelper(num).replace(/^\w/, (c) => c.toUpperCase()) +
      ' Rupees Only'
    );
  }
  //
}
