import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { EmailComposer } from '@ionic-native/email-composer';


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
      body: '<p>Name of Boutique: <br>businessAccount: <br>phoneNumber: <br>email: <br>address: <br>city: <br>state: <br>zipCode: </p>',
      isHtml : true
    };

		this.emailComposer.isAvailable().then((available: boolean) => {
			if(available) {

			}
		});

    this.emailComposer.open(email);

		this.nav.push(LoginPage);

	}

	goToLogIn(): void {
    	this.nav.push(LoginPage);
  	}
}
