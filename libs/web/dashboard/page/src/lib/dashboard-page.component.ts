import { ChangeDetectionStrategy, Component } from '@angular/core';

import { GroupCreateComponent } from '@flashcards/web/groups/ui/create';

@Component({
  selector: 'flashcards-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [GroupCreateComponent],
})
export class DashboardPageComponent {}
