import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AvalesService } from "../../services/avales.service";
import { FormaPagoI, AvalI } from 'src/app/models/task.interface';
import { LoadingController, NavController } from '@ionic/angular';
import { AngularFireStorage } from "@angular/fire/storage";
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-avales',
  templateUrl: './avales.page.html',
  styleUrls: ['./avales.page.scss'],
})
export class AvalesPage implements OnInit {

  clienteId: null;
  avales: AvalI[];

  aval: AvalI = {
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
  }

  constructor(
    private route: ActivatedRoute,
    private avalesService: AvalesService,
    private loadingController: LoadingController,
    private nav: NavController,
  ) { }

  ngOnInit() {
    this.clienteId = this.route.snapshot.params['id'];
    console.log('avalId',this.clienteId);
    if (this.clienteId) {
      this.load();
    }
  }

  async load() {
    const loading = await this.loadingController.create({
      message: 'Cargando....'
    });
    await loading.present();

    this.avalesService.getAvales(this.clienteId).subscribe(avales => {
    this.avales = avales
    loading.dismiss();
    console.log('Avales',this.avales);
    });
  }

}
