import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormaPagosService } from "../../services/forma-pagos.service";
import { FormaPagoI } from 'src/app/models/task.interface';
import { LoadingController, NavController } from '@ionic/angular';
import { AngularFireStorage } from "@angular/fire/storage";

@Component({
  selector: 'app-forma-pagos',
  templateUrl: './forma-pagos.page.html',
  styleUrls: ['./forma-pagos.page.scss'],
})
export class FormaPagosPage implements OnInit {

clienteId: null;
formaPagos: FormaPagoI[];

formaPago: FormaPagoI = {
  tarjeta: '',
  fechaCaducidad: '',
  cvv: '',
  banco: '',
  clienteId: '',
}

  constructor(
    private route: ActivatedRoute,
    private formaPagosService: FormaPagosService,
    private loadingController: LoadingController,
    private nav: NavController,
    private angularFireStorage: AngularFireStorage,
  ) { }

  ngOnInit() {
    this.clienteId = this.route.snapshot.params['id'];
    console.log('domicilioId',this.clienteId);
    if (this.clienteId) {
      this.load();
    }
  }

  async load() {
    const loading = await this.loadingController.create({
      message: 'Cargando....'
    });
    await loading.present();

    this.formaPagosService.getFormaPagos(this.clienteId).subscribe(formaPagos => {
    this.formaPagos = formaPagos
    loading.dismiss();
    console.log('formaPagos',this.formaPagos);
    });
  }

  async save() {
    const loading = await this.loadingController.create({
      message: 'Guardando....'
    });
    await loading.present();

    if (this.clienteId) {
      this.formaPagosService.update(this.formaPago, this.clienteId).then(() => {
        loading.dismiss();
        this.nav.navigateForward('/clientes-detail');

      });
    } else {
      console.log(this.formaPago);
      this.formaPagosService.add(this.formaPago).then(() => {
        loading.dismiss();
        // this.authService.isAuth().subscribe(user => {
        //   console.log(user);
        //   if (user) {
        //     user.updateProfile({
        //       displayName: '',
        //       photoURL: this.inputImageUser.nativeElement.value
        //     }).then(() => {
        //       console.log("User Update");
        //       this.nav.navigateForward('tabs/clientes');
        //   }).catch((error) => console.log(error,error));
        //   }
        // });
      });
    }
  }

  async onRemove(idCliente: string) {
    this.formaPagosService.remove(idCliente);
    this.nav.navigateForward('/clientes-detail');
  }

}
