import { NavController } from 'ionic-angular';
import { AuthProvider } from './../../providers/auth/auth.service';
import { DataProvider } from './../../providers/data/data.service';
import { Profile } from './../../models/profile/profile.interface';
import { Component, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { User } from 'firebase/app';
import { Camera } from '@ionic-native/camera';
import firebase from 'firebase';
import { Alert } from 'ionic-angular/components/alert/alert';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

@Component({
  selector: 'edit-profile-form-with-existing-profile',
  templateUrl: 'edit-profile-form-with-existing-profile.html'
})
export class EditProfileFormWithExistingProfileComponent implements OnDestroy{
  
  private authenticatedUser$: Subscription;
  private authenticatedUser: User;
  profile = {} as Profile;
  public postPicture: string;
  public defaultProfile: string;
  private userNameList = [];
  private profileRef: firebase.database.Reference;

  @Output() saveProfileResult: EventEmitter<Boolean>;

  constructor(private data: DataProvider, private auth: AuthProvider, private navCtrl: NavController, private cameraPlugin: Camera, private alertCtl: AlertController) {
    this.defaultProfile = "assets/img/profile-placeholder.png";
    this.saveProfileResult = new EventEmitter<Boolean>();
    this.profileRef = firebase.database().ref(`profiles`);
    this.authenticatedUser$ = this.auth.getAuthenticatedUser().subscribe((user: User) => {
      this.authenticatedUser = user;
      this.data.getProfile(this.authenticatedUser).subscribe(profile => {
        this.profile = <Profile>profile;
      });
    });
  }

  removePicture() {
    this.profile.avatar = "https://firebasestorage.googleapis.com/v0/b/sp-login-94206.appspot.com/o/profileImgs%2Fprofile-placeholder.png?alt=media&token=fe0933c1-891b-43c9-8ea1-364b7759fa88";
  }

  saveProfile() {
    this.profile.email = this.authenticatedUser.email;
    let storageRef = firebase.storage().ref();
    const filename = Math.floor(Date.now() / 1000);
    const imageRef = storageRef.child(`profileImgs/${filename}.jpg`)
    var result: any;
    if(this.postPicture) {
      imageRef.putString(this.postPicture, firebase.storage.StringFormat.DATA_URL).then((snapshot) => {
        this.profile.avatar = snapshot.downloadURL;
        console.log(snapshot.downloadURL);
        console.log(this.profile.avatar);
        result = this.data.saveProfile(this.authenticatedUser, this.profile);
        this.saveProfileResult.emit(result);
      });
    } else {
      result = this.data.saveProfile(this.authenticatedUser, this.profile);
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

  showUsernameAlert() {
    let alert = this.alertCtl.create({
      title: 'Unique Username Required!',
      subTitle: 'The user name is already taken',
      buttons: ['OK']
    });
    alert.present();
    this.profile.userName = "";
  }

  ngOnDestroy(): void {
    this.authenticatedUser$.unsubscribe();
  }
}
