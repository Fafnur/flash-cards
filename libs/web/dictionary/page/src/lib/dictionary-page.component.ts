import { ChangeDetectionStrategy, Component } from '@angular/core';

import { GroupCreateComponent } from '@flashcards/web/groups/ui/create';
import { GroupListComponent } from '@flashcards/web/groups/ui/list';
import { TitleComponent } from '@flashcards/web/ui/title';

@Component({
  selector: 'flashcards-dictionary-page',
  templateUrl: './dictionary-page.component.html',
  styleUrls: ['./dictionary-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [GroupCreateComponent, GroupListComponent, TitleComponent],
})
export class DictionaryPageComponent {}
