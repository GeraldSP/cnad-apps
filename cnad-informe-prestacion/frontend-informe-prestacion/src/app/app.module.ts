import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PrestacionesService } from './core/services/prestaciones.service';
import { PrestacionesDetalleComponent } from './prestaciones-detalle/prestaciones-detalle.component';

import { NotificationModule, CardModule, NavigationModule } from 'patternfly-ng';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PrestacionesDetalleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NotificationModule,
    CardModule,
    NavigationModule,
    HttpModule
  ],
  providers: [PrestacionesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
