import { EventProvider } from './../../providers/event/event';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


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

  constructor(public navCtrl: NavController, public navParams: NavParams,public eventData: EventProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExplorePage');
    
  }

}
