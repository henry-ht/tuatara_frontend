import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private readonly notifier: NotifierService) { }

  public success(msj:string) {
    this.notifier.notify('success', msj);
  }

  public warning(msj:string) {
    this.notifier.notify('warning', msj);
  }

  public info(msj:string) {
    this.notifier.notify('info', msj);
  }

  public error(msj:string) {
    this.notifier.notify('error', msj);
  }

  public hide(){
    this.notifier.hideNewest();
  }

  printMsj(body:any){
    for (const key in body['message']) {
      if (Object.prototype.hasOwnProperty.call(body['message'], key)) {
        const element = body['message'][key];
        for (const key in element) {
          if (Object.prototype.hasOwnProperty.call(element, key)) {
            const msj = element[key];
            if(body['status'] == 'error'){
              this.error(msj);
            }else if(body['status'] == 'success'){
              this.success(msj);
            }else{
              this.warning(msj);
            }
          }
        }
      }
    }
  }
}
