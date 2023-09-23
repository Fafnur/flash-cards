import { AsyncPipe, NgSwitch, NgSwitchCase, NgSwitchDefault, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ContainerComponent } from '@flashcards/web/ui/container';
import { GridService } from '@flashcards/web/ui/grid';

import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'flashcards-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterOutlet, NgSwitch, NgSwitchCase, NgSwitchDefault, NgTemplateOutlet, AsyncPipe, ContainerComponent, FooterComponent],
})
export class LayoutComponent {
  private readonly gridService = inject(GridService);

  readonly currentType$ = this.gridService.currentType$;
  readonly breakpoints = this.gridService.breakpoints;
}
