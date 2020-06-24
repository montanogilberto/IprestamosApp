import { TestBed } from '@angular/core/testing';

import { FormaPagosService } from './forma-pagos.service';

describe('FormaPagosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormaPagosService = TestBed.get(FormaPagosService);
    expect(service).toBeTruthy();
  });
});
