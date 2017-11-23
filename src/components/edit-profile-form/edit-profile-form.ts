import { AlertController } from 'ionic-angular/components/alert/alert-controller';
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
  public defaultProfilePicture: string;
  private userNameList = [];
  private profileRef: firebase.database.Reference;

  @Output() saveProfileResult: EventEmitter<Boolean>;

  constructor(private data: DataProvider, private auth: AuthProvider, private navCtrl: NavController, private cameraPlugin: Camera, private alertCtl: AlertController) {
    this.defaultProfilePicture = "https://firebasestorage.googleapis.com/v0/b/sp-login-94206.appspot.com/o/profileImgs%2Fprofile-placeholder.png?alt=media&token=fe0933c1-891b-43c9-8ea1-364b7759fa88";
    this.saveProfileResult = new EventEmitter<Boolean>();
    this.authenticatedUser$ = this.auth.getAuthenticatedUser().subscribe((user: User) => {
      this.authenticatedUser = user;
    });
    this.profileRef = firebase.database().ref(`profiles`);
    this.profile.userType = 'standard';
  }

  ionViewDidLoad(){
    this.profileRef.on('value', profiles => {
      let nameList = [];
      profiles.forEach( profile => {
        nameList.push(profile.val().userName);
        return false;
      });
      this.userNameList = nameList;
      console.log(this.userNameList);
    });
  }

  saveProfile() {
    if (!this.profile.userName){
      this.showEmptyUsernameAlert();
    } else if (!this.profile.location) {
      this.showLocationAlert();
    } else if (this.userNameList.indexOf(this.profile.userName.toLowerCase().trim()) > -1){
      this.showUsernameAlert();
    } else { 
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
        this.profile.avatar = "https://firebasestorage.googleapis.com/v0/b/sp-login-94206.appspot.com/o/profileImgs%2Fprofile-placeholder.png?alt=media&token=fe0933c1-891b-43c9-8ea1-364b7759fa88";
        console.log(this.profile.avatar);
        result = this.data.saveProfile(this.authenticatedUser, this.profile);
        this.saveProfileResult.emit(result);
      }
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
      title: 'Unique Username is Required!',
      subTitle: 'The user name is already taken',
      buttons: ['OK']
    });
    aleUnique Username rt.present();
    this.profile.userName = "";
  }

  showLocationAlert() {
    let alert = this.alertCtl.create({
      title: 'Location is Required!',
      subTitle: 'Location must be filled',
      buttons: ['OK']
    });
    alert.present();
    this.profile.userName = "";
  }

  ngOnDestroy(): void {
    this.authenticatedUser$.unsubscribe();
  }

  showEmptyUsernameAlert() {
    let alert = this.alertCtl.create({
      title: 'User Name Required',
      subTitle: 'User name must not be empty',
      buttons: ['OK']
    });
    alert.present();
  }
}
