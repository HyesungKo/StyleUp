import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';


@IonicPage()
@Component({
  selector: 'page-edit-post',
  templateUrl: 'edit-post.html',
})
export class EditPostPage {

  public currentPost: any;
  public currentUser: string;
  public currentPostRef: firebase.database.Reference;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.currentUser = firebase.auth().currentUser.uid;
    this.currentPost = this.navParams.get('currentPost');
    console.log(this.currentPost);
    
    this.currentPostRef = firebase.database().ref(`posts/${this.currentPost.id}`);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditPostPage');
  }

  updatePost(location : string, caption : string, hashtags: string) {
    this.currentPostRef.update({
      "name" : location,
      "caption" : caption,
      "hashtags" : hashtags
    });
  
  this.navCtrl.pop();
  }

  deletePost() {
    this.currentPostRef.remove();

    this.navCtrl.setRoot('ProfilePage');
  }

}
