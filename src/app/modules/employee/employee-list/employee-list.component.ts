import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { EmployeeService } from '../../../shared/services/employee.service';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IEmployee } from '../../../shared/model/employee.model';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  NgbModal,
  NgbModalModule,
  NgbPaginationModule,
  NgbTypeaheadModule,
} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { EmployeeDetailComponent } from '../employee-detail/employee-detail.component';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    NgbTypeaheadModule,
    NgbPaginationModule,
    NgbModalModule
  ],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss',
})
export class EmployeeListComponent implements OnInit {
  employees: IEmployee[] = [];

  page = 1;
	pageSize = 4;
	collectionSize = 0;

  private readonly destroyRef = inject(DestroyRef);
  private modalService = inject(NgbModal);

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.refreshData();
  }

  refreshData() {
    this.employeeService
    .getEmp()
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe((res) => {
      const temp_employees = res?.data || [];
      this.collectionSize = temp_employees.length;
      this.employees = temp_employees.map((emp, i) => ({ id: i + 1, ...emp })).slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize,
      );
      console.log(this.employees);
    });
	}

  trackByIndex(index: number): number {
    return index;
  }

  onCreate():void{
    this.router.navigate(['create-employee']);
  }

  onDetail(obj:IEmployee):void{
    const modalRef = this.modalService.open(EmployeeDetailComponent, {
      backdrop: 'static',
    });
		modalRef.componentInstance.employee = obj;
  }
}
