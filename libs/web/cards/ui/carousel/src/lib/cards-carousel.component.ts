import { animate, state, style, transition, trigger } from '@angular/animations';
import { NgForOf, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

import { Card, CardLearn } from '@flashcards/cards/common';
import { trackByEntity } from '@flashcards/core';

import { CardCarouselComponent } from './card-carousel/card-carousel.component';

@Component({
  selector: 'flashcards-cards-carousel',
  templateUrl: './cards-carousel.component.html',
  styleUrls: ['./cards-carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgForOf, CardCarouselComponent, NgIf],
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    class: 'flashcards-cards-carousel',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    '[@swipe]': 'animationState',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    '(@swipe.done)': 'onDone()',
  },
  animations: [
    trigger('swipe', [
      state('left', style({ transform: 'translateX(-60px)', color: 'transparent' })),
      state('right', style({ transform: 'translateX(60px)', color: 'transparent' })),
      state('off', style({ transform: 'translateX(0)', color: 'inherit' })),
      transition('off => left, off => right', [animate(150)]),
      transition('* => off', [animate(0)]),
    ]),
  ],
})
export class CardsCarouselComponent {
  @Input({ required: true }) cards!: Card[];

  @Output() learned = new EventEmitter<CardLearn>();

  readonly trackByFn = trackByEntity;

  animationState = 'off';

  @HostListener('swipeleft')
  onSwipeLeft(): void {
    if (this.cards.length) {
      this.animationState = 'left';
    }
  }

  @HostListener('swiperight')
  onSwipeRight(): void {
    if (this.cards.length) {
      this.animationState = 'right';
    }
  }

  onDone(): void {
    if (['left', 'right'].includes(this.animationState)) {
      const learned = this.animationState === 'right';
      this.animationState = 'off';

      const selected = this.cards.shift();
      if (selected) {
        this.learned.emit({ card: selected, learned });
      }
    }
  }
}
