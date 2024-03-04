import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeService } from '../../../shared/services/employee.service';
import { generateString } from '../../../shared/utils/helper';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [NgbDatepickerModule, FormsModule, ReactiveFormsModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.scss',
})
export class EmployeeFormComponent {
  formGroup: FormGroup = new FormGroup({});
  private readonly destroyRef = inject(DestroyRef);

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {
    this.formGroup = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      username: new FormControl(''),
      email: new FormControl(''),
      birthDate: new FormControl(''),
      basicSalary: new FormControl(''),
      status: new FormControl(''),
      group: new FormControl(''),
      description: new FormControl(''),
    });
  }

  onSave(): void {
    const uuid = generateString(10);
    const body = { ...this.formGroup.value, id: uuid };
    console.log(body);

    this.employeeService
      .add(body)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        console.log(res);
        this.router.navigate(['/employee'], {
          replaceUrl: true,
        });
      });
  }
}
