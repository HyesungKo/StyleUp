import { Camera } from '@ionic-native/camera';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FIREBASE_CONFIGURE } from './app.firebase.config';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from 'angularfire2';
import { MyApp } from './app.component';
import { AuthProvider } from '../providers/auth/auth.service';
import { DataProvider } from '../providers/data/data.service';
import { AngularFireDatabaseModule } from 'angularfire2/database';
//import { EventProvider } from '../providers/event/event';
import { EventCreatePage } from '../pages/event-create/event-create';



@NgModule({
  declarations: [
    MyApp

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIGURE),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    FormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    DataProvider,
   // EventProvider,
    Camera,
    EventCreatePage


  ]
})
export class AppModule {}
