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

  constructor(public navC: NavController, public navParams: NavParams, 
    ) {
        this.currentUser = firebase.auth().currentUser.uid;
        this.posts = firebase.database().ref(`posts`);
        this.currentPost = this.navParams.get('post');
        console.log(this.currentPost);
        
        this.owner = (this.currentPost.uid === this.currentUser);
   
  }
  ionViewDidEnter(){

 /* 
      this.getEventDetail(this.navParams.get('eventId')).on('value', snapshot => {
      let event = ({
          id: snapshot.key,
          eventLocation: snapshot.val().name,
          caption: snapshot.val().caption,
          photo: snapshot.val().photo,
          hashtags: snapshot.val().hashtags,
          userType: snapshot.val().userType,
          userName: snapshot.val().userName,
          uid: snapshot.val().uid
        });
        this.currentEvent = event;
     }); */
  }


/*   getEventDetail(eventId): firebase.database.Reference {
    return this.posts.child(eventId);
  } */

  navigateToEditPostPage() {
    this.navC.push('EditPostPage', {currentPost: this.currentPost});
  }

  goToProfile(userName) {
    this.navC.push('ProfileSearchPage', { userName : this.currentPost.userName})
  }
}
