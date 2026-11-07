import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { AuthResult } from '../models/models/auth-result';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorResponse } from '../../core/models/error-response.interface';
import { HttpErrorCode } from '../../core/enums/http-error-code.enum';
import { ThisReceiver } from '@angular/compiler';

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

  private readonly _authService = inject(AuthService);

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

  login(): void {
    const username = this.usernameControl?.value ?? '';
    const password = this.passwordControl?.value ?? '';

    this._authService.authenticate(username, password)
      .subscribe({
        next: (result: AuthResult) => {
          this.hasError = !result.success;
          this.errorMessage = result.message;
        },
        error: (error: ErrorResponse) => {
          this.hasError = true;
          this.errorMessage = error.message;
        }
      });
  }
}
