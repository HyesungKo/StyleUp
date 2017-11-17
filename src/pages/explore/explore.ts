import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
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
  currentCity: string;


  constructor(public navCtrl: NavController, private geolocation: Geolocation, private geocoder: NativeGeocoder) {
    this.posts = firebase.database().ref(`posts`);
  }

  ionViewDidEnter() {
    //this.doRefresh(0);
    this.getUserPosition();

    this.posts.on('value', snapshot => {
      let normalList = [];
      let boutiqueList = [];
      snapshot.forEach(snap => {
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
        return false;
      });
      this.normalList = normalList.reverse();
      this.boutiqueList = boutiqueList.reverse();
    });

    console.log('ionViewDidLoad ExplorePage');
  }

  doRefresh(refresher) {
    this.ionViewDidEnter();
    
    refresher.complete();
  }

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
      this.getCity(pos);
      console.log(pos);
    }, (err: PositionError) => {
      console.log("error : " + err.message);
    });
  }
  
  getCity(pos) {
    this.geocoder.reverseGeocode(pos.coords.latitude, pos.coords.longitude).then((res: NativeGeocoderReverseResult) => {
      let city = res.locality;
      this.currentCity = city;
      console.log("city: " + this.currentCity);
    });
  }
}
