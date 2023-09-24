import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ContainerComponent } from '@flashcards/web/ui/container';

import { LogoComponent } from '../logo/logo.component';

@Component({
  selector: 'flashcards-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ContainerComponent, LogoComponent],
})
export class HeaderComponent {}
