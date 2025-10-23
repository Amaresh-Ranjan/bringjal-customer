import { Injectable, TemplateRef } from '@angular/core';

export interface Toast {
  text?: string;
  classname?: string;
  delay?: number;
}

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  constructor() {}

  toasts: Toast[] = [];

  show(toast: Toast) {
    this.toasts.push(toast);
  }

  remove(toast: Toast) {
    this.toasts = this.toasts.filter((t) => t !== toast);
  }

  clear() {
    this.toasts.splice(0, this.toasts.length);
  }

  // showSuccessToast(text) {
  // 	var toast: Toast = {
  // 	  text: text,
  // 	  classname: ‘bg-success text-light’,
  // 	  delay: 5000,
  // 	};
  // 	this.toasts.push(toast);
  //   }

  showSucessToast(text:any) {
    var toast: Toast = {
      text: text,
      classname: 'bg-success text-light',
      delay: 5000,
    };
    this.toasts.push(toast);
  }

  showDangerToast(text:any) {
    var toast: Toast = {
      text: text,
      classname: 'bg-danger text-light',
      delay: 5000,
    };
    this.toasts.push(toast);
  }
}
