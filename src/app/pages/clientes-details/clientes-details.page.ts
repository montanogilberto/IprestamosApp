import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ClientesI, DomiciliosI } from '../../models/clientes.interface';
import { ClienteService } from '../../services/cliente.service';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { AngularFireStorage } from "@angular/fire/storage";
import { Observable } from 'rxjs/internal/observable';
import { finalize } from 'rxjs/operators';
import { AuthService } from "../../services/auth.service";
import { Plugins, CameraResultType, CameraSource } from "@capacitor/core";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";

@Component({
  selector: 'app-clientes-details',
  templateUrl: './clientes-details.page.html',
  styleUrls: ['./clientes-details.page.scss'],
})

export class ClientesDetailsPage implements OnInit {
  photo: SafeResourceUrl;

  clienteId = null;
  @ViewChild('imageUser', { static: true }) inputImageUser: ElementRef;
  uploadPercent: Observable<number>;
  urlImagen: Observable<string>;
  public domicilios: Observable<ClientesI>;

  // domicilio: DomiciliosI = {
  //   calle: '',
  //   numero: 0,
  //   codigoPostal: '',
  //   clienteId: ''
  // }

  cliente: ClientesI = {
    nombre: '',
    nombre2: '',
    apellido: '',
    apellido2: '',
    celular: '',
    email: '',
    urlImagen: '',
    noCliente: 0,
  }


  //domicilios: DomiciliosI[];

  constructor(private route: ActivatedRoute,
    private nav: NavController,
    private clienteService: ClienteService,
    //private domiciliosI: DomiciliosI,
    private loadingController: LoadingController,
    private angularFireStorage: AngularFireStorage,
    private authService: AuthService,
    private sanitizer: DomSanitizer

  ) { }

  ngOnInit() {
    this.clienteId = this.route.snapshot.params['id'];
    if (this.clienteId) {
      this.loadCliente();
    }

    // this.clienteService.getDomicilios().subscribe((domicilios) =>{
    //   console.log('Todoss', domicilios);
    //   this.domicilio = domicilios;

  }

  async takePicture() {
    const image = await Plugins.Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });

    this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl));
  }

  async loadCliente() {
    const loading = await this.loadingController.create({
      message: 'Cargando....'
    });
    await loading.present();

    this.clienteService.getCliente(this.clienteId).subscribe(cliente => {
      loading.dismiss();
      this.cliente = cliente;
      console.log('dc clientes',cliente);
    });

    //this.domicilios = this.clienteService.getDomicilioId(this.clienteId).valueChanges();

    //this.clienteService.getDomicilioId(this.clienteId);
    // this.clienteService.getDomicilios().subscribe((domicilios) => {
    //   console.log('Domicilios', domicilios);
    //   this.domicilios = domicilios;
    // })
  }

  async saveCliente() {
    const loading = await this.loadingController.create({
      message: 'Guardando....'
    });
    await loading.present();

    if (this.clienteId) {
      this.clienteService.updateCliente(this.cliente, this.clienteId).then(() => {
        loading.dismiss();
        this.nav.navigateForward('tabs/clientes');

      });
    } else {
      console.log(this.cliente);
      this.clienteService.addCliente(this.cliente).then(() => {
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
  async onRemoveCliente(idCliente: string) {
    this.clienteService.removeCliente(idCliente);
    this.nav.navigateForward('tabs/clientes');
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
