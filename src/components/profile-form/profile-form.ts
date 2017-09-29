import { FirebaseObjectObservable } from 'angularfire2/database';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';
import { User } from 'firebase/app';
import { Profile } from '../../models/profile/profile.interface';
import { DataProvider } from '../../providers/data/data.service';
import { AuthProvider } from '../../providers/auth/auth.service';

@Component({
  selector: 'profile-form',
  templateUrl: 'profile-form.html'
})
export class ProfileFormComponent {

  private authenticatedUser$: Subscription;
  private authenticatedUser: User;
  profile: FirebaseObjectObservable<Profile>;

  constructor(private data: DataProvider, private auth: AuthProvider, private navCtrl: NavController) {
    this.authenticatedUser$ = this.auth.getAuthenticatedUser().subscribe((user: User) => {
      this.authenticatedUser = user;
    });
    this.profile = this.data.getProfile(this.authenticatedUser);
  }
  navigateToEditProfile() {
    this.navCtrl.push('EditProfilePage');
  }
}
