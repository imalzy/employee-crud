import { Component, Input, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IEmployee } from '../../../shared/model/employee.model';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-employee-detail',
  standalone: true,
  imports: [RouterModule, CommonModule, DatePipe, CurrencyPipe],
  templateUrl: './employee-detail.component.html',
  styleUrl: './employee-detail.component.scss'
})
export class EmployeeDetailComponent {
  activeModal = inject(NgbActiveModal);

  @Input()
  employee!: any;

  constructor(
    private router: Router
  ) {}

  goBack():void{
    this.activeModal.dismiss({
      dismissed: true
    })
  }
}
