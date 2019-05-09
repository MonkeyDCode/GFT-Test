import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ErrorAlertComponent } from '../error-alert/error-alert.component';
import { LoaderComponent } from '../loader/loader.component';
import { ApiService } from '../../services/api.service';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {
  @Input() public catalog;
  @ViewChild (ErrorAlertComponent) errorAlert: ErrorAlertComponent;
  @ViewChild (LoaderComponent) loader: LoaderComponent;
  public card = {userId: '', type: '', name: ''};
  public errorMsg = '';
  constructor(private apiService: ApiService, private session: SessionService) { }

  ngOnInit() {
  }
  validateForm() {
    this.errorMsg = '';
    this.card.type.localeCompare('') === 0 ? this.errorMsg =  this.errorMsg + '*Selecciona un tipo<br>' : this.errorMsg = this.errorMsg;
    this.card.name.localeCompare('') === 0 ? this.errorMsg =  this.errorMsg + '*Escribe un nombre<br>' : this.errorMsg = this.errorMsg;
    if (this.errorMsg === '') {
      this.card.userId = this.catalog['_id'];
      this.loader.showLoader();
      this.apiService.postWH('accounts', this.card, this.session.get('token'))
        .then(data =>{
          this.loader.hiddeLoader();
          this.card = {userId: '', type: '', name: ''};
          this.errorAlert.showAlert(data['success']);
        })
        .catch(error =>{
          this.loader.hiddeLoader();
          this.errorAlert.showAlert('Algo salio mal :(<br><br> Intentalo más tarde');
        })
    } else {
      this.errorAlert.showAlert(this.errorMsg);
    }

  }

}
