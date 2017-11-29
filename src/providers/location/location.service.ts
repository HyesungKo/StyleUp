import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Geolocation, GeolocationOptions, Geoposition, PositionError } from '@ionic-native/geolocation';
import 'rxjs/add/operator/map';

declare var google: any;

@Injectable()
export class LocationProvider {

  public geoOptions: GeolocationOptions = {enableHighAccuracy: true};
  public cityTypes: Array<string> = ["locality", "political"];

  public currentCoords: any;
  public currentLocation: any;

  constructor(private geolocation: Geolocation) {
    console.log('Hello LocationProvider Provider');
  }

  //gets users latitude and longitute coords
  getUserPosition() {
    console.log('computing coords now');
    this.geolocation.getCurrentPosition(this.geoOptions).then((pos: Geoposition) => {
      this.currentCoords = pos;
      this.getCurrentLocation(this.currentCoords);
      console.log(this.currentCoords); //returns current lat-lng using ionic native geolocation
    }, (err: PositionError) => {
      console.log("error : " + err.message);
    });
  }

  //converts latitutde and longitude to city,state,country
  getCurrentLocation(pos) {
    console.log('computing city now');
    var myLatLng = new google.maps.LatLng({lat: pos.coords.latitude, lng: pos.coords.longitude});
    var geocoder = new google.maps.Geocoder();
    let self = this;
    let combo = '';
    geocoder.geocode({ 'location': myLatLng }, function (results, status) {
      if (status === "OK") {
        results.forEach(element => {
          if(element.types[0] == self.cityTypes[0] && element.types[1] == self.cityTypes[1]) { //checks for result that is city, nation
            console.log(element)
            let city = element.address_components[0].long_name;
            let state = element.address_components[2].short_name;
            let country = element.address_components[3].long_name;
            combo = city + ', ' + state + ', ' + country; //converts lat-lng to city and formats it to match location modal
            self.currentLocation = combo;
            console.log(self.currentLocation);
          }
        });
      } else {
        alert('Geocoder failed due to: ' + status);
      } 
    })
  }

}
