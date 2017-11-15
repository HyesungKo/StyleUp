import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';


@IonicPage()
@Component({
  selector: 'page-edit-post',
  templateUrl: 'edit-post.html',
})
export class EditPostPage {

  postPicture: string;
  eventLocation: string;
  eventCaption: string;
  eventHashtags: string;
  currentPost: any;

  // alertCtrl: AlertController;
  public currentUser: string;
  public posts: firebase.database.Reference;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.currentUser = firebase.auth().currentUser.uid;
    this.currentPost = this.navParams.get('currentPost');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditPostPage');
  }

}
