import { NgForOf } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

import { Card } from '@flashcards/cards/common';
import { trackByEntity } from '@flashcards/core';

import { CardCarouselComponent } from './card-carousel/card-carousel.component';

@Component({
  selector: 'flashcards-cards-carousel',
  templateUrl: './cards-carousel.component.html',
  styleUrls: ['./cards-carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgForOf, CardCarouselComponent],
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    class: 'flashcards-cards-carousel',
  },
})
export class CardsCarouselComponent {
  @Input({ required: true }) cards!: Card[];

  @Output() selected = new EventEmitter<number>();
  active = 0;

  readonly trackByFn = trackByEntity;

  @HostListener('swipeleft')
  onSwipeLeft(): void {
    this.next();
  }

  @HostListener('swiperight')
  onSwipeRight(): void {
    this.next();
  }

  next(): void {
    this.active = this.active === this.cards.length - 1 ? 0 : this.active + 1;
  }
}
