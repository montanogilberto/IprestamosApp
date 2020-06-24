import { TestBed } from '@angular/core/testing';

import { AvalesService } from './avales.service';

describe('AvalesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AvalesService = TestBed.get(AvalesService);
    expect(service).toBeTruthy();
  });
});
