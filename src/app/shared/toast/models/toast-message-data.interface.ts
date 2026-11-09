import { ToastMessageType } from "../enums/toast-message-type.enum";

/**
 * The data used for populating info when creating a ToastMessageComponent
 */
export interface ToastMessageData {
  messageType: ToastMessageType;
  title: string;
  message: string;
  durationMillis: number;
}
