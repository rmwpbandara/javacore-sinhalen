import { Component, Input, signal } from '@angular/core';
import { HighlightDirective } from '../directives/highlight.directive';
import { CodeExample } from '../../core/models/roadmap.model';

/** A single code example: filename tab, language chip, copy button, highlighted body. */
@Component({
  selector: 'jcs-code-block',
  standalone: true,
  imports: [HighlightDirective],
  template: `
    <figure class="code">
      <figcaption class="code__bar">
        <span class="code__dots"><i></i><i></i><i></i></span>
        <span class="code__file">{{ example.filename }}</span>
        <span class="code__lang">{{ example.language }}</span>
        <button class="code__copy" type="button" (click)="copy()">
          {{ copied() ? '✓ Copied' : 'Copy' }}
        </button>
      </figcaption>
      <pre class="code__pre"><code [jcsHighlight]="example.language" [code]="example.code"></code></pre>
      @if (example.note) {
        <figcaption class="code__note">💡 {{ example.note }}</figcaption>
      }
    </figure>
  `,
})
export class CodeBlockComponent {
  @Input({ required: true }) example!: CodeExample;
  copied = signal(false);

  async copy(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.example.code);
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 1500);
    } catch {
      /* clipboard blocked — ignore */
    }
  }
}
