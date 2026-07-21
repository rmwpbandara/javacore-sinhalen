import { Injectable } from '@angular/core';
import { FlatLeaf, RoadmapNode } from '../models/roadmap.model';
import { ROADMAP_TREE } from '../../content/tree';
import { CONCEPTS } from '../../content/concepts';

/** Kebab-case slug from a roadmap number + title, e.g. "1.1.1", "Classes" -> "1-1-1-classes". */
function slugify(number: string, title: string): string {
  const clean = (s: string) =>
    s
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  return `${number.replace(/\./g, '-')}-${clean(title)}`;
}

/**
 * Central content store. Builds the roadmap tree once: attaches authored
 * concepts (keyed by dotted number), generates stable slugs on leaves, and
 * flattens leaves in roadmap order for prev/next navigation and search.
 */
@Injectable({ providedIn: 'root' })
export class ContentService {
  readonly tree: RoadmapNode[];
  readonly leaves: FlatLeaf[] = [];

  private readonly bySlug = new Map<string, RoadmapNode>();
  private readonly leafIndexBySlug = new Map<string, number>();

  constructor() {
    this.tree = ROADMAP_TREE;
    this.build(this.tree, []);
  }

  /** Walk the tree: attach concepts, set slugs on leaves, collect flat order. */
  private build(nodes: RoadmapNode[], ancestors: RoadmapNode[]): void {
    for (const node of nodes) {
      const isLeaf = !node.children || node.children.length === 0;
      if (isLeaf) {
        node.slug = slugify(node.number, node.title);
        node.concept = CONCEPTS[node.number];
        this.bySlug.set(node.slug, node);
        this.leafIndexBySlug.set(node.slug, this.leaves.length);
        this.leaves.push({
          number: node.number,
          title: node.title,
          slug: node.slug,
          breadcrumb: ancestors.map((a) => a.title),
          sectionNumber: node.number.split('.')[0],
        });
      } else {
        this.build(node.children!, [...ancestors, node]);
      }
    }
  }

  getBySlug(slug: string): RoadmapNode | undefined {
    return this.bySlug.get(slug);
  }

  breadcrumbFor(slug: string): string[] {
    const idx = this.leafIndexBySlug.get(slug);
    return idx == null ? [] : this.leaves[idx].breadcrumb;
  }

  /** Previous / next leaf in roadmap order (for page navigation). */
  siblings(slug: string): { prev?: FlatLeaf; next?: FlatLeaf } {
    const idx = this.leafIndexBySlug.get(slug);
    if (idx == null) return {};
    return {
      prev: idx > 0 ? this.leaves[idx - 1] : undefined,
      next: idx < this.leaves.length - 1 ? this.leaves[idx + 1] : undefined,
    };
  }

  /** The 11 top-level sections. */
  get sections(): RoadmapNode[] {
    return this.tree;
  }

  /** Count leaves under a node (for section progress + stats). */
  countLeaves(node: RoadmapNode): number {
    if (!node.children || node.children.length === 0) return 1;
    return node.children.reduce((sum, c) => sum + this.countLeaves(c), 0);
  }

  /** All leaf slugs under a node (used for section progress). */
  leafSlugsUnder(node: RoadmapNode): string[] {
    if (!node.children || node.children.length === 0) {
      return node.slug ? [node.slug] : [];
    }
    return node.children.flatMap((c) => this.leafSlugsUnder(c));
  }

  /** Simple case-insensitive search over leaf titles + numbers + breadcrumb. */
  search(query: string): FlatLeaf[] {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return this.leaves.filter(
      (l) =>
        l.title.toLowerCase().includes(q) ||
        l.number.includes(q) ||
        l.breadcrumb.some((b) => b.toLowerCase().includes(q)),
    );
  }

  /** How many leaves have authored content (for a global progress stat). */
  get authoredCount(): number {
    return this.leaves.filter((l) => this.bySlug.get(l.slug)?.concept).length;
  }

  get totalCount(): number {
    return this.leaves.length;
  }
}
