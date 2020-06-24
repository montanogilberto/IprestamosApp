
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DomiciliosI } from '../models/task.interface';

@Injectable({
  providedIn: 'root'
})

export class DomicilioService {
  
  private domiciliosCollection: AngularFirestoreCollection<DomiciliosI>;
  private domicilios: Observable<DomiciliosI[]>;

  domicilio: DomiciliosI = {
    fraccionamiento: '',
    municipio: '',
    calle: '',
    noInterior: '',
    noExterior: '',
    entre: '',
    entre2: '',
    referencia: '',
    urlImagen: '',
    clienteId: '',
    codigoPostal: '',
    }
  

  constructor(private db:AngularFirestore) { }

  getDomicilios(clienteId: string){
    this.domiciliosCollection = this.db.collection<DomiciliosI>('domicilios', ref => ref.where("clienteId","==",clienteId));
    this.domicilios = this.domiciliosCollection.snapshotChanges().pipe(map
      (actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      })
    );

    return this.domicilios;
  }

  getDomicilio(id: string){
    return this.domiciliosCollection.doc<DomiciliosI>(id).valueChanges();
  }

  update(domicilio:DomiciliosI, id: string){
    return this.domiciliosCollection.doc(id).update(domicilio);
  }
  
  add(domicilio: DomiciliosI){
    return this.domiciliosCollection.add(domicilio);
  }
  
  remove(id: string){
    return this.domiciliosCollection.doc(id).delete();
  }

}
