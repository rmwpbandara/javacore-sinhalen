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
      'Class kiyanne blueprint එකක්; Object kiyanne ඒ blueprint එකෙන් හදන real instance එක.',
    sinhala: [
      {
        heading: 'Class vs Object',
        body: 'Class එකක් කියන්නේ දත්ත (fields) සහ හැසිරීම (methods) එකට bundle කරන template එකක්. ඒක තාම memory එකේ නෑ — ඒක plan එකක් විතරයි. `new` keyword එකෙන් object එකක් හදනකොට තමයි ඇත්තටම heap memory එකේ instance එකක් හැදෙන්නේ. එක class එකකින් objects ගොඩක් හදන්න පුළුවන්, හැම එකකටම තමන්ගේම state එකක් තියෙනවා.',
      },
      {
        heading: 'State සහ Behavior',
        body: 'Object එකක State එක තියෙන්නේ fields වල (උදා: customer කෙනෙක්ගේ email, totalSpend). Behavior එක තියෙන්නේ methods වල (උදා: `recordPurchase()`). Object කියන්නේ මේ දෙක එකට තියෙන "living" entity එකක්.',
      },
    ],
    analogy:
      'Class එක house plan එකක් වගේ. Plan එකෙන් ගෙවල් 100ක් හදන්න පුළුවන් — හැම ගෙයක්ම (object) එකම plan එකෙන්, ඒත් වෙන වෙනම address, colour, owner එක්ක.',
    code: [
      {
        filename: 'Customer.java',
        language: 'java',
        code: `// Class = blueprint for every Mortar customer record
public class Customer {
    // --- state (fields) ---
    private String email;
    private double totalSpend;

    // constructor: object එකක් හදනකොට initial state එක set කරයි
    public Customer(String email) {
        this.email = email;
        this.totalSpend = 0.0;
    }

    // --- behavior (method) ---
    public void recordPurchase(double amount) {
        this.totalSpend += amount;
    }

    public double getTotalSpend() {
        return totalSpend;
    }
}

class Demo {
    public static void main(String[] args) {
        // 'new' = heap එකේ object එකක් හැදෙනවා
        Customer alice = new Customer("alice@shop.com");
        alice.recordPurchase(120.0);
        System.out.println(alice.getTotalSpend()); // 120.0
    }
}`,
        note: 'alice කියන්නේ Customer class එකේ එක object එකක් (instance එකක්).',
      },
    ],
    mortar:
      'Mortar එකේ පාරිභෝගිකයෙක් (customer) කියන්නේ මූලික building block එක. Shopify, WooCommerce වගේ තැන් වලින් එන හැම customer කෙනෙක්ම `Customer` class එකේ object එකක් විදිහට heap එකේ නිර්මාණය වෙනවා — email, spend, orders එක්ක. හැම object එකකටම තමන්ගේම golden record එකක්.',
    keyPoints: [
      'Class = template/blueprint (memory එකේ නෑ). Object = `new` වලින් හදන instance එක.',
      'State = fields, Behavior = methods.',
      'එක class එකකින් independent objects කීයක් හරි හදන්න පුළුවන්.',
    ],
    pitfalls: [
      'Object එකක් `new` නොකර method call කලොත් `NullPointerException`.',
      'Class එකයි Object එකයි එකම දෙයක් නෙවෙයි — class එක design එක, object එක runtime instance එක.',
    ],
  },

  '1.1.2': {
    summary:
      'Inheritance කියන්නේ එක class එකකට තව class එකකගේ fields/methods උරුම කරගන්න පුළුවන් වීම — `extends` keyword එකෙන්.',
    sinhala: [
      {
        heading: 'IS-A relationship',
        body: 'Subclass එකක් superclass එකෙන් `extends` කරනකොට, superclass එකේ public/protected members ඔක්කොම subclass එකට උරුම වෙනවා. මේකෙන් code reuse එකයි, "IS-A" relationship එකයි එනවා — උදා: `ShopifyConnector` IS-A `Connector`.',
      },
      {
        heading: 'super keyword',
        body: '`super()` වලින් parent constructor එක call කරනවා, `super.method()` වලින් parent method එකේ version එක call කරනවා. Subclass එකට තමන්ගේම extra behaviour add කරන්නත්, parent behaviour override කරන්නත් පුළුවන්.',
      },
    ],
    analogy:
      'ShopifyConnector, WooConnector දෙකම "Connector" කෙනෙක්ගේ දරුවෝ වගේ. දෙන්නම parent ගෙන් පොදු දේවල් (connect කරන හැටි) උරුම කරගෙන, තමන්ගේම විශේෂ දේවල් එකතු කරගන්නවා.',
    code: [
      {
        filename: 'Connector.java',
        language: 'java',
        code: `// Base class - every Mortar data source shares this
public class Connector {
    protected String brandId;

    public Connector(String brandId) {
        this.brandId = brandId;
    }

    public void connect() {
        System.out.println("Connecting brand " + brandId + "...");
    }
}

// ShopifyConnector IS-A Connector
public class ShopifyConnector extends Connector {
    public ShopifyConnector(String brandId) {
        super(brandId); // parent constructor call
    }

    public void syncOrders() {
        connect(); // inherited method
        System.out.println("Syncing Shopify orders");
    }
}`,
        note: 'ShopifyConnector එකට connect() එක උරුම වුණා — නැවත ලියන්න ඕන නෑ.',
      },
    ],
    mortar:
      'Mortar එකට connectors 15+ ක් තියෙනවා (Shopify, WooCommerce, Klaviyo...). ඔක්කොම `Connector` base එකෙන් `extends` කරලා connect/auth වගේ පොදු logic reuse කරනවා. අලුත් platform එකක් add කරනකොට parent code එක ආයෙ ලියන්න ඕන නෑ.',
    keyPoints: [
      '`extends` = single inheritance (Java classes එකට එක parent විතරයි).',
      '`super()` parent constructor එකට, `super.x()` parent method එකට.',
      'Inheritance = "IS-A" relationship + code reuse.',
    ],
    pitfalls: [
      'Deep inheritance chains (5-6 levels) maintain කරන්න අමාරුයි — බොහෝවිට composition හොඳයි.',
      'Subclass constructor එකේ first line එක implicitly `super()` call කරනවා; parent එකට no-arg constructor නැත්නම් explicitly `super(...)` දෙන්න ඕන.',
    ],
  },

  '1.1.3': {
    summary:
      'Abstraction කියන්නේ "මොකද කරන්නේ" පෙන්නලා "කොහොමද කරන්නේ" හංගන එක — implementation details සඟවනවා.',
    sinhala: [
      {
        heading: 'Essential details විතරක්',
        body: 'Abstraction වලින් user ට ඕන complexity එක අඩු කරනවා. Abstract class හෝ interface එකකින් "contract" එකක් define කරලා, ඇත්ත implementation එක concrete class වල හංගනවා. User දන්නෙ `sync()` කියලා method එකක් තියෙනවා කියලා විතරයි — ඇතුලෙ HTTP calls, retries මොනවද කියලා දැනගන්න ඕන නෑ.',
      },
    ],
    analogy:
      'රිය පදවනකොට steering wheel එක කරකවනවා විතරයි. Engine එක, gears මොනවද කරන්නේ කියලා දැනගන්න ඕන නෑ — ඒ complexity එක abstract කරලා තියෙනවා.',
    code: [
      {
        filename: 'DataSource.java',
        language: 'java',
        code: `// Abstraction: WHAT a data source does, not HOW
public interface DataSource {
    List<Customer> fetchCustomers();  // contract only
}

// HOW is hidden inside each implementation
public class ShopifyDataSource implements DataSource {
    @Override
    public List<Customer> fetchCustomers() {
        // hidden complexity: auth, pagination, rate-limits, retries...
        return callShopifyApi();
    }
    private List<Customer> callShopifyApi() { /* ... */ return List.of(); }
}`,
        note: 'Caller දන්නෙ fetchCustomers() කියලා විතරයි — ඇතුලෙ logic එක hidden.',
      },
    ],
    mortar:
      'Mortar එකේ ingestion layer එක හැම source එකක්ම `DataSource` abstraction එකක් විදිහට දකිනවා. ඒ නිසා pipeline code එකට Shopify ද CSV upload ද කියලා දැනගන්න ඕන නෑ — හැම එකක්ම customers දෙනවා, ඇතුලේ complexity එක සම්පූර්ණයෙන් hidden.',
    keyPoints: [
      'Abstraction = complexity hide කරලා essential interface එක විතරක් expose කරන එක.',
      'Java වල abstract classes සහ interfaces වලින් achieve කරනවා.',
      'Encapsulation "data hiding"; Abstraction "implementation hiding".',
    ],
  },

  '1.1.4': {
    summary:
      'Encapsulation කියන්නේ data (fields) private කරලා, ඒවාට access කරන්නේ controlled methods (getters/setters) හරහා විතරක් වීම.',
    sinhala: [
      {
        heading: 'Data hiding',
        body: 'Fields `private` කරලා, පිටින් කෙලින්ම access කරන්න බෑ. ඒ වෙනුවට public methods හරහා access දෙනවා. මේකෙන් validation දාන්න, invariants protect කරන්න, future එකේ internal representation එක වෙනස් කරන්නත් පුළුවන් — outside code එකට බලපෑමක් නැතුව.',
      },
    ],
    analogy:
      'ATM එකක් වගේ. සල්ලි (data) machine එක ඇතුලේ safe. ඔයාට කරන්න පුළුවන් approved operations (withdraw/deposit) විතරයි — කෙලින්ම cash box එකට අත දාන්න බෑ.',
    code: [
      {
        filename: 'CustomerProfile.java',
        language: 'java',
        code: `public class CustomerProfile {
    private String email;        // hidden
    private boolean emailValid;  // hidden

    public String getEmail() { return email; }

    // setter validates -> invariant protected
    public void setEmail(String email) {
        if (email == null || !email.contains("@")) {
            throw new IllegalArgumentException("Invalid email");
        }
        this.email = email;
        this.emailValid = true;
    }

    public boolean isEmailValid() { return emailValid; }
}`,
        note: 'email set කරන්න පුළුවන් validation එකෙන් pass වුනොත් විතරයි.',
      },
    ],
    mortar:
      'Mortar customer records වල email, phone වගේ sensitive fields encrypted. Encapsulation නිසා ඒවා private; getters වලින් access කරනකොට role permission එකයි decryption එකයි enforce කරන්න පුළුවන්. Invalid email එකක් කවදාවත් set වෙන්නෙ නෑ.',
    keyPoints: [
      'Fields `private`, access `public` methods හරහා.',
      'Validation + invariants protect කරන්න පුළුවන්.',
      'Internal implementation එක නිදහසේ වෙනස් කරන්න පුළුවන් (loose coupling).',
    ],
    pitfalls: [
      'Getter/setter දාලා field එකම expose කරනවා නම් encapsulation එකේ තේරුමක් නෑ — logic/validation දාන්න.',
    ],
  },

  '1.1.5.1': {
    summary:
      'Method Overloading = එකම නමින් methods කිහිපයක්, parameters වෙනස්. Compile-time (static) polymorphism.',
    sinhala: [
      {
        heading: 'Same name, different signature',
        body: 'එකම class එකේ එකම method name එකෙන් methods කිහිපයක් ලියන්න පුළුවන් — parameter list එක (count/type/order) වෙනස් නම්. Compiler compile time එකේදීම කුමන version එකද call වෙන්නෙ කියලා තීරණය කරනවා (static binding). Return type එක විතරක් වෙනස් කරලා overload කරන්න බෑ.',
      },
    ],
    analogy:
      '"add" කියන වචනෙ වගේ — "සල්ලි add කරනවා", "list එකට item add කරනවා". එකම වචනෙ, context (arguments) අනුව තේරුම වෙනස්.',
    code: [
      {
        filename: 'AudienceBuilder.java',
        language: 'java',
        code: `public class AudienceBuilder {
    // overloaded: same name, different parameters
    public void addFilter(String attribute, String value) { /* attribute rule */ }

    public void addFilter(String attribute, int min, int max) { /* range rule */ }

    public void addFilter(ChurnStatus status) { /* predictive rule */ }
}

// compiler picks the right one at compile time
new AudienceBuilder().addFilter("country", "LK");
new AudienceBuilder().addFilter("age", 18, 35);`,
        note: 'තුනම "addFilter" — ඒත් arguments අනුව compiler correct එක තෝරනවා.',
      },
    ],
    mortar:
      'Mortar visual segment builder එකේ conditions වර්ග තුනක් තියෙනවා: attribute, event, predictive. `addFilter(...)` එකම නමින් overload කරලා, developer ට clean API එකක් දෙනවා — argument අනුව හරි rule එක හැදෙනවා.',
    keyPoints: [
      'Overloading = same method name + different parameter list.',
      'Compile-time / static binding.',
      'Return type එක විතරක් වෙනස් කරලා overload කරන්න බෑ.',
    ],
  },

  '1.1.5.2': {
    summary:
      'Method Overriding = subclass එකක් parent method එකේම signature එකෙන් අලුත් implementation එකක් දෙන එක. Run-time (dynamic) polymorphism.',
    sinhala: [
      {
        heading: 'Same signature, new behaviour',
        body: 'Subclass එකක් parent එකේ method එකක්ම (same name + parameters) නැවත define කරනකොට, ඒක override වෙනවා. Runtime එකේදී object එකේ actual type එක අනුව කුමන version එකද run වෙන්නෙ කියලා decide වෙනවා (dynamic dispatch). `@Override` annotation එකෙන් compiler ට verify කරන්න කියනවා.',
      },
    ],
    analogy:
      'හැම connector එකකටම "sync()" කරන්න පුළුවන්, ඒත් Shopify sync කරන විදිහයි Klaviyo sync කරන විදිහයි වෙනස්. එකම method name, වෙනස් behaviour.',
    code: [
      {
        filename: 'Connectors.java',
        language: 'java',
        code: `abstract class Connector {
    abstract void sync();
}

class ShopifyConnector extends Connector {
    @Override void sync() { System.out.println("Sync via Shopify REST API"); }
}

class KlaviyoConnector extends Connector {
    @Override void sync() { System.out.println("Two-way sync via Klaviyo"); }
}

// run-time picks the correct sync()
Connector c = new KlaviyoConnector();
c.sync(); // -> "Two-way sync via Klaviyo"`,
        note: 'Reference type එක Connector වුනත්, runtime එකේ actual object එකේ sync() එක call වෙනවා.',
      },
    ],
    mortar:
      'Mortar sync scheduler එක `List<Connector>` එකක් loop කරලා හැම එකකම `sync()` call කරනවා. Overriding නිසා scheduler එකට connector type එක දැනගන්න ඕන නෑ — හරි implementation එක runtime එකේ automatically run වෙනවා.',
    keyPoints: [
      'Overriding = same signature, subclass එකේ අලුත් implementation.',
      'Run-time / dynamic dispatch.',
      '`@Override` දාන්න — typos compile-time එකේ අල්ලනවා.',
    ],
    pitfalls: [
      'Overriding සහ Overloading confuse කරන්න එපා: overload = compile-time (parameters වෙනස්), override = run-time (signature සමානයි).',
      '`private`/`static`/`final` methods override කරන්න බෑ.',
    ],
  },

  '1.2.1': {
    summary:
      'Abstract class කියන්නේ instantiate කරන්න බැරි, partly-implemented class එකක් — subclasses වලට හදන්න base එකක්.',
    sinhala: [
      {
        heading: 'Partial implementation',
        body: 'Abstract class එකකට abstract methods (body නැති) සහ concrete methods (body තියෙන) දෙකම තියෙන්න පුළුවන්. `new` කරන්න බෑ. Subclass එකකින් abstract methods implement කරන්නම ඕන. Shared state (fields) + common logic තියෙනකොට abstract class හොඳයි.',
      },
    ],
    analogy:
      '"Connector" කියන්නේ abstract idea එකක් — ඇත්තටම "Connector" කෙනෙක් නෑ, Shopify/Woo වගේ concrete අය තමයි ඉන්නේ. ඒත් ඔක්කොටම පොදු දේවල් Connector එකේ තියෙනවා.',
    code: [
      {
        filename: 'AbstractConnector.java',
        language: 'java',
        code: `public abstract class AbstractConnector {
    protected final String brandId;
    protected AbstractConnector(String brandId) { this.brandId = brandId; }

    // concrete: shared by all
    public final void run() {
        authenticate();
        sync();               // subclass-specific
        System.out.println("Done for " + brandId);
    }

    protected void authenticate() { System.out.println("OAuth handshake"); }

    // abstract: each connector must define
    protected abstract void sync();
}`,
        note: 'run() common logic; sync() එක subclass එකට හදන්න තියෙනවා.',
      },
    ],
    mortar:
      'Mortar හැම connector එකකම `run()` flow එක එකයි (auth → sync → notify). ඒ common flow එක `AbstractConnector` එකේ තියෙනවා, `sync()` විතරක් abstract — හැම platform එකකටම වෙනස් නිසා. මේක Template Method pattern එකේ පදනම.',
    keyPoints: [
      'Abstract class = instantiate කරන්න බෑ; abstract + concrete methods mix.',
      'Shared state + common logic තියෙනකොට interface වලට වඩා හොඳයි.',
      'Subclass එකක් abstract methods ඔක්කොම implement කරන්නම ඕන.',
    ],
  },

  '1.2.2': {
    summary:
      'Interface = pure contract එකක්. Java 8 වලින් default/static methods, Java 9 වලින් private methods add වුණා.',
    sinhala: [
      {
        heading: 'Contract + default methods',
        body: 'Interface එකක් methods වල signatures define කරනවා (කවුරු implement කරන්නද කියලා). Class එකකට interfaces කිහිපයක් `implements` කරන්න පුළුවන් (multiple inheritance of type). Java 8 වලින් `default` methods — interface එකේම body එකක් දෙන්න පුළුවන්, backward-compatible විදිහට අලුත් methods add කරන්න. `static` methods interface එකේ utility විදිහට තියෙන්න පුළුවන්.',
      },
    ],
    analogy:
      '"Syncable" කියන්නේ බලපත්‍රයක් වගේ — "මම sync කරන්න පුළුවන්" කියලා පොරොන්දුවක්. ඒ පොරොන්දුව දෙන ඕනම දෙයක් (connector, exporter) sync කරන්න පුළුවන් කියලා guarantee එකක්.',
    code: [
      {
        filename: 'Syncable.java',
        language: 'java',
        code: `public interface Syncable {
    void sync();                        // abstract contract

    default void syncWithRetry() {      // Java 8 default method
        for (int i = 0; i < 3; i++) {
            try { sync(); return; }
            catch (Exception e) { System.out.println("retry " + i); }
        }
    }

    static Syncable noop() {             // Java 8 static method
        return () -> System.out.println("no-op sync");
    }
}

class MetaAudienceSync implements Syncable {
    public void sync() { System.out.println("Push audience to Meta"); }
}`,
        note: 'syncWithRetry() default නිසා හැම implementer ම නොමිලේ retry logic එක ලැබෙනවා.',
      },
    ],
    mortar:
      'Mortar activation layer එකේ Meta, Google, Klaviyo destinations හැම එකක්ම `Syncable`. `syncWithRetry()` default method එකෙන් හැම destination එකකටම retry logic එක නොමිලේ ලැබෙනවා — code duplicate නැතුව.',
    keyPoints: [
      'Interface = multiple inheritance of type (class එකකට කිහිපයක්).',
      'Java 8: `default` + `static` methods; Java 9: `private` helper methods.',
      'Fields interface වල implicitly `public static final` (constants).',
    ],
  },

  '1.2.3': {
    summary:
      'Abstract class vs Interface: කවදා මොකක්ද use කරන්නේ? — state + shared code නම් abstract class; pure capability contract නම් interface.',
    sinhala: [
      {
        heading: 'තෝරගන්නේ කොහොමද',
        body: 'Abstract class එකට constructors, instance fields (state), සහ any access modifier methods තියෙන්න පුළුවන් — ඒත් class එකකට එකක් විතරයි extend කරන්න පුළුවන්. Interface එකකට state නෑ (constants විතරයි), ඒත් කිහිපයක් implement කරන්න පුළුවන්. "IS-A + shared state" → abstract class. "CAN-DO capability" → interface.',
      },
    ],
    analogy:
      '`AbstractConnector` = "Connector කෙනෙක්" (identity + shared state). `Syncable`, `Exportable` = "පුළුවන් දේවල්" (capabilities). එක connector එකක් Connector වෙන්නත්, Syncable + Exportable දෙකම වෙන්නත් පුළුවන්.',
    code: [
      {
        filename: 'Comparison.java',
        language: 'java',
        code: `// abstract class: identity + shared state
abstract class AbstractConnector {
    protected String brandId;            // state allowed
    abstract void sync();
}

// interfaces: capabilities, mix many
interface Exportable { void export(); }
interface Schedulable { void schedule(); }

class ShopifyConnector extends AbstractConnector
        implements Exportable, Schedulable {
    void sync()     { }
    public void export()   { }
    public void schedule() { }
}`,
        note: 'One base identity (extends) + many capabilities (implements).',
      },
    ],
    mortar:
      'Mortar එකේ connector එකක් `AbstractConnector` එකෙන් identity + brandId state එක ගන්නවා, `Exportable`/`Schedulable` interfaces වලින් extra capabilities mix කරගන්නවා. මේ separation එකෙන් flexible, testable design එකක් එනවා.',
    keyPoints: [
      'Abstract class: single inheritance, state + constructors OK.',
      'Interface: multiple, no instance state, capability-focused.',
      'Modern Java වල interface + default methods බොහෝවිට enough.',
    ],
  },

  '1.2.4': {
    summary:
      'Constructor chaining = එක constructor එකක් තව එකක් call කරන එක: `this()` same class, `super()` parent class.',
    sinhala: [
      {
        heading: 'this() සහ super()',
        body: '`this(...)` වලින් එකම class එකේ තව constructor එකක් call කරනවා (duplicate init code අඩු කරන්න). `super(...)` වලින් parent constructor එක call කරනවා. දෙකම constructor එකේ first statement එක වෙන්නම ඕන. Explicit `super()` නැත්නම් compiler එක no-arg `super()` එකක් automatically දානවා.',
      },
    ],
    analogy:
      'Form එකක් fill කරනකොට "same as above" tick කරනවා වගේ — `this()` වලින් තව constructor එකකට වැඩේ භාර දෙනවා, duplicate නොකර.',
    code: [
      {
        filename: 'Customer.java',
        language: 'java',
        code: `public class Customer {
    private final String email;
    private final String country;

    public Customer(String email) {
        this(email, "UNKNOWN");   // chain to the fuller constructor
    }

    public Customer(String email, String country) {
        this.email = email;
        this.country = country;
    }
}

class ShopifyCustomer extends Customer {
    ShopifyCustomer(String email) {
        super(email);             // parent constructor
    }
}`,
        note: 'this(...) එකෙන් initialization logic එක එක තැනකට එකතු කරනවා.',
      },
    ],
    mortar:
      'Mortar customer objects source-එක අනුව අඩු/වැඩි data එක්ක එනවා. Constructor chaining වලින් "email විතරක්" හෝ "email + country" වගේ convenient constructors දෙන්න පුළුවන් — core init logic එක එක තැනක තියාගෙන.',
    keyPoints: [
      '`this(...)` same-class constructor; `super(...)` parent constructor.',
      'දෙකම first statement වෙන්නම ඕන — එකවර දෙකම බෑ.',
      'Init logic duplicate නොකර DRY තියාගන්න පුළුවන්.',
    ],
    pitfalls: [
      'Constructors දෙකක් එකිනෙක `this()` කරලා cycle එකක් හැදුනොත් compile error.',
    ],
  },

  '1.2.5': {
    summary:
      'Diamond problem = multiple inheritance එකෙන් එන ambiguity. Java classes වලට allow නෑ; interfaces වල default methods conflict වුනොත් override කරලා විසඳනවා.',
    sinhala: [
      {
        heading: 'Ambiguity සහ විසඳුම',
        body: 'Class දෙකකින් එකම method එක උරුම වුනොත් "කුමන එකද?" කියලා ambiguity එකක් එනවා (diamond shape). Java classes වල multiple inheritance නෑ, ඒ නිසා මේ ප්‍රශ්නෙ නෑ. ඒත් interfaces දෙකකට එකම default method එකක් තිබුනොත්, implementing class එක ඒක override කරලා (`Interface.super.method()` වලින් හෝ අලුත් logic එකෙන්) විසඳන්නම ඕන.',
      },
    ],
    analogy:
      'Boss දෙන්නෙක් එකම දේ දෙන්නම විදිහට කියනකොට, ඔයාට තීරණයක් ගන්නම වෙනවා — ඒ වගේම class එකට conflict එක resolve කරන්නම ඕන.',
    code: [
      {
        filename: 'Diamond.java',
        language: 'java',
        code: `interface Auditable { default String source() { return "audit"; } }
interface Trackable  { default String source() { return "track"; } }

// both give default source() -> must resolve
class SyncJob implements Auditable, Trackable {
    @Override
    public String source() {
        // explicitly choose (or combine)
        return Auditable.super.source() + "+" + Trackable.super.source();
    }
}`,
        note: 'Conflict එක override එකෙන් explicit කරලා විසඳනවා.',
      },
    ],
    mortar:
      'Mortar SyncJob එකක් `Auditable` + `Trackable` වගේ cross-cutting interfaces mix කරනකොට, default methods clash වුනොත් explicitly resolve කරනවා — logs එකට කුමන source එකද යන්නෙ කියලා පැහැදිලියි.',
    keyPoints: [
      'Java classes = no multiple inheritance (diamond avoided).',
      'Interface default methods clash → override + `X.super.method()`.',
      'Design එකේදී conflicting defaults අඩු කරගන්න.',
    ],
  },

  '1.2.6': {
    summary:
      'Composition vs Inheritance: "HAS-A" (composition) බොහෝවිට "IS-A" (inheritance) වලට වඩා flexible. "Favour composition over inheritance".',
    sinhala: [
      {
        heading: 'HAS-A vs IS-A',
        body: 'Inheritance එකෙන් subclass එක parent එකට tightly coupled — parent වෙනස් වුනොත් subclass කැඩෙන්න පුළුවන් (fragile base class). Composition එකෙන් object එකක් ඇතුලේ තව objects තියාගෙන (HAS-A), ඒවගේ behaviour delegate කරනවා. මේක loosely coupled, runtime එකේ swap කරන්න පුළුවන්, testable.',
      },
    ],
    analogy:
      'ConnectorService එකක් "Connector කෙනෙක් වෙනවා" (inherit) වෙනුවට, "HttpClient එකක් + RetryPolicy එකක් තියාගන්නවා" (compose). කොටස් වෙන වෙනම swap කරන්න පුළුවන්.',
    code: [
      {
        filename: 'Composition.java',
        language: 'java',
        code: `// composition: SyncService HAS-A HttpClient + RetryPolicy
class HttpClient  { String get(String url) { return "{}"; } }
class RetryPolicy { <T> T run(java.util.concurrent.Callable<T> c) throws Exception { return c.call(); } }

class SyncService {
    private final HttpClient http;
    private final RetryPolicy retry;

    SyncService(HttpClient http, RetryPolicy retry) { // injected parts
        this.http = http; this.retry = retry;
    }

    String fetch(String url) throws Exception {
        return retry.run(() -> http.get(url));
    }
}`,
        note: 'HttpClient / RetryPolicy වෙන වෙනම test / replace කරන්න පුළුවන්.',
      },
    ],
    mortar:
      'Mortar services HttpClient, RetryPolicy, RateLimiter වගේ parts compose කරලා හදනවා — inherit කරනවා වෙනුවට. ඒ නිසා unit tests වලදී mock parts inject කරන්න පුළුවන්, connectors හැම එකකටම behaviours mix-and-match කරන්නත් පුළුවන්.',
    keyPoints: [
      'Inheritance = IS-A (tight); Composition = HAS-A (loose, flexible).',
      '"Favour composition over inheritance."',
      'Composition = easier testing + runtime swapping (DI-friendly).',
    ],
  },

  '1.2.7': {
    summary:
      'Association, Aggregation, Composition = objects අතර relationships වල strength levels තුනක්.',
    sinhala: [
      {
        heading: 'තුනේ වෙනස',
        body: 'Association = objects දෙකක් අතර පොදු "uses-a" සම්බන්ධයක් (lifecycle independent). Aggregation = "has-a" ඒත් weak — part එකට container එකෙන් පිට existence එකක් තියෙනවා (Brand HAS Users, users වෙනම exist වෙනවා). Composition = "has-a" ඒත් strong — part එකේ lifecycle එක container එකට bound (Order HAS OrderLines; order delete වුනොත් lines යනවා).',
      },
    ],
    analogy:
      'Aggregation: team එකයි players ලයි — team එක අයින් වුනත් players ඉන්නවා. Composition: house එකයි rooms ලයි — house එක කඩනකොට rooms නෑ.',
    code: [
      {
        filename: 'Relationships.java',
        language: 'java',
        code: `// Aggregation: Brand aggregates Users (users live independently)
class User {}
class Brand {
    private List<User> users;               // weak: shared/independent
    Brand(List<User> users) { this.users = users; }
}

// Composition: Order owns OrderLines (die together)
class Order {
    private final List<OrderLine> lines = new ArrayList<>(); // strong
    void addLine(String sku, int qty) { lines.add(new OrderLine(sku, qty)); }
    record OrderLine(String sku, int qty) {}
}`,
        note: 'Aggregation = passed in / shared; Composition = created & owned inside.',
      },
    ],
    mortar:
      'Mortar: Brand එකක් Users aggregate කරනවා (user කෙනෙක් brands කිහිපයකට ඉන්න පුළුවන්). Order එකක් OrderLines compose කරනවා (order delete වුනොත් lines යනවා). මේ modelling එක data integrity එකට වැදගත්.',
    keyPoints: [
      'Association: general uses-a link.',
      'Aggregation: weak has-a, independent lifecycles.',
      'Composition: strong has-a, shared lifecycle (owner මැරුනොත් part යනවා).',
    ],
  },

  '1.3.1': {
    summary:
      'Access modifiers (private, default, protected, public) = member එකකට කොහෙන් access කරන්න පුළුවන්ද කියලා control කරනවා.',
    sinhala: [
      {
        heading: 'Visibility levels 4',
        body: '`private` — same class විතරයි. `default` (no keyword) — same package. `protected` — same package + subclasses (වෙන packages වලත්). `public` — හැම තැනම. Encapsulation එකට හැමවිටම හැකි අඩුම visibility එක දෙන්න (least privilege).',
      },
    ],
    analogy:
      'ගෙදර කාමර වගේ: private = ඔයාගේ bedroom, default = ගෙදර අය, protected = පවුලයි relations ලයි, public = හැමෝටම open living room.',
    code: [
      {
        filename: 'AccessDemo.java',
        language: 'java',
        code: `public class CustomerRecord {
    private String ssn;          // only this class
    String internalId;           // package-private
    protected String segment;    // subclasses + package
    public String email;         // everyone

    private void encryptSsn() { /* ... */ }        // hidden helper
    public String getEmailMasked() { return "***"; } // safe API
}`,
        note: 'sensitive data private; safe API public.',
      },
    ],
    mortar:
      'Mortar customer records වල SSN/phone වගේ sensitive fields `private` + encrypted. Public API එකෙන් masked/authorised views විතරයි. ඒ නිසා අහම්බෙන් sensitive data leak වෙන්නෙ නෑ.',
    keyPoints: [
      'private < default < protected < public (least → most visible).',
      'Least-privilege: default විදිහට හැකි තරම් අඩු visibility.',
      'protected = package + subclasses (subclass access for extension).',
    ],
  },

  '1.3.2': {
    summary:
      'static = class එකට අයිති (object එකකට නෙවෙයි). Variables, methods, blocks, nested classes සඳහා.',
    sinhala: [
      {
        heading: 'Class-level members',
        body: '`static` field එකක් objects හැම එකකම share වෙනවා (එක copy එකයි, class එකට අයිති). `static` method එකකට instance එකක් නැතුව call කරන්න පුළුවන් (`Utils.x()`), ඒත් `this` access කරන්න බෑ. `static` block එක class load වෙනකොට එක පාරක් run වෙනවා (init). Static nested class එකට outer instance එකක් ඕන නෑ.',
      },
    ],
    analogy:
      'Company එකක staff count එක වගේ — හැම employee කෙනෙක්ටම වෙන වෙනම නෑ, එක shared number එකයි (static). ඒත් employee කෙනෙක්ගේ name එක instance-specific.',
    code: [
      {
        filename: 'IdGenerator.java',
        language: 'java',
        code: `public class IdGenerator {
    private static long counter = 0;      // shared across all objects
    public static final String PREFIX = "MC"; // constant

    static { System.out.println("IdGenerator loaded"); } // static block

    public static synchronized String next() { // no instance needed
        return PREFIX + (++counter);
    }
}

String id1 = IdGenerator.next(); // MC1
String id2 = IdGenerator.next(); // MC2`,
        note: 'counter එක shared — object එකක් හදන්නෙ නැතුව call කරනවා.',
      },
    ],
    mortar:
      'Mortar internal record IDs generate කරන්න static counter/utility එකක් පාවිච්චි කරන්න පුළුවන්. Config constants (`PREFIX`) static final විදිහට එක තැනක. ඒත් shared mutable static state එකේ thread-safety ගැන පරෙස්සම් වෙන්න ඕන.',
    keyPoints: [
      'static = class-owned, shared single copy.',
      'static method එකෙන් instance members / `this` access කරන්න බෑ.',
      'static block = class-load-time initialization.',
    ],
    pitfalls: [
      'Mutable static state = concurrency bugs + testing අමාරුයි. Constants (`static final`) වලට ලඟුයි.',
    ],
  },

  '1.3.3': {
    summary:
      'final = වෙනස් කරන්න බැරි. Variable (constant), method (override බෑ), class (extend බෑ).',
    sinhala: [
      {
        heading: 'තුන් වර්ගය',
        body: '`final` variable එකක් එක පාරක් assign කරලා ආයෙ වෙනස් කරන්න බෑ (constant / immutable reference). `final` method එකක් subclass එකකින් override කරන්න බෑ. `final` class එකක් extend කරන්න බෑ (උදා: `String`). Immutability, safety, thread-safety වලට final ගොඩක් වැදගත්.',
      },
    ],
    analogy:
      'Contract එකක් sign කලාට පස්සේ වෙනස් කරන්න බෑ වගේ — final කලාට පස්සේ ඒක "locked".',
    code: [
      {
        filename: 'FinalDemo.java',
        language: 'java',
        code: `public final class Money {          // cannot be extended
    private final double amount;    // set once, immutable
    private final String currency;

    public Money(double amount, String currency) {
        this.amount = amount;
        this.currency = currency;
    }

    public final double getAmount() { return amount; } // cannot override
}`,
        note: 'Immutable value object — thread-safe by design.',
      },
    ],
    mortar:
      'Mortar වල Money, brandId වගේ value objects `final` fields වලින් immutable කරනවා. Immutable objects concurrent identity-resolution / prediction jobs වලදී safely share කරන්න පුළුවන් — lock ඕන නෑ.',
    keyPoints: [
      'final variable = assign-once (immutable reference).',
      'final method = no override; final class = no extend.',
      'Immutability → thread-safety + predictability.',
    ],
    pitfalls: [
      'final reference එකක් immutable වුනත්, ඒක point කරන object එකේ internal state වෙනස් වෙන්න පුළුවන් (final != deeply immutable).',
    ],
  },

  '1.3.4': {
    summary:
      'transient = serialization එකෙන් skip කරන field. volatile = threads අතර visibility guarantee කරන field.',
    sinhala: [
      {
        heading: 'transient',
        body: 'Object එකක් serialize (bytes වලට convert) කරනකොට `transient` field එක skip වෙනවා — sensitive/derived data save කරන්න ඕන නැති තැන් වලට. Deserialize කරනකොට transient field එකට default value එක (null/0) එනවා.',
      },
      {
        heading: 'volatile',
        body: '`volatile` field එකක් හැම read/write එකකම main memory එකට යනවා (thread-local cache නෑ). ඒ නිසා එක thread එකක් write කරපු value එක අනිත් threads වලට වහාම visible. Atomicity දෙන්නෙ නෑ — visibility විතරයි.',
      },
    ],
    analogy:
      'transient = form එකක "do not save" field එකක්. volatile = whiteboard එකක් වගේ — කවුරු ලිව්වත් හැමෝටම වහාම පේනවා (private notebook නෙවෙයි).',
    code: [
      {
        filename: 'Session.java',
        language: 'java',
        code: `class Session implements java.io.Serializable {
    private String userId;
    private transient String authToken; // NOT serialized (secret)
}

class SyncFlag {
    private volatile boolean running = false; // visible across threads

    void stop() { running = false; }          // seen immediately
    void loop() { while (running) { /* work */ } }
}`,
        note: 'authToken serialize වෙන්නෙ නෑ; running flag threads අතර visible.',
      },
    ],
    mortar:
      'Mortar session objects serialize කරනකොট auth tokens `transient` — cache/disk එකට secrets යන්නෙ නෑ. Long-running sync jobs නවත්තන්න `volatile boolean running` flag එකක් — background thread එකට stop signal එක වහාම පේනවා.',
    keyPoints: [
      'transient = serialization එකෙන් exclude (secrets/derived data).',
      'volatile = cross-thread visibility (atomicity නෙවෙයි).',
      'Compound actions (count++) වලට volatile මදි — Atomic/synchronized ඕන.',
    ],
  },

  '1.4.1': {
    summary:
      'Primitives (int, double, boolean...) = raw values on stack; Wrappers (Integer, Double...) = objects on heap.',
    sinhala: [
      {
        heading: 'වෙනස',
        body: 'Primitives 8ක් තියෙනවා (byte, short, int, long, float, double, char, boolean) — ඒවා fast, memory-light, null වෙන්න බෑ. Wrapper classes ඒවගේ object versions — null වෙන්න පුළුවන්, collections (`List<Integer>`) වල දාන්න පුළුවන්, utility methods තියෙනවා (`Integer.parseInt`). Nullability ඕන තැන් වලට wrappers.',
      },
    ],
    analogy:
      'Primitive = pocket එකේ තියෙන cash (ඉක්මන්, සරල). Wrapper = bank account එකක් (null වෙන්න පුළුවන්, features වැඩියි, ටිකක් overhead).',
    code: [
      {
        filename: 'Primitives.java',
        language: 'java',
        code: `int spendCount = 5;              // primitive: fast, cannot be null
Integer churnScore = null;      // wrapper: can represent "unknown"

// wrappers work in collections & generics
List<Integer> orderCounts = new ArrayList<>();
orderCounts.add(3);

// utility methods live on wrappers
int parsed = Integer.parseInt("42");`,
        note: 'churnScore = null වලින් "තවම calculate කරලා නෑ" කියන එක represent කරනවා.',
      },
    ],
    mortar:
      'Mortar customer analytics වල churnScore, predictedAge වගේ values තවම නොදන්න වෙන්න පුළුවන — එතන `Integer`/`Double` (nullable wrappers) පාවිච්චි කරනවා, `null` = "unknown". Internal counters වගේ hot-path values `int` (primitives) — fast + no GC pressure.',
    keyPoints: [
      'Primitives: fast, stack, non-null, 8 types.',
      'Wrappers: objects, nullable, collections/generics-friendly.',
      'Nullability/collections ඕන → wrapper; performance ඕන → primitive.',
    ],
  },

  '1.4.2': {
    summary:
      'Autoboxing = primitive → wrapper automatic conversion; Unboxing = wrapper → primitive. Compiler එකෙන් වෙනවා.',
    sinhala: [
      {
        heading: 'Automatic conversion',
        body: 'Compiler එක අවශ්‍ය තැන් වල primitive එකක් wrapper එකක් කරනවා (autoboxing: `Integer i = 5;`) සහ අනිත් පැත්තට (unboxing: `int x = i;`). Convenient වුනත්, hidden object creation (performance) සහ `null` unboxing (NPE) risks තියෙනවා.',
      },
    ],
    analogy:
      'Cash එකක් automatically bank account එකකට දාන එකයි, ආපහු withdraw කරන එකයි වගේ — background එකේ auto වෙනවා, ඒත් fees (overhead) තියෙනවා.',
    code: [
      {
        filename: 'Boxing.java',
        language: 'java',
        code: `Integer boxed = 10;       // autoboxing: int -> Integer
int unboxed = boxed;      // unboxing: Integer -> int

Map<String, Integer> counts = new HashMap<>();
counts.put("orders", counts.getOrDefault("orders", 0) + 1); // auto box/unbox

Integer score = null;
// int bad = score;       //  NPE! unboxing null`,
        note: 'null wrapper එකක් unbox කරනකොට NullPointerException.',
      },
    ],
    mortar:
      'Mortar aggregation code එකේ `Map<String,Integer>` counters වගේ තැන් වල autoboxing නිතරම වෙනවා. Millions of records process කරනකොට unnecessary boxing performance එකට බලපානවා — hot loops වල primitives තියාගන්නවා.',
    keyPoints: [
      'Autobox: primitive→wrapper; Unbox: wrapper→primitive (compiler auto).',
      'null wrapper unbox = NPE.',
      'Tight loops වල boxing avoid කරන්න (performance).',
    ],
    pitfalls: [
      '`Integer a = 1000, b = 1000; a == b` → false (== compares references; -128..127 cached only). `.equals()` use කරන්න.',
    ],
  },

  '1.4.3': {
    summary:
      'String = immutable; StringBuilder = mutable, fast, not thread-safe; StringBuffer = mutable, thread-safe (slower).',
    sinhala: [
      {
        heading: 'තුනේ තේරුම',
        body: '`String` immutable — modify කරනකොට හැම වෙලාවෙම අලුත් object එකක් හැදෙනවා. ඒ නිසා loop එකක concat කරනකොට කුණු ගොඩක් objects. `StringBuilder` mutable buffer එකක් — append fast, single-thread වලට හොඳම. `StringBuffer` එයාගෙම thread-safe version එක (methods synchronized, ටිකක් slow).',
      },
    ],
    analogy:
      'String = pen එකෙන් ලියලා වැරදුනොත් අලුත් කොළයක් ගන්නවා. StringBuilder = pencil එකක් — එකම කොළේ මකලා ලියනවා (efficient).',
    code: [
      {
        filename: 'Strings.java',
        language: 'java',
        code: `// BAD: creates a new String every loop iteration
String csv = "";
for (String email : emails) csv += email + ","; //  O(n^2)

// GOOD: one mutable buffer
StringBuilder sb = new StringBuilder();
for (String email : emails) sb.append(email).append(",");
String result = sb.toString();`,
        note: 'Large CSV builds වලට StringBuilder — 10-100x faster.',
      },
    ],
    mortar:
      'Mortar CSV export / audience file generation වලදී emails දහස් ගණන් concat වෙනවා. `String +=` වෙනුවට `StringBuilder` පාවිච්චි කරලා millions-of-rows exports streamed + fast කරනවා. Multi-threaded shared buffer එකක් නම් විතරක් StringBuffer.',
    keyPoints: [
      'String immutable — modify = new object.',
      'StringBuilder: mutable, fast, single-thread.',
      'StringBuffer: mutable, synchronized (thread-safe, slower).',
    ],
  },

  '1.4.4': {
    summary:
      'String Pool = JVM එකේ literals cache කරන special heap area එකක්. Interning එකෙන් duplicate strings share කරනවා.',
    sinhala: [
      {
        heading: 'Literals vs new',
        body: 'String literal (`"abc"`) එකක් String Pool එකේ තියෙනවා — එකම literal එක ආයෙ ආවොත් අලුත් object එකක් නෑ, pooled එකම reference එක. ඒත් `new String("abc")` හැමවිටම අලුත් heap object එකක් හදනවා (pool එකේ නෙවෙයි). `.intern()` වලින් string එකක් pool එකට දාන්න පුළුවන්.',
      },
    ],
    analogy:
      'Library එකේ එකම පොතේ copies ගොඩක් ගන්නෙ නැතුව, එකම copy එක හැමෝම share කරනවා වගේ — memory ඉතිරි වෙනවා.',
    code: [
      {
        filename: 'Interning.java',
        language: 'java',
        code: `String a = "shopify";
String b = "shopify";
System.out.println(a == b);          // true  (same pooled object)

String c = new String("shopify");
System.out.println(a == c);          // false (new heap object)
System.out.println(a == c.intern()); // true  (interned -> pool)
System.out.println(a.equals(c));     // true  (value comparison)`,
        note: 'Content compare කරන්න හැමවිටම .equals() — == නෙවෙයි.',
      },
    ],
    mortar:
      'Mortar millions of records වල country codes, source names ("shopify", "LK") වගේ repeated strings ගොඩක්. String pool/interning එකෙන් duplicate strings share කරලා memory footprint එක අඩු කරගන්න පුළුවන් — huge datasets වලට වැදගත්.',
    keyPoints: [
      'Literals pooled + shared; `new String()` always new object.',
      '`==` compares references; `.equals()` compares content.',
      '`.intern()` = manually pool a string.',
    ],
  },

  '1.4.5': {
    summary:
      'Java is always pass-by-value. Objects වලට pass වෙන්නේ reference එකේ copy එකක් — ඒ නිසා confusing.',
    sinhala: [
      {
        heading: 'Value copy, reference copy',
        body: 'Java හැමවිටම argument එකේ value එකක copy එකක් pass කරනවා. Primitive නම් value එකම copy වෙනවා — method එකේ වෙනස්කම් caller ට බලපාන්නෙ නෑ. Object නම් reference එකේ (address එකේ) copy එකක් pass වෙනවා — ඒ නිසා object එකේ internal state වෙනස් කරන්න පුළුවන් (දෙන්නම එකම object එකට point කරන නිසා), ඒත් reference එක reassign කලොත් caller ට බලපාන්නෙ නෑ.',
      },
    ],
    analogy:
      'Object එකේ address එකේ photocopy එකක් දෙනවා වගේ. Photocopy එකෙන් ගෙදර ඇතුලෙ (state) වෙනස් කරන්න පුළුවන්, ඒත් photocopy එකේ address එක වෙනස් කලාට original address එකට බලපෑමක් නෑ.',
    code: [
      {
        filename: 'PassByValue.java',
        language: 'java',
        code: `static void mutate(Customer c) { c.setEmail("new@x.com"); } // affects caller
static void reassign(Customer c) { c = new Customer("z@x.com"); } // does NOT

Customer cust = new Customer("a@x.com");
mutate(cust);
System.out.println(cust.getEmail()); // new@x.com (state changed)

reassign(cust);
System.out.println(cust.getEmail()); // new@x.com (reference copy reassigned)`,
        note: 'State change බලපානවා; reference reassign බලපාන්නෙ නෑ.',
      },
    ],
    mortar:
      'Mortar enrichment pipeline එකේ `Customer` object එකක් stages ගණනාවක් හරහා යනවා (name inference → geocode → validate). හැම stage එකක්ම එකම object එකේ state වෙනස් කරනවා (reference copy නිසා). මේ මූලික දේ තේරුම් නොගත්තොත් "ඇයි update එක නැති වුනේ?" වගේ bugs එනවා.',
    keyPoints: [
      'Java = always pass-by-value.',
      'Objects: reference එකේ copy → state mutate කරන්න පුළුවන්.',
      'Parameter reassign කලාට caller ට බලපාන්නෙ නෑ.',
    ],
    pitfalls: [
      '"Java objects pass-by-reference" කියන එක වැරදියි — reference-value pass-by-value කියන එක හරි.',
    ],
  },
};
