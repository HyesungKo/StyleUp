import { NavController } from 'ionic-angular';
import { AuthProvider } from './../../providers/auth/auth.service';
import { DataProvider } from './../../providers/data/data.service';
import { Profile } from './../../models/profile/profile.interface';
import { Component, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { User } from 'firebase/app';

@Component({
  selector: 'edit-profile-form-with-existing-profile',
  templateUrl: 'edit-profile-form-with-existing-profile.html'
})
export class EditProfileFormWithExistingProfileComponent implements OnDestroy{
  
  private authenticatedUser$: Subscription;
  private authenticatedUser: User;
  profile = {} as Profile;

  @Output() saveProfileResult: EventEmitter<Boolean>;

  constructor(private data: DataProvider, private auth: AuthProvider, private navCtrl: NavController) {
    this.saveProfileResult = new EventEmitter<Boolean>();
    this.authenticatedUser$ = this.auth.getAuthenticatedUser().subscribe((user: User) => {
      this.authenticatedUser = user;
      console.log(this.data.getProfile);
      this.data.getProfile(this.authenticatedUser).subscribe(profile => {
        this.profile = <Profile>profile;
      });
    });

    
  }

  async saveProfile() {
    if (this.authenticatedUser){
      this.profile.email = this.authenticatedUser.email;
      const result = await this.data.saveProfile(this.authenticatedUser, this.profile);
      this.saveProfileResult.emit(result);
    }
  }

  ngOnDestroy(): void {
    this.authenticatedUser$.unsubscribe();
  }
}
