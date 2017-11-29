import { DataProvider } from './../../providers/data/data.service';
import { Profile } from './../../models/profile/profile.interface';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { User } from 'firebase';

@IonicPage()
@Component({
  selector: 'page-message-detail',
  templateUrl: 'message-detail.html',
})
export class MessageDetailPage {

  receiverProfile: any;
  currentUser: User;
  senderMessageRef: firebase.database.Reference;
  receiverMessageRef: firebase.database.Reference;
  
  public messageList = [];
  public message: string
  public profile = {} as Profile;

  constructor(public navCtrl: NavController, public navParams: NavParams, private data: DataProvider) {
    this.receiverProfile = this.navParams.get('profilekey');
    this.currentUser = firebase.auth().currentUser;
    this.data.getProfile(this.currentUser).subscribe(profile => {
      this.profile = <Profile>profile;
    });
    this.senderMessageRef = firebase.database().ref(`profiles/${this.currentUser.uid}/messages/${this.receiverProfile.profile.userName}`);
    this.receiverMessageRef = firebase.database().ref(`profiles/${this.receiverProfile.key}/messages/${this.profile.userName}`);
  }

  ionViewDidLoad() {
    this.senderMessageRef.on('value', snapshot => {
      let messageList = [];
      snapshot.forEach( element => {
        if(element.val().userName === this.receiverProfile.profile.userName){
          messageList.push(element.val());
        }
        return false;
      });
      this.messageList = messageList;
    });
  }

  sendMessage(){
    if(this.message){
      this.senderMessageRef.push({
        message: this.message,
        userName: this.receiverProfile.profile.userName,
        messageOwner: true,
        time: new Date().toISOString()
      });
      console.log(new Date().toISOString());
      
      this.receiverMessageRef.push({
        message: this.message,
        userName: this.profile.userName,
        messageOwner: false,
        time: new Date().toISOString() 
      });
    }
    this.message = ""; 
  }
}
