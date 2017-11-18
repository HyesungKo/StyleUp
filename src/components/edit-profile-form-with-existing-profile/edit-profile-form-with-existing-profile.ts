import { NavController } from 'ionic-angular';
import { AuthProvider } from './../../providers/auth/auth.service';
import { DataProvider } from './../../providers/data/data.service';
import { Profile } from './../../models/profile/profile.interface';
import { Component, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { User } from 'firebase/app';
import { Camera } from '@ionic-native/camera';

@Component({
  selector: 'edit-profile-form-with-existing-profile',
  templateUrl: 'edit-profile-form-with-existing-profile.html'
})
export class EditProfileFormWithExistingProfileComponent implements OnDestroy{
  
  private authenticatedUser$: Subscription;
  private authenticatedUser: User;
  profile = {} as Profile;
  public postPicture: string;
  public defaultProfile = "assets/img/profile-placeholder.png";

  @Output() saveProfileResult: EventEmitter<Boolean>;

  constructor(private data: DataProvider, private auth: AuthProvider, private navCtrl: NavController, private cameraPlugin: Camera) {
    this.saveProfileResult = new EventEmitter<Boolean>();
    this.authenticatedUser$ = this.auth.getAuthenticatedUser().subscribe((user: User) => {
      this.authenticatedUser = user;
      this.data.getProfile(this.authenticatedUser).subscribe(profile => {
        this.profile = <Profile>profile;
      });
    });
  }

  async saveProfile() {
    let storageRef = firebase.storage().ref();
    const filename = Math.floor(Date.now() / 1000);
    const imageRef = storageRef.child(`profileImgs/${filename}.jpg`);
    let photoRef = imageRef.putString(this.postPicture, firebase.storage.StringFormat.DATA_URL);

    if (this.authenticatedUser){
      this.profile.email = this.authenticatedUser.email;
      this.profile.profilePhoto = photoRef.snapshot.downloadURL;
      const result = await this.data.saveProfile(this.authenticatedUser, this.profile);
      this.saveProfileResult.emit(result);
    }
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
