import { Component, OnInit } from '@angular/core';
import { ClientesI, PrestamosI} from '../../models/task.interface';
import { ClienteService} from '../../services/cliente.service';
import { PrestamoService } from "../../services/prestamo.service";
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController} from '@ionic/angular';
import { AngularFireStorage } from "@angular/fire/storage";
import { Observable } from 'rxjs/internal/observable';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-prestamo-detail',
  templateUrl: './prestamo-detail.page.html',
  styleUrls: ['./prestamo-detail.page.scss'],
})
export class PrestamoDetailPage implements OnInit {

  uploadPercent: Observable<number>;
  urlImagen: Observable<string>;

  clientes: ClientesI[];
  clientesFilter: any[];

  prestamo: PrestamosI = {
    noPrestamo: 0,
    cantidad: 0,
    interes: 0,
    tipo: 0,
    clienteId: ''
  }
  
  prestamoId = null;
  clienteId = null;
  activateComponent: boolean = false;
  activateComponentSearch: boolean = false;

  constructor(
              private route: ActivatedRoute, 
              private nav: NavController,
              private clienteService: ClienteService,
              private loadingController: LoadingController,
              private angularFireStorage: AngularFireStorage,
              private prestamoService: PrestamoService
            ) { }

  ngOnInit() {
    this.prestamoId = this.route.snapshot.params['id'];
    if(this.prestamoId){
      this.loadPrestamo();
    }
  }

  activate(){
    this.activateComponent = true;
    this.activateComponentSearch = true;
  }

  desActivate(){
    this.activateComponent = false;
    this.activateComponentSearch = false;
  }

  initializaClientesFilter(){
    this.clientesFilter = this.clientes;
  }

  selectVal(Id){
    console.log('id',Id)
    this.clienteId = Id;
  }

  getItem(e){
    
    this.initializaClientesFilter();
    const val = e.target.value;
    console.log('event',val)
    if(val && val.trim() != '' ){
      this.clientesFilter = this.clientesFilter.filter((cliente) => {
        return (cliente.nombre.toLowerCase().indexOf(val.toLowerCase()) >- 1);
      })
    }

  }

  async loadPrestamo(){
    const loading = await this.loadingController.create({
      message: 'Cargando....'
    });
    await loading.present();

    this.prestamoService.getPrestamo(this.prestamoId).subscribe(prestamo => {
      loading.dismiss();
      this.prestamo = prestamo;
    });
    this.clienteService.getClientes().subscribe((clientes) => {
      console.log('Clientes', clientes);
      this.clientes = clientes
    });
  }

  async savePrestamo() {
    const loading = await this.loadingController.create({
      message: 'Guardando....'
    });
    await loading.present();
 
    if (this.prestamoId) {
      this.prestamoService.updatePrestamo(this.prestamo, this.prestamoId).then(() => {
        loading.dismiss();
        this.nav.navigateForward('tabs/prestamos');
      });
    } else {
      this.prestamoService.addPrestamo(this.prestamo).then(() => {
        loading.dismiss();
        this.nav.navigateForward('tabs/prestamos');
      });
    }
  }

  async onRemovePrestamo(idPrestamo:string) {
    this.prestamoService.removePrestamo(idPrestamo);
    this.nav.navigateForward('tabs/prestamos');
  }

  onUpload(e){
    console.log('subir',e)
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = 'uploads/profile_$(id)';
    const ref = this.angularFireStorage.ref(filePath);
    const task = this.angularFireStorage.upload(filePath,file)
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(finalize(()=> this.urlImagen = ref.getDownloadURL())).subscribe();
    
  }

}
