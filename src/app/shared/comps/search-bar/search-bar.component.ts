import {
  Component,
  EventEmitter,
  Output,
  ViewChild,
  ElementRef,
  NgZone,
  OnInit,
  afterNextRender,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { ApiService, Maps } from '../../services/common/api.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable, Observer } from 'rxjs';

// const place = null as google.maps.places.PlaceResult;
// type Components = typeof place.address_components;
type Components =google.maps.GeocoderAddressComponent[] | undefined

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [GoogleMapsModule, CommonModule, ReactiveFormsModule],
  providers: [ApiService],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent implements OnInit {
  dBtnFetchGps: boolean = false;
  @Output() searchDataRecieved = new EventEmitter<any>();
  @Output() loaderCallEmit = new EventEmitter<boolean>();
  @ViewChild('search')
  public searchElementRef!: ElementRef;
  searchControl: FormControl=new FormControl();;
  gpsError: string = '';
  // private map: google.maps.Map;

  constructor(
    apiService: ApiService,
    private ngZone: NgZone,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    afterNextRender(() => {
      apiService.api.then((maps) => {
        this.initAutocomplete(maps);
      });
    });
  }

  ngOnInit(): void {
   
  }

  initAutocomplete(maps: Maps) {
    let autocomplete = new maps.places.Autocomplete(
      this.searchElementRef.nativeElement
    );
    autocomplete.addListener('place_changed', () => {
      this.ngZone.run(() => {
        //console.log("place_changed", autocomplete.getPlace());
        this.onPlaceChange(autocomplete.getPlace());
      });
    });
  }

  // findMe() {
  //   this.dBtnFetchGps = true;
  //   //afterNextRender(() => {
  //   // if (isPlatformBrowser(this.platformId)) {
  //   console.log('find me button called');
  //   this.loaderCallEmit.emit(true);
  //   if (navigator.geolocation) {
  //     new Promise((resolve) => {
  //       navigator.geolocation.getCurrentPosition(
  //         (position) => {
  //           console.log('position getCurrentPosition:', position);
  //           resolve(position);
  //         },
  //         (error) => {
  //           this.dBtnFetchGps = false;
  //           this.loaderCallEmit.emit(false);
  //         }
  //       );
  //     }).then((position) => {
  //       console.log('position before getPosition:', position);
  //       this.getPosition(position).subscribe({
  //         next: (res) => {
  //           console.log('before emit to search',res)
  //           this.loaderCallEmit.emit(false);
  //           this.searchDataRecieved.emit("hgh");
            
  //           console.log("after emit");
  //           this.dBtnFetchGps = false;

  //         },
  //         error:(err) =>{
  //           console.log(err)
  //         },
  //       });
  //     });
  //   } else {
  //     this.dBtnFetchGps = false;
  //     this.gpsError =
  //       'GPS on your device is unable to fetch location, please fetch location by entering address in search bar below';
  //     this.loaderCallEmit.emit(false);
  //     //this.searchGpsModal.emit(true);
  //     // this.gpsModal.show()
  //   }
  // }

  findMe() {
    //this.dBtnFetchGps = true;
    //afterNextRender(() => {
    // if (isPlatformBrowser(this.platformId)) {
    console.log('find me button called');
    if (navigator.geolocation) {
      new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log('position getCurrentPosition:', position);
            resolve(position);
          },
          (error) => {
            this.dBtnFetchGps = false;
            this.loaderCallEmit.emit(false);
          }
        );
      }).then((position) => {
        console.log('position before getPosition:', position);
        this.getPosition(position).subscribe({
          next: (res) => {
            console.log('before emit to search', res)
            this.searchDataRecieved.emit(res);
            this.loaderCallEmit.emit(false);
          },
          error: (err) => {
            console.log(err)
          }
        });

      });
    }
    //this.loaderCallEmit.emit(true);
    // if (navigator.geolocation) {
    // new Promise((resolve) => {
    // navigator.geolocation.getCurrentPosition(
    // (position) => {
    // console.log('position getCurrentPosition:', position);
    // resolve(position);
    // },
    // (error) => {
    // this.dBtnFetchGps = false;
    // this.loaderCallEmit.emit(false);
    // }
    // );
    // }).then((position) => {
    // console.log('position before getPosition:', position);
    // this.getPosition(position).subscribe({
    // next: (res) => {
    // console.log('before emit to search',res)
    // //this.loaderCallEmit.emit(false);
    // this.searchDataRecieved.emit(res);
    // console.log("after emit");
    // //this.dBtnFetchGps = false;

    // },
    // error:(err) =>{
    // console.log(err)
    // },
    // });
    // });
    // } else {
    // this.dBtnFetchGps = false;
    // this.gpsError =
    // 'GPS on your device is unable to fetch location, please fetch location by entering address in search bar below';
    // this.loaderCallEmit.emit(false);
    // //this.searchGpsModal.emit(true);
    // // this.gpsModal.show()
    // }
  }

  getPosition(position:any): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      const coordinates = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      console.log("coordinated before geocode:", coordinates);
      let geocoder = new google.maps.Geocoder();
      geocoder.geocode(
        {
          location: coordinates,
        },
        (results:any) => {
          this.ngZone.run(() => {
            console.log("address from coordinates:", results[0].formatted_address);
            var res = {
              coordinates: coordinates,
              searchAddr: results[0].formatted_address,
            };
            observer.next(res);
            observer.complete();
          });
        }
      );
    });
  }

  onPlaceChange(place: google.maps.places.PlaceResult) {
    this.searchControl.reset();
    const location = this.locationFromPlace(place);
    console.log("location from place change", location);
    this.searchDataRecieved.emit(location);
  }

  // getPosition(position:any): Observable<any> {
  //   return new Observable((observer: Observer<any>) => {
  //     const coordinates = {
  //       lat: position.coords.latitude,
  //       lng: position.coords.longitude,
  //     };
  //     console.log("coordinated before geocode:", coordinates);
  //     let geocoder = new google.maps.Geocoder();
  //     geocoder.geocode(
  //       {
  //         location: coordinates,
  //       },
  //       (results:any, status) => {
  //         this.ngZone.run(() => {
  //           console.log("address from coordinates:", results[0].formatted_address);
  //           var res = {
  //             coordinates: coordinates,
  //             searchAddr: results[0].formatted_address,
  //           };
  //           observer.next(res);
  //           observer.complete();
  //         });
  //       }
  //     );
  //   });
  // }

  // onPlaceChange(place: google.maps.places.PlaceResult) {
  //   this.searchControl.reset();
  //   const location = this.locationFromPlace(place);
  //   this.searchDataRecieved.emit(location);
  // }

  public locationFromPlace(place: google.maps.places.PlaceResult|any) {
    const components = place.address_components;
    if (components === undefined) {
      return null;
    }
    console.log('place.name:', place.name);
    console.log(
      "place.address_components[0]+', '+place.address_components[1]",
      place.address_components[0].long_name +
        ', ' +
        place.address_components[1].short_name
    );
    if (
      place.name ===
      place.address_components[0].long_name +
        ', ' +
        place.address_components[1].short_name
    ) {
      const searchAddr = place.formatted_address;
      console.log('locationFromPlace:', place.address_components);
      console.log('formatted address:', searchAddr);
      const coordinates = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      return {
        coordinates,
        searchAddr,
      };
    } else {
      const searchAddr = place.name + ', ' + place.formatted_address;
      console.log('locationFromPlace:', place.address_components);
      console.log('formatted address:', searchAddr);
      const coordinates = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      return {
        coordinates,
        searchAddr,
      };
    }
  }
}
