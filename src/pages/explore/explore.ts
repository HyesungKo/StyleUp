import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';

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
  allList: any
  public profiles: firebase.database.Reference;
  public currentList: firebase.database.Reference;
  postType = 'standard';
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.profiles = firebase.database().ref(`profiles`);
  }

  ionViewDidLoad() {

    this.profiles.on('value', snapshot => {
      let rawList = [];
      snapshot.forEach(snap => {
        this.currentList = firebase.database().ref('profiles/' + snap.key + '/posts');
        this.currentList.on('value', snapshot2 => {
          snapshot2.forEach(snap2 => {
            rawList.push({
              id: snap2.key,
              eventLocation: snap2.val().eventLocation,
              photo: snap2.val().photo,
            });
            return false
          });
        });
        return false
      });
      this.allList = rawList;
    });
  }

  getEventList(posts): firebase.database.Reference {
    return this.profiles.child(posts);
  }

  goToEventDetail(eventId) {
    this.navCtrl.push('EventDetailPage', { eventId: eventId });
  }

}
