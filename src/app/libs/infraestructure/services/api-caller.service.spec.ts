import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Messages } from '../../constants/messages';

import { ApiCallerService } from './api-caller.service';

describe('ApiCallerService', () => {
  let service: ApiCallerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(ApiCallerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("should be the same API value with the constants", () => {
    expect(service.api).toEqual(Messages.URL);
  });

  it("should exists HTTP Methods", () => {
    expect(service.get).toBeDefined();
    expect(service.post).toBeDefined();
    expect(service.put).toBeDefined();
    expect(service.delete).toBeDefined();
  });
});
