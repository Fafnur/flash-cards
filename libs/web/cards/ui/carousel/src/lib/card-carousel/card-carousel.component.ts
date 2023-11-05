import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnChanges,
  Output,
  SimpleChange,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { Card, CardLearn } from '@flashcards/cards/common';

@Component({
  selector: 'flashcards-card-carousel',
  templateUrl: './card-carousel.component.html',
  styleUrls: ['./card-carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatCardModule, NgIf],
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    class: 'flashcards-card-carousel',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    '[@swipe]': 'animationState',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    '(@swipe.done)': 'onDone()',
  },
  animations: [
    trigger('tapped', [
      state('on', style({ transform: 'rotateY(-180deg)', color: 'inherit' })),
      state('off', style({ transform: 'rotateY(0)', color: 'inherit' })),
      transition('off => on', [
        animate(
          '200ms',
          keyframes([style({ transform: 'rotateY(0)', color: 'transparent' }), style({ transform: 'rotateY(-180deg)', color: 'inherit' })]),
        ),
      ]),
      transition('on => off', [
        animate(
          '200ms',
          keyframes([style({ transform: 'rotateY(-180deg)', color: 'transparent' }), style({ transform: 'rotateY(0)', color: 'inherit' })]),
        ),
      ]),
    ]),
    trigger('swipe', [
      state('left', style({ transform: 'translateX(-60px)', color: 'transparent' })),
      state('right', style({ transform: 'translateX(60px)', color: 'transparent' })),
      state('off', style({ transform: 'translateX(0)', color: 'inherit' })),
      transition('off => left, off => right', [animate(150)]),
      transition('* => off', [animate(0)]),
    ]),
  ],
})
export class CardCarouselComponent implements OnChanges {
  @Input({ required: true }) card!: Card;
  @Input({ required: true }) active!: boolean;

  @Output() learned = new EventEmitter<CardLearn>();

  tapped = false;

  animationState = 'off';

  get label(): string {
    return this.tapped ? this.card.translation : this.card.original;
  }

  @HostListener('tap')
  onTap() {
    this.tapped = !this.tapped;
  }

  @HostBinding('class.is-active')
  get isActive(): boolean {
    return this.active;
  }

  @HostBinding('class.is-tapped')
  get isTapped(): boolean {
    return this.tapped;
  }

  @HostListener('swipeleft')
  onSwipeLeft(): void {
    if (this.animationState === 'off') {
      this.animationState = 'left';
    }
  }

  @HostListener('swiperight')
  onSwipeRight(): void {
    if (this.animationState === 'off') {
      this.animationState = 'right';
    }
  }

  ngOnChanges(changes: { active: SimpleChange }): void {
    if (this.tapped && !changes.active.currentValue) {
      this.tapped = false;
    }
  }

  onDone(): void {
    if (['left', 'right'].includes(this.animationState)) {
      const learned = this.animationState === 'right';
      this.animationState = 'off';
      this.learned.emit({ card: this.card, learned });
    }
  }
}
