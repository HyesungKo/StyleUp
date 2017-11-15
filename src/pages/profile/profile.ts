import { AuthProvider } from './../../providers/auth/auth.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  constructor(private navCtrl: NavController, private auth: AuthProvider){
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  navigateToEditProfile(){
    this.navCtrl.push('EditProfileWithExistingProfilePage');
  }

  signOut() {
    this.auth.signOut();
    this.navCtrl.setRoot('LoginPage');
  }
}
