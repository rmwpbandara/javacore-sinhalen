import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ContentService } from '../../core/services/content.service';
import { ProgressService } from '../../core/services/progress.service';
import { TreeNodeComponent } from './tree-node.component';

/** Layout shell: collapsible roadmap tree sidebar + search + progress, with the routed page. */
@Component({
  selector: 'jcs-roadmap-shell',
  standalone: true,
  imports: [RouterOutlet, RouterLink, TreeNodeComponent],
  templateUrl: './roadmap-shell.component.html',
  styleUrl: './roadmap-shell.component.scss',
})
export class RoadmapShellComponent {
  content = inject(ContentService);
  progress = inject(ProgressService);

  query = signal('');
  sidebarOpen = signal(false);

  results = computed(() => this.content.search(this.query()));

  allSlugs = this.content.leaves.map((l) => l.slug);
  overallPct = computed(() =>
    Math.round(this.progress.ratio(this.allSlugs) * 100),
  );

  onSearch(event: Event): void {
    this.query.set((event.target as HTMLInputElement).value);
  }

  closeSidebar(): void {
    this.sidebarOpen.set(false);
  }
}
