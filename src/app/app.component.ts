import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { FCM } from "@ionic-native/fcm/ngx";
import { Router } from "@angular/router";
import { Route } from '@angular/compiler/src/core';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public fcm: FCM,
    private router: Router,
    public angularFireAuth: AngularFireAuth
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleLightContent();
      this.splashScreen.hide();

      //receiving fcmId
      this.fcm.getToken().then((token) => {
        localStorage.setItem('token', token);
        console.log(token);
      }, (err) => {
        alert(JSON.stringify(err));
      })

      //receving notification
      this.fcm.onNotification().subscribe((data) => {
        if (data.wasTapped) {
          console.log('Received in background');
          this.router.navigate([data.landing_page, data.price]);
        } else {
          console.log('Received in foreground');
          this.router.navigate([data.landing_page, data.price]);
        }
      })

      this.fcm.onTokenRefresh().subscribe((token) => {
        localStorage.setItem('token', token);
        console.log(token);
      })

    });
  }

  ngOnInit() {
    this.angularFireAuth.authState.subscribe(user => {
      localStorage.setItem('userUID',user.uid)
      localStorage.setItem('userEmail',user.email)
    });
  }
}
