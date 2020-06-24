import { Component, OnInit } from '@angular/core';
import { ClientesI } from '../models/task.interface';
import { ClienteService } from '../services/cliente.service';
import { NavController, LoadingController} from '@ionic/angular';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {

  
  clientes: ClientesI[];
  clientesFilter: any[];
  
  clienteId: null;
  cliente: ClientesI = {
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
  }

  constructor(
    private clienteService: ClienteService,
    private loadingController: LoadingController) { }

    ngOnInit(){
      this.clienteService.getClientes().subscribe((clientes) =>{
        console.log('Todoss', clientes);
        this.clientes = clientes;
        this.initializaClientesFilter();
      })
    }

  async loadCliente(){
    const loading = await this.loadingController.create({
      message: 'Cargando....'
    });
    await loading.present();

    this.clienteService.getCliente(this.clienteId).subscribe(cliente => {
      loading.dismiss();
      this.cliente = cliente;
    });
  }

  initializaClientesFilter(){
    this.clientesFilter = this.clientes;
  }

  getItem(e){
    this.initializaClientesFilter();
    const val = e.target.value;
    //console.log('event',val)
    if(val && val.trim() != '' ){
      this.clientesFilter = this.clientesFilter.filter((cliente) => {
        return (cliente.nombre.toLowerCase().indexOf(val.toLowerCase()) >- 1);
      })
    }
  }

  onRemove(idCliente:string){
    this.clienteService.removeCliente(idCliente);
  }

}
