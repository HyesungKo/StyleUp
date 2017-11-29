import { Profile } from './../../models/profile/profile.interface';
import { Subscription } from 'rxjs/Subscription';
import { AuthProvider } from './../../providers/auth/auth.service';
import { DataProvider } from './../../providers/data/data.service';
import { Component, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import firebase from 'firebase';
import { User } from 'firebase/app';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage implements OnDestroy{
  public myPosts = [];
  private posts: firebase.database.Reference;
  private currentUserUid: string;
  private currentUserProfile: Profile;
  private authenticatedUser$: Subscription;
  private authenticatedUser: User;
  private likedPostRef: firebase.database.Reference;
  private likedPostKeys = [];
  public likedPostList = [];
  public view = 'your';
  

  constructor(private navCtrl: NavController, private auth: AuthProvider, private data: DataProvider, private app: App){
    this.posts = firebase.database().ref('posts');
    this.authenticatedUser$ = this.auth.getAuthenticatedUser().subscribe((user: User) => {
      this.currentUserUid = user.uid;
      this.data.getProfile(user).subscribe(profile => {
        this.currentUserProfile = <Profile>profile;
      });
      this.likedPostRef = firebase.database().ref(`profiles/${this.currentUserUid}/likedPosts`);
      this.likedPostRef.on('value', posts => {
        let list = [];
        posts.forEach( post => {
          list.push(post.val().key);
          return false;
        });
        this.likedPostKeys = list;
      });
    });
  }

  navigateToEditProfile(){
    this.navCtrl.push('EditProfileWithExistingProfilePage');
  }

  ionViewDidEnter(){
   this.posts.on('value', snapshot => {
     let postList = [];
     let likedPostList = [];
     
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
          uid: snap.val().uid,
          thumbUp: snap.val().thumbUp,
          thumbDown: snap.val().thumbDown
         });
       }
       return false;
     });
     snapshot.forEach (snap => {
       if(this.likedPostKeys.indexOf(snap.key) > -1){
         likedPostList.push({
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
         })
       }
       return false;
     });
     this.myPosts = postList.reverse();
     this.likedPostList = likedPostList.reverse();
     
   });
  }

  goToEventDetail(currentPost){
    this.navCtrl.push('EventDetailPage', { post: currentPost });
  }

  signOut() {
    this.app.getRootNav().setRoot('LoginPage');
    this.auth.signOut();
  }

  ngOnDestroy(): void {    
    this.authenticatedUser$.unsubscribe();
  }

  ngOnDestroy(): void {
    this.authenticatedUser$.unsubscribe();
  }
}
