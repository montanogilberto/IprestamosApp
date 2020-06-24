import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string
  password: string

  constructor(
      private authService: AuthService, 
      public router: Router,
      private loadingController: LoadingController,
      ) { }

  ngOnInit() {
    this.authService.isAuth()
  }

  async  onSubmitLogin(){
    const loading = await this.loadingController.create({
      message: 'Cargando....'
    });
    await loading.present();
    this.authService.login(this.email,this.password).then(res => {
      loading.dismiss();
      this.router.navigate(['/tabs/tab1']);
    }).catch(err => alert('Los datos son incorrectos'));
    
  }

}
