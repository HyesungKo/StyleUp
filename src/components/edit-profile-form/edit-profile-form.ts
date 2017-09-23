import { NavController } from 'ionic-angular';
import { AuthProvider } from './../../providers/auth/auth.service';
import { DataProvider } from './../../providers/data/data.service';
import { Profile } from './../../models/profile/profile.interface';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { User } from 'firebase/app';

/**
 * Generated class for the EditProfileFormComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'edit-profile-form',
  templateUrl: 'edit-profile-form.html'
})
export class EditProfileFormComponent implements OnDestroy{
  
  ngOnDestroy(): void {
    this.authenticatedUser$.unsubscribe();
  }

  private authenticatedUser$: Subscription;
  private authenticatedUser: User;
  profile = {} as Profile;

  constructor(private data: DataProvider, private auth: AuthProvider, private navCtrl: NavController) {
    this.authenticatedUser$ = this.auth.getAuthenticatedUser().subscribe((user: User) => {
      this.authenticatedUser = user;
    });
  }

  async saveProfile() {
    if (this.authenticatedUser){
      this.profile.email = this.authenticatedUser.email;
      const result = await this.data.saveProfile(this.authenticatedUser, this.profile);
      console.log(result);
    }
    this.navCtrl.setRoot('ProfilePage');
  }
}
