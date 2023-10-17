import { Platform } from '@angular/cdk/platform';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { Observable, tap } from 'rxjs';

import { AuthService } from '@flashcards/auth/services';
import { Card, CardChange, CardNew } from '@flashcards/cards/common';
import { CardService } from '@flashcards/cards/services';
import { trackByEntity } from '@flashcards/core';
import { Group } from '@flashcards/groups/common';
import { CardFormComponent } from '@flashcards/web/cards/ui/form';

@Component({
  selector: 'flashcards-cards-table',
  templateUrl: './cards-table.component.html',
  styleUrls: ['./cards-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgIf, NgForOf, AsyncPipe, CardFormComponent, MatDividerModule],
})
export class CardsTableComponent implements OnInit {
  @Input({ required: true }) group!: Group;
  @ViewChildren('cardForm') formWithCards!: QueryList<CardFormComponent>;

  trackByFn = trackByEntity;

  cardsByGroup$!: Observable<Card[]>;
  submitted = false;

  constructor(
    private readonly cardService: CardService,
    private readonly authService: AuthService,
    private readonly platform: Platform,
  ) {}

  ngOnInit(): void {
    this.cardsByGroup$ = this.cardService.cardsByGroup$(this.group.uuid).pipe(
      tap(() => {
        if (this.submitted) {
          this.submitted = false;

          if (this.platform.isBrowser) {
            window.setTimeout(() => {
              this.formWithCards.last.onFocus();
            }, 0);
          }
        }
      }),
    );
  }

  onChanged(cardChange: CardChange): void {
    this.cardService.change(cardChange.uuid as string, cardChange);
  }

  onRemoved(uuid: string): void {
    this.cardService.remove(uuid);
  }

  onSubmitted(card: CardNew): void {
    this.submitted = true;
    this.cardService.create({
      ...card,
      user: this.authService.uuid,
      groupUuid: this.group.uuid,
    });
  }
}
