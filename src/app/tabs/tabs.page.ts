import { Component } from '@angular/core';
import {AuthService} from '../services/auth.service';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  public userEmail: string = localStorage.getItem("userEmail");

  constructor(
      public authService: AuthService,
      public actionSheetController: ActionSheetController
      ) {}

  Onlogout(){
    this.authService.logout();
  }

  showNotification(){
    console.log("entro notification");
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Desconectarse',
        role: 'destructive',
        icon: 'log-out',
        handler: () => {
          this.Onlogout();
        },
      }]
    });
    await actionSheet.present();
  }

}
