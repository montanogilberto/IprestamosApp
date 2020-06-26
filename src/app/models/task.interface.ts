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
    telefono: string;
    tipoIdentificacion: string;
    noidentificacion: string;
}

export interface DomiciliosI{
    id?: string;
    fraccionamiento: string;
    municipio: string;
    calle: string;
    noInterior: string;
    noExterior: string;
    entre: string;
    entre2: string;
    referencia: string;
    urlImagen: string;
    clienteId: string;
    codigoPostal: string;
}

export interface FormaPagoI{
    id?: string;
    tarjeta: string;
    fechaCaducidad: string;
    cvv: string;
    banco: string;
    clienteId: string;
}

export interface AvalI{
    id?: string;
    nombre: string;
    nombre2: string;
    apellido: string;
    apellido2: string;
    celular: string;
    email: string;
    urlImagen: string;
    telefono: string;
    tipoIdentificacion: string;
    noidentificacion: string;
    urlImagenIdentificacion: string;
    clienteId: string;
}

export interface AdjuntosI{
    id?: string;
    nombre: string;
    descripcion: string;
    urlDocumento: string;
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

export interface ChatI{
    id?: string;
    clienteId: string;
    uid: string;
    descripcion: string;
}

export interface MessageI{
    id?: string;
    content: string;
    date: Date;
    type: string;
}

export interface UsuariosI{
    id?: string;
    name: string;
    uid: string;
    urlImgen: string;
}

