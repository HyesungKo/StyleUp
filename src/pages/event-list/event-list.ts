import { EventCreatePage } from '../event-create/event-create';
import { Component } from '@angular/core';
import { NavController, IonicPage} from 'ionic-angular';
import firebase from 'firebase';


@IonicPage()
@Component({
  selector: 'page-event-list',
  templateUrl: 'event-list.html',
})
export class EventListPage {
  public foo: any;
  public posts: firebase.database.Reference;
  // public currentUser: string;

  constructor(public navCtrl: NavController) {
    // this.currentUser = firebase.auth().currentUser.uid;
    this.posts = firebase.database().ref(`posts`);
  }
 
  ionViewDidEnter(){
    this.posts.on('value', snapshot => {
      let rawList = [];
      snapshot.forEach( snap => {
        rawList.push({
          id: snap.key,
          eventLocation: snap.val().eventLocation,
          photo: snap.val().photo,
          eventCaption: snap.val().eventCaption,
          eventHashtag: snap.val().eventhashtag
        });
      return false
      });
      this.foo = rawList;
      console.log(this.foo[0]);
    });
  }

  goToEventDetail(eventId){
    this.navCtrl.push('EventDetailPage', { eventId: eventId });
  }
}