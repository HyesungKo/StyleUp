import { DataProvider } from './../../providers/data/data.service';
import { LoginResponse } from './../../models/login/login-response.interface';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { User } from 'firebase/app';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(private navCtrl: NavController,
  private toast:ToastController) {
  }

  login(event: LoginResponse) {
    console.log(event);
    if(!event.error){
      this.toast.create({
        message: `Welcome to StyleUp, ${event.result.email}`,
        duration: 1
      }).present();
      this.navCtrl.setRoot('TabsPage');
    }
    else {
      this.toast.create({
        message: event.error.message,
        duration: 1
      }).present();
    }
  }

  navigateToResetPasswordPage(){
    this.navCtrl.push('ResetPasswordPage');
  }
}
