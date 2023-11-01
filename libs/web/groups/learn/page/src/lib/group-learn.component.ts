import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { CardLearn } from '@flashcards/cards/common';
import { CardService } from '@flashcards/cards/services';
import { GetCardsLearnPipe } from '@flashcards/cards/ui/shared';
import { GetGroupPipe } from '@flashcards/groups/ui/shared';
import { CardsCarouselComponent } from '@flashcards/web/cards/ui/carousel';
import { CardsTableComponent } from '@flashcards/web/cards/ui/table';
import { GroupFormComponent } from '@flashcards/web/groups/ui/form';

@Component({
  selector: 'flashcards-group-learn',
  templateUrl: './group-learn.component.html',
  styleUrls: ['./group-learn.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    AsyncPipe,
    CardsTableComponent,
    GetGroupPipe,
    GroupFormComponent,
    MatCardModule,
    NgIf,
    CardsCarouselComponent,
    GetCardsLearnPipe,
  ],
})
export class GroupLearnComponent {
  @Input() uuid!: string;

  constructor(private readonly cardService: CardService) {}

  onLearned(cardSwiped: CardLearn): void {
    if (cardSwiped.learned) {
      this.cardService.change(cardSwiped.card.uuid, {
        repeated: [...cardSwiped.card.repeated, new Date().toISOString()],
      });
    }
  }
}
