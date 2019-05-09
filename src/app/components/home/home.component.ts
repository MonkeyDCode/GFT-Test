import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { SessionService } from '../../services/session.service';
import { ErrorAlertComponent } from '../error-alert/error-alert.component';
import { LoaderComponent } from '../loader/loader.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private apiService: ApiService, private session: SessionService) { }
  private accounts = [];
  private catalog = {_id: '', type_cards: []};
  @ViewChild (ErrorAlertComponent) errorAlert: ErrorAlertComponent;
  ngOnInit() {
    this.getAccounts();
    this.getCatalog();
  }

  getAccounts(){
    const token = this.session.get('token');
    this.apiService.get('accounts', token)
      .then(data => {
        const accounts = data['response'];
        if (accounts) {
          accounts['length'] > 0 ? this.accounts = accounts : this.accounts = [];
        } else {
          this.errorAlert.showAlert('NO se pueden consultar las cuentas :(');
        }
      })
      .catch(error => {
        this.errorAlert.showAlert('NO se pueden consultar las cuentas :(');
      });
  }
  getCatalog(){
    const token = this.session.get('token');
    this.apiService.get('catalogs/cards', token)
      .then(data => {
        const catalog = data['response'];
        if (catalog) {
          this.catalog = catalog;
          this.session.set('catalog', catalog );
        } else {
          this.errorAlert.showAlert('NO se pueden consultar el catalogo :(');
        }
      })
      .catch(error => {
        this.errorAlert.showAlert('NO se pueden consultar el catalogo :(');
      });
  }

}
