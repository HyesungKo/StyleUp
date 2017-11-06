import { NavController } from 'ionic-angular';
import { LoginResponse } from './../../models/login/login-response.interface';
import { AuthProvider } from './../../providers/auth/auth.service';
import { Account } from './../../models/account/account.interface';
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'boutique-register-form',
  templateUrl: 'boutique-register-form.html'
})
export class BoutiqueRegisterFormComponent {

  account = {} as Account;

  @Output() registerStatus: EventEmitter<LoginResponse>

  constructor(private auth: AuthProvider, private navCtrl: NavController) {
    this.registerStatus = new EventEmitter<LoginResponse>();
  }

  async register() {
    try{
      const result = await this.auth.createUserWithEmailAndPassword(this.account);
      this.registerStatus.emit(result);
      this.navCtrl.setRoot('LoginPage');
    }
    catch(e) {
      this.registerStatus.emit(e);
    }
  }
}
