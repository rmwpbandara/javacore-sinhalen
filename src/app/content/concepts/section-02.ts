import { Concept } from '../../core/models/roadmap.model';

/**
 * Section 2 — Advanced Java Concepts.
 * Singlish explanations, tied to building the Mortar CDP.
 */
export const SECTION_02: Record<string, Concept> = {
  '2.1.1': {
    summary:
      'Checked exceptions = compiler එකෙන් **බලෙන්** handle කරන්න කියන ඒවා (`IOException` වගේ — recoverable external problems). Unchecked (`RuntimeException` subclasses) = compiler enforce කරන්නෙ නෑ (බොහෝවිට programming bugs).',
    sinhala: [
      {
        heading: 'කතාව: fail වෙන්න පුළුවන් දේවල් වර්ග දෙකක්',
        body: 'Mortar connector එකක් Shopify API එක call කරනවා. මේක fail වෙන්න පුළුවන් ක්‍රම දෙකක් තියෙනවා. (1) network එක වැටිලා — මේක ඔයාගේ වැරැද්දක් නෙවෙයි, expect කරන්න පුළුවන් දෙයක්, retry කරන්න පුළුවන් (recoverable). (2) ඔයාම code එකේ null එකක් access කරලා — මේක bug එකක්, fix කරන්නම ඕන. Java මේ දෙකට වර්ග දෙකක් දෙනවා: checked (external, recoverable) සහ unchecked (bugs). Compiler එක දෙකට වෙනස් විදිහට behave කරනවා.',
      },
      {
        heading: 'දෙකේ වෙනස',
        body: 'මූලික වෙනස්කම්:',
        points: [
          'Checked (`IOException`, `SQLException`): compiler **බලෙන්** handle කරන්න කියනවා — `try-catch` හෝ `throws` කරන්නම ඕන. සාමාන්‍යයෙන් recoverable, external (network, file, DB).',
          'Unchecked (`RuntimeException` subclasses — `NullPointerException`, `IllegalArgumentException`, `ArrayIndexOutOfBounds`): compiler enforce කරන්නෙ නෑ. බොහෝවිට programming bugs.',
          'Checked = `Exception` extend කරනවා (RuntimeException නෙවෙයි); Unchecked = `RuntimeException` extend කරනවා.',
          'Error (`OutOfMemoryError`) කියන තුන්වෙනි වර්ගයකුත් තියෙනවා — JVM-level, catch කරන්න යන්නෙ නෑ.',
        ],
      },
      {
        heading: 'කවදා මොකක්ද throw කරන්නේ',
        body: 'Caller කෙනෙක්ට ඇත්තටම recover වෙන්න පුළුවන් නම් (retry, fallback) → checked. Programming error එකක්, caller ට කරන්න දෙයක් නෑ නම් → unchecked. Modern design එකේ unchecked exceptions වඩාත් common (checked exceptions code එක noisy කරනවා). ඒත් overuse දෙකම නරකයි.',
      },
    ],
    analogy:
      'Checked = "හෙට වැස්සක් එයි, කුඩේ අරන් යන්න" කියලා කලින් warn කරන දෙයක් (ඔයා සූදානම් වෙන්නම ඕන). Unchecked = හදිසියේ පය පැටලිලා වැටෙන එක — කලින් declare කරන්නෙ නෑ, ඒක නොවෙන්න පරෙස්සම් වෙන්නම ඕන (bug එකක්).',
    code: [
      {
        filename: 'CheckedException.java',
        language: 'java',
        code: `// CHECKED: network fail වෙන්න පුළුවන් -> compiler handle කරන්න බල කරනවා
List<Customer> fetch(String url) throws IOException {   // 'throws' declare කරන්නම ඕන
    return httpClient.get(url);      // recoverable — retry කරන්න පුළුවන්
}

// caller එකට handle කරන්නම ඕන (නැත්නම් compile error):
try {
    fetch("https://shopify...");
} catch (IOException e) {
    log.warn("network fail — retry කරමු", e);
}`,
        note: 'Checked exception = try-catch හෝ throws — නැත්නම් compile error.',
      },
      {
        filename: 'UncheckedException.java',
        language: 'java',
        code: `// UNCHECKED: programming error -> compiler enforce කරන්නෙ නෑ
double average(int total, int count) {
    if (count == 0) {
        throw new IllegalArgumentException("count 0 වෙන්න බෑ");  // RuntimeException
    }
    return (double) total / count;
}
// caller try-catch කරන්නම ඕන නෑ — මේක bug එකක්, fix කරන්න ඕන දෙයක්`,
        note: 'Unchecked = declare/catch කරන්න බල කරන්නෙ නෑ (බොහෝවිට bug).',
      },
    ],
    mortar:
      'Mortar connector එකක් Shopify API call කරද්දී network fail → `IOException` (checked) — retry logic එකකින් handle කරනවා. Internal config එකක් වැරදි නම් (batch size negative) → `IllegalArgumentException` (unchecked) — ඒක bug එකක්, fix කරන්නම ඕන. External/recoverable failures checked; internal/programming errors unchecked කියන distinction එකෙන් error handling clean + intentional වෙනවා.',
    keyPoints: [
      'Checked = compiler enforced (try-catch/throws), recoverable external issues.',
      'Unchecked = `RuntimeException`, enforce කරන්නෙ නෑ, බොහෝවිට bugs.',
      'Checked = `Exception` extend; Unchecked = `RuntimeException` extend.',
      'Recoverable → checked; programming error → unchecked.',
    ],
    pitfalls: [
      'Checked exceptions overuse කරොත් code එක `try-catch` වලින් noisy + unreadable — balance කරන්න.',
      'Exception එකක් catch කරලා නිකම් ignore කරන එක (empty catch block) අනතුරුදායක — අඩුම තරමේ log කරන්න.',
    ],
  },

  '2.1.2': {
    summary:
      '`try` = risky code; `catch` = exception එකක් ආවොත් handle; `finally` = exception ආවත් නැතත් **හැමවිටම** run වෙනවා (cleanup වලට). Multiple catch blocks specific → general order එකෙන්.',
    sinhala: [
      {
        heading: 'කතාව: connection එක close වෙන්නෙ නැති වුනොත්?',
        body: 'Mortar sync job එකක් DB connection එකක් open කරලා data sync කරනවා. Sync එකේදී exception එකක් ආවොත් — connection එක close වෙන්නෙ නැතුව යනවා (connection leak)! Leaks එකතු වෙලා system එක crash. ඕන වෙන්නේ — exception එකක් ආවත් නැතත් "අන්තිමට connection එක close කරන්නම ඕන" කියන guarantee එකක්. ඒකට තමයි `finally` block එක — try එකේ මොනවා වුනත් finally හැමවිටම run වෙනවා.',
      },
      {
        heading: 'තුනේ role',
        body: 'try-catch-finally කොටස් තුනේ වැඩ:',
        points: [
          '`try` — fail වෙන්න පුළුවන් risky code එක මෙතන දානවා.',
          '`catch` — try එකේ exception එකක් ආවොත්, matching catch block එකට pipe වෙනවා (handle කරනවා). Specific → general order.',
          '`finally` — try/catch එකේ මොනවා වුනත් (exception, return, කිසිවක් නැති) **හැමවිටම** run වෙනවා — cleanup (close, release) වලට.',
          'Flow: try success → finally; try exception → matching catch → finally; catch නැත්නම් → finally → exception propagate.',
        ],
      },
      {
        heading: 'catch order එක වැදගත්',
        body: 'Catch blocks කිහිපයක් තියෙනකොට, **specific exceptions මුලින්, general (parent) පස්සේ** ලියන්නම ඕන. `Exception` (general) මුලින් දැම්මොත් — ඊට පස්සේ specific catch එකකට කවදාවත් යන්නෙ නෑ (compile error). Java 7+ එකේ `catch (IOException | SQLException e)` වගේ multi-catch එකකුත් තියෙනවා.',
      },
    ],
    analogy:
      'Kitchen එකේ උයනවා වගේ: `try` = උයනවා, `catch` = පිච්චුනොත් handle කරනවා (water දානවා), `finally` = කෑම හරි ගියත් පිච්චුනත් අන්තිමට gas එක off කරනවා + kitchen එක clean කරනවා (හැමවිටම).',
    code: [
      {
        filename: 'TryCatchFinally.java',
        language: 'java',
        code: `Connection conn = null;
try {
    conn = pool.getConnection();      // risky
    conn.sync();                      // risky — exception එකක් එන්න පුළුවන්
} catch (IOException e) {             // specific එක මුලින්
    log.error("sync fail", e);
} catch (Exception e) {              // general එක පස්සේ
    log.error("unexpected", e);
} finally {
    if (conn != null) conn.close();  // හැමවිටම run -> connection leak නෑ
}`,
        note: 'finally = guaranteed cleanup — exception ආවත් නැතත්.',
      },
      {
        filename: 'FinallyAlwaysRuns.java',
        language: 'java',
        code: `static int demo() {
    try {
        return 1;             // return කරන්න යනවා...
    } finally {
        System.out.println("finally run වෙනවා");  // ...ඒත් finally මුලින් run!
    }
}
// output: "finally run වෙනවා", ඊට පස්සේ 1 return වෙනවා`,
        note: 'return එකකට කලිනුත් finally run වෙනවා.',
      },
      {
        filename: 'MultiCatch.java',
        language: 'java',
        code: `try {
    process();
} catch (IOException | SQLException e) {   // Java 7+ multi-catch
    log.error("I/O හෝ DB error", e);       // දෙකටම එකම handling
}`,
        note: 'Multi-catch — එකම handling ඕන exceptions කිහිපයකට.',
      },
    ],
    mortar:
      'Mortar sync/enrichment jobs DB connections, HTTP streams, file handles open කරනවා. `finally` (හෝ try-with-resources — 2.1.5) වලින් ඒවා හැමවිටම close වෙනවා — millions of records process කරද්දී exception එකක් ආවත් connection/stream leaks නෑ, system එක stable. Specific catch blocks (IOException vs generic) වලින් network fails retry කරලා, unexpected errors alert කරනවා (10.4).',
    keyPoints: [
      'try = risky code; catch = handle; finally = හැමවිටම run (cleanup).',
      'catch blocks specific → general order (parent last).',
      'finally return/exception ආවත් run වෙනවා — guaranteed cleanup.',
      'Java 7+ multi-catch: `catch (A | B e)`.',
    ],
    pitfalls: [
      '`finally` block එකේ `return` දැම්මොත් try එකේ return/exception එක silently override වෙනවා — finally එකේ return එපා.',
      'Empty catch block (exception එක ignore) = silent failures. අඩුම තරමේ log කරන්න.',
    ],
  },

  '2.1.3': {
    summary:
      '`throw` = exception object එකක් **ඇත්තටම විසි කරනවා** (statement). `throws` = method එකකින් checked exceptions එන්න පුළුවන් කියලා **declare කරනවා** (method signature clause). වචන දෙකක්, තේරුම් දෙකක්.',
    sinhala: [
      {
        heading: 'කතාව: නමින් සමානයි, වැඩෙන් වෙනස්',
        body: '`throw` සහ `throws` — අකුරු එකයි වගේ ("s" එකයි වෙනස), ඒත් සම්පූර්ණයෙන් වෙනස් දේවල්. බොහෝ beginners මේ දෙක confuse කරනවා. සරලවම: `throw` කියන්නේ **ක්‍රියාවක්** (verb) — exception එකක් දැන් විසි කරනවා. `throws` කියන්නේ **declaration** එකක් — "මේ method එකෙන් මේ exceptions එන්න පුළුවන්, පරෙස්සම් වෙන්න" කියලා caller ට කලින් කියනවා.',
      },
      {
        heading: 'දෙකේ වෙනස',
        body: 'පැහැදිලිවම:',
        points: [
          '`throw` — statement එකක්, method body එක ඇතුලේ. `throw new NotFoundException(id);` — දැන් exception එක raise කරනවා.',
          '`throws` — method signature එකේ clause එකක්. `... load(String id) throws NotFoundException` — "මේකෙන් මේ exception එක එන්න පුළුවන්" declare කරනවා.',
          '`throw` එකකින් object එකක් විතරයි විසි කරන්නේ; `throws` එකකින් exception types කිහිපයක් declare කරන්න පුළුවන් (comma-separated).',
          'Checked exception එකක් `throw` කරනවා නම්, method එක ඒක `throws` කරන්නම ඕන (හෝ ඇතුලේම catch කරන්න).',
        ],
      },
    ],
    analogy:
      '`throws` = පාරේ "ගල් වැටෙන්න පුළුවන්" කියන warning board එක (කලින් දැනුම් දීම). `throw` = ඇත්තටම ගලක් වැටෙන එක (සිද්ධිය). Board එක තියෙන්නේ ඇත්තටම ගල් වැටෙන්න පුළුවන් නිසා.',
    code: [
      {
        filename: 'ThrowVsThrows.java',
        language: 'java',
        code: `// 'throws' -> declaration (signature clause): "මේ exceptions එන්න පුළුවන්"
Customer load(String id) throws NotFoundException {
    Customer c = repo.find(id);
    if (c == null) {
        throw new NotFoundException(id);   // 'throw' -> ක්‍රියාව: දැන් raise කරනවා
    }
    return c;
}`,
        note: 'throws = declare (signature); throw = raise (statement).',
      },
      {
        filename: 'CallerMustHandle.java',
        language: 'java',
        code: `// 'throws' නිසා caller දන්නවා මේක handle කරන්න ඕන කියලා
void showCustomer(String id) {
    try {
        Customer c = load(id);         // throws NotFoundException
        System.out.println(c.getEmail());
    } catch (NotFoundException e) {
        System.out.println("Customer නෑ: " + id);
    }
}`,
        note: 'throws clause එකෙන් caller ට contract එක පැහැදිලියි.',
      },
    ],
    mortar:
      'Mortar repository method එකක් `throws NotFoundException` declare කරලා, customer නැත්නම් `throw new NotFoundException(id)` කරනවා. `throws` clause එකෙන් API contract එක පැහැදිලියි — caller දන්නවා මේක handle කරන්නම ඕන කියලා (compile-time enforced). Controller layer එකේ මේක catch කරලා 404 response එකක් දෙනවා (7.2.5).',
    keyPoints: [
      '`throw` = exception object එකක් raise කරනවා (statement).',
      '`throws` = possible checked exceptions declare කරනවා (signature).',
      'Checked exception `throw` කරනවා නම් method එක `throws` කරන්නම ඕන.',
      'One method `throws` many; each `throw` raises one.',
    ],
    pitfalls: [
      '`throw` සහ `throws` confuse කරන එක common beginner mistake — throw=verb, throws=declaration.',
      '`throw null;` කරන්න එපා — NullPointerException එකක් එනවා (exception object එකක්ම throw කරන්න).',
    ],
  },

  '2.1.4': {
    summary:
      'Custom exceptions = generic `Exception` වෙනුවට domain-specific error classes හදන එක (`ConnectorAuthException` වගේ). Code readable, error handling precise, extra context (fields) carry කරන්න පුළුවන්.',
    sinhala: [
      {
        heading: 'කතාව: "Exception: something went wrong" ප්‍රමාණවත් නෑ',
        body: 'Mortar connector එකක් fail වුනාම generic `throw new Exception("error")` දැම්මොත් — logs එකේ "error" කියලා විතරයි පේන්නේ. කුමන brand එකද, කුමන platform එකද, ඇයි fail වුනේද? කිසිවක් නෑ. Debugging අමාරුයි, specific handling කරන්නත් බෑ. ඕන වෙන්නේ — problem එක exactly represent කරන, extra context carry කරන, තමන්ගේම exception type එකක්. ඒකට තමයි custom exceptions.',
      },
      {
        heading: 'කොහොමද හදන්නේ + ඇයි',
        body: 'Custom exception එකක් හදන විදිහ සහ වාසි:',
        points: [
          '`Exception` extend කරොත් → checked (caller handle කරන්නම ඕන). `RuntimeException` extend කරොත් → unchecked.',
          'Extra fields දාන්න පුළුවන් (platform, brandId, retryable flag) — error එකට context carry කරන්න.',
          'Readable code: `catch (ConnectorAuthException e)` කියන එක `catch (Exception e)` වලට වඩා පැහැදිලියි.',
          'Precise handling: වෙන වෙන custom exceptions වලට වෙන වෙන handling (auth error → re-auth; quota error → wait).',
        ],
      },
    ],
    analogy:
      'Doctor කෙනෙක් "ඔයා ලෙඩයි" කියනවා වෙනුවට "ඔයාට Type-2 diabetes, sugar 180" කියනවා වගේ — specific diagnosis එකෙන් හරි treatment එක දෙන්න පුළුවන්. Generic Exception = "something wrong"; custom exception = exact problem + context.',
    code: [
      {
        filename: 'ConnectorAuthException.java',
        language: 'java',
        code: `// custom unchecked exception — extra context එක්ක
public class ConnectorAuthException extends RuntimeException {
    private final String platform;      // extra context
    private final String brandId;

    public ConnectorAuthException(String platform, String brandId, String msg) {
        super(msg);                     // parent (message) constructor
        this.platform = platform;
        this.brandId = brandId;
    }

    public String getPlatform() { return platform; }
    public String getBrandId()  { return brandId; }
}`,
        note: 'Extra fields (platform, brandId) error context carry කරනවා.',
      },
      {
        filename: 'UsingCustomException.java',
        language: 'java',
        code: `void authenticate(String platform, String brandId) {
    if (tokenExpired()) {
        // rich, actionable error
        throw new ConnectorAuthException(platform, brandId, "OAuth token expired");
    }
}

// precise handling
try {
    authenticate("shopify", "brand-42");
} catch (ConnectorAuthException e) {
    log.error("Auth fail: {} / {}", e.getPlatform(), e.getBrandId());
    reAuthenticate(e.getPlatform(), e.getBrandId());   // specific recovery
}`,
        note: 'Custom exception → precise handling + rich logs.',
      },
    ],
    mortar:
      'Mortar එකේ `ConnectorAuthException`, `IdentityResolutionException`, `SyncQuotaExceededException` වගේ custom exceptions — proactive error alerts (PROJECT_IDEA 10.4) වලට precise, actionable messages ("brand-42, Shopify, token expired") දෙනවා. Extra context fields නිසා support team එකට exactly මොකද වුනේ කියලා පේනවා, auto-recovery logic (re-auth, back-off) trigger කරන්නත් පුළුවන්.',
    keyPoints: [
      'Domain-specific exception classes = readable + precise handling.',
      '`Exception` extend → checked; `RuntimeException` extend → unchecked.',
      'Extra fields වලින් error context (platform, brandId) carry කරන්න.',
      'Constructor එකේ `super(message)` (+ optionally `super(message, cause)`) call කරන්න.',
    ],
    pitfalls: [
      'Custom exception එකක cause (original exception) එක `super(msg, cause)` වලින් pass කරන්න අමතක කරන්න එපා — නැත්නම් root-cause stack trace නැති වෙනවා.',
      'Exception classes ගොඩක් අනවශ්‍යව හදන්න එපා — meaningful, distinct error categories වලට විතරයි.',
    ],
  },

  '2.1.5': {
    summary:
      'Try-with-resources (Java 7+) = `try (Resource r = ...)` syntax එකෙන් `AutoCloseable` resources **automatic close** කරනවා — block එක ඉවර වුනාම (exception ආවත්). finally boilerplate නැති කරලා resource leaks වළක්වනවා.',
    sinhala: [
      {
        heading: 'කතාව: finally boilerplate එකෙන් මිදෙමු',
        body: '2.1.2 එකේ අපි දැක්කා finally එකෙන් connection close කරන එක. ඒත් resources කිහිපයක් (file + connection + stream) තියෙනකොට finally block එක null-checks වලින් පිරිලා, ugly + error-prone වෙනවා. Java 7 මේකට ලස්සන විසඳුමක් දුන්නා — `try (...)` ඇතුලේ resource එක declare කරොත්, block එක ඉවර වෙනකොට Java **automatic close කරනවා**. finally ලියන්නම ඕන නෑ.',
      },
      {
        heading: 'කොහොමද වැඩ කරන්නේ',
        body: 'Try-with-resources rules:',
        points: [
          'Resource එක `AutoCloseable` (හෝ `Closeable`) implement කරන්නම ඕන — `close()` method එකක් තියෙන්නම ඕන.',
          '`try (Resource r = new Resource())` — resource එක parentheses ඇතුලේ declare කරනවා.',
          'Block එක ඉවර වෙනකොට (success හෝ exception) Java automatic `r.close()` call කරනවා.',
          'Resources කිහිපයක් — semicolon වලින් වෙන් කරලා; close වෙන්නේ **reverse order** එකෙන් (declare කරපු ඇණවුමට විරුද්ධව).',
        ],
      },
    ],
    analogy:
      'Sensor-tap එකක් වගේ — අත ගත්තම වතුර automatic නවතිනවා (manually off කරන්න ඕන නෑ). Try-with-resources = block එකෙන් අත ගත්තම resource එක automatic close. Manual finally = පරණ tap එක (off කරන්න අමතක වුනොත් වතුර නාස්තියි = leak).',
    code: [
      {
        filename: 'TryWithResources.java',
        language: 'java',
        code: `// stream එක automatic close වෙනවා — exception ආවත්
try (var reader = Files.newBufferedReader(uploadPath)) {
    reader.lines().forEach(this::processRow);
} catch (IOException e) {
    log.error("upload read fail", e);
}
// finally { reader.close(); } ලියන්න ඕන නෑ — auto close!`,
        note: 'AutoCloseable resource block ඉවර වුනාම automatic close.',
      },
      {
        filename: 'MultipleResources.java',
        language: 'java',
        code: `// resources කිහිපයක් — reverse order එකෙන් close වෙනවා
try (Connection conn = pool.getConnection();
     PreparedStatement stmt = conn.prepareStatement(sql);
     ResultSet rs = stmt.executeQuery()) {

    while (rs.next()) process(rs);

}   // close order: rs -> stmt -> conn (reverse of declaration)
// exception ආවත් තුනම safely close වෙනවා`,
        note: 'Multiple resources — reverse order එකෙන් auto close.',
      },
      {
        filename: 'CustomAutoCloseable.java',
        language: 'java',
        code: `// ඔයාගේම class එකකුත් AutoCloseable කරන්න පුළුවන්
class SyncSession implements AutoCloseable {
    SyncSession() { System.out.println("session open"); }

    @Override
    public void close() {                 // block ඉවර වෙනකොට auto call
        System.out.println("session close (auto)");
    }
}

try (SyncSession s = new SyncSession()) {
    // work...
}   // -> "session close (auto)" automatic`,
        note: 'AutoCloseable implement කරලා ඕන class එකක් try-with-resources වලට දාන්න පුළුවන්.',
      },
    ],
    mortar:
      'Mortar CSV upload pipeline එකේ file streams, DB connections, Kafka producers try-with-resources වලින් open කරනවා. Huge files / millions of rows process කරද්දී error එකක් ආවත් streams/connections leak වෙන්නෙ නෑ — data lake ingestion (PROJECT_IDEA 1.3) stable, resource-safe. finally boilerplate නැති නිසා code එකත් clean.',
    keyPoints: [
      'Resource `AutoCloseable` (`close()` method) වෙන්නම ඕන.',
      '`try (r = ...)` — block exit වෙනකොට auto `close()` (exception ආවත්).',
      'Resources කිහිපයක් reverse order එකෙන් close වෙනවා.',
      'finally boilerplate නැති කරලා resource leaks වළක්වනවා.',
    ],
    pitfalls: [
      'Resource එක try-parentheses ඇතුලේ declare කරන්නම ඕන — පිටත declare කරලා try එකට දැම්මොත් auto-close වෙන්නෙ නෑ.',
      'AutoCloseable නැති දෙයක් (plain object) try-with-resources වලට දාන්න බෑ — compile error.',
    ],
  },

  '2.2.1': {
    summary:
      'Collections Framework = data groups තියාගන්න standard interfaces + classes set එකක්. Root එක `Iterable` → `Collection` → (`List`, `Set`, `Queue`). `Map` (key→value) වෙනම tree එකක්.',
    sinhala: [
      {
        heading: 'කතාව: arrays මදි වෙන තැන',
        body: 'Mortar එකට customers ලැයිස්තුවක් තියාගන්න ඕන. Array එකක් (`Customer[]`) use කරන්න පුළුවන් — ඒත් array එකේ size fixed! Customers කී දෙනෙක් එයිද කලින් දන්නෙ නෑ. තව, duplicates ඉවත් කරන්න, key එකකින් හොයන්න, sort කරන්න array එකෙන් අමාරුයි. මේ හැම දේටම Java Collections Framework එක ready-made, powerful data structures දෙනවා — ඕන එකට ගැලපෙන එක තෝරගන්න විතරයි.',
      },
      {
        heading: 'ප්‍රධාන interfaces',
        body: 'හරි එක තෝරගන්න මේ interfaces තේරුම්ගන්න:',
        points: [
          '`List` — ordered, duplicates OK, index එකකින් access (order matters — orders ලැයිස්තුවක් වගේ).',
          '`Set` — unique elements විතරයි, duplicates automatic ඉවත් (unique emails වගේ).',
          '`Queue` — FIFO / priority processing (jobs පිළිවෙළට process කරන්න).',
          '`Map` — key→value pairs (email → customer වගේ lookup). Collection extend කරන්නෙ නෑ — වෙනම hierarchy.',
        ],
      },
      {
        heading: 'Interface එකට program කරන්න',
        body: 'රීතිය: variable type එක interface එකෙන් declare කරන්න (`List<X> list = new ArrayList<>()`), concrete class එකෙන් නෙවෙයි. ඒ නිසා පස්සේ implementation එක swap කරන්න පුළුවන් (ArrayList → LinkedList) code එක වෙනස් නොකර. `Iterable` root එක නිසා ඔක්කොම for-each loop support කරනවා.',
      },
    ],
    analogy:
      '`List` = numbered cinema seats (order + duplicates OK — seat 5 දෙපාරක් නෑ, ඒත් තැන් තියෙනවා). `Set` = guest list (කවුරුත් එක පාරයි). `Queue` = bank queue (මුලින් ආපු කෙනා මුලින්). `Map` = dictionary (word → meaning).',
    code: [
      {
        filename: 'CollectionTypes.java',
        language: 'java',
        code: `// requirement එකට ගැලපෙන interface එක තෝරන්න
List<String>  orderIds    = new ArrayList<>();   // ordered, duplicates OK
Set<String>   uniqueEmails = new HashSet<>();     // duplicates automatic ඉවත්
Queue<Runnable> jobs      = new LinkedList<>();   // FIFO processing
Map<String, Customer> byEmail = new HashMap<>();  // key -> value lookup

uniqueEmails.add("a@x.com");
uniqueEmails.add("a@x.com");    // දෙවෙනි එක ignore — Set unique
System.out.println(uniqueEmails.size());  // 1`,
        note: 'Requirement (order? unique? lookup?) එකට ගැලපෙන interface එක තෝරන්න.',
      },
      {
        filename: 'ProgramToInterface.java',
        language: 'java',
        code: `// GOOD: interface type එකෙන් declare -> implementation swap කරන්න පුළුවන්
List<Customer> customers = new ArrayList<>();
// පස්සේ: List<Customer> customers = new LinkedList<>();  // code වෙනස් වෙන්නෙ නෑ

// for-each — ඔක්කොම Iterable නිසා වැඩ කරනවා
for (Customer c : customers) {
    process(c);
}`,
        note: 'Interface එකට program කරන්න — flexible + swappable.',
      },
    ],
    mortar:
      'Mortar: order ids `List`, dedup emails `Set` (identity resolution), sync jobs `Queue`, email→customer index `Map`. හරි collection interface එක තෝරගැනීම millions of records වලදී memory + speed + correctness තුනටම බලපානවා. Interface එකට program කරන නිසා, profiling වලින් හම්බවෙන bottleneck එකකදී implementation එක swap කරන්න පුළුවන් (ArrayList → different) code එක නොකඩා.',
    keyPoints: [
      'Iterable → Collection → List/Set/Queue; Map වෙනම hierarchy.',
      'List = ordered+duplicates; Set = unique; Queue = FIFO; Map = key→value.',
      'Interface type එකෙන් declare කරන්න (swappable implementations).',
      'ඔක්කොම Iterable → for-each support.',
    ],
    pitfalls: [
      'Concrete class type එකෙන් declare කරන එක (`ArrayList<X> x = ...`) — implementation එකට lock වෙනවා. Interface type use කරන්න.',
      '`Map` එක `Collection` නෙවෙයි — `.add()` නෑ, `.put(key, value)`.',
    ],
  },

  '2.2.2': {
    summary:
      'List implementations: `ArrayList` (dynamic array, random access fast — default), `LinkedList` (ends insert/remove fast), `Vector` (legacy synchronized), `CopyOnWriteArrayList` (read-heavy concurrent).',
    sinhala: [
      {
        heading: 'කතාව: ArrayList ද LinkedList ද?',
        body: 'Mortar customer grid එකට page එකක customers තියාගන්න List එකක් ඕන. `ArrayList` ද `LinkedList` ද? බොහෝ අය අහන ප්‍රශ්නෙ. උත්තරේ — access pattern එකට depend. ArrayList යටින් array එකක් — index එකකින් access O(1) (super fast), ඒත් මැදට insert කරනකොට elements shift කරන්න ඕන O(n). LinkedList යටින් nodes chain එකක් — ends වලට add/remove O(1), ඒත් index access O(n) (nodes එකින් එක යන්න ඕන).',
      },
      {
        heading: 'හතරේ character',
        body: 'List implementations 4:',
        points: [
          '`ArrayList` — dynamic array. `get(i)` O(1) fast; middle insert/remove O(n). **Default choice** (95% cases).',
          '`LinkedList` — doubly-linked nodes. ends add/remove O(1); `get(i)` O(n). Queue/Deque වලට හොඳයි.',
          '`Vector` — ArrayList වගේ ඒත් සියලු methods synchronized (legacy, slow). අලුතෙන් use කරන්න එපා.',
          '`CopyOnWriteArrayList` — write එකකදී array එක copy කරනවා. many-reads/rare-writes concurrent scenarios වලට (thread-safe).',
        ],
      },
    ],
    analogy:
      '`ArrayList` = numbered seats cinema එකක් — seat 50ට කෙලින්ම යන්න පුළුවන් (fast index), ඒත් මැදට කෙනෙක් squeeze කරන්න ඉතුරු ඔක්කොම shift වෙන්න ඕන. `LinkedList` = train එකක bogies — bogey එකක් add/remove ලේසි (ends), ඒත් bogey 50ට යන්න එකින් එක ඇවිදින්න ඕන.',
    code: [
      {
        filename: 'Lists.java',
        language: 'java',
        code: `// ArrayList — random access fast (default choice)
List<Customer> page = new ArrayList<>();
Customer c = page.get(5);                 // O(1) — super fast

// LinkedList — ends add/remove fast (queue/deque වගේ)
Deque<Job> pipeline = new LinkedList<>();
pipeline.addFirst(new Job());             // O(1)
pipeline.removeLast();                    // O(1)`,
        note: 'Access pattern එකට implementation එක තෝරන්න — index? → ArrayList; ends? → LinkedList.',
      },
      {
        filename: 'ConcurrentList.java',
        language: 'java',
        code: `// read-heavy, rare writes, multiple threads -> CopyOnWriteArrayList
List<String> activeConnectors = new CopyOnWriteArrayList<>();

// reader threads ගොඩක් safe (lock නෑ); write කලාම array copy වෙනවා
activeConnectors.add("shopify");    // rare write (copies internally)
for (String c : activeConnectors) { // many concurrent reads — safe
    ping(c);
}`,
        note: 'Read-heavy concurrent config → CopyOnWriteArrayList; Vector avoid.',
      },
    ],
    mortar:
      'Mortar customer grid pagination → `ArrayList` (index access, iteration). Sync job pipeline → `LinkedList`/`ArrayDeque` (queue operations). Rarely-changing shared "active connectors" list, reader threads ගොඩක් → `CopyOnWriteArrayList`. Millions of rows වලදී ArrayList එකේ initial capacity set කිරීම (resizing අඩු කරන්න) performance tuning එකක්. Vector legacy — අලුතෙන් නෑ.',
    keyPoints: [
      'ArrayList = fast random access, default choice.',
      'LinkedList = fast ends add/remove, slow index access.',
      'CopyOnWriteArrayList = read-heavy concurrent; Vector = legacy (avoid).',
      'Access pattern (index vs ends) අනුව තෝරන්න.',
    ],
    pitfalls: [
      'LinkedList එකේ `get(i)` loop එකක use කරන එක O(n²) — random access ඕන නම් ArrayList.',
      'ArrayList එකට වැඩ ගොඩක් add කරනකොට internal resizing වෙනවා — size දන්නවා නම් `new ArrayList<>(capacity)`.',
    ],
  },

  '2.2.3': {
    summary:
      'Set implementations: `HashSet` (fast, unordered), `LinkedHashSet` (insertion order), `TreeSet` (sorted). Sorting එකට elements `Comparable` (natural order) වෙන්න ඕන, නැත්නම් `Comparator` (custom) දෙන්න ඕන.',
    sinhala: [
      {
        heading: 'කතාව: duplicate emails ඉවත් කරන්න',
        body: 'Mortar identity resolution එකේ දැනටමත් දැකපු emails track කරලා duplicates ඉවත් කරන්න ඕන. `Set` එකක් perfect — duplicates automatic reject. ඒත් Set implementation 3ක් තියෙනවා, order behaviour එක වෙනස්. HashSet fast ඒත් order නෑ; insertion order ඕන නම් LinkedHashSet; sorted ඕන නම් TreeSet.',
      },
      {
        heading: 'තුනේ වෙනස',
        body: 'Set implementations 3:',
        points: [
          '`HashSet` — hashing මත. `add`/`contains` O(1) average, **fastest**. Order **නෑ** (කිසි guarantee එකක් නෑ).',
          '`LinkedHashSet` — HashSet + insertion order තියාගන්නවා. ටිකක් slow, ඒත් predictable order.',
          '`TreeSet` — red-black tree, elements **sorted**. O(log n). natural order හෝ Comparator එකට අනුව.',
          'HashSet/TreeSet එකේ elements හරි `equals`/`hashCode` (HashSet) හෝ `compareTo`/Comparator (TreeSet) ඕන.',
        ],
      },
      {
        heading: 'Comparable vs Comparator',
        body: 'Sorting කරන්න order එකක් ඕන. `Comparable` — class එකේම `compareTo()` (natural/default order — "මම මාවම compare කරන හැටි"). `Comparator` — වෙනම object එකක් (custom order — "මේ විදිහට compare කරන්න"). Comparator එකකින් එකම data වෙන වෙන විදිහට sort කරන්න පුළුවන් (spend අනුව, name අනුව...).',
      },
    ],
    analogy:
      '`HashSet` = බෑග් එකකට දාපු unique බඩු (order නෑ, ඉක්මනට හොයන්න පුළුවන්). `LinkedHashSet` = දාපු පිළිවෙළට තියෙන unique බඩු. `TreeSet` = alphabetical order එකට තියපු පොත් රාක්කයක් (හැමවිටම sorted).',
    code: [
      {
        filename: 'Sets.java',
        language: 'java',
        code: `Set<String> seen = new HashSet<>();          // fast dedup, no order
seen.add("a@x.com");
seen.add("a@x.com");                          // ignore (duplicate)
System.out.println(seen.size());             // 1

Set<String> ordered = new LinkedHashSet<>(); // insertion order තියාගන්නවා
ordered.add("shopify"); ordered.add("klaviyo");
// iterate -> shopify, klaviyo (දාපු පිළිවෙළට)`,
        note: 'HashSet = fast dedup; LinkedHashSet = order preserved.',
      },
      {
        filename: 'TreeSetSorted.java',
        language: 'java',
        code: `// TreeSet — Comparator එකකින් top spenders මුලින්
Set<Customer> topSpenders = new TreeSet<>(
    Comparator.comparingDouble(Customer::getTotalSpend).reversed()
);
topSpenders.add(new Customer("a@x.com", 500));
topSpenders.add(new Customer("b@x.com", 1200));
// iterate -> b (1200), a (500)  — හැමවිටම sorted`,
        note: 'TreeSet + Comparator = always-sorted set.',
      },
      {
        filename: 'ComparableVsComparator.java',
        language: 'java',
        code: `// Comparable — class එකේම natural order
class Customer implements Comparable<Customer> {
    double spend;
    public int compareTo(Customer o) {           // "මම compare වෙන හැටි"
        return Double.compare(this.spend, o.spend);
    }
}

// Comparator — custom order (external, reusable)
Comparator<Customer> byEmail = Comparator.comparing(c -> c.email);`,
        note: 'Comparable = natural (compareTo); Comparator = custom/external.',
      },
    ],
    mortar:
      'Mortar identity resolution වලදී already-seen emails `HashSet` එකේ තියාගෙන duplicates O(1) ඉවත් කරනවා (millions of records — fast dedup critical). Segment analytics වල "top spenders sorted" ඕන නම් `TreeSet` + `Comparator`. UI display order preserve කරන්න `LinkedHashSet`. `equals`/`hashCode` හරි නැත්නම් dedup break වෙනවා (2.2.5).',
    keyPoints: [
      'HashSet = fast/unordered; LinkedHashSet = insertion-order; TreeSet = sorted.',
      'Comparable = natural order (`compareTo`); Comparator = custom order.',
      'HashSet elements → `equals`/`hashCode`; TreeSet → `compareTo`/Comparator.',
      'Dedup වලට HashSet default (O(1)).',
    ],
    pitfalls: [
      'TreeSet එකට Comparable නැති elements, Comparator එකකුත් නැතුව දැම්මොත් `ClassCastException` (runtime).',
      'HashSet element එකක field එකක් (hashCode එකට use වෙන) පස්සේ වෙනස් කලොත් — element එක "නැති" වෙනවා.',
    ],
  },

  '2.2.4': {
    summary:
      'Map implementations: `HashMap` (fast, unordered — default), `LinkedHashMap` (order/LRU), `TreeMap` (sorted keys), `ConcurrentHashMap` (thread-safe, scalable).',
    sinhala: [
      {
        heading: 'කතාව: email එකෙන් customer කෙනෙක් හොයන්න',
        body: 'Mortar identity resolution එකේ email එකක් දුන්නම ඒ customer කෙනෙක්ගේ golden record එක ඉක්මනට හොයාගන්න ඕන (millions අතරින්). List එකක loop කරොත් O(n) — මිලියනයක් නම් අති slow. `Map<email, Customer>` එකක් නම් O(1) lookup — instant. මේකයි Map එකේ බලය: key එකකින් value එකක් ඉක්මනට.',
      },
      {
        heading: 'හතරේ character',
        body: 'Map implementations 4:',
        points: [
          '`HashMap` — hashing මත. get/put O(1) average. Order **නෑ**. null key/value OK. Not thread-safe. **Default**.',
          '`LinkedHashMap` — HashMap + order (insertion හෝ access order). Access-order mode එකෙන් **LRU cache** හදන්න පුළුවන්.',
          '`TreeMap` — keys **sorted** (red-black tree). O(log n). Range queries (`headMap`, `tailMap`) වලට.',
          '`ConcurrentHashMap` — thread-safe, high-concurrency (bucket-level locking, full-map lock නෑ). null key/value **බෑ**.',
        ],
      },
    ],
    analogy:
      '`HashMap` = සාමාන්‍ය dictionary (word → meaning, ඉක්මන්). `TreeMap` = alphabetical dictionary (හැමවිටම sorted). `ConcurrentHashMap` = ගොඩක් අය එකවර පාවිච්චි කරන shared dictionary එකක් (safe, කැඩෙන්නෙ නෑ). `LinkedHashMap` = "recently used" tab එකක් තියෙන dictionary (LRU).',
    code: [
      {
        filename: 'Maps.java',
        language: 'java',
        code: `// HashMap — O(1) lookup (default)
Map<String, Customer> index = new HashMap<>();
index.put("a@x.com", customer);
Customer c = index.get("a@x.com");   // O(1) — instant

// TreeMap — sorted keys (date -> metric reports)
Map<LocalDate, Double> revenue = new TreeMap<>();
// keys automatically date order එකෙන් sorted`,
        note: 'email→customer index = HashMap (O(1) lookup); sorted reports = TreeMap.',
      },
      {
        filename: 'ConcurrentMap.java',
        language: 'java',
        code: `// multiple sync threads counters update කරනවා -> ConcurrentHashMap
Map<String, Long> counts = new ConcurrentHashMap<>();

// merge = atomic (thread-safe increment)
counts.merge("shopify", 1L, Long::sum);   // safe from many threads
counts.merge("shopify", 1L, Long::sum);   // -> 2, race condition නෑ`,
        note: 'Concurrent updates → ConcurrentHashMap (+ atomic merge/compute).',
      },
      {
        filename: 'LruCache.java',
        language: 'java',
        code: `// LinkedHashMap access-order + removeEldestEntry = simple LRU cache
Map<String, Product> cache = new LinkedHashMap<>(16, 0.75f, true) {
    protected boolean removeEldestEntry(Map.Entry<String, Product> e) {
        return size() > 1000;    // 1000ට වඩා වුනොත් oldest එක ඉවත්
    }
};`,
        note: 'LinkedHashMap (access-order) → LRU cache (9.3.3).',
      },
    ],
    mortar:
      'Mortar identity index (email→golden record) single-thread build එකකදී `HashMap` (O(1) lookup, millions). Multi-threaded sync counters → `ConcurrentHashMap` (`merge` atomic, race conditions නෑ). Sorted reports (date→metric) → `TreeMap`. Recommendation/segment caches → `LinkedHashMap` LRU (9.3). හරි Map එක තෝරගැනීම lookup performance + thread-safety දෙකටම තීරණාත්මකයි.',
    keyPoints: [
      'HashMap = O(1), default; LinkedHashMap = ordered/LRU; TreeMap = sorted keys.',
      'ConcurrentHashMap = thread-safe, scalable (bucket-level locking).',
      'ConcurrentHashMap null key/value allow කරන්නෙ නෑ.',
      'key එකෙන් value lookup O(1) — List loop (O(n)) වලට වඩා දරාමට හොඳයි.',
    ],
    pitfalls: [
      'HashMap multi-thread එකකින් concurrent modify කරොත් corruption/infinite loop — concurrent access නම් `ConcurrentHashMap`.',
      'HashMap key එකේ `equals`/`hashCode` හරි නැත්නම් lookups fail (2.2.5).',
    ],
  },

  '2.2.5': {
    summary:
      'HashMap internally: key එකේ `hashCode()` → bucket (array slot); collisions → linked list chain; Java 8+ එකේ bucket එකක 8+ nodes → balanced tree (treeification, O(n)→O(log n)). `equals`/`hashCode` contract critical.',
    sinhala: [
      {
        heading: 'කතාව: O(1) lookup එක ඇත්තටම වැඩ කරන්නේ කොහොමද?',
        body: 'HashMap එක O(1) lookup දෙනවා කිව්වා (2.2.4). ඒත් millions of keys අතරින් එකක් instant හොයාගන්නේ කොහොමද? මේ internal magic එක තේරුම්ගැනීම — interviews වලට, සහ custom objects keys විදිහට use කරනකොට bugs වළක්වන්න — අත්‍යවශ්‍යයි. Mortar identity resolution එකේ Customer/email keys HashMap එකේ නිසා මේක practically වැදගත්.',
      },
      {
        heading: 'ඇතුලෙ වෙන්නේ (steps)',
        body: 'HashMap එකක `put(key, value)` වෙන විදිහ:',
        points: [
          'key එකේ `hashCode()` call කරලා number එකක් ගන්නවා.',
          'ඒ hash එකෙන් bucket (internal array slot) index එකක් ගණනය කරනවා.',
          'ඒ bucket එකට keys කිහිපයක් ආවොත් (collision) — linked list එකක් විදිහට chain වෙනවා.',
          'Java 8+: bucket එකක nodes 8+ (සහ capacity ≥64) වුනොත් — linked list එක red-black **tree** එකක් වෙනවා (lookup O(n)→O(log n)).',
        ],
      },
      {
        heading: 'equals/hashCode contract',
        body: 'Custom object එකක් key විදිහට use කරනවා නම් **`equals` සහ `hashCode` දෙකම override කරන්නම ඕන**, contract එකට අනුව: (1) `equals` true නම් `hashCode` සමාන වෙන්නම ඕන. (2) `hashCode` සමාන වුනාට `equals` සමාන වෙන්න ඕන නෑ (collision OK). මේ contract break කලොත් — key එක put කරලා get කරද්දී "නැති" වෙනවා (wrong bucket).',
      },
    ],
    analogy:
      'ලොකු library එකක shelves (buckets). හැම පොතක්ම hashCode අනුව හරි shelf එකට යනවා. එකම shelf එකට පොත් ගොඩක් ආවොත් (collision) — ඒ shelf එකේ තවත් organize කරනවා (Java 8 tree). හරි shelf number (hashCode) නැත්නම් පොත හොයාගන්න බෑ.',
    code: [
      {
        filename: 'HashMapKey.java',
        language: 'java',
        code: `class Customer {
    private final String email;
    Customer(String email) { this.email = email; }

    // equals + hashCode දෙකම override — HashMap key එකට අත්‍යවශ්‍යයි
    @Override public boolean equals(Object o) {
        return o instanceof Customer c && email.equals(c.email);
    }
    @Override public int hashCode() {
        return email.hashCode();     // equals true නම් hashCode සමාන (contract)
    }
}

Map<Customer, Integer> spend = new HashMap<>();
spend.put(new Customer("a@x.com"), 100);
Integer s = spend.get(new Customer("a@x.com"));  // 100 — hashCode+equals නිසා හම්බවෙනවා`,
        note: 'equals true ⇒ hashCode සමාන — නැත්නම් key එක "නැති" වෙනවා.',
      },
      {
        filename: 'BrokenContract.java',
        language: 'java',
        code: `class Bad {
    String id;
    // equals override කරා, ඒත් hashCode නෑ! -> contract broken
    @Override public boolean equals(Object o) { /* compares id */ return true; }
    // hashCode default (Object) -> වෙන වෙන hashCode -> වෙන bucket
}

Map<Bad, String> m = new HashMap<>();
m.put(new Bad(), "x");
m.get(new Bad());   // null! (equals same, ඒත් hashCode වෙනස් -> wrong bucket)`,
        note: 'equals override කරාම hashCode ත් override කරන්නම ඕන — නැත්නම් lookups fail.',
      },
    ],
    mortar:
      'Mortar identity resolution හදන email→golden-record `HashMap`/`HashSet` වල key එක Customer/email. Custom `equals`/`hashCode` හරි නැත්නම් — duplicate customers "not found" වෙලා dedup break වෙනවා (එකම customer කිහිප වතාවක් store වෙනවා). මේ internal knowledge එක එතනදී තීරණාත්මකයි. Java 8 treeification නිසා hash collisions ගොඩක් තිබුණත් lookup O(log n) — resilient.',
    keyPoints: [
      'hashCode → bucket; collision → chain; Java 8 treeify (8+ nodes → O(log n)).',
      'equals true ⇒ hashCode සමාන වෙන්නම ඕන (contract).',
      'Custom object key → equals + hashCode දෙකම override.',
      'Poor hashCode (හැම එකටම එකම value) = all one bucket = O(n).',
    ],
    pitfalls: [
      'equals override කරලා hashCode override නොකරන එක — #1 HashMap bug (keys "නැති" වෙනවා).',
      'Mutable key එකක field එකක් (hashCode එකට use වෙන) put කරලා පස්සේ වෙනස් කලොත් — key එක lost.',
    ],
  },

  '2.2.6': {
    summary:
      'Fail-fast iterators (`ArrayList`, `HashMap`) iterate කරද්දී structurally modify වුනොත් `ConcurrentModificationException` විසි කරනවා. Fail-safe (`CopyOnWriteArrayList`, `ConcurrentHashMap`) snapshot එකක් මත වැඩ කරන නිසා exception නෑ.',
    sinhala: [
      {
        heading: 'කතාව: loop එකක් ඇතුලේ remove කරද්දී crash',
        body: 'ඔයා customer list එකක් iterate කරමින්, condition එකකට ගැලපෙන ඒවා remove කරන්න හදනවා — `for (Customer c : list) { if (...) list.remove(c); }`. Crash! `ConcurrentModificationException`. ඇයි? ArrayList/HashMap වගේ collections "fail-fast" — iterate කරද්දී collection එක structurally වෙනස් වුනොත් (add/remove), වහාම error විසි කරනවා (silent corruption එකකට වඩා fail-fast හොඳයි කියන අදහසින්).',
      },
      {
        heading: 'දෙකේ හැසිරීම',
        body: 'Iterator වර්ග දෙක:',
        points: [
          'Fail-fast (ArrayList, HashMap, HashSet): iterate කරද්දී structural modify → `ConcurrentModificationException` වහාම (internal `modCount` check).',
          'Fail-safe (CopyOnWriteArrayList, ConcurrentHashMap): underlying data එකේ copy/snapshot එකක් මත iterate — exception නෑ, ඒත් iteration එකේදී වුණ changes නොපෙනේ.',
          'Fail-fast = best-effort detection (guarantee නෙවෙයි) — bugs ඉක්මනට අල්ලන්න.',
          'විසඳුම: loop-modify එකට `Iterator.remove()`, `removeIf()`, හෝ concurrent collections.',
        ],
      },
    ],
    analogy:
      'Fail-fast = කවුරු හරි ඔයා ගණන් කරන ලැයිස්තුව මැද්දෙ item එකක් add/remove කලොත් "නවත්තන්න! ලැයිස්තුව වෙනස් වුණා!" කියලා error එකක් (data corruption වෙනවට වඩා). Fail-safe = ලැයිස්තුවේ photocopy එකක් අරන් ගණන් කරනවා (වෙනස්කම් නොදැනී, ඒත් safe).',
    code: [
      {
        filename: 'FailFast.java',
        language: 'java',
        code: `List<String> ids = new ArrayList<>(List.of("a", "b", "c"));

// BAD: for-each ඇතුලේ remove -> ConcurrentModificationException
// for (String id : ids) {
//     if (id.equals("b")) ids.remove(id);   //  crash!
// }

// GOOD 1: Iterator.remove()
Iterator<String> it = ids.iterator();
while (it.hasNext()) {
    if (it.next().equals("b")) it.remove();   // ✅ safe
}

// GOOD 2: removeIf (cleanest)
ids.removeIf(id -> id.equals("b"));           // ✅ safe`,
        note: 'Loop-modify එකට Iterator.remove() හෝ removeIf() — for-each remove නෙවෙයි.',
      },
      {
        filename: 'FailSafe.java',
        language: 'java',
        code: `// concurrent — වෙන threads modify කරද්දීත් iterate safe (snapshot)
List<String> connectors = new CopyOnWriteArrayList<>(List.of("shopify"));

for (String c : connectors) {
    connectors.add("klaviyo");   // exception නෑ! (ඒත් මේ loop එකට "klaviyo" පේන්නෙ නෑ)
}`,
        note: 'Fail-safe = snapshot මත iterate — CME නෑ, ඒත් latest changes නොපෙනේ.',
      },
    ],
    mortar:
      'Mortar sync scheduler එකක් active-jobs list එක iterate කරද්දී වෙන thread එකක් job එකක් add කලොත් — plain ArrayList නම් fail-fast crash. ඒ නිසා shared, concurrently-modified collections වලට `ConcurrentHashMap`/`CopyOnWriteArrayList` (fail-safe). Single-thread batch processing එකේ loop-modify වලට `removeIf()` — clean + safe. මේ දැනුම production concurrency bugs වළක්වනවා.',
    keyPoints: [
      'Fail-fast = modCount check → `ConcurrentModificationException` (ArrayList, HashMap).',
      'Fail-safe = snapshot/copy → CME නෑ (CopyOnWrite, Concurrent collections).',
      'Loop-modify → `Iterator.remove()` / `removeIf()` / concurrent collections.',
      'Fail-fast = best-effort (bugs early), guarantee නෙවෙයි.',
    ],
    pitfalls: [
      'for-each loop ඇතුලේ collection එකේ add/remove — classic ConcurrentModificationException.',
      'Fail-safe iteration එකේදී වුණ changes ඒ iteration එකට නොපෙනේ — "stale" data වෙන්න පුළුවන්.',
    ],
  },

  '2.3.1': {
    summary:
      'Generics = classes/methods types parameterize කරන එක (`List<Customer>`) — compile-time type safety + reuse. Bounded type parameters (`<T extends Number>`) එකෙන් T මත මොනවා කරන්න පුළුවන්ද කියලා limit කරනවා.',
    sinhala: [
      {
        heading: 'කතාව: type safety නැති කාලේ',
        body: 'පරණ Java (generics-ට කලින්) වල `List` එකකට ඕන object එකක් දාන්න පුළුවන් — String, Integer, Customer මිශ්‍රව! ගන්නකොට `(Customer) list.get(0)` කියලා cast කරන්නම ඕන, වැරදුනොත් runtime `ClassCastException`. Generics මේක fix කරනවා — `List<Customer>` කියලා type එක කලින්ම කියනවා. දැන් Customer නොවන දෙයක් දාන්න **compiler එකෙන්ම** බෑ, ගන්නකොට cast ඕන නෑ. Bugs compile-time එකේම අල්ලනවා.',
      },
      {
        heading: 'Bounded types: T ට boundary එකක්',
        body: 'සමහර වෙලාවට T ඕන දෙයක් වෙන්න දෙන්න බෑ — T මත specific methods call කරන්න ඕන. Bounds:',
        points: [
          '`<T extends Number>` — T එක Number හෝ subclass එකක් වෙන්නම ඕන (upper bound). ඒ නිසා T මත `doubleValue()` වගේ Number methods call කරන්න පුළුවන්.',
          '`extends` = upper bound (this type or **below** in hierarchy).',
          '`super` = lower bound (this type or **above**) — wildcards එක්ක (2.3.2).',
          'Multiple bounds: `<T extends Number & Comparable<T>>` — දෙකම satisfy කරන්නම ඕන.',
        ],
      },
    ],
    analogy:
      '`List<Customer>` = "Customers විතරයි දාන්න පුළුවන් box එකක්" — labelled container (වැරදි දේවල් දාන්න බෑ). `<T extends Number>` = "Number වර්ගයේ දේවල් විතරයි accept කරන bouncer" — type එකට boundary එකක්.',
    code: [
      {
        filename: 'WhyGenerics.java',
        language: 'java',
        code: `// generics නැතුව — unsafe, cast ඕන
List raw = new ArrayList();
raw.add("string");
raw.add(42);                       // මොනවා හරි දාන්න පුළුවන් (bug එකක්)
Customer c = (Customer) raw.get(0);  //  ClassCastException runtime එකේ!

// generics එක්ක — compile-time safe, cast නෑ
List<Customer> customers = new ArrayList<>();
customers.add(customer);
// customers.add("string");        //  COMPILE ERROR — type safe
Customer safe = customers.get(0);   // cast ඕන නෑ`,
        note: 'Generics = compile-time type safety + cast නැති clean code.',
      },
      {
        filename: 'BoundedType.java',
        language: 'java',
        code: `// T guaranteed Number -> T මත doubleValue() call කරන්න පුළුවන්
static <T extends Number> double sum(List<T> nums) {
    double total = 0;
    for (T n : nums) {
        total += n.doubleValue();   // Number method — bound නිසා safe
    }
    return total;
}

sum(List.of(1, 2, 3));         // Integer (Number subclass) ✅
sum(List.of(1.5, 2.5));        // Double ✅
// sum(List.of("a", "b"));     //  String Number නෙවෙයි — compile error`,
        note: 'extends Number නිසා T මත Number methods safe.',
      },
      {
        filename: 'GenericClass.java',
        language: 'java',
        code: `// generic class — ඕන type එකකට reusable
class Box<T> {
    private T value;
    void set(T value) { this.value = value; }
    T get() { return value; }
}

Box<Customer> cb = new Box<>();
cb.set(customer);
Customer c = cb.get();    // type-safe, cast නෑ`,
        note: 'Generic class → එකම code, type-safe, ඕන type එකකට.',
      },
    ],
    mortar:
      'Mortar generic `Repository<T>` (7.4.5), metrics aggregation utilities (`sum`, `average`) `<T extends Number>` bounded generics වලින් — Integer order-counts, Double spend එකම code එකෙන් type-safe process කරනවා. Generic DTOs, response wrappers (`ApiResponse<T>`) — code reuse + compile-time safety. Runtime ClassCastException surprises නෑ.',
    keyPoints: [
      'Generics = compile-time type safety + reuse (`List<Customer>`).',
      '`<T extends X>` = upper bound → X ගේ methods T මත call කරන්න පුළුවන්.',
      '`extends` = upper bound; `super` = lower bound (wildcards).',
      'Casts නැති clean code + runtime ClassCastException වළක්වයි.',
    ],
    pitfalls: [
      'Raw types (`List` generics නැතුව) use කරන එක type safety නැති කරනවා — හැමවිටම `List<X>`.',
      'Primitives generics වල දාන්න බෑ (`List<int>` බෑ) — wrappers (`List<Integer>`) ඕන.',
    ],
  },

  '2.3.2': {
    summary:
      'Wildcards (`?`): `<?>` = unknown type; `<? extends T>` = producer (T හෝ subtype — read); `<? super T>` = consumer (T හෝ supertype — write). මතක තියාගන්න PECS: **Producer Extends, Consumer Super**.',
    sinhala: [
      {
        heading: 'කතාව: List<VIP> එකක් List<Customer> method එකකට යවන්න බෑ?!',
        body: 'VIP, Committed කියන්නේ Customer ගේ subtypes. ඔයාට `List<VIP>` එකක් තියෙනවා, `void process(List<Customer> list)` method එකකට යවන්න ඕන. ඒත් compile error! ඇයි? `List<VIP>` සහ `List<Customer>` generics වල **related නෑ** (VIP, Customer related වුනත්). මේ අවුල විසඳන්නේ wildcards (`?`) වලින් — flexible generic parameters.',
      },
      {
        heading: 'Wildcard වර්ග 3 + PECS',
        body: 'Wildcards 3ක්, කවදා මොකක්ද කියලා PECS rule එකෙන් තීරණය කරනවා:',
        points: [
          '`<?>` — unbounded, type එක නොදන්නවා (elements Object විදිහට read කරන්න විතරයි පුළුවන්).',
          '`<? extends T>` — T හෝ subtype. List එකකින් values **read** කරනවා නම් (Producer). "Producer Extends".',
          '`<? super T>` — T හෝ supertype. List එකට values **write** කරනවා නම් (Consumer). "Consumer Super".',
          'PECS: **P**roducer **E**xtends, **C**onsumer **S**uper — read නම් extends, write නම් super.',
        ],
      },
    ],
    analogy:
      '`? extends Customer` = "මොකක් හරි Customer එකක් (VIP/Committed) දෙන box එකක්" — ගන්න (read) පුළුවන්, ඒත් දාන්න බෑ (මොන subtype ද කියලා නොදන්නා නිසා). `? super VIP` = "VIP එකක් දාන්න පුළුවන් box එකක්" — දාන්න (write) පුළුවන්.',
    code: [
      {
        filename: 'ProducerExtends.java',
        language: 'java',
        code: `// PRODUCER: list එකෙන් values READ කරනවා -> ? extends
static double totalSpend(List<? extends Customer> customers) {
    double total = 0;
    for (Customer c : customers) {       // read as Customer — safe
        total += c.getTotalSpend();
    }
    return total;
}

// දැන් Customer subtypes ඔක්කොම pass කරන්න පුළුවන්:
totalSpend(new ArrayList<VIP>());        // ✅
totalSpend(new ArrayList<Committed>());  // ✅
totalSpend(new ArrayList<Customer>());   // ✅`,
        note: 'Read (produce) කරනවා → `? extends` → subtypes ඔක්කොම accept.',
      },
      {
        filename: 'ConsumerSuper.java',
        language: 'java',
        code: `// CONSUMER: list එකට values WRITE කරනවා -> ? super
static void addVips(List<? super VIP> sink) {
    sink.add(new VIP());        // write — safe (VIP හෝ supertype list එකක්)
    sink.add(new VIP());
}

// VIP හෝ supertype lists accept:
addVips(new ArrayList<VIP>());       // ✅
addVips(new ArrayList<Customer>());  // ✅ (VIP is-a Customer)
addVips(new ArrayList<Object>());    // ✅`,
        note: 'Write (consume) කරනවා → `? super` → supertypes accept.',
      },
    ],
    mortar:
      'Mortar generic export/aggregation helpers wildcards වලින් flexible: `totalSpend(List<? extends Customer>)` එකට `List<VIP>`, `List<Committed>` (segment subtypes — 3.2.6) ඔක්කොම pass කරන්න පුළුවන්. Audience-building "sink" APIs `List<? super VIP>` — customers add කරන්න. PECS rule එකෙන් flexible, safe generic APIs.',
    keyPoints: [
      'PECS: Producer Extends (read), Consumer Super (write).',
      '`<? extends T>` = T හෝ subtype (read); `<? super T>` = T හෝ supertype (write).',
      '`<?>` = unbounded (Object විදිහට read only).',
      'Wildcards = flexible generic method APIs.',
    ],
    pitfalls: [
      '`<? extends T>` list එකකට `add()` කරන්න බෑ (මොන subtype ද කියලා නොදන්නා නිසා) — read only.',
      '`<? super T>` list එකකින් read කරාම Object විතරයි ලැබෙන්නේ (specific type නොදන්නා නිසා).',
    ],
  },

  '2.3.3': {
    summary:
      'Type erasure = generics compile-time එකේ විතරයි; bytecode එකට යනකොට type parameters "erase" වෙනවා (`List<String>` → `List`). ඒ නිසා runtime එකේ generic type info නෑ (backward compatibility නිසා).',
    sinhala: [
      {
        heading: 'කතාව: generics runtime එකේ "නැති" වෙනවා',
        body: 'Generics 2004 (Java 5) දී ආවා — ඒත් පරණ code එක්ක compatible වෙන්නම ඕන වුණා. ඒ නිසා Java designers trick එකක් කළා: generics compile-time එකේ check කරලා, bytecode generate කරනකොට type parameters ඉවත් කරනවා (erase). ඒ නිසා `List<String>` සහ `List<Integer>` runtime එකේ **එකම class** (`List`). Type info "මැකෙනවා". මේකෙන් surprising limitations කිහිපයක් එනවා.',
      },
      {
        heading: 'Erasure එකෙන් එන limitations',
        body: 'Runtime එකේ generic type නොදන්නා නිසා මේවා බෑ:',
        points: [
          '`List<String>` සහ `List<Integer>` runtime එකේ එකම — `a.getClass() == b.getClass()` → true.',
          '`new T()` කරන්න බෑ — T runtime එකේ නෑ (type එකක් instantiate කරන්න බෑ).',
          '`new T[]` (generic array) කරන්න බෑ.',
          '`if (obj instanceof List<String>)` කරන්න බෑ — runtime එකේ `<String>` නෑ (raw `List` විතරයි check කරන්න පුළුවන්).',
        ],
      },
      {
        heading: 'Workaround: Class<T> pass කරන්න',
        body: 'Runtime එකේ type එක ඕන නම් (reflection, DB mapping), `Class<T>` object එකක් argument විදිහට pass කරලා store කරනවා. Compiler bridge methods + casts automatic දාන නිසා, මේ erasure එක සාමාන්‍ය use වලට invisible.',
      },
    ],
    analogy:
      'Exam එකකදී calculator පාවිච්චි කරලා (compile-time check), answer sheet එකේ calculator එක පේන්නෙ නෑ (runtime bytecode). Generics compile-time එකේ වැඩ කරලා, runtime එකේ "නැති" වෙනවා — scaffolding එකක් වගේ (building හදලා ඉවත් කරනවා).',
    code: [
      {
        filename: 'Erasure.java',
        language: 'java',
        code: `List<String>  a = new ArrayList<>();
List<Integer> b = new ArrayList<>();

// runtime එකේ දෙකම එකම class — <String>/<Integer> මැකිලා
System.out.println(a.getClass() == b.getClass());  // true! (දෙකම ArrayList)

// erasure නිසා මේවා බෑ:
// if (a instanceof List<String>) {}   //  compile error
// T item = new T();                   //  compile error
// T[] arr = new T[10];                //  compile error`,
        note: 'Runtime එකේ දෙකම හුදෙක් ArrayList — type parameter erased.',
      },
      {
        filename: 'ClassTokenWorkaround.java',
        language: 'java',
        code: `// runtime type ඕන නම් Class<T> pass කරලා store කරන්න
class Repository<T> {
    private final Class<T> type;         // runtime type token

    Repository(Class<T> type) {
        this.type = type;                // store කරනවා
    }

    T fromDb(ResultSet rs) {
        // type.getName() reflection/mapping වලට use කරන්න පුළුවන්
        return type.cast(mapRow(rs));
    }
    private Object mapRow(ResultSet rs) { return null; }
}

Repository<Customer> repo = new Repository<>(Customer.class);`,
        note: 'Class<T> argument = type erasure එකේ practical workaround.',
      },
    ],
    mortar:
      'Mortar generic `Repository<T>` design කරද්දී, runtime එකේ T නොදන්නා නිසා `Class<T>` argument එකක් store කරලා reflection/DB entity mapping වලට use කරනවා (Spring Data JPA එකත් මේ pattern එක). JSON deserialization (`ObjectMapper.readValue(json, Customer.class)`) වගේ තැන් වලත් type erasure නිසා `Class` tokens / `TypeReference` ඕන. මේ දැනුම generic library code ලියද්දී වැදගත්.',
    keyPoints: [
      'Generics compile-time only; runtime එකේ type parameters erased.',
      'Runtime එකේ `List<String>` == `List<Integer>` (එකම class).',
      '`new T()`, `new T[]`, `instanceof Generic<X>` — බෑ.',
      'Runtime type ඕන නම් `Class<T>` token pass කරන්න.',
    ],
    pitfalls: [
      'Generic array creation (`new T[]`) බෑ — `(T[]) new Object[n]` + `@SuppressWarnings` හෝ `Object[]` use කරන්න.',
      'Overloading `method(List<String>)` සහ `method(List<Integer>)` බෑ — erasure නිසා දෙකම එකම signature.',
    ],
  },

  '2.4.1': {
    summary:
      'Thread එකක් කියන්නේ independent execution path එකක් — programs එකවර වැඩ කිහිපයක් කරන්න. Thread lifecycle: NEW → RUNNABLE → RUNNING ↔ (BLOCKED / WAITING / TIMED_WAITING) → TERMINATED.',
    sinhala: [
      {
        heading: 'කතාව: connectors 15ක් එකවර sync කරන්න',
        body: 'Mortar එකට connectors 15ක් තියෙනවා. එකින් එක (sequentially) sync කරොත් — Shopify (30s) + Klaviyo (30s) + ... = විනාඩි ගොඩක්! ඒත් මේ syncs ගොඩක්ම network එකට බලාගෙන ඉන්නවා (IO-bound). එකවර (parallel) කරොත් ඔක්කොම 30sකින් ඉවර. ඒකට **threads** — එක program එකක් ඇතුලේ independent execution paths කිහිපයක්. Thread එකක් ඒකෙම lifecycle එකක් හරහා යනවා; ඒ states තේරුම්ගැනීම concurrency debug කරන්න අත්‍යවශ්‍යයි.',
      },
      {
        heading: 'Thread states',
        body: 'Thread එකක් යන states:',
        points: [
          '`NEW` — thread object එක හැදුවා, ඒත් `start()` කරලා නෑ.',
          '`RUNNABLE` — `start()` කරා; run වෙන්න ready (OS scheduler එක CPU දෙනකම්). "running" ත් මේකට ඇතුළත්.',
          '`BLOCKED` — synchronized lock එකකට බලාගෙන.',
          '`WAITING` — `wait()`/`join()` වලින් අනිත් thread එකකින් signal එකක් එනකම් (indefinite).',
          '`TIMED_WAITING` — `sleep(ms)`/`wait(ms)` — නියමිත කාලයක්.',
          '`TERMINATED` — `run()` ඉවරයි (හෝ exception එකකින් නැවතුණා).',
        ],
      },
    ],
    analogy:
      'Employee කෙනෙක්ගේ තත්ත්වයන් වගේ: hired but not started (NEW), ready at desk (RUNNABLE), working (RUNNING), waiting for a meeting room key (BLOCKED), waiting for approval (WAITING), lunch break till 1pm (TIMED_WAITING), resigned (TERMINATED).',
    code: [
      {
        filename: 'ThreadLifecycle.java',
        language: 'java',
        code: `Thread t = new Thread(() -> {
    System.out.println("syncing...");    // RUNNABLE -> RUNNING
});

System.out.println(t.getState());        // NEW
t.start();                               // NEW -> RUNNABLE
t.join();                                // main thread WAITING (t ඉවර වෙනකම්)
System.out.println(t.getState());        // TERMINATED`,
        note: 'start() → RUNNABLE; join() = අනිත් thread එක ඉවර වෙනකම් බලනවා (WAITING).',
      },
      {
        filename: 'StartVsRun.java',
        language: 'java',
        code: `Runnable task = () -> System.out.println(Thread.currentThread().getName());

Thread t = new Thread(task);
t.start();      // ✅ අලුත් thread එකක් හදනවා -> "Thread-0"
// t.run();     //  අලුත් thread එකක් නෑ! main thread එකේම run වෙනවා -> "main"`,
        note: '`start()` = අලුත් thread; `run()` = current thread එකේම (thread එකක් නෑ!).',
      },
    ],
    mortar:
      'Mortar background sync/prediction/enrichment threads lifecycle එක monitor කරලා stuck (BLOCKED/WAITING forever) jobs detect කරනවා — connection health + proactive error alerts (PROJECT_IDEA 10.4) වලට. Thread dumps (`jstack`) වලින් හැම thread එකේම state බලලා deadlocks/hangs diagnose කරනවා. Practice එකේ manual threads වෙනුවට Executors (2.4.6.1) use කරනවා, ඒත් මේ underlying states තේරුම්ගැනීම debugging එකට critical.',
    keyPoints: [
      'NEW → RUNNABLE → RUNNING → (BLOCKED/WAITING/TIMED_WAITING) → TERMINATED.',
      '`start()` = අලුත් thread; `run()` = current thread එකේම (thread එකක් හදන්නෙ නෑ).',
      'BLOCKED = lock එකට; WAITING = signal එකට; TIMED_WAITING = timeout එකට.',
      'Threads = parallel execution — IO-bound work වලට ලොකු speedup.',
    ],
    pitfalls: [
      '`run()` කෙලින්ම call කරන එක common bug — thread එකක් හැදෙන්නෙ නෑ, sequential run වෙනවා. `start()` use කරන්න.',
      'Thread එකක් `start()` දෙපාරක් කරන්න බෑ — `IllegalThreadStateException`.',
    ],
  },

  '2.4.2': {
    summary:
      'Threads හදන ක්‍රම 3ක්: `Thread` class extend (inheritance waste), `Runnable` implement (**preferred** — task/thread වෙන් කරයි), `Callable<T>` (result + checked exception — `Future` එකෙන් result ගන්නවා).',
    sinhala: [
      {
        heading: 'කතාව: task එක return එකක් දෙනවා නම්?',
        body: 'Mortar connector sync එකක් fire-and-forget නම් (result ඕන නෑ) — `Runnable` හොඳයි. ඒත් "customers කී දෙනෙක් sync වුනාද?" වගේ **result** එකක් ඕන නම්? `Runnable` void return — result දෙන්න බෑ. ඒකට `Callable<T>` — result එකක් return කරනවා, checked exception එකකුත් throw කරන්න පුළුවන්. Result එක `Future` object එකකින් ගන්නවා.',
      },
      {
        heading: 'තුන් ක්‍රමය',
        body: 'Threads/tasks හදන විදි:',
        points: [
          '`Thread` extend — simple, ඒත් single inheritance එක waste වෙනවා (parent එකක් තියෙනවා නම් බෑ). Recommend කරන්නෙ නෑ.',
          '`Runnable` implement — task එකයි thread එකයි වෙන් කරනවා. `void run()`, no result. Lambda වලින් clean. **Preferred.**',
          '`Callable<T>` implement — Runnable වගේ, ඒත් `T call()` — **result** return කරනවා + checked exception throw කරන්න පුළුවන්.',
          'නවීන code: manual threads වෙනුවට Runnable/Callable ExecutorService (2.4.6.1) එකට submit කරනවා.',
        ],
      },
    ],
    analogy:
      '`Runnable` = "වැඩේ කරන්න" කියලා employee කෙනෙක්ට දෙන task එකක් (report එකක් ඕන නෑ). `Callable` = "වැඩේ කරලා ප්‍රතිඵලය දෙන්න" (report + "අවුලක් වුනොත් කියන්න"). `Future` = ඒ report එක ගන්න ticket එක.',
    code: [
      {
        filename: 'RunnableThread.java',
        language: 'java',
        code: `// Runnable (preferred) — result නෑ, lambda වලින් clean
Runnable syncTask = () -> System.out.println("sync done");
new Thread(syncTask).start();

// Runnable ExecutorService එකට submit කරන එක modern විදිහ
ExecutorService pool = Executors.newFixedThreadPool(4);
pool.submit(() -> System.out.println("pool thread එකේ"));
pool.shutdown();`,
        note: 'Runnable = void task; task එකයි thread එකයි වෙන් (composition).',
      },
      {
        filename: 'CallableFuture.java',
        language: 'java',
        code: `// Callable — result එකක් return කරනවා
Callable<Integer> countTask = () -> {
    return repo.countCustomers();      // result + checked exception OK
};

ExecutorService pool = Executors.newFixedThreadPool(4);
Future<Integer> future = pool.submit(countTask);   // Future = "result ticket"

// වෙන වැඩ කරන්න පුළුවන් මේ අතරේ...
Integer count = future.get();          // result එනකම් block වෙනවා (හෝ ready නම් වහාම)
System.out.println(count);
pool.shutdown();`,
        note: 'Callable + Future = async result (2.4.6.2 CompletableFuture වඩාත් powerful).',
      },
    ],
    mortar:
      'Mortar parallel connector syncs — fire-and-forget නම් `Runnable`; "sync එකෙන් customers කී දෙනෙක් ආවද" වගේ count/result ඕන නම් `Callable` + `Future`. Nightly churn recompute jobs Callable විදිහට submit කරලා results aggregate කරනවා. නවීන Mortar code එකේ threads manual `new Thread` නොකර, tasks ExecutorService (2.4.6.1) වලට submit කරනවා — safer, bounded, reusable.',
    keyPoints: [
      'Runnable = no result (void); Callable = result + checked exception.',
      'Thread extend එකට වඩා Runnable/Callable (task/thread separation) හොඳයි.',
      'Callable result → `Future.get()` (block වෙනවා result එනකම්).',
      'Manual `new Thread` avoid — Executors (2.4.6.1) use කරන්න.',
    ],
    pitfalls: [
      '`Thread` extend කරලා `run()` override කරලා, ආපහු `run()` call කරන එක — thread එකක් හැදෙන්නෙ නෑ (`start()` ඕන).',
      '`future.get()` block වෙනවා — timeout එකක් නැතුව call කරොත් forever hang වෙන්න පුළුවන් (`get(timeout, unit)` use කරන්න).',
    ],
  },

  '2.4.3': {
    summary:
      '`synchronized` = එකවර එක thread එකකට විතරක් critical section එකට යන්න දෙනවා (mutual exclusion). Shared mutable state race conditions වළක්වනවා — atomicity + visibility දෙකම දෙනවා.',
    sinhala: [
      {
        heading: 'කතාව: counter එක වැරදි ගණන් වෙනවා',
        body: 'Mortar sync progress එකට processed-records counter එකක් තියෙනවා. Threads 4ක් එකවර `count++` කරනවා. ඒත් අන්තිමට count එක වැරදියි — expected 4000, ඒත් 3847! ඇයි? `count++` කියන්නේ steps 3ක් — read, add, write. Threads දෙකක් එකවර කරොත්, දෙන්නම එකම පරණ value එක read කරලා, එකම value එක write කරනවා — update එකක් නැති වෙනවා (race condition). විසඳුම — එකවර එක thread එකකට විතරක් `count++` කරන්න දෙන එක. ඒකට `synchronized`.',
      },
      {
        heading: 'synchronized වැඩ කරන විදිහ',
        body: 'Mutual exclusion + locks:',
        points: [
          'හැම object එකකටම intrinsic "monitor lock" එකක් තියෙනවා.',
          '`synchronized` method/block එකට ඇතුල් වෙන්න thread එකක් ඒ lock එක ගන්නම ඕන.',
          'එකවර එක thread එකයි lock එක අල්ලගෙන ඉන්නේ — ඉතුරු threads BLOCKED (2.4.1), lock release වෙනකම්.',
          'atomicity (එකවර එකෙක්) + visibility (වෙනස්කම් අනිත් threads වලට පේනවා) දෙකම දෙනවා.',
        ],
      },
      {
        heading: 'Lock scope කුඩාවට',
        body: 'Whole method එක `synchronized` කරනවා වෙනුවට, ඇත්තටම protect කරන්න ඕන කුඩා critical section එක විතරක් `synchronized` block එකකින් lock කරන්න — ඒ නිසා threads වැඩිපුර parallel වැඩ කරන්න පුළුවන් (throughput). Over-synchronize කලොත් program එක sequential වගේ slow.',
      },
    ],
    analogy:
      'Single toilet එකක key එකක් වගේ — key තියෙන කෙනා ඉවර වෙනකම් අනිත් අය පිටත බලාගෙන (BLOCKED). එකවර එක්කෙනෙක් විතරයි ඇතුලේ (mutual exclusion). Key එක කුඩා වැඩකට විතරයි අල්ලගෙන ඉන්නේ නම් (small lock scope), අනිත් අයට ඉක්මනට turn එක.',
    code: [
      {
        filename: 'RaceCondition.java',
        language: 'java',
        code: `class Counter {
    private int count = 0;

    // synchronized method — එකවර එක thread එකයි
    public synchronized void increment() {
        count++;             // atomic දැන් (read+add+write එකවර එකෙක්)
    }

    public synchronized int get() { return count; }
}
// threads 4ක් increment() කරාට count නිවැරදියි (race condition නෑ)`,
        note: 'synchronized method → mutual exclusion → race condition නෑ.',
      },
      {
        filename: 'SyncBlock.java',
        language: 'java',
        code: `class SyncService {
    private int processed = 0;
    private final Object lock = new Object();   // dedicated lock object

    public void process(Batch b) {
        doExpensiveWork(b);                     // lock එකෙන් පිට (parallel OK)

        synchronized (lock) {                   // කුඩා critical section විතරයි lock
            processed += b.size();
        }
    }
    private void doExpensiveWork(Batch b) { }
}`,
        note: 'Lock scope කුඩාවට → threads වැඩිපුර parallel → throughput වැඩියි.',
      },
    ],
    mortar:
      'Mortar sync progress counters (processed records — UI progress bar එකට) threads කිහිපයකින් update වෙනවා. `synchronized` (හෝ වඩා හොඳ `AtomicLong` — 2.4.6) වලින් count එක race condition නැතුව නිවැරදිව. Shared caches, config maps වගේ mutable shared state protect කරන්න synchronized/concurrent collections. Lock scope කුඩාවට තියාගෙන high-throughput ingestion pipeline එකක් තියාගන්නවා.',
    keyPoints: [
      '`synchronized` = mutual exclusion (එකවර එක thread critical section එකට).',
      'Race conditions (`count++` lost updates) වළක්වයි.',
      'Atomicity + visibility දෙකම දෙනවා.',
      'Lock scope කුඩාවට තියන්න — over-synchronize = slow.',
    ],
    pitfalls: [
      'Locks කිහිපයක් වැරදි order එකෙන් ගත්තොත් deadlock (2.4.5).',
      'Over-synchronization = threads බලාගෙන ඉන්නවා ගොඩක් = performance මරනවා. Simple counters වලට `Atomic*` classes හොඳයි.',
    ],
  },

  '2.4.4': {
    summary:
      '`wait()` / `notify()` / `notifyAll()` = threads එකිනෙක **coordinate** කරන එක (producer-consumer). `synchronized` block ඇතුලේ, `while(condition)` loop එකක් ඇතුලේ පාවිච්චි කරන්නම ඕන.',
    sinhala: [
      {
        heading: 'කතාව: worker එක job එකක් එනකම් බලාගෙන',
        body: 'Mortar job queue එකක් තියෙනවා — producer threads (connectors) jobs දානවා, worker threads process කරනවා. Queue එක හිස් නම්, worker එක මොකද කරන්නේ? Busy-loop එකක (`while(queue.isEmpty()) {}`) බලාගෙන ඉන්නවා නම් — CPU 100% නාස්ති! ඕන වෙන්නේ — worker එක "නිදාගෙන" (efficient wait), job එකක් ආවම producer එක "අවදි කරන" (notify) එක. ඒකට `wait()`/`notify()`.',
      },
      {
        heading: 'wait/notify rules',
        body: 'Inter-thread signalling:',
        points: [
          '`wait()` — thread එක lock එක **release කරලා** WAITING වෙනවා (notify එකක් එනකම්). CPU නාස්ති නෑ.',
          '`notify()` — waiting threads වලින් **එකකට** signal; `notifyAll()` — **ඔක්කොටම**.',
          'තුනම `synchronized` block/method එකක් ඇතුලේ විතරයි call කරන්න පුළුවන් (lock එක තියෙන්නම ඕන).',
          'Condition එක හැමවිටම `while` loop එකක් ඇතුලේ check කරන්න (`if` නෙවෙයි) — spurious wakeups + missed conditions වළක්වන්න.',
        ],
      },
    ],
    analogy:
      'Restaurant එකක waiter (consumer) chef "order ready!" කියනකම් බලාගෙන ඉන්නවා. Waiter නිකම් kitchen එකට දිගටම එබිකම් කරන්නෙ නෑ (busy-wait) — chef අවදි කරනකම් (notify) විවේකෙන් ඉන්නවා (wait). "Order ready!" කිව්වම (notify) waiter අවදි වෙලා ගන්නවා.',
    code: [
      {
        filename: 'JobQueue.java',
        language: 'java',
        code: `class JobQueue {
    private final Queue<String> jobs = new LinkedList<>();

    public synchronized void submit(String job) {
        jobs.add(job);
        notify();                       // waiting worker එකක් අවදි කරනවා
    }

    public synchronized String take() throws InterruptedException {
        while (jobs.isEmpty()) {        // 'while' — 'if' නෙවෙයි!
            wait();                     // lock release කරලා බලාගෙන (CPU නාස්ති නෑ)
        }
        return jobs.poll();
    }
}`,
        note: 'while loop ඇතුලේ wait() — spurious wakeups + missed signals වලට safe.',
      },
      {
        filename: 'PreferBlockingQueue.java',
        language: 'java',
        code: `// modern විදිහ: wait/notify manual නොකර BlockingQueue (2.4.6.3)
BlockingQueue<String> jobs = new LinkedBlockingQueue<>();

// producer
jobs.put("job-1");        // full නම් block (wait/notify built-in)

// consumer
String job = jobs.take(); // empty නම් block — manual wait/notify ඕන නෑ`,
        note: 'Practice එකේ wait/notify වෙනුවට BlockingQueue prefer කරන්න.',
      },
    ],
    mortar:
      'Mortar internal job queue එකක producer threads (connectors) jobs දානවා, worker threads process කරනවා. wait/notify (හෝ practically `BlockingQueue` — 2.4.6.3) වලින් busy-waiting නැතුව efficient coordination — CPU නාස්ති නෑ, workers jobs එනකම් විවේකෙන්. මේ producer-consumer pattern එක Mortar real-time streaming ingestion pipeline එකේ හදවත. නවීන code එකේ low-level wait/notify වෙනුවට higher-level `BlockingQueue` prefer කරනවා.',
    keyPoints: [
      'wait/notify = threads coordinate (producer-consumer).',
      'තුනම `synchronized` block ඇතුලේ විතරයි.',
      'Condition එක `while` loop එකක check කරන්න (spurious wakeups).',
      'Modern code: `BlockingQueue` / higher-level tools prefer.',
    ],
    pitfalls: [
      '`wait()` `if` එකක් ඇතුලේ දාන එක — spurious wakeup එකකදී condition satisfy නොවී continue වෙනවා. හැමවිටම `while`.',
      '`synchronized` block එකකින් පිට `wait()`/`notify()` call කරොත් `IllegalMonitorStateException`.',
    ],
  },

  '2.4.5': {
    summary:
      'Concurrency වල අන්තරායන් 3ක්: **Deadlock** (threads එකිනෙකා බලාගෙන, කවදාවත් progress නෑ), **Livelock** (busy ඒත් progress නෑ), **Starvation** (thread එකකට කවදාවත් resource නෑ). විසඳුම්: consistent lock order, timeouts, fairness.',
    sinhala: [
      {
        heading: 'කතාව: sync job එක හිරවෙලා',
        body: 'Mortar sync job එකක් DB lock එකයි cache lock එකයි දෙකම ඕන. Thread A: DB lock ගත්තා, දැන් cache lock එකට බලනවා. Thread B: cache lock ගත්තා, දැන් DB lock එකට බලනවා. දැන් දෙන්නම එකිනෙකා අල්ලගෙන ඉන්න lock එකට බලාගෙන — කවදාවත් නවතින්නෙ නෑ! Job එක forever hang. මේකට **deadlock**. Concurrency වල මේ වගේ අන්තරායන් 3ක් තියෙනවා.',
      },
      {
        heading: 'අන්තරායන් 3',
        body: 'තේරුම්ගන්න:',
        points: [
          'Deadlock — threads circular wait එකක. A → B ගේ lock එකට බලනවා, B → A ගේ lock එකට. දෙන්නම හිරවෙනවා (frozen).',
          'Livelock — threads active, ඒත් එකිනෙකාට reactively response දීලා progress නෑ. (දෙන්නම එකම පැත්තට side වෙලා ආයෙ block වගේ).',
          'Starvation — high-priority threads නිසා low-priority thread එකකට resource කවදාවත් නෑ (කවදාවත් turn එකක් නෑ).',
          'විසඳුම්: හැම thread එකම locks එකම order එකෙන් ගන්න (consistent ordering), `tryLock(timeout)`, fair locks.',
        ],
      },
    ],
    analogy:
      'Deadlock = පටු පාරක cars දෙකක් මුහුණට මුහුණ — දෙන්නම reverse වෙන්නෙ නෑ (frozen). Livelock = දෙන්නම එකම පැත්තට side වෙලා, ආයෙ මුහුණට මුහුණ, ආයෙ අනිත් පැත්තට — active, ඒත් යන්න බෑ. Starvation = traffic එකේ, VIP cars නිතරම යනකොට සාමාන්‍ය car එකට කවදාවත් හරි නෑ.',
    code: [
      {
        filename: 'DeadlockRisk.java',
        language: 'java',
        code: `// DEADLOCK risk: threads දෙකක් වෙනස් order එකෙන් locks ගන්නවා
// Thread 1: synchronized(dbLock)   { synchronized(cacheLock) { } }
// Thread 2: synchronized(cacheLock){ synchronized(dbLock)   { } }  //  reverse!
// -> circular wait -> frozen`,
        note: 'Inconsistent lock ordering = deadlock risk.',
      },
      {
        filename: 'FixConsistentOrder.java',
        language: 'java',
        code: `// FIX: හැමවිටම එකම global order එකෙන් locks ගන්න
void transfer(Account from, Account to) {
    // id අනුව order කරලා — හැම thread එකම එකම order එකෙන්
    Account first  = from.id < to.id ? from : to;
    Account second = from.id < to.id ? to : from;

    synchronized (first) {
        synchronized (second) {
            // safe — circular wait වෙන්නෙ නෑ
        }
    }
}`,
        note: 'Consistent lock ordering → deadlock වළක්වයි.',
      },
      {
        filename: 'TryLockTimeout.java',
        language: 'java',
        code: `// FIX 2: tryLock timeout — forever බලාගෙන ඉන්නෙ නැතුව
ReentrantLock lock = new ReentrantLock();
if (lock.tryLock(2, TimeUnit.SECONDS)) {   // 2s බලනවා, නැත්නම් අත්හරිනවා
    try { /* work */ } finally { lock.unlock(); }
} else {
    log.warn("lock ගන්න බැරි වුණා — retry/skip");   // deadlock වෙනුවට graceful
}`,
        note: 'tryLock(timeout) → forever hang වෙනුවට graceful fail.',
      },
    ],
    mortar:
      'Mortar multiple resources (DB + Redis cache + external API) lock කරන jobs deadlock වෙන්න පුළුවන්. Consistent lock ordering + `tryLock` timeouts (2.4.6.4) වලින් වළක්වනවා — sync pipeline එක hang වෙන්නෙ නෑ. Starvation වළක්වන්න fair thread pools + priority balancing. Production concurrency bugs (hangs, frozen jobs) වල #1 හේතුව මේවා — ඒ නිසා locks හැකි තරම් අඩුවෙන්/කුඩාවට, consistent order එකෙන්.',
    keyPoints: [
      'Deadlock = circular wait (frozen); Livelock = active no-progress; Starvation = no turn.',
      'Fix: consistent lock ordering, `tryLock(timeout)`, fairness.',
      'Locks හැකි තරම් අඩුවෙන් + කුඩාවට + එකම order එකෙන්.',
      'Deadlock = production hangs වල common cause.',
    ],
    pitfalls: [
      'Nested locks වෙනස් orders වලින් ගැනීම — #1 deadlock cause. Global ordering define කරන්න.',
      'Livelock deadlock වගේ පේන්නෙ නෑ (threads busy) — ඒත් progress නෑ; detect කරන්න අමාරුයි.',
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
