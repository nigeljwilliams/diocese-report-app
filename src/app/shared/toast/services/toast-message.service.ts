import {
  ComponentRef,
  DestroyRef,
  inject,
  Injectable,
  ViewContainerRef
} from '@angular/core';
import { ToastMessageData } from '../models/toast-message-data.interface';
import { ToastMessageComponent } from '../toast-message/toast-message.component';
import { merge, mergeMap, Subject, take, takeUntil, tap, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastMessageService {

  /**
   * Used for handling cleanup when this service is destroyed
   */
  private readonly _destroyRef = inject(DestroyRef);

  /**
   * The subject that gets triggered when a ToastMessageComponent needs to
   * be created
   */
  private readonly _toastCreationSubject$ = new Subject<ToastMessageData>();

  /**
   * The ViewContainerRef used for creating a ToastMessageComponent
   */
  private _viewContainerRef!: ViewContainerRef;


  constructor() {
    this._initService();
  }

  /**
   * Sets the local ViewContainerRef
   * @param viewContainerRef the incoming ViewContainerRef
   */
  registerToastContainer(viewContainerRef: ViewContainerRef): void {
    this._viewContainerRef = viewContainerRef;
  }

  /**
   * Triggers a subject that starts the process for creating a ToastMessageComponent
   * @param data the incoming data for creating a ToastMessageComponent
   */
  createToast(data: ToastMessageData): void {
    this._toastCreationSubject$.next(data);
  }

  /**
   * Sets up a subscription for creating a ToastMessageComponent. Sets up a callback
   * for handling cleanup when this service is destroyed
   */
  private _initService(): void {
    const serviceDestroyedSubject$ = new Subject<void>();

    this._destroyRef.onDestroy(() => {
      serviceDestroyedSubject$.next();
      serviceDestroyedSubject$.complete();
    });

    this._toastCreationSubject$.pipe(
      // mergeMap allows this logic to run concurrently regardless of if another call
      //  triggers the _toastCreationSubject$ while a previous call's logic is still
      //  running
      mergeMap((data: ToastMessageData) => {
        const componentRef: ComponentRef<ToastMessageComponent> =
          this._viewContainerRef.createComponent(ToastMessageComponent);

        componentRef.instance.setMessageType(data.messageType);
        componentRef.instance.setTitle(data.title);
        componentRef.instance.setMessage(data.message);

        return merge(
          componentRef.instance.onClose$,
          timer(data.durationMillis)
        ).pipe(
          // Ensures that we only operate on one of the observables for safety reasons
          //  (it would be bad if we try to destroy a non-existent component)
          take(1),
          tap(() => {
            // Doesn't really matter which one completes first or what data is returned
            //  since they're just used to signal the destruction of the toast component
            componentRef.destroy();
          }),
          // Keep this in-case the app closes while a toast is still alive (for edge-cases)
          takeUntil(serviceDestroyedSubject$),
        );
      }),
      takeUntil(serviceDestroyedSubject$),
    ).subscribe();
  }
}
