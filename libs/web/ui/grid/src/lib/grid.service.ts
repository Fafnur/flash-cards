import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export const BREAKPOINTS = new InjectionToken<typeof Breakpoints>('Breakpoints');

export const enum BreakpointType {
  XSmall = 'xsmall',
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
  XLarge = 'xlarge',

  Handset = 'handset',
  Tablet = 'tablet',
  Web = 'web',

  HandsetPortrait = 'handsetPortrait',
  TabletPortrait = 'tabletPortrait',
  WebPortrait = 'webPortrait',
  HandsetLandscape = 'handsetLandscape',
  TabletLandscape = 'tabletLandscape',
  WebLandscape = 'webLandscape',
}

@Injectable({
  providedIn: 'root',
})
export class GridService {
  readonly breakpoints: typeof Breakpoints;
  private readonly map: Record<BreakpointType, string>;

  private readonly state$ = new BehaviorSubject<BreakpointType>(BreakpointType.Handset);

  readonly currentType$ = this.state$.asObservable();

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    @Optional() @Inject(BREAKPOINTS) breakpoints: typeof Breakpoints | null,
  ) {
    this.breakpoints = breakpoints ?? Breakpoints;

    this.map = {
      [BreakpointType.Handset]: this.breakpoints.Handset,
      [BreakpointType.HandsetPortrait]: this.breakpoints.HandsetPortrait,
      [BreakpointType.HandsetLandscape]: this.breakpoints.HandsetLandscape,
      [BreakpointType.Tablet]: this.breakpoints.Tablet,
      [BreakpointType.TabletPortrait]: this.breakpoints.TabletPortrait,
      [BreakpointType.TabletLandscape]: this.breakpoints.TabletLandscape,
      [BreakpointType.Web]: this.breakpoints.Web,
      [BreakpointType.WebPortrait]: this.breakpoints.WebPortrait,
      [BreakpointType.WebLandscape]: this.breakpoints.WebLandscape,
      [BreakpointType.XSmall]: this.breakpoints.XSmall,
      [BreakpointType.Small]: this.breakpoints.Small,
      [BreakpointType.Medium]: this.breakpoints.Medium,
      [BreakpointType.Large]: this.breakpoints.Large,
      [BreakpointType.XLarge]: this.breakpoints.XLarge,
    };

    this.breakpointObserver
      .observe([this.breakpoints.Handset, this.breakpoints.Tablet, this.breakpoints.Web])
      .pipe(
        tap((state) => {
          for (const [key, value] of Object.entries(state.breakpoints)) {
            if (value) {
              this.state$.next(key as BreakpointType);
              break;
            }
          }
        }),
        takeUntilDestroyed(),
      )
      .subscribe();
  }

  up(types: BreakpointType | BreakpointType[]): Observable<boolean> {
    const observeTypes = Array.isArray(types) ? types.map((type) => this.map[type]) : this.map[types];

    return this.breakpointObserver.observe(observeTypes).pipe(map((breakpoints) => breakpoints.matches));
  }
}
