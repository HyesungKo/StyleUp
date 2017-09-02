import { EventProvider } from './../../providers/event/event';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


/**
 * Generated class for the EventDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-event-detail',
    templateUrl: 'event-detail.html',
  })
export class EventDetailPage {
  currentEvent: any;

  
  constructor(public nav: NavController, public navParams: NavParams, 
    public eventData: EventProvider) {}

  ionViewDidEnter(){
    this.eventData.getEventDetail(this.navParams.get('eventId')).on('value', snapshot => {
      this.currentEvent = snapshot.val();
      this.currentEvent.id = snapshot.key;
    });
  }
}
