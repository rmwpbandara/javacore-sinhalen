import { Component, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { ContentService } from '../../core/services/content.service';
import { ProgressService } from '../../core/services/progress.service';
import { CodeBlockComponent } from '../../shared/components/code-block.component';

/**
 * The single reusable template that renders one leaf concept end-to-end:
 * breadcrumb + level badges, Singlish summary, Sinhala explanation cards,
 * analogy, highlighted code, the Mortar real-world callout, key points,
 * pitfalls, mark-complete, and prev/next navigation.
 */
@Component({
  selector: 'jcs-concept-page',
  standalone: true,
  imports: [RouterLink, CodeBlockComponent],
  templateUrl: './concept-page.component.html',
  styleUrl: './concept-page.component.scss',
})
export class ConceptPageComponent {
  private route = inject(ActivatedRoute);
  private content = inject(ContentService);
  progress = inject(ProgressService);

  private slug = toSignal(this.route.paramMap.pipe(map((p) => p.get('slug') ?? '')), {
    initialValue: '',
  });

  node = computed(() => this.content.getBySlug(this.slug()));
  breadcrumb = computed(() => this.content.breadcrumbFor(this.slug()));
  siblings = computed(() => this.content.siblings(this.slug()));
  levels = computed(() => this.node()?.number.split('.') ?? []);
  done = computed(() => this.progress.isComplete(this.slug()));

  copiedShare = signal(false);

  constructor() {
    // scroll to top + record last-visited whenever the slug changes
    effect(() => {
      const s = this.slug();
      if (s) {
        this.progress.setLast(s);
        queueMicrotask(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
      }
    });
  }

  toggleDone(): void {
    this.progress.toggle(this.slug());
  }

  levelLabel(): string {
    const n = this.levels().length;
    return ['Section', 'Topic', 'Subtopic', 'Concept', 'Detail'][Math.min(n - 1, 4)];
  }
}
