//import { EventProvider } from './../../providers/event/event';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EventDetailPage } from '../event-detail/event-detail';
import { ProfilePage } from '../profile/profile';
import { EventCreatePage } from '../event-create/event-create';


@Component({
  selector: 'page-event-list',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage {
  public eventList: any;

  constructor(public navCtrl: NavController, public eventData: EventCreatePage) {}

  ionViewDidEnter(){
    this.eventData.getEventList().on('value', snapshot => {
      let rawList = [];
      snapshot.forEach( snap => {
        rawList.push({
          id: snap.key,
          name: snap.val().name,
          photo: snap.val().photo,
        });
      return false
      });
      this.eventList = rawList;
    });
  }

  goToEventDetail(eventId){
    this.navCtrl.push(EventDetailPage, { eventId: eventId });
  }
}