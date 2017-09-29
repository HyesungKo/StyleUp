import { EventCreatePage } from '../event-create/event-create';
import { Component } from '@angular/core';
import { EventDetailPage } from '../event-detail/event-detail';
import { NavController, IonicPage,NavParams} from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-event-list',
  templateUrl: 'event-list.html',
})
export class EventListPage {
  public eventList: any;
  constructor(public navCtrl: NavController, public eventData: EventCreatePage,public navParams: NavParams) {}

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