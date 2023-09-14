import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ContainerComponent } from '@flashcards/web/ui/container';
import { ColumnComponent, RowComponent } from '@flashcards/web/ui/grid';

import { AuthPromoComponent } from './auth-promo/auth-promo.component';

@Component({
  selector: 'flashcards-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterOutlet, ContainerComponent, RowComponent, ColumnComponent, AuthPromoComponent],
})
export class AuthLayoutComponent {}
