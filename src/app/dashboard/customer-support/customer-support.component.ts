import {
  Component,
  DestroyRef,
  Inject,
  inject,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { HomeUserServiceService } from '../../shared/services/backendInteractionServices/home-user-service.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserSotrageService } from '../../shared/services/storageRelated/user-sotrage.service';
import { RelativeDatePipe } from '../../shared/pipes/luxondate.pipe';
import { FooterSectionComponent } from '../../shared/comp/footer-section/footer-section.component';
import { CustomLoaderComponent } from '../../shared/comp/custom-loader/custom-loader.component';

@Component({
  selector: 'app-customer-support',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomLoaderComponent,
    RelativeDatePipe,
    FooterSectionComponent,
  ],
  templateUrl: './customer-support.component.html',
  styleUrl: './customer-support.component.scss',
})
export class CustomerSupportComponent {
  loaderEnable = signal<boolean>(false);
  homeService = inject(HomeUserServiceService);
  ticketsArray:any[] = [];
  customerSupportForm: any;
  private userStorage = inject(UserSotrageService);
  selectedFile: File | null = null;
  loader: boolean = false;
  ticketSubmitted: boolean = false;
  private destroyRef = inject(DestroyRef);
  fileUrl: any;
  totalTickets:any
  fileInput: any;
  fileUploadStatus: any;
  imagesArray: any[] = [];
  userData: any;
  options: string[] = [
    'Issue with Delivery Staff',
    'Issue with product delivered',
    'Cancel the service',
    'Device related issue',
    'Others',
  ];
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    // this.ticketsArray = [
    //   {
    //     created_at: 1595335098112,
    //     ticket_id: 'asdasdasd',
    //     subject: "ajhsbd  hasbdhjabsd jshabdjashd",
    //     description: "amsbd  jhsavbdjh jhasbdh sajhbdj sajhbdasj asjhbd sajhdb",
    //     name: "Sam",
    //     email: "sam@gmail.com",
    //     mobile: "9874563212",
    //     status: {
    //       open: true,
    //       inProgress: false,
    //       assigned: false,
    //       closed: false
    //     },
    //     comments: [
    //       "hjasbghja kajhsbdhjas jhasbdjhasd jhabsd",
    //       "absvgd jhabsdjh jhasbd jhasgb jhasgd  asjhdg",
    //       "ajhsbdjh jhasbvjh jash vasjhd jhasbd  asjhbd"
    //     ]
    //   },
    //   {
    //     created_at: 1595335098112,
    //     ticket_id: 'asdasdasd',
    //     subject: "ajhsbd  hasbdhjabsd jshabdjashd",
    //     description: "amsbd  jhsavbdjh jhasbdh sajhbdj sajhbdasj asjhbd sajhdb",
    //     name: "Sam",
    //     email: "sam@gmail.com",
    //     mobile: "9874563212",
    //     status: {
    //       open: true,
    //       inProgress: false,
    //       assigned: false,
    //       closed: false
    //     },
    //     comments: [
    //       "hjasbghja kajhsbdhjas jhasbdjhasd jhabsd",
    //       "absvgd jhabsdjh jhasbd jhasgb jhasgd  asjhdg",
    //       "ajhsbdjh jhasbvjh jash vasjhd jhasbd  asjhbd"
    //     ]
    //   },
    //   {
    //     created_at: 1595335098112,
    //     ticket_id: 'asdasdasd',
    //     subject: "ajhsbd  hasbdhjabsd jshabdjashd",
    //     description: "amsbd  jhsavbdjh jhasbdh sajhbdj sajhbdasj asjhbd sajhdb",
    //     name: "Sam",
    //     email: "sam@gmail.com",
    //     mobile: "9874563212",
    //     status: {
    //       open: true,
    //       inProgress: false,
    //       assigned: false,
    //       closed: false
    //     },
    //     comments: [
    //       "hjasbghja kajhsbdhjas jhasbdjhasd jhabsd",
    //       "absvgd jhabsdjh jhasbd jhasgb jhasgd  asjhdg",
    //       "ajhsbdjh jhasbvjh jash vasjhd jhasbd  asjhbd"
    //     ]
    //   }
    // ]
    this.loaderEnable.update(() => true);
    if (isPlatformBrowser(this.platformId)) {
      const subscription = this.userStorage.getUser.subscribe({
        next: (user) => {
          if (user) {
            this.userData = user;
            console.log('userdata:', this.userData);
            this.customerSupportForm = new FormGroup({
              name: new FormControl(this.userData.name, Validators.required),
              email: new FormControl(this.userData.email, [
                Validators.required,
                Validators.pattern(
                  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                ),
              ]),
              subject: new FormControl(null),
              mobile: new FormControl(this.userData.mobile, [
                Validators.required,
                Validators.pattern('^[4-9][0-9]{9}$'),
              ]),
              description: new FormControl('', Validators.required),
            });
        

            this.homeService.fetchCustomerTickets(0,this.userData._id).subscribe({
              next: (data) => {
                console.log('wallet summary data', data);
                this.totalTickets=data.totaltickets
                const arrData:any[]=[...data.data]
                // arrData.reverse()
              
                this.ticketsArray = arrData;
  
                this.loaderEnable.update(() => false);
              },
              error:(err) =>{
                console.log(err)
                this.loaderEnable.update(() => false);
              },
            });
          }
        },
        error:(err) =>{
          console.log(err)
          this.loaderEnable.update(() => false);
        },
      });

      this.destroyRef.onDestroy(() => {
        subscription.unsubscribe();
      });
    }
  }

  onFileChange(event: any, fileInput:any): void {
    console.log(event.target)
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      console.log('selected file', this.selectedFile);
      this.fileInput = fileInput;
    }
  }

  private getMonthName(monthIndex: number): string {
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return monthNames[monthIndex];
  }

  onUpload(): void {
    console.log(this.selectedFile);
    
    
    if (this.selectedFile) {
      this.loaderEnable.update(() => true);
      const now = new Date();
      const day = now.getDate();
      const monthName = this.getMonthName(now.getMonth());
      const folderName = `${monthName}${day}`; // Format folder name as "MonthName-Day"
      this.homeService
        .uploadImageGenerateTicket(this.selectedFile, folderName)
        .subscribe({
          next: (data: any) => {
            console.log('Data sending to backend:', data);
            this.fileUrl = data.res.ObjectURL;
            this.fileUploadStatus = data.success;
            console.log('uploaded image url', this.fileUrl);
            this.imagesArray.push(this.fileUrl);
            console.log('image array', this.imagesArray);
            this.selectedFile = null;
            this.fileInput.value = ''; // Reset the input value
            this.loaderEnable.update(() => false);
          },
          error: (error: any) => {
            console.log('image upload error', error);
            this.loaderEnable.update(() => true);
          },
        });
    } else {
      console.error('No file selected');
    }
  }

  removeImageFromArray(index:number) {
    console.log('index remove from image array:', index);
    this.imagesArray.splice(index, 1);
  }

  generateTicket() {
    console.log('value of selected:', this.customerSupportForm.value.subject);
    this.loaderEnable.update(() => true);
    if (this.customerSupportForm.valid) {
      console.log('Ticket Submitted:', this.customerSupportForm.value);
      this.homeService
        .generateTicket(
          this.customerSupportForm.value.name,
          this.customerSupportForm.value.email,
          this.customerSupportForm.value.mobile,
          this.customerSupportForm.value.description,
          this.imagesArray,
          this.customerSupportForm.value.subject,
          this.userData._id
        )
        .subscribe({
          next: (data: any) => {
            console.log('Ticket generated successfully', data);
            this.ticketSubmitted = true;
            this.ticketsArray=[data.data];
           
            this.homeService.fetchCustomerTickets(0,this.userData._id).subscribe({
              next: (data) => {
                console.log('wallet summary data', data);
                 this.totalTickets=data.totaltickets
                const arrData=[...data.data]
                // arrData.reverse()
                this.ticketsArray = arrData;
  
                this.loaderEnable.update(() => false);
              },
              error:(err) =>{
                console.log(err)
                this.loaderEnable.update(() => false);
              },
            });
          },
          error: (error) => {
            console.error('Error generating ticket', error);
            this.loaderEnable.update(() => false);
          },
        });
    } else {
      console.log('Form is invalid');
      this.loaderEnable.update(() => false);
      this.customerSupportForm.markAllAsTouched(); // Ensure all fields show their validation messages
    }
  }

  showmore() {
    console.log()
    this.homeService.fetchCustomerTickets(this.ticketsArray.length,this.userData._id).subscribe({
      next: (data) => {
        console.log('wallet summary data', data);
         this.totalTickets=data.totaltickets
         data.data.forEach((ele:any) => {
          this.ticketsArray.push(ele)
         });
       

        // var transactions = data.data;
        // transactions.forEach((el) => {
        //   this.ticketsArray.push(el);
        // });
        this.loaderEnable.update(() => false);
        this.loaderEnable.update(() => false);
      },
      error:(err) =>{
        console.log(err)
        this.loaderEnable.update(() => false);
      },
    });
  }
}
