import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { GetCardsPipe } from '@flashcards/cards/ui/shared';
import { trackByEntity } from '@flashcards/core';
import { Group } from '@flashcards/groups/common';
import { CardFormComponent } from '@flashcards/web/cards/ui/form';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'flashcards-cards-table',
  templateUrl: './cards-table.component.html',
  styleUrls: ['./cards-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgIf, NgForOf, GetCardsPipe, AsyncPipe, CardFormComponent, MatDividerModule],
})
export class CardsTableComponent {
  @Input({ required: true }) group!: Group;

  trackByFn = trackByEntity;
}
