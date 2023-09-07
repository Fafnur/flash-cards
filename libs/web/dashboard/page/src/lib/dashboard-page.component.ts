import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'flashcards-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [],
})
export class DashboardPageComponent {}
