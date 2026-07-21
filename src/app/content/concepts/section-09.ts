import { Concept } from '../../core/models/roadmap.model';

/** Section 9 — Databases, Caching & Performance. */
export const SECTION_09: Record<string, Concept> = {
  '9.1.1': {
    summary: 'ACID = Atomicity, Consistency, Isolation, Durability — reliable transactions වල guarantees.',
    sinhala: [
      {
        heading: 'Transaction guarantees',
        body: '`Atomicity` — all-or-nothing. `Consistency` — valid state → valid state (constraints hold). `Isolation` — concurrent transactions එකිනෙකට interfere වෙන්නෙ නෑ (9.1.2). `Durability` — commit වුනාට පස්සේ crash එකකදීත් data safe. Relational DBs මේ guarantee කරනවා — financial/critical data වලට වැදගත්.',
      },
    ],
    analogy: 'Bank transaction එකක් වගේ — debit+credit දෙකම (atomic), balance valid (consistent), එකවර වෙන transactions clash නෑ (isolated), power cut වුනත් saved (durable).',
    code: [
      {
        filename: 'acid.txt',
        language: 'plaintext',
        code: `A - Atomicity:   all steps commit, or none do
C - Consistency: constraints/invariants always valid
I - Isolation:   concurrent txns don't corrupt each other
D - Durability:  committed data survives crashes`,
        note: '@Transactional (7.4.7) gives you ACID on relational DBs.',
      },
    ],
    mortar:
      'Mortar sales resolution (7.4.7) ACID guarantees — customer+product+sale link atomic + durable. Trustworthy sales history (PROJECT_IDEA 2.3), billing/invoicing (10.3) require ACID. Analytics eventual-consistency OK, money නෙවෙයි.',
    keyPoints: ['Atomicity/Consistency/Isolation/Durability.', 'Relational DBs guarantee ACID.', 'Critical (money/identity) data needs it.'],
  },

  '9.1.2': {
    summary: 'Isolation levels: Read Uncommitted → Read Committed → Repeatable Read → Serializable (consistency ↑, concurrency ↓).',
    sinhala: [
      {
        heading: 'Concurrency trade-off',
        body: 'Isolation level එක concurrent transactions කොහොම interact වෙනවද control කරනවා — anomalies (dirty read, non-repeatable read, phantom read) vs performance. `Read Uncommitted` (dirty reads), `Read Committed` (default many DBs), `Repeatable Read`, `Serializable` (strictest, lowest concurrency). Higher = safer ඒත් slower.',
      },
    ],
    analogy: 'Shared document editing permissions වගේ — loose (fast, ඒත් clashes පේනවා) සිට strict (safe, ඒත් එකවර එක්කෙනා).',
    code: [
      {
        filename: 'Isolation.java',
        language: 'java',
        code: `@Transactional(isolation = Isolation.REPEATABLE_READ)
void computeInvoice(String brandId) {
    // consistent snapshot: same rows read twice give same result
}

// anomalies by level:
// Read Uncommitted -> dirty reads
// Read Committed   -> non-repeatable reads possible
// Repeatable Read  -> phantoms possible
// Serializable     -> none (but least concurrency)`,
        note: 'Pick the lowest level that\'s still correct.',
      },
    ],
    mortar:
      'Mortar analytics reads Read Committed (throughput). Billing/invoice computation Repeatable Read/Serializable (correctness over speed). Right level per workload — over-strict everywhere = throughput මරනවා.',
    keyPoints: ['4 levels: consistency ↑ vs concurrency ↓.', 'Read Committed = common default.', 'Lowest correct level for the workload.'],
  },

  '9.1.3': {
    summary: 'Indexing = query lookups fast කරන data structures (B-Tree, Hash, Composite) — reads fast, writes slower.',
    sinhala: [
      {
        heading: 'Faster lookups',
        body: 'Index එකක් නැත්නම් DB full table scan (O(n)). Index (`B-Tree` — ranges/sorting, most common; `Hash` — exact match; `Composite` — multiple columns) lookups O(log n). Trade-off: writes/storage overhead (index maintain කරන්න ඕන). Query patterns අනුව indexes design කරන්න.',
      },
    ],
    analogy: 'පොතක index එකක් වගේ — හැම page එකම කියවනවා වෙනුවට (full scan), index එකෙන් කෙලින්ම page එකට.',
    code: [
      {
        filename: 'indexes.sql',
        language: 'sql',
        code: `-- single-column: fast email lookup (identity resolution)
CREATE INDEX idx_customers_email ON customers(email);

-- composite: fast filter+sort (customer grid by brand, spend)
CREATE INDEX idx_cust_brand_spend ON customers(brand_id, total_spend DESC);

-- column order matters: leftmost prefix must match the query`,
        note: 'Composite index column order = query pattern.',
      },
    ],
    mortar:
      'Mortar customer grid (millions of rows) filter/sort/search — proper indexes නැත්නම් every query full scan (unusable). `email` index (identity lookup), composite `(brand_id, spend)` (grid). Query optimization (9.1.4) එකෙන් verify.',
    keyPoints: ['B-Tree (ranges) / Hash (exact) / Composite (multi-col).', 'Reads fast, writes/storage cost.', 'Design indexes to match query patterns.'],
  },

  '9.1.4': {
    summary: 'Query optimization + EXPLAIN = query එකක් DB කොහොම execute කරනවද බලලා slow queries tune කරනවා.',
    sinhala: [
      {
        heading: 'Read the plan',
        body: '`EXPLAIN`/`EXPLAIN ANALYZE` query එකේ execution plan (scans, joins, index usage, row estimates, cost) පෙන්නනවා. "Seq Scan" on large table = missing index. Optimize: indexes add, query rewrite, joins reduce, `SELECT *` avoid, pagination. Measure — guess කරන්න එපා.',
      },
    ],
    analogy: 'GPS route එකක් වගේ — DB කුමන පාරෙන් යනවද (plan) බලලා, traffic (slow scan) තියෙන පාර වෙනස් කරනවා.',
    code: [
      {
        filename: 'explain.sql',
        language: 'sql',
        code: `EXPLAIN ANALYZE
SELECT * FROM customers
WHERE brand_id = 42 AND total_spend > 1000
ORDER BY total_spend DESC;

-- BAD:  Seq Scan on customers (cost=... rows=2000000)
-- GOOD: Index Scan using idx_cust_brand_spend`,
        note: 'Seq Scan on big table → add/fix an index.',
      },
    ],
    mortar:
      'Mortar slow customer-grid / analytics queries `EXPLAIN ANALYZE` — Seq Scans detect කරලා indexes (9.1.3) add / queries rewrite. Millions of rows වලදී this is the difference between instant and timeout. Query optimization = core performance work.',
    keyPoints: ['EXPLAIN ANALYZE shows the execution plan.', 'Seq Scan on big tables = red flag.', 'Measure, then index/rewrite.'],
  },

  '9.1.5': {
    summary: 'Sharding (split data across DBs) vs Partitioning (split within a DB) vs Replication (copies for reads/HA).',
    sinhala: [
      {
        heading: 'Scale strategies',
        body: '`Replication` — same data copies කිහිපයක් (read scaling, HA/failover; writes primary එකට). `Partitioning` — එකම DB එකේ table එකක් pieces වලට (by date/range/hash — manageable, faster scans). `Sharding` — data servers කිහිපයක් අතර horizontal split (write scaling, huge data — ඒත් cross-shard queries අමාරු).',
      },
    ],
    analogy: 'Replication = පොතේ copies ගොඩක් (හැමෝටම කියවන්න). Partitioning = එක පොත chapters වලට. Sharding = library branches කිහිපයක් අතර පොත් බෙදනවා.',
    code: [
      {
        filename: 'scaling.txt',
        language: 'plaintext',
        code: `Replication:   [primary] --> [replica1][replica2]   (read scale + HA)
Partitioning:  customers_2024 | customers_2025 | ...   (one DB, split table)
Sharding:      brand 1-1000 -> shard A | 1001-2000 -> shard B (write scale)`,
        note: 'Reads/HA → replication; huge writes → sharding.',
      },
    ],
    mortar:
      'Mortar "millions of records" (PROJECT_IDEA identity resolution) — read replicas for heavy analytics, table partitioning by date/brand for manageable scans, sharding by tenant/brand at extreme scale. Choose per bottleneck (read vs write vs size).',
    keyPoints: ['Replication = read scale + HA.', 'Partitioning = split within one DB.', 'Sharding = write/size scale across DBs (complex).'],
  },

  '9.2.1': {
    summary: 'NoSQL types: Key-Value, Document, Column-Family, Graph — each for different data shapes.',
    sinhala: [
      {
        heading: 'NoSQL families',
        body: '`Key-Value` (Redis, DynamoDB) — simple, fast lookups/cache. `Document` (MongoDB) — flexible JSON documents, evolving schema. `Column-Family` (Cassandra) — huge write throughput, time-series. `Graph` (Neo4j) — relationships/connections (social, recommendations). Data shape + access pattern අනුව තෝරනවා — "right tool".',
      },
    ],
    analogy: 'වෙන වෙන storage containers — dictionary (key-value), folders of forms (document), spreadsheets (column), mind-map (graph).',
    code: [
      {
        filename: 'nosql.txt',
        language: 'plaintext',
        code: `Key-Value    (Redis)     -> session, cache, counters
Document     (MongoDB)   -> flexible profiles, event logs
Column-Family(Cassandra)-> high-write time-series, huge scale
Graph        (Neo4j)     -> identity links, recommendations`,
        note: 'Match store type to data shape + access pattern.',
      },
    ],
    mortar:
      'Mortar polyglot persistence: Postgres (transactional golden records), Redis key-value (recommendations cache, sessions), document store (flexible event/enrichment data), graph (identity resolution links — "A matches B matches C" transitive merging, PROJECT_IDEA 2.1). Right store per job.',
    keyPoints: ['Key-Value / Document / Column-Family / Graph.', 'Choose by data shape + access pattern.', 'Polyglot persistence is normal.'],
  },

  '9.2.2': {
    summary: 'CAP theorem = distributed system එකකට Consistency, Availability, Partition-tolerance තුනෙන් දෙකයි. PACELC extends it.',
    sinhala: [
      {
        heading: 'CAP + PACELC',
        body: 'Network partition (P) එකකදී — `Consistency` (හැමෝටම latest data, නැත්නම් error) හෝ `Availability` (always respond, stale වෙන්න පුළුවන්) එකයි තෝරන්න පුළුවන් (CP vs AP). Partitions inevitable නිසා practical choice = CP or AP. `PACELC` — partition නැති වෙලාවෙත් (Else) Latency vs Consistency trade-off තියෙනවා කියලා add කරනවා.',
      },
    ],
    analogy: 'Phone lines කැඩුනොත් — හරි answer එනකම් wait (consistency) හෝ පරණ answer එකක් වහාම (availability). දෙකම එකවර බෑ.',
    code: [
      {
        filename: 'cap.txt',
        language: 'plaintext',
        code: `During a Partition, choose:
  CP -> Consistency (reject/wait)   e.g. strong-consistency DBs
  AP -> Availability (serve stale)  e.g. Cassandra, DynamoDB

PACELC: Else (no partition) -> Latency vs Consistency tradeoff`,
        note: 'Partitions are inevitable → design for CP or AP.',
      },
    ],
    mortar:
      'Mortar analytics/recommendations AP (availability + eventual consistency — slightly stale scores OK, always responsive). Billing/identity CP (correctness first). CAP awareness drives per-subsystem DB + consistency choices.',
    keyPoints: ['Partition → Consistency OR Availability (CP/AP).', 'Partitions inevitable — pick CP or AP.', 'PACELC adds latency/consistency when healthy.'],
  },

  '9.2.3': {
    summary: 'MongoDB (flexible documents), Cassandra (huge writes), DynamoDB (managed key-value) — usage scenarios.',
    sinhala: [
      {
        heading: 'When to use which',
        body: '`MongoDB` — evolving/nested schemas, content, flexible queries (document). `Cassandra` — massive write throughput, time-series, multi-datacenter, AP (column-family). `DynamoDB` — fully-managed, serverless, predictable low-latency key-value at scale (AWS). Workload (write volume, schema flexibility, ops model) අනුව.',
      },
    ],
    analogy: 'Mongo = flexible filing cabinet. Cassandra = massive write-optimized warehouse. DynamoDB = managed locker service (setup ඕන නෑ).',
    code: [
      {
        filename: 'nosql-choice.txt',
        language: 'plaintext',
        code: `MongoDB   -> flexible customer/event documents, rich queries
Cassandra -> ingest firehose of events, time-series metrics
DynamoDB  -> serverless, auto-scale key-value, low ops`,
        note: 'Write volume + schema + ops model decide.',
      },
    ],
    mortar:
      'Mortar high-volume event ingestion (streaming) → Cassandra-style write scale. Flexible enrichment/asset documents → MongoDB. Serverless low-ops caches/state → DynamoDB. Matches "real-time streaming pipeline" + polyglot design.',
    keyPoints: ['MongoDB = flexible docs; Cassandra = write-heavy/time-series; DynamoDB = managed KV.', 'Pick by write volume + schema + ops.', 'Often used alongside a relational DB.'],
  },

  '9.3.1': {
    summary: 'Redis / Memcached = in-memory caches — hot data serve කරලා DB load අඩු + latency අඩු.',
    sinhala: [
      {
        heading: 'In-memory speed',
        body: 'Frequently-accessed / expensive-to-compute data RAM එකේ cache කරලා microsecond reads. `Redis` — rich data structures (lists, sets, sorted sets, pub/sub), persistence, versatile. `Memcached` — simple, pure cache, multi-threaded. Cache = DB offload + huge latency win, ඒත් invalidation + staleness manage කරන්න ඕන.',
      },
    ],
    analogy: 'Desk එකේ තියෙන frequently-used books (cache) වගේ — library (DB) එකට හැම වතාවෙම යන්නෙ නෑ.',
    code: [
      {
        filename: 'Cache.java',
        language: 'java',
        code: `@Cacheable(value = "recommendations", key = "#customerId")
List<Product> topRecommendations(String customerId) {
    return recEngine.compute(customerId);   // expensive -> cached in Redis
}
// first call computes + stores; subsequent calls hit Redis (fast)`,
        note: 'Cache expensive computations (recommendations).',
      },
    ],
    mortar:
      'Mortar product recommendations, segment counts, session data Redis cached — "Top 10 recommended products" (PROJECT_IDEA 3.3) expensive to compute, cached for instant serving. Live profile counts, dashboards. DB offload + snappy UX.',
    keyPoints: ['In-memory cache = µs reads + DB offload.', 'Redis (rich structures) vs Memcached (simple).', 'Manage invalidation + staleness.'],
  },

  '9.3.2': {
    summary: 'Caching strategies: Cache-Aside, Read-Through, Write-Through, Write-Behind — read/write patterns.',
    sinhala: [
      {
        heading: 'Cache patterns',
        body: '`Cache-Aside` (most common) — app cache check කරලා miss නම් DB, cache populate. `Read-Through` — cache layer එකම DB load කරනවා. `Write-Through` — write cache + DB දෙකටම (consistent, slower writes). `Write-Behind` — cache එකට write, DB async later (fast, ඒත් crash එකකදී data loss risk). Consistency vs performance.',
      },
    ],
    analogy: 'Cache-Aside = shop එකේ නැත්නම් warehouse එකෙන් ගෙනත් shelf එකේ තියනවා. Write-Through = shelf එකයි warehouse එකයි එකපාරම update.',
    code: [
      {
        filename: 'cache-aside.java',
        language: 'java',
        code: `Customer get(String id) {
    Customer c = redis.get(id);          // 1. check cache
    if (c == null) {
        c = repo.findById(id);           // 2. miss -> DB
        redis.set(id, c, Duration.ofMinutes(10)); // 3. populate + TTL
    }
    return c;
}`,
        note: 'Cache-Aside: check → miss → load → populate (TTL).',
      },
    ],
    mortar:
      'Mortar reads (customers, recommendations) Cache-Aside + TTL. Critical writes Write-Through (cache+DB consistent). High-volume metrics Write-Behind (fast, tolerate slight loss). Pattern per data criticality + read/write mix.',
    keyPoints: ['Cache-Aside (common) / Read-Through / Write-Through / Write-Behind.', 'Write-Through = consistent/slower; Write-Behind = fast/riskier.', 'TTLs manage staleness.'],
  },

  '9.3.3': {
    summary: 'Eviction policies: LRU (least recently used), LFU (least frequently used) — cache full නම් මොනවද අයින් කරන්නේ.',
    sinhala: [
      {
        heading: 'What to evict',
        body: 'Cache memory bounded — full වුනොත් අලුත් entry එකකට තැන් හදන්න පරණ එකක් evict කරන්නම ඕන. `LRU` — most recently used තියාගෙන, දිගු කාලයක් touch නොකළ එක අයින් (temporal locality). `LFU` — least frequently accessed අයින් (popularity). `TTL` — time-based expiry. Access pattern අනුව policy.',
      },
    ],
    analogy: 'LRU = දිගු කාලයක් අඳින්නෙ නැති ඇඳුම් අයින් කරනවා. LFU = කලාතුරකින් අඳින ඇඳුම් අයින්.',
    code: [
      {
        filename: 'eviction.java',
        language: 'java',
        code: `// bounded LRU cache (e.g. Caffeine)
Cache<String, List<Product>> recs = Caffeine.newBuilder()
    .maximumSize(100_000)                 // bound
    .expireAfterWrite(Duration.ofHours(1)) // TTL
    .build();                             // LRU-style eviction when full`,
        note: 'Bound size + TTL + eviction = no unbounded growth (4.2.4).',
      },
    ],
    mortar:
      'Mortar recommendation/segment caches bounded + LRU + TTL — hot customers cached, cold ones evicted, memory bounded (prevents the leak in 4.2.4). LFU for popularity-skewed data (hot products). Sustainable caching at scale.',
    keyPoints: ['LRU (recency) / LFU (frequency) / TTL (time).', 'Bounded size prevents memory leaks.', 'Policy matches access pattern.'],
  },
};
