import { ToastMessageType } from "../enums/toast-message-type.enum";

export interface ToastMessageData {
  messageType: ToastMessageType;
  title: string;
  message: string;
  durationMillis: number;
}
