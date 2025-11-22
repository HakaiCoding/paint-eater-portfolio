import {
  ChangeDetectionStrategy,
  Component,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

interface HeroHighlight {
  readonly label: string;
  readonly value: string;
}

interface ServiceCard {
  readonly icon: string;
  readonly title: string;
  readonly description: string;
}

interface ProcessStep {
  readonly icon: string;
  readonly title: string;
  readonly description: string;
}

interface HeroSlide {
  readonly id: string;
  readonly imageSrc: string;
  readonly imageWidth: number;
  readonly imageHeight: number;
  readonly alt: string;
  readonly label: string;
  readonly title: string;
  readonly description: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    NgOptimizedImage,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
  ],
})
export class Home {
  readonly heroHighlights: readonly HeroHighlight[] = [
    { label: 'Armies painted', value: '40+' },
    { label: 'Miniatures', value: '1.5k+' },
    { label: 'Years painting', value: '8+' },
  ];

  readonly specialties: readonly string[] = [
    'Warhammer 40,000 & Age of Sigmar',
    'Tabletop & display quality',
    'Cohesive army themes & basing',
  ];

  readonly services: readonly ServiceCard[] = [
    {
      icon: 'groups',
      title: 'Full army commissions',
      description:
        'From first squad to full force: consistent schemes, clear highlights and cohesive basing across your whole army.',
    },
    {
      icon: 'star',
      title: 'Heroes & centerpieces',
      description:
        'High-focus characters, monsters and vehicles that stand out on the table and in your display cabinet.',
    },
    {
      icon: 'palette',
      title: 'Custom schemes & reworks',
      description:
        'Bespoke color schemes, glow effects and touch-ups to bring older models or second-hand armies back to life.',
    },
  ];

  readonly process: readonly ProcessStep[] = [
    {
      icon: 'chat',
      title: 'Brief & army plan',
      description:
        'We talk about your faction, points level, deadlines and the look you want: grimdark, bright, lore-accurate or custom.',
    },
    {
      icon: 'brush',
      title: 'Test model & batches',
      description:
        'You approve a test miniature, then I paint in efficient batches so the army looks cohesive from the first game.',
    },
    {
      icon: 'local_shipping',
      title: 'Varnish, pack & ship',
      description:
        'Models are sealed, carefully packed and shipped so they arrive ready to hit the tabletop straight out of the box.',
    },
  ];

  /** Slides for the large top banner */
  readonly heroSlides: readonly HeroSlide[] = [
    {
      id: 'tyranids-hiveworld-7th',
      imageSrc: 'assets/hero/hero-1.webp',
      imageWidth: 1280,
      imageHeight: 720,
      alt: 'Painted Tyranid miniatures in a cohesive hive fleet color scheme.',
      label: 'Featured commission',
      title: '“Hiveworld 7th – Tyranid strike force”',
      description:
        'A fast-play Tyranid army painted for clarity on the table: strong contrasts, readable unit roles and themed toxic basing.',
    },
    {
      id: 'space-marines-strike-force',
      imageSrc: 'assets/hero/hero-2.webp',
      imageWidth: 1280,
      imageHeight: 720,
      alt: 'Space Marines strike force with bold chapter colors and weathering.',
      label: 'Battle-forged detachment',
      title: '“Azure Wardens – 1st strike force”',
      description:
        'Clean, readable chapter colors with edge highlights and weathered vehicles that pop from across the table.',
    },
    {
      id: 'aos-stormhost',
      imageSrc: 'assets/hero/hero-3.webp',
      imageWidth: 1280,
      imageHeight: 720,
      alt: 'Age of Sigmar stormhost army with glowing weapons and scenic bases.',
      label: 'Display-ready stormhost',
      title: '“Stormveil – Celestial phalanx”',
      description:
        'An Age of Sigmar stormhost with glowing weapons, OSL accents and scenic bases that still read clearly in play.',
    },
  ];

  /** Slides for the card carousel on the right.
   *  De momento reutilizamos los mismos datos, pero el estado es independiente.
   */
  readonly heroCardSlides: readonly HeroSlide[] = this.heroSlides;

  private readonly bannerSlideCount = this.heroSlides.length;
  private readonly cardSlideCount = this.heroCardSlides.length;

  /** Estado del banner grande */
  readonly currentSlide = signal(0);

  /** Estado del carrusel de tarjetas (derecha) */
  readonly currentCardSlide = signal(0);

  // ---- Banner controls ----

  nextSlide(): void {
    const index = this.currentSlide();
    this.currentSlide.set((index + 1) % this.bannerSlideCount);
  }

  previousSlide(): void {
    const index = this.currentSlide();
    this.currentSlide.set((index - 1 + this.bannerSlideCount) % this.bannerSlideCount);
  }

  goToSlide(index: number): void {
    if (index < 0 || index >= this.bannerSlideCount) {
      return;
    }
    this.currentSlide.set(index);
  }

  // ---- Card carousel controls (right side) ----

  nextCardSlide(): void {
    const index = this.currentCardSlide();
    this.currentCardSlide.set((index + 1) % this.cardSlideCount);
  }

  previousCardSlide(): void {
    const index = this.currentCardSlide();
    this.currentCardSlide.set((index - 1 + this.cardSlideCount) % this.cardSlideCount);
  }

  goToCardSlide(index: number): void {
    if (index < 0 || index >= this.cardSlideCount) {
      return;
    }
    this.currentCardSlide.set(index);
  }
}
