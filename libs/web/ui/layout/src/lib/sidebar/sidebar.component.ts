import { ChangeDetectionStrategy, Component } from '@angular/core';

import { CopyrightComponent } from '../copyright/copyright.component';
import { LogoComponent } from '../logo/logo.component';
import { NavComponent } from '../nav/nav.component';
import { ThemeSwitcherComponent } from '../theme-switcher/theme-switcher.component';

@Component({
  selector: 'flashcards-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    class: 'flashcards-sidebar',
  },
  imports: [LogoComponent, ThemeSwitcherComponent, NavComponent, CopyrightComponent],
})
export class SidebarComponent {}
