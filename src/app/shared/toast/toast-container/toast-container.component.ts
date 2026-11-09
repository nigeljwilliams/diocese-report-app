import { Component, inject, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ToastMessageService } from '../services/toast-message.service';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  imports: [],
  templateUrl: './toast-container.component.html',
  styleUrl: './toast-container.component.scss'
})
export class ToastContainerComponent implements OnInit {
 
  /**
   * The ToastMessageService used for creating a ToastMessageComponent
   */
  private readonly _toastMessageService = inject(ToastMessageService);

  /**
   * The reference to the ViewContainerRef that will be used for creating
   * a ToastMessageComponent
   */
  @ViewChild('toastAnchor', { read: ViewContainerRef, static: true })
  toastAnchorRef!: ViewContainerRef;

  ngOnInit(): void {
    this._toastMessageService.registerToastContainer(this.toastAnchorRef);
  }
}
