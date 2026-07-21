import { Concept } from '../../core/models/roadmap.model';

/**
 * Section 1 — Core Java & Object-Oriented Programming.
 * Content keyed by the dotted roadmap number. Explanations are Singlish
 * (Sinhala + English technical words). Every concept is tied to building the
 * "Mortar" Customer Data Platform (see PROJECT_IDEA.md).
 */
export const SECTION_01: Record<string, Concept> = {
  '1.1.1': {
    summary:
      'Class = customer කෙනෙක් කොහොම විදිහට තියෙන්නද කියලා අඳින "blueprint" එක (fields + methods). Object = ඒ blueprint එකෙන්, `new` කරලා heap memory එකේ හදන ඇත්ත, ජීවත් වෙන instance එක. එක class → objects කීයක් හරි.',
    sinhala: [
      {
        heading: 'කතාව: Mortar එකට customer කෙනෙක් "represent" කරන්නේ කොහොමද?',
        body: 'ඔයා Mortar team එකට join වුණා. පළවෙනි වැඩේ — Shopify එකෙන් එන customer කෙනෙක්ගේ විස්තර (email, spend, orders) code එකේ තියාගන්නේ කොහොමද? ඔයාට variables ගොඩක් හදන්න පුළුවන් (`email1`, `spend1`, `email2`, `spend2`...) — ඒත් customers මිලියන ගණන් එද්දී ඒක අවුලක්. හොඳම විදිහ: "customer කෙනෙක් කියන්නේ මොකක්ද" කියලා **එක තැනක define** කරන එක — ඒකට තමයි `class`. එතකොට හැම customer කෙනෙක්ම ඒ එකම හැඩයෙන්, ඒත් වෙන වෙනම data එක්ක හදන්න පුළුවන්.',
      },
      {
        heading: 'Class = blueprint (plan එක විතරයි)',
        body: 'Class එකක් කියන්නේ දත්ත (fields) සහ හැසිරීම (methods) එකට bundle කරන **template** එකක්. වැදගත්ම දේ: class එකක් memory එකේ **නෑ** — ඒක ගෙයක් හදන plan එකක් වගේ, plan එකේ ජීවත් වෙන්න බෑ. Class එකක් define කරන එකෙන් customers හැදෙන්නෙ නෑ — customer කෙනෙක් හදන්නේ මොන හැඩයෙන්ද කියලා විස්තර කරනවා විතරයි.',
      },
      {
        heading: 'Object = `new` කරලා හදන ඇත්ත instance එක',
        body: '`new Customer(...)` කියලා ලියනකොට තමයි ඇත්තටම **heap memory** එකේ object එකක් හැදෙන්නේ — plan එකෙන් ඇත්ත ගෙයක් හදනවා වගේ. ඒ object එකට තමන්ගේම data (state) තියෙනවා. `Customer alice = new Customer(...)` කියද්දී: `new Customer(...)` heap එකේ object එක හදනවා, `alice` කියන්නේ ඒ object එකට point කරන reference (address) එක.',
      },
      {
        heading: 'State (data) සහ Behavior (actions)',
        body: 'Object එකකට කොටස් දෙකක්: **State** = fields වල තියෙන data (customer කෙනෙක්ගේ email, totalSpend). **Behavior** = methods (`recordPurchase()` වගේ — data එක්ක වැඩ කරන actions). Object කියන්නේ මේ දෙක එකට bundle වුණ "ජීවත් වෙන" එකක්. එක class එකකින් හදන object 2ක් — `alice` සහ `bob` — වෙන වෙනම state තියාගන්නවා (alice ගේ spend වෙනස් කලාට bob ට බලපාන්නෙ නෑ).',
      },
    ],
    analogy:
      'Class එක ගෙයක් හදන **architectural plan** එකක් වගේ. Plan එකෙන් ගෙවල් 100ක් හදන්න පුළුවන් — හැම ගෙයක්ම (object) එකම plan එකෙන්, ඒත් වෙන වෙනම address, paint colour, owner (state). Plan එකේ (class) කවුරුත් පදිංචි වෙන්නෙ නෑ; හදපු ගෙයක (object) තමයි ජීවත් වෙන්නේ.',
    code: [
      {
        filename: 'Customer.java',
        language: 'java',
        code: `// CLASS = හැම Mortar customer කෙනෙක්ම හදන blueprint එක
public class Customer {

    // ── STATE (fields): object එකකට තියෙන data ──
    private String email;        // customer ගේ email
    private double totalSpend;    // මේ දක්වා වියදම් කරපු මුදල
    private int orderCount;       // orders ගාන

    // CONSTRUCTOR: object එකක් 'new' කරනකොට initial state එක set කරයි
    public Customer(String email) {
        this.email = email;       // 'this' = දැන් හදන මේ object එක
        this.totalSpend = 0.0;    // අලුත් customer -> spend 0
        this.orderCount = 0;
    }

    // ── BEHAVIOR (methods): object එකේ data එක්ක වැඩ කරන actions ──
    public void recordPurchase(double amount) {
        this.totalSpend += amount;  // state එක update කරනවා
        this.orderCount++;
    }

    public double averageOrderValue() {   // derived value එකක්
        return orderCount == 0 ? 0 : totalSpend / orderCount;
    }

    public String getEmail() { return email; }
    public double getTotalSpend() { return totalSpend; }
}`,
        note: 'Class එක = blueprint. තාම memory එකේ customer කෙනෙක් නෑ — plan එක විතරයි.',
      },
      {
        filename: 'CreateObjects.java',
        language: 'java',
        code: `public class Demo {
    public static void main(String[] args) {

        // 'new' කරද්දී heap එකේ ඇත්ත object එකක් හැදෙනවා
        Customer alice = new Customer("alice@shop.com");
        Customer bob   = new Customer("bob@shop.com");

        // alice ට කරන දේ bob ට බලපාන්නෙ නෑ — වෙන වෙනම state
        alice.recordPurchase(120.0);
        alice.recordPurchase(80.0);
        bob.recordPurchase(50.0);

        System.out.println(alice.getTotalSpend());     // 200.0
        System.out.println(bob.getTotalSpend());       // 50.0
        System.out.println(alice.averageOrderValue()); // 100.0

        // objects දෙක වෙනස් — එකම class එකෙන් වුණත් independent
        System.out.println(alice == bob);              // false
    }
}`,
        note: 'එක class එකකින් හදන objects කීයක් හරි — හැම එකකටම තමන්ගේම state.',
      },
      {
        filename: 'ReferenceVsObject.java',
        language: 'java',
        code: `// reference එකයි object එකයි වෙනස් දෙකක්
Customer a = new Customer("x@x.com"); // 'a' = reference; heap එකේ object එකක්
Customer b = a;                        // b සහ a එකම object එකට point කරනවා!

b.recordPurchase(500);                 // b හරහා වෙනස් කරාට...
System.out.println(a.getTotalSpend()); // 500.0 — a ටත් පේනවා (එකම object)

Customer c = null;                     // c කිසි object එකකට point කරන්නෙ නෑ
// c.getTotalSpend();                  //  NullPointerException!`,
        note: 'reference = object එකේ "address"; null reference එකකින් method call = NPE.',
      },
    ],
    mortar:
      'Mortar එකේ `Customer` කියන්නේ මුළු platform එකේම මූලික building block එක. Shopify, WooCommerce, CSV upload — කොහෙන් ආවත් හැම customer කෙනෙක්ම `Customer` class එකේ object එකක් විදිහට heap එකේ හැදෙනවා (email, spend, orders, segments එක්ක). Identity resolution එකේදී මේ objects මිලියන ගණන් memory එකේ; හැම එකකටම තමන්ගේම "golden record" state එකක්. Class එක හරියට design කරගැනීම මුළු system එකේම පදනම.',
    keyPoints: [
      'Class = blueprint/template (memory එකේ නෑ). Object = `new` වලින් heap එකේ හදන instance එක.',
      'State = fields (data); Behavior = methods (actions). Object = දෙකම එකට.',
      'එක class එකකින් හදන objects independent — වෙන වෙනම state.',
      'Reference (`alice`) ≠ object — reference එක object එකේ address එක; කිහිප reference එකක් එකම object එකට point කරන්න පුළුවන්.',
    ],
    pitfalls: [
      '`null` reference එකකින් method call කලොත් `NullPointerException` (object එකක් `new` කරලා නෑ).',
      'Class එකයි object එකයි එකතු කරන්න එපා — class = design (compile-time), object = ඇත්ත instance (run-time).',
      '`==` reference දෙකක් compare කරනවා (එකම object එකද?), content නෙවෙයි — content compare කරන්න `.equals()`.',
    ],
  },

  '1.1.2': {
    summary:
      'Inheritance = එක class එකකට තව class එකකගේ fields/methods "උරුම" කරගන්න පුළුවන් වීම — `extends` keyword එකෙන්. Code reuse + "IS-A" relationship එකක් එනවා.',
    sinhala: [
      {
        heading: 'කතාව: connectors වල පොදු code එක reuse කරමු',
        body: 'ඔයා Mortar connectors ගොඩක් හදනවා — Shopify, WooCommerce, Klaviyo. හැම එකකටම brandId එකක් තියෙනවා, හැම එකක්ම connect() වෙන්න ඕන (එකම විදිහට). මේ පොදු දේවල් හැම connector class එකකම ආයෙ ලියනවා වෙනුවට, "පොදු දේවල් තියෙන parent class එකක්" හදලා, අනිත් ඒවා ඒකෙන් උරුම කරගන්න පුළුවන්. ඒකට තමයි inheritance — `extends` keyword එක.',
      },
      {
        heading: 'උරුම වෙන්නේ මොනවද?',
        body: 'Subclass එකක් superclass එකෙන් `extends` කරනකොට, parent එකේ මේවා උරුම වෙනවා:',
        points: [
          '`public` සහ `protected` fields — subclass එකට කෙලින්ම access කරන්න පුළුවන් (උදා: brandId).',
          '`public` සහ `protected` methods — ආයෙ ලියන්නෙ නැතුව use කරන්න පුළුවන් (උදා: connect()).',
          '`private` members උරුම වෙන්නෙ නෑ — ඒවා parent එකට විතරයි (encapsulation).',
          'Constructors උරුම වෙන්නෙ නෑ — ඒත් subclass එකෙන් `super(...)` වලින් call කරන්න පුළුවන්.',
        ],
      },
      {
        heading: 'IS-A relationship',
        body: 'Inheritance එකෙන් "IS-A" සම්බන්ධයක් එනවා — `ShopifyConnector` **IS-A** `Connector`. ඒ නිසා Connector එකක් expect කරන ඕන තැනකට ShopifyConnector එකක් දාන්න පුළුවන් (මේකෙන් polymorphism එනවා — 1.1.5.2). රීතිය: inherit කරන්නේ ඇත්තටම "IS-A" වෙනකොට විතරයි (ShopifyConnector ඇත්තටම Connector කෙනෙක්). නිකම් code reuse එකට inherit කරන එක නරක design (එතනට composition — 1.2.6).',
      },
      {
        heading: 'super keyword එක',
        body: '`super` වලින් parent එකට reach කරනවා දෙ ආකාරයකට: `super(...)` — parent constructor එක call කරනවා (subclass constructor එකේ පළවෙනි line එක වෙන්නම ඕන). `super.method()` — parent එකේ method version එක call කරනවා (subclass එකේ override එකකින් වුණත්). ඒ නිසා subclass එකට parent behaviour එක "extend" කරන්න පුළුවන් — parent එක කරන දේ කරලා, ඒ උඩින් extra එකක් add කරනවා.',
      },
    ],
    analogy:
      'ShopifyConnector, WooConnector දෙකම "Connector" කෙනෙක්ගේ දරුවෝ වගේ. දෙන්නම තාත්තගෙන් පොදු දේවල් (connect කරන හැටි, brandId) උරුම කරගෙන, තමන්ගේම විශේෂ දක්ෂතා (Shopify sync, Woo sync) එකතු කරගන්නවා. දරුවා තාත්තගේ දෙයක් use කරන්නත්, තමන්ගේ විදිහට වෙනස් කරන්නත් (override) පුළුවන්.',
    code: [
      {
        filename: 'Connector.java',
        language: 'java',
        code: `// PARENT (superclass) — හැම Mortar data source එකකම පොදු දේවල්
public class Connector {
    protected String brandId;                // protected -> subclass වලට access

    public Connector(String brandId) {       // constructor
        this.brandId = brandId;
    }

    public void connect() {                  // පොදු method — හැමෝම reuse කරනවා
        System.out.println(brandId + ": connecting...");
    }

    private void loadSecrets() { }           // private -> subclass එකට උරුම වෙන්නෙ නෑ
}`,
        note: 'protected members subclass වලට උරුම වෙනවා; private members නෑ.',
      },
      {
        filename: 'ShopifyConnector.java',
        language: 'java',
        code: `// CHILD (subclass) — ShopifyConnector IS-A Connector
public class ShopifyConnector extends Connector {

    public ShopifyConnector(String brandId) {
        super(brandId);            // parent constructor එකට brandId දෙනවා (පළවෙනි line)
    }

    public void syncOrders() {
        connect();                 // parent එකෙන් උරුම වුණ method එක — ආයෙ ලියන්න ඕන නෑ
        System.out.println(brandId + ": Shopify orders sync කරනවා"); // brandId ත් උරුමයි
    }
}

class Demo {
    public static void main(String[] args) {
        ShopifyConnector c = new ShopifyConnector("brand-42");
        c.syncOrders();  // connect() (inherited) + Shopify-specific code
    }
}`,
        note: 'connect() සහ brandId ShopifyConnector එකට නොමිලේ උරුමයි.',
      },
      {
        filename: 'SuperMethod.java',
        language: 'java',
        code: `// super.method() — parent behaviour එක "extend" කරන එක
public class LoggingConnector extends Connector {
    public LoggingConnector(String brandId) { super(brandId); }

    @Override
    public void connect() {
        System.out.println("[log] connect පටන් ගන්නවා");
        super.connect();     // parent එකේ මුල් connect() එක call කරනවා
        System.out.println("[log] connect ඉවරයි");
    }
}
// parent connect() එක කරලා, ඒ වටේ logging එකතු කරනවා (behaviour extend)`,
        note: 'super.connect() = parent version එක; ඒ වටේ extra logic wrap කරනවා.',
      },
    ],
    mortar:
      'Mortar එකට connectors 15+ ක් තියෙනවා. ඔක්කොම `Connector` base එකෙන් `extends` කරලා connect/auth/brandId වගේ පොදු logic reuse කරනවා — copy-paste නෑ. අලුත් platform එකක් (උදා: TikTok Shop) add කරනකොට, `extends Connector` කරලා platform-specific sync එක විතරක් ලියනවා; connect/auth නොමිලේ. ඒත් inheritance chain එක ගැඹුරු වෙන්න දෙන්නෙ නෑ — behaviours mix කරන්න ඕන තැන් වලට composition (1.2.6) use කරනවා.',
    keyPoints: [
      '`extends` = single inheritance — Java class එකකට parent එකයි (interfaces කිහිපයක් වුණාට).',
      'public/protected members උරුම වෙනවා; private + constructors උරුම වෙන්නෙ නෑ.',
      '`super(...)` = parent constructor; `super.method()` = parent method version.',
      'Inheritance = "IS-A" relationship — ඇත්තටම IS-A වෙනකොට විතරක් use කරන්න.',
    ],
    pitfalls: [
      'නිකම් code reuse එකට inherit කරන්න එපා (fragile design). "IS-A" නැත්නම් composition (1.2.6) හොඳයි.',
      'Deep inheritance chains (5-6 levels) maintain කරන්න අමාරුයි — parent එක වෙනස් වුනොත් children ගොඩක් කැඩෙනවා.',
      'Subclass constructor එකේ පළවෙනි line එක implicitly `super()` call කරනවා; parent එකට no-arg constructor නැත්නම් explicitly `super(...)` දෙන්නම ඕන.',
    ],
  },

  '1.1.3': {
    summary:
      'Abstraction = "මොකද කරන්නේ" (what) පෙන්නලා "කොහොමද කරන්නේ" (how) හංගන එක. User ට ඕන essential interface එක විතරක් expose කරලා, ඇතුලේ complexity සඟවනවා.',
    sinhala: [
      {
        heading: 'කතාව: pipeline එකට හැම source එකක්ම එකවගේ පෙනෙන්න ඕන',
        body: 'Mortar ingestion pipeline එකට customers එන්නේ තැන් ගොඩකින් — Shopify (REST API + pagination + rate limits), CSV upload (file parse + validation), Klaviyo (two-way sync). මේ හැම එකෙන්ම customers ගන්න එක internally ගොඩක් වෙනස්, සංකීර්ණයි. දැන් pipeline code එකට හැම source එකකම internal details දැනගන්න ඕන වුනොත්? code එක අවුල්, tightly coupled. ඕන වෙන්නේ — "මට customers දෙන්න" කියලා අහන්න පුළුවන් එක සරල ක්‍රමයක්, ඇතුලේ මොකද වෙන්නේ කියලා නොදැන. ඒකට තමයි abstraction.',
      },
      {
        heading: 'What vs How',
        body: 'Abstraction එකේ හරය: contract එකක් (interface/abstract class) එකෙන් "මොනවා කරන්න පුළුවන්ද" කියලා define කරනවා; ඇත්ත "කොහොමද කරන්නේ" concrete classes ඇතුලේ හංගනවා.',
        points: [
          'Contract: `DataSource` interface එකේ `fetchCustomers()` — "customers දෙනවා" කියන පොරොන්දුව විතරයි.',
          'Hidden how: `ShopifyDataSource` ඇතුලේ auth, pagination, rate-limit, retry ඔක්කොම — ඒත් පිටින් නොපෙනේ.',
          'Caller දන්නේ `fetchCustomers()` කියලා call කරන්න පුළුවන් කියලා විතරයි — details 0ක්.',
        ],
      },
      {
        heading: 'Abstraction vs Encapsulation (confuse කරන්න එපා)',
        body: 'දෙක සම්බන්ධයි ඒත් වෙනස්. Abstraction = **design-level** — "implementation එක හංගනවා" (what to show, how to hide — interfaces/abstract classes වලින්). Encapsulation = **implementation-level** — "data එක හංගනවා" (fields private කරලා getters/setters වලින් — 1.1.4). Abstraction "පිටතට මොකද පෙනෙන්නේ" ගැන; encapsulation "data එක safe තියාගන්නේ කොහොමද" ගැන.',
      },
    ],
    analogy:
      'රිය පදවනකොට steering wheel එක කරකවනවා, brake එක ගහනවා විතරයි (interface). Engine එක combustion කරන හැටි, gearbox වැඩ කරන හැටි (implementation) දැනගන්න ඕන නෑ — ඒ complexity එක abstract කරලා hidden. TV remote එකක බොත්තම් වගේ — signal එක යවන electronics නොදැන use කරන්න පුළුවන්.',
    code: [
      {
        filename: 'DataSource.java',
        language: 'java',
        code: `// ABSTRACTION: contract එක — "මොකද කරන්නේ" විතරයි (how නෑ)
public interface DataSource {
    List<Customer> fetchCustomers();     // customers දෙනවා — details නෑ
}`,
        note: 'Interface එක = contract; "customers දෙනවා" කියන පොරොන්දුව විතරයි.',
      },
      {
        filename: 'ShopifyDataSource.java',
        language: 'java',
        code: `// "කොහොමද කරන්නේ" — සියලු complexity මෙතන hidden
public class ShopifyDataSource implements DataSource {

    @Override
    public List<Customer> fetchCustomers() {
        // caller ට මේ complexity එකක්වත් පේන්නෙ නෑ:
        authenticate();                  // OAuth handshake
        List<Customer> all = new ArrayList<>();
        int page = 1;
        while (hasMore(page)) {           // pagination
            all.addAll(withRetry(() -> callApi(page)));  // rate-limit + retry
            page++;
        }
        return all;
    }

    private void authenticate() { /* hidden */ }
    private boolean hasMore(int page) { return page <= 3; }
    private List<Customer> callApi(int page) { return List.of(); }
    private List<Customer> withRetry(Object task) { return List.of(); }
}`,
        note: 'auth/pagination/retry ඔක්කොම ඇතුලේ — පිටින් නොපෙනේ.',
      },
      {
        filename: 'PipelineUsesAbstraction.java',
        language: 'java',
        code: `// Pipeline එකට source එක Shopify ද CSV ද කියලා දැනගන්න ඕන නෑ!
public class IngestionPipeline {

    // DataSource abstraction එකට විතරයි depend කරන්නේ (concrete class එකට නෙවෙයි)
    public void ingest(DataSource source) {
        List<Customer> customers = source.fetchCustomers();  // how එක නොදැන
        customers.forEach(this::resolve);
    }
}

// ඕන source එකක් pass කරන්න පුළුවන් — pipeline code එක වෙනස් වෙන්නෙ නෑ
new IngestionPipeline().ingest(new ShopifyDataSource());
// new IngestionPipeline().ingest(new CsvDataSource());  // එකම විදිහට`,
        note: 'Pipeline එක abstraction එකට depend කරනවා — concrete details වලට නෙවෙයි.',
      },
    ],
    mortar:
      'Mortar ingestion layer එක හැම source එකක්ම `DataSource` abstraction එකක් විදිහට දකිනවා. ඒ නිසා pipeline code එකට Shopify ද, CSV upload ද, Klaviyo ද කියලා දැනගන්න ඕන නෑ — හැම එකක්ම `fetchCustomers()` වලින් customers දෙනවා, ඇතුලේ complexity සම්පූර්ණයෙන් hidden. අලුත් source එකක් add කරනකොට pipeline එක වෙනස් වෙන්නෙ නෑ — abstraction එකට program කරන නිසා (මේකෙන් Open/Closed principle — 5.1.2 — එනවා).',
    keyPoints: [
      'Abstraction = essential "what" expose කරලා "how" හංගනවා.',
      'Java වල interfaces + abstract classes වලින් achieve කරනවා.',
      'Caller abstraction එකට depend කරනවා — concrete implementation එකට නෙවෙයි (loose coupling).',
      'Abstraction = implementation hiding (design); Encapsulation = data hiding (fields).',
    ],
    pitfalls: [
      'Abstraction "leaky" වෙන්න දෙන්න එපා — internal details (page numbers, HTTP status) interface එකෙන් පිටතට කාන්දු වුනොත් abstraction එකේ තේරුමක් නෑ.',
      'ඕනවට වඩා abstraction layers දාන්න එපා (over-engineering — KISS 5.2.2) — ඇත්තටම ඕන තැන් වලට විතරයි.',
    ],
  },

  '1.1.4': {
    summary:
      'Encapsulation = data (fields) `private` කරලා, ඒවාට access කරන්නේ controlled public methods (getters/setters) හරහා විතරක් වීම. Data එක "capsule" එකක් ඇතුලේ safe තියාගන්නවා.',
    sinhala: [
      {
        heading: 'කතාව: totalSpend එක ඕන කෙනෙක්ට වෙනස් කරන්න පුළුවන් නම්?',
        body: 'හිතන්න `Customer` class එකේ `totalSpend` field එක `public`. දැන් code එකේ ඕන තැනකින් `customer.totalSpend = -5000;` වගේ දාන්න පුළුවන් — negative spend! නැත්නම් අහම්බෙන් reset වෙන්න පුළුවන්. Data එකේ "නීති" (spend එකක් negative වෙන්න බෑ, email එකේ @ තියෙන්නම ඕන) enforce කරන්න ක්‍රමයක් නෑ. ඕන වෙන්නේ — data එකට කෙලින්ම අත දාන්න දෙන්නෙ නැතුව, "දොරටුපාලයෙක්" (method) හරහා විතරක් access දෙන එක. ඒකට තමයි encapsulation.',
      },
      {
        heading: 'කොහොමද කරන්නේ (steps)',
        body: 'Encapsulation එකක් හදන්නේ මෙහෙමයි:',
        points: [
          'Fields `private` කරන්න — පිටින් කෙලින්ම access කරන්න බෑ.',
          'Read කරන්න ඕන නම් `public` getter එකක් දෙන්න (`getTotalSpend()`).',
          'Write කරන්න ඕන නම් `public` setter/method එකක් දෙන්න — ඒකේ validation දාන්න.',
          'ඒ නිසා data එකේ "නීති" (invariants) හැමවිටම protect වෙනවා — වැරදි value එකක් කවදාවත් set වෙන්නෙ නෑ.',
        ],
      },
      {
        heading: 'ඇයි මේක වටිනවා',
        body: 'Encapsulation එකෙන් ලැබෙන වාසි: (බලන්න code එකේ). Validation එක තැනක; invariants safe; internal representation එක future එකේ වෙනස් කරන්න පුළුවන් (fields කොහොම store කරනවද කියන එක වෙනස් කලාට, public methods එකම නම් outside code කැඩෙන්නෙ නෑ). මේකෙන් loose coupling + maintainability.',
      },
    ],
    analogy:
      'ATM එකක් වගේ. සල්ලි (data) machine එක ඇතුලේ safe තියෙනවා. ඔයාට කරන්න පුළුවන් approved operations (withdraw/deposit) විතරයි — කෙලින්ම cash box එකට අත දාන්න බෑ. ATM එක නීති check කරනවා (balance ඇතිද, PIN හරිද) — encapsulation එකේ setter validation වගේ.',
    code: [
      {
        filename: 'CustomerProfile.java',
        language: 'java',
        code: `public class CustomerProfile {
    // fields private -> පිටින් කෙලින්ම අත දාන්න බෑ (hidden)
    private String email;
    private double totalSpend;
    private boolean emailValid;

    // READ: getter — safe read access
    public String getEmail()       { return email; }
    public double getTotalSpend()  { return totalSpend; }

    // WRITE: setter — validation එකෙන් invariant protect කරනවා
    public void setEmail(String email) {
        if (email == null || !email.contains("@")) {
            throw new IllegalArgumentException("email එක වැරදියි");  // නීතිය enforce
        }
        this.email = email;
        this.emailValid = true;
    }

    // controlled mutation — negative spend කවදාවත් වෙන්නෙ නෑ
    public void addSpend(double amount) {
        if (amount < 0) throw new IllegalArgumentException("spend negative වෙන්න බෑ");
        this.totalSpend += amount;
    }
}`,
        note: 'email/spend private; වෙනස් කරන්න පුළුවන් validation pass වුනොත් විතරයි.',
      },
      {
        filename: 'WhyItMatters.java',
        language: 'java',
        code: `CustomerProfile c = new CustomerProfile();

// c.totalSpend = -5000;          //  COMPILE ERROR — private, කෙලින්ම බෑ
// c.addSpend(-5000);             //  Runtime exception — validation අල්ලනවා

c.setEmail("alice@shop.com");     // ✅ valid
c.addSpend(120.0);                // ✅ valid
System.out.println(c.getTotalSpend()); // 120.0

// c.setEmail("not-an-email");    //  IllegalArgumentException — invariant safe`,
        note: 'Invalid state එකක් object එකට කවදාවත් ඇතුල් වෙන්නෙ නෑ.',
      },
    ],
    mortar:
      'Mortar customer records වල email, phone වගේ sensitive fields `private` + encrypted. Encapsulation නිසා ඒවාට කෙලින්ම access කරන්න බෑ; getters හරහා access කරනකොට role-permission check එකයි decryption එකයි enforce කරන්න පුළුවන් (field-level encryption — PROJECT_IDEA 10.5). තවත් — invalid email එකක්, negative spend එකක් object එකට කවදාවත් ඇතුල් වෙන්නෙ නෑ, ඒ නිසා data quality + security දෙකම protected.',
    keyPoints: [
      'Fields `private`; access `public` getter/setter/methods හරහා විතරයි.',
      'Setters වල validation → invariants (නීති) හැමවිටම protected.',
      'Internal representation නිදහසේ වෙනස් කරන්න පුළුවන් (public API එකම නම් outside code safe).',
      'Security: sensitive fields hide කරලා permission/encryption enforce කරන්න.',
    ],
    pitfalls: [
      'Getter/setter දාලා field එකම plain expose කරනවා නම් (validation/logic නැතුව) encapsulation එකේ ලොකු වටිනාකමක් නෑ — ඇත්තටම protect කරන්න ඕන දේ protect කරන්න.',
      'Getter එකකින් mutable object එකක් (List වගේ) කෙලින්ම return කලොත், caller ට ඇතුළ වෙනස් කරන්න පුළුවන් — copy එකක් return කරන්න (defensive copy).',
    ],
  },

  '1.1.5.1': {
    summary:
      'Method Overloading = එකම class එකේ, එකම නමින් methods කිහිපයක් — parameters (count/type/order) වෙනස් නම්. Compiler compile-time එකේදීම හරි එක තෝරනවා (static polymorphism).',
    sinhala: [
      {
        heading: 'කතාව: segment builder එකට clean API එකක්',
        body: 'Mortar segment builder එකට filters දාන්න ඕන — සමහර වෙලාවට "country = LK" වගේ attribute filter, සමහර වෙලාවට "age 18 සිට 35" වගේ range filter, සමහර වෙලාවට "churn status = ACTIVE" වගේ predictive filter. දැන් developer ට මතක තියාගන්න methods 3ක් වෙන වෙන නම් වලින් (`addAttributeFilter`, `addRangeFilter`, `addChurnFilter`) දුන්නොත් API එක අවුල්. ඒ වෙනුවට — එකම නම `addFilter` use කරලා, arguments අනුව හරි එක automatic තෝරන්න පුළුවන් නම්? ඒකට තමයි overloading.',
      },
      {
        heading: 'Overloading වැඩ කරන විදිහ',
        body: 'එකම method name එකෙන් methods කිහිපයක් ලියන්න පුළුවන් — **parameter list එක වෙනස් නම්**. Parameter list වෙනස් වෙන්න පුළුවන් ක්‍රම:',
        points: [
          'Parameters ගාන වෙනස් — `addFilter(String)` vs `addFilter(String, String)`.',
          'Parameter types වෙනස් — `addFilter(String)` vs `addFilter(ChurnStatus)`.',
          'Parameter order වෙනස් — `addFilter(String, int)` vs `addFilter(int, String)`.',
          'රීතිය: return type එක **විතරක්** වෙනස් කරලා overload කරන්න බෑ (compiler confused වෙනවා).',
        ],
      },
      {
        heading: 'Compile-time (static) binding',
        body: 'වැදගත්ම කරුණ: කුමන `addFilter` version එකද call වෙන්නේ කියලා **compiler** compile time එකේදීම තීරණය කරනවා — arguments බලලා (static binding). Runtime එකේ තීරණයක් නෑ. ඒ නිසා මේකට "compile-time polymorphism" කියනවා (overriding — 1.1.5.2 — runtime එකේ තීරණය වෙනවා; ඒක වෙනස).',
      },
    ],
    analogy:
      '"open" කියන වචනෙ වගේ — "දොර open කරන්න", "bank account එකක් open කරන්න", "file එකක් open කරන්න". එකම වචනෙ, ඒත් context (arguments — දොර ද, account ද, file ද) අනුව තේරුම වෙනස්. ඔයා කියන දේ අනුව අනිත් කෙනා (compiler) හරි අර්ථය තෝරගන්නවා.',
    code: [
      {
        filename: 'AudienceBuilder.java',
        language: 'java',
        code: `public class AudienceBuilder {

    // overload 1: attribute filter (String, String)
    public void addFilter(String attribute, String value) {
        System.out.println(attribute + " = " + value);
    }

    // overload 2: range filter (String, int, int) — parameters ගාන වෙනස්
    public void addFilter(String attribute, int min, int max) {
        System.out.println(attribute + " between " + min + " and " + max);
    }

    // overload 3: predictive filter (ChurnStatus) — type වෙනස්
    public void addFilter(ChurnStatus status) {
        System.out.println("churn = " + status);
    }
}`,
        note: 'තුනම නම "addFilter" — ඒත් parameter list තුනක්.',
      },
      {
        filename: 'CompilerPicks.java',
        language: 'java',
        code: `AudienceBuilder b = new AudienceBuilder();

// compiler arguments බලලා compile-time එකේදීම හරි version එක තෝරනවා:
b.addFilter("country", "LK");          // -> overload 1 (String, String)
b.addFilter("age", 18, 35);            // -> overload 2 (String, int, int)
b.addFilter(ChurnStatus.ACTIVE);       // -> overload 3 (ChurnStatus)`,
        note: 'Arguments අනුව compiler correct method එක select කරනවා (static binding).',
      },
      {
        filename: 'IllegalOverload.java',
        language: 'java',
        code: `class Bad {
    int  score(String id) { return 1; }
    // String score(String id) { return "x"; }  //  COMPILE ERROR!
    // return type එක විතරක් වෙනස් — parameter list එකම -> overload නෙවෙයි
}`,
        note: 'Return type එක විතරක් වෙනස් කලාට overload වෙන්නෙ නෑ.',
      },
    ],
    mortar:
      'Mortar visual segment builder එකේ condition වර්ග තුනක් තියෙනවා — attribute, event, predictive. `addFilter(...)` එකම නමින් overload කරලා, developer ට එක clean, intuitive API එකක් දෙනවා: argument එක අනුව හරි rule එකම හැදෙනවා, methods 3ක නම් මතක තියාගන්න ඕන නෑ. Java standard library එකේ `println(int)`, `println(String)`, `println(boolean)` වගේම.',
    keyPoints: [
      'Overloading = same name + different parameter list (count/type/order).',
      'Compiler compile-time එකේදී තෝරනවා → compile-time / static polymorphism.',
      'Return type එක විතරක් වෙනස් කරලා overload කරන්න බෑ.',
      'API එකක් clean + intuitive කරන්න පාවිච්චි කරනවා.',
    ],
    pitfalls: [
      'Overloading (compile-time, parameters වෙනස්) සහ Overriding (run-time, signature සමානයි — 1.1.5.2) එකතු කරන්න එපා.',
      'Autoboxing + overloading එකට ආවම ambiguity එන්න පුළුවන් (`method(int)` vs `method(Integer)`) — compiler වඩාත්ම specific එක තෝරනවා.',
    ],
  },

  '1.1.5.2': {
    summary:
      'Method Overriding = subclass එකක් parent එකේ method එකේම signature එකෙන් (same name + parameters) අලුත් implementation එකක් දෙන එක. Runtime එකේදී object එකේ ඇත්ත type එක අනුව හරි version එක run වෙනවා (run-time polymorphism).',
    sinhala: [
      {
        heading: 'කතාව: scheduler එකට connector type එක දැනගන්න ඕන නෑ',
        body: 'Mortar sync scheduler එකට connectors ලැයිස්තුවක් තියෙනවා — Shopify, Klaviyo, WooCommerce. හැම එකකම "sync කරන්න" කියන්න ඕන. ඒත් Shopify sync කරන විදිහයි Klaviyo sync කරන විදිහයි සම්පූර්ණයෙන් වෙනස්. දැන් scheduler එකේ `if (connector instanceof Shopify) {...} else if (...) {...}` වගේ ලිව්වොත්? connectors 15ක් එද්දී මේ if-ladder එක බියකරුයි, අලුත් එකක් add කරනකොට හැම තැනම edit කරන්න වෙනවා. ඕන වෙන්නේ — හැම එකකටම `sync()` කියලා call කරලා, හරි implementation එක automatic run වෙන එක. ඒකට තමයි overriding.',
      },
      {
        heading: 'Overriding වැඩ කරන විදිහ',
        body: 'Subclass එකක් parent එකේ method එකක්ම — **same name + same parameters (signature)** — නැවත define කරනකොට, ඒක "override" වෙනවා. පියවර:',
        points: [
          'Parent (හෝ interface/abstract) එකේ method එකක් තියෙනවා — `sync()` වගේ.',
          'Subclass එක එකම signature එකෙන් තමන්ගේම body එකක් ලියනවා (`@Override` දාන්න).',
          'Runtime එකේදී — reference type එක නෙවෙයි, **object එකේ ඇත්ත type එක** අනුව හරි version එක run වෙනවා (dynamic dispatch).',
          'ඒ නිසා `Connector c = new KlaviyoConnector(); c.sync();` කරාම Klaviyo ගේ sync එක run වෙනවා.',
        ],
      },
      {
        heading: 'මේකෙන් එන බලය: polymorphism',
        body: 'Overriding නිසා — එකම `Connector` type එක හරහා, වෙන වෙන behaviours trigger කරන්න පුළුවන් (object එකට අනුව). Scheduler එකට `List<Connector>` එකක් loop කරලා `sync()` call කරන්න පුළුවන්, connector type එක දැනගන්නෙ නැතුව. if-ladders නෑ. මේකයි OOP එකේ ලොකුම බලය — "program to the abstraction, behaviour varies at runtime".',
      },
    ],
    analogy:
      'Manager කෙනෙක් team එකට "report එක හදන්න" කියනවා (එකම instruction). Developer report එක code විදිහට හදනවා, designer mockup විදිහට හදනවා — එකම instruction, ඒත් කවුද කරන්නේ කියන එක අනුව වෙනස් result. Manager ට කවුද මොනවද කරන්නේ කියලා දැනගන්න ඕන නෑ.',
    code: [
      {
        filename: 'Overriding.java',
        language: 'java',
        code: `abstract class Connector {
    abstract void sync();               // parent contract
}

class ShopifyConnector extends Connector {
    @Override                            // annotation -> compiler verify කරනවා
    void sync() {
        System.out.println("Shopify REST API එකෙන් sync");
    }
}

class KlaviyoConnector extends Connector {
    @Override
    void sync() {
        System.out.println("Klaviyo two-way sync");   // වෙනස් behaviour, එකම signature
    }
}`,
        note: 'දෙකම sync() — signature එකයි, body වෙනස් (override).',
      },
      {
        filename: 'DynamicDispatch.java',
        language: 'java',
        code: `// reference type එක Connector වුණත්...
Connector c = new KlaviyoConnector();
c.sync();  // -> "Klaviyo two-way sync" (object එකේ ඇත්ත type එක අනුව!)

// polymorphism: scheduler එකට type එක දැනගන්න ඕන නෑ
List<Connector> connectors = List.of(
    new ShopifyConnector(), new KlaviyoConnector());

for (Connector conn : connectors) {
    conn.sync();   // හැම එකකම හරි sync() එක runtime එකේ automatic run වෙනවා
}
// -> Shopify REST API එකෙන් sync
// -> Klaviyo two-way sync`,
        note: 'Runtime එකේ object එකේ actual type එක අනුව හරි sync() එක call වෙනවා (dynamic dispatch).',
      },
    ],
    mortar:
      'Mortar sync scheduler එක `List<Connector>` එකක් loop කරලා හැම එකකම `sync()` call කරනවා — connector type එක දැනගන්නෙ නැතුව. Overriding + dynamic dispatch නිසා හරි implementation එක (Shopify/Klaviyo/Woo) runtime එකේ automatic run වෙනවා. අලුත් connector එකක් add කරනකොට scheduler code එක වෙනස් වෙන්නෙම නෑ — `sync()` override කරන අලුත් class එකක් දැම්මම ඇති (Open/Closed — 5.1.2).',
    keyPoints: [
      'Overriding = same signature, subclass එකේ අලුත් implementation (`@Override`).',
      'Runtime එකේ object එකේ ඇත්ත type එක අනුව තෝරනවා → run-time / dynamic polymorphism.',
      '`@Override` හැමවිටම දාන්න — typos/signature වැරදි compile-time එකේ අල්ලනවා.',
      'Polymorphism → if-ladders නැතුව, type එකට depend නොවී behaviour vary කරන්න පුළුවන්.',
    ],
    pitfalls: [
      'Overriding (run-time, signature සමානයි) සහ Overloading (compile-time, parameters වෙනස් — 1.1.5.1) confuse කරන්න එපා.',
      '`private`, `static`, `final` methods override කරන්න බෑ (`static` "hide" වෙනවා, override නෙවෙයි).',
      'Override එකේ access එක අඩු කරන්න බෑ (parent `public` නම් child `private` කරන්න බෑ); return type covariant වෙන්න පුළුවන්.',
    ],
  },

  '1.2.1': {
    summary:
      'Abstract class = "අඩක් හදපු" class එකක්. පොදු code එක ඇතුලේ තියාගෙන, වෙනස් වෙන කොටස් විතරක් subclasses වලට ලියන්න දෙනවා. කෙලින්ම `new` කරන්න බෑ.',
    sinhala: [
      {
        heading: 'කතාව: Mortar එකේ connectors problem එක',
        body: 'හිතන්න ඔයා Mortar team එකට අලුතෙන් join වුණා. ඔයාට වැඩේ — Shopify, WooCommerce, Klaviyo වගේ platforms වලින් customers sync කරන "connectors" හදන්න. පොඩ්ඩක් බලද්දී ඔයාට පේනවා, හැම connector එකක්ම එකම steps 3ක් කරනවා:',
        points: [
          'login / authenticate වෙනවා — මේ step එක හැම connector එකකටම එකයි.',
          'data sync කරනවා — මේ step එක විතරයි platform එකට වෙනස් (Shopify sync කරන විදිහ ≠ Klaviyo sync කරන විදිහ).',
          '"done" කියලා notify කරනවා — මේ step එකත් හැම connector එකකටම එකයි.',
        ],
      },
      {
        heading: 'ප්‍රශ්නෙ: copy-paste කරොත්?',
        body: 'දැන් හැම connector එකකම මේ login + notify code එක copy-paste කරොත්, connectors 15ක් තියෙනවා නම් එකම code එක තැන් 15ක. bug එකක් හදුනොත් තැන් 15කම fix කරන්න වෙනවා — maintainability අනතුරක්. ඒ නිසා පොදු code එක එක තැනක තියාගන්න විදිහක් ඕන. ඒකට තමයි abstract class.',
      },
      {
        heading: 'විසඳුම: Abstract class එකක්',
        body: 'Tech lead කියනවා — "පොදු steps ටික එක තැනක තියන්න, වෙනස් වෙන step එක විතරක් හිස් තියන්න." ඒකට තමයි abstract class. `abstract` කියලා class එකක් හදනකොට:',
        points: [
          'ඒක කෙලින්ම `new` කරන්න බෑ — "Connector" කෙනෙක් තනිකරම නෑ; Shopify connector, Klaviyo connector වගේ concrete අය තමයි ඉන්නේ.',
          'ඒකට පොදු code තියෙන normal (concrete) methods තියෙන්න පුළුවන් — `login()`, `notify()` වගේ.',
          'ඒකට body නැති `abstract` methods තියෙන්න පුළුවන් — `sync()` වගේ — ඒ method එක subclass එක ලියන්නම ඕන.',
          'හැම subclass එකක්ම common code එක නොමිලේ උරුම කරගෙන, තමන්ගේ `sync()` එක විතරක් ලියනවා.',
        ],
      },
      {
        heading: 'මතක තියාගන්න rules 3ක්',
        points: [
          'Abstract class එකක් `new` කරන්න බෑ — subclass එකක් හරහා විතරයි use කරන්නේ.',
          'Subclass එකක් abstract methods ඔක්කොම implement කරන්නම ඕන — නැත්නම් ඒ subclass එකත් `abstract` වෙන්න ඕන.',
          'Abstract class එකට normal class එකක් වගේ fields (state), constructors, සහ concrete methods තියෙන්න පුළුවන් — interface එකට වඩා මේක ලොකු වෙනසක්.',
        ],
      },
    ],
    analogy:
      'Restaurant franchise එකක recipe book එකක් වගේ. Book එකේ පොදු steps ලියලා ("මේ පිළිවෙළට plate කරන්න, මේ විදිහට serve කරන්න"), ඒත් "signature dish" එක හිස් තියලා — හැම branch එකක්ම ඒ කොටස තමන්ගේ විදිහට පුරවනවා. Recipe book එකෙන් කෑමක් කන්න බෑ (abstract); branch එකක් හැදුවම තමයි කන්න පුළුවන් (concrete subclass).',
    code: [
      {
        filename: 'AbstractConnector.java',
        language: 'java',
        code: `// 'abstract' නිසා මේක කෙලින්ම new කරන්න බෑ — base එකක් විතරයි
public abstract class AbstractConnector {

    protected final String brandId;              // shared state (හැම connector එකටම)

    protected AbstractConnector(String brandId) { // constructor එකකුත් තියෙනවා
        this.brandId = brandId;
    }

    // concrete method: පොදු flow එක — හැම connector එකකම එකයි
    public final void run() {
        authenticate();     // step 1 — පොදුයි
        sync();             // step 2 — subclass එකට වෙනස් (abstract)
        notifyDone();       // step 3 — පොදුයි
    }

    // concrete: default login logic (subclass එකට override කරන්නත් පුළුවන්)
    protected void authenticate() {
        System.out.println(brandId + ": OAuth login කරනවා");
    }

    // concrete: පොදු notify
    private void notifyDone() {
        System.out.println(brandId + ": sync ඉවරයි ✅");
    }

    // abstract: body නෑ — හැම connector එකක්ම මේක ලියන්නම ඕන
    protected abstract void sync();
}`,
        note: 'run() = පොදු flow (එක තැනක); sync() = subclass එක පුරවන හිස් තැන.',
      },
      {
        filename: 'ShopifyConnector.java',
        language: 'java',
        code: `// subclass එක: sync() විතරක් ලියනවා — login/notify නොමිලේ උරුම වෙනවා
public class ShopifyConnector extends AbstractConnector {

    public ShopifyConnector(String brandId) {
        super(brandId);                          // parent constructor එකට brandId දෙනවා
    }

    @Override
    protected void sync() {                       // abstract method එක පුරවනවා
        System.out.println(brandId + ": Shopify REST API එකෙන් orders ගන්නවා");
    }
}

class Demo {
    public static void main(String[] args) {
        // AbstractConnector c = new AbstractConnector("x"); //  ERROR: abstract, new කරන්න බෑ
        AbstractConnector c = new ShopifyConnector("brand-42"); // ✅ subclass එකෙන්
        c.run();  // login -> Shopify sync -> notify (පොදු flow + custom sync)
    }
}`,
        note: 'ShopifyConnector එකට login/notify ලියන්න ඕන නෑ — abstract base එකෙන් උරුමයි.',
      },
    ],
    mortar:
      'Mortar එකේ connectors 15+ ක් තියෙනවා, හැම එකකම flow එක එකයි: authenticate → sync → notify. ඒ පොදු flow එක `AbstractConnector.run()` එකේ එක තැනක; `sync()` විතරයි abstract (platform එකට වෙනස්). අලුත් platform එකක් add කරනකොට — subclass එකක් හදලා sync() එක විතරක් ලියනවා, ඉතුරු ඔක්කොම නොමිලේ. මේ pattern එකට "Template Method" කියනවා (5.3.3.4 එකේ ආයෙ හම්බවෙනවා).',
    keyPoints: [
      'Abstract class = කෙලින්ම `new` කරන්න බෑ; subclass එකක් හරහා විතරයි.',
      'ඇතුලේ concrete methods (පොදු code) + abstract methods (හිස් තැන්) mix කරන්න පුළුවන්.',
      'Subclass එකක් abstract methods ඔක්කොම implement කරන්නම ඕන.',
      'Interface එකට වඩා වෙනස: abstract class එකට state (fields) + constructors තියෙනවා.',
    ],
    pitfalls: [
      'Abstract method එකක් තියෙන class එකක් `abstract` කියලා mark කරන්නම ඕන — නැත්නම් compile error.',
      'Subclass එකක් abstract methods සම්පූර්ණයෙන් implement නොකළොත්, ඒ subclass එකත් abstract වෙනවා (new කරන්න බෑ).',
    ],
  },

  '1.2.2': {
    summary:
      'Interface = contract එකක්. Java 8-ට කලින් abstract methods විතරයි; Java 8 වලින් `default` + `static`, Java 9 වලින් `private` methods add වුණා.',
    sinhala: [
      {
        heading: 'කතාව: contract එකකින් පටන් ගමු',
        body: 'හිතන්න Mortar activation team එකේ ඔයාට වැඩේ — audiences Meta, Google, Klaviyo වගේ තැන් වලට push කරන "sinks" හදන්න. ඔයා තීරණය කරනවා හැම sink එකක්ම `push(ids)` කියලා method එකක් තියෙන්නම ඕන කියලා — ඒත් ඒක **කොහොම** කරනවද කියන එක එක එකකට වෙනස්. මේ "හැමෝම මේ method එක තියෙන්නම ඕන" කියන පොරොන්දුවට තමයි **interface** කියන්නේ. Java 8 වලින් interface එකට තවත් බලයක් ආවා — හැම sink එකකටම නොමිලේ දෙන පොදු behaviour (default), සහ sink එකක් හදන factory helpers (static). ඒ ගැන පියවරෙන් පියවර බලමු.',
      },
      {
        heading: 'Interface එකක method වර්ග 4',
        body: 'Interface එකක් class එකක් අනුගමනය කරන්නම ඕන "contract" එකක්. Java 8-ට කලින් තිබුණේ abstract methods විතරයි (body නැති). දැන් වර්ග 4ක් තියෙනවා: (1) `abstract` — body නෑ, implementing class එක ලියන්නම ඕන. (2) `default` — body තියෙනවා, හැම object එකකටම නොමිලේ ලැබෙනවා (Java 8). (3) `static` — body තියෙනවා, interface name එකෙන් call කරනවා (Java 8). (4) `private` — default/static methods වලට ඇතුලෙන් reuse කරන helper (Java 9). Class එකකට interfaces කිහිපයක් `implements` කරන්න පුළුවන් (multiple inheritance of type).',
      },
      {
        heading: 'default method — instances වලට එන පොදු behaviour',
        body: '`default` method එකකට interface එකේම body එකක් තියෙනවා. හැම implementing class එකකටම ඒක automatically ලැබෙනවා — override නොකළොත් default version එක run වෙනවා. ඇයි ආවේ: පරණ interface එකකට අලුත් method එකක් add කරනකොට ඒක implement කරපු classes ඔක්කොම කැඩෙනවා. `default` body එකක් දීලා, පරණ code කැඩෙන්නෙ නැතුව interface එක evolve කරන්න පුළුවන් (backward compatibility). Instance method එකක් නිසා `this` access කරන්න, class එකේ අනිත් methods call කරන්න පුළුවන්; ඕන නම් override කරන්නත් පුළුවන්.',
      },
      {
        heading: 'static method — interface එකට අයිති utility/factory',
        body: '`static` method එකක් object එකක් නැතුව interface name එකෙන් call කරනවා (`Interface.method()`) — ඒක object එකකට නෙවෙයි, interface එකට අයිති. Related helper/factory methods වෙනම `XxxUtils` class එකක් නැතුව interface එකේම තියාගන්න පුළුවන් (cohesion). `this` නෑ, override කරන්න බෑ, implementing class එකට inherit වෙන්නෙත් නෑ — හැමවිටම `Interface.method()`.',
      },
      {
        heading: 'default vs static — මූලික වෙනස',
        body: '`default`: object එකට අයිති, `obj.method()` විදිහට call, `this` access පුළුවන්, override පුළුවන්, implementing class එකට inherit වෙනවා — shared **behaviour** එකකට. `static`: interface එකට අයිති, `Interface.method()` විදිහට call, `this` නෑ, override බෑ, inherit වෙන්නෙ නෑ — **factory/utility** helper එකකට. මතක තියාගන්න: default = "හැම object එකකටම නොමිලේ එන behaviour", static = "interface එකට අමුණපු toolbox".',
      },
    ],
    analogy:
      'Interface එක "බලපත්‍රයක්" වගේ ("මම sync කරන්න පුළුවන්"). `default` method එක = බලපත්‍රය එක්කම එන පොදු පහසුකමක් (හැම දරුවෙක්ටම නොමිලේ). `static` method එක = බලපත්‍රය නිකුත් කරන office එකේ front-desk service එකක් (කෙනෙක් නැතුවම, office එකෙන්ම ගන්නවා).',
    code: [
      {
        filename: 'DefaultMethod.java',
        language: 'java',
        code: `public interface AudienceSink {
    void push(List<String> ids);          // abstract: each sink writes this

    // default: every sink gets retry behaviour for FREE (instance method)
    default void pushWithRetry(List<String> ids) {
        for (int attempt = 1; attempt <= 3; attempt++) {
            try { push(ids); return; }    // 'this' sink's own push()
            catch (Exception e) { System.out.println("retry " + attempt); }
        }
        throw new RuntimeException("push failed after 3 tries");
    }
}

class MetaSink implements AudienceSink {
    public void push(List<String> ids) { /* Meta API call */ }
    // pushWithRetry() ලියන්න ඕන නෑ — default නිසා නොමිලේ ලැබෙනවා
}

// call on the OBJECT
new MetaSink().pushWithRetry(ids);`,
        note: 'default = instance method; obj.method() විදිහට call, override කරන්නත් පුළුවන්.',
      },
      {
        filename: 'StaticMethod.java',
        language: 'java',
        code: `public interface AudienceSink {
    void push(List<String> ids);

    // static factory: build a sink WITHOUT an object
    static AudienceSink forPlatform(String platform) {
        return switch (platform) {
            case "meta"   -> new MetaSink();
            case "google" -> new GoogleSink();
            default        -> ids -> System.out.println("no-op"); // lambda impl
        };
    }

    // static utility helper
    static boolean isValidBatch(List<String> ids) {
        return ids != null && !ids.isEmpty() && ids.size() <= 1_000_000;
    }
}

// call on the INTERFACE NAME (no object)
AudienceSink sink = AudienceSink.forPlatform("meta");
if (AudienceSink.isValidBatch(ids)) sink.push(ids);`,
        note: 'static = Interface.method(); object එකක් නෑ, override/inherit බෑ.',
      },
      {
        filename: 'Connector.java',
        language: 'java',
        code: `// all four kinds together on one interface
public interface Connector {
    List<Customer> fetch();                       // 1. abstract

    default List<Customer> fetchValidOnly() {     // 2. default (uses fetch())
        return fetch().stream().filter(Connector::hasEmail).toList();
    }

    static Connector of(String platform) {        // 3. static factory
        return switch (platform) {
            case "shopify" -> new ShopifyConnector();
            case "klaviyo" -> new KlaviyoConnector();
            default -> throw new IllegalArgumentException(platform);
        };
    }

    private static boolean hasEmail(Customer c) { // 4. private (Java 9) helper
        return c.getEmail() != null && c.getEmail().contains("@");
    }
}

Connector c = Connector.of("shopify");   // static factory
List<Customer> clean = c.fetchValidOnly(); // default (calls class's fetch())`,
        note: 'abstract = must implement, default = free behaviour, static = factory, private = internal helper.',
      },
    ],
    mortar:
      'Mortar activation layer එකේ Meta/Google/Klaviyo destinations හැම එකක්ම `AudienceSink`. `pushWithRetry()` **default** method එකෙන් හැම destination එකකටම retry logic නොමිලේ (duplicate නැතුව). `AudienceSink.forPlatform(...)` **static** factory එකෙන් UI/service එකට concrete class දැනගන්න ඕන නෑ (Factory Method — 5.3.1.2 එකට tie වෙනවා). Connectors වලත් `Connector.of(...)` factory + `fetchValidOnly()` default behaviour එකම pattern එක.',
    keyPoints: [
      'Interface methods 4: `abstract` / `default` / `static` / `private`.',
      '`default` = object එකට අයිති (instance), `obj.method()`, `this` OK, override OK, inherit වෙනවා → shared behaviour.',
      '`static` = interface එකට අයිති, `Interface.method()`, `this` නෑ, override/inherit බෑ → factory/utility.',
      '`default` methods backward-compatible විදිහට interface එකට අලුත් methods add කරන්න.',
      'Fields interface වල implicitly `public static final` (constants).',
    ],
    pitfalls: [
      '`static` method inherit වෙන්නෙ නෑ — `MetaSink.forPlatform(...)` බෑ, `AudienceSink.forPlatform(...)` විතරයි.',
      'Interfaces දෙකකට එකම `default` method එකක් තිබුණොත් diamond problem — override කරලා `Interface.super.method()` වලින් resolve කරන්නම ඕන (බලන්න 1.2.5).',
      '`Object` class එකේ methods (`equals`, `hashCode`, `toString`) `default` විදිහට දෙන්න බෑ.',
    ],
  },

  '1.2.3': {
    summary:
      'දෙකම "අඩක් හදපු" types — අනිත් classes සම්පූර්ණ කරන. Abstract class = shared state + base identity (එකයි extend කරන්නේ). Interface = capabilities contract (කිහිපයක් mix කරන්න පුළුවන්).',
    sinhala: [
      {
        heading: 'දෙකම මොකක්ද? (සරලවම)',
        body: 'Abstract class එකයි interface එකයි දෙකම "අඩක් සම්පූර්ණ" blueprints — කෙලින්ම `new` කරන්න බෑ, subclass/implementing class එකක් සම්පූර්ණ කරන්නම ඕන. වෙනස තියෙන්නේ **rules** වල. Abstract class එකක් සාමාන්‍ය class එකක් වගේ — fields (state), constructors, සහ body තියෙන normal methods තියෙන්න පුළුවන් — ඒත් `abstract` කියපු නිසා instantiate කරන්න බෑ, සහ subclass එකට එකයි extend කරන්න පුළුවන්. Interface එකක් "capability contract" එකක් — කලින් methods signatures විතරයි, දැන් default/static bodies-ත් — ඒත් instance state (mutable fields) නෑ, class එකකට interfaces කිහිපයක් implement කරන්න පුළුවන්.',
      },
      {
        heading: 'Point-by-point වෙනස',
        body: 'මූලික වෙනස්කම් 5ක්:',
        points: [
          'Inheritance: class එකකට abstract class එකයි `extend` කරන්න පුළුවන්; interfaces කිහිපයක් `implement` කරන්න පුළුවන්.',
          'State: abstract class එකට instance fields (mutable state — `private double spend;` වගේ) තියෙන්න පුළුවන්; interface එකට constants (`public static final`) විතරයි.',
          'Constructors: abstract class එකට තියෙනවා (subclass එකෙන් `super(...)` call වෙනවා); interface එකට නෑ.',
          'Methods: abstract class එකට `private`/`protected`/`public` ඕන එකක්; interface members public (private helpers ඇතුලෙ hidden).',
          'Relationship: abstract class = "IS-A" (identity — Dog IS-A Animal); interface = "CAN-DO" (capability — Dog CAN Swim).',
        ],
      },
      {
        heading: 'කවදා මොකක්ද තෝරන්නේ (decision guide)',
        body: 'Shared **state** + shared **code** + strong "IS-A" identity තියෙනවා නම් → abstract class (උදා: හැම connector එකකම brandId + පොදු run() flow). හුදෙක් "මේ දේ කරන්න පුළුවන්" කියන capability එකක් නම්, unrelated types වලට apply වෙනවා නම්, class එකකට කිහිපයක් අවශ්‍ය නම් → interface (උදා: Exportable, Schedulable). අවුල නම්: **interface එකෙන් පටන් ගන්න** — modern Java වල interface + default methods බොහෝවිට enough, coupling අඩුයි. දෙකම එකට use කරන්නත් පුළුවන් — base identity abstract class එකෙන්, extra capabilities interfaces වලින්.',
      },
    ],
    analogy:
      'Abstract class = "මම Connector කෙනෙක්" කියන **පවුලේ නම + උරුමය** (brandId, පොදු පුරුදු) — එක පවුලකට විතරයි අයිති වෙන්න පුළුවන් (single extend). Interface = "පිහිනන්න පුළුවන්", "රිය පදවන්න පුළුවන්" වගේ **බලපත්‍ර** — කෙනෙක්ට කීපයක් තියාගන්න පුළුවන් (multiple implement), පවුල මොකක් වුනත්.',
    code: [
      {
        filename: 'AbstractVsInterface.java',
        language: 'java',
        code: `// ABSTRACT CLASS: base identity + shared STATE + shared CODE
abstract class AbstractConnector {
    protected final String brandId;               // state (fields)
    protected AbstractConnector(String brandId) { // constructor
        this.brandId = brandId;
    }
    public final void run() {                     // shared concrete code
        authenticate();
        sync();                                   // subclass fills this
    }
    protected void authenticate() { /* shared */ }
    protected abstract void sync();               // must implement
}

// INTERFACES: capabilities — small, mixable, no state
interface Exportable  { void export(); }
interface Schedulable { void schedule(); }

// one base identity (extends) + many capabilities (implements)
class ShopifyConnector extends AbstractConnector
        implements Exportable, Schedulable {
    ShopifyConnector(String brandId) { super(brandId); }
    protected void sync()   { /* Shopify sync */ }
    public void export()    { /* to CSV */ }
    public void schedule()  { /* nightly */ }
}`,
        note: 'extends = එකයි (identity+state); implements = කීපයක් (capabilities).',
      },
      {
        filename: 'WhyNotBoth.java',
        language: 'java',
        code: `// A class can only EXTEND one — this is illegal:
// class X extends AbstractConnector, AbstractExporter { }  //  COMPILE ERROR

// But it can IMPLEMENT many — perfectly fine:
class KlaviyoConnector extends AbstractConnector
        implements Exportable, Schedulable, AutoCloseable {  // 3 capabilities
    KlaviyoConnector(String b) { super(b); }
    protected void sync()  { }
    public void export()   { }
    public void schedule() { }
    public void close()    { }
}`,
        note: 'Single inheritance (class) vs multiple capabilities (interfaces).',
      },
    ],
    mortar:
      'Mortar connector එකක් `AbstractConnector` එකෙන් **identity + brandId state + පොදු run() flow** උරුම කරගන්නවා (හැම connector එකක්ම මූලිකවම එකයි). ඊට අමතරව, සමහර connectors export පුළුවන්, සමහර schedule පුළුවන් — ඒ **capabilities** `Exportable`/`Schedulable` interfaces වලින් mix කරගන්නවා. ඒ නිසා "connector කෙනෙක්" කියන identity එකයි, "මොනවා කරන්න පුළුවන්ද" කියන capabilities එකයි වෙන් වෙනවා — flexible, testable design එකක්.',
    keyPoints: [
      'දෙකම instantiate කරන්න බෑ — අනිත් class සම්පූර්ණ කරන්නම ඕන.',
      'Abstract class: single `extends`, instance state + constructors OK → "IS-A" identity + shared code.',
      'Interface: multiple `implements`, state නෑ (constants only) → "CAN-DO" capabilities.',
      'Rule of thumb: interface එකෙන් පටන් ගන්න; shared state/code ඕන වුනාම abstract class.',
      'දෙක එකට: base identity abstract class + extra capabilities interfaces.',
    ],
    pitfalls: [
      'Class එකකට abstract classes දෙකක් extend කරන්න බෑ (single inheritance) — capabilities කිහිපයක් ඕන නම් interfaces use කරන්න.',
      'Interface එකට instance state (mutable fields) දාන්න හදන එක වැරදියි — ඒවා constants (`public static final`) විතරයි.',
    ],
  },

  '1.2.4': {
    summary:
      'Constructor chaining = එක constructor එකක් තව constructor එකකට "වැඩේ භාර දෙන" එක. `this(...)` = එකම class එකේ තව constructor එකකට; `super(...)` = parent එකේ constructor එකට.',
    sinhala: [
      {
        heading: 'කතාව: Customer object එක හදන විදි කිහිපයක්',
        body: 'Mortar එකට customers එන්නේ විවිධ තැන් වලින්. සමහරු email විතරක් දෙනවා; තව සමහරු email + country දෙනවා; තව සමහරු email + country + phone. ඔයාට ඕන මේ හැම විදිහටම `Customer` object එකක් හදන්න පුළුවන් වෙන්න. ඉතින් ඔයා constructors කිහිපයක් ලියනවා. ඒත් ප්‍රශ්නෙ — හැම constructor එකකම එකම initialization logic (validation, defaults set කිරීම) copy-paste වෙනවා. Copy-paste = future එකේ අවුල්.',
      },
      {
        heading: 'විසඳුම: this(...) එකෙන් වැඩේ භාර දීම',
        body: 'තව constructor එකකට වැඩේ භාර දෙන්න පුළුවන් — `this(...)` වලින්. පොඩි constructor එකක් (email විතරක්) ලොකු constructor එකට (email + country) call කරනවා, missing values වලට defaults දීලා. ඒ නිසා ඇත්ත initialization logic තියෙන්නේ **එක තැනක** විතරයි. මේකට "constructor chaining" කියනවා. Inheritance එක්ක වැඩ කරනකොට තව keyword එකක් තියෙනවා — `super(...)` — ඒකෙන් parent class එකේ constructor එකට values pass කරනවා (child object එකක් හදනකොට parent කොටසත් initialize වෙන්නම ඕන නිසා).',
      },
      {
        heading: 'රීතිය: first line එක වෙන්නම ඕන',
        body: '`this(...)` හෝ `super(...)` call එකක් constructor එකේ **පළවෙනි statement එක** වෙන්නම ඕන — නැත්නම් compile error. ඔයා `super(...)` explicitly නොලිව්වොත්, Java automatically parent එකේ no-argument `super()` එකක් දානවා. ඒ නිසා parent එකට no-arg constructor එකක් නැත්නම්, child එකේ explicitly `super(...)` දෙන්නම ඕන.',
      },
    ],
    analogy:
      'Form එකක් පුරවනකොට "ඉහත ලිපිනයම" කියලා tick කරනවා වගේ — ආයෙ මුල ඉඳන් ලියන්නෙ නෑ, කලින් තැනට reference කරනවා. `this(...)` = "ඒ ලොකු constructor එකම use කරන්න"; `super(...)` = "මගේ පවුලේ (parent) වැඩේ මුලින් කරලා දෙන්න".',
    code: [
      {
        filename: 'Customer.java',
        language: 'java',
        code: `public class Customer {
    private final String email;
    private final String country;
    private final String phone;

    // පොඩිම constructor — email විතරයි. වැඩේ ලොකු එකට භාර දෙනවා.
    public Customer(String email) {
        this(email, "UNKNOWN");           // 'this(...)' = same class තව constructor
    }

    // මැද constructor — email + country. මේකත් ලොකු එකට භාර දෙනවා.
    public Customer(String email, String country) {
        this(email, country, "");          // phone එකට default හිස් string
    }

    // ලොකුම constructor — ඇත්ත init logic මෙතන විතරයි (single source of truth)
    public Customer(String email, String country, String phone) {
        if (email == null || !email.contains("@"))   // validation එක තැනක
            throw new IllegalArgumentException("email වැරදියි");
        this.email = email;
        this.country = country;
        this.phone = phone;
    }
}

// new Customer("a@x.com")                 -> country=UNKNOWN, phone=""
// new Customer("a@x.com", "LK")           -> phone=""
// new Customer("a@x.com", "LK", "0771..") -> ඔක්කොම`,
        note: 'this(...) එකෙන් හැම constructor එකක්ම එක "master" constructor එකට chain වෙනවා.',
      },
      {
        filename: 'SuperCall.java',
        language: 'java',
        code: `class Customer {
    protected final String email;
    Customer(String email) {                 // parent constructor
        this.email = email;
    }
}

// Shopify customer එකකට parent (Customer) කොටසත් init වෙන්නම ඕන
class ShopifyCustomer extends Customer {
    private final String shopifyId;

    ShopifyCustomer(String email, String shopifyId) {
        super(email);                        // 'super(...)' = parent constructor (මුල් line එක!)
        this.shopifyId = shopifyId;          // ඊට පස්සේ child කොටස
    }
}`,
        note: 'super(...) හැමවිටම constructor එකේ පළවෙනි line එක වෙන්නම ඕන.',
      },
    ],
    mortar:
      'Mortar customer objects source එක අනුව අඩු/වැඩි data එක්ක එනවා (email විතරක් ඉඳන් සම්පූර්ණ profile එක දක්වා). Constructor chaining වලින් convenient constructors කිහිපයක් දෙන්න පුළුවන් — ඒත් validation + defaults logic එක **එක තැනක** විතරයි. ඒ නිසා bug එකක් තිබුනොත් fix කරන්නෙ එක තැනක; හැම object එකක්ම එකම නීතිවලින් හැදෙනවා (data integrity).',
    keyPoints: [
      '`this(...)` = එකම class එකේ තව constructor එකකට chain (duplicate code අඩු කරයි).',
      '`super(...)` = parent class එකේ constructor එකට values pass කරයි.',
      'දෙකම constructor එකේ **පළවෙනි statement** එක වෙන්නම ඕන — එකවර දෙකම බෑ.',
      'Init logic එක තැනක (single source of truth) → DRY.',
    ],
    pitfalls: [
      'Constructor A → B → A වගේ cycle එකක් හැදුනොත් compile error ("recursive constructor invocation").',
      'Parent එකට no-arg constructor නැත්නම්, child එකේ `super(...)` explicitly දෙන්නම ඕන (නැත්නම් Java automatic දාන `super()` එක fail වෙනවා).',
    ],
  },

  '1.2.5': {
    summary:
      'Diamond problem = types දෙකකින් එකම method එක උරුම වුනොත් "කුමන එකද run කරන්නේ?" කියන confusion එක. Java classes වලට මේ ප්‍රශ්නෙ නෑ; interface default methods clash වුනොත් override කරලා විසඳනවා.',
    sinhala: [
      {
        heading: 'කතාව: ප්‍රශ්නෙ ඇති වෙන්නේ කොහොමද',
        body: 'හිතන්න type A එකට `hello()` කියන method එකක් තියෙනවා. B සහ C දෙකම A එකෙන් inherit කරලා, `hello()` එක වෙන වෙනම වෙනස් කරනවා. දැන් D කියන එක B **සහ** C දෙකෙන්ම inherit කරොත්? D එකේ `hello()` call කරනකොට — B ගේ එකද, C ගේ එකද run වෙන්නේ? මේ confusion එකට "diamond problem" කියනවා (A→B, A→C, B+C→D ඇඳලා බැලුවම diamond ◇ හැඩය නිසා). Ambiguity එකක්.',
      },
      {
        heading: 'Java ගේ පළවෙනි විසඳුම: classes multiple inherit කරන්න බෑ',
        body: 'Java මේක සරලවම විසඳුවා — **class එකකට extend කරන්න පුළුවන් එකයි**. ඒ නිසා classes එක්ක diamond problem එකක් කවදාවත් එන්නෙ නෑ. (C++ වගේ භාෂා multiple class inheritance allow කරන නිසා ඒ ගොල්ලන්ට මේ අවුල තියෙනවා; Java හිතාමතාම ඒක වළක්වා.)',
      },
      {
        heading: 'ඒත්... interfaces වලින් ආපහු එනවා (default methods නිසා)',
        body: 'Interfaces කිහිපයක් implement කරන්න පුළුවන්නෙ. Java 8-ට කලින් interfaces වල body නැති නිසා clash එකක් නෑ. ඒත් දැන් interfaces වල `default` methods (body තියෙන) තියෙනවා. ඉතින් interfaces දෙකකට එකම default method එකක් තිබුනොත්, ආයෙ ඒ ambiguity එක එනවා. මෙතනදී Java compiler එක ඔයාට **බල කරනවා** — "ඔයාම තීරණය කරන්න" කියලා. Implementing class එකේ ඒ method එක override කරලා, `InterfaceName.super.method()` වලින් කුමන එකද කියලා පැහැදිලි කරන්නම ඕන (නැත්නම් compile error).',
      },
    ],
    analogy:
      'Boss දෙන්නෙක් (interfaces දෙක) එකම වැඩේ දෙන්නම වෙන වෙන විදිහට කරන්න කියනකොට — ඔයාට "මම මේ විදිහට කරනවා" කියලා තීරණයක් ගන්නම වෙනවා. ඔයාට එක්කෙනෙක්ගේ විදිහ තෝරන්නත් පුළුවන්, දෙකම mix කරන්නත් පුළුවන් — ඒත් තීරණය ඔයාගේ.',
    code: [
      {
        filename: 'DiamondProblem.java',
        language: 'java',
        code: `// interfaces දෙකටම එකම නමින් default method එකක් — clash!
interface Auditable {
    default String source() { return "audit-log"; }
}
interface Trackable {
    default String source() { return "tracker"; }
}

// Auditable + Trackable දෙකම implement කරනවා -> compiler confused
class SyncJob implements Auditable, Trackable {

    @Override
    public String source() {
        // ඔයාම විසඳන්නම ඕන. විකල්ප 3ක්:

        // විකල්ප 1: Auditable ගේ එක තෝරන්න
        // return Auditable.super.source();

        // විකල්ප 2: Trackable ගේ එක තෝරන්න
        // return Trackable.super.source();

        // විකල්ප 3: දෙකම mix කරන්න (මෙතන මේක use කරමු)
        return Auditable.super.source() + " + " + Trackable.super.source();
    }
}
// override එක නොලිව්වොත් -> COMPILE ERROR: "inherits unrelated defaults"`,
        note: 'InterfaceName.super.method() = "ඒ interface එකේ default version එක" කියන එක.',
      },
    ],
    mortar:
      'Mortar background jobs cross-cutting interfaces mix කරනවා — SyncJob එකක් `Auditable` (audit log වලට) + `Trackable` (distributed tracing වලට) දෙකම වෙන්න පුළුවන්. දෙකටම `source()` වගේ method එකක් තිබුනොත් clash එක override එකෙන් explicitly විසඳලා, log/trace එකට හරියටම කුමන source එකද යන්නෙ කියලා පැහැදිලි කරනවා. Design tip: default methods conflicting නම් naming එක වෙනස් කරගන්න එකත් හොඳයි.',
    keyPoints: [
      'Diamond problem = types දෙකකින් එකම method එක උරුම → ambiguity.',
      'Java classes: extend කරන්න එකයි → diamond problem නෑ.',
      'Interfaces දෙකේ default methods clash → override කරලා `X.super.method()` වලින් resolve කරන්නම ඕන.',
      'Resolve නොකළොත් compile error — Java ඔයාට තීරණය කරන්න බල කරනවා.',
    ],
    pitfalls: [
      'Abstract methods (body නැති) clash එකක් නෙවෙයි — ඒවා implement කරන්නම ඕන නිසා ambiguity නෑ. Diamond problem එන්නේ **default methods** (body තියෙන) වලින් විතරයි.',
    ],
  },

  '1.2.6': {
    summary:
      'Object එකක් හදන්න ක්‍රම දෙකක්: Inheritance = "IS-A" (extend කරලා parent වෙනවා). Composition = "HAS-A" (ඇතුලේ වෙන objects තියාගන්නවා). බොහෝවිට composition එක වඩා flexible — "favour composition over inheritance".',
    sinhala: [
      {
        heading: 'කතාව: inheritance එකෙන් පටන් ගත්ත අවුල',
        body: 'ඔයාට `SyncService` එකක් ඕන — HTTP calls කරලා, fail වුනොත් retry කරන එකක්. ඔයා හිතනවා "HttpClient එකක් extend කරලා retry logic දාන්නම්" කියලා. මුලින් වැඩ කරනවා. ඊට පස්සේ retry වලට වෙනම RateLimiter එකකුත් ඕන වෙනවා — ඒත් extend කරන්න පුළුවන් එකයි (Java single inheritance)! තව, HttpClient parent එකේ method එකක් වෙනස් වුනොත් ඔයාගේ SyncService එක හදිසියේ කැඩෙනවා (මේකට "fragile base class problem" කියනවා). Inheritance එක tight — parent එකට ඔයා "අල්ලගෙන" ඉන්නවා.',
      },
      {
        heading: 'විසඳුම: parts වගේ "තියාගන්න" (composition)',
        body: 'Parent එකක් "වෙනවා" වෙනුවට, ඕන දේවල් **ඇතුලේ තියාගන්න** (fields විදිහට) — මේකට composition කියනවා. `SyncService` එකක් HttpClient එකක් **තියාගන්නවා** (HAS-A), RetryPolicy එකක් තියාගන්නවා, ඕන නම් RateLimiter එකකුත් — කීයක් හරි! හැම part එකක්ම වෙනම class එකක්; SyncService ඒවගේ methods call කරලා (delegate කරලා) වැඩේ කරගන්නවා. Parts වෙනස් වුනත් SyncService එකට interface එක එකම නම් කැඩෙන්නෙ නෑ.',
      },
      {
        heading: 'ඇයි composition වඩා හොඳ',
        body: 'Composition එකෙන් එන ප්‍රධාන වාසි 4ක්:',
        points: [
          'Flexible — parts කීයක් හරි mix කරන්න පුළුවන් (single-inheritance limit එකක් නෑ).',
          'Loosely coupled — parts වෙනම; එකක් වෙනස් කලාට අනිත්වාට safe.',
          'Testable — test එකකදී real HttpClient එක වෙනුවට fake/mock එකක් inject කරන්න පුළුවන් (Spring DI + DIP, 5.1.5 වලට පදනම).',
          'Runtime swap — configuration එකට අනුව වෙනස් part එකක් plug කරන්න පුළුවන්.',
        ],
      },
      {
        heading: 'රීතිය',
        body: 'Inheritance එක use කරන්නේ ඇත්තටම "IS-A" relationship එකක් තියෙනකොට විතරයි; ඉතුරු හැම වෙලාවකම composition තෝරන්න.',
      },
    ],
    analogy:
      'Inheritance = ඔයා ඔයාගේ පවුලෙන් උරුම කරගන්නවා — වෙනස් කරන්න බෑ, එක පවුලයි. Composition = ඔයා tools මිලදී අරන් bag එකේ දාගන්නවා — screwdriver, hammer ඕන එකක්; පරණ එකක් අලුත් එකකින් replace කරන්නත් පුළුවන්. Bag එක (SyncService) tools වෙනස් වුනත් එකම විදිහට වැඩ කරනවා.',
    code: [
      {
        filename: 'Composition.java',
        language: 'java',
        code: `// පොඩි parts වෙන වෙනම classes විදිහට
class HttpClient {
    String get(String url) { return "{ data }"; }        // real HTTP call
}
class RetryPolicy {
    <T> T run(java.util.concurrent.Callable<T> task) throws Exception {
        for (int i = 1; i <= 3; i++) {                    // 3 වතාවක් retry
            try { return task.call(); }
            catch (Exception e) { System.out.println("retry " + i); }
        }
        throw new RuntimeException("3 වතාවක්ම fail");
    }
}

// SyncService එක HttpClient + RetryPolicy "තියාගන්නවා" (HAS-A) — extend කරන්නෙ නෑ
class SyncService {
    private final HttpClient http;        // part 1 (composed)
    private final RetryPolicy retry;      // part 2 (composed)

    // parts එළියෙන් inject කරනවා (constructor එකෙන්)
    SyncService(HttpClient http, RetryPolicy retry) {
        this.http = http;
        this.retry = retry;
    }

    String fetch(String url) throws Exception {
        // parts වලට වැඩේ delegate කරනවා
        return retry.run(() -> http.get(url));
    }
}

// test එකකදී: real HttpClient එක වෙනුවට fake එකක් inject කරන්න පුළුවන්!
// new SyncService(new FakeHttpClient(), new RetryPolicy());`,
        note: 'Parts වෙන වෙනම test / replace / mix කරන්න පුළුවන් — inheritance එකට බෑ.',
      },
    ],
    mortar:
      'Mortar services (connectors, resolvers, exporters) HttpClient, RetryPolicy, RateLimiter වගේ parts **compose** කරලා හදනවා — inherit කරනවා වෙනුවට. ඒ නිසා: unit tests වලදී mock parts inject කරන්න පුළුවන් (fast, deterministic tests); connectors වලට behaviours mix-and-match කරන්න පුළුවන් (සමහරට rate-limiter, සමහරට නෑ); එක part එකක් වෙනස් කලාට අනිත්වා safe. මේකයි Spring එකේ dependency injection එකේ මූලික අදහස.',
    keyPoints: [
      'Inheritance = "IS-A" (extend, tight, single parent).',
      'Composition = "HAS-A" (parts ඇතුලේ තියාගන්නවා, loose, කීයක් හරි).',
      '"Favour composition over inheritance" — flexible + testable.',
      'Parts constructor එකෙන් inject → mock කරන්න, swap කරන්න පුළුවන් (DI-friendly).',
    ],
    pitfalls: [
      'ඇත්ත "IS-A" relationship එකක් තියෙනකොට (Dog IS-A Animal) inheritance හරි — හැම තැනම composition දාන්න යන්න එපා.',
      'Code reuse එකට විතරක් inherit කරන්න එපා ("reuse" සඳහා extend කරන එක නරක design — composition use කරන්න).',
    ],
  },

  '1.2.7': {
    summary:
      'Objects දෙකක් අතර සම්බන්ධයේ "ශක්තිය" මට්ටම් තුනක්: Association (හුදෙක් දන්නවා/use කරනවා) → Aggregation (weak "has-a", වෙන වෙනම ජීවත් වෙනවා) → Composition (strong "has-a", එකට මැරෙනවා).',
    sinhala: [
      {
        heading: 'කතාව: Mortar data එකේ objects එකිනෙකට සම්බන්ධ වෙන විදි',
        body: 'Mortar එකේ objects ගොඩක් තියෙනවා — Brand, User, Customer, Order, OrderLine. මේවා එකිනෙකට සම්බන්ධයි, ඒත් සම්බන්ධයේ **ශක්තිය** එක වගේ නෙවෙයි. සමහර වෙලාවට object එකක් delete කරොත් අනිත් එකත් යන්න ඕන; තව සමහර වෙලාවට එකක් delete කලාට අනිත් එකට කිසි බලපෑමක් නෑ. මේ ශක්තිය හරියට model කරන එක data integrity එකට critical. මට්ටම් 3ක් තියෙනවා.',
      },
      {
        heading: '1. Association — "දන්නවා / use කරනවා" (ලිහිල්ම)',
        body: 'Objects දෙකක් එකිනෙක දන්නවා/use කරනවා, ඒත් lifecycle එකිනෙකට බැඳිලා නෑ. උදා: `SyncService` එකක් `Logger` එකක් use කරනවා — ඒත් දෙක independent. මේක සරලම, ලිහිලම සම්බන්ධය. (Aggregation + Composition දෙකම association වල විශේෂ වර්ග.)',
      },
      {
        heading: '2. Aggregation — weak "has-a" (වෙන වෙනම ජීවත් වෙනවා)',
        body: 'Container එකක් parts "තියාගන්නවා" (has-a), ඒත් ඒ parts වලට container එකෙන් **පිට තමන්ගේම existence එකක්** තියෙනවා. උදා: `Brand` එකක් `User`ලා තියාගන්නවා — ඒත් user කෙනෙක් brands කිහිපයකට අයිති වෙන්නත් පුළුවන්, brand එකක් delete කලාට user යන්නෙ නෑ. Parts එළියෙන් හදලා container එකට **pass** කරනවා ("whole–part, ඒත් part එක shared/independent").',
      },
      {
        heading: '3. Composition — strong "has-a" (එකට මැරෙනවා)',
        body: 'Container එක parts වලට **අයිතිකාරයා** — parts container එකට සම්පූර්ණයෙන් bound. Container එක delete වුනොත් parts යනවා; parts එළියෙන් තනියම exist වෙන්නෙ නෑ. උදා: `Order` එකක් `OrderLine`ලා තියෙනවා — order එක delete කලොත් ඒකේ lines වලට තේරුමක් නෑ, ඒවත් යනවා. Parts සාමාන්‍යයෙන් container එක **ඇතුලෙම හදනවා** ("whole–part, ඒත් part එකේ ජීවිතේ whole එකට bound").',
      },
    ],
    analogy:
      'Aggregation = cricket team එකයි players ලයි — team එක disband වුනත් players ඉන්නවා (වෙන team වලට යන්න පුළුවන්). Composition = ගෙදරක් සහ කාමර — ගෙදර කඩනකොට කාමර නෑ, කාමරයක් තනියම exist වෙන්නෙ නෑ.',
    code: [
      {
        filename: 'Relationships.java',
        language: 'java',
        code: `import java.util.*;

class User { String name; }

// ── AGGREGATION: Brand එකක් Users "තියාගන්නවා", ඒත් users independent ──
class Brand {
    private final List<User> users;              // weak: shared/independent

    // users එළියෙන් හදලා pass කරනවා (Brand එක ඒව අයිති කරගන්නෙ නෑ)
    Brand(List<User> users) {
        this.users = users;
    }
}
// user කෙනෙක් brands කිහිපයකට අයිති වෙන්න පුළුවන්; brand delete = users safe

// ── COMPOSITION: Order එකක් OrderLines "අයිති" කරගන්නවා — එකට මැරෙනවා ──
class Order {
    private final List<OrderLine> lines = new ArrayList<>(); // strong ownership

    // lines Order එක ඇතුලෙම හදනවා (එළියෙන් එන්නෙ නෑ)
    void addLine(String sku, int qty) {
        lines.add(new OrderLine(sku, qty));
    }

    // OrderLine එකක් Order එකකින් පිට තේරුමක් නෑ
    record OrderLine(String sku, int qty) {}
}
// order delete = lines delete (එකට මැරෙනවා)`,
        note: 'Aggregation = parts එළියෙන් pass (shared); Composition = parts ඇතුලෙම හදනවා (owned).',
      },
    ],
    mortar:
      'Mortar data model එකේ: `Brand` එකක් `User`ලා **aggregate** කරනවා (user කෙනෙක් brands කිහිපයකට වැඩ කරන්න පුළුවන් — agencies වගේ; brand එකක් අයින් කලාට users යන්නෙ නෑ). `Order` එකක් `OrderLine`ලා **compose** කරනවා (order එක delete කලොත් ඒකේ lines ත් යනවා). මේ ශක්තිය JPA cascade/orphan-removal settings (7.4.4.3) වලට කෙලින්ම map වෙනවා — composition = cascade delete, aggregation = නෑ. හරි model එක data integrity එකට තීරණාත්මකයි.',
    keyPoints: [
      'Association = හුදෙක් "දන්නවා/use කරනවා" (lifecycle independent).',
      'Aggregation = weak has-a; parts එළියෙන් pass, වෙන වෙනම ජීවත් වෙනවා (Brand–Users).',
      'Composition = strong has-a; parts ඇතුලෙම හදනවා, owner මැරුනොත් parts යනවා (Order–OrderLines).',
      'JPA වල: composition → cascade/orphan-removal; aggregation → නෑ.',
    ],
    pitfalls: [
      'Aggregation vs Composition තීරණය කරන්නේ "part එකට owner එකෙන් පිට ජීවිතයක් තියෙනවද?" කියලා අහලා — තියෙනවා නම් aggregation, නැත්නම් composition.',
    ],
  },

  '1.3.1': {
    summary:
      'Access modifiers (`private`, default, `protected`, `public`) = class එකක member එකකට (field/method) කොහෙන් access කරන්න පුළුවන්ද කියලා control කරන keywords. Encapsulation එකේ practical tools.',
    sinhala: [
      {
        heading: 'කතාව: SSN එකට කවුද අත දාන්න පුළුවන් වෙන්න ඕන?',
        body: 'Mortar customer record එකක SSN (sensitive), internal DB id, segment, email වගේ දේවල් තියෙනවා. මේ හැම එකකටම එකම මට්ටමේ access දෙන්න හොඳ නෑ — SSN එක code එකේ ඕන තැනකින් read කරන්න පුළුවන් නම් security risk එකක්. Email එක නම් හැමෝටම පේන්න ඕන. ඉතින් "කුමන member එකට කවුද access කරන්න පුළුවන්ද" කියලා control කරන්න ක්‍රමයක් ඕන — ඒකට තමයි access modifiers.',
      },
      {
        heading: 'Visibility levels 4 (අඩුම → වැඩිම)',
        body: 'Java වල visibility මට්ටම් 4ක් තියෙනවා:',
        points: [
          '`private` — එම class එක ඇතුලේ **විතරයි**. සම්පූර්ණයෙන් hidden (sensitive data, internal helpers).',
          'default (keyword එකක් නෑ) — එම **package** එකේ classes වලට විතරයි ("package-private").',
          '`protected` — එම package + **subclasses** වලට (වෙන packages වල subclasses වුනත්). Inheritance/extension වලට.',
          '`public` — **හැම තැනම** access කරන්න පුළුවන්. Stable API එකට විතරයි.',
        ],
      },
      {
        heading: 'රීතිය: least privilege',
        body: 'හැමවිටම හැකි **අඩුම visibility එක** දෙන්න (least privilege). Default විදිහට `private` කරලා, ඇත්තටම expose කරන්න ඕන දේ විතරක් `public` කරන්න. මේකෙන් encapsulation (1.1.4) එක එනවා — outside code එකට internal details වලට depend වෙන්න බෑ, ඒ නිසා ඒවා නිදහසේ වෙනස් කරන්න පුළුවන්.',
      },
    ],
    analogy:
      'ගෙදරක කාමර වගේ: `private` = ඔයාගේ bedroom (ඔයාට විතරයි), default = ගෙදර අයට (එකම package), `protected` = පවුලයි relations ලයි (subclasses), `public` = හැමෝටම open living room. හැම දෙයක්ම living room එකේ තියන්නෙ නෑ — වටිනා දේවල් bedroom එකේ.',
    code: [
      {
        filename: 'CustomerRecord.java',
        language: 'java',
        code: `public class CustomerRecord {
    private String ssn;          // 🔒 මේ class එක ඇතුලේ විතරයි (most restricted)
    String internalId;           // 📦 එකම package එකේ classes වලට (default)
    protected String segment;    // 👨‍👩‍👧 subclasses + package වලට
    public String email;         // 🌍 හැම තැනම (least restricted)

    private void encryptSsn() {   // internal helper — hidden
        // encryption logic
    }

    // safe public API — SSN එක කෙලින්ම දෙන්නෙ නෑ, masked විදිහට
    public String getSsnMasked() {
        return "***-**-" + ssn.substring(ssn.length() - 4);
    }
}`,
        note: 'Sensitive data `private`; safe, masked view එක විතරයි `public`.',
      },
      {
        filename: 'WhoCanAccess.java',
        language: 'java',
        code: `CustomerRecord c = new CustomerRecord();

c.email;              // ✅ public — ඕන තැනකින්
// c.ssn;             //  private — CustomerRecord එකෙන් පිට බෑ
// c.internalId;      //  default — වෙන package එකකින් නම් බෑ
// c.encryptSsn();    //  private helper — පිටින් බෑ

c.getSsnMasked();     // ✅ safe API — masked value විතරයි ලැබෙන්නේ`,
        note: 'private members class එකෙන් පිට access කරන්න බෑ — compile error.',
      },
    ],
    mortar:
      'Mortar customer records වල SSN/phone වගේ sensitive fields `private` + encrypted. Public API එකෙන් masked හෝ role-authorised views විතරයි expose කරන්නේ. Internal DB ids default (package-private) — resolution package එකට විතරයි. ඒ නිසා අහම්බෙන් sensitive data leak වෙන්නෙ නෑ, සහ role-based access control (PROJECT_IDEA 10.5) enforce කරන්න පුළුවන්.',
    keyPoints: [
      'private < default < protected < public (least → most visible).',
      'Least-privilege: default විදිහට හැකි තරම් අඩු visibility දෙන්න.',
      '`protected` = package + subclasses (extension වලට access).',
      'default (keyword නෑ) = package-private — public නෙවෙයි!',
    ],
    pitfalls: [
      'Field එකකට keyword එකක් නොදැම්මම ඒක `public` නෙවෙයි — default (package-private). මේක බොහෝ අය වරදවා තේරුම් ගන්නවා.',
      '`protected` fields subclasses වලට expose වෙන නිසා, ඒවා පරෙස්සමින් — over-exposing = tight coupling.',
    ],
  },

  '1.3.2': {
    summary:
      '`static` = member එක **class එකට** අයිති, object එකකට නෙවෙයි. හැම object එකකම එකම copy එකයි share කරන්නේ. Variables, methods, blocks, nested classes වලට use කරන්න පුළුවන්.',
    sinhala: [
      {
        heading: 'කතාව: හැම customer object එකකටම වෙන වෙනම ඕන නැති දේවල්',
        body: 'හිතන්න ඔයාට Mortar record ids generate කරන්න counter එකක් ඕන — `MC1`, `MC2`, `MC3`... දැන් මේ counter එක `Customer` object එකක field එකක් කරොත්? හැම customer කෙනෙක්ටම වෙන වෙනම counter එකක් — ඒක වැරදියි! ඕන වෙන්නේ **හැම object එකම share කරන එකම counter** එකක්. ඒ වගේම — `PREFIX = "MC"` වගේ constant එකකට customer කෙනෙක් object එකක් ඕන නෑ. මේ "class එකට අයිති, objects අතර share වෙන" දේවල් වලට තමයි `static`.',
      },
      {
        heading: 'static යෙදෙන තැන් 4',
        body: '`static` keyword එක යොදන්න පුළුවන් තැන් 4ක්:',
        points: [
          '`static` **field** — හැම object එකකම share වෙන එක copy එකයි (class එකට අයිති). උදා: counter, config.',
          '`static` **method** — object එකක් නැතුව `ClassName.method()` විදිහට call කරන්න පුළුවන් (utility/factory). ඒත් `this` access කරන්න බෑ.',
          '`static` **block** — class එක load වෙනකොට **එක පාරක්** run වෙනවා (static fields initialize කරන්න).',
          '`static` **nested class** — outer class instance එකක් නැතුව හදන්න පුළුවන් nested class.',
        ],
      },
      {
        heading: 'වැදගත් රීතිය: static → instance access බෑ',
        body: '`static` method එකකට `this` නෑ (object එකක් නැති නිසා), ඒ නිසා instance fields/methods කෙලින්ම access කරන්න බෑ. ඒත් instance methods වලට static members access කරන්න පුළුවන්. `static final` = constant (class-owned, වෙනස් වෙන්නෙ නෑ) — මේක safe. ඒත් `static` mutable state (share වෙන, වෙනස් වෙන) thread-safety අවුල් ගේනවා.',
      },
    ],
    analogy:
      'Company එකක "staff count" එක වගේ — හැම employee කෙනෙක්ටම වෙන වෙනම නෑ, එක shared number එකයි (static, company එකට අයිති). ඒත් employee කෙනෙක්ගේ "name" එක instance-specific (හැමෝටම වෙනස්). Company logo (static final) හැමෝටම එකයි, වෙනස් වෙන්නෙත් නෑ.',
    code: [
      {
        filename: 'IdGenerator.java',
        language: 'java',
        code: `public class IdGenerator {
    // static field: හැම call එකකම share වෙන එකම counter (class-owned)
    private static long counter = 0;

    // static final: constant — class එකට අයිති, වෙනස් වෙන්නෙ නෑ
    public static final String PREFIX = "MC";

    // static block: class එක load වෙනකොට එක පාරක් run වෙනවා
    static {
        System.out.println("IdGenerator load වුණා");
    }

    // static method: object එකක් නැතුව call කරන්න පුළුවන්
    public static synchronized String next() {   // thread-safe counter
        return PREFIX + (++counter);
    }
}`,
        note: 'counter share වෙනවා; next() object එකක් නැතුව call කරනවා.',
      },
      {
        filename: 'UsingStatic.java',
        language: 'java',
        code: `// object එකක් 'new' කරන්නෙ නැතුව class name එකෙන් කෙලින්ම:
String id1 = IdGenerator.next();   // MC1
String id2 = IdGenerator.next();   // MC2  (එකම shared counter)
String id3 = IdGenerator.next();   // MC3

System.out.println(IdGenerator.PREFIX); // MC (constant)

// IdGenerator g = new IdGenerator(); g.next();  // වැඩ කරයි, ඒත් static call එක හරි විදිහ`,
        note: 'static members class name එකෙන් access කරනවා — object එකක් ඕන නෑ.',
      },
      {
        filename: 'StaticCannotSeeInstance.java',
        language: 'java',
        code: `class Customer {
    private String email;                    // instance field

    static String describe() {
        // return email;   //  ERROR: static method එකට instance field බෑ ('this' නෑ)
        return "a customer";
    }

    String getEmail() { return email; }      // instance method — email access OK
}`,
        note: 'static method එකට instance members / `this` access කරන්න බෑ.',
      },
    ],
    mortar:
      'Mortar වල internal record ids generate කරන්න static counter/utility එකක්; config constants (`PREFIX`, API versions) `static final` විදිහට එක තැනක. Utility classes (Validators, DateUtils) static methods. ඒත් — shared mutable static state (`counter`) multiple threads වලින් access වෙනකොට race conditions; ඒ නිසා `synchronized`/`AtomicLong` (2.4.6) වලින් protect කරන්නම ඕන. Constants (immutable) නම් safe.',
    keyPoints: [
      '`static` = class-owned, හැම object එකකම share වෙන එක copy එකයි.',
      'static method → object එකක් නැතුව call; `this`/instance members access කරන්න බෑ.',
      'static block = class-load-time (එක පාරක්) initialization.',
      '`static final` = constant (safe); static mutable state = thread-safety අවුල්.',
    ],
    pitfalls: [
      'Mutable static state = concurrency bugs + unit testing අමාරුයි (shared global state). හැකි නම් `static final` constants වලට සීමා කරන්න.',
      'static method එකක් instance behaviour එකක් වගේ override කරන්න බෑ — static methods "hidden" වෙනවා, polymorphic නෙවෙයි.',
    ],
  },

  '1.3.3': {
    summary:
      '`final` = "locked, වෙනස් කරන්න බෑ". තැන් 3ක යෙදෙනවා: variable (එක පාරයි assign), method (override බෑ), class (extend බෑ). Immutability + safety එකට key tool එකක්.',
    sinhala: [
      {
        heading: 'කතාව: brandId එක මැදදී වෙනස් වුනොත්?',
        body: 'Mortar sync job එකක් brandId එකක් අරන් වැඩ කරනවා. හිතන්න job එක මැද්දේ අහම්බෙන් `brandId = "other-brand"` වගේ වෙනස් වුනොත් — වෙන brand එකකට data leak! මේ වගේ දේවල් "එක පාරක් set කරලා ආයෙ වෙනස් වෙන්නෙ නෑ" කියලා guarantee කරන්න පුළුවන් නම් bugs ගොඩක් වළක්වන්න පුළුවන්. ඒකට තමයි `final`. Compiler එකෙන්ම වෙනස් කරන එක වළක්වනවා.',
      },
      {
        heading: 'final යෙදෙන තැන් 3',
        body: '`final` keyword එක තැන් 3ක යෙදෙනවා, තුනටම තේරුම "වෙනස් කරන්න බෑ":',
        points: [
          '`final` **variable/field** — එක පාරක් assign කරලා ආයෙ වෙනස් කරන්න බෑ (constant / immutable reference).',
          '`final` **method** — subclass එකකින් override කරන්න බෑ (behaviour එක lock — security/correctness).',
          '`final` **class** — extend කරන්න බෑ (subclass හදන්න බෑ). උදා: `String`, `Integer` — final classes.',
          'Parameters `final` කරන්නත් පුළුවන් — method එක ඇතුලේ ඒ parameter reassign කරන්න බෑ.',
        ],
      },
      {
        heading: 'ඇයි final වැදගත්: immutability + thread-safety',
        body: 'Fields ඔක්කොම `final` වුනු object එකක් "immutable" — හදාපු පස්සේ state වෙනස් වෙන්නෙ නෑ. Immutable objects: (1) predictable — කවදාවත් වෙනස් වෙන්නෙ නෑ නිසා reasoning ලේසි. (2) thread-safe — multiple threads share කරන්න lock ඕන නෑ (වෙනස් වෙන්නෙ නැති නිසා). (3) safe map keys — hashCode වෙනස් වෙන්නෙ නෑ. ඒ නිසා concurrent code එකට immutable objects රත්තරන්.',
      },
    ],
    analogy:
      'Contract එකක් sign කරලා notarize කලාට පස්සේ වගේ — වෙනස් කරන්න බෑ, "locked". `final` variable = ink pen එකෙන් ලිව්ව value එකක් (මකන්න බෑ); `final` class = "මේ design එක extend කරන්න එපා" කියලා sealed.',
    code: [
      {
        filename: 'FinalVariable.java',
        language: 'java',
        code: `class SyncJob {
    private final String brandId;         // එක පාරයි assign කරන්න පුළුවන්

    SyncJob(String brandId) {
        this.brandId = brandId;           // constructor එකේදී set (OK)
    }

    void run() {
        // brandId = "other-brand";       //  COMPILE ERROR — final, වෙනස් බෑ
        System.out.println("syncing " + brandId);  // safe: කවදාවත් වෙනස් වෙන්නෙ නෑ
    }
}`,
        note: 'brandId එක job එක පුරාවටම එකයි — අහම්බෙන් වෙනස් වෙන්න බෑ.',
      },
      {
        filename: 'ImmutableMoney.java',
        language: 'java',
        code: `// final class -> extend කරන්න බෑ; final fields -> immutable value object
public final class Money {
    private final double amount;          // immutable
    private final String currency;

    public Money(double amount, String currency) {
        this.amount = amount;
        this.currency = currency;
    }

    public final double getAmount() { return amount; }  // override කරන්න බෑ

    // "වෙනස් කරන" එකක් ඕන නම් අලුත් object එකක් return කරනවා (immutable pattern)
    public Money add(Money other) {
        return new Money(this.amount + other.amount, currency);  // new object
    }
}`,
        note: 'Immutable — thread-safe by design; "වෙනස් කිරීම" = අලුත් object එකක්.',
      },
      {
        filename: 'FinalIsNotDeep.java',
        language: 'java',
        code: `// පරෙස්සම්: final reference ≠ deeply immutable
final List<String> ids = new ArrayList<>();

ids.add("a");        // ✅ OK! list එකේ CONTENT වෙනස් කරන්න පුළුවන්
ids.add("b");        // ✅ OK

// ids = new ArrayList<>();  //  ERROR — reference එක වෙනස් කරන්න බෑ (final)`,
        note: 'final = reference lock; ඒත් point කරන object එකේ ඇතුළ වෙනස් වෙන්න පුළුවන්.',
      },
    ],
    mortar:
      'Mortar වල `Money`, `brandId`, DTOs (records — 3.2.3) වගේ value objects `final` fields වලින් immutable කරනවා. Identity-resolution / churn-prediction jobs millions of objects concurrent threads වල process කරනවා — immutable objects නිසා ඒවා lock නැතුව safely share කරන්න පුළුවන් (thread-safety නොමිලේ). brandId `final` නිසා multi-tenant data leak වගේ bugs compile-time එකේම වළක්වනවා.',
    keyPoints: [
      '`final` variable = assign-once (immutable reference).',
      '`final` method = override බෑ; `final` class = extend බෑ (උදා: String).',
      'Fields ඔක්කොම final = immutable object → predictable + thread-safe.',
      'Immutable objects concurrent code එකේ lock නැතුව share කරන්න පුළුවන්.',
    ],
    pitfalls: [
      '`final` reference එකක් immutable වුනත්, ඒක point කරන object එකේ internal state වෙනස් වෙන්න පුළුවන් (`final List` → content වෙනස් කරන්න පුළුවන්). final ≠ deeply immutable.',
      'final field එකක් constructor එකේදී (හෝ declaration එකේදී) assign කරන්නම ඕන — නැත්නම් compile error.',
    ],
  },

  '1.3.4': {
    summary:
      'දෙකම විශේෂ field modifiers. `transient` = serialization එකෙන් **skip** කරන field (secrets/derived data). `volatile` = threads අතර **visibility** guarantee කරන field. දෙක සම්පූර්ණයෙන් වෙනස් ප්‍රශ්න දෙකකට.',
    sinhala: [
      {
        heading: 'transient — කතාව: session එක save කරනකොට token එක යන්න ඕන නෑ',
        body: 'Object එකක් "serialize" කරනවා කියන්නේ ඒක bytes වලට convert කරලා disk/cache/network එකට යවන එක. හිතන්න Session object එකක userId + authToken තියෙනවා. Session එක cache එකට serialize කරද්දී, secret authToken එකත් bytes විදිහට save වෙනවා — security risk! ඒ field එක "serialize කරන්න එපා" කියලා mark කරන්න පුළුවන් — ඒකට `transient`. Deserialize කරද්දී transient field එකට default value එක (null/0) එනවා.',
      },
      {
        heading: 'volatile — කතාව: background thread එක නවත්තන්නේ කොහොමද?',
        body: 'Mortar sync job එකක් background thread එකක while(running){work} කරනවා. Main thread එකෙන් running=false කරලා නවත්තන්න ඕන. ප්‍රශ්නෙ — performance එකට හැම thread එකක්ම variables තමන්ගේ CPU cache එකේ copy එකක තියාගන්නවා. ඒ නිසා main thread එක running=false කරාට, background thread එක තමන්ගේ පරණ cached true එක දැකලා කවදාවත් නවතින්නෙ නෑ! volatile දැම්මම — ඒ field එකේ හැම read/write එකකම main memory එකට යනවා (cache නෑ). ඒ නිසා වෙනස්කම වහාම හැම thread එකකටම visible.',
      },
      {
        heading: 'volatile = visibility, atomicity නෙවෙයි',
        body: 'වැදගත්: volatile visibility විතරයි දෙන්නේ — "latest value එක හැමෝටම පේනවා". ඒත් atomicity දෙන්නෙ නෑ. count++ වගේ compound operation එකක් (read → add → write steps 3ක්) volatile වුනත් race condition එකක් වෙන්න පුළුවන් (threads දෙකක් එකවර කරොත්). ඒ වගේ වලට AtomicInteger හෝ synchronized (2.4.3) ඕන. volatile හොඳම flags (boolean running) වගේ single read/write වලට.',
      },
    ],
    analogy:
      '`transient` = form එකක "මේක save කරන්න එපා" කියලා mark කරපු field එකක් (password confirm වගේ). `volatile` = office එකේ shared whiteboard එකක් වගේ — කවුරු ලිව්වත් හැමෝටම වහාම පේනවා. volatile නැති එක = හැමෝම තමන්ගේ private notebook එකේ පරණ copy එකක් බලනවා (stale).',
    code: [
      {
        filename: 'Transient.java',
        language: 'java',
        code: `class Session implements java.io.Serializable {
    private String userId;                    // serialize වෙනවා
    private transient String authToken;       // serialize වෙන්නෙ නෑ (secret)
    private transient int cachedScore;        // derived data — save කරන්න ඕන නෑ
}
// serialize -> deserialize කරාම:
//   userId      -> ආපහු එනවා
//   authToken   -> null (transient, save වුනේ නෑ)
//   cachedScore -> 0`,
        note: 'Secrets/derived data transient — bytes වලට යන්නෙ නෑ.',
      },
      {
        filename: 'Volatile.java',
        language: 'java',
        code: `class SyncJob {
    // volatile: වෙනස්කම හැම thread එකකටම වහාම visible
    private volatile boolean running = true;

    void loop() {                   // background thread
        while (running) {           // main memory එකෙන් නැවුම් value එක read
            // ... sync work ...
        }
        System.out.println("නැවතුණා");
    }

    void stop() {                   // main thread
        running = false;            // background thread එකට වහාම පේනවා
    }
}
// volatile නැත්නම්: background thread එක cached true එක දැකලා නවතින්නෙ නෑ!`,
        note: 'volatile නිසා stop signal එක background thread එකට වහාම visible.',
      },
      {
        filename: 'VolatileNotAtomic.java',
        language: 'java',
        code: `class Counter {
    private volatile int count = 0;
    void increment() {
        count++;   // race condition! (read + add + write — atomic නෙවෙයි)
    }
}
// FIX: compound updates වලට AtomicInteger හෝ synchronized
// private final AtomicInteger count = new AtomicInteger();
// count.incrementAndGet();   // atomic`,
        note: 'volatile = visibility විතරයි; count++ වගේ වලට Atomic/synchronized ඕන.',
      },
    ],
    mortar:
      'Mortar session objects serialize කරලා Redis/cache එකට යවද්දී, auth tokens `transient` — secrets cache/disk එකට කවදාවත් යන්නෙ නෑ (security, PROJECT_IDEA 10.5). Long-running sync/enrichment jobs graceful shutdown එකකදී නවත්තන්න `volatile boolean running` flag — main thread එකෙන් stop කරාම background threads වලට වහාම පේනවා. Progress counters වගේ compound updates වලට `AtomicLong` (volatile මදි).',
    keyPoints: [
      '`transient` = serialization එකෙන් exclude (secrets, derived/cached data).',
      '`volatile` = cross-thread visibility (latest value හැමෝටම පේනවා).',
      '`volatile` atomicity දෙන්නෙ නෑ — `count++` වගේ compound ops වලට Atomic/synchronized.',
      'දෙක වෙනස් ප්‍රශ්න දෙකකට — transient = serialization; volatile = concurrency.',
    ],
    pitfalls: [
      '`volatile` දාලා `count++` thread-safe වෙනවා කියලා හිතන එක වැරදියි — visibility ලැබෙනවා, ඒත් atomicity නෑ.',
      '`transient` field එකක් deserialize කරාම default (null/0) — ඒක නැවත compute/set කරන්න අමතක කරන්න එපා.',
    ],
  },

  '1.4.1': {
    summary:
      'Primitives (int, double, boolean...) = raw values, fast, stack එකේ, null වෙන්න බෑ. Wrappers (Integer, Double...) = ඒවගේ object versions — heap එකේ, null වෙන්න පුළුවන්, collections/generics වල දාන්න පුළුවන්.',
    sinhala: [
      {
        heading: 'කතාව: churnScore එක "තවම නොදන්නවා" කියන්නේ කොහොමද?',
        body: 'Mortar customer කෙනෙක්ගේ churnScore එක ML model එකෙන් calculate වෙනවා. ඒත් අලුත් customer කෙනෙක්ට තවම score එකක් නෑ — "තවම නොදන්නවා" කියන එක represent කරන්න ඕන. int එකකට null වෙන්න බෑ (0 කියන්නෙ "score 0", "නොදන්නවා" නෙවෙයි!). ඒ වගේ තැන් වලට Integer (wrapper) — ඒකට null දාන්න පුළුවන්. මෙන්න මේකයි primitives සහ wrappers අතර ප්‍රධාන practical වෙනස.',
      },
      {
        heading: 'Primitives 8 සහ ඒවගේ wrappers',
        body: 'Java වල primitive types 8ක් තියෙනවා, හැම එකකටම matching wrapper class එකක්:',
        points: [
          'byte→Byte, short→Short, int→Integer, long→Long (integers).',
          'float→Float, double→Double (decimals).',
          'char→Character, boolean→Boolean.',
          'Primitives raw values (stack/fields එකේ direct); wrappers = ඒ value එක wrap කරන objects (heap එකේ).',
        ],
      },
      {
        heading: 'කවදා මොකක්ද?',
        body: 'Primitives: fast, memory-light, GC pressure නෑ — hot loops, counters, calculations වලට. Wrappers: null වෙන්න පුළුවන් ("unknown"), collections (`List<Integer>` — primitives දාන්න බෑ) සහ generics වල අවශ්‍යයි, utility methods තියෙනවා (`Integer.parseInt`, `Integer.MAX_VALUE`). රීතිය: nullability/collections ඕන → wrapper; performance ඕන → primitive.',
      },
    ],
    analogy:
      'Primitive = pocket එකේ තියෙන cash (ඉක්මන්, සරල, කෙලින්ම use කරන්න පුළුවන්). Wrapper = bank account එකක් (null "no account" වෙන්න පුළුවන්, features වැඩියි, ඒත් ටිකක් overhead). ඔක්කොම cash එකේ තියාගන්නෙ නෑ, ඔක්කොම bank එකේ තියාගන්නෙත් නෑ — අවශ්‍යතාවට අනුව.',
    code: [
      {
        filename: 'PrimitiveVsWrapper.java',
        language: 'java',
        code: `int spendCount = 5;              // primitive: fast, null වෙන්න බෑ
Integer churnScore = null;      // wrapper: "තවම calculate කරලා නෑ" = null

// primitives collections වල දාන්න බෑ -> wrappers ඕන
List<Integer> orderCounts = new ArrayList<>();   // List<int> කියලා බෑ!
orderCounts.add(3);

// utility methods wrappers මත තියෙනවා
int parsed = Integer.parseInt("42");
int max    = Integer.MAX_VALUE;`,
        note: 'churnScore=null වලින් "unknown" represent කරනවා; int එකකට බෑ.',
      },
      {
        filename: 'NullMatters.java',
        language: 'java',
        code: `class Customer {
    int orderCount;         // primitive -> default 0 (හැමවිටම value එකක්)
    Integer churnScore;     // wrapper  -> default null (unknown වෙන්න පුළුවන්)
}

Customer c = new Customer();
System.out.println(c.orderCount);   // 0
System.out.println(c.churnScore);   // null  ("තවම score එකක් නෑ")

// "score 0" සහ "score නෑ" වෙනස represent කරන්න wrapper අත්‍යවශ්‍යයි`,
        note: 'primitive default = 0/false; wrapper default = null.',
      },
    ],
    mortar:
      'Mortar customer analytics වල churnScore, predictedAge, gender-probability වගේ values තවම නොදන්න වෙන්න පුළුවන — එතන Integer/Double (nullable wrappers), null = "unknown/not computed yet". ඒත් identity-resolution hot loops, internal counters වගේ millions-of-iterations තැන් වල int/long (primitives) — fast + GC pressure නෑ. හරි එක තෝරගැනීම correctness + performance දෙකටම වැදගත්.',
    keyPoints: [
      'Primitives: fast, non-null, 8 types (int, double, boolean...).',
      'Wrappers: objects, nullable, collections/generics-friendly, utility methods.',
      'Nullability/collections ඕන → wrapper; performance/hot loops → primitive.',
      'primitive default = 0/false; wrapper default = null.',
    ],
    pitfalls: [
      'Wrapper එකක් null වෙලා තියෙද්දී primitive එකකට assign කරොත් (unboxing) NullPointerException — 1.4.2 බලන්න.',
      'Millions of wrapper objects (Integer) memory + GC pressure වැඩියි — bulk numeric data වලට primitive arrays හොඳයි.',
    ],
  },

  '1.4.2': {
    summary:
      'Autoboxing = primitive → wrapper automatic conversion (`Integer i = 5`). Unboxing = wrapper → primitive (`int x = i`). Compiler එකෙන් background එකේ auto වෙනවා — convenient, ඒත් hidden costs + NPE risk.',
    sinhala: [
      {
        heading: 'කතාව: int එකයි Integer එකයි මිශ්‍ර වෙනකොට',
        body: 'ඔයා `Map<String, Integer> counts` එකක් use කරනවා (Map වලට wrapper ඕන). ඒත් ඔයා ලියන්නේ `counts.put("orders", 5)` — 5 කියන්නේ int (primitive). Map එකට ඕන Integer (wrapper). කොහොමද මේක වැඩ කරන්නේ? Compiler එක background එකේ 5 (int) එක automatic Integer.valueOf(5) කරනවා — මේකට autoboxing කියනවා. ආපහු පැත්තට (Integer → int) unboxing. ඔයාට නොදැනීම වෙන convenient feature එකක්, ඒත් hidden costs තියෙනවා.',
      },
      {
        heading: 'දෙපැත්තම',
        body: 'Compiler එක automatic කරන conversions දෙක:',
        points: [
          'Autoboxing: primitive → wrapper. `Integer i = 5;` = `Integer i = Integer.valueOf(5);`.',
          'Unboxing: wrapper → primitive. `int x = i;` = `int x = i.intValue();`.',
          'Collections, generics, mixed arithmetic වල නිතරම නොදැනීම වෙනවා.',
          'හැම autobox එකකම (potentially) අලුත් object එකක් — hot loops වල performance එකට බලපානවා.',
        ],
      },
      {
        heading: 'අනතුරු 2ක්',
        body: 'Autoboxing convenient වුනාට අනතුරු 2ක්: (1) null unboxing = NullPointerException — null wrapper එකක් primitive එකකට convert කරන්න බෑ. (2) Performance — tight loop එකක හැම iteration එකකම boxing වුනොත් objects ගොඩක් හැදිලා GC pressure. Millions of records process කරන Mortar වැනි තැන් වල මේක සැලකිය යුතුයි.',
      },
    ],
    analogy:
      'Cash (primitive) automatically bank account (wrapper) එකකට deposit කරන එකයි, ආපහු withdraw කරන එකයි වගේ — background එකේ auto වෙනවා, ඒත් හැම transaction එකකටම පොඩි fee (overhead) එකක්. Account එක හිස් (null) නම් withdraw කරන්න බෑ (NPE).',
    code: [
      {
        filename: 'Boxing.java',
        language: 'java',
        code: `Integer boxed = 10;      // autoboxing:  int -> Integer (auto)
int unboxed = boxed;     // unboxing:    Integer -> int (auto)

// Map වලට wrapper ඕන — 5, 1 (int) auto-box වෙනවා
Map<String, Integer> counts = new HashMap<>();
counts.put("orders", counts.getOrDefault("orders", 0) + 1);
// getOrDefault -> Integer, +1 -> unbox+add+box (background එකේ boxing 3ක්!)`,
        note: 'නොදැනීම boxing/unboxing වෙනවා — convenient, ඒත් hidden.',
      },
      {
        filename: 'NullUnboxNpe.java',
        language: 'java',
        code: `Integer score = null;        // wrapper — null වෙන්න පුළුවන්

// int bad = score;          //  NullPointerException!
//                              null එකක් unbox කරන්න බෑ

// safe:
int safe = (score != null) ? score : 0;   // null check කරලා`,
        note: 'null wrapper එකක් unbox කරනකොට NPE — හැමවිටම null check.',
      },
      {
        filename: 'PerfInLoop.java',
        language: 'java',
        code: `// BAD: Long (wrapper) -> හැම += එකකම unbox + add + box (millions of objects)
Long total = 0L;
for (long v : values) total += v;    // slow, GC pressure

// GOOD: primitive long -> boxing නෑ
long fast = 0L;
for (long v : values) fast += v;     // fast`,
        note: 'Hot loops වල primitives තියාගන්න — unnecessary boxing නවත්තන්න.',
      },
    ],
    mortar:
      'Mortar aggregation code එකේ `Map<String,Integer>` counters, RFM calculations වගේ තැන් වල autoboxing නිතරම වෙනවා. Millions of records process කරන hot paths වල unnecessary boxing objects හැදිලා GC pressure + slowdown. ඒ නිසා performance-critical loops වල primitives (int/long/double) තියාගන්නවා; nullable/collection තැන් වල විතරක් wrappers.',
    keyPoints: [
      'Autobox: primitive→wrapper; Unbox: wrapper→primitive (compiler auto).',
      'null wrapper unbox = NullPointerException — null check කරන්න.',
      'Tight/hot loops වල boxing avoid කරන්න (GC pressure + speed).',
    ],
    pitfalls: [
      '`Integer a = 1000, b = 1000; a == b` → **false**! (`==` references compare කරනවා; Java -128..127 විතරයි cache කරන්නේ). Content compare කරන්න `.equals()`.',
      'Ternary/mixed expressions වල unexpected unboxing → NPE (`boolean flag = map.get(key);` map එකේ key නැත්නම්).',
    ],
  },

  '1.4.3': {
    summary:
      'String = immutable (modify කරන්න බෑ). StringBuilder = mutable buffer, fast, single-thread. StringBuffer = StringBuilder ගේ thread-safe version (synchronized, ටිකක් slow). Text ගොඩක් build කරනකොට හරි එක තෝරගැනීම critical.',
    sinhala: [
      {
        heading: 'කතාව: emails දහස් ගණන් CSV එකකට join කරනකොට',
        body: 'Mortar audience export එකකදී emails දහස් ගණන් comma-separated CSV එකකට join කරන්න ඕන. ඔයා ලියනවා `csv += email + ","` කියලා loop එකක. වැඩ කරනවා... ඒත් 100,000 emails එද්දී අතිශය slow! ඇයි? String **immutable** — වෙනස් කරන්න බෑ. `csv += ...` කරන හැම වතාවෙම **අලුත් String object එකක්** හැදෙනවා (පරණ එක + අලුත් text). 100,000 iterations = 100,000 temp objects = O(n²) disaster. විසඳුම StringBuilder.',
      },
      {
        heading: 'තුනේ වෙනස',
        body: 'Text handle කරන class තුනක්:',
        points: [
          '`String` — immutable. Modify කරන හැම වෙලාවෙම අලුත් object එකක් හැදෙනවා. Safe + shareable, ඒත් heavy modification වලට නරකයි.',
          '`StringBuilder` — mutable buffer. append/insert/delete same object එකේ. Fast. Single-thread වලට හොඳම (thread-safe නෑ).',
          '`StringBuffer` — StringBuilder ගේම thread-safe version. Methods `synchronized` — multiple threads share කරනකොට safe, ඒත් synchronization overhead නිසා ටිකක් slow.',
        ],
      },
      {
        heading: 'තෝරගන්නේ කොහොමද',
        body: 'Simple, කලාතුරකින් වෙනස් වෙන text → String. Loop එකක/ගොඩක් append කරනවා, single-thread → StringBuilder (default choice for building). Multiple threads එකම buffer එකට write කරනවා (කලාතුරකින්) → StringBuffer. Modern code එකේ බොහෝවිට StringBuilder ම ඇති.',
      },
    ],
    analogy:
      'String = pen එකෙන් ලියලා වැරදුනොත් අලුත් කොළයක් ගන්නවා (හැම වෙනස්කමකටම අලුත් කොළයක් — කොළ නාස්තියි). StringBuilder = pencil එකක් + rubber — එකම කොළේ මකලා ලියනවා (efficient). StringBuffer = ඒ pencil එකම, ඒත් එකවර එක්කෙනෙක් විතරයි ලියන්න දෙන "locked" version එක.',
    code: [
      {
        filename: 'StringImmutable.java',
        language: 'java',
        code: `String s = "shopify";
s.toUpperCase();               // අලුත් String එකක් return කරනවා — s වෙනස් වෙන්නෙ නෑ!
System.out.println(s);         // "shopify" (තාම lowercase)

s = s.toUpperCase();           // return එක ආපහු assign කරන්නම ඕන
System.out.println(s);         // "SHOPIFY"`,
        note: 'String methods object එක වෙනස් කරන්නෙ නෑ — අලුත් එකක් return කරනවා.',
      },
      {
        filename: 'BuildCsv.java',
        language: 'java',
        code: `// BAD: හැම iteration එකකම අලුත් String object එකක් -> O(n^2)
String csv = "";
for (String email : emails) {
    csv += email + ",";        // slow! temp objects ගොඩක්
}

// GOOD: එකම mutable buffer එකක් -> O(n)
StringBuilder sb = new StringBuilder();
for (String email : emails) {
    sb.append(email).append(",");   // same object, fast
}
String result = sb.toString();      // අන්තිමට එක String එකක්`,
        note: 'Large builds වලට StringBuilder — 10-100x faster.',
      },
      {
        filename: 'WhichOne.java',
        language: 'java',
        code: `// single-thread build -> StringBuilder (fast)
StringBuilder report = new StringBuilder();
report.append("Total: ").append(1200).append(" customers");

// multiple threads එකම buffer එකට write කරනවා නම් විතරක් -> StringBuffer
StringBuffer shared = new StringBuffer();   // synchronized methods (safe)`,
        note: 'Default = StringBuilder; shared-across-threads නම් විතරක් StringBuffer.',
      },
    ],
    mortar:
      'Mortar CSV export, audience file generation, Copilot prompt building වලදී emails/rows දහස් ගණන් concat වෙනවා. `String +=` වෙනුවට `StringBuilder` පාවිච්චි කරලා millions-of-rows exports streamed + fast (PROJECT_IDEA 4.3). String immutability නිසා country codes/source names වගේ shared strings safely reuse කරන්නත් පුළුවන් (thread-safe). Multi-threaded shared buffer එකක් ඕන වුනොත් විතරයි StringBuffer.',
    keyPoints: [
      'String immutable — modify = අලුත් object (`s.toUpperCase()` return එක assign කරන්න).',
      'StringBuilder: mutable, fast, single-thread — text building වලට default.',
      'StringBuffer: mutable + synchronized (thread-safe, slower).',
      'Loop එකක concat → හැමවිටම StringBuilder (O(n) vs String += O(n²)).',
    ],
    pitfalls: [
      'String immutable නිසා `s.trim()` වගේ call එකක return එක assign නොකළොත් වෙනස්කම නැති වෙනවා (`s = s.trim();`).',
      'Passwords වගේ sensitive data String එකේ තියාගන්න එපා (immutable නිසා memory එකේ රැඳෙනවා) — `char[]` use කරන්න.',
    ],
  },

  '1.4.4': {
    summary:
      'String Pool = JVM එකේ string literals cache කරන special memory area එකක් — duplicate strings share කරලා memory ඉතිරි කරනවා. `new String()` pool එක bypass කරනවා; `.intern()` වලින් manually pool කරන්න පුළුවන්.',
    sinhala: [
      {
        heading: 'කතාව: "shopify" මිලියන වතාවක් memory එකේ තියෙන්න ඕනද?',
        body: 'Mortar එකේ customers මිලියන ගණන් — හැම එකකම source එක "shopify" හෝ "woocommerce", country එක "LK" හෝ "US". මේ එකම strings මිලියන වතාවක් වෙන වෙන objects විදිහට memory එකේ තියෙනවා නම්, memory නාස්තියි. JVM මේකට smart විසඳුමක් — එකම string literal එක එක තැනක තියාගෙන, හැමෝම ඒ එකම එක share කරන එක. ඒකට තමයි String Pool.',
      },
      {
        heading: 'Literal vs new String()',
        body: 'String එකක් හදන ක්‍රම දෙකට වෙනස් හැසිරීම්:',
        points: [
          'String literal (`"shopify"`) — String Pool එකේ. එකම literal එක ආයෙ ආවොත් අලුත් object එකක් නෑ, pooled එකම reference එකයි.',
          '`new String("shopify")` — හැමවිටම heap එකේ අලුත් object එකක් (pool එක bypass). Memory නාස්තියි, කලාතුරකින් විතරයි ඕන.',
          '`.intern()` — string එකක් manually pool එකට දානවා (හෝ pooled version එකේ reference එක ගන්නවා).',
          'ඒ නිසා `==` (reference compare) literals වලට true, ඒත් new String() වලට false.',
        ],
      },
      {
        heading: 'මතක තියාගන්න: content compare = .equals()',
        body: 'මේ pool behaviour නිසා `==` predictable නෑ (literal ද, new ද කියන එකට depend). ඒ නිසා **strings content compare කරන්න හැමවිටම `.equals()`** පාවිච්චි කරන්න, කවදාවත් `==` නෙවෙයි. `==` reference (memory address) compare කරනවා; `.equals()` ඇත්ත අකුරු compare කරනවා.',
      },
    ],
    analogy:
      'Library එකක එකම පොතේ copies මිලියනයක් ගන්නෙ නැතුව, එකම copy එක හැමෝම share කරනවා වගේ (String Pool). කෙනෙක් "මට මගේම copy එකක්ම ඕන" කිව්වොත් (`new String()`) අලුත් එකක් print කරනවා — ඒත් ඒක නාස්තියි.',
    code: [
      {
        filename: 'Interning.java',
        language: 'java',
        code: `String a = "shopify";              // pool එකේ
String b = "shopify";              // එකම pooled object එකම (අලුත් එකක් නෑ)
System.out.println(a == b);        // true  (same reference)

String c = new String("shopify"); // heap එකේ අලුත් object එකක් (pool bypass)
System.out.println(a == c);        // false (වෙනස් reference)
System.out.println(a == c.intern()); // true  (intern -> pooled reference)
System.out.println(a.equals(c));   // true  (content සමානයි — මේක තමයි හරි compare)`,
        note: 'Content compare කරන්න හැමවිටම .equals() — == නෙවෙයි.',
      },
      {
        filename: 'WhyEqualsNotEquals.java',
        language: 'java',
        code: `String source1 = getSourceFromDb();     // runtime එකේ හැදෙන String (pool එකේ නෑ)
String source2 = "shopify";             // literal (pool එකේ)

// if (source1 == source2)  //  වැරදියි! false වෙන්න පුළුවන් (වෙනස් references)
if (source1.equals(source2)) {          // ✅ හරි — content compare
    System.out.println("Shopify customer");
}`,
        note: 'Runtime strings pool එකේ නෑ — == fail වෙනවා, .equals() හරි.',
      },
    ],
    mortar:
      'Mortar identity resolution / analytics වලදී millions of records වල country codes, source names, segment labels ("shopify", "LK", "VIP") වගේ repeated strings ගොඩක්. String pool + interning එකෙන් duplicate strings share කරලා memory footprint එක සැලකිය යුතු ලෙස අඩු කරගන්න පුළුවන් — huge datasets heap එකේ තියාගන්නකොට critical. String comparisons හැම තැනම `.equals()` — `==` bugs (source mismatch) වළක්වන්න.',
    keyPoints: [
      'Literals String Pool එකේ + shared; `new String()` හැමවිටම අලුත් heap object.',
      '`==` = reference compare; `.equals()` = content compare (strings වලට හැමවිටම equals).',
      '`.intern()` = string එකක් manually pool කරනවා (memory save).',
    ],
    pitfalls: [
      'Strings `==` වලින් compare කරන එක #1 beginner bug — literals වලට වැඩ කරන නිසා "වැඩ කරනවා වගේ" පෙනෙනවා, ඒත් runtime strings වලට fail.',
      'ඕනවට වඩා `.intern()` කරන එකත් හොඳ නෑ (pool එක ලොකු වෙනවා) — repeated strings ගොඩක් තියෙන තැන් වලට විතරයි.',
    ],
  },

  '1.4.5': {
    summary:
      'Java **හැමවිටම pass-by-value**. Primitive නම් value එකේම copy එකක්; object නම් **reference එකේ copy** එකක් pass වෙනවා. ඒ නිසා object එකේ state වෙනස් කරන්න පුළුවන්, ඒත් reference එක reassign කලාට caller ට බලපාන්නෙ නෑ.',
    sinhala: [
      {
        heading: 'කතාව: "ඇයි මගේ update එක නැති වුනේ?"',
        body: 'Mortar enrichment pipeline එකේ method එකකට Customer object එකක් pass කරලා, ඇතුලේ `customer.setCountry("LK")` කරනවා — ආපහු බලද්දී update එක තියෙනවා. ඒත් වෙන method එකක ඇතුලේ `customer = new Customer(...)` කරලා ආපහු බලද්දී — original එක වෙනස් වෙලා නෑ! ඇයි මේ වෙනස? මේක තේරුම්ගන්න නම් Java "pass-by-value" කියන එක හරියට තේරුම්ගන්නම ඕන — නැත්නම් bugs.',
      },
      {
        heading: 'Java = always pass-by-value',
        body: 'Java හැමවිටම argument එකේ **value එකක copy එකක්** method එකට pass කරනවා. දැන් "value" එක මොකක්ද කියන එක type එකට අනුව වෙනස්:',
        points: [
          'Primitive (int, double...): value එකම copy වෙනවා. Method එකේ වෙනස්කම් original එකට බලපාන්නෙම නෑ.',
          'Object: reference එකේ (address එකේ) copy එකක් pass වෙනවා — object එකේම copy එකක් නෙවෙයි.',
          'ඒ නිසා copy-reference එකයි original-reference එකයි දෙකම **එකම object එකට** point කරනවා.',
          'object එකේ internal state වෙනස් කරොත් (setCountry) → දෙන්නම දකිනවා. ඒත් copy-reference එක reassign කරොත් (= new) → original reference එකට බලපෑමක් නෑ.',
        ],
      },
      {
        heading: 'මේකෙන් තේරෙන්නේ',
        body: 'Object එකක් pass කරාම — ඇතුලේ ඒ object එකේ state වෙනස් කරන්න පුළුවන් (mutation), caller ට පේනවා. ඒත් parameter එකට අලුත් object එකක් assign කරලා original එක වෙනස් කරන්න බෑ. ඒ නිසා "Java pass-by-reference" කියන එක **වැරදියි** — හරි term එක "pass reference-value by value".',
      },
    ],
    analogy:
      'Object එකේ address එකේ **photocopy** එකක් දෙනවා වගේ. Photocopy එකේ තියෙන address එකට ගිහින් ගෙදර ඇතුලෙ (state) වෙනස් කරන්න පුළුවන් — original owner ටත් පේනවා (එකම ගෙදර). ඒත් photocopy එකේ address එක මකලා අලුත් එකක් ලිව්වත් (reassign), original owner ගේ address එකට බලපෑමක් නෑ.',
    code: [
      {
        filename: 'Mutation.java',
        language: 'java',
        code: `// object එකේ STATE වෙනස් කරනවා -> caller ට බලපානවා
static void enrich(Customer c) {
    c.setCountry("LK");        // reference copy එකත් එකම object එකට point කරන නිසා
}

Customer cust = new Customer("a@x.com");
enrich(cust);
System.out.println(cust.getCountry());  // "LK" -> වෙනස්කම පේනවා!`,
        note: 'object state mutation → original object එකට බලපානවා.',
      },
      {
        filename: 'Reassignment.java',
        language: 'java',
        code: `// parameter එකට අලුත් object එකක් assign කරනවා -> caller ට බලපාන්නෙ නෑ
static void replace(Customer c) {
    c = new Customer("z@x.com");   // local reference copy එක විතරයි වෙනස් වෙන්නේ
    c.setCountry("US");            // මේ අලුත් object එකට විතරයි
}

Customer cust = new Customer("a@x.com");
replace(cust);
System.out.println(cust.getEmail());   // "a@x.com" -> වෙනස් වුනේ නෑ!`,
        note: 'reference reassign local විතරයි — original reference safe.',
      },
      {
        filename: 'Primitive.java',
        language: 'java',
        code: `// primitive: value එකේම copy එකක් -> මුකුත් බලපාන්නෙ නෑ
static void tryChange(int x) {
    x = 999;               // local copy එක විතරයි
}
int count = 5;
tryChange(count);
System.out.println(count);  // 5 (වෙනස් වුනේ නෑ)`,
        note: 'primitives value-copy — method එකේ වෙනස්කම් original එකට බලපාන්නෙ නෑ.',
      },
    ],
    mortar:
      'Mortar enrichment pipeline එකේ එකම `Customer` object එක stages ගණනාවක් හරහා යනවා (name inference → gender → geocode → email-validate). හැම stage එකකම එකම object එකේ state වෙනස් කරනවා (reference-value pass-by-value නිසා දෙන්නම එකම object එකට point කරනවා) — ඒ නිසා changes accumulate වෙනවා. මේ මූලික සිද්ධාන්තය තේරුම් නොගත්තොත් "ඇයි update එක නැති වුනේ?" (reassign කරාට) හෝ "ඇයි මේ object එක අනපේක්ෂිතව වෙනස් වුනේ?" (shared mutation) වගේ bugs එනවා.',
    keyPoints: [
      'Java = **always** pass-by-value.',
      'Object → reference එකේ copy pass වෙනවා → object state mutate කරන්න පුළුවන් (caller ට පේනවා).',
      'Parameter reassign (`= new`) කලාට caller ගේ reference එකට බලපාන්නෙ නෑ.',
      'Primitive → value copy → method වෙනස්කම් original එකට කවදාවත් බලපාන්නෙ නෑ.',
    ],
    pitfalls: [
      '"Java objects pass-by-reference" කියන එක වැරදියි — "reference-value pass-by-value" කියන එක හරි (interview trap).',
      'Method එකකට pass කරන mutable object එකක් ඇතුලේ වෙනස් වුනොත් caller ට surprise එකක් — shared mutable state පරෙස්සමින් (immutability — 1.3.3 — උදව් වෙනවා).',
    ],
  },
};
