  import { EventCreatePage } from '../event-create/event-create';
import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import firebase from 'firebase';
import { User } from 'firebase/app';

@IonicPage()
@Component({
  selector: 'page-event-detail',
  templateUrl: 'event-detail.html',
})
export class EventDetailPage {
  currentEvent: any;
  private posts: firebase.database.Reference;
  private currentUser: string;
  // private userOfPost: User;



  constructor(public navC: NavController, public navParams: NavParams, 
    ) {
        this.currentUser = firebase.auth().currentUser.uid;
        this.posts = firebase.database().ref(`posts`);
        // this.userOfPost = this.getEventDetail(this.navParams.get('eventId'))
  }

  ionViewDidEnter(){
      this.getEventDetail(this.navParams.get('eventId')).on('value', snapshot => {
      let rawList2 = [];
        rawList2.push({
          id: snapshot.key,
          eventLocation: snapshot.val().eventLocation,
          caption: snapshot.val().caption,
          photo: snapshot.val().photo,
          userType: snapshot.val().userType,
          userName: snapshot.val().UserName,
          uid: snapshot.val().uid
        });
        this.currentEvent = rawList2;
  });
  }

  getEventDetail(eventId): firebase.database.Reference {
    return this.posts.child(eventId);
  }
}
