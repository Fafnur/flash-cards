import { NgForOf, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'flashcards-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgIf, NgForOf, RouterLink, RouterLinkActive, MatButtonModule, MatIconModule],
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    class: 'flashcards-nav',
  },
})
export class NavComponent {
  readonly links = [
    {
      route: 'learning',
      label: $localize`:Nav link|:Learning`,
      icon: 'school',
    },
    {
      route: 'dictionary',
      label: $localize`:Nav link|:Dictionary`,
      icon: 'view_carousel',
    },
    {
      route: 'profile',
      label: $localize`:Nav link|:Profile`,
      icon: 'manage_accounts',
    },
    {
      route: 'settings',
      label: $localize`:Nav link|:Settings`,
      icon: 'settings',
    },
  ];
}
