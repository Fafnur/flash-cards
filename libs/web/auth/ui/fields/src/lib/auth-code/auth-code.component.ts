import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'flashcards-auth-code',
  templateUrl: './auth-code.component.html',
  styleUrls: ['./auth-code.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [],
})
export class AuthCodeComponent {}
