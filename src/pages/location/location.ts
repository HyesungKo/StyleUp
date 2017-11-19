import { Component, OnInit } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

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
export class LocationPage implements OnInit {

  autocompArray: any;
  autocompInput: any;
  autocompService: any;
  //placesService: any;

  constructor(private navParams: NavParams, private view: ViewController) {
  }

  ngOnInit() {
    this.autocompService = new google.maps.places.AutocompleteService();        
    this.autocompArray = [];
    this.autocompInput = '';
  }

  closeModal() {
    this.view.dismiss();
  }

  ionViewDidLoad() {
    console.log('LocationPage loaded');
  }

  chooseItem(item: any) {
    console.log('modal > chooseItem > item > ', item);
    this.view.dismiss(item);
  }

  updateSearch() {
    console.log('modal > updateSearch');
    if (this.autocompInput == '') {
        this.autocompArray = [];
        return;
    }
    let self = this;
    let request = { 
        input: this.autocompInput,
        types:  ['(cities)']
    }
    this.autocompService.getPlacePredictions(request, function (predictions, status) {
        console.log('modal > getPlacePredictions > status > ', status);
        self.autocompArray = [];            
        predictions.forEach(function (prediction) {              
            self.autocompArray.push(prediction);
        });
    });
  }
}
