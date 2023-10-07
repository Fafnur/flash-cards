import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { CardService } from '@flashcards/cards/services';
import { Group } from '@flashcards/groups/common';

@Component({
  selector: 'flashcards-group-card',
  templateUrl: './group-card.component.html',
  styleUrls: ['./group-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgIf, MatCardModule],
})
export class GroupCardComponent {
  @Input({ required: true }) group!: Group;

  readonly cardService = inject(CardService);
}
