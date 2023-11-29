import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router, RouterLink } from '@angular/router';
import { catchError, EMPTY, finalize, Observable, tap } from 'rxjs';

import { AuthResponse } from '@flashcards/auth/common';
import { AuthService } from '@flashcards/auth/services';
import { AuthCodeComponent, AuthEmailComponent } from '@flashcards/web/auth/ui/fields';
import { TitleComponent } from '@flashcards/web/ui/title';

@Component({
  selector: 'flashcards-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    AuthEmailComponent,
    AuthCodeComponent,
    TitleComponent,
    MatButtonModule,
    RouterLink,
    MatFormFieldModule,
  ],
})
export class LoginPageComponent {
  readonly form = new FormGroup({
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    code: new FormControl('', { nonNullable: true, validators: [Validators.minLength(5)] }),
  });

  sent = false;

  submitted = false;
  error = false;

  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly destroyRef: DestroyRef,
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  onSubmit(): void {
    this.form.markAllAsTouched();

    if (this.form.valid && !this.submitted) {
      this.submitted = true;
      this.error = false;

      this.changeDetectorRef.markForCheck();

      const formData = this.form.getRawValue();
      const request$: Observable<AuthResponse | void> = this.sent ? this.authService.confirm(formData) : this.authService.login(formData);

      request$
        .pipe(
          tap((data) => {
            this.sent = true;
            this.changeDetectorRef.markForCheck();

            if (data) {
              // TODO: Redirect
              void this.router.navigate(['/', 'learning']);
            }
          }),
          catchError(() => {
            this.form.controls.code.setErrors({ server: true });

            return EMPTY;
          }),
          finalize(() => {
            this.submitted = false;
            this.changeDetectorRef.markForCheck();
          }),
          takeUntilDestroyed(this.destroyRef),
        )
        .subscribe();
    } else {
      // TODO: Scroll to error
    }
  }
}
