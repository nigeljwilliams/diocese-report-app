import { ToastMessageType } from "../enums/toast-message-type.enum";

/**
 * The data used for populating info when creating a ToastMessageComponent
 */
export interface ToastMessageData {
  /**
   * The type of toast message
   */
  messageType: ToastMessageType;
  /**
   * The title of the toast message
   */
  title: string;
  /**
   * The text for the toast message
   */
  message: string;
  /**
   * How long the toast message will remain alive in milliseconds
   */
  durationMillis: number;
}
