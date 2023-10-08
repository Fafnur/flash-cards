import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

import { GetCardsPipe } from '@flashcards/cards/ui/shared';
import { Group } from '@flashcards/groups/common';

@Component({
  selector: 'flashcards-group-card',
  templateUrl: './group-card.component.html',
  styleUrls: ['./group-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgIf, MatCardModule, AsyncPipe, GetCardsPipe, RouterLink],
})
export class GroupCardComponent {
  @Input({ required: true }) group!: Group;
}
