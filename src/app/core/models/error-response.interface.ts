import { HttpErrorCode } from "../enums/http-error-code.enum";

export interface ErrorResponse {
  errorCode: HttpErrorCode,
  message: string,
}
