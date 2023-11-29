import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'flashcards-groups-hint',
  templateUrl: './groups-hint.component.html',
  styleUrl: './groups-hint.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatCardModule],
})
export class GroupsHintComponent {}
