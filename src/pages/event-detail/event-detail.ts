import { EventCreatePage } from '../event-create/event-create';
import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import firebase from 'firebase';
import { User } from 'firebase/app';

@IonicPage()
@Component({
  selector: 'page-event-detail',
  templateUrl: 'event-detail.html',
})
export class EventDetailPage {
  public currentPost: any;
  private posts: firebase.database.Reference;
  public currentUser: string;
  public owner: boolean;

  private likedPostsRef: firebase.database.Reference;
  private dislikedPostsRef: firebase.database.Reference;
  private likedPostList = [];
  private dislikedPostList = [];

  constructor(public navC: NavController, public navParams: NavParams) {
    this.currentUser = firebase.auth().currentUser.uid;
    this.posts = firebase.database().ref(`posts`);
    this.currentPost = this.navParams.get('post');
    console.log(this.currentPost);
    this.likedPostsRef = firebase.database().ref(`profiles/${this.currentUser}/likedPosts`);
    this.dislikedPostsRef = firebase.database().ref(`profiles/${this.currentUser}/dislikedPosts`);
    
    this.owner = (this.currentPost.uid === this.currentUser);
  }

  ionViewDidEnter(){
    this.likedPostsRef.on('value', posts => {
      let list = [];
      posts.forEach( post => {
          list.push(post.val().key);
        return false;
      });
      this.likedPostList = list;
    });
    this.dislikedPostsRef.on('value', posts => {
      let list = [];
      posts.forEach( post => {
          list.push(post.val().key);
        return false;
      });
      this.dislikedPostList = list;
    });
  }

  navigateToEditPostPage() {
    this.navC.push('EditPostPage', {currentPost: this.currentPost});
  }

  toggleUp(){
    if(this.likedPostList.indexOf(this.currentPost.id) > -1) {
      this.currentPost.thumbUp++;
      this.likedPostsRef.push({
        key: this.currentPost.id
      });
    } else {
      this.currentPost.thumbUp--;
      this.likedPostsRef.on('value', likedPosts => {
        likedPosts.forEach( post => {
          if(post.val().key === this.currentPost.id){
            post.ref.remove();
          }
          return false;
        });
      });
    }
    
  }

  toggleDown(){
    if(this.dislikedPostList.indexOf(this.currentPost.id) > -1) {
      this.currentPost.thumbDown++;
      this.dislikedPostsRef.push({
        key: this.currentPost.id
      });
    } else {
      this.currentPost.thumbUp--;
      this.dislikedPostsRef.on('value', dislikedPosts => {
        dislikedPosts.forEach( post => {
          if(post.val().key === this.currentPost.id){
            post.ref.remove();
          }
          return false;
        });
      });
    }
  }

  goToProfile(userName) {
    this.navC.push('ProfileSearchPage', { userName : this.currentPost.userName })
  }
}
