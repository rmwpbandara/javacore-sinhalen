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
      'Java Module System (Project Jigsaw, Java 9) = `module-info.java` එකෙන් module එකක `requires` (dependencies) සහ `exports` (public packages) declare කරනවා. Strong encapsulation + explicit dependencies package මට්ටමින් උඩ.',
    sinhala: [
      {
        heading: 'කතාව: "public" ප්‍රමාණවත් නෑ',
        body: 'Mortar internal library එකක `com.mortar.resolution.internal` package එකේ classes තියෙනවා — ඒවා library එකෙන් පිට use කරන්න ඕන නෑ (internal implementation). ඒත් Java වල `public` class එකක් classpath එකේ ඕන කෙනෙක්ට access කරන්න පුළුවන් — "internal" කියලා hide කරන්න ක්‍රමයක් නෑ package මට්ටමින් උඩ. Java 9 modules මේක fix කරනවා — module එකකින් **export කරන packages විතරයි** පිටතට පේන්නේ.',
      },
      {
        heading: 'module-info.java',
        body: 'Module එකක් define කරන්නේ:',
        points: [
          '`requires X` — මේ module එකට X module එක ඕන (explicit dependency).',
          '`exports pkg` — මේ package එක පිට modules වලට access කරන්න පුළුවන් (public API).',
          'Export නොකරපු packages — module එක ඇතුලේ විතරයි (strong encapsulation, "public" වුනත් hidden).',
          'Benefits: reliable configuration (missing deps startup එකේ fail), smaller runtime (`jlink`), better security.',
        ],
      },
    ],
    analogy:
      'ගොඩනැගිල්ලක security zones වගේ. `exports` = පිටතට open කරන දොරවල් (lobby, reception). `requires` = මේ building එකට ඕන services (electricity, water). Export නොකරපු කාමර (internal packages) — පිටින් කෙනෙක්ට යන්න බෑ, "public" වුනත්.',
    code: [
      {
        filename: 'module-info.java',
        language: 'java',
        code: `module com.mortar.resolution {
    requires com.mortar.core;          // dependency
    requires transitive java.sql;      // මේක use කරන අයටත් java.sql

    exports com.mortar.resolution.api;   // public — පිට modules වලට
    // com.mortar.resolution.internal export නෑ -> hidden (encapsulated)
}`,
        note: 'exports නොකරපු internal packages පිටින් access කරන්න බෑ.',
      },
      {
        filename: 'StrongEncapsulation.java',
        language: 'java',
        code: `// වෙන module එකකින්:
import com.mortar.resolution.api.Resolver;        // ✅ exported
// import com.mortar.resolution.internal.Matcher; //  නෑ! exported නෑ (compile error)

// public class වුනත්, module එකෙන් export නොකළොත් access බෑ`,
        note: 'Module boundary = "public" වලට වඩා strong encapsulation.',
      },
    ],
    mortar:
      'Mortar internal libraries (core, resolution, prediction, activation) modules විදිහට split කරලා, public APIs විතරක් export කරනවා — internal implementation encapsulated, dependencies පැහැදිලියි. ලොකු codebase එකක් managed තියාගන්න, teams අතර clean boundaries. `jlink` වලින් custom minimal runtime (containers — 11.2.1 — වලට smaller images). Microservices (Section 8) module boundaries bounded contexts (8.1.2) එකට align වෙනවා.',
    keyPoints: [
      'module-info.java: `requires` (deps) + `exports` (public packages).',
      'Export නොකරපු packages = hidden (strong encapsulation, "public" වුනත්).',
      'Reliable config (missing deps fail fast) + jlink smaller runtime.',
      'Enterprise/library code වලට වැදගත් (small apps වලට optional).',
    ],
    pitfalls: [
      'Modules adopt කිරීම legacy classpath code එකට disruptive වෙන්න පුළුවන් — gradual migration.',
      'Reflection (frameworks — Spring) modules එක්ක `opens` directive එකක් ඕන (deep reflection access).',
    ],
  },

  '3.2.2': {
    summary:
      '`var` (Java 10) = local variable type inference — compiler right-hand-side එකෙන් type එක infer කරනවා. **Static typing තාම** (dynamic නෙවෙයි); local variables වලට විතරයි.',
    sinhala: [
      {
        heading: 'කතාව: verbose generic types',
        body: 'Mortar analytics code එකේ `Map<String, List<Customer>> byCountry = new HashMap<String, List<Customer>>();` වගේ දිග declarations. Type එක දෙපාරක් — left + right. Repetitive, noisy. Java 10 `var` — `var byCountry = new HashMap<String, List<Customer>>();`. Compiler right-hand-side එකෙන් type එක infer කරනවා. වැදගත්: මේක **dynamic typing නෙවෙයි** — type එක compile-time එකේ fix වෙනවා, වෙනස් වෙන්නෙ නෑ.',
      },
      {
        heading: 'var rules',
        body: 'මතක තියාගන්න:',
        points: [
          'Local variables වලට විතරයි (method body ඇතුලේ) — fields, parameters, return types වලට බෑ.',
          'Initializer එකක් ඕන (`var x;` බෑ — type infer කරන්න value එකක් ඕන).',
          'Static typing තාම — type එක compile-time එකේ fixed (JavaScript `var` වගේ නෙවෙයි).',
          'Type එක right-hand-side එකෙන් **පැහැදිලි** තැන් වල use කරන්න — නැත්නම් explicit type.',
        ],
      },
    ],
    analogy:
      '"මේක Integer එකක්" කියලා ආයෙ නොකියා, "value = 5" කියනවා වගේ — compiler type එක තේරුම් ගන්නවා (5 = int). ඒත් type එක fixed — පස්සේ String එකක් දාන්න බෑ. Context එකෙන් පැහැදිලි නම් අඩුවෙන් ලියනවා.',
    code: [
      {
        filename: 'VarInference.java',
        language: 'java',
        code: `// verbose generic types -> කෙටි (type එක right side එකෙන් පැහැදිලි)
var customers = new ArrayList<Customer>();              // ArrayList<Customer>
var byCountry = new HashMap<String, List<Customer>>(); // less noise

// clean loops
for (var entry : byCountry.entrySet()) {               // Map.Entry<...>
    process(entry.getKey(), entry.getValue());
}

// static typing තාම — type fixed
var count = 5;      // int
// count = "five";  //  compile error (type fixed as int)`,
        note: 'Static typing තාම — type inference විතරයි (dynamic නෙවෙයි).',
      },
      {
        filename: 'VarLimits.java',
        language: 'java',
        code: `var list = new ArrayList<String>();   // ✅ local variable + initializer

// var x;                              //  initializer නෑ
// var y = null;                       //  type infer කරන්න බෑ

// class Field { var f = 1; }          //  fields වලට බෑ
// void m(var p) { }                   //  parameters වලට බෑ`,
        note: 'Local variables + initializer විතරයි.',
      },
    ],
    mortar:
      'Mortar analytics/data-processing code එකේ verbose generic declarations (`Map<String, List<Customer>>`) `var` වලින් කෙටි කරලා readability වැඩි කරනවා — type එක right-hand-side එකෙන් පැහැදිලි තැන් වල. Stream pipelines, loops වල clean. ඒත් type එක obvious නොවෙන තැන් (`var result = service.process();`) explicit type — code clarity එකට. Balanced use.',
    keyPoints: [
      '`var` = compile-time type inference (dynamic නෙවෙයි — static typing තාම).',
      'Local variables only (initializer ඕන).',
      'Type right-hand-side එකෙන් පැහැදිලි නම් use; නැත්නම් explicit type.',
      'Verbose generics කෙටි කරලා readability වැඩි කරයි.',
    ],
    pitfalls: [
      'Type එක obvious නොවෙන තැන් වල `var` overuse කරොත් readability අඩු වෙනවා (`var x = getThing();` — x මොකක්ද?).',
      '`var` fields/parameters/return types වලට බෑ — local variables විතරයි.',
    ],
  },

  '3.2.3': {
    summary:
      'Records (Java 14+) = immutable data carriers — `record Point(int x, int y) {}` එකෙන් constructor, accessors, `equals`, `hashCode`, `toString` **auto-generated**. DTOs, value objects වලට perfect.',
    sinhala: [
      {
        heading: 'කතාව: DTO එකකට boilerplate 50 lines',
        body: 'Mortar API එකකට `SegmentDto` (id, name, count) වගේ simple data class එකක් ඕන. Traditional විදිහට — fields, constructor, getters 3ක්, `equals`, `hashCode`, `toString` — lines 50ක් boilerplate, actual data එක lines 3යි. Java 14 `record` — `record SegmentDto(String id, String name, long count) {}` — එක line එකක. Compiler ඉතුරු ඔක්කොම (constructor, accessors, equals/hashCode/toString) auto-generate කරනවා.',
      },
      {
        heading: 'Records වල features',
        body: 'Record එකකින් auto-generated:',
        points: [
          'Fields (components) — `private final` (immutable).',
          'Canonical constructor — components ඔක්කොම parameters විදිහට.',
          'Accessors — `name()` (getName() නෙවෙයි — component නමම).',
          '`equals`/`hashCode` — components මත based (value equality); `toString` — readable.',
          'Compact constructor එකෙන් validation දාන්න පුළුවන්.',
        ],
      },
    ],
    analogy:
      'Form template එකක් වගේ — fields මොනවද කිව්වම (id, name, count), ඉතුරු ඔක්කොම (print layout = toString, compare = equals) auto-fill වෙනවා. ඔයා data එක define කරනවා විතරයි; ceremony compiler කරනවා.',
    code: [
      {
        filename: 'RecordBasics.java',
        language: 'java',
        code: `// එක line — constructor, accessors, equals/hashCode/toString auto
public record SegmentDto(String id, String name, long profileCount) {}

var dto = new SegmentDto("s1", "VIP", 1200);
System.out.println(dto.name());        // "VIP" — auto accessor (getName() නෙවෙයි)
System.out.println(dto);               // SegmentDto[id=s1, name=VIP, ...] — auto toString

var same = new SegmentDto("s1", "VIP", 1200);
System.out.println(dto.equals(same));  // true — value equality (auto equals)`,
        note: 'record = immutable + equals/hashCode/toString නොමිලේ.',
      },
      {
        filename: 'RecordValidation.java',
        language: 'java',
        code: `public record Money(double amount, String currency) {
    // compact constructor — validation
    public Money {
        if (amount < 0) throw new IllegalArgumentException("negative amount");
        if (currency == null) throw new IllegalArgumentException("currency null");
        // fields auto-assign වෙනවා මෙතනට පස්සේ
    }

    // extra methods දාන්නත් පුළුවන්
    public Money add(Money o) { return new Money(amount + o.amount, currency); }
}`,
        note: 'Compact constructor = validation/normalization.',
      },
    ],
    mortar:
      'Mortar REST API DTOs (`SegmentDto`, `CustomerSummary`, `ChurnResult`), value objects (`Money`, `RfmScore`), events (`CustomerResolvedEvent` — 8.3.2) records විදිහට — immutable, concise, safe. `equals`/`hashCode` auto නිසා caching, dedup, map keys වලටත් හොඳයි. Immutable නිසා concurrent code (2.4) වල safely share. Boilerplate 90% අඩු — Mortar codebase clean.',
    keyPoints: [
      'record = immutable data carrier — constructor/accessors/equals/hashCode/toString auto.',
      'Accessors component-named (`name()`, getName() නෙවෙයි).',
      'Compact constructor = validation/normalization.',
      'DTOs / value objects / events වලට ideal.',
    ],
    pitfalls: [
      'Records immutable — mutable data ("setter" ඕන) වලට record නෙවෙයි.',
      'Record component එකක් mutable object එකක් (List) නම්, defensive copy කරන්න (record shallow immutable).',
    ],
  },

  '3.2.4': {
    summary:
      'Text blocks (Java 15+) = `"""..."""` multi-line string literals — JSON, SQL, HTML clean විදිහට, escape (`\\n`, `\\"`) නැතුව. Indentation auto-managed.',
    sinhala: [
      {
        heading: 'කතාව: SQL query එකක් String එකේ ලියන අවුල',
        body: 'Mortar analytics query එකක් String එකේ ලියන්න ඕන. Traditional විදිහට — `"SELECT country, SUM(spend) " + "FROM customers " + "WHERE brand_id = ? "` වගේ concatenation, `\\n` escapes, quotes escape... unreadable, error-prone. Java 15 text blocks — `"""` වලින් multi-line string එකක් කෙලින්ම, escaping නැතුව. SQL/JSON/HTML readable විදිහට.',
      },
      {
        heading: 'Text block features',
        body: 'මතක තියාගන්න:',
        points: [
          '`"""` වලින් පටන්, `"""` වලින් ඉවර — අතරේ multi-line content.',
          'Escaping නෑ — `"`, newlines කෙලින්ම (SQL/JSON quotes clean).',
          'Indentation auto-strip — closing `"""` එකේ position එකට relative.',
          'Variables interpolation නෑ (Java) — `.formatted(...)` හෝ concatenation use කරන්න.',
        ],
      },
    ],
    analogy:
      'එක පේළියෙ දිග, escape-වලින් පිරුණු string එකක් වෙනුවට, notebook එකක කොළයක ලියනවා වගේ — pretty, read කරන්න ලේසි, මොකද තියෙන්නේ කියලා පැහැදිලි.',
    code: [
      {
        filename: 'TextBlocks.java',
        language: 'java',
        code: `// SQL — escaping/concatenation නෑ, readable
String query = """
    SELECT country, SUM(total_spend) AS revenue
    FROM customers
    WHERE brand_id = ?
    GROUP BY country
    ORDER BY revenue DESC
    """;

// JSON — quotes escape කරන්න ඕන නෑ
String payload = """
    { "segment": "VIP", "destination": "meta", "count": 1200 }
    """;`,
        note: 'Multi-line, no escaping — SQL/JSON readable.',
      },
      {
        filename: 'TextBlockFormat.java',
        language: 'java',
        code: `// variables -> .formatted() (interpolation නෑ Java වල)
String prompt = """
    Analyze the customer segment "%s".
    It has %d profiles with avg spend %.2f.
    """.formatted(segmentName, count, avgSpend);`,
        note: 'Values inject කරන්න .formatted() use කරන්න.',
      },
    ],
    mortar:
      'Mortar native SQL/JPQL queries (7.4.6), AI Copilot / Helix prompt templates (PROJECT_IDEA 9), JSON payloads (connector requests, webhook bodies) text blocks වලින් — read/maintain කරන්න ලේසි, escaping bugs නෑ. Copilot prompts (multi-paragraph instructions) text blocks + `.formatted()` වලින් clean. Config templates, test fixtures වලටත් හොඳයි.',
    keyPoints: [
      '`""" ... """` = multi-line string, escaping නෑ.',
      'SQL/JSON/HTML/prompts readable විදිහට.',
      'Indentation auto-managed (closing `"""` position relative).',
      'Variables → `.formatted(...)` (interpolation නෑ).',
    ],
    pitfalls: [
      'Java text blocks වල string interpolation (`${var}`) නෑ — `.formatted()` හෝ concat use කරන්න.',
      'Closing `"""` indentation එක output indentation එකට බලපානවා — align කරන්න.',
    ],
  },

  '3.2.5': {
    summary:
      'Pattern matching: `instanceof` pattern (Java 16) — check + cast + bind එකපාරට. `switch` patterns (Java 21) — type/shape අනුව branch + deconstruct. Verbose casting code අඩු කරනවා.',
    sinhala: [
      {
        heading: 'කතාව: check කරලා ආයෙ cast කරන double-work',
        body: 'Mortar event pipeline එකේ `Object event` එකක් තියෙනවා. Traditional විදිහට — `if (event instanceof PurchaseEvent) { PurchaseEvent p = (PurchaseEvent) event; ... }` — check කරලා, ආයෙ cast කරලා, variable එකක් හදනවා. Repetitive. Java 16 `instanceof` pattern — `if (event instanceof PurchaseEvent p)` — check + cast + bind එකපාරට. Java 21 switch patterns මේක තව powerful කරනවා.',
      },
      {
        heading: 'Pattern matching forms',
        body: 'දෙ ආකාරයක්:',
        points: [
          'instanceof pattern (Java 16): `if (o instanceof Customer c)` — o Customer නම්, c කියලා typed variable එකක් bind.',
          'switch pattern (Java 21): `case PurchaseEvent p ->` — type අනුව branch, p bound.',
          'Record deconstruction: `case Point(int x, int y) ->` — components කෙලින්ම extract.',
          'Guards: `case Customer c when c.spend() > 1000 ->` — extra condition.',
        ],
      },
    ],
    analogy:
      '"මේක Customer එකක්ද? නම් c කියලා use කරන්න" කියලා එක step එකෙන් (pattern matching) — check කරලා ආයෙ cast කරන double-work නෑ. Mail sorting වගේ — "මේක bill එකක් නම් මේ ගොඩට, letter එකක් නම් අර ගොඩට" (switch patterns).',
    code: [
      {
        filename: 'InstanceofPattern.java',
        language: 'java',
        code: `Object event = nextEvent();

// OLD: check + cast + variable (double-work)
// if (event instanceof PurchaseEvent) {
//     PurchaseEvent p = (PurchaseEvent) event;
//     record(p.amount());
// }

// NEW: instanceof pattern — check + cast + bind එකපාරට
if (event instanceof PurchaseEvent p) {   // p already typed + bound
    record(p.amount());
}`,
        note: 'Check + cast + bind එකපාරට — casting boilerplate නෑ.',
      },
      {
        filename: 'SwitchPattern.java',
        language: 'java',
        code: `// switch pattern (Java 21) — type අනුව branch, deconstruct, guards
String label = switch (event) {
    case PurchaseEvent p when p.amount() > 1000 -> "big spender";  // guard
    case PurchaseEvent p -> "spent " + p.amount();
    case ChurnEvent c    -> "churn risk " + c.score();
    case null            -> "no event";
    default              -> "unknown";
};`,
        note: 'switch + patterns + guards = concise, type-safe branching.',
      },
    ],
    mortar:
      'Mortar event-driven pipeline (8.3.3) එකේ heterogeneous events (Purchase, Churn, Sync, Resolution) pattern-matching switch එකකින් handle කරනවා — type-safe, concise, sealed event hierarchy (3.2.6) එක්ක exhaustive (හැම case එකම handle කරලාද compiler verify). Copilot response types, DSP audience shapes වගේ tagged data pattern matching වලින්. Verbose `instanceof` + cast ladders අතීතයට.',
    keyPoints: [
      'instanceof pattern (Java 16) = check + cast + bind එකපාරට.',
      'switch patterns (Java 21) = type-based branching + deconstruction + guards.',
      'Records + sealed types (3.2.6) එක්ක exhaustive switches.',
      'Casting boilerplate + if-instanceof ladders අඩු කරයි.',
    ],
    pitfalls: [
      'Pattern variable scope — `if (o instanceof C c)` වල c true-branch එකට විතරයි.',
      'switch pattern exhaustiveness sealed types (3.2.6) එක්ක විතරයි compiler-guaranteed (නැත්නම් default ඕන).',
    ],
  },

  '3.2.6': {
    summary:
      'Sealed classes (Java 17) = `sealed ... permits A, B, C` වලින් type එකක් extend/implement කරන්න පුළුවන් **කවුද** කියලා restrict කරනවා — controlled, closed hierarchies. Exhaustive switches (3.2.5) වලට පදනම.',
    sinhala: [
      {
        heading: 'කතාව: segment types 7ක් — වැඩිත් නෑ, අඩුත් නෑ',
        body: 'Mortar වල behavioural segments හරියටම 7ක් තියෙනවා (VIP, Committed, Dormant...). මේ hierarchy එක "closed" — random කෙනෙක්ට අලුත් Segment subtype එකක් හදන්න දෙන්න ඕන නෑ. තව, switch එකක segments handle කරද්දී — අලුත් segment එකක් add කලොත් "මේකත් handle කරන්න" කියලා compiler එකෙන් force කරන්න ඕන. Normal class/interface වලට මේක බෑ (ඕන කෙනෙක්ට extend කරන්න පුළුවන්). ඒකට `sealed`.',
      },
      {
        heading: 'Sealed rules',
        body: 'මතක තියාගන්න:',
        points: [
          '`sealed interface X permits A, B, C` — X implement කරන්න පුළුවන් A, B, C විතරයි (closed set).',
          'Permitted subtypes `final`, `sealed`, හෝ `non-sealed` වෙන්නම ඕන (further extension control).',
          'switch එකක permits ඔක්කොම handle කලොත් — exhaustive (default ඕන නෑ, compiler verify).',
          'අලුත් subtype එකක් add කලොත් — switches වල compile error ("මේකත් handle කරන්න") — safety.',
        ],
      },
    ],
    analogy:
      'Guest list එකක් වගේ — "මේ අයට විතරයි ඇතුල් වෙන්න පුළුවන්" (permits). හැම possibility එකම දන්නවා. අලුත් කෙනෙක් list එකට add කලොත්, security (compiler) කියනවා "මේ අලුත් කෙනාට මොකද කරන්නේ කියලා decide කරන්න".',
    code: [
      {
        filename: 'SealedSegments.java',
        language: 'java',
        code: `// closed hierarchy — permits ලැයිස්තුවේ ඒවා විතරයි implement කරන්න පුළුවන්
public sealed interface Segment permits Vip, Committed, Dormant {}

public record Vip(double spend) implements Segment {}
public record Committed(int orders) implements Segment {}
public record Dormant(long daysIdle) implements Segment {}
// වෙන කෙනෙක්ට Segment implement කරන්න බෑ (closed)`,
        note: 'permits = closed set of subtypes.',
      },
      {
        filename: 'ExhaustiveSwitch.java',
        language: 'java',
        code: `// sealed + switch pattern = exhaustive (default ඕන නෑ)
String action = switch (segment) {
    case Vip v       -> "reward " + v.spend();
    case Committed c -> "upsell";
    case Dormant d   -> "win-back";
    // permits ඔක්කොම handle කරා -> default ඕන නෑ (compiler verify)
};
// අලුත් segment එකක් (Lapsed) add කලොත් -> මෙතන compile error!`,
        note: 'permits list fixed → switch exhaustive → අලුත් case එකක් "force" වෙනවා.',
      },
    ],
    mortar:
      'Mortar 7 behavioural segments (VIP, Committed, Dormant, New, One-Off, Lapsed, Sporadic-VIP — PROJECT_IDEA 3.1) `sealed` hierarchy එකක් — අලුත් segment එකක් add කලොත් handling code එකේ compile error එකෙන් "මේකත් handle කරන්න" කියලා ensure කරනවා (missed cases නෑ). Churn statuses (Active/Soft/Hard), event types, Copilot response variants වගේ closed sets sealed types වලින් model කරලා, exhaustive pattern matching (3.2.5) — type-safe domain modelling.',
    keyPoints: [
      '`sealed ... permits` = closed set of subtypes.',
      'Permitted subtypes final/sealed/non-sealed වෙන්නම ඕන.',
      'Exhaustive switches (compiler-verified — default ඕන නෑ).',
      'අලුත් subtype = switches වල compile error (safety).',
    ],
    pitfalls: [
      'Permitted subtypes එකම module/package එකේ (හෝ same file) වෙන්නම ඕන.',
      'Sealed hierarchy වෙනස් කරන එක (subtype add) downstream switches ඔක්කොම update කරන්න force කරනවා — closed නිසාම.',
    ],
  },

  '3.2.7': {
    summary:
      'Virtual threads (Project Loom, Java 21) = lightweight threads **millions ගණන්** run කරන්න පුළුවන් — high-concurrency IO cheaply. Blocking IO වලදී carrier thread එක free වෙනවා. "thread-per-request" simple style එකෙන් massive scale.',
    sinhala: [
      {
        heading: 'කතාව: millions of API calls',
        body: 'Mortar enrichment එකට millions of customers external APIs (geocode, email-validate) call කරන්න ඕන — හැම එකක්ම IO-bound (network එකට බලාගෙන). Platform threads (OS threads) expensive — thousands විතරයි හදන්න පුළුවන් (memory). Pool එකකින් millions of blocking calls කරන්න බෑ (threads block වෙලා idle). Java 21 virtual threads — JVM-managed, super lightweight, **millions** හදන්න පුළුවන්. Blocking call එකකදී virtual thread එක "unmount" වෙලා OS thread එක free කරනවා.',
      },
      {
        heading: 'Virtual threads වැඩ කරන විදිහ',
        body: 'තේරුම්ගන්න:',
        points: [
          'Platform thread = OS thread (expensive, ~thousands limit, MB stack).',
          'Virtual thread = JVM-managed, cheap (~millions, KB), few carrier OS threads මත run.',
          'Blocking IO call එකකදී — virtual thread එක carrier එකෙන් unmount වෙනවා, carrier එක වෙන virtual thread එකකට free.',
          '"thread-per-request/task" simple blocking code එකෙන් massive concurrency — thread-pool tuning අවුල් නෑ.',
        ],
      },
    ],
    analogy:
      'Expensive full-time employees (platform threads) — company එකට කීදෙනෙක් තියාගන්න පුළුවන්ද සීමිතයි. Virtual threads = ඕන තරම් cheap freelancers — කෙනෙක් break එකක් (blocking IO) ගත්තම desk එක (carrier thread) වෙන කෙනෙකුට. Desks ටිකයි, freelancers මිලියන ගණන්.',
    code: [
      {
        filename: 'VirtualThreads.java',
        language: 'java',
        code: `// millions of IO-bound tasks — virtual threads cheaply
try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
    for (Customer c : millionsOfCustomers) {
        executor.submit(() -> {
            var geo = geocodeApi(c.getAddress());   // blocking IO — cheap here!
            var valid = validateEmail(c.getEmail()); // blocking IO
            repo.save(enrich(c, geo, valid));
        });
    }
}   // ඔක්කොම virtual threads complete වෙනකම් (auto)`,
        note: 'Blocking IO tasks දහස්/ලක්ෂ ගණන් — thread-per-task, cheap.',
      },
      {
        filename: 'CreateVirtualThread.java',
        language: 'java',
        code: `// single virtual thread
Thread.ofVirtual().start(() -> System.out.println("virtual!"));

// platform (OS) thread — expensive, few
Thread.ofPlatform().start(() -> System.out.println("platform"));`,
        note: 'Thread.ofVirtual() = cheap; ofPlatform() = OS thread.',
      },
    ],
    mortar:
      'Mortar millions of customers external APIs (geocode, email-validate, gender-inference — PROJECT_IDEA 2.4) call කරන IO-bound enrichment වලට virtual threads — thread-per-task simple blocking code එකෙන් huge concurrency, thread-pool sizing අවුල් නැතුව. Connector syncs, webhook handlers වගේ IO-heavy work virtual threads වලින් scale. CPU-bound work (churn scoring — 3.1.4.2) වලට platform threads/parallel streams තාම හොඳයි (virtual threads IO වලට).',
    keyPoints: [
      'Virtual threads = lightweight, millions scale (platform threads thousands).',
      'Blocking IO වලදී carrier OS thread free වෙනවා (unmount).',
      'IO-bound / thread-per-request වලට ideal — pool tuning අවුල් නෑ.',
      'CPU-bound වලට platform threads / parallel streams තාම හොඳයි.',
    ],
    pitfalls: [
      'CPU-bound work virtual threads වලින් speedup නෑ (cores සීමිතයි) — IO-bound වලට විතරයි.',
      'synchronized blocks ඇතුලේ දිග blocking = carrier thread "pin" වෙනවා (unmount නෑ) — ReentrantLock prefer.',
    ],
  },
};
