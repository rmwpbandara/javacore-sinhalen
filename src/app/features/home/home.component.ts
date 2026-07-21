import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../core/services/content.service';
import { ProgressService } from '../../core/services/progress.service';
import { RoadmapNode } from '../../core/models/roadmap.model';

interface SectionCard {
  node: RoadmapNode;
  leaves: number;
  done: number;
  pct: number;
  icon: string;
}

/** Landing page: hero, the learning journey, section cards with progress, resume link. */
@Component({
  selector: 'jcs-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private content = inject(ContentService);
  progress = inject(ProgressService);

  private icons = ['☕', '⚙️', '✨', '🧠', '🏛️', '🌱', '🚀', '🕸️', '🗄️', '🧪', '🌍'];

  firstSlug = this.content.leaves[0]?.slug ?? '';
  lastSlug = computed(() => this.progress.getLast());

  totalConcepts = this.content.totalCount;
  authoredConcepts = this.content.authoredCount;

  overallPct = computed(() =>
    Math.round(this.progress.ratio(this.content.leaves.map((l) => l.slug)) * 100),
  );

  cards = computed<SectionCard[]>(() =>
    this.content.sections.map((node, i) => {
      const slugs = this.content.leafSlugsUnder(node);
      const done = this.progress.countDone(slugs);
      return {
        node,
        leaves: slugs.length,
        done,
        pct: Math.round((done / slugs.length) * 100),
        icon: this.icons[i] ?? '📘',
      };
    }),
  );

  firstLeafSlugOf(node: RoadmapNode): string {
    return this.content.leafSlugsUnder(node)[0] ?? this.firstSlug;
  }
}
