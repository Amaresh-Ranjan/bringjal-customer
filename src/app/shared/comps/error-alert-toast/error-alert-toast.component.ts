import { Component, TemplateRef, inject } from '@angular/core';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { GlobalService } from '../../services/common/global.service';

@Component({
  selector: 'app-error-alert-toast',
  standalone: true,
  imports: [NgbTooltipModule,],
  templateUrl: './error-alert-toast.component.html',
  styleUrl: './error-alert-toast.component.scss'
})
export class ErrorAlertToastComponent {
	toastService = inject(GlobalService);

	showStandard() {
		this.toastService.show({ classname: 'bg-danger text-light', delay: 15000 });
	}

	showSuccess() {
		this.toastService.show({ classname: 'bg-danger text-light', delay: 15000 });
	}

	showDanger() {
		this.toastService.show({ classname: 'bg-danger text-light', delay: 15000 });
	}

	ngOnDestroy(): void {
		this.toastService.clear();
	}
}
