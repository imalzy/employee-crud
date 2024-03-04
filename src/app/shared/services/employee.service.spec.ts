import { TestBed } from '@angular/core/testing';

import { EmployeeService } from './employee.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { BehaviorSubject } from 'rxjs';
import { IEmployee, IEmployeeResponse } from '../model/employee.model';

describe('EmployeeService', () => {
  let service: EmployeeService;
  let httpController: HttpTestingController;
  let values$: BehaviorSubject<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(EmployeeService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('retrieveEmp() should be called', (done: DoneFn) => {
    service.getEmp().subscribe((data) => {
      expect(data).toHaveSize(21);
      done();
    });
  });

  it('should retrieve data by id from the API via GET', () => {
    const mockData: IEmployeeResponse<IEmployee[]> = {
      data: [
        {
          id: 1,
          username: 'Tirtayasa.Reichert',
          lastName: 'Mandala',
          firstName: 'Pangestu',
          email: 'Pangestu_Mandala@yahoo.com',
          birthDate: '0006-06-26T05:36:43.830Z',
          status: false,
          group: 'Music',
          description: 'Feb 22nd 24',
          basicSalary: '5307330.23',
        },
      ],
    };
    const id = 1; // replace with your test ID
    service.getEmpById(id).subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpController.expectOne(`${service.apiUrl}/employees/${id}`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockData);
  });
});
