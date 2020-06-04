import { NumericValueAccessor } from '@ionic/angular';

export interface ClientesI{
    id?: string;
    nombre: string;
    nombre2: string;
    apellido: string;
    apellido2: string;
    celular: string;
    email: string;
    urlImagen: string;
    noCliente: number;
}

export interface DomiciliosI{
    id?: string;
    calle: string;
    numero: number;
    codigoPostal: string;
    clienteId: string;
}

export interface PrestamosI{
    id?: string;
    noPrestamo: number;
    cantidad: number;
    interes: number;
    tipo: number;
    clienteId: string;
}