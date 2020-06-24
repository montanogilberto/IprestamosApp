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
import { FirestoreSettingsToken } from "@angular/fire/firestore";
import { PipesModule } from "./pipes/pipes.module";
//import { Contact } from "@ionic-native/contacts";
// import { CallNumber} from "@ionic-native/call-number";
import { SMS } from "@ionic-native/sms/ngx";
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { FCM } from "@ionic-native/fcm/ngx";
import { ChatComponent } from "./components/chat/chat.component";
import { FormsModule } from "@angular/forms";


@NgModule({
  declarations: [AppComponent, ChatComponent],
  entryComponents: [ChatComponent],
  imports: [
    BrowserModule, IonicModule.forRoot(), AppRoutingModule, 
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    //AngularFireAuth,
    AngularFireAuthModule,
    AngularFireStorageModule,
    PipesModule,
    FormsModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SMS,
    AndroidPermissions,
    FCM,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: FirestoreSettingsToken, useValue: {} }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
