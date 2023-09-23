import { AsyncPipe, NgSwitch, NgSwitchCase, NgSwitchDefault, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ContainerComponent } from '@flashcards/web/ui/container';
import { BreakpointType, GridService } from '@flashcards/web/ui/grid';

import { CopyrightComponent } from './copyright/copyright.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LogoComponent } from './logo/logo.component';
import { NavComponent } from './nav/nav.component';

@Component({
  selector: 'flashcards-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    RouterOutlet,
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault,
    NgTemplateOutlet,
    AsyncPipe,
    ContainerComponent,
    FooterComponent,
    HeaderComponent,
    CopyrightComponent,
    LogoComponent,
    NavComponent,
  ],
})
export class LayoutComponent {
  private readonly gridService = inject(GridService);

  readonly currentType$ = this.gridService.currentType$;
  readonly types = BreakpointType;
}
