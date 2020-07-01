import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ClientesI } from '../models/task.interface';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  
  private clientesCollection: AngularFirestoreCollection<ClientesI>;
  private clientes: Observable<ClientesI[]>;

  constructor(
    private db:AngularFirestore, 
    private angularFirestore: AngularFirestore
    ) { 

    this.clientesCollection = db.collection<ClientesI>('clientes');
    this.clientes = this.clientesCollection.snapshotChanges().pipe(map
      (actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      })
    );
  }

  getClientes(){
    return this.clientes;
  }

  getCliente(id: string){
    return this.clientesCollection.doc<ClientesI>(id).valueChanges();
  }

  updateCliente(cliente:ClientesI, id: string){
    return this.clientesCollection.doc(id).update(cliente);
  }
  
  addCliente(cliente: ClientesI){
    return this.clientesCollection.add(cliente);
  }
  
  removeCliente(id: string){
    return this.clientesCollection.doc(id).delete();
  }
}
