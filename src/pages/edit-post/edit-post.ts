import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-edit-post',
  templateUrl: 'edit-post.html',
})
export class EditPostPage {

  private postPicture: string;
  public currentPost: any;
  public currentUser: string;
  public currentPostRef: firebase.database.Reference;

  constructor(public navCtrl: NavController, public navParams: NavParams, private modal: ModalController) {
    this.currentUser = firebase.auth().currentUser.uid;
    this.currentPost = this.navParams.get('currentPost');
    console.log(this.currentPost);
    this.currentPostRef = firebase.database().ref(`posts/${this.currentPost.id}`);
  }

  /* 
  * Update
  */
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

  openLocationModal() {
    const myModal = this.modal.create('LocationPage', { city: this.currentPost.location }); //passes current value of location in case user cancels
    myModal.present();

    myModal.onDidDismiss((item) => {
      this.currentPost.location = item.description; //sets new location
    });
  }

}
