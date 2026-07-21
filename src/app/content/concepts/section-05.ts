import { Concept } from '../../core/models/roadmap.model';

/** Section 5 — Software Design Principles & Patterns. */
export const SECTION_05: Record<string, Concept> = {
  '5.1.1': {
    summary: 'SRP: class එකකට reason-to-change එකයි විතරයි — එක responsibility.',
    sinhala: [
      {
        heading: 'One reason to change',
        body: 'Single Responsibility Principle — class/module එකකට වගකීමක් (responsibility) එකයි විතරයි වෙන්න ඕන. එක class එකක් ගොඩක් දේවල් කලොත් (fetch + validate + save + email), එකක් වෙනස් කරනකොට අනිත්වා කැඩෙනවා. Split කරලා cohesion වැඩි කරනවා.',
      },
    ],
    analogy: 'Restaurant එකේ chef උයනවා, waiter serve කරනවා, cashier bill කරනවා — එක්කෙනා ඔක්කොම කලොත් අවුල්.',
    code: [
      {
        filename: 'SRP.java',
        language: 'java',
        code: `// BAD: one class does everything
// class CustomerService { fetch(); validate(); save(); sendEmail(); }

// GOOD: split responsibilities
class CustomerRepository { void save(Customer c) {} }
class EmailValidator    { boolean valid(String e) { return e.contains("@"); } }
class NotificationService { void welcome(Customer c) {} }`,
        note: 'එක්කෙනෙකුට එක වැඩක් — වෙනස්කම් isolated.',
      },
    ],
    mortar:
      'Mortar CDP pipeline එකේ ingestion, resolution, enrichment, activation වෙන වෙනම components — හැම එකකටම එක responsibility. Resolution logic වෙනස් කලාට activation කැඩෙන්නෙ නෑ.',
    keyPoints: ['One class = one reason to change.', 'High cohesion, low coupling.', 'Easier testing + maintenance.'],
  },

  '5.1.2': {
    summary: 'OCP: extension එකට open, modification එකට closed — නව behaviour add කරන්න existing code edit කරන්නෙ නෑ.',
    sinhala: [
      {
        heading: 'Open for extension',
        body: 'Open/Closed Principle — නව feature එකක් add කරනකොට existing (tested) code වෙනස් නොකර, extension (new class/strategy) එකෙන් කරන්න ඕන. Abstractions (interfaces) + polymorphism වලින් achieve කරනවා. Regressions අඩු.',
      },
    ],
    analogy: 'Power strip එකක් වගේ — නව device එකක් plug කරන්න strip එක නැවත wire කරන්නෙ නෑ, socket එකට plug කරනවා.',
    code: [
      {
        filename: 'OCP.java',
        language: 'java',
        code: `interface Connector { void sync(); }
// add a new source = add a new class, don't edit existing ones
class ShopifyConnector implements Connector { public void sync() {} }
class TikTokConnector  implements Connector { public void sync() {} } // NEW

class SyncEngine {                    // never changes
    void run(List<Connector> cs) { cs.forEach(Connector::sync); }
}`,
        note: 'නව connector = නව class; SyncEngine එක untouched.',
      },
    ],
    mortar:
      'Mortar "extensible connector framework" (PROJECT_IDEA 1.2) OCP එකේම example — නව platform එකක් `Connector` interface එක implement කරලා add කරනවා, core sync engine එක වෙනස් නොකර.',
    keyPoints: ['Open to extend, closed to modify.', 'Interfaces + polymorphism.', 'නව behaviour = නව code, not edits.'],
  },

  '5.1.3': {
    summary: 'LSP: subclass එකක් superclass එකේ තැනට හරියටම fit වෙන්න ඕන — behaviour break නොකර.',
    sinhala: [
      {
        heading: 'Substitutability',
        body: 'Liskov Substitution — parent type එකක් expect කරන තැනකට child type එකක් දැම්මම program එක හරියට වැඩ කරන්නම ඕන. Child එකක් parent contract එක break කලොත් (exceptions, weaker guarantees) LSP violate. Inheritance එක "IS-A behaviourally" වෙන්නම ඕන.',
      },
    ],
    analogy: 'හැම Connector එකක්ම sync() promise එක keep කරන්නම ඕන — "sync කරන්නෙ නෑ" කියන connector එකක් LSP කඩනවා.',
    code: [
      {
        filename: 'LSP.java',
        language: 'java',
        code: `interface AudienceSink { void push(List<String> ids); }

// GOOD: honours the contract everywhere
class MetaSink implements AudienceSink { public void push(List<String> ids) {} }

// BAD (LSP violation): throws for valid input the base promised to accept
class ReadOnlySink implements AudienceSink {
    public void push(List<String> ids) { throw new UnsupportedOperationException(); }
}`,
        note: 'Subtype එකක් contract එක break කලොත් callers කැඩෙනවා.',
      },
    ],
    mortar:
      'Mortar activation destinations (Meta, Google, Klaviyo) ඔක්කොම `AudienceSink` contract එක fully honour කරන්නම ඕන — scheduler එක type එක බලන්නෙ නැතුව හැම එකකම `push()` call කරන නිසා. LSP break වුනොත් syncs silently fail.',
    keyPoints: ['Subtype = drop-in for supertype.', 'Contracts/invariants preserve.', 'Broken LSP = polymorphism bugs.'],
  },

  '5.1.4': {
    summary: 'ISP: fat interfaces වෙනුවට කුඩා, focused interfaces — clients ට ඕන methods විතරයි.',
    sinhala: [
      {
        heading: 'No fat interfaces',
        body: 'Interface Segregation — client එකකට ඕන නැති methods implement කරන්න බල කරන්න එපා. ලොකු "do-everything" interface එකක් කුඩා role-based interfaces වලට split කරන්න. Implementers ට unnecessary methods (empty/throw) නෑ.',
      },
    ],
    analogy: 'Universal remote එකක බොත්තම් 100ක් වගේ — TV එකට ඕන 5යි. කුඩා focused remotes හොඳයි.',
    code: [
      {
        filename: 'ISP.java',
        language: 'java',
        code: `// BAD: one fat interface forces unused methods
// interface DataSource { sync(); export(); schedule(); geocode(); }

// GOOD: small role interfaces, mix as needed
interface Syncable   { void sync(); }
interface Exportable { void export(); }

class ShopifyConnector implements Syncable, Exportable {
    public void sync() {} public void export() {}
}`,
        note: 'Client එකට ඕන roles විතරයි implement කරන්නේ.',
      },
    ],
    mortar:
      'Mortar connectors capabilities වෙනස් (සමහරු export පුළුවන්, සමහරු schedule). `Syncable`, `Exportable`, `Schedulable` කුඩා interfaces mix කරලා, connector එකකට ඕන roles විතරයි — empty method stubs නෑ.',
    keyPoints: ['කුඩා, focused, role-based interfaces.', 'Clients unused methods force කරන්නෙ නෑ.', 'Mix small interfaces > one fat one.'],
  },

  '5.1.5': {
    summary: 'DIP: high-level modules low-level details මත depend නොවී, දෙකම abstractions මත depend වෙන්න ඕන.',
    sinhala: [
      {
        heading: 'Depend on abstractions',
        body: 'Dependency Inversion — high-level policy (business logic) low-level implementation (DB, API) මත කෙලින්ම depend නොවී interface එකක් මත depend වෙන්න ඕන. Concrete dependencies inject කරනවා (DI). ඒ නිසා implementations swap කරන්න, test කරන්න ලේසි. Spring IoC එකේ පදනම.',
      },
    ],
    analogy: 'Laptop එකක් specific brand charger එකකට hard-wire නොකර, USB-C port (abstraction) එකකට — ඕන charger එකක් plug කරන්න පුළුවන්.',
    code: [
      {
        filename: 'DIP.java',
        language: 'java',
        code: `interface CustomerRepository { void save(Customer c); }   // abstraction

class ResolutionService {                 // high-level policy
    private final CustomerRepository repo; // depends on abstraction
    ResolutionService(CustomerRepository repo) { this.repo = repo; } // injected
    void resolve(Customer c) { repo.save(c); }
}
// swap PostgresRepo / InMemoryRepo (tests) without touching ResolutionService`,
        note: 'Concrete DB එකට නෙවෙයි, interface එකට depend.',
      },
    ],
    mortar:
      'Mortar resolution/prediction services `Repository`/`DataSource` interfaces මත depend කරනවා, concrete Postgres/S3 implementations inject කරනවා. Unit tests වලදී in-memory fakes inject කරන්න පුළුවන්. Spring DI (6.1.2) මේකෙන්ම එනවා.',
    keyPoints: ['High + low level දෙකම abstractions මත depend.', 'Concrete deps inject (DI).', 'Swap/test ලේසි — Spring IoC පදනම.'],
  },

  '5.2.1': {
    summary: 'DRY: එකම logic එක තැන් කිහිපයක repeat නොකර, එක තැනකට extract කරන්න.',
    sinhala: [
      {
        heading: "Don't Repeat Yourself",
        body: 'එකම knowledge/logic copy-paste කලොත්, වෙනස් කරනකොට හැම copy එකම update කරන්න ඕන — bugs. Common logic method/class එකකට extract කරලා single source of truth එකක්. ඒත් over-abstraction (unrelated දේවල් force-share) වළක්වන්න.',
      },
    ],
    analogy: 'Contact number එක තැන් 10ක ලිව්වොත්, change වුනොත් 10ම update කරන්න ඕන — එක තැනක තියාගන්න.',
    code: [
      {
        filename: 'DRY.java',
        language: 'java',
        code: `// BAD: same validation copy-pasted in every connector
// GOOD: one shared helper
class Validators {
    static boolean isValidEmail(String e) {
        return e != null && e.contains("@") && e.contains(".");
    }
}
// every connector calls Validators.isValidEmail(...)`,
        note: 'Single source of truth — වෙනස් කරන්නෙ එක තැනක.',
      },
    ],
    mortar:
      'Mortar email validation, retry logic, date formatting වගේ දේවල් shared utilities/base classes වල — connectors 15ක duplicate නෑ. Rule එකක් වෙනස් වුනොත් එක තැනක.',
    keyPoints: ['Logic එක තැනක (single source of truth).', 'Extract common code.', 'Over-DRY (force-sharing) වළක්වන්න.'],
  },

  '5.2.2': {
    summary: 'KISS: simplest working solution එක — unnecessary complexity වළක්වන්න.',
    sinhala: [
      {
        heading: 'Keep It Simple',
        body: 'Clever/over-engineered code එකට වඩා simple, readable code එක හොඳයි — maintain, debug, onboard කරන්න ලේසි. Requirement එකට ඕන අවම complexity. "මේක fancy design pattern එකකින් කරන්නද?" කලින් "සරලම ක්‍රමය මොකක්ද?" අහන්න.',
      },
    ],
    analogy: 'ඉස්කුරුප්පුවක් ගහන්න screwdriver එකක් ඇති — robot arm එකක් ඕන නෑ.',
    code: [
      {
        filename: 'KISS.java',
        language: 'java',
        code: `// over-engineered: reflection + strategy factory for a 3-branch check
// simple + clear:
String tier(double spend) {
    if (spend > 1000) return "VIP";
    if (spend > 100)  return "Regular";
    return "New";
}`,
        note: 'Requirement එකට ගැලපෙන සරලම විසඳුම.',
      },
    ],
    mortar:
      'Mortar segment thresholds වගේ simple rules over-abstract කරන්නෙ නෑ — clear if/switch. Complexity add කරන්නෙ ඇත්තටම ඕන වුනොත් විතරයි (scale/variation එද්දී).',
    keyPoints: ['Simplest solution that works.', 'Readable > clever.', 'Complexity = cost — justify කරන්න.'],
  },

  '5.2.3': {
    summary: 'YAGNI: දැන් ඕන නැති features කලින්ම හදන්න එපා — ඕන වුනාම හදන්න.',
    sinhala: [
      {
        heading: "You Aren't Gonna Need It",
        body: '"අනාගතේ ඕන වෙයි" කියලා speculative features/abstractions කලින් හදන එකෙන් — wasted effort, complexity, maintenance. Actual requirement එකක් එනකම් ඉන්න. Present needs වලට build කරන්න, extensible ඒත් over-built නොවී.',
      },
    ],
    analogy: 'තනි කෙනෙක්ට කෑම හදනකොට කසාද ගෙදරක් වගේ kitchen එකක් හදන්නෙ නෑ.',
    code: [
      {
        filename: 'YAGNI.java',
        language: 'java',
        code: `// YAGNI violation: building 10 export formats when only CSV is needed
// interface Exporter { void toCsv(); toXml(); toParquet(); toAvro(); ... }

// just what's needed now:
class CsvExporter { void export(List<Customer> c) { /* CSV only */ } }`,
        note: 'ඕන වුනාම XML/Parquet add කරන්න — දැන් නෙවෙයි.',
      },
    ],
    mortar:
      'Mortar MVP එකේ CSV + DSP exports විතරයි ඕන නම්, ඔක්කොම possible formats කලින් build කරන්නෙ නෑ. Extensible design තියාගෙන, actual demand එද්දී add කරනවා.',
    keyPoints: ['Speculative features build කරන්න එපා.', 'Present requirements වලට code.', 'Extensible but not over-built.'],
  },

  '5.3.1.1': {
    summary: 'Singleton = class එකකට instance එකයි විතරයි, global access point එකක්. Thread-safe වෙන්න ඕන.',
    sinhala: [
      {
        heading: 'One instance',
        body: 'Shared resource එකක් (config, connection pool) සඳහා instance එකයි විතරයි ensure කරනවා. Thread-safe implementations: eager init, enum singleton (best), හෝ double-checked locking (`volatile` + synchronized). Overuse කලොත් global state (testing අමාරු) — පරෙස්සමින්.',
      },
    ],
    analogy: 'රටකට එක president කෙනෙක් වගේ — කීදෙනෙක් ඉල්ලුවත්, එකම instance එකයි.',
    code: [
      {
        filename: 'Singleton.java',
        language: 'java',
        code: `// enum = simplest thread-safe singleton
public enum MortarConfig {
    INSTANCE;
    private final Map<String,String> props = loadProps();
    public String get(String key) { return props.get(key); }
    private Map<String,String> loadProps() { return new HashMap<>(); }
}

// double-checked locking alternative
class Pool {
    private static volatile Pool instance;
    static Pool get() {
        if (instance == null) synchronized (Pool.class) {
            if (instance == null) instance = new Pool();
        }
        return instance;
    }
}`,
        note: 'Enum singleton = thread-safe + serialization-safe.',
      },
    ],
    mortar:
      'Mortar platform config, connection pools, metrics registry වගේ shared resources singletons. Spring beans default singleton scope — මේ pattern එකම framework එකෙන් manage කරනවා (6.2.2).',
    keyPoints: ['One instance + global access.', 'Enum singleton = safest; double-checked locking needs `volatile`.', 'Global state = testing risk — overuse එපා.'],
  },

  '5.3.1.2': {
    summary: 'Factory Method = object creation එක subclass/method එකකට delegate — client concrete class දන්නෙ නෑ.',
    sinhala: [
      {
        heading: 'Encapsulated creation',
        body: 'Object එකක් `new` කරන logic එක factory method එකකට move කරනවා. Client එක interface එකට program කරලා, factory එක හරි concrete type එක තෝරනවා. නව types add කරන්න client code වෙනස් වෙන්නෙ නෑ (OCP).',
      },
    ],
    analogy: 'Pizza කඩේට "veggie" කිව්වම — කොහොම හදනවද කියලා ඔයා දන්නෙ නෑ, kitchen (factory) හරි pizza එක හදලා දෙනවා.',
    code: [
      {
        filename: 'Factory.java',
        language: 'java',
        code: `class ConnectorFactory {
    static Connector create(String platform) {
        return switch (platform) {
            case "shopify" -> new ShopifyConnector();
            case "klaviyo" -> new KlaviyoConnector();
            default -> throw new IllegalArgumentException(platform);
        };
    }
}
Connector c = ConnectorFactory.create("shopify"); // client doesn't 'new'`,
        note: 'Creation logic එක තැනකට — client decoupled.',
      },
    ],
    mortar:
      'Mortar user එකක් platform එකක් තෝරනකොට `ConnectorFactory.create(platform)` හරි connector එක හදනවා. Client (UI/service) concrete classes දන්නෙ නෑ — නව connector එකක් factory එකට add කරලා ready.',
    keyPoints: ['Creation encapsulated in a method.', 'Client depends on interface, not concrete.', 'නව types = factory එකට add.'],
  },

  '5.3.1.3': {
    summary: 'Abstract Factory = related objects families හදන factory-of-factories — consistent variants.',
    sinhala: [
      {
        heading: 'Families of objects',
        body: 'Related objects group එකක් (family) එකට හදනවා — individual objects නෙවෙයි. උදා: environment එකකට (prod/test) matching client + parser + auth. Consistency ensure කරනවා — mix-and-match වැරදි combos වළක්වනවා.',
      },
    ],
    analogy: 'Furniture set එකක් වගේ — "modern" set එකේ chair, table, sofa ඔක්කොම match. "classic" එකෙන් වෙන family එකක්.',
    code: [
      {
        filename: 'AbstractFactory.java',
        language: 'java',
        code: `interface IntegrationFactory {
    ApiClient client();
    ResponseParser parser();
}
class ShopifyFactory implements IntegrationFactory {
    public ApiClient client()      { return new ShopifyClient(); }
    public ResponseParser parser() { return new ShopifyParser(); }
}
// client gets a matching, consistent family
IntegrationFactory f = new ShopifyFactory();
var data = f.parser().parse(f.client().fetch());`,
        note: 'Matching family — client/parser mismatch වෙන්නෙ නෑ.',
      },
    ],
    mortar:
      'Mortar හැම platform integration එකකටම matching client + parser + rate-limiter family එකක් ඕන. Abstract factory එකෙන් consistent set එකක් හදලා, Shopify client එකට WooCommerce parser එකක් වගේ වැරදි combos වළක්වනවා.',
    keyPoints: ['Families of related objects.', 'Consistency across a variant.', 'Factory Method වලට වඩා ලොකු scope.'],
  },

  '5.3.1.4': {
    summary: 'Builder = complex object එකක් step-by-step, readable විදිහට හදනවා — telescoping constructors වෙනුවට.',
    sinhala: [
      {
        heading: 'Fluent construction',
        body: 'Fields ගොඩක් (සමහර optional) තියෙන object එකක් constructor එකකින් හදන එක අවුල් (parameter order confusion). Builder එකෙන් `.field(x).field(y).build()` fluent, readable. Immutable objects හදන්නත් හොඳයි.',
      },
    ],
    analogy: 'Sandwich එකක් order කරනවා වගේ — bread තෝරලා, filling එකතු කරලා, sauce දාලා, අන්තිමට "build". Step by step.',
    code: [
      {
        filename: 'Builder.java',
        language: 'java',
        code: `Segment vip = Segment.builder()
    .name("High Value")
    .minSpend(1000)
    .country("LK")
    .churnStatus(ChurnStatus.ACTIVE)
    .build();               // immutable, readable, order-independent`,
        note: 'Optional fields ගොඩක් තියෙනකොට constructor එකට වඩා clear.',
      },
    ],
    mortar:
      'Mortar visual segment builder එකේ backend එකේ, multi-condition audiences (attribute + event + predictive rules) `Segment.builder()...build()` fluent API එකෙන් construct කරනවා — readable, immutable, flexible.',
    keyPoints: ['Step-by-step fluent construction.', 'Optional/many fields වලට හොඳයි.', 'Immutable objects build කරන්න ideal.'],
  },

  '5.3.1.5': {
    summary: 'Prototype = existing object එකක් clone කරලා අලුත් එකක් හදනවා — expensive creation වළක්වන්න.',
    sinhala: [
      {
        heading: 'Clone instead of build',
        body: 'Object එකක් create කරන එක expensive නම් (heavy config/DB load), configured "prototype" එකක් clone කරලා variations හදනවා. Deep vs shallow copy ගැන පරෙස්සම් වෙන්න ඕන (nested objects share වෙන්න පුළුවන්).',
      },
    ],
    analogy: 'Document template එකක් copy කරලා edit කරනවා වගේ — මුල ඉඳන් හදන්නෙ නෑ.',
    code: [
      {
        filename: 'Prototype.java',
        language: 'java',
        code: `record DashboardTemplate(String title, List<String> widgets) {
    DashboardTemplate copyWith(String newTitle) {
        return new DashboardTemplate(newTitle, new ArrayList<>(widgets)); // deep-ish
    }
}
var base = new DashboardTemplate("Default", List.of("churn","rfm"));
var brandA = base.copyWith("Brand A Report"); // cloned + tweaked`,
        note: 'Deep copy nested state — shared mutation වළක්වන්න.',
      },
    ],
    mortar:
      'Mortar "copy dashboards within/across brands" (PROJECT_IDEA 5.2) prototype pattern එකම — standard reporting pack එකක් clone කරලා හැම brand එකකටම fast deploy. Config මුල ඉඳන් හදන්නෙ නෑ.',
    keyPoints: ['Clone a configured prototype.', 'Expensive creation වළක්වයි.', 'Deep vs shallow copy මතක තියාගන්න.'],
  },

  '5.3.2.1': {
    summary: 'Adapter = incompatible interface එකක් expected interface එකකට convert කරනවා — "translator".',
    sinhala: [
      {
        heading: 'Interface translation',
        body: 'Third-party/legacy class එකක interface එක ඔයාගේ code එකට ගැලපෙන්නෙ නැත්නම්, adapter එකක් වලින් wrap කරලා expected interface එකට translate කරනවා. External libraries integrate කරන්න common.',
      },
    ],
    analogy: 'Travel power adapter එකක් වගේ — UK plug එක SL socket එකට ගැලපෙන්න convert කරනවා.',
    code: [
      {
        filename: 'Adapter.java',
        language: 'java',
        code: `interface Connector { List<Customer> fetch(); }        // our interface

class ThirdPartySalesforceSdk {                        // incompatible API
    SalesforceResponse pullContacts() { return new SalesforceResponse(); }
}
class SalesforceAdapter implements Connector {         // adapter
    private final ThirdPartySalesforceSdk sdk = new ThirdPartySalesforceSdk();
    public List<Customer> fetch() {
        return sdk.pullContacts().toCustomers();       // translate
    }
}`,
        note: 'External SDK එක ඔයාගේ Connector interface එකට wrap.',
      },
    ],
    mortar:
      'Mortar Salesforce/HubSpot වගේ third-party SDKs එකින් එකට වෙනස් APIs. Adapters වලින් ඒවා internal `Connector` interface එකට translate කරලා, pipeline එකට uniform විදිහට පෙන්නනවා.',
    keyPoints: ['Incompatible → expected interface convert.', 'Third-party/legacy integration.', 'Wrap + translate.'],
  },

  '5.3.2.2': {
    summary: 'Decorator = object එකකට behaviour dynamically, layer by layer add කරනවා — subclass explosion නැතුව.',
    sinhala: [
      {
        heading: 'Wrap to extend',
        body: 'Object එකක් එකම interface එකේ wrapper එකකින් wrap කරලා, extra behaviour add කරනවා (before/after delegating). Decorators stack කරන්න පුළුවන් — flexible combinations, subclasses ගොඩක් නැතුව.',
      },
    ],
    analogy: 'Coffee එකකට milk → sugar → cream layer by layer add කරනවා වගේ — හැම layer එකක්ම තව ටිකක් එකතු කරනවා.',
    code: [
      {
        filename: 'Decorator.java',
        language: 'java',
        code: `interface DataSource { List<Customer> read(); }

class LoggingSource implements DataSource {           // decorator
    private final DataSource inner;
    LoggingSource(DataSource inner) { this.inner = inner; }
    public List<Customer> read() {
        log.info("reading...");
        var r = inner.read();          // delegate
        log.info("read {} rows", r.size());
        return r;
    }
}
// stack: caching + logging around a real source
DataSource s = new CachingSource(new LoggingSource(new ShopifySource()));`,
        note: 'Behaviours stack — flexible, subclass explosion නෑ.',
      },
    ],
    mortar:
      'Mortar enrichment pipeline (name → gender → geocode → validate) decorators stack කරලා හදනවා — හැම stage එකක්ම data source එක wrap කරලා තව enrichment එකක් add. Pipeline එක config-driven විදිහට compose කරන්න පුළුවන්.',
    keyPoints: ['Wrap same interface, add behaviour.', 'Stackable / composable.', 'Subclass explosion වළක්වයි.'],
  },

  '5.3.2.3': {
    summary: 'Facade = complex subsystem එකකට simple, unified interface එකක් — client complexity හංගනවා.',
    sinhala: [
      {
        heading: 'Simple front door',
        body: 'Subsystem එකක moving parts ගොඩක් (classes කිහිපයක්) client එකට directly expose කරනවා වෙනුවට, එක simple facade class එකක් හරහා common operations expose කරනවා. Coupling අඩු, usability වැඩි.',
      },
    ],
    analogy: 'Restaurant එකක waiter කෙනෙක් වගේ — kitchen, inventory, billing ඔක්කොම එක්ක deal කරන්නෙ නැතුව, ඔයා waiter ට විතරයි කතා කරන්නේ.',
    code: [
      {
        filename: 'Facade.java',
        language: 'java',
        code: `class OnboardingFacade {                    // one simple entry point
    private final Connector connector;
    private final Resolver resolver;
    private final Enricher enricher;

    void onboardBrand(String brandId) {    // hides the 3-step complexity
        connector.sync(brandId);
        resolver.resolve(brandId);
        enricher.enrich(brandId);
    }
}`,
        note: 'Client එකට එක method — subsystem complexity hidden.',
      },
    ],
    mortar:
      'Mortar "Connect in minutes" onboarding — behind එකේ connectors, resolution, enrichment ගොඩක් steps. `OnboardingFacade` එකෙන් UI/API එකට එක simple call එකක් expose කරලා, complexity hide කරනවා.',
    keyPoints: ['Complex subsystem → simple unified API.', 'Reduces client coupling.', 'Not hiding — just simplifying access.'],
  },

  '5.3.2.4': {
    summary: 'Proxy = real object එකට surrogate එකක් — access control, lazy loading, caching, logging.',
    sinhala: [
      {
        heading: 'Stand-in object',
        body: 'Real object එකට එකම interface එකේ proxy එකක් — calls intercept කරලා extra logic (permission check, lazy init, caching, remote call) add කරනවා, ඊට පස්සේ real object එකට delegate කරනවා. Spring AOP proxies මේකෙන්ම වැඩ කරනවා.',
      },
    ],
    analogy: 'Celebrity කෙනෙක්ගේ manager කෙනෙක් වගේ — කෙලින්ම access නෑ, manager (proxy) filter/schedule කරලා තමයි යන්නේ.',
    code: [
      {
        filename: 'Proxy.java',
        language: 'java',
        code: `interface CustomerData { Customer get(String id); }

class SecureProxy implements CustomerData {           // proxy
    private final CustomerData real;
    private final User user;
    public Customer get(String id) {
        if (!user.canViewPii()) throw new AccessDeniedException();
        return real.get(id);                           // delegate
    }
}`,
        note: 'Access control එක real object එකට කලින් — same interface.',
      },
    ],
    mortar:
      'Mortar field-level encryption + role-based PII access (PROJECT_IDEA 10.5) proxy pattern එකෙන් — sensitive customer data access කරනකොට proxy එකක් permission check + decryption කරලා තමයි real data දෙන්නේ.',
    keyPoints: ['Surrogate controlling access to real object.', 'Access control / lazy / cache / remote.', 'Spring AOP = proxy-based.'],
  },

  '5.3.3.1': {
    summary: 'Strategy = interchangeable algorithms encapsulate කරලා, runtime එකේ swap කරනවා.',
    sinhala: [
      {
        heading: 'Pluggable algorithms',
        body: 'එකම වැඩේ කරන ක්‍රම කිහිපයක් (algorithms) එකම interface එකට encapsulate කරලා, context එකට strategy එකක් inject/swap කරනවා. if/else ladders වෙනුවට polymorphism. Runtime එකේ behaviour වෙනස් කරන්න පුළුවන්.',
      },
    ],
    analogy: 'Google Maps route options වගේ — fastest / shortest / no-tolls. එකම "navigate" වැඩේට වෙනස් strategies.',
    code: [
      {
        filename: 'Strategy.java',
        language: 'java',
        code: `interface MatchStrategy { boolean matches(Customer a, Customer b); }

class ExactEmailMatch implements MatchStrategy {
    public boolean matches(Customer a, Customer b) { return a.email().equals(b.email()); }
}
class FuzzyNameMatch implements MatchStrategy {
    public boolean matches(Customer a, Customer b) { /* AI similarity */ return true; }
}
class Resolver {
    private MatchStrategy strategy;                 // swappable
    void setStrategy(MatchStrategy s) { this.strategy = s; }
}`,
        note: 'Matching algorithm එක runtime එකේ swap.',
      },
    ],
    mortar:
      'Mortar identity resolution එකේ matching strategies කිහිපයක්: exact email, AI semantic, transitive. Strategy pattern එකෙන් dataset/config එකට අනුව හරි algorithm එක plug කරනවා — engine එක වෙනස් නොකර.',
    keyPoints: ['Encapsulated interchangeable algorithms.', 'Runtime swap (no if/else ladders).', 'Open/Closed friendly.'],
  },

  '5.3.3.2': {
    summary: 'Observer = subject එකක state වෙනස් වුනාම, registered observers ලට automatic notify.',
    sinhala: [
      {
        heading: 'Publish-subscribe',
        body: 'Subject එකක් observers list එකක් තියාගෙන, event එකක් වුනාම හැමෝටම notify කරනවා. Loose coupling — subject එකට observers කවුද කියලා දැනගන්න ඕන නෑ. Event-driven systems, UI updates, notifications වලට base එක.',
      },
    ],
    analogy: 'YouTube channel එකකට subscribe වෙනවා වගේ — video එකක් දැම්මම හැම subscriber කෙනෙක්ටම notification.',
    code: [
      {
        filename: 'Observer.java',
        language: 'java',
        code: `interface SyncObserver { void onComplete(String brandId); }

class SyncSubject {
    private final List<SyncObserver> observers = new ArrayList<>();
    void subscribe(SyncObserver o) { observers.add(o); }
    void finishSync(String brandId) {
        observers.forEach(o -> o.onComplete(brandId));  // notify all
    }
}
// observers: email notifier, dashboard refresher, audit logger`,
        note: 'Subject decoupled — observers add/remove freely.',
      },
    ],
    mortar:
      'Mortar sync-complete → email notification + dashboard refresh + audit log (PROJECT_IDEA 10.4). Observer pattern එකෙන් sync engine එකට notify logic hardcode නොකර, observers subscribe කරනවා. Spring events මේකෙන්ම.',
    keyPoints: ['State change → auto-notify subscribers.', 'Loose coupling (subject ↮ observers).', 'Event-driven / Spring events.'],
  },

  '5.3.3.3': {
    summary: 'Command = request එකක් object එකක් විදිහට encapsulate — queue, log, undo කරන්න පුළුවන්.',
    sinhala: [
      {
        heading: 'Request as object',
        body: 'Action එකක් (receiver + params + logic) object එකක් විදිහට wrap කරනවා. ඒ නිසා commands queue කරන්න, log කරන්න, schedule කරන්න, undo කරන්න පුළුවන්. Invoker එකට command එක මොකද කරන්නෙ කියලා දැනගන්න ඕන නෑ.',
      },
    ],
    analogy: 'Restaurant order slip එකක් වගේ — order (command) ලියලා queue එකට. Chef (receiver) execute කරනවා, slips log/reorder කරන්න පුළුවන්.',
    code: [
      {
        filename: 'Command.java',
        language: 'java',
        code: `interface Command { void execute(); }

class SyncSegmentCommand implements Command {
    private final String segmentId, destination;
    SyncSegmentCommand(String s, String d) { segmentId = s; destination = d; }
    public void execute() { /* push segment to destination */ }
}
// queue commands, run later, retry, log
Queue<Command> queue = new LinkedList<>();
queue.add(new SyncSegmentCommand("vip", "meta"));
queue.forEach(Command::execute);`,
        note: 'Requests objects — queue/log/retry/undo.',
      },
    ],
    mortar:
      'Mortar activation jobs (sync segment to Meta/Google, export list) commands විදිහට encapsulate කරලා queue එකට දානවා — retry, schedule, audit කරන්න පුළුවන්. Recurring syncs මේ model එකට හොඳට ගැලපෙනවා.',
    keyPoints: ['Request → object (params + logic).', 'Queue / log / schedule / undo.', 'Invoker decoupled from action.'],
  },

  '5.3.3.4': {
    summary: 'Template Method = algorithm එකේ skeleton එක base class එකේ; steps subclasses fill කරනවා.',
    sinhala: [
      {
        heading: 'Fixed skeleton, variable steps',
        body: 'Base class එකේ final template method එකක් algorithm එකේ order එක fix කරනවා, variable steps abstract methods විදිහට subclasses ට. Common flow reuse + specific steps customize. Hollywood principle: "don\'t call us, we\'ll call you".',
      },
    ],
    analogy: 'Recipe එකක් වගේ — steps order එක එකයි (prep → cook → serve), ඒත් "cook" කරන විදිහ dish එකට අනුව වෙනස්.',
    code: [
      {
        filename: 'TemplateMethod.java',
        language: 'java',
        code: `abstract class AbstractConnector {
    public final void run() {          // template: fixed order
        authenticate();
        List<Customer> data = fetch(); // subclass step
        transform(data);               // subclass step
        save(data);
    }
    protected void authenticate() { /* shared */ }
    protected abstract List<Customer> fetch();
    protected abstract void transform(List<Customer> data);
    protected void save(List<Customer> d) { /* shared */ }
}`,
        note: 'run() flow fixed; fetch/transform subclass-specific.',
      },
    ],
    mortar:
      'Mortar හැම connector එකකම flow එක එකයි: authenticate → fetch → transform → save. `AbstractConnector.run()` template එකෙන් skeleton එක fix කරලා, platform-specific fetch/transform steps subclasses වල. (1.2.1 Abstract classes එකට tie වෙනවා.)',
    keyPoints: ['Skeleton in base (final template method).', 'Variable steps = abstract methods.', 'Common flow reuse + customization.'],
  },

  '5.3.3.5': {
    summary: 'Chain of Responsibility = request එකක් handlers chain එකක් හරහා — එකක් handle කරනකම්.',
    sinhala: [
      {
        heading: 'Pass along the chain',
        body: 'Request එකක් handlers chain එකක් හරහා යනවා — හැම handler එකක්ම "මම මේක handle කරන්නද, නැත්නම් next එකට pass කරන්නද?" කියලා decide කරනවා. Sender/receiver decouple. Validation/processing pipelines, middleware වලට common.',
      },
    ],
    analogy: 'Office එකක approval chain එකක් වගේ — manager → director → CEO. එක්කෙනෙකුට authority තියෙනකම් උඩට pass.',
    code: [
      {
        filename: 'ChainOfResponsibility.java',
        language: 'java',
        code: `abstract class Handler {
    protected Handler next;
    Handler setNext(Handler n) { this.next = n; return n; }
    abstract void handle(Row row);
    protected void passOn(Row row) { if (next != null) next.handle(row); }
}
class ValidateHandler extends Handler {
    void handle(Row row) { if (row.isValid()) passOn(row); else reject(row); }
}
class DedupHandler extends Handler {
    void handle(Row row) { if (!seen(row)) passOn(row); }
}
// validate -> dedup -> enrich -> save
validate.setNext(dedup).setNext(enrich).setNext(save);`,
        note: 'හැම handler එකක්ම handle හෝ pass — decoupled pipeline.',
      },
    ],
    mortar:
      'Mortar ingestion pipeline (validate → dedup → resolve → enrich → save) chain of responsibility එකක්. හැම row එකක්ම handlers හරහා යනවා; stages add/remove/reorder කරන්න ලේසි — flexible processing.',
    keyPoints: ['Request handlers chain එකක් හරහා.', 'Each: handle or pass on.', 'Flexible pipelines / middleware.'],
  },
};
