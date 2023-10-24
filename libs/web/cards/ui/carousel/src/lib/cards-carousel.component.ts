import { animate, keyframes, style, transition, trigger } from '@angular/animations';
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
    // eslint-disable-next-line @typescript-eslint/naming-convention
    '[@swipe]': 'animationState',
  },
  animations: [
    trigger('swipe', [
      transition(
        '* => rotateOutUpRight',
        animate(
          200,
          keyframes([
            style({ transform: 'rotate3d(0, 0, 0, 0deg)', opacity: 1, transformOrigin: 'right bottom', offset: 0 }),
            style({ transform: 'rotate3d(0, 0, 1, 30deg)', opacity: 0, transformOrigin: 'right bottom', offset: 1 }),
          ]),
        ),
      ),
    ]),
  ],
})
export class CardsCarouselComponent {
  @Input({ required: true }) cards!: Card[];

  @Output() selected = new EventEmitter<number>();
  active = 0;

  readonly trackByFn = trackByEntity;

  animationState!: string;

  @HostListener('swipeleft')
  onSwipeLeft(): void {
    this.active = this.active === this.cards.length - 1 ? 0 : this.active + 1;
  }

  @HostListener('swiperight')
  onSwipeRight(): void {
    this.animationState = 'rotateOutUpRight';
    this.active = this.active === this.cards.length - 1 ? 0 : this.active + 1;
  }
}
