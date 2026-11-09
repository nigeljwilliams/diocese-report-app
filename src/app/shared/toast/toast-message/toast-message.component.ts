import { Component } from '@angular/core';
import { ToastMessageType } from '../enums/toast-message-type.enum';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../icon/icon.component';
import { IconSize } from '../../icon/enums/icon-size.enum';
import { IconColor } from '../../icon/enums/icon-color.enum';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-toast-message',
  imports: [
    CommonModule,
    IconComponent,
  ],
  templateUrl: './toast-message.component.html',
  styleUrl: './toast-message.component.scss'
})
export class ToastMessageComponent {

  /**
   * The size of the toast icon
   */
  readonly toastIconSize: IconSize = IconSize.SIZE_2X;
  
  /**
   * The size of the close icon
   */
  readonly closeIconSize: IconSize = IconSize.SIZE_X_LARGE;
  
  /**
   * The name of the icon used for the close icon
   */
  readonly closeIconName: string = 'close';

  /**
   * The color of the close icon
   */
  readonly closeIconColor: IconColor = IconColor.WHITE;

  /**
   * The subject that gets triggered when the close button is clicked
   */
  private readonly _closeSubject$ = new Subject<void>();

  /**
   * The type of toast message
   */
  private _messageType: ToastMessageType = ToastMessageType.INFO;

  /**
   * The toast message's title
   */
  private _title: string = '';

  /**
   * The toast message's message text
   */
  private _message: string = '';

  /**
   * The name of the icon used for the toast message's icon
   */
  private _iconName: string = '';

  /**
   * The color of the toast message's icon
   */
  private _iconColor: IconColor = IconColor.BLACK;


  /**
   * The observable that gets triggered when the close button is clicked
   */
  get onClose$(): Observable<void> {
    return this._closeSubject$.asObservable();
  }

  /**
   * The type of toast message
   */
  get messageType(): ToastMessageType {
    return this._messageType;
  }

  /**
   * The toast message's title
   */
  get title(): string {
    return this._title;
  }

  /**
   * The toast message's message text
   */
  get message(): string {
    return this._message;
  }

  /**
   * The name of the icon used for the toast message's icon
   */
  get iconName(): string {
    return this._iconName;
  }

  /**
   * The color of the toast message's icon
   */
  get iconColor(): IconColor {
    return this._iconColor;
  }

  /**
   * Triggers the onClose$ observable to close this toast message
   */
  close(): void {
    this._closeSubject$.next();
  }
  
  /**
   * Sets the toast message's type, then sets the icon name and icon color accordingly
   * @param messageType the toast message's type
   */
  setMessageType(messageType: ToastMessageType): void {
    this._messageType = messageType;

    this._iconName = this.toIconName(this._messageType);
    this._iconColor = this.toIconColor(this._messageType);
  }

  /**
   * Sets the toast message's title
   * @param title the toast message's title
   */
  setTitle(title: string): void {
    this._title = title;
  }

  /**
   * Sets the toast message's text
   * @param toastMessage the toast message text
   */
  setMessage(toastMessage: string): void {
    this._message = toastMessage;
  }

  /**
   * Returns the name of the icon for the toast message according to the 
   * toast message type provided
   * @param toastType the toast message's type
   * @returns the name of the icon for the toast message
   */
  toIconName(toastType: ToastMessageType): string {
    switch (toastType) {
      case ToastMessageType.SUCCESS:
        return 'success';
      case ToastMessageType.WARNING:
        return 'warning';
      case ToastMessageType.ERROR:
        return 'error';
      default: // INFORMATION
        return 'info';
    }
  }

  /**
   * Returns the color of the toast message's icon according to the toast message type
   * @param toastType the toast message's type
   * @returns the color of the toast message's icon
   */
  toIconColor(toastType: ToastMessageType): IconColor {
    switch (toastType) {
      case ToastMessageType.SUCCESS:
        return IconColor.GREEN;
      case ToastMessageType.WARNING:
        return IconColor.ORANGE;
      case ToastMessageType.ERROR:
        return IconColor.RED;
      default: // INFORMATION
        return IconColor.BLUE;
    }
  }
}
