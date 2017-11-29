import { AngularFireDatabase } from 'angularfire2/database';
import { LoginResponse } from './../../models/login/login-response.interface';
import { Account } from './../../models/account/account.interface';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';


@Injectable()
export class AuthProvider {

  constructor(private auth: AngularFireAuth ) {
    console.log('Hello AuthProvider Provider');
  }

  getAuthenticatedUser() {
    return this.auth.authState;
  }

  getAuthenticatedUserUid(){
    return this.auth.auth.currentUser.uid;
  }

  resetPassword(email: string) {
    return this.auth.auth.sendPasswordResetEmail(email);
  }

  async createUserWithEmailAndPassword(account: Account) {
    try {
      return <LoginResponse>{
        result: await this.auth.auth.createUserWithEmailAndPassword(account.email, account.password)
      }
    } catch (e) {
      return <LoginResponse>{
        error: e
      }
    }
  }

  async signInWithEmailAndPassword(account: Account) {
    try{
      return <LoginResponse> {
        result: await this.auth.auth.signInWithEmailAndPassword(account.email, account.password)
      }
    }
    catch(e) {
      return <LoginResponse> {
        error: e
      }
    }
  }

  signOut() {
    this.auth.auth.signOut();
  }

}
