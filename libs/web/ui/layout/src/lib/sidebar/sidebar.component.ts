import { ChangeDetectionStrategy, Component } from '@angular/core';

import { CopyrightComponent } from '../copyright/copyright.component';
import { LogoComponent } from '../logo/logo.component';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'flashcards-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [LogoComponent, MenuComponent, CopyrightComponent],
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    class: 'flashcards-sidebar',
  },
})
export class SidebarComponent {}
