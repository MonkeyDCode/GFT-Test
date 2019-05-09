import { Component, OnInit, ViewChild } from '@angular/core';
import { ErrorAlertComponent } from '../error-alert/error-alert.component';
import { ApiService } from '../../services/api.service';
import { SessionService } from '../../services/session.service';
import * as jwt_decode from 'jwt-decode';
import { LoaderComponent } from '../loader/loader.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private user = { email: '' , password: '' };
  private errorMsg = '';
  @ViewChild (ErrorAlertComponent) errorAlert: ErrorAlertComponent;
  @ViewChild (LoaderComponent) loader: LoaderComponent;
  constructor(private apiService: ApiService, private session: SessionService, private router: Router) { }

  ngOnInit() {
  }

  validateForm(){
    this.errorMsg = '';
    this.user.email.localeCompare('') === 0 ? this.errorMsg =  this.errorMsg + '*Email requerido<br>' : this.errorMsg = this.errorMsg;
    this.user.password.localeCompare('') === 0 ? this.errorMsg =  this.errorMsg + '*Password requerido<br>' : this.errorMsg = this.errorMsg;
    if (this.errorMsg === '') {
      this.loader.showLoader();
       this.apiService.post('auth/user/authenticate', this.user)
        .then(data => {
          this.loader.hiddeLoader();
          const tokenInfo = jwt_decode(data['token']); // decode token
          this.session.set('token', data['token']);
          this.session.set('user', tokenInfo);
          this.router.navigate(['/home']);
        })
        .catch( error => {
          this.loader.hiddeLoader();
          this.errorAlert.showAlert(error.message || error.success || error.error);
         } );
    } else {
      this.errorAlert.showAlert(this.errorMsg);
    }
  }

}
