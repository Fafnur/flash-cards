import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ContainerComponent } from '@flashcards/web/ui/container';

import { CopyrightComponent } from '../copyright/copyright.component';
import { ThemeSwitcherComponent } from '../theme-switcher/theme-switcher.component';

@Component({
  selector: 'flashcards-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    class: 'flashcards-footer',
  },
  imports: [ContainerComponent, CopyrightComponent, ThemeSwitcherComponent],
})
export class FooterComponent {}
