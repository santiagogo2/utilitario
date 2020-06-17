import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Rutas
import { APP_ROUTES } from './app.routes';

// Modulos
import { AdminModule } from './admin/admin.module';
import { DashboardModule } from './dashboard/dashboard.module';

// Services 
import { ServiceModule } from './services/service.module';

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    AdminModule,
    BrowserModule,
    HttpClientModule,
    DashboardModule, 
    APP_ROUTES,
    FormsModule,
    ServiceModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
