import {takeUntil} from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Toast, ToastType } from './toast';
import { ToastService } from './toast.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.sass']
})
export class ToastComponent implements OnInit, OnDestroy {
    private unsubscribe = new Subject();
    alert: Toast;

    constructor(private alertService: ToastService) {
      this.alertService.getAlert().pipe(
        takeUntil(this.unsubscribe))
        .subscribe((alert: Toast) => {
        this.alert = alert;
      });
    }

    ngOnInit() {  
    }

    ngOnDestroy () {
      this.unsubscribe.next();
      this.unsubscribe.complete();
    }

    cssClass() {
      if (!this.alert) {
        return;
      }

      // return css class based on alert type
      switch (this.alert.type) {
        case ToastType.Success:
          return 'alert-success';
        case ToastType.Error:
          return 'alert-danger';
      }
    }
    clearToast() {
      this.alertService.clear();
    }
}

