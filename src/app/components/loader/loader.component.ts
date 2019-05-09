import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  public hidden = true;
  constructor() { }

  ngOnInit() {
  }


  showLoader() {
    this.hidden = false;
  }
  hiddeLoader() {
    this.hidden = true;
  }
}
