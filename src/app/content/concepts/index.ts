import { Concept } from '../../core/models/roadmap.model';
import { SECTION_01 } from './section-01';
import { SECTION_02 } from './section-02';
import { SECTION_03 } from './section-03';
import { SECTION_04 } from './section-04';
import { SECTION_05 } from './section-05';
import { SECTION_06 } from './section-06';
import { SECTION_07 } from './section-07';
import { SECTION_08 } from './section-08';
import { SECTION_09 } from './section-09';
import { SECTION_10 } from './section-10';
import { SECTION_11 } from './section-11';

/**
 * All authored concept content, keyed by the dotted roadmap number
 * (e.g. "1.1.1"). Any leaf without an entry here renders a "content in
 * progress" page that still shows its Mortar mapping hint.
 */
export const CONCEPTS: Record<string, Concept> = {
  ...SECTION_01,
  ...SECTION_02,
  ...SECTION_03,
  ...SECTION_04,
  ...SECTION_05,
  ...SECTION_06,
  ...SECTION_07,
  ...SECTION_08,
  ...SECTION_09,
  ...SECTION_10,
  ...SECTION_11,
};
