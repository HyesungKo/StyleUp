import { Component } from '@angular/core';
import firebase from 'firebase';
//import { User } from 'firebase/app';
import { NavController, IonicPage, ModalController, LoadingController } from 'ionic-angular';
import { LocationProvider } from '../../providers/location/location.service';


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

  public currentCity: any = '';

  constructor(public navCtrl: NavController, private modal: ModalController, public loadingCtrl: LoadingController, private location: LocationProvider) {
    this.posts = firebase.database().ref(`posts`);
  }

  ionViewDidLoad() {
    this.location.getUserPosition();//begins locating the user right when explore page is loaded
  }

  ionViewCanEnter() {
    if(this.currentCity == ''){
      this.presentLoadingText();//displays a loading pop up to allow location to load before displaying posts
    }
  }

  ionViewDidEnter() {
    //this.doRefresh(0);
    if(this.location.currentLocation !== undefined && this.currentCity == '') {this.currentCity = this.location.currentLocation;}
    console.log(this.currentCity);

    this.posts.on('value', snapshot => {
      let standardList = [];
      let boutiqueList = [];
      snapshot.forEach(snap => {
        if (snap.val().name === this.currentCity) {
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

  //shows loading pop up while location loads, disables user interaction
  presentLoadingText() {
    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Loading Current Location...'
    });
    loading.present();
    setTimeout(() => {
      loading.dismiss();
      this.ionViewDidEnter();
    }, 5000);
  }

  //shows post detail when a post is clicked on
  goToEventDetail(post){
    this.navCtrl.push('EventDetailPage', { post : post });
  }

  //filters posts based on hashtag
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
}
