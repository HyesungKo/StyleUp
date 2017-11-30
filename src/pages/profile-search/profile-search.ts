import { DataProvider } from './../../providers/data/data.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { AuthProvider } from '../../providers/auth/auth.service';

@IonicPage()
@Component({
  selector: 'page-profile-search',
  templateUrl: 'profile-search.html',
})
export class ProfileSearchPage{

  public profile = {};
  private profiles: firebase.database.Reference;
  private posts: firebase.database.Reference;
  public userPosts: any;
  private authenticatedUserProfile: firebase.database.Reference;
  private authenticatedUserFollowing: firebase.database.Reference;
  public currentUser: string;
  public followingUsers =[];
  public followingUser: boolean;
  public following= 'yes';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.profiles = firebase.database().ref(`profiles`);
    this.posts = firebase.database().ref(`posts`);
    this.currentUser = firebase.auth().currentUser.uid;
    this.authenticatedUserProfile = firebase.database().ref(`profiles/${this.currentUser}`);
    this.authenticatedUserFollowing = firebase.database().ref(`profiles/${this.currentUser}/following`);
  }

  ionViewDidEnter(){
    this.profiles.on('value', snapshot => {
      let profile = {};
      snapshot.forEach( snap => {
        if (snap.val().userName === this.navParams.get('userName')){
          profile = {
            userName: snap.val().userName,
            userType: snap.val().userType,
            avatar: snap.val().avatar,
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
    this.authenticatedUserFollowing.on('value', snapshot => {
      let followingUsers = [];
      snapshot.forEach(snap => {
        followingUsers.push(snap.val().userName);
        return false;
      });
      this.followingUsers = followingUsers;
    });
  }

  isFollowing(profile, followingUsers) {
    for (var i = 0; i < followingUsers.length; i++){
      if (profile.userName === followingUsers[i]){      
        return true;
      }
    }
    return false;
  }

  unfollowUser(profile){
    this.authenticatedUserFollowing.on('value', snapshot => {
      snapshot.forEach(snap => {
        if(snap.val().userName === profile.userName){
          snap.ref.remove();
        }
        return false;
      });
    });
  }

  followUser(profile) {

    this.authenticatedUserFollowing.push({
      userName: profile.userName
    });
  }

  goToEventDetail(post){
    this.navCtrl.push('EventDetailPage', { post : post });
  }
}
