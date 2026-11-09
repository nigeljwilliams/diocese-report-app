import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { AuthResult } from '../models/auth-result.interface';
import { CommonModule } from '@angular/common';
import { ErrorResponse } from '../../core/models/error-response.interface';
import { ToastMessageService } from '../../shared/toast/services/toast-message.service';
import { ToastMessageType } from '../../shared/toast/enums/toast-message-type.enum';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit, OnDestroy {

  /**
   * The auth service used for authenticating users
   */
  private readonly _authService = inject(AuthService);

  /**
   * The toast message service used for creating toast messages
   */
  private readonly _toastMessageService = inject(ToastMessageService);

  /**
   * FormControl for the username input
   */
  usernameControl = new FormControl('');

  /**
   * FormControl for the password input
   */
  passwordControl = new FormControl('');

  /**
   * Determines if the component has an error
   */
  hasError = false;

  /**
   * The error message that appears after an unsuccessful authentication attempt
   */
  errorMessage: string = '';
  

  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
    
  }

  /**
   * Uses the username and password form controls as credentials for
   * attempting to authenticate the user  
   */
  login(): void {
    const username = this.usernameControl?.value ?? '';
    const password = this.passwordControl?.value ?? '';

    this._authService.authenticate(username, password)
      .subscribe({
        next: (result: AuthResult) => {
          if (result.success) {
            // TODO: route to dashboard

            this._toastMessageService.createToast({
              messageType: ToastMessageType.SUCCESS,
              title: 'Successfully Logged In',
              message: result.message,
              durationMillis: 3000,
            });
          } else {
            this.hasError = true;
            this.errorMessage = result.message;
          }
        },
        error: (error: ErrorResponse) => {
          this._toastMessageService.createToast({
            messageType: ToastMessageType.ERROR,
            title: 'Login Error',
            message: error.message,
            durationMillis: 5000,
          });
        }
      });
  }
}
