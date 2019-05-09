import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-list-accounts',
  templateUrl: './list-accounts.component.html',
  styleUrls: ['./list-accounts.component.scss']
})
export class ListAccountsComponent implements OnInit {
  @Input() public accounts;
  constructor() { }

  ngOnInit() {
  }

}
