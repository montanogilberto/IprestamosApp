import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ClientesI, DomiciliosI } from '../models/task.interface';
// import { CallNumber } from "@ionic-native/call-number/ngx";
//import { SMS } from "@ionic-native/sms";
// import { Contact } from "@ionic-native/contacts";


//type CollectionPredicate<T> = string |  AngularFirestoreCollection<T>;
//type DocPredicate<T> = string | AngularFirestoreDocument<T>;

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  
  private clientesCollection: AngularFirestoreCollection<ClientesI>;
  private domiciliosCollection: AngularFirestoreCollection<DomiciliosI>;
  private clientes: Observable<ClientesI[]>;
  private domicilios: Observable<DomiciliosI[]>;

  constructor(db:AngularFirestore, 
    private angularFirestore: AngularFirestore
    // private callNumber: CallNumber,
     //private sms: SMS
    // private contact: Contact
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
    this.domiciliosCollection = db.collection<DomiciliosI>('clientes');
    this.domicilios = this.domiciliosCollection.snapshotChanges().pipe(map
      (actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      })
    );
    console.log('c clientes',this.domicilios)

    //this.domiciliosCollection = db.collection<DomiciliosI>('domicilios');

  }

  // col<T>(ref: CollectionPredicate<T>, queryFn?): AngularFirestoreCollection<T> {
  //   return typeof ref === 'string' ? this.angularFirestore.collection<T>(ref,queryFn) : ref 
  // }

  // doc<T>(ref: DocPredicate<T>): AngularFirestoreDocument<T>{
  //   return typeof ref === 'string' ? this.angularFirestore.doc<T>(ref) : ref
  // }

  //Get Data

  // doc$<T>(ref: DocPredicate<T>): Observable<T> {
  //   return this.doc(ref).snapshotChanges().map(doc => {
  //     return doc.payload.data() as T 
  //   });

  // } 

  // col$<T>(ref: CollectionPredicate<T>, queryFn?): Observable<T[]> {
  //   return this.col(ref,queryFn).snapshotChanges().map(docs => {
  //     return this.doc.map(a => a.payload.doc.data()) as T[]
  //   });

  // }

  // sendSMS(){
  //   this.sms.send('5578445853','Bienvenido al sistema de prestamos')
  // }

  // sendSMS(contact: Contact){
  //   this.sms.send(contact.phoneNumbers[0].value, 'Se ha registrado con exito')
  // }

  // call(number){
  //   this.callNumber.callNumber(number,true)
  //   //this.sms.send(contact.phoneNumbers[0].value, 'Se ha registrado con exito')
  // }


  getClientes(){
    return this.clientes;
  }
  getDomicilios(){
    return this.domicilios
  }

  getCliente(id: string){
    return this.clientesCollection.doc<ClientesI>(id).valueChanges();
  }

  getDomicilioId(clienteId: string){
    this.domiciliosCollection.doc<DomiciliosI>(clienteId).collection('domicilios');
    //console.log('domicilios',this.clientesCollection)
    this.domicilios = this.domiciliosCollection.snapshotChanges().pipe(map
      (actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      })
    );
    console.log('Domicilios',this.domicilios);
  }

  updateCliente(cliente:ClientesI, id: string){
    return this.clientesCollection.doc(id).update(cliente);
  }

  updateDomicilio(domicilio:DomiciliosI, id: string){
    return this.domiciliosCollection.doc(id).update(domicilio);
  }
  
  addCliente(cliente: ClientesI){
    return this.clientesCollection.add(cliente);
  }

  addDomicilio(domicilio: DomiciliosI){
    return this.domiciliosCollection.add(domicilio);
  }
  
  removeCliente(id: string){
    return this.clientesCollection.doc(id).delete();
  }

  removeDomicilio(id: string){
    return this.domiciliosCollection.doc(id).delete();
  }

}
