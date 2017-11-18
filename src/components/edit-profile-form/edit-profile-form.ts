import { NavController } from 'ionic-angular';
import { AuthProvider } from './../../providers/auth/auth.service';
import { DataProvider } from './../../providers/data/data.service';
import { Profile } from './../../models/profile/profile.interface';
import { Component, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { User } from 'firebase/app';
import { Camera } from '@ionic-native/camera';
import firebase from 'firebase';

@Component({
  selector: 'edit-profile-form',
  templateUrl: 'edit-profile-form.html'
})
export class EditProfileFormComponent implements OnDestroy{
  
  private authenticatedUser$: Subscription;
  private authenticatedUser: User;
  profile = {} as Profile;
  public postPicture: string;
  public defaultProfile: string;

  @Output() saveProfileResult: EventEmitter<Boolean>;

  constructor(private data: DataProvider, private auth: AuthProvider, private navCtrl: NavController, private cameraPlugin: Camera) {
    this.defaultProfile = "assets/img/profile-placeholder.png";
    this.saveProfileResult = new EventEmitter<Boolean>();
    this.authenticatedUser$ = this.auth.getAuthenticatedUser().subscribe((user: User) => {
      this.authenticatedUser = user;
      /* this.data.getProfile(this.authenticatedUser).subscribe(profile => {
        this.profile = <Profile>profile;
      }); */
    });
  }

  async saveProfile() {
    this.profile.email = this.authenticatedUser.email;
    let storageRef = firebase.storage().ref();
    const filename = Math.floor(Date.now() / 1000);
    if(this.postPicture) {
      storageRef.child(`profileImgs/${filename}.jpg`).putString(this.postPicture, firebase.storage.StringFormat.DATA_URL).then((snapshot) => {
        this.profile.profilePhoto = snapshot.downloadURL;
      });
      console.log(this.profile.profilePhoto);
    } else {
      this.profile.profilePhoto = "https://firebasestorage.googleapis.com/v0/b/sp-login-94206.appspot.com/o/profileImgs%2Fprofile-placeholder.png?alt=media&token=555e5017-a4bf-4b89-af6a-4ccd055e2f25";
      console.log(this.profile.profilePhoto);
    }
    const result = await this.data.saveProfile(this.authenticatedUser, this.profile);
    this.saveProfileResult.emit(result);
  }

  takePicture(){
    this.cameraPlugin.getPicture({
      quality : 95,
      destinationType : this.cameraPlugin.DestinationType.DATA_URL,
      sourceType : this.cameraPlugin.PictureSourceType.CAMERA,
      allowEdit : true,
      encodingType: this.cameraPlugin.EncodingType.PNG,
      targetWidth: 500,
      targetHeight: 500,
      saveToPhotoAlbum: true
    }).then(imageData => {
      this.postPicture = 'data:image/jpeg;base64,'+ imageData;
    }, error => {
      console.log("ERROR -> " + JSON.stringify(error));
    });
  }

  ngOnDestroy(): void {
    this.authenticatedUser$.unsubscribe();
  }
}
