import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, EMPTY, throwError } from 'rxjs';
import { ErrorResponse } from '../models/error-response.interface';
import { HttpErrorCode } from '../enums/http-error-code.enum';

export const globalErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  // Pass the request along to the next handler in the pipe
  return next(req).pipe(
    // Catch any bad responses coming back from the backend
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        console.warn('[Auth] Session expired. Terminating stream and redirecting to login page.');
        router.navigate(['/login']);

        // No need to return an ErrorResponse observable since it won't actually return
        return EMPTY;
      }

      let errorResponse = ({
        errorCode: HttpErrorCode.UNKNOWN,
        message: 'An unexpected error occurred',
      } as ErrorResponse);

      // Handle specific status codes
      switch (error.status) {
        case 400:
          errorResponse.errorCode = HttpErrorCode.BAD_REQUEST_400;
          errorResponse.message = `Validation failed for payload.`;
          break;
        case 403:
          errorResponse.errorCode = HttpErrorCode.FORBIDDEN_403;
          errorResponse.message = `You do not have permission to use this application. 
            Please contact the system administrator to get permission.`;
          break;
        case 404:
          errorResponse.errorCode = HttpErrorCode.NOT_FOUND_404;
          errorResponse.message = `Item or page was not found.`;
          break;
        case 429:
          errorResponse.errorCode = HttpErrorCode.TOO_MANY_REQUESTS_429;
          errorResponse.message = `Too many requests have been made. Please wait a few 
            seconds and try again.`;
          break;
        case 500:
          errorResponse.errorCode = HttpErrorCode.INTERNAL_SERVER_ERROR_500;
          errorResponse.message = `Internal server error. Something went wrong. Please 
            try again later...`;
          break;
        case 502:
          errorResponse.errorCode = HttpErrorCode.BAD_GATEWAY_502;
          errorResponse.message = `The server is offline or under maintenance. Please
            try again later.`;
          break;
        case 503:
          errorResponse.errorCode = HttpErrorCode.SERVICE_UNAVAILABLE_503;
          errorResponse.message = `The server is offline or under maintenance. Please
            try again later.`;
          break;
        case 511:
          errorResponse.errorCode = HttpErrorCode.NETWORK_AUTHENTICATION_REQUIRED_511;
          errorResponse.message = `Network authentication required.`;
          break;
        default:
          break;
      }

      console.error(`[Global Error] [${errorResponse.errorCode}]:`, error);

      return throwError(() => errorResponse);
    }),
  )
};
