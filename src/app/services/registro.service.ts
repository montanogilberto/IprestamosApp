import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { ClientesI, DomiciliosI, FormaPagoI, AvalI, PrestamosI } from "../models/task.interface";
import { ClienteService } from "../services/cliente.service";
import { DomicilioService } from "../services/domicilio.service";
import { FormaPagosService } from "../services/forma-pagos.service";
import { AvalesService } from "../services/avales.service";
import { PrestamoService } from "../services/prestamo.service";
import { AngularFireAuth } from 'angularfire2/auth';


@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  clienteId: string;

  constructor(
    private db: AngularFirestore,
    private angularFireAuth: AngularFireAuth,
    private clienteService: ClienteService,
    private domicilioService: DomicilioService,
    private formaPagoService: FormaPagosService,
    private avalService: AvalesService,
    private PrestamoService: PrestamoService,

  ) { }

  addUser(email: string, password: string, name: string, urlImagen: string) {
    return new Promise((resolve, reject) => {
      //Save User Auth
      this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password).then(res => {
        const uid = res.user.uid;

        //Save User Collection
        this.db.collection('users').doc(uid).set({
          name: name,
          uid: uid,
          urlImagen: urlImagen
        }).then(function () {
          console.log('save Succefully');

        })
          .catch(function (error) {
            console.error("Error writing document: ", error);
          });


        this.saveCliente(uid,urlImagen);
        this.saveDomicilio(uid);
        this.saveFormaPago(uid);
        this.saveAval(uid);
        this.savePrestamo(uid);

        resolve(res);
      }).catch(err => reject(err))
    })

  }

  saveCliente(uid: string, urlImagen: string) {
    const cliente: ClientesI = {
      nombre: '',
      nombre2: '',
      apellido: '',
      apellido2: '',
      celular: '',
      email: '',
      urlImagen: urlImagen,
      noCliente: 0,
      telefono: '',
      tipoIdentificacion: '',
      noidentificacion: '',
      uid: uid,
    }

    this.clienteService.addCliente(cliente).then(() => {

    });
  }

  saveDomicilio(uid: string) {
    const domicilio: DomiciliosI = {
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
      uid: uid,
    }
    this.domicilioService.addDomicilio(domicilio).then(() => {
    });
  }

  saveFormaPago(uid: string) {
    const formaPago: FormaPagoI = {
      tarjeta: '',
      fechaCaducidad: '',
      cvv: '',
      banco: '',
      clienteId: '',
      uid: uid
    }
    this.formaPagoService.add(formaPago).then(() => {
    });
  }

  saveAval(uid: string) {
    const   aval: AvalI = {
      nombre: '',
      nombre2: '',
      apellido: '',
      apellido2: '',
      celular: '',
      email: '',
      urlImagen: '',
      telefono: '',
      tipoIdentificacion: '',
      noidentificacion: '',
      urlImagenIdentificacion: '',
      clienteId: '',
      uid: uid,
    }
    this.avalService.add(aval).then(() => {
    });
  }

  savePrestamo(uid: string) {
    const prestamo: PrestamosI = {
      noPrestamo: 0,
      cantidad: 0,
      interes: 0,
      tipo: 0,
      clienteId: '',
      uid: uid
    }
    this.PrestamoService.addPrestamo(prestamo).then(() => {
    });
  }

}
