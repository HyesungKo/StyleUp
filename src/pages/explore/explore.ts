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

declare var google: any;

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

  geoOptions: GeolocationOptions = {
    enableHighAccuracy: true
  };
  cityTypes: Array<string> = ["locality", "political"];

  currentPos: any;
  currentCity: any = 'Current Location';
  //selectedCity: any = '';


  constructor(public navCtrl: NavController, private modal: ModalController, private geolocation: Geolocation, private geocoder: NativeGeocoder) {
    this.posts = firebase.database().ref(`posts`);
  }

  ionViewDidEnter() {
    //this.doRefresh(0);

    console.log(this.currentPos);
    console.log(this.currentCity);

    this.posts.on('value', snapshot => {
      let normalList = [];
      let boutiqueList = [];
      snapshot.forEach(snap => {
        if (snap.val().name === this.currentCity || this.currentCity === 'Current Location') {
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
      this.normalList = normalList.reverse(); //makes array recent first
      this.boutiqueList = boutiqueList.reverse(); //makes array recent first
    });

    console.log('ionViewDidEnter ExplorePage');
  }

  /**doRefresh(refresher) {
    this.ionViewDidEnter();
    refresher.complete();
  }*///possible code for pull down to refresh

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

  goToEventDetail(eventId) {
    this.navCtrl.push('EventDetailPage', { eventId: eventId });
  }

  
  openLocationModal() {
    const myModal = this.modal.create('LocationPage', { city: this.currentCity }); //passes current value of location in case user cancels
    myModal.present();

    myModal.onDidDismiss((item) => {
      this.currentCity = item.description; //sets new location
      this.ionViewDidEnter(); //resets the posts displayed
    });
  }


  //current location stuff
  getUserPosition(): any{
    console.log('computing now');
    this.geolocation.getCurrentPosition(this.geoOptions).then((pos: Geoposition) => {
      return pos; //uses ionic native geolocation
    }, (err: PositionError) => {
      console.log("error : " + err.message);
    });
  }

  getCurrentLocation(pos) {
    var myLatLng = new google.maps.LatLng({lat: pos.coords.latitude, lng: pos.coords.longitude});
    var geocoder = new google.maps.Geocoder();
    let self = this;
    geocoder.geocode({ 'location': myLatLng }, function (results, status) {
      if (status === "OK") {
        results.forEach(element => {
          if(element.types[0] == self.cityTypes[0] && element.types[1] == self.cityTypes[1]) { //checks for result that is city, nation
            console.log(element)
            let city = element.address_components[0].long_name;
            let state = element.address_components[2].short_name;
            let country = element.address_components[3].long_name;
            self.currentCity = city + ', ' + state + ', ' + country; //converts lat-lng to city and formats it to match location modal
          }
        });
        console.log(self.currentCity);
      } else {
        alert('Geocoder failed due to: ' + status);
      } 
    })
  }

}
