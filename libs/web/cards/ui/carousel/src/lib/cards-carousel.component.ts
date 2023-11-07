import { NgForOf, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';

import { Card, CardLearn } from '@flashcards/cards/common';
import { trackByEntity } from '@flashcards/core';

import { CardActionsComponent } from './card-actions/card-actions.component';
import { CardCarouselComponent } from './card-carousel/card-carousel.component';

@Component({
  selector: 'flashcards-cards-carousel',
  templateUrl: './cards-carousel.component.html',
  styleUrls: ['./cards-carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgForOf, NgIf, CardCarouselComponent, CardActionsComponent],
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    class: 'flashcards-cards-carousel',
  },
})
export class CardsCarouselComponent {
  @Input({ required: true }) cards!: Card[];

  @Output() learned = new EventEmitter<CardLearn>();
  @Output() finished = new EventEmitter<void>();

  @ViewChildren(CardCarouselComponent) slides!: QueryList<CardCarouselComponent>;

  readonly trackByFn = trackByEntity;

  onLearned(learned: CardLearn): void {
    this.cards.shift();
    this.learned.emit(learned);

    if (this.cards.length === 0) {
      this.finished.emit();
    }
  }

  onLearn(learned: boolean): void {
    if (learned) {
      this.slides.first.onSwipeRight();
    } else {
      this.slides.first.onSwipeLeft();
    }
  }
}
