import {Injectable} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class FlashService {

  collectMessages: any = [];
  displayMessages: any = [];

  constructor(private router: Router) {

    // Services don't use ngOnInit(), just a constructor.
    router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {

      // Send messages to display.
      // console.log('FlashService: Router event', event);
      this.displayMessages.pop();
      if (this.collectMessages.length > 0) {
        this.displayMessages.push(this.collectMessages[0]);
        this.collectMessages.pop();
      }
    });
  }

  tellSuccess(message, url?): void {
    this.collectMessages.pop();
    this.collectMessages.push(message);
    if (url) {
      //noinspection JSIgnoredPromiseFromCall
      this.router.navigate([url]);
    } else {
      // Force page reload.
      // Snagged from: https://stackoverflow.com/questions/40983055/how-to-reload-the-current-route-with-the-angular-2-router
      const currentUrl = this.router.url;
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
      });
    }
  }

  tellSuccessImmediately(message, url?): void {
    this.collectMessages.pop();
    this.displayMessages.pop();
    this.displayMessages.push(message);
  }
}
