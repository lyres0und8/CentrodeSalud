export interface ResponseAcceso{
    status: string;
    message: string;
    data: {
        user: {
            id: number;
            nombre: string;
            appat: string;
            apmat: string;
            rolId: number;
            rut: string;
            telefono: string;
            correo: string;
            correoVerificadoEn: string | null;
            creadoEn: string;
            actualizadoA: string;
        };
        token: string;
    };
}