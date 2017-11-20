import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, Modal, ModalController } from 'ionic-angular';
import firebase from 'firebase';
import { Geolocation, GeolocationOptions, Geoposition, PositionError } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult } from '@ionic-native/native-geocoder';

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
  public normalList: any;
  public boutiqueList: any;
  public posts: firebase.database.Reference;
  public postType = 'standard';

  options: GeolocationOptions;
  currentPos: Geoposition;
  currentCity: any = 'Current Location';


  constructor(public navCtrl: NavController, private modal: ModalController, private geolocation: Geolocation, private geocoder: NativeGeocoder) {
    this.posts = firebase.database().ref(`posts`);
  }

  ionViewDidEnter() {
    //this.doRefresh(0);
    this.getUserPosition();

    this.posts.on('value', snapshot => {
      let normalList = [];
      let boutiqueList = [];
      snapshot.forEach(snap => {
        if (this.currentCity !== 'Current Location' && snap.val.name === this.currentCity) {
          if (snap.val().userType === 'boutique') {
            boutiqueList.push({
              id: snap.key,
              eventLocation: snap.val().name,
              photo: snap.val().photo,
              eventCaption: snap.val().caption,
              eventHashtag: snap.val().hashtags,
              userType: snap.val().userType
            });
          } else {
            normalList.push({
              id: snap.key,
              eventLocation: snap.val().name,
              photo: snap.val().photo,
              eventCaption: snap.val().caption,
              eventHashtag: snap.val().hashtags,
              userType: snap.val().userType
            });
          }
        } else {
          if (snap.val().userType === 'boutique') {
            boutiqueList.push({
              id: snap.key,
              eventLocation: snap.val().name,
              photo: snap.val().photo,
              eventCaption: snap.val().caption,
              eventHashtag: snap.val().hashtags,
              userType: snap.val().userType
            });
          } else {
            normalList.push({
              id: snap.key,
              eventLocation: snap.val().name,
              photo: snap.val().photo,
              eventCaption: snap.val().caption,
              eventHashtag: snap.val().hashtags,
              userType: snap.val().userType
            });
          }
        }
        return false;
      });
      this.normalList = normalList.reverse();
      this.boutiqueList = boutiqueList.reverse();
    });

    console.log('ionViewDidLoad ExplorePage');
  }

  /**doRefresh(refresher) {
    this.ionViewDidEnter();
    refresher.complete();
  }*///possible code for pull down to refresh

  goToEventDetail(eventId) {
    this.navCtrl.push('EventDetailPage', { eventId: eventId });
  }

  filterPost(ev: any) {
    this.ionViewDidEnter();
    if (this.postType === 'standard') {
      let val = ev.target.value;

      if (val && val.trim() !== '') {
        this.normalList = this.normalList.filter(function (item) {
          return item.eventHashtag.toLowerCase().includes(val.toLowerCase());
        });
      }
    } else {
      let val = ev.target.value;

      if (val && val.trim() !== '') {
        this.boutiqueList = this.boutiqueList.filter(function (item) {
          return item.eventHashtag.toLowerCase().includes(val.toLowerCase());
        });
      }
    }
  }

  getUserPosition() {
    this.options = {
      enableHighAccuracy: true
    };
    this.geolocation.getCurrentPosition(this.options).then((pos: Geoposition) => {
      this.currentPos = pos;
      console.log(pos);
    }, (err: PositionError) => {
      console.log("error : " + err.message);
    });
  }

  openLocationModal() {
    const myModal = this.modal.create('LocationPage', { city: this.currentCity });
    myModal.present();

    myModal.onDidDismiss((item) => {
      this.currentCity = item.description;
      this.ionViewDidEnter();      
    });
  }

}
