import { Camera } from '@ionic-native/camera';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FIREBASE_CONFIGURE } from './app.firebase.config';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from 'angularfire2';
import { MyApp } from './app.component';
import { AuthProvider } from '../providers/auth/auth.service';
import { DataProvider } from '../providers/data/data.service';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { EventProvider } from '../providers/event/event.service';
import { FormsModule } from "@angular/forms";
//import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { GoogleMaps } from '@ionic-native/google-maps';

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
    EventProvider,
    Camera,
    Geolocation,
    NativeGeocoder,
    GoogleMaps
  ]
})
export class AppModule {}
