import { Subscription } from 'rxjs/Subscription';
import { AuthProvider } from './../../providers/auth/auth.service';
import { Component, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { User } from 'firebase/app';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage implements OnDestroy{
  public myPosts: any;
  private posts: firebase.database.Reference;
  private currentUserUid: string;
  private authenticatedUser$: Subscription;
  private authenticatedUser: User;

  constructor(private navCtrl: NavController, private auth: AuthProvider){
    this.posts = firebase.database().ref('posts');
    this.authenticatedUser$ = this.auth.getAuthenticatedUser().subscribe((user: User) => {
      this.currentUserUid = user.uid;
    });
  }

  navigateToEditProfile(){
    this.navCtrl.push('EditProfileWithExistingProfilePage');
  }

  ionViewDidEnter(){
   this.posts.on('value', snapshot => {
     let postList = [];
     snapshot.forEach( snap => {
       if (snap.val().uid === this.currentUserUid) {         
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
     this.myPosts = postList;
     
   });
  }

  goToEventDetail(post){
    this.navCtrl.push('EventDetailPage', { post: post });
  }

  signOut() {
    this.auth.signOut();
    this.navCtrl.setRoot('LoginPage');
  }

  ngOnDestroy(): void {
    this.authenticatedUser$.unsubscribe();
  }
}
