import { Injectable, signal } from '@angular/core';

const DONE_KEY = 'jcs.completed.v1';
const LAST_KEY = 'jcs.last.v1';

/**
 * Tracks learner progress in localStorage: which concept slugs are marked
 * complete, and the last-visited slug (for "resume where you left off").
 * Exposed as a signal so the UI updates reactively.
 */
@Injectable({ providedIn: 'root' })
export class ProgressService {
  private readonly _completed = signal<Set<string>>(this.load());
  readonly completed = this._completed.asReadonly();

  private load(): Set<string> {
    try {
      const raw = localStorage.getItem(DONE_KEY);
      return new Set<string>(raw ? JSON.parse(raw) : []);
    } catch {
      return new Set<string>();
    }
  }

  private persist(set: Set<string>): void {
    try {
      localStorage.setItem(DONE_KEY, JSON.stringify([...set]));
    } catch {
      /* storage unavailable — ignore */
    }
  }

  isComplete(slug: string): boolean {
    return this._completed().has(slug);
  }

  toggle(slug: string): void {
    const next = new Set(this._completed());
    next.has(slug) ? next.delete(slug) : next.add(slug);
    this._completed.set(next);
    this.persist(next);
  }

  setComplete(slug: string, done: boolean): void {
    const next = new Set(this._completed());
    done ? next.add(slug) : next.delete(slug);
    this._completed.set(next);
    this.persist(next);
  }

  /** Fraction (0..1) of the given slugs that are complete. */
  ratio(slugs: string[]): number {
    if (!slugs.length) return 0;
    const done = slugs.filter((s) => this._completed().has(s)).length;
    return done / slugs.length;
  }

  countDone(slugs: string[]): number {
    return slugs.filter((s) => this._completed().has(s)).length;
  }

  setLast(slug: string): void {
    try {
      localStorage.setItem(LAST_KEY, slug);
    } catch {
      /* ignore */
    }
  }

  getLast(): string | null {
    try {
      return localStorage.getItem(LAST_KEY);
    } catch {
      return null;
    }
  }
}
