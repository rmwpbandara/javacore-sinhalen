import { Concept } from '../../core/models/roadmap.model';

/** Section 3 — Modern Java Features (Java 8 to 21). */
export const SECTION_03: Record<string, Concept> = {
  '3.1.1': {
    summary:
      'Functional interface = abstract method එකක් විතරක් තියෙන interface (Predicate, Function, Supplier, Consumer). Lambda වලට base එක.',
    sinhala: [
      {
        heading: 'Single abstract method',
        body: 'Functional interface එකකට abstract method එකයි විතරයි (SAM). `@FunctionalInterface` annotation එකෙන් compiler verify කරනවා. Built-in ඒවා: `Predicate<T>` (T→boolean), `Function<T,R>` (T→R), `Supplier<T>` (→T), `Consumer<T>` (T→void). මේවා lambda/method reference වලින් implement කරනවා.',
      },
    ],
    analogy:
      'එක වැඩක් විතරක් කරන tool එකක් වගේ — Predicate = "මේක ගැලපෙනවද?" කියලා yes/no දෙන filter එකක්.',
    code: [
      {
        filename: 'FunctionalInterfaces.java',
        language: 'java',
        code: `Predicate<Customer> isVip     = c -> c.getTotalSpend() > 1000;
Function<Customer, String> email = Customer::getEmail;
Supplier<Instant> now         = Instant::now;
Consumer<Customer> notify     = c -> send(c.getEmail());

if (isVip.test(alice)) notify.accept(alice);`,
        note: 'හැම එකක්ම abstract method එකයි — lambda වලින් fill කරනවා.',
      },
    ],
    mortar:
      'Mortar segment builder එකේ හැම rule එකක්ම `Predicate<Customer>` — "spend > 1000", "country == LK". ඒවා compose කරලා complex audiences හදනවා. Notifications `Consumer`, projections `Function`.',
    keyPoints: [
      'Functional interface = one abstract method (SAM).',
      'Predicate/Function/Supplier/Consumer = built-in workhorses.',
      '`@FunctionalInterface` = compiler-checked contract.',
    ],
  },

  '3.1.2': {
    summary:
      'Lambda expression = anonymous function එකක් සඳහා කෙටි syntax — functional interface එකක් implement කරනවා.',
    sinhala: [
      {
        heading: 'Concise behaviour',
        body: '`(params) -> body` syntax එකෙන් functional interface එකක් instant implement කරනවා — anonymous class boilerplate නැතුව. Behaviour එකක් data එකක් වගේ pass කරන්න පුළුවන් (functional programming). Variables effectively-final නම් විතරයි capture කරන්න පුළුවන්.',
      },
    ],
    analogy:
      'Long form letter එකක් වෙනුවට quick sticky-note එකක් වගේ — කෙටියෙන් behaviour එක ලියනවා.',
    code: [
      {
        filename: 'Lambdas.java',
        language: 'java',
        code: `// old anonymous class
Collections.sort(customers, new Comparator<Customer>() {
    public int compare(Customer a, Customer b) {
        return Double.compare(b.getTotalSpend(), a.getTotalSpend());
    }
});

// lambda - same thing, concise
customers.sort((a, b) -> Double.compare(b.getTotalSpend(), a.getTotalSpend()));`,
        note: 'Boilerplate නැති කරලා behaviour එක clear.',
      },
    ],
    mortar:
      'Mortar analytics code එකේ sorting, filtering, mapping ඔක්කොම lambdas — "top spenders", "churned customers" වගේ logic කෙටියෙන්, read කරන්න ලේසියෙන්. Streams API එකට පදනම.',
    keyPoints: [
      'Lambda = functional interface එකක concise implementation.',
      'Behaviour-as-data (pass functions around).',
      'Captured variables effectively-final වෙන්නම ඕන.',
    ],
  },

  '3.1.3': {
    summary:
      'Method reference (::) = lambda එකක් තව කෙටියෙන් — existing method එකකට point කරනවා.',
    sinhala: [
      {
        heading: 'Four forms',
        body: '`Class::staticMethod`, `instance::method`, `Class::instanceMethod`, `Class::new` (constructor). Lambda එකක් හුදෙක් existing method එකක් call කරනවා නම්, method reference එකෙන් තව කෙටියි + readable.',
      },
    ],
    analogy:
      '"මේ පණිවිඩේ එවන්න John ට" කියනවා වෙනුවට කෙලින්ම John ගේ contact එක tag කරනවා වගේ.',
    code: [
      {
        filename: 'MethodRefs.java',
        language: 'java',
        code: `List<Customer> customers = repo.findAll();

customers.forEach(this::enrich);                 // instance method
customers.stream().map(Customer::getEmail);      // Class::instanceMethod
customers.stream().map(String::toLowerCase);     // on the result
Supplier<Customer> factory = Customer::new;      // constructor ref`,
        note: 'c -> c.getEmail()  ⟶  Customer::getEmail',
      },
    ],
    mortar:
      'Mortar stream pipelines වල `Customer::getEmail`, `this::geocode`, `Customer::new` වගේ method references — enrichment/mapping code එක declarative + tidy. Lambda එකේ තව කෙටි version එක.',
    keyPoints: [
      '4 forms: static, bound instance, unbound instance, constructor.',
      'Lambda body එක method call එකක් විතරක් නම් use කරන්න.',
      'Readable + less noise.',
    ],
  },

  '3.1.4.1': {
    summary:
      'Streams: map (transform), filter (select), flatMap (flatten), reduce (aggregate), collect (materialize).',
    sinhala: [
      {
        heading: 'Declarative data pipelines',
        body: 'Stream එකක් = data එකක් හරහා යන pipeline එකක්. `filter` (Predicate), `map` (transform), `flatMap` (nested→flat), `reduce` (single value එකකට fold), `collect` (List/Set/Map වලට). Intermediate ops lazy; terminal op (collect/reduce/forEach) එකෙන් execute වෙනවා.',
      },
    ],
    analogy:
      'Factory conveyor belt එකක් — raw materials filter → shape (map) → box (collect). හැම station එකක්ම එක වැඩක්.',
    code: [
      {
        filename: 'Streams.java',
        language: 'java',
        code: `Map<String, Double> spendByCountry = customers.stream()
    .filter(c -> c.getTotalSpend() > 0)                 // select
    .collect(Collectors.groupingBy(
        Customer::getCountry,
        Collectors.summingDouble(Customer::getTotalSpend))); // aggregate

double totalRevenue = customers.stream()
    .mapToDouble(Customer::getTotalSpend)
    .sum();`,
        note: 'Declarative — "මොනවද ඕන" කියනවා, "කොහොමද loop කරන්නේ" නෙවෙයි.',
      },
    ],
    mortar:
      'Mortar RFM+T segmentation, "spend by country", "top 10 products" වගේ analytics streams වලින් — group, sum, sort declarative විදිහට. Loops වලට වඩා clear + composable, parallelize කරන්නත් ලේසියි.',
    keyPoints: [
      'filter/map/flatMap = intermediate (lazy); reduce/collect = terminal.',
      'Collectors.groupingBy/summing = powerful aggregations.',
      'Declarative — read කරන්න ලේසි.',
    ],
  },

  '3.1.4.2': {
    summary:
      'Parallel streams = ForkJoinPool එකෙන් data එක multiple cores වල process — big data වලට, ඒත් පරෙස්සමින්.',
    sinhala: [
      {
        heading: 'When (and when not)',
        body: '`.parallelStream()` හෝ `.parallel()` වලින් stream එක common ForkJoinPool එකේ split කරලා parallel process කරනවා. Large datasets + CPU-bound + stateless ops වලට හොඳයි. Small data, IO-bound, හෝ ordered/stateful ops වලට overhead වැඩි/වැරදි වෙන්න පුළුවන්. Shared mutable state avoid කරන්න.',
      },
    ],
    analogy:
      'ලොකු වැඩක් workers ගොඩකට බෙදනවා වගේ — ලොකු වැඩ්වලට හොඳයි, පොඩි වැඩකට "බෙදන" වියදම වැඩියි.',
    code: [
      {
        filename: 'ParallelStreams.java',
        language: 'java',
        code: `// millions of records, CPU-bound scoring -> parallel helps
double totalScore = customers.parallelStream()
    .mapToDouble(this::computeChurnScore)   // stateless, CPU-bound
    .sum();

// avoid: shared mutable state in parallel (race conditions)`,
        note: 'Stateless + large + CPU-bound නම් විතරයි parallel වටිනවා.',
      },
    ],
    mortar:
      'Mortar millions of customers churn-score / RFM compute කරනකොට `parallelStream` වලින් multi-core throughput. ඒත් IO (DB/API) calls parallel stream වල දාන්නෙ නෑ — custom executor + CompletableFuture prefer.',
    keyPoints: [
      'Parallel = ForkJoinPool split; large + CPU-bound + stateless වලට.',
      'Small/IO-bound/stateful → sequential හොඳයි.',
      'Shared mutable state = race conditions — avoid.',
    ],
  },

  '3.1.5': {
    summary:
      'Optional<T> = value එකක් "තියෙන්න පුළුවන් / නැති වෙන්න පුළුවන්" කියලා explicit කරන container එකක් — NPE වළක්වන්න.',
    sinhala: [
      {
        heading: 'Null-safety',
        body: '`Optional<T>` null return කරනවා වෙනුවට "value නැති වෙන්න පුළුවන්" කියන එක type එකෙන්ම කියනවා. `map`, `filter`, `orElse`, `orElseThrow`, `ifPresent` වලින් null checks නැතුව safely handle කරනවා. Return types වලට හොඳයි; fields/parameters වලට recommend කරන්නෙ නෑ.',
      },
    ],
    analogy:
      'තෑග්ග තියෙන්නත් පුළුවන් නැති වෙන්නත් පුළුවන් box එකක් වගේ — කෙලින්ම අත දාන්නෙ නැතුව, "ඇත්නම් මේක කරන්න" කියලා safely open කරනවා.',
    code: [
      {
        filename: 'Optionals.java',
        language: 'java',
        code: `Optional<Customer> found = repo.findByEmail(email);

String country = found
    .map(Customer::getCountry)
    .filter(c -> !c.isBlank())
    .orElse("UNKNOWN");            // safe default, no NPE

repo.findByEmail(email)
    .ifPresentOrElse(this::enrich, () -> log.warn("not found: " + email));`,
        note: 'null check chains වෙනුවට clean, safe pipeline.',
      },
    ],
    mortar:
      'Mortar enrichment වලදී customer fields (country, phone, gender) බොහෝවිට missing. `Optional` වලින් "unknown" gracefully handle කරලා, NPE crashes නැතුව enrichment pipeline එක ස්ථාවර තියාගන්නවා.',
    keyPoints: [
      'Optional = explicit "maybe value" (NPE වළක්වයි).',
      'map/filter/orElse/orElseThrow/ifPresent.',
      'Return types වලට use; fields/params වලට නෙවෙයි.',
    ],
    pitfalls: ['`optional.get()` කෙලින්ම call කරන එක anti-pattern — orElse/orElseThrow use කරන්න.'],
  },

  '3.1.6': {
    summary:
      'java.time (Java 8) = immutable, thread-safe date/time API — පරණ Date/Calendar වෙනුවට. LocalDate, Instant, Duration.',
    sinhala: [
      {
        heading: 'Modern date/time',
        body: 'පරණ `Date`/`Calendar` mutable + confusing + not thread-safe. `java.time`: `LocalDate` (date), `LocalDateTime` (date+time), `Instant` (UTC timestamp), `ZonedDateTime` (timezone), `Duration`/`Period` (spans). ඔක්කොම immutable + thread-safe + clear API.',
      },
    ],
    analogy:
      'පරණ අවුල් diary එකක් වෙනුවට, clean modern calendar app එකක් වගේ — timezones, durations ඔක්කොම හරියට.',
    code: [
      {
        filename: 'JavaTime.java',
        language: 'java',
        code: `Instant lastPurchase = customer.getLastPurchase();
Instant now = Instant.now();

long daysSince = Duration.between(lastPurchase, now).toDays();
LocalDate predictedChurn = LocalDate.now().plusDays(30);

boolean overdue = daysSince > customer.getAvgIntervalDays();`,
        note: 'Immutable + thread-safe — concurrent jobs වලට safe.',
      },
    ],
    mortar:
      'Mortar churn prediction එකේ "days since last purchase", "predicted churn date", "expected purchase interval" ඔක්කොම `Instant`/`Duration`/`LocalDate` වලින්. Immutable නිසා parallel scoring jobs වල safely share කරනවා.',
    keyPoints: [
      'java.time = immutable + thread-safe.',
      'LocalDate/LocalDateTime/Instant/ZonedDateTime; Duration/Period.',
      'පරණ Date/Calendar avoid කරන්න.',
    ],
  },

  '3.2.1': {
    summary:
      'Java Module System (Jigsaw, Java 9) = strong encapsulation + explicit dependencies package මට්ටමින් උඩ.',
    sinhala: [
      {
        heading: 'module-info.java',
        body: '`module-info.java` එකෙන් module එකක් `requires` (dependencies) සහ `exports` (public packages) declare කරනවා. Export නොකරපු packages පිටින් access කරන්න බෑ — strong encapsulation. Reliable configuration + smaller runtime (jlink) දෙනවා. Enterprise/library code වලට වැදගත්.',
      },
    ],
    analogy:
      'ගොඩනැගිල්ලක security zones වගේ — කුමන දොරවල් (packages) පිටට open ද, කුමන services (modules) ඕන ද කියලා explicit.',
    code: [
      {
        filename: 'module-info.java',
        language: 'java',
        code: `module com.mortar.resolution {
    requires com.mortar.core;        // depends on
    requires transitive java.sql;

    exports com.mortar.resolution.api;   // public
    // internal packages stay hidden
}`,
        note: 'exports නොකරපු internal code එක ආරක්ෂිතයි.',
      },
    ],
    mortar:
      'Mortar internal libraries (core, resolution, prediction) modules විදිහට split කරලා, public APIs විතරක් export කරනවා — internal implementation encapsulated, dependencies පැහැදිලියි. ලොකු codebase එකක් managed තියාගන්න.',
    keyPoints: [
      'module-info.java: requires + exports.',
      'Strong encapsulation (non-exported = hidden).',
      'jlink වලින් custom minimal runtime.',
    ],
  },

  '3.2.2': {
    summary:
      'var (Java 10) = local variable type inference — compiler type එක infer කරනවා, ඒත් still statically typed.',
    sinhala: [
      {
        heading: 'Less boilerplate',
        body: '`var` කියන්නේ dynamic typing නෙවෙයි — compile-time එකේ type එක infer කරලා fix කරනවා. Local variables වලට විතරයි (fields/params/return නෑ). Long generic types වගේ තැන් වල readability වැඩි කරනවා, ඒත් type එක obvious නොවෙන තැන් වල avoid කරන්න.',
      },
    ],
    analogy:
      '"මේක Integer එකක්" කියලා ආයෙ නොකියා, "value = 5" කියනවා වගේ — compiler type එක තේරුම් ගන්නවා, ඒත් type එක වෙනස් වෙන්නෙ නෑ.',
    code: [
      {
        filename: 'Var.java',
        language: 'java',
        code: `var customers = new ArrayList<Customer>();          // inferred ArrayList<Customer>
var byCountry = new HashMap<String, List<Customer>>(); // less noise

for (var entry : byCountry.entrySet()) {           // clean loop
    process(entry.getKey(), entry.getValue());
}
// var x;          // ERROR: needs initializer`,
        note: 'Static typing තාම — type inference විතරයි.',
      },
    ],
    mortar:
      'Mortar analytics code එකේ verbose generic declarations (`Map<String, List<Customer>>`) `var` වලින් කෙටි කරලා readability වැඩි කරනවා — type එක right-hand-side එකෙන් පැහැදිලි තැන් වල.',
    keyPoints: [
      'var = compile-time type inference (dynamic නෙවෙයි).',
      'Local variables only (initializer ඕන).',
      'Type obvious නම් use; නැත්නම් explicit type.',
    ],
  },

  '3.2.3': {
    summary:
      'Records (Java 14+) = immutable data carriers — constructor, getters, equals, hashCode, toString auto-generated.',
    sinhala: [
      {
        heading: 'Boilerplate-free data',
        body: '`record` එකකින් immutable data class එකක් එක line එකකින්. Fields (components) final, accessors auto (`name()`), `equals`/`hashCode`/`toString` auto. DTOs, value objects, API responses වලට perfect. Compact constructor එකෙන් validation දාන්න පුළුවන්.',
      },
    ],
    analogy:
      'Form template එකක් වගේ — fields කිව්වම, ඉතුරු ඔක්කොම (equals, toString) auto-fill වෙනවා.',
    code: [
      {
        filename: 'Records.java',
        language: 'java',
        code: `public record SegmentDto(String id, String name, long profileCount) {
    // compact constructor: validation
    public SegmentDto {
        if (profileCount < 0) throw new IllegalArgumentException("negative count");
    }
}

var dto = new SegmentDto("s1", "VIP", 1200);
System.out.println(dto.name());     // auto accessor
System.out.println(dto);            // auto toString`,
        note: 'Immutable + equals/hashCode/toString නොමිලේ.',
      },
    ],
    mortar:
      'Mortar REST API DTOs (`SegmentDto`, `CustomerSummary`, `ChurnResult`) records විදිහට — immutable, concise, safe. equals/hashCode auto නිසා caching/dedup වලටත් හොඳයි.',
    keyPoints: [
      'record = immutable data carrier, auto members.',
      'DTOs / value objects වලට ideal.',
      'Compact constructor = validation/normalization.',
    ],
  },

  '3.2.4': {
    summary:
      'Text blocks (Java 15+) = multi-line strings """...""" — JSON, SQL, HTML clean විදිහට.',
    sinhala: [
      {
        heading: 'Multi-line literals',
        body: '`"""` වලින් multi-line string එකක් — escape (`\\n`, `\\"`) නැතුව. Indentation auto-strip. Embedded JSON, SQL, HTML readable විදිහට කෙලින්ම ලියන්න පුළුවන්.',
      },
    ],
    analogy:
      'එක පේළියෙ දිග string එකක් වෙනුවට, කොළයක ලියනවා වගේ — pretty + read කරන්න ලේසි.',
    code: [
      {
        filename: 'TextBlocks.java',
        language: 'java',
        code: `String query = """
    SELECT country, SUM(total_spend) AS revenue
    FROM customers
    WHERE brand_id = ?
    GROUP BY country
    ORDER BY revenue DESC
    """;

String payload = """
    { "segment": "VIP", "sync": "meta" }
    """;`,
        note: 'Escape/concat නැතුව readable SQL/JSON.',
      },
    ],
    mortar:
      'Mortar native queries (JPQL/SQL), Copilot prompt templates, JSON payloads text blocks වලින් — read/maintain කරන්න ලේසි, escaping bugs නෑ.',
    keyPoints: [
      '""" ... """ = multi-line, no escaping.',
      'SQL/JSON/HTML වලට readable.',
      'Indentation auto-managed.',
    ],
  },

  '3.2.5': {
    summary:
      'Pattern matching (instanceof Java 16, switch Java 21) = type check + cast + bind එකට; concise branching.',
    sinhala: [
      {
        heading: 'Check, cast, bind',
        body: '`if (o instanceof Customer c)` — check + cast + variable bind එකපාරට. Switch pattern matching (Java 21) එකෙන් type/shape අනුව branch + deconstruct කරන්න පුළුවන් (records + sealed types එක්ක powerful). Verbose casting code අඩු කරනවා.',
      },
    ],
    analogy:
      '"මේක Customer එකක්ද? නම් c කියලා use කරන්න" කියලා එක step එකෙන් — check කරලා ආයෙ cast කරන double-work නෑ.',
    code: [
      {
        filename: 'PatternMatching.java',
        language: 'java',
        code: `Object event = nextEvent();

// instanceof pattern
if (event instanceof PurchaseEvent p) {
    record(p.amount());           // p already typed & bound
}

// switch pattern (Java 21)
String label = switch (event) {
    case PurchaseEvent p -> "spent " + p.amount();
    case ChurnEvent c    -> "churn risk " + c.score();
    default              -> "unknown";
};`,
        note: 'Check + cast + bind එකපාරට — clean branching.',
      },
    ],
    mortar:
      'Mortar event-driven pipeline එකේ heterogeneous events (Purchase, Churn, Sync) pattern matching switch එකකින් handle කරනවා — type-safe, concise, sealed event hierarchy එක්ක exhaustive.',
    keyPoints: [
      'instanceof pattern = check+cast+bind (Java 16).',
      'switch patterns + records + sealed (Java 21) = exhaustive.',
      'Casting boilerplate අඩු.',
    ],
  },

  '3.2.6': {
    summary:
      'Sealed classes (Java 17) = subclass කරන්න පුළුවන් කවුද කියලා restrict කරනවා — controlled hierarchies.',
    sinhala: [
      {
        heading: 'Restricted inheritance',
        body: '`sealed ... permits A, B, C` වලින්, hierarchy එකක් extend කරන්න පුළුවන් classes ලැයිස්තුව fix කරනවා. Subclasses `final`, `sealed`, හෝ `non-sealed` වෙන්නම ඕන. Switch pattern matching එකේ exhaustiveness compiler verify කරන්න පුළුවන් — නව case එකක් add කලොත් compile error.',
      },
    ],
    analogy:
      'Guest list එකක් වගේ — "මේ අයට විතරයි ඇතුල් වෙන්න පුළුවන්". හැම possibility එකම දන්නවා.',
    code: [
      {
        filename: 'Sealed.java',
        language: 'java',
        code: `public sealed interface Segment permits Vip, Committed, Dormant {}

public record Vip(double spend) implements Segment {}
public record Committed(int orders) implements Segment {}
public record Dormant(long daysIdle) implements Segment {}

// exhaustive switch - compiler checks all cases handled
String action = switch (segment) {
    case Vip v       -> "reward";
    case Committed c -> "upsell";
    case Dormant d   -> "win-back";
};`,
        note: 'permits list fixed → switch exhaustive (default ඕන නෑ).',
      },
    ],
    mortar:
      'Mortar 7 behavioural segments (VIP, Committed, Dormant...) sealed hierarchy එකක් — නව segment එකක් add කලොත් handling code එකේ compile error එකෙන් "මේකත් handle කරන්න" කියලා ensure කරනවා. Type-safe domain modelling.',
    keyPoints: [
      'sealed + permits = closed set of subtypes.',
      'Subtypes final/sealed/non-sealed.',
      'Exhaustive switches (compiler-verified).',
    ],
  },

  '3.2.7': {
    summary:
      'Virtual threads (Loom, Java 21) = lightweight threads millions ගණන් — high-concurrency IO cheaply.',
    sinhala: [
      {
        heading: 'Cheap concurrency',
        body: 'Platform threads OS threads (expensive, thousands limit). Virtual threads JVM-managed, super lightweight — millions run කරන්න පුළුවන්. Blocking IO call එකකදී virtual thread එක "unmount" වෙලා carrier thread එක free කරනවා. "thread-per-request" simple style එකෙන් massive scale. `Executors.newVirtualThreadPerTaskExecutor()`.',
      },
    ],
    analogy:
      'Expensive full-time employees (platform threads) වෙනුවට, ඕන තරම් cheap freelancers (virtual threads) — blocking වුනොත් desk එක වෙන කෙනෙකුට.',
    code: [
      {
        filename: 'VirtualThreads.java',
        language: 'java',
        code: `try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
    for (Customer c : millionsOfCustomers) {
        executor.submit(() -> {
            var data = callExternalApi(c);   // blocking IO is cheap here
            repo.save(enrich(c, data));
        });
    }
} // all virtual threads complete`,
        note: 'Blocking IO tasks දහස්/ලක්ෂ ගණන් cheaply.',
      },
    ],
    mortar:
      'Mortar millions of customers external APIs (geocode, email-validate) call කරන IO-bound enrichment වලට virtual threads — thread-per-task simple code එකෙන් huge concurrency, thread-pool tuning අවුල් නැතුව.',
    keyPoints: [
      'Virtual threads = lightweight, millions scale.',
      'IO-bound / thread-per-request වලට ideal.',
      'CPU-bound වලට platform threads/pools තාම හොඳයි.',
    ],
  },
};
