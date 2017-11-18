import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-inbox',
  templateUrl: 'inbox.html',
})
export class InboxPage {

  public inboxType = 'messages';
  public messageList = [];
  public profileList = [];

  private currentUser: string;
  private profileRef: firebase.database.Reference;
  private userMessageRef: firebase.database.Reference;
  private receiverMessageRef: firebase.database.Reference;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.currentUser = firebase.auth().currentUser.uid;
    this.profileRef = firebase.database().ref(`profiles`);
    this.userMessageRef = firebase.database().ref(`profiles/${this.currentUser}/messages`)
  }

  ionViewDidEnter(){

    this.userMessageRef.on('value', snapshot => {
      let messageList = [];
      snapshot.forEach( element => {
        messageList.push(element.val());
        return false;
      });
      this.messageList = messageList;
    });

    this.profileRef.on('value', snap =>{
      let profileList = [];
      snap.forEach( element => {
        console.log(element.key);
        if(this.currentUser !== element.key){
          profileList.push({
            profile: element.val(),
            key: element.key
          });
        }
        console.log(element.val());
        return false;
      });
      this.profileList = profileList;
    });
  }

  goToMessageDetail(profilekey) {
    this.navCtrl.push('MessageDetailPage', {profilekey: profilekey});
  }

  filterPost(ev: any) {
    this.ionViewDidEnter();
    if(this.inboxType === 'users'){
      let val = ev.target.value;
  
      if (val && val.trim() !== '') {
        this.profileList = this.profileList.filter(function(item) {
          return item.userName.toLowerCase().includes(val.toLowerCase());
        });
      }
    } else {
      let val = ev.target.value;
      
      if (val && val.trim() !== '') {
        this.messageList = this.messageList.filter(function(item) {
          return item.userName.toLowerCase().includes(val.toLowerCase());
        });
      }
    }
  }
}
