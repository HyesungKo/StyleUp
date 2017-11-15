import { EventCreatePage } from '../event-create/event-create';
import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import firebase from 'firebase';
import { User } from 'firebase/app';
/**
 * Generated class for the ExplorePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-explore',
  templateUrl: 'explore.html',
})
export class ExplorePage {
  public normalList: any;
  public boutiqueList: any;
  public posts: firebase.database.Reference;
  public postType = 'standard';
  

  constructor(public navCtrl: NavController) {
    this.posts = firebase.database().ref(`posts`);
  }
 
  ionViewDidEnter(){
    this.posts.on('value', snapshot => {
      let normalList = [];
      let boutiqueList = [];
      snapshot.forEach( snap => {
        if (snap.val().userType === 'regular'){
          normalList.push({
            id: snap.key,
            eventLocation: snap.val().name,
            photo: snap.val().photo,
            eventCaption: snap.val().caption,
            eventHashtag: snap.val().hashtags,
            userType: snap.val().userType
          });
        } else {
          boutiqueList.push({
            id: snap.key,
            eventLocation: snap.val().name,
            photo: snap.val().photo,
            eventCaption: snap.val().caption,
            eventHashtag: snap.val().hashtags,
            userType: snap.val().userType
          });
        }
       
      return false;
      });
      this.normalList = normalList;
      this.boutiqueList = boutiqueList;
    });
  }

  goToEventDetail(eventId){
    this.navCtrl.push('EventDetailPage', { eventId: eventId });
  }

  
  filterPost(ev: any) {
    this.ionViewDidEnter();
    if(this.postType === 'standard'){
      let val = ev.target.value;
  
      if (val && val.trim() !== '') {
        this.normalList = this.normalList.filter(function(item) {
          return item.eventCaption.toLowerCase().includes(val.toLowerCase());
        });
      }
    } else {
      let val = ev.target.value;
      
      if (val && val.trim() !== '') {
        this.boutiqueList = this.boutiqueList.filter(function(item) {
          return item.eventCaption.toLowerCase().includes(val.toLowerCase());
        });
      }
    }
    
  }
}
