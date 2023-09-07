import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { catchError, EMPTY, finalize, tap } from 'rxjs';

import { AuthService } from '@flashcards/auth/services';
import { AuthCodeComponent, AuthEmailComponent } from '@flashcards/web/auth/ui/fields';
import { TitleComponent } from '@flashcards/web/ui/title';
import { MatFormFieldModule } from '@angular/material/form-field';

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
  ) {}

  onSubmit(): void {
    this.form.markAllAsTouched();

    if (this.form.valid && !this.submitted) {
      this.submitted = true;
      this.error = false;

      this.changeDetectorRef.markForCheck();

      this.authService
        .login(this.form.getRawValue())
        .pipe(
          tap(() => {
            this.sent = true;
            this.changeDetectorRef.markForCheck();
          }),
          catchError(() => {
            this.form.controls.email.setErrors({ unknown: true });
            this.form.controls.email.markAllAsTouched();

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
