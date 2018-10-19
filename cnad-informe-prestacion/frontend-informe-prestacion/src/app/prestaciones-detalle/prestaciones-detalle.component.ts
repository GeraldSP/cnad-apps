import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { PrestacionesService } from '../core/services/prestaciones.service';
import { Prestacion } from '../core/models/Prestacion.model';


@Component({
  selector: 'app-prestaciones-detalle',
  templateUrl: './prestaciones-detalle.component.html',
  styleUrls: ['./prestaciones-detalle.component.css']
})
export class PrestacionesDetalleComponent implements OnInit {
  state: String;
  id;
  isCommunicating: boolean;

  @Input()  prestacion: Prestacion;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private prestacionService: PrestacionesService
  ) {
    this.isCommunicating = false;
  }

  ngOnInit() {
    this.determineViewState();
  }

  determineViewState(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.state = !this.id ? 'NEW' : 'UPDATE';
    console.log('State: ', this.state);
    console.log('Id: ', this.id);
    console.log('TypeOf(id): ', typeof this.route.snapshot.paramMap.get('id'));
    if (this.state === 'UPDATE') {
      this.prestacionService.getPrestacion(+this.id).subscribe( p => this.prestacion = p);
    } else {
      this.prestacion = new Prestacion();
    }
  }

  send(prestacion: Prestacion): void {
    this.isCommunicating = true;
    if (this.state === 'NEW') {
      this.prestacionService.persist(prestacion).subscribe(res => {
        this.isCommunicating = false;
        this.router.navigate(['/dashboard']);
      });
    } else {
      this.prestacionService.update(prestacion).subscribe(res => {
        this.isCommunicating = false;
        this.router.navigate(['/dashboard']);
      });
    }
  }
}
