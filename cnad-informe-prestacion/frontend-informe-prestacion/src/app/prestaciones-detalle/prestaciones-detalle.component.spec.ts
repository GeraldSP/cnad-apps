import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestacionesDetalleComponent } from './prestaciones-detalle.component';

describe('PrestacionesDetalleComponent', () => {
  let component: PrestacionesDetalleComponent;
  let fixture: ComponentFixture<PrestacionesDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrestacionesDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrestacionesDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
