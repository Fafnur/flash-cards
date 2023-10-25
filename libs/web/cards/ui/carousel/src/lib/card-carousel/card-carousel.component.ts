import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { CdkDrag, CdkDragStart } from '@angular/cdk/drag-drop';
import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding, HostListener, Input, OnChanges, SimpleChange, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { tap } from 'rxjs';

import { Card } from '@flashcards/cards/common';

@Component({
  selector: 'flashcards-card-carousel',
  templateUrl: './card-carousel.component.html',
  styleUrls: ['./card-carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatCardModule, NgIf, CdkDrag],
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    class: 'flashcards-card-carousel',
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
  ],
})
export class CardCarouselComponent implements OnChanges {
  @Input({ required: true }) card!: Card;
  @Input({ required: true }) active!: boolean;

  @ViewChild('slide', { static: true }) slide!: any;

  tapped = false;
  dragPosition = { x: 0, y: 0 };

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

  ngOnChanges(changes: { active: SimpleChange }): void {
    if (this.tapped && !changes.active.currentValue) {
      this.tapped = false;
    }
  }

  onDragStart(event: CdkDragStart): void {
    event.source.moved.pipe(tap(console.log)).subscribe();
  }

  onDragEnded(): void {
    this.dragPosition = { x: 0, y: 0 };
  }
}
