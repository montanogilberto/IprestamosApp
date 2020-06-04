import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule} from 'angularfire2';
import { environment} from '../environments/environment';
import { AngularFirestoreModule} from 'angularfire2/firestore';
//import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireStorageModule } from "@angular/fire/storage";
import { PipesModule } from "./pipes/pipes.module";
//import { Contact } from "@ionic-native/contacts";
// import { CallNumber} from "@ionic-native/call-number";
import { SMS } from "@ionic-native/sms/ngx";
//import { Push } from "@ionic-native/push/ngx";


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, IonicModule.forRoot(), AppRoutingModule, 
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    //AngularFireAuth,
    AngularFireAuthModule,
    AngularFireStorageModule,
    PipesModule
    //Contact,
    // CallNumber,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SMS,
    //Push,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
