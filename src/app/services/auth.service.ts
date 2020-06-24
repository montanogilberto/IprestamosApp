import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { Router } from '@angular/router';
import { auth } from 'firebase';
import { map } from 'rxjs/operators';
import { promise } from 'protractor';
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  nameLogin: null;

  constructor(
      private db: AngularFirestore,
      private angularFireAuth: AngularFireAuth, 
      private router: Router,
      ) { }

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

  register(email:string, password:string, name: string){

    return new Promise ((resolve,reject)=>{
      this.angularFireAuth.auth.createUserWithEmailAndPassword(email,password).then(res => {
        const uid = res.user.uid;
        console.log(uid);
        this.db.collection('users').doc(res.user.uid).set({
          name: name,
          uid: uid
        })
        resolve(res);
      }).catch( err => reject(err))
    })

  }
}
