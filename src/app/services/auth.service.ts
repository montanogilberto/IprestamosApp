import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { Router } from '@angular/router';
import { auth } from 'firebase';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private angularFireAuth: AngularFireAuth, private router: Router) { }

  login(email: string, password: string){

    return new Promise((resolve, rejected) => {
      this.angularFireAuth.auth.signInWithEmailAndPassword(email,password).then(user =>{
        resolve(user);
      }).catch(err => rejected(err));
    
    });
  }

  logout(){
    console.log('entro logout');
    this.angularFireAuth.auth.signOut().then( auth => {
      this.router.navigate(['/login']);
    });
  }

  isAuth(){
    return this.angularFireAuth.authState.pipe(map(auth => auth));
  }
}
