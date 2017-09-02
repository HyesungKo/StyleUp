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

  constructor() {
    this.currentUser = firebase.auth().currentUser.uid;
    this.eventList = firebase.database().ref(`userProfile/${this.currentUser}/eventList`);
    this.profilePictureRef = firebase.storage().ref('/userPosts/');

  }

  getEventList(): firebase.database.Reference {
    return this.eventList;
  }

  getEventDetail(eventId): firebase.database.Reference {
    return this.eventList.child(eventId);
  }

  createEvent(eventName: string, eventCaption: string,
    eventHashtags: string, guestPicture: any): firebase.Promise<any> {
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
