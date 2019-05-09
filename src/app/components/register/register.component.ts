import { Component, OnInit, ViewChild } from '@angular/core';
import { ErrorAlertComponent } from '../error-alert/error-alert.component';
import { ApiService } from '../../services/api.service';
import { LoaderComponent } from '../loader/loader.component';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public user = { name: '', lastname: '' , email: '' , password: '' };
  public errorMsg = '';
  @ViewChild (ErrorAlertComponent) errorAlert: ErrorAlertComponent;
  @ViewChild (LoaderComponent) loader: LoaderComponent;
  constructor(private apiService: ApiService) { }
  ngOnInit() {
  }
  validateForm() {
    this.errorMsg = '';
    console.log(this.user);
    this.user.name.localeCompare('') === 0 ? this.errorMsg =  this.errorMsg + '*Nombre requerido<br>' : this.errorMsg = this.errorMsg;
    this.user.lastname.localeCompare('') === 0 ? this.errorMsg =  this.errorMsg + '*Apellido requerido<br>' : this.errorMsg = this.errorMsg;
    this.user.email.localeCompare('') === 0 ? this.errorMsg =  this.errorMsg + '*Email requerido<br>' : this.errorMsg = this.errorMsg;
    this.user.password.localeCompare('') === 0 ? this.errorMsg =  this.errorMsg + '*Password requerido<br>' : this.errorMsg = this.errorMsg;
    if (this.errorMsg === '') {
      this.loader.showLoader();
       this.apiService.post('auth/user/create', this.user)
        .then(data => {
          this.loader.hiddeLoader();
          this.errorAlert.showAlert(data['success'], 'login')
        })
        .catch( error => {
          this.loader.hiddeLoader();
          this.errorAlert.showAlert(error.message);
         } );
    } else {
      this.errorAlert.showAlert(this.errorMsg);
    }
  }

}
