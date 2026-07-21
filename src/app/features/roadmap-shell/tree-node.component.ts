import { Component, Input, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { RoadmapNode } from '../../core/models/roadmap.model';
import { ProgressService } from '../../core/services/progress.service';

/** Recursive sidebar tree node: branch (collapsible) or leaf (routed link). */
@Component({
  selector: 'jcs-tree-node',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    @if (isLeaf) {
      <a
        class="tn__leaf"
        [routerLink]="['/learn', node.slug]"
        routerLinkActive="tn__leaf--active"
      >
        <span class="tn__tick" [class.tn__tick--done]="progress.isComplete(node.slug!)">
          {{ progress.isComplete(node.slug!) ? '✓' : '' }}
        </span>
        <span class="tn__num">{{ node.number }}</span>
        <span class="tn__label">{{ node.title }}</span>
        @if (!hasContent) { <span class="tn__wip" title="content in progress">·</span> }
      </a>
    } @else {
      <div class="tn__branch">
        <button class="tn__toggle" type="button" (click)="open.set(!open())">
          <span class="tn__caret" [class.tn__caret--open]="open()">▸</span>
          <span class="tn__num">{{ node.number }}</span>
          <span class="tn__label">{{ node.title }}</span>
        </button>
        @if (open()) {
          <div class="tn__children" [style.--depth]="depth">
            @for (child of node.children; track child.number) {
              <jcs-tree-node [node]="child" [depth]="depth + 1" />
            }
          </div>
        }
      </div>
    }
  `,
  styleUrl: './tree-node.component.scss',
})
export class TreeNodeComponent {
  @Input({ required: true }) node!: RoadmapNode;
  @Input() depth = 0;
  progress = inject(ProgressService);

  // top two levels expanded by default; deeper collapsed
  open = signal(false);

  get isLeaf(): boolean {
    return !this.node.children || this.node.children.length === 0;
  }
  get hasContent(): boolean {
    return !!this.node.concept;
  }

  ngOnInit(): void {
    this.open.set(this.depth < 1);
  }
}
