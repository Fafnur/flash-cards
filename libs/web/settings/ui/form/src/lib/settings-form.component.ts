import { Component, DestroyRef, inject, Input, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { filter, switchMap, take, tap } from 'rxjs';

import { UserService } from '@flashcards/users/services';

import { UserEmailComponent } from './user-email/user-email.component';
import { UserFirstnameComponent } from './user-firstname/user-firstname.component';
import { UserLastnameComponent } from './user-lastname/user-lastname.component';

@Component({
  selector: 'flashcards-settings-form',
  templateUrl: './settings-form.component.html',
  styleUrl: './settings-form.component.scss',
  standalone: true,
  imports: [UserLastnameComponent, UserFirstnameComponent, UserEmailComponent, MatCardModule],
})
export class SettingsFormComponent implements OnInit {
  private readonly userService = inject(UserService);
  private readonly destroyRef = inject(DestroyRef);

  readonly form = new FormGroup({
    firstname: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(1)],
    }),
    lastname: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(1)],
    }),
    email: new FormControl<string>(
      { value: '', disabled: true },
      {
        nonNullable: true,
        validators: [Validators.required, Validators.email],
      },
    ),
  });

  ngOnInit(): void {
    this.userService.user$
      .pipe(
        take(1),
        tap((user) => this.form.patchValue(user)),
        switchMap(() => this.form.valueChanges),
        filter(() => this.form.valid),
        tap(() => this.userService.update(this.form.getRawValue())),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }
}
