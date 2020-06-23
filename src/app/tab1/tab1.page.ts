import { Component } from '@angular/core';
import { SMS } from "@ionic-native/sms/ngx";
//import { Push } from '@ionic-native/push/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  fcmToken:any = "";

  constructor(
      private sms: SMS,
      private androidPermissions: AndroidPermissions
      ) 
  {   }

   getToken(){
    this.fcmToken = localStorage.getItem("token");
    console.log(this.fcmToken);
   }

  sendSMS() {

    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.SMS).then(
      result => console.log('Has permission SMS?',result.hasPermission),
      err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.SMS)
    );

    this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.SMS, this.androidPermissions.PERMISSION.GET_ACCOUNTS]);

    console.log('event click')
    this.sms.send('5578445853', 'Bienvenido a iprestamos')
  }

}
