import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'flashcards-auth-firstname',
  templateUrl: './auth-firstname.component.html',
  styleUrls: ['./auth-firstname.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [],
})
export class AuthFirstnameComponent {}
