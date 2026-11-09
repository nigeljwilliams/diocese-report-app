/**
 * The data representing the result of user authentication
 */
export interface AuthResult {
  /**
   * Whether the authentication was successful
   */
  success: boolean;
  /**
   * The message detailing the result of an authentication attempt
   */
  message: string;
}
