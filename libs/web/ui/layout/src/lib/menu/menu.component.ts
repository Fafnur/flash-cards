import { ChangeDetectionStrategy, Component } from '@angular/core';

import { NavComponent } from '../nav/nav.component';

@Component({
  selector: 'flashcards-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NavComponent],
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    class: 'flashcards-menu',
  },
})
export class MenuComponent {}
