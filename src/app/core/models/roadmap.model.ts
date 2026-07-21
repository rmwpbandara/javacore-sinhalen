/**
 * Data model for the JavaCore Sinhalen learning roadmap.
 *
 * The whole site is driven by a single tree of `RoadmapNode`s that mirrors the
 * nested numbering of `java_springboot_roadmap.md` (section -> topic -> subtopic
 * -> concept). Leaf nodes carry a `slug` (making them routable) and a `Concept`
 * with the actual bilingual learning content.
 */

/** A single ordered explanation block, written in Sinhala + English (Singlish). */
export interface SinhalaBlock {
  /** Short English heading for the block (kept English per requirements). */
  heading: string;
  /** The explanation body. Sinhala with English technical words mixed in. */
  body: string;
}

/** A syntax-highlighted code example shown on a concept page. */
export interface CodeExample {
  /** File name shown on the code tab, e.g. `Customer.java`. */
  filename: string;
  /** highlight.js language id: 'java' | 'xml' | 'sql' | 'yaml' | 'bash' ... */
  language: string;
  /** The raw source code. */
  code: string;
  /** Optional short Singlish note under the code. */
  note?: string;
}

/** The full bilingual learning content for one leaf concept. */
export interface Concept {
  /** 1-2 line Singlish intro shown right under the title. */
  summary: string;
  /** Ordered Sinhala explanation blocks. */
  sinhala: SinhalaBlock[];
  /** Optional everyday Sinhala analogy to anchor intuition. */
  analogy?: string;
  /** One or more code examples. */
  code: CodeExample[];
  /** How this concept is used to build the Mortar platform (the story). */
  mortar: string;
  /** Singlish bullet takeaways. */
  keyPoints: string[];
  /** Common mistakes / interview traps (optional). */
  pitfalls?: string[];
}

/** A node in the roadmap tree. Branch nodes group; leaf nodes teach. */
export interface RoadmapNode {
  /** Dotted number, e.g. "1.2.3". Drives the tree + level badges. */
  number: string;
  /** English title (used in nav + as the page heading). */
  title: string;
  /** URL slug — present only on leaf (teachable) nodes. */
  slug?: string;
  /** Child nodes for branch nodes. */
  children?: RoadmapNode[];
  /** Learning content — present only on leaf nodes. */
  concept?: Concept;
}

/** Flattened leaf used for prev/next navigation and search. */
export interface FlatLeaf {
  number: string;
  title: string;
  slug: string;
  /** Titles of ancestor nodes, from section down to parent. */
  breadcrumb: string[];
  /** Top-level section number, e.g. "1". */
  sectionNumber: string;
}
