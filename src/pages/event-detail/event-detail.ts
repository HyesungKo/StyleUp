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
  public currentIndex: number;
  private posts: firebase.database.Reference;
  public currentUser: string;
  public owner: boolean;
  public similarPost = [];

  private currentPostRef: firebase.database.Reference;
  private likedPostsRef: firebase.database.Reference;
  private dislikedPostsRef: firebase.database.Reference;
  private likedPostList = [];
  private dislikedPostList = [];

  constructor(public navC: NavController, public navParams: NavParams) {
    this.currentUser = firebase.auth().currentUser.uid;
    this.posts = firebase.database().ref(`posts`);
    this.currentPost = this.navParams.get('post');
    this.likedPostsRef = firebase.database().ref(`profiles/${this.currentUser}/likedPosts`);
    this.dislikedPostsRef = firebase.database().ref(`profiles/${this.currentUser}/dislikedPosts`);
    this.currentPostRef = firebase.database().ref(`posts/${this.currentPost.id}`);
    this.owner = (this.currentPost.uid === this.currentUser);
  }

  ionViewDidLoad(){

    this.likedPostsRef.on('value', posts => {
      let list = [];
      posts.forEach( post => {
          list.push(post.val().key);
        return false;
      });
      this.likedPostList = list.reverse();
    });

    this.dislikedPostsRef.on('value', posts => {
      let list = [];
      posts.forEach( post => {
          list.push(post.val().key);
        return false;
      });
      this.dislikedPostList = list.reverse();
    });
    
    this.posts.on('value', posts => {
      let list = [];
      let hashtagList = this.currentPost.hashtags.match(/#\S+/g);
      if (!(hashtagList === null)){
        posts.forEach( post => {
          for(var i = 0; i < hashtagList.length; i++){
            if (post.key !== this.currentPost.id){
              if(post.val().hashtags.toLowerCase().includes(hashtagList[i].toLowerCase())){
                list.push({
                  id: post.key,
                  location: post.val().location,
                  photo: post.val().photo,
                  caption: post.val().caption,
                  hashtags: post.val().hashtags,
                  userType: post.val().userType,
                  userName: post.val().userName,
                  uid: post.val().uid,
                  thumbUp: post.val().thumbUp,
                  thumbDown: post.val().thumbDown
                });
              }
            }
          }
          return false;
        });
      }
      this.similarPost = list.reverse();
    });
  }

  navigateToEditPostPage() {
    this.navC.push('EditPostPage', {currentPost: this.currentPost});
  }

  toggleUp(currentPost){
    if(this.likedPostList.indexOf(this.currentPost.id) > -1) {
      currentPost.thumbUp = currentPost.thumbUp - 1;      
      this.currentPostRef.update({
        "thumbUp": currentPost.thumbUp
      });
      this.likedPostsRef.on('value', likedPosts => {
        likedPosts.forEach( post => {
          if(post.val().key === currentPost.id){
            post.ref.remove();
          }
          return false;
        });
      });
    } else {
      currentPost.thumbUp = currentPost.thumbUp + 1;      
      this.currentPostRef.update({
        "thumbUp": currentPost.thumbUp
      });
      this.likedPostsRef.push({
        key: currentPost.id
      });
    }
  }

  toggleDown(currentPost){
    if(this.dislikedPostList.indexOf(this.currentPost.id) > -1) {
      currentPost.thumbDown = currentPost.thumbDown - 1;
      this.currentPostRef.update({
        "thumbDown": currentPost.thumbDown
      });
      this.dislikedPostsRef.on('value', dislikedPosts => {
        dislikedPosts.forEach( post => {
          if(post.val().key === currentPost.id){
            post.ref.remove();
          }
          return false;
        });
      });
    } else {
      currentPost.thumbDown = currentPost.thumbDown + 1;
      this.currentPostRef.update({
        "thumbDown": currentPost.thumbDown
      });
      this.dislikedPostsRef.push({
        key: currentPost.id
      });
    }
  }

  goToEventDetail(post){
    this.navC.push('EventDetailPage', { post : post });
  }
/* 
  onSwipeRight() {
    this.navC.push('EventDetailPage', { postId : this.postList[this.currentIndex - 1].id, postList: this.postList});
  }

  onSwipeLeft() {
    this.navC.push('EventDetailPage', { postId : this.postList[this.currentIndex + 1].id, postList: this.postList});
  } */

  goToProfile(userName) {
    this.navC.push('ProfileSearchPage', { userName : this.currentPost.userName })
  }
}
