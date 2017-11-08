import { NavController } from 'ionic-angular';
import { LoginResponse } from './../../models/login/login-response.interface';
import { AuthProvider } from './../../providers/auth/auth.service';
import { Account } from './../../models/account/account.interface';
import { Component, Output, EventEmitter } from '@angular/core';
import firebase from 'firebase';

@Component({
  selector: 'register-form',
  templateUrl: 'register-form.html'
})
export class RegisterFormComponent {
  public userInfo: firebase.database.Reference;

  userId : any;

  account = {} as Account;

  @Output() registerStatus: EventEmitter<LoginResponse>

  constructor(private auth: AuthProvider, private navCtrl: NavController) {
    this.registerStatus = new EventEmitter<LoginResponse>();
  }

  async register() {
    try{
      const result = await this.auth.createUserWithEmailAndPassword(this.account);
      //console.log(result.result.uid);
      this.userId=result.result.uid;
      this.userInfo = firebase.database().ref(`userProfile/${this.userId}`);
      this.userInfo.push({isBu : this.account.isB});
      this.registerStatus.emit(result);

      this.navCtrl.setRoot('LoginPage');
    }
    catch(e) {
      this.registerStatus.emit(e);
    }
  }
}
