import { Directive, ElementRef, Input, OnChanges } from '@angular/core';
import hljs from 'highlight.js/lib/core';
import java from 'highlight.js/lib/languages/java';
import xml from 'highlight.js/lib/languages/xml';
import sql from 'highlight.js/lib/languages/sql';
import yaml from 'highlight.js/lib/languages/yaml';
import bash from 'highlight.js/lib/languages/bash';
import json from 'highlight.js/lib/languages/json';

hljs.registerLanguage('java', java);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('sql', sql);
hljs.registerLanguage('yaml', yaml);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('json', json);

/**
 * Highlights the host element's text as source code. Usage:
 * `<code [jcsHighlight]="'java'">...source...</code>`
 */
@Directive({ selector: '[jcsHighlight]', standalone: true })
export class HighlightDirective implements OnChanges {
  @Input('jcsHighlight') language = 'java';
  @Input() code = '';

  constructor(private el: ElementRef<HTMLElement>) {}

  ngOnChanges(): void {
    const lang = hljs.getLanguage(this.language) ? this.language : 'plaintext';
    const source = this.code || this.el.nativeElement.textContent || '';
    const result = hljs.highlight(source, { language: lang });
    this.el.nativeElement.innerHTML = result.value;
  }
}
