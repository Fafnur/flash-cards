import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'flashcards-auth-promo',
  templateUrl: './auth-promo.component.html',
  styleUrls: ['./auth-promo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [],
})
export class AuthPromoComponent {}
