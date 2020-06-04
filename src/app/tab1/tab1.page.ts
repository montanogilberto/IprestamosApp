import { Component } from '@angular/core';
import { SMS } from "@ionic-native/sms/ngx";
//import { Push } from '@ionic-native/push/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private sms: SMS) { } //private push: Push

  sendSMS() {
    console.log('event click')
    this.sms.send('5578445853', 'Bienvenido a iprestamos')
  }

  // checkPermision() {
  //   this.push.hasPermission()
  //     .then((res: any) => {

  //       if (res.isEnabled) {
  //         console.log('We have permission to send push notifications');
  //       } else {
  //         console.log('We do not have permission to send push notifications');
  //       }

  //     });
  // }

  // createChanel() {
  //   // Create a channel (Android O and above). You'll need to provide the id, description and importance properties.
  //   this.push.createChannel({
  //     id: "testchannel1",
  //     description: "My first test channel",
  //     // The importance property goes from 1 = Lowest, 2 = Low, 3 = Normal, 4 = High and 5 = Highest.
  //     importance: 3
  //   }).then(() => console.log('Channel created'));
  // }

}
