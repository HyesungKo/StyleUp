import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, Modal, ModalController } from 'ionic-angular';
import firebase from 'firebase';
import { Geolocation, GeolocationOptions, Geoposition, PositionError } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult } from '@ionic-native/native-geocoder';
import { User } from 'firebase/app';


declare var google: any;

@IonicPage()
@Component({
  selector: 'page-explore',
  templateUrl: 'explore.html',
})
export class ExplorePage {
  public standardList: any;
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

  ionViewDidLoad() {
    this.getUserPosition();
  }

  ionViewDidEnter() {
    //this.doRefresh(0);
    if(this.currentPos !== undefined && this.currentCity == 'Current Location') {this.getCurrentLocation(this.currentPos);}
    
    console.log(this.currentPos);
    console.log(this.currentCity);

    this.posts.on('value', snapshot => {
      let standardList = [];
      let boutiqueList = [];
      snapshot.forEach(snap => {
        if (snap.val().name === this.currentCity || this.currentCity === 'Current Location') {
          if (snap.val().userType === 'standard') {
            standardList.push({
              id: snap.key,
              location: snap.val().name,
              photo: snap.val().photo,
              caption: snap.val().caption,
              hashtags: snap.val().hashtags,
              userType: snap.val().userType,
              userName: snap.val().userName,
              uid: snap.val().uid,
              thumbUp: snap.val().thumbUp,
              thumbDown: snap.val().thumbDown
            });
          } else if (snap.val().userType === 'boutique') {
            boutiqueList.push({
              id: snap.key,
              location: snap.val().name,
              photo: snap.val().photo,
              caption: snap.val().caption,
              hashtags: snap.val().hashtags,
              userType: snap.val().userType,
              userName: snap.val().userName,
              uid: snap.val().uid,
              thumbUp: snap.val().thumbUp,
              thumbDown: snap.val().thumbDown
            });
          }
        }
        return false;
      });
      this.standardList = standardList.reverse();
      this.boutiqueList = boutiqueList.reverse();
    });
  }

  goToEventDetail(post){
    this.navCtrl.push('EventDetailPage', { post : post });
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
        this.standardList = this.standardList.filter(function(item) {
          return item.hashtags.toLowerCase().includes(val.toLowerCase());
        });
      }
    } else {
      let val = ev.target.value;

      if (val && val.trim() !== '') {
        this.boutiqueList = this.boutiqueList.filter(function(item) {
          return item.hashtags.toLowerCase().includes(val.toLowerCase());
        });
      }
    }
  }
  
  //opens screen to select location
  openLocationModal() {
    const myModal = this.modal.create('LocationPage', { city: this.currentCity }); //passes current value of location in case user cancels
    myModal.present();

    myModal.onDidDismiss((item) => {
      this.currentCity = item.description; //sets new location
      this.ionViewDidEnter(); //resets the posts displayed
    });
  }


  //current location stuff
  getUserPosition() {
    console.log('computing coords now');
    this.geolocation.getCurrentPosition(this.geoOptions).then((pos: Geoposition) => {
      this.currentPos = pos; //sets current lat-lng using ionic native geolocation
      console.log(this.currentPos);
    }, (err: PositionError) => {
      console.log("error : " + err.message);
    });
  }

  getCurrentLocation(pos) {
    console.log('computing city now');
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
