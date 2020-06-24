import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormaPagoI } from '../models/task.interface';

@Injectable({
  providedIn: 'root'
})
export class FormaPagosService {

  private formaPagosCollection: AngularFirestoreCollection<FormaPagoI>;
  private formaPagos: Observable<FormaPagoI[]>;

  formaPago: FormaPagoI = {
    tarjeta: '',
    fechaCaducidad: '',
    cvv: '',
    banco: '',
    clienteId: '',
  }

  constructor(private db:AngularFirestore) { }

  getFormaPagos(clienteId: string){
    this.formaPagosCollection = this.db.collection<FormaPagoI>('formaPagos', ref => ref.where("clienteId","==",clienteId));
    this.formaPagos = this.formaPagosCollection.snapshotChanges().pipe(map
      (actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      })
    );

    return this.formaPagos;
  }

  get(id: string){
    return this.formaPagosCollection.doc<FormaPagoI>(id).valueChanges();
  }

  update(formaPago:FormaPagoI, id: string){
    return this.formaPagosCollection.doc(id).update(formaPago);
  }
  
  add(formaPago: FormaPagoI){
    return this.formaPagosCollection.add(formaPago);
  }
  
  remove(id: string){
    return this.formaPagosCollection.doc(id).delete();
  }

}
