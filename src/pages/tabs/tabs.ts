import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TabsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
   
@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1Root: string;
  tab2Root: string;
  tab3Root: string;
  tab4Root: string;
<<<<<<< HEAD
  tab5Root: string;
=======

>>>>>>> origin/jozef

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.tab1Root = 'InboxPage';
    this.tab2Root = 'ChannelPage';
<<<<<<< HEAD
    this.tab3Root = 'EventCreatePage';
    this.tab4Root = 'ExplorePage';
    this.tab5Root = 'ProfilePage';  
=======
    this.tab3Root = 'EventListPage';
    this.tab4Root = 'EventCreatePage';
>>>>>>> origin/jozef
  }


}
