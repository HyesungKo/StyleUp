import { LoginResponse } from './../../models/login/login-response.interface';
import { AuthProvider } from './../../providers/auth/auth.service';
import { Account } from './../../models/account/account.interface';
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'register-form',
  templateUrl: 'register-form.html'
})
export class RegisterFormComponent {

  account = {} as Account;

  @Output() registerStatus: EventEmitter<LoginResponse>

  constructor(private auth: AuthProvider) {
    this.registerStatus = new EventEmitter<LoginResponse>();
  }

  async register() {
    try{
      const result = await this.auth.createUserWithEmailAndPassword(this.account);
      this.registerStatus.emit(result);
      console.log(result);
    }
    catch(e) {
      this.registerStatus.emit(e);
    }
  }
}
