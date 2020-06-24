import { Component, OnInit } from '@angular/core';
import { PrestamosI,ClientesI } from "../../models/task.interface";
import { PrestamoService } from "../../services/prestamo.service";
import { ClienteService } from "../../services/cliente.service";

@Component({
  selector: 'app-prestamos',
  templateUrl: './prestamos.page.html',
  styleUrls: ['./prestamos.page.scss'],
})
export class PrestamosPage implements OnInit {

  prestamos: PrestamosI[];
  clientes: ClientesI[];

  constructor(
      private prestamoService: PrestamoService, 
      private clienteService: ClienteService
      )
  { }

  ngOnInit() {
    this.prestamoService.getPrestamos().subscribe((prestamos) =>{
      console.log('Prestamos', prestamos);
      this.prestamos = prestamos;
    });
    this.clienteService.getClientes().subscribe((clientes) => {
      console.log('Clientes', clientes);
      this.clientes = clientes
    })
  }

  onRemove(idPrestamo:string){
    this.prestamoService.removePrestamo(idPrestamo);
  }

}
