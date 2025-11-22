import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { BreakpointObserver } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

interface NavLink {
  readonly label: string;
  readonly path: string;
  readonly icon: string;
  readonly exact?: boolean;
}

const HANDSET_QUERY = '(max-width: 768px)';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    RouterLinkActive,
    NgOptimizedImage,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
  ],
})
export class AppToolbarComponent {
  private readonly breakpointObserver = inject(BreakpointObserver);

  readonly isHandset = toSignal(
    this.breakpointObserver
      .observe([HANDSET_QUERY])
      .pipe(map(result => result.matches)),
    { initialValue: false },
  );

  readonly navLinks: readonly NavLink[] = [
    { label: 'Home', path: '/', icon: 'home', exact: true },
    { label: 'Gallery', path: '/gallery', icon: 'palette' },
    { label: 'About Me', path: '/about', icon: 'person' },
    { label: 'Contact', path: '/contact', icon: 'mail' },
  ];

  readonly ctaLink: NavLink = {
    label: 'Work with me',
    path: '/contact',
    icon: 'brush',
  };
}
