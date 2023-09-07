import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'flashcards-auth-email',
  templateUrl: './auth-email.component.html',
  styleUrls: ['./auth-email.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [],
})
export class AuthEmailComponent {}
