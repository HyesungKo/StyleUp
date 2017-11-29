import { Profile } from './../../models/profile/profile.interface';
import { User } from 'firebase/app';
import { AuthProvider } from './../../providers/auth/auth.service';
import { DataProvider } from './../../providers/data/data.service';
import { Component, OnInit } from '@angular/core';
import { LoadingController, Loading, NavController } from 'ionic-angular';

@Component({
  selector: 'profile-form',
  templateUrl: 'profile-form.html'
})
export class ProfileFormComponent{

  public userProfile: Profile;
  public loader: Loading;

  constructor(private loading: LoadingController, private data: DataProvider, private auth: AuthProvider, private navCtrl: NavController){
    this.loader = this.loading.create({
      content: 'Loading profile...'
    });
    this.loader.present();
    this.auth.getAuthenticatedUser().subscribe((user: User) => {
      this.data.getProfile(user).subscribe(profile => {
        this.userProfile = <Profile>profile;
        
        this.loader.dismiss();
      })
    })
  }
}
