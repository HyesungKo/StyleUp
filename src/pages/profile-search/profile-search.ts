import { Profile } from './../../models/profile/profile.interface';
import { DataProvider } from './../../providers/data/data.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';

/**
 * Generated class for the ProfileSearchPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile-search',
  templateUrl: 'profile-search.html',
})
export class ProfileSearchPage {

  public profile = {};
  private profiles: firebase.database.Reference;
  private posts: firebase.database.Reference;
  public userPosts: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private data: DataProvider) {
    this.profiles = firebase.database().ref(`profiles`);
    this.posts = firebase.database().ref(`posts`);
  }

  ionViewDidEnter(){
    this.profiles.on('value', snapshot => {
      let profile = {};
      snapshot.forEach( snap => {
        if (snap.val().userName === this.navParams.get('userName')){
          profile = {
            userName: snap.val().userName,
            userType: snap.val().userType,
          };
        } 
      return false;
      });
      this.profile = profile;
    });

    this.posts.on('value', snapshot => {
      let postList = [];
      snapshot.forEach( snap => {
        if (snap.val().userName === this.navParams.get('userName')) {         
          postList.push({
          id: snap.key,
          location: snap.val().name,
          photo: snap.val().photo,
          caption: snap.val().caption,
          hashtags: snap.val().hashtags,
          userType: snap.val().userType,
          userName: snap.val().userName,
          uid: snap.val().uid
          });
        }
        return false;
      });
      this.userPosts = postList;
    });
  }

  goToEventDetail(post){
    this.navCtrl.push('EventDetailPage', {post : post });
  }
}
