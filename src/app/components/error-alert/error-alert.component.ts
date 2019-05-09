import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-alert',
  templateUrl: './error-alert.component.html',
  styleUrls: ['./error-alert.component.scss']
})
export class ErrorAlertComponent implements OnInit {
  public msg = '';
  public redirect;
  public hidden = true;
  constructor() { }

  ngOnInit() {
  }

  showAlert(msg, redirect= '') {
    this.msg = msg;
    this.redirect = redirect;
    this.hidden = false;
  }

}
