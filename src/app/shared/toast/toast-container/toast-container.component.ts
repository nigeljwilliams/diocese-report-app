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
 
  private readonly _toastMessageService = inject(ToastMessageService);

  @ViewChild('toastAnchor', { read: ViewContainerRef, static: true })
  toastAnchorRef!: ViewContainerRef;

  ngOnInit(): void {
    this._toastMessageService.registerToastContainer(this.toastAnchorRef);
  }
}
