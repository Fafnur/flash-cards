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

import { CardsRepeatComponent } from './cards-repeat/cards-repeat.component';

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
    CardsRepeatComponent,
  ],
})
export class GroupLearnComponent {
  @Input() uuid!: string;

  finished = false;

  constructor(private readonly cardService: CardService) {}

  onLearned(cardLearn: CardLearn): void {
    if (cardLearn.learned) {
      this.cardService.change(cardLearn.card.uuid, {
        learned: cardLearn.learned,
      });
    }
  }

  onFinished(): void {
    this.finished = true;
  }

  onRepeat(): void {
    this.finished = false;
  }
}
