import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { AngularFireStorage } from "@angular/fire/storage";
import { Observable } from 'rxjs/internal/observable';
import { finalize } from 'rxjs/operators';
import { AuthService } from "../../services/auth.service";
import { Plugins, CameraResultType, CameraSource } from "@capacitor/core";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { DomiciliosI } from "../../models/task.interface";
import { DomicilioService } from "../../services/domicilio.service";

@Component({
  selector: 'app-domicilios',
  templateUrl: './domicilios.page.html',
  styleUrls: ['./domicilios.page.scss'],
})
export class DomiciliosPage implements OnInit {

  photo: SafeResourceUrl;
  @ViewChild('imageUser', { static: true }) inputImageUser: ElementRef;
  uploadPercent: Observable<number>;
  urlImagen: Observable<string>;

  clienteId = null;
  domicilios: DomiciliosI[];
  domicilioId: string = '';

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
  uid: '',
  }

  constructor(
    private route: ActivatedRoute,
    private domicilioService: DomicilioService,
    private loadingController: LoadingController,
    private nav: NavController,
    private angularFireStorage: AngularFireStorage,
    private authService: AuthService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.clienteId = this.route.snapshot.params['id'];
    console.log('domicilioId1',this.clienteId);
    if (this.clienteId) {
      this.load();
    }

  }

  async load() {
    const loading = await this.loadingController.create({
      message: 'Cargando....'
    });
    await loading.present();

    this.domicilioService.getDomicilios(this.clienteId).subscribe(domicilios => {
    this.domicilios = domicilios
    this.domicilioId = this.domicilios[0].id;
    console.log('DomicilioId2',this.domicilioId)
    loading.dismiss();
    console.log('domicilios 1',this.domicilios);
    });
  }

  async save() {
    const loading = await this.loadingController.create({
      message: 'Guardando....'
    });
    await loading.present();

    if (this.clienteId) {
      this.domicilioService.update(this.domicilio, this.clienteId).then(() => {
        loading.dismiss();
        this.nav.navigateForward('/clientes-detail');

      });
    } else {
      console.log(this.domicilio);
      this.domicilioService.addDomicilio(this.domicilio).then(() => {
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
    this.domicilioService.remove(idCliente);
    this.nav.navigateForward('/clientes-detail');
  }

  onUpload(e) {
    //console.log('subir',e.target.files[0])
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = 'uploads/profile_' + id;
    const ref = this.angularFireStorage.ref(filePath);
    const task = this.angularFireStorage.upload(filePath, file)
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(finalize(() => this.urlImagen = ref.getDownloadURL())).subscribe();
  }

}
