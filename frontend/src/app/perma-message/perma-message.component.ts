import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfigurationService } from '../shared/service/configuration.service';

@Component({
  selector: 'app-perma-message',
  templateUrl: './perma-message.component.html',
  styleUrls: ['./perma-message.component.scss'],
})
export class PermaMessageComponent implements AfterViewInit {
  link: string;

  @ViewChild('linkInput') linkInput: ElementRef;

  constructor(
    private configurationService: ConfigurationService,
    private snackBar: MatSnackBar
  ) {
    this.link = this.configurationService.createPermaLink();
  }

  ngAfterViewInit(): void {
    this.linkInput.nativeElement.select();
  }

  copy() {
    this.linkInput.nativeElement.select();
    document.execCommand('copy');
  }

  close() {
    this.snackBar.dismiss();
  }
}
