import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding, HostListener, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { Card } from '@flashcards/cards/common';

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
  },
})
export class CardCarouselComponent {
  @Input({ required: true }) card!: Card;
  @Input({ required: true }) active!: boolean;

  tapped = false;

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
}
