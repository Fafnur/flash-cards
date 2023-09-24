import { Platform } from '@angular/cdk/platform';
import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, Inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { tap } from 'rxjs';

import { WindowService } from '@flashcards/core';

@Component({
  selector: 'flashcards-theme-switcher',
  standalone: true,
  templateUrl: './theme-switcher.component.html',
  styleUrls: ['./theme-switcher.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule, MatButtonModule],
})
export class ThemeSwitcherComponent implements OnInit {
  readonly control = new FormControl<boolean | null>(null);
  isDark: boolean | null = null;

  constructor(
    private readonly platform: Platform,
    private readonly windowService: WindowService,
    private readonly destroyRef: DestroyRef,
    @Inject(DOCUMENT) private readonly document: Document,
  ) {}

  get mode(): string {
    return this.isDark ? 'dark' : 'light';
  }

  ngOnInit(): void {
    if (this.platform.isBrowser) {
      const prefers = this.windowService.window.matchMedia('(prefers-color-scheme: dark)').matches;
      const themePreference = this.windowService.window.localStorage.getItem('themePreference');

      this.isDark = themePreference ? themePreference === 'dark' : prefers ?? false;
      this.document.documentElement.setAttribute('data-theme', this.mode);

      this.control.valueChanges
        .pipe(
          tap((dark) => {
            this.isDark = dark ?? true;
            this.windowService.window.localStorage.setItem('themePreference', this.mode);
            this.document.documentElement.setAttribute('data-theme', this.mode);
          }),
          takeUntilDestroyed(this.destroyRef),
        )
        .subscribe();
    }
  }

  onToggle(): void {
    this.control.patchValue(!this.isDark);
  }
}
