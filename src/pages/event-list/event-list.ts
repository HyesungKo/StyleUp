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
  public eventList: firebase.database.Reference;
  public currentUser: string;

  constructor(public navCtrl: NavController) {
    this.currentUser = firebase.auth().currentUser.uid;
    this.eventList = firebase.database().ref(`userProfile/${this.currentUser}/eventList`);
  }
 
  ionViewDidEnter(){
        console.log("ypppp");

    this.eventList.on('value', snapshot => {
      let rawList = [];
      snapshot.forEach( snap => {
        rawList.push({
          id: snap.key,
          eventLocation: snap.val().eventLocation,
          photo: snap.val().photo,
        });
      return false
      });
      this.foo = rawList;
      console.log(this.eventList);
    });
  }

  goToEventDetail(eventId){
    this.navCtrl.push('EventDetailPage', { eventId: eventId });
  }
}