import { EventCreatePage } from '../event-create/event-create';
import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import firebase from 'firebase';
import { User } from 'firebase/app';

@IonicPage()
@Component({
  selector: 'page-explore',
  templateUrl: 'explore.html',
})
export class ExplorePage {
  public standardList: any;
  public boutiqueList: any;
  public posts: firebase.database.Reference;
  public postType = 'standard';
  

  constructor(public navCtrl: NavController) {
    this.posts = firebase.database().ref(`posts`);
  }
 
  ionViewDidEnter(){
    this.posts.on('value', snapshot => {
      let standardList = [];
      let boutiqueList = [];
      snapshot.forEach( snap => {
        if (snap.val().userType === 'standard'){
          standardList.push({
            id: snap.key,
            location: snap.val().location,
            photo: snap.val().photo,
            caption: snap.val().caption,
            hashtags: snap.val().hashtags,
            userType: snap.val().userType,
            userName: snap.val().userName,
            uid: snap.val().uid,
            thumbUp: snap.val().thumbUp,
            thumbDown: snap.val().thumbDown
          });
        } else if (snap.val().userType === 'boutique'){
          boutiqueList.push({
            id: snap.key,
            location: snap.val().location,
            photo: snap.val().photo,
            caption: snap.val().caption,
            hashtags: snap.val().hashtags,
            userType: snap.val().userType,
            userName: snap.val().userName,
            uid: snap.val().uid,
            thumbUp: snap.val().thumbUp,
            thumbDown: snap.val().thumbDown
          });
        }
       
        return false;
      });
      this.standardList = standardList.reverse();
      this.boutiqueList = boutiqueList.reverse();
    });
  }

  goToEventDetail(post){
    this.navCtrl.push('EventDetailPage', { post : post });
  }

  
  filterPost(ev: any) {
    this.ionViewDidEnter();
    if(this.postType === 'standard'){
      let val = ev.target.value;
  
      if (val && val.trim() !== '') {
        this.standardList = this.standardList.filter(function(item) {
          return item.hashtags.toLowerCase().includes(val.toLowerCase());
        });
      }
    } else {
      let val = ev.target.value;
      
      if (val && val.trim() !== '') {
        this.boutiqueList = this.boutiqueList.filter(function(item) {
          return item.hashtags.toLowerCase().includes(val.toLowerCase());
        });
      }
    }
  }
}
