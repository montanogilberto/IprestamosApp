import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DomiciliosI } from '../models/clientes.interface';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  
  private domiciliosCollection: AngularFirestoreCollection<DomiciliosI>;
  private domicilios: Observable<DomiciliosI[]>;

  constructor(db:AngularFirestore) { 
    this.domiciliosCollection = db.collection<DomiciliosI>('domicilios');
    this.domicilios = this.domiciliosCollection.snapshotChanges().pipe(map
      (actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      })
    );
  }

  getDomicilios(){
    return this.domicilios
  }

  getDomicilio(id: string){
    return this.domiciliosCollection.doc<DomiciliosI>(id).valueChanges();
  }

  updateDomicilio(domicilio:DomiciliosI, id: string){
    return this.domiciliosCollection.doc(id).update(domicilio);
  }
  
  addDomicilio(domicilio: DomiciliosI){
    return this.domiciliosCollection.add(domicilio);
  }
  
  removeDomicilio(id: string){
    return this.domiciliosCollection.doc(id).delete();
  }

}
