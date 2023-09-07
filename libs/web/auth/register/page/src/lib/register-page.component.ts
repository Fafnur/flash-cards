import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'flashcards-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [],
})
export class RegisterPageComponent {}
