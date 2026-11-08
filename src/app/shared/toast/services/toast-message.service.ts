import { ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { ToastMessageData } from '../models/toast-message-data.interface';
import { ToastMessageComponent } from '../toast-message/toast-message.component';

@Injectable({
  providedIn: 'root'
})
export class ToastMessageService {

  private _viewContainerRef!: ViewContainerRef;

  registerToastContainer(viewContainerRef: ViewContainerRef): void {
    this._viewContainerRef = viewContainerRef;
  }

  createToast(data: ToastMessageData): void {
    const componentRef: ComponentRef<ToastMessageComponent> =
      this._viewContainerRef.createComponent(ToastMessageComponent);

    componentRef.instance.setMessageType(data.messageType);
    componentRef.instance.setTitle(data.title);
    componentRef.instance.setMessage(data.message);

    setTimeout(() => {
      componentRef.destroy();
    }, data.durationMillis);
  }
}
