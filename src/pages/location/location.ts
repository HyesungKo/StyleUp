import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { Geolocation, GeolocationOptions, Geoposition, PositionError } from '@ionic-native/geolocation';

/**
 * Generated class for the LocationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

declare var google: any;

@IonicPage()
@Component({
  selector: 'page-location',
  templateUrl: 'location.html',
})
export class LocationPage {

  autocompArray: any;
  autocompInput: any;
  autocompService: any;

  retSame: any = {description: ''};
  currentLocation: any = {description: 'Current Location'};

  constructor(private navParams: NavParams, private view: ViewController, private geolocation: Geolocation) {
  }

  ionViewDidLoad() {
    this.autocompService = new google.maps.places.AutocompleteService();        
    this.autocompArray = [];
    this.autocompInput = '';
    this.retSame.description = this.navParams.get('city');
    console.log(this.retSame.description);
  }

  //Updates the array of locations as a user types
  updateSearch() {
    if (this.autocompInput == '') {
        this.autocompArray = []; //no list of locations while input is empty
        return;
    }
    let self = this;
    let request = { 
        input: this.autocompInput,
        types:  ['(cities)']
    }
    this.autocompService.getPlacePredictions(request, function (predictions, status) {
        self.autocompArray = [];            
        predictions.forEach(function (prediction) {              
            self.autocompArray.push(prediction); //calls on google maps api to generate list of cities
        });
    });
  }

  //modal is closed because user decided to cancel
  closeModal() {
    this.view.dismiss(this.retSame);
  }

  //modal is closed after selecting a location from the list
  chooseItem(item: any) {
    this.view.dismiss(item);
  }


}
