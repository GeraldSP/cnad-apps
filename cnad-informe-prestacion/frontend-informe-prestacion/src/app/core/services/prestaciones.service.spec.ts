import { TestBed, inject } from '@angular/core/testing';

import { PrestacionesService } from './prestaciones.service';

describe('PrestacionesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PrestacionesService]
    });
  });

  it('should be created', inject([PrestacionesService], (service: PrestacionesService) => {
    expect(service).toBeTruthy();
  }));
});
