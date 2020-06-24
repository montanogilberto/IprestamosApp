import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DomiciliosI } from "../../models/task.interface";
import { ActivatedRoute } from '@angular/router';
import { DomicilioService } from 'src/app/services/domicilio.service';
import { LoadingController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { DomSanitizer , SafeResourceUrl} from '@angular/platform-browser';
import { AngularFireStorage } from "@angular/fire/storage";
import { Observable } from 'rxjs/internal/observable';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-domicilio-detail',
  templateUrl: './domicilio-detail.page.html',
  styleUrls: ['./domicilio-detail.page.scss'],
})
export class DomicilioDetailPage implements OnInit {

  photo: SafeResourceUrl;
  @ViewChild('imageUser', { static: true }) inputImageUser: ElementRef;
  uploadPercent: Observable<number>;
  urlImagen: Observable<string>;

  domicilioId = null;
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
    this.domicilioId = this.route.snapshot.params['id'];
    //console.log('domicilioId',this.domicilioId);
    if (this.domicilioId) {
      this.load();
    }

  }

  async load() {
    const loading = await this.loadingController.create({
      message: 'Cargando....'
    });
    await loading.present();

    this.domicilioService.getDomicilio(this.domicilioId).subscribe(domicilio => {
      loading.dismiss();
      this.domicilio = domicilio;
      //console.log('domicilios 2',this.domicilio);
    });
  }

  async save() {
    const loading = await this.loadingController.create({
      message: 'Guardando....'
    });
    await loading.present();

    if (this.domicilioId) {
      this.domicilioService.update(this.domicilio, this.domicilioId).then(() => {
        loading.dismiss();
        this.nav.navigateForward('/domicilios/' + this.domicilio.clienteId);

      });
    } else {
      console.log(this.domicilio);
      this.domicilioService.add(this.domicilio).then(() => {
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

  async onRemove(domicilioId: string) {
    this.domicilioService.remove(domicilioId);
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
