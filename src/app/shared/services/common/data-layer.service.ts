import { afterNextRender, Injectable } from '@angular/core';
import { WindowReferenceService } from './window-reference.service';
@Injectable({
  providedIn: 'root',
})
export class DataLayerService {
  private window:any;
  constructor(private windowRef: WindowReferenceService) {
    afterNextRender(() => {
      this.window = windowRef.nativeWindow;
    });
  }
  private pingHome(obj:any) {
    if (obj) this.window.dataLayer.push(obj);
  }

  logPageView(url:any) {
    const hit = {
      event: 'content-view',
      pageName: url,
    };
    this.pingHome(hit);
  }
  logEvent(event:any, category:any, action:any, label:any) {
    console.log('logEvent', event, category, action, label);
    const hit = {
      event: event,
      category: category,
      action: action,
      label: label,
    };
    this.pingHome(hit);
  }
  logCustomDimensionTest(value:any) {
    const hit = {
      event: 'custom-dimension',
      value: value,
    };
    this.pingHome(hit);
  }
}
