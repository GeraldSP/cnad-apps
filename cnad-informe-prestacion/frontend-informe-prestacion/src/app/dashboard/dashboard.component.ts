import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { InfoStatusCardConfig } from 'patternfly-ng';
import { PrestacionesService } from '../core/services/prestaciones.service';
import { Prestacion } from '../core/models/Prestacion.model';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  prestaciones: Prestacion[];
  cards: InfoStatusCardConfig [];

  constructor(
    private prestacionesSVC: PrestacionesService
  ) { }

  ngOnInit() {
    this.loadPrestaciones();
  }

  loadPrestaciones(): void {
    this.prestacionesSVC.getPrestaciones()
      .subscribe(prestaciones => {
        this.prestaciones = prestaciones;
      });
  }

  getConfigFor(p: Prestacion): InfoStatusCardConfig {
    return {
      showTopBorder: true,
      htmlContent: false,
      title: p.exam,
      iconStyleClass: 'fa fa-shield',
      info: [
        'id: ' + p.id,
        'patient: ' + p.patient,
        'exam: ' + p.exam,
        'dateIn: ' + p.dateIn,
        'maxDaysToBeforeInform: ' + p.maxDaysToBeforeInform,
        'informDate: ' + p.informDate,
        'examImageId: ' + p.examImageId,
        'type: ' + p.type,
      ]
    };
  }
}
