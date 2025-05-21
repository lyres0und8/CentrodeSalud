export interface ResponseAcceso {
  status: boolean;  // Cambiado a boolean ya que la API devuelve true/false
  message: string;
  token: string;    // Movido a la raíz
  user: {          // Movido a la raíz
    id: number;
    name: string;
    paternal_surname: string;
    maternal_surname: string;
    role_id: number;
    rut: string;
    phone: string;
    email: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
  };
}
