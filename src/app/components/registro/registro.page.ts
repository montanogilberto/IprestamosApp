import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { LoadingController, ActionSheetController } from '@ionic/angular';
import { Plugins, CameraResultType } from "@capacitor/core";
import { AngularFireStorage } from "@angular/fire/storage";
import { Observable } from 'rxjs/internal/observable';
import { finalize } from 'rxjs/operators';

const { Camera } = Plugins;

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  email: string;
  name: string;
  password: string;
  urlImagen: string = "../../../assets/icon/perfil_default.jpg";
  @ViewChild('imageUser', { static: true }) inputImageUser: ElementRef;
  uploadPercent: Observable<number>;
  urlImagenObs: Observable<string>;
  urlImagenInp: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingController: LoadingController,
    public actionSheetController: ActionSheetController,
    private angularFireStorage: AngularFireStorage,
  ) { }

  ngOnInit() {

  }

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });
    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    console.log("image-Path",image.path);
    console.log("image-webPath",image.webPath);
    this.urlImagen = image.webPath;
  }

  async OnRegister() {
    const loading = await this.loadingController.create({
      message: 'Guardando....'
    });
    await loading.present();

    if(this.urlImagen){
      this.onUpload(this.urlImagen);
    }

    // console.log("datos register", this.email + ' ' + this.password + ' ' + this.name + ' ' + this.urlImagenInp)
    
    // this.authService.register(this.email, this.password, this.name, this.urlImagenInp).then(res => {
    //   loading.dismiss();
    //   this.router.navigate(['/tabs/tab1']);
    // }).catch(err => console.log(err))
    

  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Camara',
        role: 'destructive',
        icon: 'camera-outline',
        handler: () => {
          this.takePicture();
        },
      }]
    });
    await actionSheet.present();
  }

  onUpload(urlImagen) {
    //console.log('subir',e.target.files[0])
    const id = Math.random().toString(36).substring(2);
    const file = urlImagen;
    const filePath = 'uploads/profile_' + id;
    console.log("variables",id + " " + file + " " + filePath)
    // const ref = this.angularFireStorage.ref(filePath);
    // const task = this.angularFireStorage.upload(filePath, file)
    // this.uploadPercent = task.percentageChanges();
    // task.snapshotChanges().pipe(finalize(() => this.urlImagenObs = ref.getDownloadURL())).subscribe();
  }
}
