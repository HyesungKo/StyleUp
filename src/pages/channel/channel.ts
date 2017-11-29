import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth.service';
import { DataProvider } from '../../providers/data/data.service';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-channel',
  templateUrl: 'channel.html',
})
export class ChannelPage {

  private currentUser: string;
  private profilesRef: firebase.database.Reference;
  private postRef: firebase.database.Reference;
  private followingRef: firebase.database.Reference;
  public followingUsersPosts = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthProvider, private data: DataProvider) {
    this.currentUser = firebase.auth().currentUser.uid;
    this.profilesRef = firebase.database().ref(`profiles`);
    this.postRef = firebase.database().ref(`posts`);
    this.followingRef = firebase.database().ref(`profiles/${this.currentUser}/following`)
  }

  ionViewWillEnter(){
   this.ionViewDidLoad();
  }

  ionViewDidLoad() {
    this.followingRef.on('value', snapshot => {
      let list = [];
      snapshot.forEach( user => {
        this.postRef.on('value', snap => {
          snap.forEach( post => {
            if(post.val().userName === user.val().userName){
              list.push({
                id: post.key,
                location: post.val().name,
                photo: post.val().photo,
                caption: post.val().caption,
                hashtags: post.val().hashtags,
                userType: post.val().userType,
                userName: post.val().userName,
                uid: post.val().uid,
                thumbUp: post.val().thumbUp,
                thumbDown: post.val().thumbDown
              });
            }
            return false;
          });
        });
        return false;
      });
      this.followingUsersPosts = list.reverse();
      console.log(this.followingUsersPosts);
    });
  }
    
  filterPost(ev: any) {
    this.ionViewDidLoad();
    let val = ev.target.value;

    if (val && val.trim() !== '') {
      this.followingUsersPosts = this.followingUsersPosts.filter(function(item) {
        return item.hashtags.toLowerCase().includes(val.toLowerCase());
      });
    }
  }
  
  goToEventDetail(post){
    this.navCtrl.push('EventDetailPage', { post : post });
  }
}
