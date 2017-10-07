import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import firebase from 'firebase';

/*
  Generated class for the EventProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class EventProvider {

  public currentUser: string;
  public eventList: firebase.database.Reference;
  public profilePictureRef: firebase.storage.Reference;

  constructor(private auth: AngularFireAuth, private data: AngularFireDatabase) {
    this.currentUser = this.auth.auth.currentUser.uid;
    this.eventList = this.data.database.ref(`profiles/${this.currentUser}/eventList`)
    this.profilePictureRef = firebase.storage().ref('/userPosts/');  }

  getEventList() {
    return this.eventList;
  }

  getEventDetail(eventId) {
    return this.eventList.child(eventId);
  }

  async createEvent(eventName: string, eventCaption: string,
    eventHashtags: string, guestPicture: any) {
   const filename = Math.floor(Date.now() / 1000);

   return this.profilePictureRef.child(`images/${filename}.png`)
      .putString(guestPicture, 'base64', {contentType: 'image/png'})
        .then((savedPicture) => {

          this.eventList.push({
            name: eventName,
            caption: eventCaption,
            hashtags: eventHashtags,
            photo: savedPicture.downloadURL,

          });
        });
      }
}
