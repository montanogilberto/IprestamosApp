import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { LoadingController, ActionSheetController } from '@ionic/angular';
import { Capacitor, Plugins, CameraResultType, FilesystemDirectory } from '@capacitor/core';
import { AngularFireStorage } from "@angular/fire/storage";
import { Observable } from 'rxjs/internal/observable';
import { finalize } from 'rxjs/operators';
import { RegistroService } from "../../services/registro.service";

const { Camera, Filesystem } = Plugins;

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
    private registroService: RegistroService
  ) { }

  ngOnInit() {

  }

  takePhoto() {

    const options = {
      resultType: CameraResultType.Uri
    };

    Camera.getPhoto(options).then(
      photo => {
        Filesystem.readFile({
          path: photo.path
        }).then(
          result => {
            let date = new Date(),
              time = date.getTime(),
              fileName = time + ".jpeg";

            Filesystem.writeFile({
              data: result.data,
              path: fileName,
              directory: FilesystemDirectory.Data
            }).then(
              () => {
                Filesystem.getUri({
                  directory: FilesystemDirectory.Data,
                  path: fileName
                }).then(
                  result => {
                    let path = Capacitor.convertFileSrc(result.uri);
                    console.log(path);
                  },
                  err => {
                    console.log(err);
                  }
                );
              },
              err => {
                console.log(err);
              }
            );
          },
          err => {
            console.log(err);
          }
        );
      },
      err => {
        console.log(err);
      }
    );
  }


  async OnRegister() {
    const loading = await this.loadingController.create({
      message: 'Guardando....'
    });
    await loading.present();

    // if (this.urlImagen) {
    //   this.onUpload(this.urlImagen);
    // }

    this.registroService.addUser(this.email, this.password, this.name, this.urlImagen).then(res => {
      //console.log('user Registro',res);
      this.Onlogout();
      loading.dismiss();
      this.router.navigate(['/login']);
    }).catch(err => console.log(err))
  }

  Onlogout(){
    this.authService.logout();
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
          this.takePhoto();
        },
      }],
    });
    await actionSheet.present();
  }

  onUpload(urlImagen) {
    //console.log('subir',e.target.files[0])
    const id = Math.random().toString(36).substring(2);
    const file = urlImagen;
    const filePath = 'uploads/profile_' + id;
    console.log("variables", id + " " + file + " " + filePath)
    // const ref = this.angularFireStorage.ref(filePath);
    // const task = this.angularFireStorage.upload(filePath, file)
    // this.uploadPercent = task.percentageChanges();
    // task.snapshotChanges().pipe(finalize(() => this.urlImagenObs = ref.getDownloadURL())).subscribe();
  }
}
