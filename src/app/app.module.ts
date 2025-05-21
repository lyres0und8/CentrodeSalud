import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component'; // <-- es standalone
import { ResetPasswordComponent } from './pages/resetPassword/resetPassword.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppComponent, // ✅ debe ser standalone también
    ResetPasswordComponent, // ✅ ahora sí funciona si tiene `standalone: true`
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
