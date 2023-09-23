import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ContainerComponent } from '@flashcards/web/ui/container';

@Component({
  selector: 'flashcards-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ContainerComponent],
})
export class HeaderComponent {}
