import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

import { ContainerComponent } from '@flashcards/web/ui/container';

@Component({
  selector: 'flashcards-not-found-page',
  templateUrl: './permission-denied-page.component.html',
  styleUrls: ['./permission-denied-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ContainerComponent, MatButtonModule, RouterLink],
})
export class PermissionDeniedPageComponent {}
