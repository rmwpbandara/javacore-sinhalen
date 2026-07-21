import { Concept } from '../../core/models/roadmap.model';

/** Section 3 — Modern Java Features (Java 8 to 21). */
export const SECTION_03: Record<string, Concept> = {
  '3.1.1': {
    summary:
      'Functional interface = abstract method **එකක් විතරක්** තියෙන interface (SAM — Single Abstract Method). Lambda expressions වලට පදනම. Built-in ඒවා: `Predicate`, `Function`, `Supplier`, `Consumer`.',
    sinhala: [
      {
        heading: 'කතාව: behaviour එකක් "pass" කරන්නද?',
        body: 'Mortar segment builder එකට filter rules දාන්න ඕන — "spend > 1000", "country == LK". මේ rules කියන්නේ behaviour කෑලි (customer කෙනෙක් ගැලපෙනවද කියලා check කරන logic). Java වල methods කෙලින්ම variables විදිහට pass කරන්න බෑ (objects විතරයි pass කරන්නේ). ඉතින් behaviour එකක් pass කරන්නේ කොහොමද? විසඳුම — abstract method එකක් විතරක් තියෙන interface එකක් (functional interface), lambda එකකින් implement කරලා. ඒක object එකක් වගේ pass කරන්න පුළුවන්.',
      },
      {
        heading: 'SAM + built-in functional interfaces',
        body: 'Functional interface = abstract method එකයි විතරයි. `@FunctionalInterface` annotation එකෙන් compiler verify කරනවා. `java.util.function` වල built-in ඒවා:',
        points: [
          '`Predicate<T>` — `T → boolean` ("මේක ගැලපෙනවද?" — filters).',
          '`Function<T,R>` — `T → R` (transform — customer → email).',
          '`Supplier<T>` — `() → T` (value එකක් produce කරනවා — `Instant::now`).',
          '`Consumer<T>` — `T → void` (value එකක් use කරනවා — send email).',
          '`BiFunction`, `UnaryOperator`, `BinaryOperator` වගේ තවත් තියෙනවා.',
        ],
      },
    ],
    analogy:
      'එක වැඩක් විතරක් කරන tool එකක් වගේ. `Predicate` = "yes/no දෙන" filter එකක් ("මේ customer VIP ද?"). `Function` = "එකක් දීලා තව එකක් හදන" machine එකක් (customer → email). Tool එකට එක job එකයි — ඒ නිසා lambda එකකින් fill කරන්න පුළුවන්.',
    code: [
      {
        filename: 'FunctionalInterfaces.java',
        language: 'java',
        code: `// built-in functional interfaces — lambda වලින් implement
Predicate<Customer> isVip  = c -> c.getTotalSpend() > 1000;   // T -> boolean
Function<Customer, String> toEmail = Customer::getEmail;       // T -> R
Supplier<Instant> now      = Instant::now;                     // () -> T
Consumer<Customer> notify  = c -> send(c.getEmail());          // T -> void

// use කරනවා
if (isVip.test(alice)) {          // Predicate.test
    notify.accept(alice);          // Consumer.accept
}
String email = toEmail.apply(alice);  // Function.apply`,
        note: 'හැම එකකම abstract method එකයි (test/apply/get/accept).',
      },
      {
        filename: 'CustomFunctional.java',
        language: 'java',
        code: `// ඔයාගේම functional interface — abstract method එකයි
@FunctionalInterface
interface MatchRule {
    boolean matches(Customer a, Customer b);   // SAM
    // තව abstract method එකක් දැම්මොත් -> compile error (functional නෑ)
}

// lambda එකකින් implement + pass කරන්න පුළුවන්
MatchRule exactEmail = (a, b) -> a.getEmail().equals(b.getEmail());`,
        note: '@FunctionalInterface = compiler-checked "one abstract method" contract.',
      },
    ],
    mortar:
      'Mortar segment builder එකේ හැම rule එකක්ම `Predicate<Customer>` — "spend > 1000", "country == LK", "churn == ACTIVE". ඒවා compose කරලා (`predicate.and(other)`) complex audiences හදනවා. Identity resolution matching strategies (5.3.3.1) functional interfaces; notifications `Consumer`; projections `Function`. Behaviour-as-data නිසා flexible, testable, composable Mortar logic.',
    keyPoints: [
      'Functional interface = abstract method එකයි විතරයි (SAM).',
      'Predicate (T→boolean) / Function (T→R) / Supplier (()→T) / Consumer (T→void).',
      '`@FunctionalInterface` = compiler-checked contract.',
      'Lambdas + method references වලින් implement කරනවා (behaviour-as-data).',
    ],
    pitfalls: [
      'Abstract methods 2ක් දැම්මොත් functional interface නෙවෙයි (lambda වලින් implement කරන්න බෑ). default/static methods ගණන් නෑ.',
      'Wrong functional interface තෝරගැනීම (Supplier vs Function) — signature (`() → T` vs `T → R`) බලලා තෝරන්න.',
    ],
  },

  '3.1.2': {
    summary:
      'Lambda expression = anonymous function එකක් සඳහා කෙටි syntax `(params) -> body` — functional interface එකක් instant implement කරනවා, anonymous class boilerplate නැතුව. Behaviour එකක් data වගේ pass කරන්න පුළුවන්.',
    sinhala: [
      {
        heading: 'කතාව: anonymous class boilerplate එකෙන් මිදෙමු',
        body: 'Java 8-ට කලින්, customers sort කරන්න `Comparator` එකක් ඕන වුනාම — anonymous class එකක් (`new Comparator<Customer>() { public int compare(...) {...} }`) ලියන්න වුණා. Lines 5ක්, boilerplate ගොඩක්, actual logic එක එක line එකයි. Lambda expressions මේක fix කරනවා — `(a, b) -> ...` කියලා එක line එකකින්. Functional interface (3.1.1) එකක් instant implement කරනවා.',
      },
      {
        heading: 'Lambda syntax + rules',
        body: 'Lambda anatomy:',
        points: [
          '`(params) -> body` — parameters, arrow, body. `c -> c.getSpend() > 1000`.',
          'Single expression → auto return (`a -> a * 2`); block → explicit return (`a -> { ...; return x; }`).',
          'Type inference — parameter types compiler infer කරනවා (`(a, b) ->`, `Customer` ලියන්න ඕන නෑ).',
          'Captured variables **effectively final** වෙන්නම ඕන (lambda එකෙන් පිට local variable එකක් වෙනස් කරන්න බෑ).',
        ],
      },
    ],
    analogy:
      'Long formal letter එකක් (anonymous class) වෙනුවට quick sticky-note එකක් (lambda) — කෙටියෙන් "මේ වැඩේ කරන්න" කියලා behaviour එක ලියනවා. එකම message, අඩු ceremony.',
    code: [
      {
        filename: 'LambdaVsAnonymous.java',
        language: 'java',
        code: `// OLD: anonymous class — boilerplate ගොඩක්
customers.sort(new Comparator<Customer>() {
    public int compare(Customer a, Customer b) {
        return Double.compare(b.getTotalSpend(), a.getTotalSpend());
    }
});

// NEW: lambda — එකම දේ, එක line එකක්
customers.sort((a, b) -> Double.compare(b.getTotalSpend(), a.getTotalSpend()));`,
        note: 'Lambda = functional interface එකක concise implementation.',
      },
      {
        filename: 'LambdaForms.java',
        language: 'java',
        code: `// single expression — auto return
Predicate<Customer> isVip = c -> c.getTotalSpend() > 1000;

// block body — explicit return
Function<Customer, String> tier = c -> {
    if (c.getTotalSpend() > 1000) return "VIP";
    return "Regular";
};

// effectively-final capture
double threshold = 1000;              // (reassign කරන්න බෑ lambda එකෙන් පස්සේ)
Predicate<Customer> above = c -> c.getTotalSpend() > threshold;`,
        note: 'Captured local variables effectively-final වෙන්නම ඕන.',
      },
    ],
    mortar:
      'Mortar analytics code එකේ sorting, filtering, mapping ඔක්කොම lambdas — "top spenders", "churned customers", "spend by country" වගේ logic කෙටියෙන්, read කරන්න ලේසියෙන්. Streams API (3.1.4) එකට lambda foundation එකයි. Anonymous class boilerplate නැති නිසා Mortar data-processing code එක declarative + maintainable.',
    keyPoints: [
      'Lambda = functional interface එකක concise implementation `(params) -> body`.',
      'Behaviour-as-data — functions pass around කරන්න පුළුවන්.',
      'Single expression auto-return; block body explicit return.',
      'Captured variables effectively-final.',
    ],
    pitfalls: [
      'Lambda එකක් ඇතුලේ `this` = enclosing class එක (anonymous class එකේ `this` = anonymous instance එක — වෙනස).',
      'Loop variable එකක් lambda එකකින් capture කරන්න බෑ (effectively-final නෑ) — final copy එකක් හදන්න.',
    ],
  },

  '3.1.3': {
    summary:
      'Method reference (`::`) = lambda එකක් තව කෙටියෙන් — existing method එකකට point කරනවා. Forms 4ක්: `Class::static`, `instance::method`, `Class::instanceMethod`, `Class::new`.',
    sinhala: [
      {
        heading: 'කතාව: lambda එක තව කෙටි කරමු',
        body: 'ඔයාට lambda එකක් තියෙනවා: `c -> c.getEmail()`. මේක හුදෙක් existing method එකක් (`getEmail`) call කරනවා විතරයි. Java කියනවා — "ඔයා method එකක් call කරනවා විතරයි නම්, ඒ method එකට කෙලින්ම point කරන්න පුළුවන්": `Customer::getEmail`. මේකට method reference (`::`) කියනවා. Lambda එකේ තව කෙටි, readable version එකක්.',
      },
      {
        heading: 'Method reference forms 4',
        body: 'වර්ග 4ක්:',
        points: [
          '`Class::staticMethod` — static method (`Integer::parseInt` = `s -> Integer.parseInt(s)`).',
          '`instance::method` — specific object එකක method (`repo::save` = `c -> repo.save(c)`).',
          '`Class::instanceMethod` — first arg එකේ method (`Customer::getEmail` = `c -> c.getEmail()`).',
          '`Class::new` — constructor reference (`Customer::new` = `() -> new Customer()`).',
        ],
      },
    ],
    analogy:
      '"මේ පණිවිඩේ John ට යවන්න" කියලා විස්තර කරනවා (lambda) වෙනුවට, කෙලින්ම John ගේ contact එක tag කරනවා (method reference) වගේ — කෙටියි, පැහැදිලියි, එකම දේ.',
    code: [
      {
        filename: 'MethodRefForms.java',
        language: 'java',
        code: `List<Customer> customers = repo.findAll();

// Class::instanceMethod — c -> c.getEmail()
customers.stream().map(Customer::getEmail);

// instance::method — c -> repo.save(c)
customers.forEach(repo::save);

// Class::staticMethod — s -> Integer.parseInt(s)
Stream.of("1","2","3").map(Integer::parseInt);

// Class::new — constructor reference
Supplier<Customer> factory = Customer::new;
Customer c = factory.get();`,
        note: 'lambda body එක method call එකක් විතරක් නම් → method reference.',
      },
      {
        filename: 'BeforeAfter.java',
        language: 'java',
        code: `// lambda -> method reference (එකම දේ, කෙටියි)
customers.stream()
    .map(c -> c.getEmail())        // lambda
    .map(e -> e.toLowerCase());    // lambda

customers.stream()
    .map(Customer::getEmail)       // method reference
    .map(String::toLowerCase);     // method reference`,
        note: 'c -> c.getEmail()  ⟶  Customer::getEmail',
      },
    ],
    mortar:
      'Mortar stream pipelines වල `Customer::getEmail`, `repo::save`, `this::geocode`, `Customer::new` වගේ method references — enrichment/mapping/collection code එක declarative + tidy. Lambda එකේ තව කෙටි version එක නිසා "noise" අඩු, intent පැහැදිලි. Constructor references (`SegmentDto::new`) DTOs map කරන්නත් common.',
    keyPoints: [
      '4 forms: Class::static, instance::method, Class::instanceMethod, Class::new.',
      'Lambda body එක method call එකක් විතරක් නම් use කරන්න.',
      'Readable + less noise than equivalent lambda.',
      'Constructor references (`Class::new`) factories/mapping වලට.',
    ],
    pitfalls: [
      '`instance::method` (bound) vs `Class::instanceMethod` (unbound) confuse කරන එක — `repo::save` (specific repo) vs `Customer::getEmail` (any customer).',
      'Lambda එකට logic ටිකක් (multiple calls, conditions) තියෙනවා නම් method reference වලට convert කරන්න බෑ.',
    ],
  },

  '3.1.4.1': {
    summary:
      'Streams API = data එකක් හරහා යන declarative pipeline එකක්. `filter` (select), `map` (transform), `flatMap` (flatten nested), `reduce` (fold to one value), `collect` (materialize to List/Set/Map). Intermediate ops lazy; terminal op executes.',
    sinhala: [
      {
        heading: 'කතාව: loops වලට වඩා හොඳ ක්‍රමයක්',
        body: 'Mortar analytics — "spend by country" ගණන් කරන්න. Traditional loop එකකින්: map එකක් හදලා, customers loop කරලා, group කරලා, sum කරලා... lines ගොඩක්, "කොහොමද" කරනවද කියන mechanics වලින් පිරිලා. Streams API එකෙන් — "මොනවද ඕන" කියලා declaratively කියනවා: `filter → group → sum`. කෙටි, read කරන්න ලේසි, compose කරන්න පුළුවන්.',
      },
      {
        heading: 'Stream operations',
        body: 'Pipeline එකේ steps:',
        points: [
          '`filter(predicate)` — condition එකට ගැලපෙන elements තෝරනවා (select).',
          '`map(fn)` — element එකින් එක transform කරනවා (customer → spend).',
          '`flatMap(fn)` — nested structure එකක් flatten කරනවා (list of lists → one list).',
          '`reduce(op)` — ඔක්කොම එක value එකකට fold කරනවා (sum, max).',
          '`collect(collector)` — result එක List/Set/Map එකකට materialize (`Collectors.groupingBy`).',
        ],
      },
      {
        heading: 'Lazy intermediate, eager terminal',
        body: 'Stream ops දෙ වර්ගයක්: **Intermediate** (filter, map, flatMap) — **lazy**, stream එකක් return කරනවා, තාම run වෙන්නෙ නෑ. **Terminal** (collect, reduce, forEach, count) — **eager**, මෙතනදී තමයි whole pipeline එක execute වෙන්නේ. Terminal op එකක් නැත්නම් stream එකක් කිසිවක් කරන්නෙ නෑ.',
      },
    ],
    analogy:
      'Factory conveyor belt එකක් වගේ — raw materials (data) filter station එකෙන් යනවා → shape station (map) → box station (collect). හැම station එකක්ම එක වැඩක්. Belt එක start කරන්නේ (terminal op) අන්තිමට power on කරාම විතරයි.',
    code: [
      {
        filename: 'StreamPipeline.java',
        language: 'java',
        code: `// "spend by country" — declarative, කෙටි
Map<String, Double> spendByCountry = customers.stream()
    .filter(c -> c.getTotalSpend() > 0)              // select
    .collect(Collectors.groupingBy(                  // group + aggregate
        Customer::getCountry,
        Collectors.summingDouble(Customer::getTotalSpend)));

// total revenue
double revenue = customers.stream()
    .mapToDouble(Customer::getTotalSpend)            // map to double
    .sum();                                          // terminal`,
        note: '"මොනවද ඕන" කියනවා — loop mechanics නෑ.',
      },
      {
        filename: 'FilterMapCollect.java',
        language: 'java',
        code: `// VIP customers ලාගේ emails, sorted
List<String> vipEmails = customers.stream()
    .filter(c -> c.getTotalSpend() > 1000)   // intermediate (lazy)
    .map(Customer::getEmail)                  // intermediate (lazy)
    .sorted()                                 // intermediate (lazy)
    .collect(Collectors.toList());            // TERMINAL -> runs pipeline`,
        note: 'Intermediate ops lazy; collect (terminal) එකෙන් execute.',
      },
      {
        filename: 'FlatMapReduce.java',
        language: 'java',
        code: `// flatMap — customer කෙනෙක්ට orders list එකක්; ඔක්කොම orders එකට
List<Order> allOrders = customers.stream()
    .flatMap(c -> c.getOrders().stream())    // list-of-lists -> flat stream
    .collect(Collectors.toList());

// reduce — ඔක්කොම spend එකතු කරනවා
double total = customers.stream()
    .map(Customer::getTotalSpend)
    .reduce(0.0, Double::sum);               // fold to one value`,
        note: 'flatMap = nested flatten; reduce = fold to single value.',
      },
    ],
    mortar:
      'Mortar RFM+T segmentation, "spend by country", "top 10 products", churn breakdowns වගේ analytics streams වලින් — group, sum, sort declarative විදිහට. Loops වලට වඩා clear, composable, bug අඩු. `Collectors.groupingBy` + `summingDouble` වගේ powerful aggregations. Streams parallelize කරන්නත් ලේසි (3.1.4.2). Mortar data-processing code එකේ backbone.',
    keyPoints: [
      'filter (select) / map (transform) / flatMap (flatten) / reduce (fold) / collect (materialize).',
      'Intermediate ops lazy; terminal op (collect/reduce/count) executes pipeline.',
      '`Collectors.groupingBy` / `summingDouble` = powerful aggregations.',
      'Declarative ("what") — loop mechanics ("how") නෑ.',
    ],
    pitfalls: [
      'Terminal op එකක් නැත්නම් stream එක කිසිවක් කරන්නෙ නෑ (lazy).',
      'Stream එකක් reuse කරන්න බෑ (terminal op එකකට පස්සේ) — `IllegalStateException`.',
      'Stream forEach ඇතුලේ shared mutable state modify කරන එක (side effects) — collect use කරන්න.',
    ],
  },

  '3.1.4.2': {
    summary:
      'Parallel streams = `.parallelStream()` / `.parallel()` — data එක common ForkJoinPool එකේ split කරලා multiple cores වල process කරනවා. Large + CPU-bound + stateless වලට හොඳයි; small/IO-bound වලට overhead වැඩි.',
    sinhala: [
      {
        heading: 'කතාව: millions of churn scores compute කරන්න',
        body: 'Mortar millions of customers ට churn scores compute කරන්න ඕන — හැම එකකම CPU-heavy calculation එකක්. Sequential stream එකකින් එක core එකයි වැඩ කරන්නේ, අනිත් cores idle. `.parallelStream()` දැම්මම — Java data එක split කරලා ඔක්කොම CPU cores වල එකවර process කරනවා (multi-core speedup). ඒත් මේක හැම තැනම දාන්න හොඳ නෑ — පරෙස්සම් වෙන්න ඕන.',
      },
      {
        heading: 'කවදා parallel (කවදා නෑ)',
        body: 'Parallel streams වටින්නේ:',
        points: [
          'Large datasets — split කරන overhead එකට වඩා වැඩ ලොකු වෙන්නම ඕන.',
          'CPU-bound + stateless operations — scoring, calculations (IO නෙවෙයි).',
          'නරකයි: small data (overhead > benefit), IO-bound (threads block වෙනවා), ordered/stateful ops.',
          'shared mutable state avoid කරන්නම ඕන (race conditions — parallel threads).',
        ],
      },
    ],
    analogy:
      'ලොකු වැඩක් (data) workers (cores) ගොඩකට බෙදනවා වගේ — ලොකු වැඩ්වලට ලොකු speedup. ඒත් පොඩි වැඩකට "බෙදලා ආයෙ එකතු කරන" වියදම (overhead) වැඩ එකට වඩා වැඩියි — ඒ නිසා පොඩි වැඩ එකෙක්ම කරන එක හොඳයි.',
    code: [
      {
        filename: 'ParallelStream.java',
        language: 'java',
        code: `// millions of customers, CPU-bound scoring -> parallel helps
double totalScore = customers.parallelStream()      // parallel!
    .mapToDouble(this::computeChurnScore)           // stateless, CPU-bound
    .sum();
// Java data එක cores අතර split කරලා parallel process -> multi-core speedup`,
        note: 'Large + CPU-bound + stateless → parallel වටිනවා.',
      },
      {
        filename: 'WhenNotParallel.java',
        language: 'java',
        code: `// BAD: small data — overhead > benefit
List.of(1, 2, 3).parallelStream().map(x -> x * 2);   // sequential හොඳයි

// BAD: shared mutable state — race condition!
List<String> results = new ArrayList<>();
customers.parallelStream().forEach(c -> results.add(c.getEmail()));  //  unsafe!

// GOOD: collect (thread-safe accumulation)
List<String> safe = customers.parallelStream()
    .map(Customer::getEmail).collect(Collectors.toList());`,
        note: 'Shared mutable state parallel එකේ බෑ — collect use කරන්න.',
      },
    ],
    mortar:
      'Mortar millions of customers churn-score / RFM compute කරද්දී `parallelStream` වලින් multi-core throughput — batch analytics jobs වේගවත් වෙනවා. ඒත් IO (DB/API) calls parallel stream වල දාන්නෙ නෑ (common ForkJoinPool block වෙනවා) — ඒවට custom executor + CompletableFuture (2.4.6.2) හෝ virtual threads (3.2.7) prefer. Parallel streams pure CPU-bound, stateless batch computations වලට විතරයි.',
    keyPoints: [
      'Parallel = ForkJoinPool split across cores; large + CPU-bound + stateless වලට.',
      'Small / IO-bound / stateful → sequential හොඳයි.',
      'Shared mutable state = race conditions — collect/reduce use කරන්න.',
      'IO-bound concurrency → CompletableFuture / virtual threads, parallel stream නෙවෙයි.',
    ],
    pitfalls: [
      'Parallel stream common ForkJoinPool එක share කරනවා — IO/blocking tasks දැම්මොත් whole app එකට බලපානවා.',
      '"parallel දාම fast" කියන එක වැරදියි — small/IO data වලට slower. Measure කරන්න.',
    ],
  },

  '3.1.5': {
    summary:
      '`Optional<T>` = value එකක් "තියෙන්න පුළුවන් / නැති වෙන්න පුළුවන්" කියලා **type එකෙන්ම** කියන container එකක් — null return කරනවා වෙනුවට. NullPointerException වළක්වන්න.',
    sinhala: [
      {
        heading: 'කතාව: null එකේ බිලියන් ඩොලර් වැරැද්ද',
        body: 'Mortar `repo.findByEmail(email)` — customer නැත්නම් මොකද return කරන්නේ? null. දැන් caller null check කරන්න අමතක වුනොත් — `NullPointerException` (NPE), production crash. "null" කියන්නේ "value නෑ" ද, "error" ද, "not set" ද — නොපැහැදිලියි. `Optional<T>` මේක fix කරනවා — "value නැති වෙන්න පුළුවන්" කියන එක **return type එකෙන්ම** පැහැදිලි කරනවා, safe handling methods එක්ක.',
      },
      {
        heading: 'Optional operations',
        body: 'Null-safe handling:',
        points: [
          '`Optional.of(x)` / `Optional.empty()` / `Optional.ofNullable(x)` — create.',
          '`map(fn)` / `filter(pred)` — value තියෙනවා නම් transform/filter (නැත්නම් empty).',
          '`orElse(default)` / `orElseGet(supplier)` / `orElseThrow()` — value නැත්නම් fallback.',
          '`ifPresent(consumer)` / `ifPresentOrElse(...)` — value තියෙනවා නම් action.',
          'රීතිය: return types වලට හොඳයි; fields/parameters වලට recommend කරන්නෙ නෑ.',
        ],
      },
    ],
    analogy:
      'තෑග්ග තියෙන්නත් පුළුවන්, නැති වෙන්නත් පුළුවන් box එකක් වගේ. කෙලින්ම අත දානවා (null access) වෙනුවට — "ඇත්නම් මේක කරන්න, නැත්නම් මේ default එක" කියලා safely open කරනවා. Box එක බලන්නෙ නැතුවම දේවල් ගන්න යන එක (null) තමයි NPE.',
    code: [
      {
        filename: 'OptionalBasics.java',
        language: 'java',
        code: `// null වෙනුවට Optional return -> "නැති වෙන්න පුළුවන්" type එකෙන් පැහැදිලි
Optional<Customer> found = repo.findByEmail(email);

// safe chain — null checks නෑ
String country = found
    .map(Customer::getCountry)             // තියෙනවා නම් transform
    .filter(c -> !c.isBlank())             // condition
    .orElse("UNKNOWN");                    // නැත්නම් default (NPE නෑ)

// action if present
found.ifPresentOrElse(
    this::enrich,
    () -> log.warn("not found: " + email)
);`,
        note: 'null check chains වෙනුවට clean, safe pipeline.',
      },
      {
        filename: 'OptionalNotGet.java',
        language: 'java',
        code: `Optional<Customer> c = repo.findByEmail(email);

// BAD: .get() කෙලින්ම — Optional එකේ තේරුමම නැති කරනවා (NPE වගේ)
// Customer x = c.get();     // empty නම් NoSuchElementException!

// GOOD: orElseThrow / orElse
Customer safe = c.orElseThrow(() -> new NotFoundException(email));`,
        note: '.get() කෙලින්ම call එපා — orElse/orElseThrow use කරන්න.',
      },
    ],
    mortar:
      'Mortar enrichment වලදී customer fields (country, phone, gender, churnScore) බොහෝවිට missing. `Optional` වලින් "unknown" gracefully handle කරලා, NPE crashes නැතුව enrichment pipeline එක stable. Repository lookups (`findByEmail`) `Optional<Customer>` return කරලා, caller ට null-safety type එකෙන්ම enforce කරනවා. Spring Data repositories `Optional` return කරන එක standard.',
    keyPoints: [
      'Optional = explicit "maybe value" — NPE වළක්වයි.',
      'map / filter / orElse / orElseThrow / ifPresent — safe handling.',
      'Return types වලට use; fields/parameters වලට නෙවෙයි.',
      'null return කරනවා වෙනුවට Optional (Spring Data standard).',
    ],
    pitfalls: [
      '`optional.get()` කෙලින්ම call = anti-pattern (empty නම් exception). orElse/orElseThrow/ifPresent use කරන්න.',
      'Optional fields / method parameters / collections (`Optional<List>`) — over-use. Return values වලට විතරයි.',
    ],
  },

  '3.1.6': {
    summary:
      '`java.time` (Java 8) = immutable, thread-safe, clear date/time API — පරණ mutable `Date`/`Calendar` වෙනුවට. `LocalDate`, `LocalDateTime`, `Instant`, `ZonedDateTime`, `Duration`/`Period`.',
    sinhala: [
      {
        heading: 'කතාව: පරණ Date එකේ අවුල්',
        body: 'පරණ `java.util.Date`/`Calendar` — mutable (object එක වෙනස් වෙනවා, concurrent bugs), confusing (months 0-indexed!), not thread-safe (`SimpleDateFormat` shared කරොත් crash). Mortar churn prediction එකට "days since last purchase", "predicted churn date" වගේ date math ගොඩක් ඕන — පරණ API එකෙන් bug-prone. Java 8 `java.time` — immutable, thread-safe, clear API එකෙන් මේ ඔක්කොම fix කරනවා.',
      },
      {
        heading: 'ප්‍රධාන types',
        body: 'java.time classes:',
        points: [
          '`LocalDate` — date විතරයි (2026-07-22). `LocalTime` — time විතරයි. `LocalDateTime` — දෙකම (timezone නෑ).',
          '`Instant` — UTC timestamp (machine time — events, logs).',
          '`ZonedDateTime` — date+time+timezone (user-facing, DST-aware).',
          '`Duration` (time-based — hours/seconds) / `Period` (date-based — days/months) — spans.',
          'ඔක්කොම **immutable + thread-safe** — `plusDays()` අලුත් object එකක් return කරනවා.',
        ],
      },
    ],
    analogy:
      'පරණ අවුල් diary එකක් (Date — මකලා ලියන, පිටු අවුල්) වෙනුවට, clean modern calendar app එකක් (java.time) — timezones, reminders, durations ඔක්කොම හරියට, වෙනස් කරන්න බෑ (immutable) නිසා අවුලක් නෑ.',
    code: [
      {
        filename: 'JavaTimeChurn.java',
        language: 'java',
        code: `// churn calculation — clear, immutable, thread-safe
Instant lastPurchase = customer.getLastPurchase();
Instant now = Instant.now();

long daysSince = Duration.between(lastPurchase, now).toDays();
LocalDate predictedChurn = LocalDate.now().plusDays(30);   // අලුත් object

boolean overdue = daysSince > customer.getAvgIntervalDays();`,
        note: 'Immutable + thread-safe — concurrent scoring jobs වල safe.',
      },
      {
        filename: 'TimeTypes.java',
        language: 'java',
        code: `LocalDate today   = LocalDate.now();               // 2026-07-22
LocalDate signup  = LocalDate.of(2025, 1, 15);
Period membership = Period.between(signup, today);  // "1 year, 6 months, ..."

Instant eventTime = Instant.now();                  // UTC timestamp (logs)
ZonedDateTime lk  = ZonedDateTime.now(ZoneId.of("Asia/Colombo")); // user tz

// immutable — plusDays අලුත් object; today වෙනස් වෙන්නෙ නෑ
LocalDate nextWeek = today.plusWeeks(1);`,
        note: 'LocalDate/Instant/ZonedDateTime/Period — right type per need.',
      },
    ],
    mortar:
      'Mortar churn prediction (PROJECT_IDEA 3.2) එකේ "days since last purchase", "predicted churn date", "expected purchase interval" ඔක්කොම `Instant`/`Duration`/`LocalDate` වලින්. Immutable නිසා parallel scoring jobs (3.1.4.2) වල safely share කරනවා — thread-safety නොමිලේ. Events/logs `Instant` (UTC); user-facing dates `ZonedDateTime` (tenant timezone). පරණ Date/Calendar අලුත් code එකේ නෑ.',
    keyPoints: [
      'java.time = immutable + thread-safe + clear (පරණ Date/Calendar වෙනුවට).',
      'LocalDate/LocalDateTime (no tz) / Instant (UTC) / ZonedDateTime (tz).',
      'Duration (time-based) / Period (date-based) = spans.',
      'Immutable — `plusDays()` අලුත් object; concurrent-safe.',
    ],
    pitfalls: [
      'පරණ `Date`/`Calendar`/`SimpleDateFormat` අලුත් code එකේ use කරන්න එපා (mutable, not thread-safe).',
      'Immutable නිසා `date.plusDays(1)` return එක ignore කරොත් වෙනසක් නෑ — `date = date.plusDays(1)`.',
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
