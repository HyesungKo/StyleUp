import { AlertController } from 'ionic-angular/components/alert/alert-controller';
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
  public chatList = [];
  public profileList = [];

  private currentUser: string;
  private profileRef: firebase.database.Reference;
  private userMessageRef: firebase.database.Reference;
  private receiverMessageRef: firebase.database.Reference;


  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCrl: AlertController) {
    this.currentUser = firebase.auth().currentUser.uid;
    this.profileRef = firebase.database().ref(`profiles`);
    this.userMessageRef = firebase.database().ref(`profiles/${this.currentUser}/messages`)
  }

  ionViewDidEnter(){

    this.userMessageRef.on('value', snapshot => {
      let chatList = [];
      snapshot.forEach( element => {
        chatList.push(element.key);
        return false;
      });
      this.chatList = chatList;      
    });

    this.profileRef.on('value', snap =>{
      let profileList = [];
      snap.forEach( element => {
        if(this.currentUser !== element.key){
          profileList.push({
            profile: element.val(),
            key: element.key
          });
        }
        return false;
      });
      this.profileList = profileList;
    });
  }

  goToMessageDetailFromMessageList(userName){
    let profile: any;
    this.profileList.forEach( element => {
      if (element.profile.userName === userName){
        profile = element;
      }
    });
    this.goToMessageDetail(profile);
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
          return item.profile.userName.toLowerCase().includes(val.toLowerCase());
        });
      }
    } else {
      let val = ev.target.value;
      
      if (val && val.trim() !== '') {
        this.chatList = this.chatList.filter(function(item) {
          return item.profile.userName.toLowerCase().includes(val.toLowerCase());
        });
      }
    }
  }

  deleteMessage(user){
    let confirm = this.alertCrl.create({
      title: 'Do you want to leave this Chat?',
      buttons: [
        {
          text: 'No',
          handler: () => {
          }
        },
        {
          text: 'Agree',
          handler: () => {
            this.userMessageRef.child(user).remove();
          }
        }
      ]
    });
    confirm.present();
  }
}
