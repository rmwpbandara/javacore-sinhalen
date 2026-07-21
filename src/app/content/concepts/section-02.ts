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
