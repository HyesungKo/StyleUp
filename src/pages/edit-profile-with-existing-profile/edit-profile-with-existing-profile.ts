import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-edit-profile-form-with-existing-profile',
  templateUrl: 'edit-profile-with-existing-profile.html',
})
export class EditProfileWithExistingProfilePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  saveProfileResult(event: Boolean) {
    event? this.navCtrl.setRoot('ProfilePage') : console.log("not authenticated");
  }
}