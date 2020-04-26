import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PermaMessageComponent } from './perma-message/perma-message.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ACNH Critterpedia';

  constructor(private snackBar: MatSnackBar){}

  createPermaLink(event: Event) {
    event.stopImmediatePropagation();
    event.preventDefault();
    this.snackBar.openFromComponent(PermaMessageComponent);
  }
}
