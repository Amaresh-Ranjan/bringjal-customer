import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  AbstractControl,
} from '@angular/forms';

@Component({
  selector: 'app-create-user-password',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './create-user-password.component.html',
  styleUrls: ['./create-user-password.component.scss'],
})
export class CreateUserPasswordComponent {
  passwordForm: any;
  isPasswordVisible = false;
  isConfirmPasswordVisible = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.passwordForm = this.fb.group(
      {
        newPassword: [
          null,
          [
            Validators.required,
            Validators.minLength(8),
            this.passwordValidator,
          ],
        ],
        confirmPassword: [null, Validators.required],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  passwordValidator(control: AbstractControl) {
    const value = control.value || '';
    const regex =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(value) ? null : { invalidPassword: true };
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('newPassword')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  get newPassword() {
    return this.passwordForm.get('newPassword');
  }

  get confirmPassword() {
    return this.passwordForm.get('confirmPassword');
  }

  hasPasswordMismatchError(): boolean {
    const errors = this.passwordForm.errors;
    return errors ? !!errors['passwordMismatch'] : false;
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  toggleConfirmPasswordVisibility() {
    this.isConfirmPasswordVisible = !this.isConfirmPasswordVisible;
  }

  onSubmit() {
    if (this.passwordForm.valid) {
      // Process form data
      console.log(this.passwordForm.value);
      this.passwordForm.reset();
      alert('Password successfully set!');
    } else {
      alert('Please correct the errors in the form.');
    }
  }
}
