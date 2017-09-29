import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer';

@IonicPage()
@Component({
  selector: 'page-boutique-request',
  templateUrl: 'boutique-request.html',
})

export class BoutiqueRequestPage{
  nameOfBoutique: String;

	constructor(public nav: NavController, private emailComposer: EmailComposer){

	}

	sendRequest(){
    let email = {
      to: 'kohs0429@gmail.com',
      subject: 'Boutique Request',
      body: '',
      isHtml : true
    };

		this.emailComposer.isAvailable().then((available: boolean) => {
			if(available) {

			}
		});

    this.emailComposer.open(email);

		this.nav.setRoot('LoginPage');

	}

	goToLogIn(): void {
    	this.nav.push('LoginPage');
  	}
}
