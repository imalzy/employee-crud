import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { IEmployee, IEmployeeResponse } from '../model/employee.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  apiUrl = environment.apiUrl;
  private values$: BehaviorSubject<IEmployeeResponse<IEmployee[]>> =
    new BehaviorSubject({} as IEmployeeResponse<IEmployee[]>);

  constructor(private httpClient: HttpClient) {}

  getEmp(): Observable<IEmployeeResponse<IEmployee[]>> {
    if (this.values$.value.data) {
      return this.values$.asObservable();
    }
    return this.httpClient.get(`${this.apiUrl}/employees`).pipe(
      switchMap((res: any) => {
        this.values$.next(res);
        return this.values$;
      })
    );
  }

  getEmpById(
    valueId: number | string
  ): Observable<IEmployeeResponse<IEmployee[]>> {
    return this.httpClient.get<IEmployeeResponse<IEmployee[]>>(
      `${this.apiUrl}/employees/${valueId}`
    );
  }

  add(value: IEmployee): Observable<IEmployeeResponse<IEmployee[]>> {
    return this.httpClient
      .post<IEmployeeResponse<IEmployee[]>>(`${this.apiUrl}/employees`, value)
      .pipe(
        tap((_value) => {
          this.values$.next({ data: _value.data });
          return _value;
        })
      );
  }

  edit(value: IEmployee): Observable<IEmployeeResponse<IEmployee[]>> {
    return this.httpClient
      .patch(`${this.apiUrl}/${value.id}`, value)
      .pipe(
        tap((_value: IEmployeeResponse<IEmployee[]>) =>
          this.editValue(value, _value)
        )
      );
  }

  delete(valueId: number | string) {
    return this.httpClient.delete(`${this.apiUrl}/${valueId}`).pipe(
      tap(() => {
        const values: IEmployee[] =
          (this.values$.value?.data &&
            this.values$.value.data.filter((value) => value.id !== valueId)) ||
          [];
        this.values$.next({ data: values });
      })
    );
  }

  editValue(value: IEmployee, _value: IEmployeeResponse<IEmployee[]>) {
    const values: IEmployee[] = [
      ...(this.values$.value?.data || []),
    ] as IEmployee[];
    const valueIndex: number = values.findIndex(
      (item: IEmployee) => item.id === value.id
    );
    values[valueIndex] = _value.data as IEmployee;
    this.values$.next({ data: values });
    return _value;
  }
}
