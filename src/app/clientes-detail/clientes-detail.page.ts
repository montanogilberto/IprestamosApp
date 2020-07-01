import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ClientesI, ChatI } from '../models/task.interface';
import { ClienteService } from '../services/cliente.service';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { AngularFireStorage } from "@angular/fire/storage";
import { Observable } from 'rxjs/internal/observable';
import { finalize } from 'rxjs/operators';
import { AuthService } from "../services/auth.service";
import { Plugins, CameraResultType, CameraSource, Modals } from "@capacitor/core";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { ChatService } from "../services/chat.service";
import { ModalController } from "@ionic/angular";
import { ChatComponent } from "../components/chat/chat.component";

@Component({
  selector: 'app-clientes-detail',
  templateUrl: './clientes-detail.page.html',
  styleUrls: ['./clientes-detail.page.scss'],
})

export class ClientesDetailPage implements OnInit {
  photo: SafeResourceUrl;

  clienteId = null;
  @ViewChild('imageUser', { static: true }) inputImageUser: ElementRef;
  uploadPercent: Observable<number>;
  urlImagen: Observable<string>;
  //public domicilios: Observable<ClientesI>;
  public userUID: string = localStorage.getItem("userUID");
  chats: ChatI[];

  cliente: ClientesI = {
    id: '',
    nombre: '',
    nombre2: '',
    apellido: '',
    apellido2: '',
    celular: '',
    email: '',
    urlImagen: '',
    noCliente: 0,
    telefono: '',
    tipoIdentificacion: '',
    noidentificacion: '',
    uid: '',
  }

  constructor(private route: ActivatedRoute,
    private nav: NavController,
    private clienteService: ClienteService,
    private loadingController: LoadingController,
    private angularFireStorage: AngularFireStorage,
    private authService: AuthService,
    private sanitizer: DomSanitizer,
    private chatService: ChatService,
    private modal: ModalController,
    //private chatComponent: ChatComponent
  ) { }

  ngOnInit() {
    this.clienteId = this.route.snapshot.params['id'];
    if (this.clienteId) {
      this.loadCliente();
    }
  }

  async onGetChats(clienteId: string, userUID: string) {
    const loading = await this.loadingController.create({
      message: 'Cargando....'
    });
    await loading.present();

    this.chatService.getChats(this.clienteId, this.userUID).subscribe(chats => {
      loading.dismiss();
      this.chats = chats;
      console.log('Getchats', chats);
      this.openChat(this.chats)
    });
  }

  openChat(chat) {
    console.log("Openchat",chat)
    this.modal.create({
      component: ChatComponent,
      componentProps: {
        chat: chat
      }
    }).then((modal) => modal.present())
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
      //console.log('dc clientes',cliente);
    });
  }

  async saveCliente() {
    const loading = await this.loadingController.create({
      message: 'Guardando....'
    });
    await loading.present();

    if (this.clienteId) {
      this.clienteService.updateCliente(this.cliente, this.clienteId).then(() => {
        loading.dismiss();
        this.nav.navigateForward('/clientes');

      });
    } else {
      console.log(this.cliente);
      this.clienteService.addCliente(this.cliente).then(() => {
        loading.dismiss();
      });
    }
  }
  async onRemoveCliente(idCliente: string) {
    this.clienteService.removeCliente(idCliente);
    this.nav.navigateForward('/clientes');
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
