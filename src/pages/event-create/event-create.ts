import { DataProvider } from './../../providers/data/data.service';
//import { EventProvider } from './../../providers/event/event';
import { Component } from '@angular/core';
import { NavController, IonicPage, AlertController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import firebase from 'firebase';
import { User } from 'firebase/app';
import { Profile } from '../../models/profile/profile.interface';

@IonicPage()
@Component({
  selector: 'page-event-create',
  templateUrl: 'event-create.html',
})
export class EventCreatePage {
  postPicture: string;
  eventLocation: string;
  eventCaption: string;
  eventHashtags: string;

  alertCtrl: AlertController;
  public currentUser: User;
  public profile: Profile;
  public posts: firebase.database.Reference;

  constructor(public navCtrl: NavController/*, public eventData: EventProvider*/, public cameraPlugin: Camera,
   alertCtrl: AlertController, private data: DataProvider) {
    this.currentUser = firebase.auth().currentUser;
    this.data.getProfile(this.currentUser).subscribe(profile => {
      this.profile = <Profile>profile;
    });
    this.posts = firebase.database().ref(`posts`);
    this.alertCtrl = alertCtrl;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventCreatePage');
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

    upload(eventLocation: string ,eventCaption: string, eventHashtags: string) {
    this.eventCaption= eventCaption;
    this.eventHashtags= eventHashtags;
    this.eventLocation= eventLocation;

    let storageRef = firebase.storage().ref();
    // Create a timestamp as filename
    const filename = Math.floor(Date.now() / 1000);

    // Create a reference to 'images/todays-date.jpg'
    const imageRef = storageRef.child(`images/${filename}.jpg`);
     imageRef.putString(this.postPicture, firebase.storage.StringFormat.DATA_URL).then((snapshot)=> {
           this.posts.push({
            name: eventLocation,
            caption: eventCaption,
            hashtags: eventHashtags,
            //photo: this.postPicture,
            photo: snapshot.downloadURL,
            userType: this.profile.userType,
            uid: this.currentUser.uid,
            userName: this.profile.userName
          });
       this.showSuccesfulUploadAlert();
       this.navCtrl.setRoot('TabsPage');

      //  nav.popToRoot() 
       //this.navCtrl.popToRoot();
     // Do something here when the data is succesfully uploaded!
    });
  }

   showSuccesfulUploadAlert() {
    let alert = this.alertCtrl.create({
      title: 'Uploaded!',
      subTitle: 'Picture is uploaded to Firebase',
      buttons: ['OK']
    });
    alert.present();

    // clear the previous photo data in the variable
    this.postPicture = "";
    this.eventLocation= null;
    this.eventCaption= null;
    this.eventHashtags= null;
  }

  getEventDetail(eventId): firebase.database.Reference {
    return this.posts.child(eventId);
  }



}
