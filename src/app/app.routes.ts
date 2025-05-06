import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { InicioComponent } from './pages/inicio/inicio.component';

export const routes: Routes = [
  // Redirigir la ruta vacía al login
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'inicio',
    component: InicioComponent,
  },
  // Ruta wildcard para manejar rutas no encontradas
  {
    path: '**',
    redirectTo: 'login',
  },
];
