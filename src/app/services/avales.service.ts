import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AvalI } from "../models/task.interface";

@Injectable({
  providedIn: 'root'
})
export class AvalesService {

  private avalesCollection: AngularFirestoreCollection<AvalI>;
  private avales: Observable<AvalI[]>;

  constructor(
      private db:AngularFirestore,
      private angularFirestore: AngularFirestore
      ) { 
    this.avalesCollection = db.collection<AvalI>('avales');
    this.avales = this.avalesCollection.snapshotChanges().pipe(map
      (actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      })
    );
  }

  getAvales(clienteId: string){
    this.avalesCollection = this.db.collection<AvalI>('avales', ref => ref.where("clienteId","==",clienteId));
    this.avales = this.avalesCollection.snapshotChanges().pipe(map
      (actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      })
    );

    return this.avales;
  }

  get(id: string){
    return this.avalesCollection.doc<AvalI>(id).valueChanges();
  }

  update(aval:AvalI, id: string){
    return this.avalesCollection.doc(id).update(aval);
  }
  
  add(aval: AvalI){
    return this.avalesCollection.add(aval);
  }
  
  remove(id: string){
    return this.avalesCollection.doc(id).delete();
  }
}
