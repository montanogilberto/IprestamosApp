import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { AvalI } from 'src/app/models/task.interface';
import { ActivatedRoute } from '@angular/router';
import { AvalesService } from 'src/app/services/avales.service';
import { LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-aval-detail',
  templateUrl: './aval-detail.page.html',
  styleUrls: ['./aval-detail.page.scss'],
})
export class AvalDetailPage implements OnInit {

  photo: SafeResourceUrl;
  @ViewChild('imageUser', { static: true }) inputImageUser: ElementRef;
  uploadPercent: Observable<number>;
  urlImagen: Observable<string>;

  id: null;
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
    this.id = this.route.snapshot.params['id'];
    console.log('avalId',this.id);
    if (this.id) {
      this.load();
    }
  }

  async load() {
    const loading = await this.loadingController.create({
      message: 'Cargando....'
    });
    await loading.present();

    this.avalesService.getAvales(this.id).subscribe(avales => {
    this.avales = avales
    loading.dismiss();
    console.log('Avales',this.avales);
    });
  }

  async save() {
    const loading = await this.loadingController.create({
      message: 'Guardando....'
    });
    await loading.present();

    if (this.id) {
      this.avalesService.update(this.aval, this.id).then(() => {
        loading.dismiss();
        this.nav.navigateForward('/clientes-detail');

      });
    } else {
      console.log(this.aval);
      this.avalesService.add(this.aval).then(() => {
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

  async onRemove(id: string) {
    this.avalesService.remove(id);
    this.nav.navigateForward('/clientes-detail');
  }

}
