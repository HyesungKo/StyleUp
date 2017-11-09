  import { EventCreatePage } from '../event-create/event-create';
import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-event-detail',
  templateUrl: 'event-detail.html',
})
export class EventDetailPage {
  currentEvent: any;
  public eventList: firebase.database.Reference;
  public currentUser: string;



  constructor(public navC: NavController, public navParams: NavParams, 
    ) {
        this.currentUser = firebase.auth().currentUser.uid;
        this.eventList = firebase.database().ref(`userProfile/${this.currentUser}/eventList`);

  }

  ionViewDidEnter(){
      this.getEventDetail(this.navParams.get('eventId')).on('value', snapshot => {
      let rawList2 = [];
        rawList2.push({
          id: snapshot.key,
          eventLocation: snapshot.val().eventLocation,
          caption: snapshot.val().caption,
          photo: snapshot.val().photo,
        });
        this.currentEvent = rawList2;
  });
  }



  getEventDetail(eventId): firebase.database.Reference {
    return this.eventList.child(eventId);
  }
 



}
