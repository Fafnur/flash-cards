import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { GetCardsPipe } from '@flashcards/cards/ui/shared';
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
  imports: [AsyncPipe, CardsTableComponent, GetGroupPipe, GroupFormComponent, MatCardModule, NgIf, CardsCarouselComponent, GetCardsPipe],
})
export class GroupLearnComponent {
  @Input() uuid!: string;

  /**
   * TODO: Доделать список слов
   *
   * Выводим карусель слов, в случайном порядке. При клике на слово - показывается перевод
   * Свайп влево/вправо -> не знаю / выучил
   */
  constructor() {}
}
