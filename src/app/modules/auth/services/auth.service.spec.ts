import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { Ilogin } from '../model';

describe('AuthService', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send an expected login request', () => {
    const mockLoginResponse: Ilogin = {
      "id": 1,
      "username": "admin",
      "role": "admin",
      "token": 'admin-token'
     };
    const username = 'admin';
    const password = 'admin';

    service.login(username, password).subscribe(response => {
      expect(response).toEqual(mockLoginResponse);
    });

    const req = httpTestingController.expectOne(`${service.apiUrl}/login`);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual({ username, password });

    req.flush(mockLoginResponse);
  });
});
