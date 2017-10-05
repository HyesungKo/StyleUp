import { Profile } from './../../models/profile/profile.interface';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { User } from 'firebase/app';
import "rxjs/add/operator/take";

@Injectable()
export class DataProvider {

  profileObject: FirebaseObjectObservable<Profile>;

  constructor(private database: AngularFireDatabase) {
  }

  async saveProfile(user: User, profile: Profile) {
    this.profileObject = this.database.object(`/profiles/${user.uid}`, {preserveSnapshot : true})
  
    try {
      await this.profileObject.set(profile);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
    
  }

  getProfile(user: User) {
    this.profileObject = this.database.object(`/profiles/${user.uid}`) 
    return this.profileObject.take(1);
  }

}
