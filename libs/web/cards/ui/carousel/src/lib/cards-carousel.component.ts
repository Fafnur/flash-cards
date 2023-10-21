import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'flashcards-cards-carousel',
  templateUrl: './cards-carousel.component.html',
  styleUrls: ['./cards-carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [],
})
export class CardsCarouselComponent {}
