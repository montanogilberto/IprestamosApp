import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PrestamosI } from "../models/task.interface";

@Injectable({
  providedIn: 'root'
})
export class PrestamoService {

  private prestamosCollection: AngularFirestoreCollection<PrestamosI>;
  private prestamo: Observable<PrestamosI[]>;
  prestamoTodo: {};
  clientes: {};

  constructor(db:AngularFirestore) { 
    this.prestamosCollection = db.collection<PrestamosI>('prestamos');
    this.prestamo = this.prestamosCollection.snapshotChanges().pipe(map
      (actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      })
    );
  }


  getPrestamos(){
    return this.prestamo;
  }

  getPrestamo(id: string){
    return this.prestamosCollection.doc<PrestamosI>(id).valueChanges();
  }

  updatePrestamo(prestamo:PrestamosI, id: string){
    return this.prestamosCollection.doc(id).update(prestamo);
  }
  
  addPrestamo(prestamo: PrestamosI){
    return this.prestamosCollection.add(prestamo);
  }
  
  removePrestamo(id: string){
    return this.prestamosCollection.doc(id).delete();
  }

}
