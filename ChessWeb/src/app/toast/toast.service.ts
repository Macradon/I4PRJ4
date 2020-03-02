import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { Toast, ToastType } from './toast';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private subject = new Subject<Toast>();
  private keepAfterRouteChange = false;

  constructor(private router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
          if (this.keepAfterRouteChange) {
              // only keep for a single route change
              this.keepAfterRouteChange = false;
          } else {
              // clear alert messages
              this.clear();
          }
      }
  });
   }

   getAlert(): Observable<any> {
    return this.subject.asObservable();
}

success(options: Toast, keepAfterRouteChange = false, delay = 3000) {
    options.type = ToastType.Success;
    this.alert(options, keepAfterRouteChange, delay);
}

error(options: Toast, keepAfterRouteChange = false, delay = 3000) {
    options.type = ToastType.Error;
    this.alert(options, keepAfterRouteChange, delay);
}

alert(options: Toast, keepAfterRouteChange = false, delay = 3000) {
    this.keepAfterRouteChange = keepAfterRouteChange;
    this.subject.next(options);
    setTimeout(() => this.clear(), delay);
}

clear() {
    // clear alerts
    this.subject.next();
}

showDefaultError() {
    this.error({ message: `Connection to the server failed. Please check your connection or contact the AeroGuest team.` });
}
}
