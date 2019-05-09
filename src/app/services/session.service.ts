import { Injectable } from '@angular/core';
import {  SessionStorageService } from 'angular-web-storage';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor( public session: SessionStorageService) { }

  set(key, value) {
    this.session.set(key, value);
  }

  remove(key) {
    this.session.remove(key);
  }

  get(key) {
   return  this.session.get(key);
  }

  clear() {
    this.session.clear();
  }
}
