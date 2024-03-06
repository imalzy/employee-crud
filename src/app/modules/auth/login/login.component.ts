import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ],
})
export class LoginComponent implements OnInit {
  form!: FormGroup<any>;

  constructor(private authService: AuthService, private router:Router) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }
  onSubmit() {
    this.authService
      .login(this.form.value.username, this.form.value.password)
      .subscribe((res) => {
        if (res && res.token) {
          this.authService.storeToken(res.token);
          this.router.navigate(['/employee'])
        }
      });
  }
}
