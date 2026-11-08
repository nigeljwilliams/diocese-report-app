import { Component, computed, input, OnInit } from '@angular/core';
import { ToastMessageType } from '../enums/toast-message-type.enum';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../icon/icon.component';
import { IconSize } from '../../icon/enums/icon-size.enum';
import { IconColor } from '../../icon/enums/icon-color.enum';

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

  readonly iconSize: IconSize = IconSize.SIZE_2X;

  private _messageType: ToastMessageType = ToastMessageType.INFO;
  private _title: string = '';
  private _message: string = '';

  private _iconName: string = '';
  private _iconColor: IconColor = IconColor.BLACK;


  get messageType(): ToastMessageType {
    return this._messageType;
  }

  get title(): string {
    return this._title;
  }

  get message(): string {
    return this._message;
  }

  get iconName(): string {
    return this._iconName;
  }

  get iconColor(): IconColor {
    return this._iconColor;
  }
  
  setMessageType(messageType: ToastMessageType): void {
    this._messageType = messageType;

    this._iconName = this.toIconName(this._messageType);
    this._iconColor = this.toIconColor(this._messageType);
  }

  setTitle(title: string): void {
    this._title = title;
  }

  setMessage(toastMessage: string): void {
    this._message = toastMessage;
  }

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
