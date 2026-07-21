import { Concept } from '../../core/models/roadmap.model';

/**
 * Section 2 — Advanced Java Concepts.
 * Singlish explanations, tied to building the Mortar CDP.
 */
export const SECTION_02: Record<string, Concept> = {
  '2.1.1': {
    summary:
      'Checked exceptions compile-time එකේ handle කරන්නම ඕන; Unchecked (RuntimeException) optional.',
    sinhala: [
      {
        heading: 'දෙකේ වෙනස',
        body: 'Checked exceptions (`IOException`, `SQLException`) compiler එකෙන් enforce කරනවා — `try-catch` හෝ `throws` කරන්නම ඕන. සාමාන්‍යයෙන් recoverable, external problems (network, file). Unchecked exceptions (`RuntimeException` subclasses: `NullPointerException`, `IllegalArgumentException`) compiler එකෙන් enforce කරන්නෙ නෑ — බොහෝවිට programming bugs.',
      },
    ],
    analogy:
      'Checked = "umbrella අරන් යන්න" කියලා කලින් warn කරන වැස්සක්. Unchecked = හදිසියෙ පය පැටලෙන එක — කලින් declare කරන්නෙ නෑ.',
    code: [
      {
        filename: 'Exceptions.java',
        language: 'java',
        code: `// checked: must declare or catch
List<Customer> fetch(String url) throws IOException {
    // network call can fail -> recoverable
    return httpClient.get(url);
}

// unchecked: no declaration needed (usually a bug)
double avg(int total, int count) {
    if (count == 0) throw new IllegalArgumentException("count=0");
    return (double) total / count;
}`,
        note: 'Recoverable external failures → checked; programmer errors → unchecked.',
      },
    ],
    mortar:
      'Mortar connector එකක් Shopify API එක call කරනකොට network fail වෙන්න පුළුවන් — `IOException` (checked), retry කරන්න පුළුවන්. Internal validation fail වුනොත් (බඩු config එකක් වැරදි) `IllegalArgumentException` (unchecked) — bug එකක්, fix කරන්න ඕන.',
    keyPoints: [
      'Checked = compiler enforced, recoverable external issues.',
      'Unchecked = RuntimeException, usually bugs, no enforcement.',
      'Over-using checked exceptions = noisy code; balance කරන්න.',
    ],
  },

  '2.1.2': {
    summary:
      'try-catch-finally: try එකේ risky code, catch එකේ handle, finally හැමවිටම run (cleanup).',
    sinhala: [
      {
        heading: 'Flow එක',
        body: '`try` block එකේ exception එකක් ආවොත්, matching `catch` එකට යනවා. `finally` block එක exception එකක් ආවත් නැතත්, `return` කලත් හැමවිටම run වෙනවා — resources close කරන්න වගේ cleanup වලට. Multiple catch blocks specific → general order එකෙන් ලියන්න ඕන.',
      },
    ],
    analogy:
      'Kitchen එකේ ඉවුම: try = උයනවා, catch = පිච්චුනොත් handle කරනවා, finally = ඕන දේ වුනත් gas එක off කරනවා.',
    code: [
      {
        filename: 'TryCatch.java',
        language: 'java',
        code: `Connection conn = null;
try {
    conn = pool.getConnection();
    conn.sync();
} catch (IOException e) {
    log.error("sync failed", e);       // specific handling
} catch (Exception e) {
    log.error("unexpected", e);        // general last
} finally {
    if (conn != null) conn.close();    // always runs (cleanup)
}`,
        note: 'finally = guaranteed cleanup (connection leak avoid).',
      },
    ],
    mortar:
      'Mortar sync jobs DB connections/HTTP streams open කරනවා. `finally` වලින් (හෝ try-with-resources) ඒවා හැමවිටම close වෙනවා — connection leaks නැතුව millions of records safely process කරන්න.',
    keyPoints: [
      'finally = හැමවිටම run (cleanup guarantee).',
      'catch blocks specific → general order.',
      'finally එකේ `return` දැම්මොත් try එකේ return එක override වෙනවා — avoid.',
    ],
  },

  '2.1.3': {
    summary:
      'throw = exception එකක් actually විසි කරනවා; throws = method එකක් exception එකක් throw කරන්න පුළුවන් කියලා declare කරනවා.',
    sinhala: [
      {
        heading: 'Verb vs declaration',
        body: '`throw` කියන්නේ statement එකක් — actual exception object එකක් විසි කරනවා (`throw new X()`). `throws` කියන්නේ method signature එකේ clause එකක් — "මේ method එකෙන් මේ checked exceptions එන්න පුළුවන්" කියලා caller ට කියනවා.',
      },
    ],
    analogy:
      'throws = "මේ පාරේ ගල් වැටෙන්න පුළුවන්" warning board එක. throw = ඇත්තටම ගලක් වැටෙන එක.',
    code: [
      {
        filename: 'ThrowThrows.java',
        language: 'java',
        code: `// 'throws' declares; 'throw' actually raises
Customer load(String id) throws NotFoundException {
    Customer c = repo.find(id);
    if (c == null) throw new NotFoundException(id); // raise
    return c;
}`,
        note: 'throws = declaration, throw = action.',
      },
    ],
    mortar:
      'Mortar repository method එකක් `throws NotFoundException` declare කරලා, customer නැත්නම් `throw new NotFoundException(id)` කරනවා. Caller දන්නවා මේක handle කරන්න ඕන කියලා — API contract එක පැහැදිලියි.',
    keyPoints: [
      'throw = raise an exception (statement).',
      'throws = declare possible checked exceptions (signature).',
      'One method can `throws` many, but each `throw` raises one.',
    ],
  },

  '2.1.4': {
    summary:
      'Custom exceptions = domain-specific errors represent කරන්න තමන්ගේ exception classes හදන එක.',
    sinhala: [
      {
        heading: 'ඇයි custom?',
        body: 'Generic `Exception` වෙනුවට domain-specific exception එකක් (`ConnectorAuthException`) හැදුවම — code එක readable, error handling precise, extra context (fields) carry කරන්න පුළුවන්. `Exception` extend කලොත් checked; `RuntimeException` extend කලොත් unchecked.',
      },
    ],
    analogy:
      '"Error 1" කියනවා වෙනුවට "Shopify token expired" කියන specific message එකක් වගේ — problem එක වහාම තේරෙනවා.',
    code: [
      {
        filename: 'ConnectorAuthException.java',
        language: 'java',
        code: `public class ConnectorAuthException extends RuntimeException {
    private final String platform;

    public ConnectorAuthException(String platform, String msg) {
        super(msg);
        this.platform = platform;   // extra context
    }
    public String getPlatform() { return platform; }
}

// usage
throw new ConnectorAuthException("shopify", "OAuth token expired");`,
        note: 'Extra field (platform) එකෙන් error context carry කරනවා.',
      },
    ],
    mortar:
      'Mortar එකේ `ConnectorAuthException`, `IdentityResolutionException`, `SyncQuotaException` වගේ custom exceptions — proactive error alerts (10.4) වලට precise, actionable messages දෙනවා. "brand X, platform Shopify, token expired" වගේ.',
    keyPoints: [
      'Domain-specific exceptions = readable + precise handling.',
      'Extend `Exception` (checked) හෝ `RuntimeException` (unchecked).',
      'Extra fields වලින් error context carry කරන්න.',
    ],
  },

  '2.1.5': {
    summary:
      'Try-with-resources = AutoCloseable resources automatic close කරන syntax එකක් (Java 7+).',
    sinhala: [
      {
        heading: 'Auto cleanup',
        body: '`try (Resource r = ...) { }` වලින්, block එක ඉවර වුනාම (exception ආවත්) `r.close()` automatically call වෙනවා. Resource එක `AutoCloseable` implement කරන්නම ඕන. finally boilerplate නැති කරනවා, resource leaks වළක්වනවා.',
      },
    ],
    analogy:
      'Sensor-tap එකක් වගේ — අත ගත්තම automatic වතුර නවතිනවා. Manually off කරන්න ඕන නෑ.',
    code: [
      {
        filename: 'TryWithResources.java',
        language: 'java',
        code: `// stream auto-closes even if an exception occurs
try (var reader = Files.newBufferedReader(uploadPath)) {
    reader.lines().forEach(this::processRow);
} catch (IOException e) {
    log.error("upload read failed", e);
}
// no finally needed - reader.close() called automatically`,
        note: 'AutoCloseable resources block ඉවර වුනාම auto close.',
      },
    ],
    mortar:
      'Mortar CSV upload pipeline එකේ file streams, DB connections try-with-resources වලින් open කරනවා. Huge files process කරනකොට error ආවත් streams leak වෙන්නෙ නෑ — data lake ingestion එක stable.',
    keyPoints: [
      'Resource `AutoCloseable` වෙන්නම ඕන.',
      'Block exit වෙනකොට reverse order එකෙන් close.',
      'finally boilerplate නැති කරලා leaks වළක්වනවා.',
    ],
  },

  '2.2.1': {
    summary:
      'Collections hierarchy: Iterable → Collection → (List, Set, Queue); Map වෙනම tree එකක්.',
    sinhala: [
      {
        heading: 'Structure එක',
        body: '`Iterable` හැම එකේම root — for-each support කරනවා. `Collection` යටතේ `List` (ordered, duplicates OK), `Set` (unique), `Queue` (FIFO/priority). `Map` (key→value) `Collection` extend කරන්නෙ නෑ — වෙනම hierarchy එකක්. හරි interface එක තෝරගැනීම performance + correctness එකට වැදගත්.',
      },
    ],
    analogy:
      'List = numbered queue එකක් (order + duplicates). Set = guest list එකක් (කවුරුත් එක පාරයි). Map = dictionary එකක් (word→meaning).',
    code: [
      {
        filename: 'Hierarchy.java',
        language: 'java',
        code: `List<String> orderIds = new ArrayList<>();     // ordered, duplicates
Set<String>  uniqueEmails = new HashSet<>();   // no duplicates
Queue<Runnable> jobs = new LinkedList<>();     // FIFO processing
Map<String, Customer> byEmail = new HashMap<>(); // key -> value`,
        note: 'Requirement එකට ගැලපෙන interface එක තෝරන්න.',
      },
    ],
    mortar:
      'Mortar: order IDs `List`, dedup emails `Set`, sync jobs `Queue`, email→customer index `Map`. හරි collection එක තෝරගැනීම millions of records වලදී memory + speed එකට තීරණාත්මකයි.',
    keyPoints: [
      'Iterable → Collection → List/Set/Queue.',
      'Map වෙනම hierarchy (key→value).',
      'Interface එකට program කරන්න (`List<>` = new ArrayList).',
    ],
  },

  '2.2.2': {
    summary:
      'ArrayList (random access fast), LinkedList (insert/remove fast), Vector (legacy sync), CopyOnWriteArrayList (concurrent reads).',
    sinhala: [
      {
        heading: 'List implementations',
        body: '`ArrayList` = dynamic array, index access O(1), middle insert O(n) — most common. `LinkedList` = doubly-linked nodes, ends insert/remove O(1), index access O(n). `Vector` = synchronized ArrayList (legacy, slow). `CopyOnWriteArrayList` = write එකකදී array එක copy — many-reads/few-writes concurrent scenarios වලට.',
      },
    ],
    analogy:
      'ArrayList = seat numbers තියෙන cinema එකක් (කෙලින්ම seat එකට යන්න පුළුවන්). LinkedList = train එකක් (bogies එකින් එකට යන්න ඕන, ඒත් bogey එකක් add/remove ලේසි).',
    code: [
      {
        filename: 'Lists.java',
        language: 'java',
        code: `List<Customer> page = new ArrayList<>();        // fast get(i)
Queue<Job> pipeline = new LinkedList<>();       // fast add/remove ends

// read-heavy shared config, rare writes
List<String> activeConnectors = new CopyOnWriteArrayList<>();`,
        note: 'Access pattern එක අනුව implementation එක තෝරන්න.',
      },
    ],
    mortar:
      'Mortar customer grid pagination → `ArrayList` (index access). Sync job pipeline → `LinkedList` (queue). Rarely-changing shared "active connectors" list, many reader threads → `CopyOnWriteArrayList`. Vector අලුතෙන් පාවිච්චි කරන්නෙ නෑ.',
    keyPoints: [
      'ArrayList: fast random access, default choice.',
      'LinkedList: fast end insert/remove, slow index.',
      'CopyOnWriteArrayList: concurrent read-heavy; Vector: legacy.',
    ],
  },

  '2.2.3': {
    summary:
      'HashSet (unordered, fast), LinkedHashSet (insertion order), TreeSet (sorted). Comparable vs Comparator ordering define කරනවා.',
    sinhala: [
      {
        heading: 'Set implementations + ordering',
        body: '`HashSet` fast O(1) but no order. `LinkedHashSet` insertion order තියාගන්නවා. `TreeSet` sorted (red-black tree, O(log n)). Sorting එකට elements `Comparable` (natural order, `compareTo`) වෙන්න ඕන, නැත්නම් `Comparator` (custom order) දෙන්න ඕන.',
      },
    ],
    analogy:
      'HashSet = බෑග් එකකට දාපු unique බඩු (order නෑ). TreeSet = alphabetical order එකට තියපු පොත් රාක්කයක්.',
    code: [
      {
        filename: 'Sets.java',
        language: 'java',
        code: `Set<String> unique = new HashSet<>();                 // fast, no order
Set<String> ordered = new LinkedHashSet<>();          // insertion order

// TreeSet sorted by a Comparator (top spenders first)
Set<Customer> topSpenders = new TreeSet<>(
    Comparator.comparingDouble(Customer::getTotalSpend).reversed());`,
        note: 'TreeSet එකට Comparable elements හෝ Comparator එකක් ඕන.',
      },
    ],
    mortar:
      'Mortar identity resolution වලදී already-seen emails `HashSet` එකේ තියාගෙන duplicates ඉවත් කරනවා. Segment analytics වල top-spenders sorted විදිහට ඕන නම් `TreeSet` + `Comparator`. UI order preserve කරන්න `LinkedHashSet`.',
    keyPoints: [
      'HashSet fast/unordered; LinkedHashSet insertion-order; TreeSet sorted.',
      'Comparable = natural order (compareTo); Comparator = custom.',
      'TreeSet/HashSet elements හරි `equals`/`hashCode`/`compareTo` ඕන.',
    ],
  },

  '2.2.4': {
    summary:
      'HashMap (fast, unordered), LinkedHashMap (order), TreeMap (sorted keys), ConcurrentHashMap (thread-safe).',
    sinhala: [
      {
        heading: 'Map implementations',
        body: '`HashMap` = O(1) average, no order, null key OK, not thread-safe. `LinkedHashMap` = insertion/access order (LRU cache වලට හොඳයි). `TreeMap` = keys sorted, O(log n). `ConcurrentHashMap` = thread-safe, high-concurrency (segment/bucket-level locking), null key/value බෑ.',
      },
    ],
    analogy:
      'HashMap = සාමාන්‍ය dictionary. TreeMap = alphabetical dictionary. ConcurrentHashMap = ගොඩක් අය එකවර පාවිච්චි කරන shared dictionary එකක් (safe).',
    code: [
      {
        filename: 'Maps.java',
        language: 'java',
        code: `Map<String, Customer> index = new HashMap<>();          // fast lookup
Map<String, Integer> recentAccess = new LinkedHashMap<>(); // order/LRU

// shared counter updated by many sync threads
Map<String, Long> counts = new ConcurrentHashMap<>();
counts.merge("shopify", 1L, Long::sum);`,
        note: 'Concurrent updates ඕන නම් ConcurrentHashMap.',
      },
    ],
    mortar:
      'Mortar identity index (email→golden record) = `HashMap` single-thread build එකකදී. Multi-threaded sync counters = `ConcurrentHashMap` (`merge` atomic). Sorted reports (date→metric) = `TreeMap`.',
    keyPoints: [
      'HashMap default; LinkedHashMap ordered/LRU; TreeMap sorted keys.',
      'ConcurrentHashMap = thread-safe, scalable (no full-map lock).',
      'ConcurrentHashMap null key/value allow කරන්නෙ නෑ.',
    ],
  },

  '2.2.5': {
    summary:
      'HashMap internals: hashCode → bucket index; collisions linked-list, Java 8+ එකේ bucket එකක් 8+ වුනොත් balanced tree එකක් වෙනවා (treeification).',
    sinhala: [
      {
        heading: 'ඇතුලෙ වෙන්නේ',
        body: 'Key එකේ `hashCode()` එකෙන් bucket (array slot) index එකක් ගණනය කරනවා. එකම bucket එකට keys කිහිපයක් ආවොත් (collision) — linked list එකක් විදිහට chain වෙනවා. Java 8 වලින්, bucket එකක nodes 8+ (සහ capacity ≥64) වුනොත් ඒක red-black tree එකක් වෙනවා (O(n) → O(log n)). හරි `hashCode`/`equals` නැත්නම් lookups කැඩෙනවා.',
      },
    ],
    analogy:
      'ලොකු library එකක shelves (buckets). හැම පොතක්ම hashCode අනුව හරි shelf එකට. එකම shelf එකේ පොත් ගොඩක් වුනොත් — index කරපු sub-catalog එකක් (tree) හදනවා, ඉක්මනට හොයන්න.',
    code: [
      {
        filename: 'HashMapInternals.java',
        language: 'java',
        code: `// equals + hashCode MUST agree for correct bucketing
class Customer {
    private final String email;
    Customer(String email) { this.email = email; }

    @Override public boolean equals(Object o) {
        return o instanceof Customer c && email.equals(c.email);
    }
    @Override public int hashCode() { return email.hashCode(); }
}

Map<Customer, Integer> spend = new HashMap<>();
spend.put(new Customer("a@x.com"), 100);
spend.get(new Customer("a@x.com")); // 100 - found via hashCode+equals`,
        note: 'equals true නම් hashCode සමාන වෙන්නම ඕන — නැත්නම් map break.',
      },
    ],
    mortar:
      'Mortar identity resolution හදන email→golden-record `HashMap` එකේ key එක Customer/email. Custom `equals`/`hashCode` හරි නැත්නම් duplicate customers "not found" වෙලා dedup break වෙනවා — මේ internal knowledge එක එතනදී තීරණාත්මකයි.',
    keyPoints: [
      'hashCode → bucket; collision → chain; Java 8 treeify (8+ nodes).',
      'equals true ⇒ hashCode සමාන (contract).',
      'Poor hashCode = all one bucket = O(n) lookups.',
    ],
    pitfalls: [
      'Mutable key එකක field එක put කලාට පස්සේ වෙනස් කලොත් — key එක "නැති" වෙනවා.',
    ],
  },

  '2.2.6': {
    summary:
      'Fail-fast iterators (ArrayList/HashMap) modification එකකදී ConcurrentModificationException; fail-safe (CopyOnWrite/Concurrent) snapshot එකක් මත වැඩ කරනවා.',
    sinhala: [
      {
        heading: 'දෙකේ හැසිරීම',
        body: 'Fail-fast iterators collection එක iterate කරනකොට structurally modify වුනොත් (add/remove) වහාම `ConcurrentModificationException` විසි කරනවා (modCount check). Fail-safe iterators underlying data එකේ copy/snapshot එකක් මත වැඩ කරන නිසා exception එකක් නෑ, ඒත් latest changes පේන්නෙ නෑ.',
      },
    ],
    analogy:
      'Fail-fast = කවුරු හරි ඔයා ගණන් කරන ලැයිස්තුව මැද්දෙ වෙනස් කලොත් "නවත්තන්න!" කියලා error එකක්. Fail-safe = ලැයිස්තුවේ photocopy එකක් අරන් ගණන් කරනවා (වෙනස්කම් නොපෙනී).',
    code: [
      {
        filename: 'Iterators.java',
        language: 'java',
        code: `List<String> ids = new ArrayList<>(List.of("a", "b", "c"));

// fail-fast:  ConcurrentModificationException
// for (String id : ids) if (id.equals("b")) ids.remove(id);

// correct: use iterator.remove()
Iterator<String> it = ids.iterator();
while (it.hasNext()) if (it.next().equals("b")) it.remove();`,
        note: 'Loop එකේදී remove කරන්න iterator.remove() පාවිච්චි කරන්න.',
      },
    ],
    mortar:
      'Mortar sync scheduler එකක් active-jobs list එක iterate කරනකොට වෙන thread එකක් job එකක් add කලොත් fail-fast crash එකක්. ඒ නිසා shared, concurrently-modified collections වලට `ConcurrentHashMap`/`CopyOnWriteArrayList` (fail-safe) පාවිච්චි කරනවා.',
    keyPoints: [
      'Fail-fast = modCount check → CME (ArrayList, HashMap).',
      'Fail-safe = snapshot/copy → no CME (Concurrent, CopyOnWrite).',
      'Loop-modify එකට `iterator.remove()` හෝ concurrent collections.',
    ],
  },

  '2.3.1': {
    summary:
      'Generics + bounds: `<T extends Number>` (upper bound), `<T super Integer>` — type-safe reusable code.',
    sinhala: [
      {
        heading: 'Bounded type parameters',
        body: 'Generics වලින් compile-time type safety + reuse දෙනවා. `<T extends Number>` කියන්නේ T එක Number හෝ subclass එකක් වෙන්නම ඕන — ඒ නිසා T මත Number methods call කරන්න පුළුවන්. `extends` = upper bound (this type or below), `super` = lower bound (this type or above).',
      },
    ],
    analogy:
      '"Number වර්ගයේ දෙයක් විතරයි accept කරන්නේ" කියන bouncer කෙනෙක් වගේ — type එකට boundary එකක්.',
    code: [
      {
        filename: 'Bounds.java',
        language: 'java',
        code: `// T is guaranteed to be a Number -> can call doubleValue()
static <T extends Number> double sum(List<T> nums) {
    double total = 0;
    for (T n : nums) total += n.doubleValue();
    return total;
}

sum(List.of(1, 2, 3));        // Integer
sum(List.of(1.5, 2.5));       // Double`,
        note: 'extends Number නිසා doubleValue() safe.',
      },
    ],
    mortar:
      'Mortar metrics aggregation utilities (`sum`, `average`) `<T extends Number>` bounded generics වලින් — Integer order-counts, Double spend එකම code එකෙන් type-safe විදිහට process කරනවා.',
    keyPoints: [
      '`extends` = upper bound; `super` = lower bound.',
      'Bounded T මත ඒ type එකේ methods call කරන්න පුළුවන්.',
      'Compile-time type safety + code reuse.',
    ],
  },

  '2.3.2': {
    summary:
      'Wildcards: `<?>` unknown, `<? extends T>` producer (read), `<? super T>` consumer (write). PECS.',
    sinhala: [
      {
        heading: 'PECS rule',
        body: '"Producer Extends, Consumer Super". List එකකින් values read කරනවා නම් (producer) `<? extends T>`. List එකට values write කරනවා නම් (consumer) `<? super T>`. `<?>` = unbounded, type එක නොදන්නවා (read as Object). මේකෙන් flexible, safe APIs හදනවා.',
      },
    ],
    analogy:
      '`? extends` = "මොකක් හරි Number එකක් දෙන box එකක්" (ගන්න පුළුවන්). `? super` = "Number එකක් දාන්න පුළුවන් box එකක්" (දාන්න පුළුවන්).',
    code: [
      {
        filename: 'Wildcards.java',
        language: 'java',
        code: `// producer: read Ts out
static double total(List<? extends Number> nums) {
    double t = 0; for (Number n : nums) t += n.doubleValue(); return t;
}

// consumer: write Ts in
static void addDefaults(List<? super Integer> sink) {
    sink.add(0); sink.add(1);
}`,
        note: 'Read → extends; Write → super (PECS).',
      },
    ],
    mortar:
      'Mortar generic export/aggregation helpers wildcards වලින් flexible වෙනවා — `List<VIP>`, `List<Committed>` (Customer subtypes) ඔක්කොම එකම `List<? extends Customer>` method එකකට pass කරන්න පුළුවන්.',
    keyPoints: [
      'PECS: Producer Extends, Consumer Super.',
      '`<?>` unbounded = read as Object only.',
      'Wildcards = flexible generic APIs.',
    ],
  },

  '2.3.3': {
    summary:
      'Type erasure = generics compile-time විතරයි; runtime එකේ type info මැකෙනවා (backward compatibility).',
    sinhala: [
      {
        heading: 'Runtime එකේ generics නෑ',
        body: 'Compiler generics check කරලා, bytecode එකට generate කරනකොට type parameters "erase" කරනවා (`List<String>` → `List`). ඒ නිසා runtime එකේ `List<String>` සහ `List<Integer>` එකම class. `new T()`, `T[].class`, `instanceof List<String>` වගේ දේවල් බෑ. Bridge methods + casts compiler එකෙන් දානවා.',
      },
    ],
    analogy:
      'Exam එකේදී calculator පාවිච්චි කරලා, answer sheet එකේ calculator එක පේන්නෙ නෑ වගේ — generics compile time එකේ වැඩ කරලා, runtime bytecode එකේ "නෑ".',
    code: [
      {
        filename: 'Erasure.java',
        language: 'java',
        code: `List<String> a = new ArrayList<>();
List<Integer> b = new ArrayList<>();
System.out.println(a.getClass() == b.getClass()); // true (both ArrayList)

// these are NOT allowed due to erasure:
// if (a instanceof List<String>) {}   // compile error
// T item = new T();                   // compile error`,
        note: 'Runtime එකේ දෙකම හුදෙක් ArrayList.',
      },
    ],
    mortar:
      'Mortar generic `Repository<T>` design කරනකොට, runtime එකේ T නොදන්න නිසා `Class<T>` argument එකක් store කරලා reflection/DB mapping වලට පාවිච්චි කරනවා — type erasure එකේ practical workaround එකක්.',
    keyPoints: [
      'Generics = compile-time; runtime type info erased.',
      '`new T()`, `T[]`, `instanceof Generic<X>` බෑ.',
      'Backward compatibility නිසා මේ design එක.',
    ],
  },

  '2.4.1': {
    summary:
      'Thread lifecycle: NEW → RUNNABLE → RUNNING ↔ (BLOCKED/WAITING/TIMED_WAITING) → TERMINATED.',
    sinhala: [
      {
        heading: 'States',
        body: 'Thread එකක් `new` කලාම NEW. `start()` කලාම RUNNABLE (scheduler එක run කරනකම්). Lock එකක් බලාගෙන ඉන්නකොට BLOCKED, `wait()`/`join()` වලින් WAITING, `sleep(ms)` වලින් TIMED_WAITING. `run()` ඉවර වුනාම TERMINATED. States තේරුම්ගැනීම deadlock/performance debug කරන්න වැදගත්.',
      },
    ],
    analogy:
      'Employee කෙනෙක් වගේ: hired (NEW), ready (RUNNABLE), working (RUNNING), meeting එකක බලාන් (WAITING), lunch break (TIMED_WAITING), resigned (TERMINATED).',
    code: [
      {
        filename: 'Lifecycle.java',
        language: 'java',
        code: `Thread t = new Thread(() -> {
    System.out.println("syncing...");   // RUNNABLE -> RUNNING
});
System.out.println(t.getState());       // NEW
t.start();
t.join();                                // main WAITS for t
System.out.println(t.getState());       // TERMINATED`,
        note: 'start() → RUNNABLE; join() = අනිත් thread එක ඉවර වෙනකම් බලනවා.',
      },
    ],
    mortar:
      'Mortar background sync/prediction threads lifecycle එක monitor කරලා stuck (BLOCKED/WAITING forever) jobs detect කරනවා — connection health / proactive error alerts වලට.',
    keyPoints: [
      'NEW → RUNNABLE → RUNNING → (BLOCKED/WAITING/TIMED_WAITING) → TERMINATED.',
      '`start()` (RUNNABLE) vs `run()` (same thread, no new thread).',
      'BLOCKED = lock එකට; WAITING = signal එකට.',
    ],
  },

  '2.4.2': {
    summary:
      'Thread create කරන්න: Thread extend, Runnable implement (හොඳම), හෝ Callable (result + exception).',
    sinhala: [
      {
        heading: 'තුන් ක්‍රමය',
        body: '`Thread` extend කරන එක simple ඒත් inheritance එක waste. `Runnable` implement කරන එක preferred — task එකයි thread එකයි වෙන් කරනවා, lambda වලින් clean. `Callable<T>` = Runnable වගේ ඒත් result එකක් return කරනවා + checked exception throw කරන්න පුළුවන් (`Future` එකෙන් result ගන්නවා).',
      },
    ],
    analogy:
      'Runnable = "වැඩේ කරන්න" (return එකක් නෑ). Callable = "වැඩේ කරලා answer එකක් දෙන්න" (return + error report).',
    code: [
      {
        filename: 'CreateThreads.java',
        language: 'java',
        code: `// Runnable (preferred) - no result
Runnable syncTask = () -> System.out.println("sync done");
new Thread(syncTask).start();

// Callable - returns a result, used with ExecutorService
Callable<Integer> countTask = () -> repo.countCustomers();
ExecutorService pool = Executors.newFixedThreadPool(4);
Future<Integer> future = pool.submit(countTask);
Integer count = future.get();  // waits for result`,
        note: 'Result/exception ඕන නම් Callable + Future.',
      },
    ],
    mortar:
      'Mortar parallel connector syncs — fire-and-forget නම් `Runnable`, count/result ඕන නම් `Callable` + `Future`. නවීන code එකේ threads manual නොකර ExecutorService වලට submit කරනවා.',
    keyPoints: [
      'Runnable = no result; Callable = result + checked exception.',
      'Thread extend එකට වඩා Runnable/Callable + Executor හොඳයි.',
      'Manual `new Thread` avoid — pools use කරන්න.',
    ],
  },

  '2.4.3': {
    summary:
      'synchronized = එකවර එක thread එකකට විතරක් critical section එකට යන්න දෙනවා (mutual exclusion).',
    sinhala: [
      {
        heading: 'Locks + mutual exclusion',
        body: 'Shared mutable state එකකට threads කිහිපයක් එකවර access කලොත් race conditions. `synchronized` method/block එකක් object එකේ monitor lock එක ගන්නවා — එකවර එක thread එකයි ඇතුලට. ඒ නිසා atomicity + visibility දෙකම. Lock scope එක හැකිතරම් කුඩා තියාගන්න.',
      },
    ],
    analogy:
      'Single toilet එකක key එකක් වගේ — key එක තියෙන කෙනා ඉවර වෙනකම් අනිත් අය බලාගෙන ඉන්නවා.',
    code: [
      {
        filename: 'Synchronized.java',
        language: 'java',
        code: `class SyncCounter {
    private int processed = 0;

    public synchronized void increment() { processed++; } // atomic

    public void process(Batch b) {
        // narrow lock scope: lock only the shared update
        doWork(b);
        synchronized (this) { processed += b.size(); }
    }
    private void doWork(Batch b) { /* ... */ }
}`,
        note: 'Lock scope කුඩාවට තියාගන්න — throughput වැඩියි.',
      },
    ],
    mortar:
      'Mortar sync progress counters (processed records) threads කිහිපයකින් update වෙනවා. `synchronized` (හෝ `AtomicLong`) වලින් count එක race condition නැතුව නිවැරදිව තියාගන්නවා — UI progress bar එකට.',
    keyPoints: [
      'synchronized = mutual exclusion (එකවර එක thread).',
      'Atomicity + visibility දෙකම දෙනවා.',
      'Lock scope කුඩාවට; over-synchronize = slow.',
    ],
    pitfalls: ['Locks කිහිපයක් වැරදි order එකෙන් ගත්තොත් deadlock.'],
  },

  '2.4.4': {
    summary:
      'wait()/notify()/notifyAll() = synchronized block ඇතුලේ threads අතර coordinate කරන එක (producer-consumer).',
    sinhala: [
      {
        heading: 'Inter-thread signalling',
        body: '`wait()` — thread එක lock එක release කරලා, notify එකක් එනකම් WAITING වෙනවා. `notify()` — waiting threads වලින් එකකට signal, `notifyAll()` — ඔක්කොටම. හැමවිටම `synchronized` block ඇතුලේ, `while (condition)` loop එකක් ඇතුලේ පාවිච්චි කරන්න (spurious wakeups නිසා).',
      },
    ],
    analogy:
      'Restaurant එකක waiter (consumer) බලාගෙන ඉන්නවා, chef (producer) "order ready!" කියලා notify කරනකම්.',
    code: [
      {
        filename: 'WaitNotify.java',
        language: 'java',
        code: `class JobQueue {
    private final Queue<String> jobs = new LinkedList<>();

    public synchronized void submit(String job) {
        jobs.add(job);
        notify();                         // wake a waiting worker
    }
    public synchronized String take() throws InterruptedException {
        while (jobs.isEmpty()) wait();    // release lock, wait
        return jobs.poll();
    }
}`,
        note: 'while loop ඇතුලේ wait() — spurious wakeups වලට safe.',
      },
    ],
    mortar:
      'Mortar internal job queue එකක producer threads (connectors) jobs දානවා, worker threads process කරනවා. wait/notify (හෝ BlockingQueue) වලින් busy-waiting නැතුව efficient coordination. Practice එකේදී `BlockingQueue` prefer කරනවා.',
    keyPoints: [
      'wait/notify = synchronized block ඇතුලේ විතරයි.',
      'Condition එක `while` loop එකක check කරන්න.',
      'Modern code: `BlockingQueue` / higher-level tools prefer.',
    ],
  },

  '2.4.5': {
    summary:
      'Deadlock (threads එකිනෙකා බලාගෙන), Livelock (busy ඒත් progress නෑ), Starvation (thread එකකට කවදාවත් turn නෑ).',
    sinhala: [
      {
        heading: 'තුන් ප්‍රශ්නය',
        body: 'Deadlock: A locks X, B locks Y; A wants Y, B wants X → දෙන්නම හිරවෙනවා. Livelock: threads reactively state වෙනස් කරනවා ඒත් progress නෑ (දෙන්නම එකිනෙකාට "ඔයා යන්න" කියනවා). Starvation: high-priority threads නිසා low-priority එකකට resource කවදාවත් නෑ. විසඳුම්: consistent lock ordering, timeouts, fair locks.',
      },
    ],
    analogy:
      'Deadlock = පටු පාරක cars දෙකක් මුහුණට මුහුණ, දෙන්නම reverse වෙන්නෙ නෑ. Livelock = දෙන්නම එකම පැත්තට side වෙලා ආයෙ block වෙනවා.',
    code: [
      {
        filename: 'Deadlock.java',
        language: 'java',
        code: `// DEADLOCK risk: inconsistent lock order
// Thread 1: lock(a) then lock(b)
// Thread 2: lock(b) then lock(a)

// FIX: always acquire locks in the same global order
void transfer(Account from, Account to) {
    Account first  = from.id < to.id ? from : to;
    Account second = from.id < to.id ? to : from;
    synchronized (first) { synchronized (second) { /* ... */ } }
}`,
        note: 'Consistent lock ordering = deadlock avoid.',
      },
    ],
    mortar:
      'Mortar multiple resources (DB + cache + external API) lock කරන jobs deadlock වෙන්න පුළුවන්. Consistent lock ordering + `tryLock` timeouts වලින් වළක්වනවා — sync pipeline එක hang වෙන්නෙ නෑ.',
    keyPoints: [
      'Deadlock = circular wait; Livelock = active no-progress; Starvation = no turn.',
      'Fix: consistent lock order, timeouts (`tryLock`), fairness.',
      'Locks හැකිතරම් අඩුවෙන්/කුඩාවට.',
    ],
  },

  '2.4.6.1': {
    summary:
      'Executors framework = manual threads වෙනුවට thread pools (reuse + manage). Fixed, Cached, Scheduled.',
    sinhala: [
      {
        heading: 'Thread pools',
        body: '`new Thread()` හැම task එකකටම expensive + unbounded (OOM risk). `ExecutorService` thread pool එකක් තියාගෙන tasks reuse කරනවා. `newFixedThreadPool(n)` — fixed n threads. `newCachedThreadPool()` — demand අනුව grow/shrink. `newScheduledThreadPool()` — delayed/periodic tasks. `ThreadPoolExecutor` full control දෙනවා.',
      },
    ],
    analogy:
      'Call center එකක් වගේ — හැම call එකකටම අලුත් agent කෙනෙක් බඳවා ගන්නෙ නෑ, fixed agents ලා pool එකක් calls handle කරනවා.',
    code: [
      {
        filename: 'Executors.java',
        language: 'java',
        code: `ExecutorService pool = Executors.newFixedThreadPool(8);
for (Connector c : connectors) {
    pool.submit(c::sync);          // reuse pool threads
}
pool.shutdown();                    // no new tasks; finish existing

// periodic churn recompute every hour
ScheduledExecutorService sched = Executors.newScheduledThreadPool(1);
sched.scheduleAtFixedRate(this::recomputeChurn, 0, 1, TimeUnit.HOURS);`,
        note: 'Pool එක reuse කරලා shutdown කරන්න අමතක කරන්න එපා.',
      },
    ],
    mortar:
      'Mortar connectors 15+ ක් parallel sync කරන්න `newFixedThreadPool` එකක්. Nightly churn/segment recompute `ScheduledExecutorService` වලින්. Manual threads වෙනුවට pools = stable, bounded, efficient.',
    keyPoints: [
      'Pools = thread reuse + bounded resources.',
      'Fixed / Cached / Scheduled / custom ThreadPoolExecutor.',
      'හැමවිටම `shutdown()` — resource leak avoid.',
    ],
  },

  '2.4.6.2': {
    summary:
      'Future = async result placeholder; CompletableFuture = composable async pipelines (chain, combine, handle errors).',
    sinhala: [
      {
        heading: 'Async results',
        body: '`Future.get()` blocks — result එනකම් බලනවා. `CompletableFuture` non-blocking, composable — `thenApply` (transform), `thenCompose` (chain), `thenCombine` (join two), `exceptionally` (handle error). Async pipelines clean විදිහට හදන්න පුළුවන්.',
      },
    ],
    analogy:
      'Future = queue ticket එකක් (ආපහු ඇවිත් "ready ද?" අහනවා). CompletableFuture = "ready වුනාම මට call කරන්න, ඊට පස්සේ මේකත් කරන්න" කියන smart pipeline එකක්.',
    code: [
      {
        filename: 'CompletableFuture.java',
        language: 'java',
        code: `CompletableFuture
    .supplyAsync(() -> loadCustomer(id))          // async fetch
    .thenApply(this::inferName)                    // transform
    .thenApply(this::geocodeAddress)               // transform
    .thenAccept(repo::save)                        // consume
    .exceptionally(ex -> { log.error("enrich failed", ex); return null; });`,
        note: 'Enrichment stages chain — blocking නැතුව.',
      },
    ],
    mortar:
      'Mortar enrichment pipeline (name inference → gender → geocode → email-validate) `CompletableFuture` chain එකක් — stages async, non-blocking, errors gracefully handle. Millions of profiles throughput වැඩියෙන් enrich කරන්න.',
    keyPoints: [
      'Future = blocking get; CompletableFuture = composable/non-blocking.',
      'thenApply/thenCompose/thenCombine/exceptionally.',
      'Async pipelines = better throughput.',
    ],
  },

  '2.4.6.3': {
    summary:
      'Concurrent collections: ConcurrentHashMap, BlockingQueue — thread-safe, high-performance, manual sync ඕන නෑ.',
    sinhala: [
      {
        heading: 'Purpose-built thread-safe',
        body: '`Collections.synchronizedMap` full-map lock (slow). `ConcurrentHashMap` fine-grained locking — scalable. `BlockingQueue` (ArrayBlockingQueue, LinkedBlockingQueue) producer-consumer වලට perfect — `put` full නම් blocks, `take` empty නම් blocks (wait/notify manual ඕන නෑ).',
      },
    ],
    analogy:
      'BlockingQueue = conveyor belt එකක් — belt full නම් producer නවතිනවා, empty නම් consumer බලාගෙන ඉන්නවා. Automatic.',
    code: [
      {
        filename: 'ConcurrentCollections.java',
        language: 'java',
        code: `BlockingQueue<Batch> queue = new LinkedBlockingQueue<>(1000);

// producer
new Thread(() -> { try { queue.put(nextBatch()); } catch (Exception e) {} }).start();

// consumer
new Thread(() -> { try {
    while (true) process(queue.take()); // blocks until available
} catch (Exception e) {} }).start();`,
        note: 'BlockingQueue = back-pressure built-in.',
      },
    ],
    mortar:
      'Mortar real-time streaming ingestion pipeline එකේ `BlockingQueue` back-pressure දෙනවා — producers (connectors) consumers (resolvers) ට වඩා වේගවත් වුනොත් queue එක naturally throttle කරනවා. Shared counters `ConcurrentHashMap`.',
    keyPoints: [
      'ConcurrentHashMap = scalable thread-safe map.',
      'BlockingQueue = producer-consumer + back-pressure.',
      'Manual wait/notify වෙනුවට මේවා prefer.',
    ],
  },

  '2.4.6.4': {
    summary:
      'ReentrantLock (flexible lock: tryLock, fairness), ReadWriteLock (concurrent reads, exclusive writes).',
    sinhala: [
      {
        heading: 'synchronized වලට වඩා',
        body: '`ReentrantLock` = synchronized වගේ ඒත් වැඩි control: `tryLock(timeout)` (block වෙන්නෙ නැතුව), `lockInterruptibly`, fairness. `ReadWriteLock` = reads කිහිපයක් එකවර (shared), writes exclusive — read-heavy data වලට throughput වැඩියි. හැමවිටම `finally` එකේ `unlock()`.',
      },
    ],
    analogy:
      'ReadWriteLock = library reading room එකක් — කියවන්න ගොඩක් අයට එකවර පුළුවන් (read), ඒත් පොත edit කරනකොට (write) කවුරුවත් ඇතුලට දෙන්නෙ නෑ.',
    code: [
      {
        filename: 'Locks.java',
        language: 'java',
        code: `ReadWriteLock rw = new ReentrantReadWriteLock();

String read(String key) {
    rw.readLock().lock();
    try { return cache.get(key); }        // many readers OK
    finally { rw.readLock().unlock(); }
}
void write(String key, String val) {
    rw.writeLock().lock();
    try { cache.put(key, val); }          // exclusive
    finally { rw.writeLock().unlock(); }
}`,
        note: 'unlock() හැමවිටම finally එකේ.',
      },
    ],
    mortar:
      'Mortar in-memory config/recommendation cache read-heavy (ගොඩක් lookups, rare updates). `ReadWriteLock` වලින් concurrent reads throughput වැඩි කරලා, updates safe තියාගන්නවා.',
    keyPoints: [
      'ReentrantLock = tryLock/timeout/fairness (synchronized+).',
      'ReadWriteLock = concurrent reads, exclusive writes.',
      'unlock() හැමවිටම `finally` — නැත්නම් permanent lock.',
    ],
  },

  '2.4.6.5': {
    summary:
      'Synchronizers: CountDownLatch (wait for N), CyclicBarrier (all meet), Semaphore (limit concurrency).',
    sinhala: [
      {
        heading: 'Coordination tools',
        body: '`CountDownLatch(n)` — n tasks ඉවර වෙනකම් එක thread එකක් බලනවා (one-time). `CyclicBarrier(n)` — threads n ක් එකතැනකට එනකම් බලනවා, ආයෙ reuse කරන්න පුළුවන්. `Semaphore(permits)` — එකවර access කරන threads ගණන limit කරනවා (rate limiting).',
      },
    ],
    analogy:
      'CountDownLatch = "හැමෝම ආවම bus එක පිටත් වෙනවා". Semaphore = parking lot එකක permits ගාන — full නම් බලාගෙන ඉන්නවා.',
    code: [
      {
        filename: 'Synchronizers.java',
        language: 'java',
        code: `// wait for all connector syncs to finish
CountDownLatch latch = new CountDownLatch(connectors.size());
for (Connector c : connectors) {
    pool.submit(() -> { try { c.sync(); } finally { latch.countDown(); } });
}
latch.await();                     // block until all done
System.out.println("All syncs complete -> run resolution");

// limit outbound API calls to 5 at a time
Semaphore api = new Semaphore(5);`,
        note: 'CountDownLatch = "ඔක්කොම ඉවර වෙනකම්" barrier එකක්.',
      },
    ],
    mortar:
      'Mortar "connect → cleanse → predict" pipeline එකේ, ඔක්කොම connector syncs ඉවර වුනාම විතරයි resolution start කරන්නේ — `CountDownLatch`. External ad-platform APIs rate-limit කරන්න `Semaphore(5)` — max 5 concurrent calls.',
    keyPoints: [
      'CountDownLatch = wait for N (one-shot).',
      'CyclicBarrier = N threads rendezvous (reusable).',
      'Semaphore = bounded concurrency / rate limiting.',
    ],
  },

  '2.4.7': {
    summary:
      'ThreadLocal = හැම thread එකකටම තමන්ගේම copy එකක් variable එකකේ — shared state නැතුව per-thread context.',
    sinhala: [
      {
        heading: 'Per-thread storage',
        body: '`ThreadLocal<T>` එකකින්, හැම thread එකක්ම එකම variable එකෙන් තමන්ගේම independent value එකක් දකිනවා. Shared mutable state නැති නිසා synchronization ඕන නෑ. Request context (userId, brandId, traceId) වගේ දේවල් carry කරන්න common. හැමවිටම `remove()` කරන්න (thread pools වල leaks/stale data වළක්වන්න).',
      },
    ],
    analogy:
      'හැම employee කෙනෙක්ටම තමන්ගේම locker එකක් වගේ — එකම "locker" concept එක, ඒත් හැමෝටම වෙන වෙනම content.',
    code: [
      {
        filename: 'ThreadLocal.java',
        language: 'java',
        code: `public class BrandContext {
    private static final ThreadLocal<String> CURRENT = new ThreadLocal<>();

    public static void set(String brandId) { CURRENT.set(brandId); }
    public static String get() { return CURRENT.get(); }
    public static void clear() { CURRENT.remove(); }   // avoid leaks!
}

// per request/thread, no locking needed
BrandContext.set("brand-42");
try { runSync(); } finally { BrandContext.clear(); }`,
        note: 'Thread pools වල finally එකේ remove() කරන්නම ඕන.',
      },
    ],
    mortar:
      'Mortar multi-brand platform එකේ, current request එකේ brandId/tenant/traceId `ThreadLocal` context එකක තියාගෙන, පහළ layers වලට parameter pass නොකර access කරනවා — tenant isolation + distributed tracing වලට. Pool threads නිසා `remove()` critical.',
    keyPoints: [
      'ThreadLocal = per-thread independent copy (no sharing).',
      'Request/tenant context carry කරන්න ideal.',
      'Thread pools: `remove()` finally එකේ — memory leak/stale avoid.',
    ],
    pitfalls: ['Pool threads reuse නිසා clear නොකලොත් වෙන request එකකට පරණ data leak.'],
  },
};
