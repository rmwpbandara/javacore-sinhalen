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
      'Abstract class = "අඩක් හදපු" class එකක්. පොදු code එක ඇතුලේ තියාගෙන, වෙනස් වෙන කොටස් විතරක් subclasses වලට ලියන්න දෙනවා. කෙලින්ම `new` කරන්න බෑ.',
    sinhala: [
      {
        heading: 'කතාව: Mortar එකේ connectors problem එක',
        body: 'හිතන්න ඔයා Mortar team එකට අලුතෙන් join වුණා. ඔයාට වැඩේ — Shopify, WooCommerce, Klaviyo වගේ platforms වලින් customers sync කරන "connectors" හදන්න. පොඩ්ඩක් බලද්දී ඔයාට පේනවා — හැම connector එකක්ම එකම steps 3ක් කරනවා: (1) login/authenticate වෙනවා, (2) data sync කරනවා, (3) "done" කියලා notify කරනවා. වෙනස් වෙන්නේ මැද step එක (sync) විතරයි — Shopify sync කරන විදිහයි Klaviyo sync කරන විදිහයි වෙනස්. දැන් හැම connector එකකම මේ login + notify code එක copy-paste කරොත්? bug එකක් හදුනොත් තැන් 15කම fix කරන්න වෙනවා. එහෙම කරන්න එපා!',
      },
      {
        heading: 'විසඳුම: Abstract class එකක්',
        body: 'Tech lead කියනවා — "පොදු steps ටික එක තැනක තියන්න, වෙනස් වෙන step එක විතරක් හිස් තියන්න." ඒකට තමයි **abstract class**. `abstract` කියලා class එකක් හදනකොට: (1) ඒක කෙලින්ම `new` කරන්න බෑ — ("Connector" කෙනෙක් තනිකරම නෑ, Shopify connector, Klaviyo connector වගේ concrete අය තමයි ඉන්නේ). (2) ඒකට පොදු code තියෙන normal methods (concrete) තියෙන්න පුළුවන් — `login()`, `notify()`. (3) ඒකට body නැති `abstract` methods තියෙන්න පුළුවන් — `sync()` — ඒක subclass එක ලියන්නම ඕන. හැම subclass එකක්ම common code එක නොමිලේ උරුම කරගෙන, තමන්ගේ sync() එක විතරක් ලියනවා.',
      },
      {
        heading: 'මතක තියාගන්න rules 3ක්',
        body: '(1) Abstract class එකක් `new` කරන්න බෑ — subclass එකක් හරහා විතරයි use කරන්නේ. (2) Subclass එකක් abstract methods **ඔක්කොම** implement කරන්නම ඕන (නැත්නම් ඒ subclass එකත් abstract වෙන්න ඕන). (3) Abstract class එකට normal class එකක් වගේ fields (state), constructors, concrete methods තියෙන්න පුළුවන් — interface එකට වඩා මේක ලොකු වෙනසක්.',
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
        body: 'Inheritance: class එකකට abstract class **එකයි** extend කරන්න පුළුවන්; interfaces **කිහිපයක්** implement කරන්න පුළුවන්. State: abstract class එකට instance fields (`private double spend;` වගේ mutable state) තියෙන්න පුළුවන්; interface එකට constants (`public static final`) විතරයි. Constructors: abstract class එකට තියෙනවා (subclass එකෙන් `super(...)` call වෙනවා); interface එකට නෑ. Methods: abstract class එකට `private`/`protected`/`public` ඕන එකක්; interface members public (private helpers hidden). Relationship: abstract class = "IS-A" (identity — Dog IS-A Animal); interface = "CAN-DO" (capability — Dog CAN Swim).',
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
        body: '(1) Flexible — parts කීයක් හරි mix කරන්න පුළුවන් (single inheritance limit එකක් නෑ). (2) Loosely coupled — parts වෙනම, එකක් වෙනස් කලාට අනිත්වා safe. (3) Testable — test එකකදී real HttpClient එක වෙනුවට fake/mock එකක් inject කරන්න පුළුවන් (මේක Spring DI + DIP — 5.1.5 — වලට පදනම). (4) Runtime swap — configuration එකට අනුව වෙනස් part එකක් plug කරන්න පුළුවන්. **රීතිය: inheritance එක ඇත්තටම "IS-A" වෙනකොට විතරක්; ඉතුරු වෙලාවට composition.**',
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
