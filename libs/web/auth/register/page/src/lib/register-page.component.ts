import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterLink } from '@angular/router';
import { catchError, EMPTY, finalize, tap } from 'rxjs';

import { AuthService } from '@flashcards/auth/services';
import { AuthCodeComponent, AuthEmailComponent, AuthFirstnameComponent, AuthLastnameComponent } from '@flashcards/web/auth/ui/fields';
import { TitleComponent } from '@flashcards/web/ui/title';

@Component({
  selector: 'flashcards-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    AuthEmailComponent,
    AuthFirstnameComponent,
    AuthLastnameComponent,
    AuthCodeComponent,
    TitleComponent,
    MatButtonModule,
    RouterLink,
    MatFormFieldModule,
  ],
})
export class RegisterPageComponent {
  readonly form = new FormGroup({
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    firstname: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(1)] }),
    lastname: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(1)] }),
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

      if (this.sent) {
        this.authService
          .confirm(this.form.getRawValue())
          .pipe(
            tap(() => {
              this.sent = true;
              this.changeDetectorRef.markForCheck();
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
        this.authService
          .register(this.form.getRawValue())
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
      }
    } else {
      // TODO: Scroll to error
    }
  }
}
