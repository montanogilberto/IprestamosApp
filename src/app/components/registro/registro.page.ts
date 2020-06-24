import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  email: string;
  name: string;
  password: string;

  constructor(
      private authService: AuthService,
      private router: Router,
      private loadingController: LoadingController,
      ) { }

  ngOnInit() {
    
  }

  async OnRegister(){

    const loading = await this.loadingController.create({
      message: 'Guardando....'
    });
    await loading.present();
    this.authService.register(this.email,this.password,this.name).then(res =>{
      console.log(res);
      loading.dismiss();
      this.router.navigate(['/folder/inicio']);
    }).catch(err => console.log(err))
    

  }

}
