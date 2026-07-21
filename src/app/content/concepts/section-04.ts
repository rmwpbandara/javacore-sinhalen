import { Concept } from '../../core/models/roadmap.model';

/** Section 4 — JVM Internals & Memory Management. */
export const SECTION_04: Record<string, Concept> = {
  '4.1.1': {
    summary: 'ClassLoader subsystem = .class files JVM එකට load කරන එක. Bootstrap → Extension → Application (delegation).',
    sinhala: [
      {
        heading: 'Loading + delegation',
        body: 'ClassLoaders classes load කරනවා: `Bootstrap` (core JDK), `Platform/Extension` (jdk libs), `Application` (ඔයාගේ classpath). Parent-delegation model — child එක load කරන්න කලින් parent එකෙන් අහනවා. ඒ නිසා core classes override වෙන්නෙ නෑ (security). Loading → Linking (verify/prepare/resolve) → Initialization.',
      },
    ],
    analogy: 'Company එකක approval chain — ඉල්ලීම උඩට යවනවා, උඩ නැත්නම් තමයි කරන්නේ.',
    code: [
      {
        filename: 'ClassLoaders.java',
        language: 'java',
        code: `Class<?> c = Customer.class;
System.out.println(c.getClassLoader());              // AppClassLoader
System.out.println(String.class.getClassLoader());   // null = Bootstrap

// custom loader can load plugin connectors at runtime
ClassLoader plugin = new URLClassLoader(new URL[]{ jarUrl });`,
        note: 'Core classes (String) Bootstrap loader — getClassLoader() null.',
      },
    ],
    mortar:
      'Mortar "extensible connector framework" එකේ නව connectors runtime එකේ plugin JARs විදිහට custom `URLClassLoader` එකකින් load කරන්න පුළුවන් — main app restart නොකර නව data sources add.',
    keyPoints: ['Bootstrap/Platform/Application loaders.', 'Parent-delegation = security + no core override.', 'Custom loaders = runtime plugins.'],
  },

  '4.1.2': {
    summary: 'JVM memory areas: Heap (objects), Stack (method frames/locals), Method Area/Metaspace (class metadata), PC Register, Native Stack.',
    sinhala: [
      {
        heading: 'Runtime data areas',
        body: '`Heap` — objects හැම එකම (GC managed, shared). `Stack` — හැම thread එකකටම, method frames + local variables + references (LIFO). `Method Area/Metaspace` — class metadata, static fields. `PC Register` — current instruction (per thread). `Native Method Stack` — native (JNI) calls. Stack overflow vs Heap OOM වෙනස තේරුම්ගන්න මේ දැනුම වැදගත්.',
      },
    ],
    analogy: 'Heap = ලොකු shared warehouse (objects). Stack = හැම worker කෙනෙක්ගේම desk එකේ to-do notes (locals).',
    code: [
      {
        filename: 'Memory.java',
        language: 'java',
        code: `void resolve() {
    int count = 0;                       // local -> Stack
    Customer c = new Customer("a@x.com"); // object -> Heap, ref 'c' -> Stack
    // 'count', 'c' (reference) live on the stack frame
    // the Customer object lives on the heap
}
// deep recursion -> StackOverflowError
// millions of retained objects -> OutOfMemoryError: Java heap space`,
        note: 'Object heap එකේ; reference/primitive stack එකේ.',
      },
    ],
    mortar:
      'Mortar millions of customer objects heap එකේ. Identity-resolution jobs බොහෝ objects retain කලොත් heap OOM. Deep recursive tree-merge එකක් stack overflow. මේ areas තේරුම්ගැනීම tuning + debugging වලට critical.',
    keyPoints: ['Heap = objects (shared, GC). Stack = frames/locals (per thread).', 'Metaspace = class metadata/statics.', 'StackOverflow ≠ Heap OOM.'],
  },

  '4.1.3': {
    summary: 'Execution engine: Interpreter (bytecode line-by-line), JIT compiler (hot code → native), Profiler (hotspots detect).',
    sinhala: [
      {
        heading: 'Interpret + JIT',
        body: 'Bytecode මුලින් interpreter එකෙන් run වෙනවා (start fast). Profiler "hot" methods (නිතර run වෙන) detect කරලා, JIT compiler ඒවා native machine code වලට compile කරනවා (C1/C2) — repeated execution fast. ඒ නිසා Java "warm up" වෙනවා — long-running services වලට ideal.',
      },
    ],
    analogy: 'මුලින් recipe බලබලා උයනවා (interpret). නිතර උයන dish එක කටපාඩම් වෙනවා (JIT) — ඊට පස්සේ ඉක්මන්.',
    code: [
      {
        filename: 'jit.bash',
        language: 'bash',
        code: `# see JIT compilation happening
java -XX:+PrintCompilation MortarApp

# hot loops get compiled to native after ~10k invocations
# long-running Mortar services benefit most (warmed up JIT)`,
        note: 'Hot code JIT-compiled → native speed after warm-up.',
      },
    ],
    mortar:
      'Mortar prediction/resolution services long-running නිසා JIT warm-up එකෙන් hot scoring loops native speed වෙනවා. Benchmarks වලදී cold-start numbers නෙවෙයි, warmed-up throughput බලන්න ඕන.',
    keyPoints: ['Interpreter = fast start; JIT = fast repeat.', 'Profiler detects hotspots.', 'Long-running services warm up → faster.'],
  },

  '4.2.1': {
    summary: 'GC = unreachable objects automatically free කරනවා. Core: Mark (reachable find) + Sweep (rest free).',
    sinhala: [
      {
        heading: 'Automatic memory',
        body: 'Java manual `free()` නෑ — GC unreachable objects (GC roots වලින් reach කරන්න බැරි) find කරලා free කරනවා. Mark-and-Sweep: reachable objects mark, ඉතුරු sweep (reclaim). Modern GCs compaction (fragmentation අඩු) + generations use කරනවා. GC pause times performance එකට වැදගත්.',
      },
    ],
    analogy: 'ගෙදර නොපාවිච්චි කරන බඩු automatic අයින් කරන cleaner කෙනෙක් වගේ — ඔයාට manually throw කරන්න ඕන නෑ.',
    code: [
      {
        filename: 'GcDemo.java',
        language: 'java',
        code: `List<Customer> batch = loadBatch();   // reachable
processAndSave(batch);
batch = null;                          // now unreachable -> GC eligible
// no manual free(); GC reclaims when it runs

// help GC: don't hold references longer than needed`,
        note: 'Reference එක drop කරාම object GC-eligible.',
      },
    ],
    mortar:
      'Mortar batch processing එකේ, process කරපු batch එකේ references drop කරලා GC ට reclaim කරන්න දෙනවා — millions of records stream කරනකොට constant memory. References අනවශ්‍යව hold කලොත් OOM.',
    keyPoints: ['GC = automatic reclaim of unreachable objects.', 'Mark (reachable) + Sweep (free).', 'Drop references ASAP — help GC.'],
  },

  '4.2.2': {
    summary: 'Heap generations: Young (Eden + Survivors, short-lived), Old (long-lived), Metaspace (class metadata).',
    sinhala: [
      {
        heading: 'Generational hypothesis',
        body: '"බොහෝ objects ඉක්මනට die වෙනවා" — ඒ නිසා heap එක Young (Eden + 2 Survivor spaces) + Old වලට බෙදනවා. නව objects Eden. Minor GC survivors promote කරනවා, කිහිප වතාවක් survive වුනොත් Old එකට. Old GC (Major/Full) අඩුවෙන් ඒත් expensive. Metaspace = class metadata (native memory).',
      },
    ],
    analogy: 'නවකයෝ (Young gen) — ගොඩක් ඉක්මනට යනවා. Survive වුනු අය (Old gen) — dedicated, කලක් ඉන්නවා.',
    code: [
      {
        filename: 'generations.bash',
        language: 'bash',
        code: `# size the young generation for high-allocation workloads
java -Xms4g -Xmx4g -Xmn1500m -XX:+UseG1GC MortarApp

# Young: short-lived batch objects (Eden)
# Old:   caches, long-lived golden records`,
        note: 'Short-lived batch objects Young; caches Old.',
      },
    ],
    mortar:
      'Mortar batch enrichment objects short-lived (Young gen, cheap Minor GC). Long-lived caches / golden-record indexes Old gen. Young gen හරියට size කරාම, high-allocation batch jobs වල GC pauses අඩු.',
    keyPoints: ['Young (Eden+Survivors) = short-lived; Old = long-lived.', 'Minor GC (cheap) vs Full GC (expensive).', 'Metaspace = class metadata.'],
  },

  '4.2.3': {
    summary: 'GC algorithms: Serial (single-thread), Parallel (throughput), G1 (balanced, default), ZGC/Shenandoah (ultra-low pause).',
    sinhala: [
      {
        heading: 'තෝරගන්නේ කොහොමද',
        body: '`Serial` — single thread, small apps. `Parallel` — multi-thread, throughput-focused (batch). `G1` (default) — regions, predictable pauses, balanced. `ZGC`/`Shenandoah` — concurrent, sub-millisecond pauses, huge heaps (100s GB) — latency-critical services. Workload (throughput vs latency) අනුව තෝරනවා.',
      },
    ],
    analogy: 'Serial = එක cleaner. Parallel = cleaners ගොඩක් (ඉක්මන් ඒත් ඔක්කොම නවතිනවා). ZGC = කිසිම නවතාලීමක් නැතුව පිරිසිදු කරන cleaners.',
    code: [
      {
        filename: 'gc-choice.bash',
        language: 'bash',
        code: `# batch/analytics: maximise throughput
java -XX:+UseParallelGC MortarBatchJob

# low-latency API: minimise pause times
java -XX:+UseZGC MortarApiService`,
        note: 'Throughput → Parallel; latency → G1/ZGC.',
      },
    ],
    mortar:
      'Mortar batch resolution jobs Parallel GC (throughput). Real-time API + Copilot services ZGC/G1 (low pause — user-facing latency). Workload එකට GC එක match කරාම user experience + cost දෙකම හොඳයි.',
    keyPoints: ['Serial/Parallel/G1(default)/ZGC/Shenandoah.', 'Throughput (batch) vs latency (services).', 'ZGC/Shenandoah = sub-ms pauses, huge heaps.'],
  },

  '4.2.4': {
    summary: 'Memory leaks = unused objects unintentionally reachable → OOM. Heap dumps වලින් identify කරනවා.',
    sinhala: [
      {
        heading: 'Java-style leaks',
        body: 'Java GC තිබුණත් leaks වෙනවා — objects reachable තියෙනවා නම් (unintended references) GC free කරන්නෙ නෑ. Common causes: static collections growing, unclosed resources, listener/ThreadLocal not removed, cache without eviction. Heap dump (`jmap`) + analyser (MAT/VisualVM) වලින් "dominator" objects find කරනවා.',
      },
    ],
    analogy: 'නොපාවිච්චි කරන බඩුවක් "ඕන" list එකේ තියෙනවා නම් cleaner එක throw කරන්නෙ නෑ — leak එක.',
    code: [
      {
        filename: 'Leak.java',
        language: 'java',
        code: `// LEAK: static cache grows forever, never evicts
static final Map<String, Customer> CACHE = new HashMap<>();
void onLoad(Customer c) { CACHE.put(c.id(), c); }   // never removed -> OOM

// FIX: bounded cache with eviction (or ThreadLocal.remove())
// e.g. Caffeine / LinkedHashMap LRU / explicit cleanup`,
        note: 'Unbounded static collections = classic Java leak.',
      },
    ],
    mortar:
      'Mortar long-running services වල unbounded caches / un-removed ThreadLocal brand-context (2.4.7) leaks වෙන්න පුළුවන්. Heap dumps analyse කරලා bounded caches (eviction) + `remove()` වලින් fix කරනවා — 24/7 stability.',
    keyPoints: ['Leak = unintended reachability (GC can\'t free).', 'Static collections/unclosed/ThreadLocal common.', 'Heap dump + MAT/VisualVM to find.'],
  },

  '4.2.5': {
    summary: 'GC tuning flags = heap size, GC algorithm, logging control — measure first, tune second.',
    sinhala: [
      {
        heading: 'Common flags',
        body: '`-Xms`/`-Xmx` (initial/max heap, prod එකේ සමාන කරන්න), `-Xmn` (young gen), `-XX:+UseG1GC` (GC), `-XX:MaxGCPauseMillis` (pause target), `-Xlog:gc*` (GC logging). Golden rule: measure (GC logs) → hypothesis → tune → re-measure. Blind tuning එපා.',
      },
    ],
    analogy: 'Doctor කෙනෙක් වගේ — කලින් diagnose (measure) කරන්නෙ නැතුව medicine (flags) දෙන්න එපා.',
    code: [
      {
        filename: 'tuning.bash',
        language: 'bash',
        code: `java -Xms8g -Xmx8g \\
     -XX:+UseG1GC \\
     -XX:MaxGCPauseMillis=100 \\
     -Xlog:gc*:file=gc.log:time \\
     MortarApp

# then analyse gc.log to verify pauses & throughput`,
        note: 'Xms = Xmx (prod), then log + analyse.',
      },
    ],
    mortar:
      'Mortar services GC logs collect කරලා (observability), pause spikes / high GC-overhead detect කරලා heap/GC flags tune කරනවා. Blind tuning නෙවෙයි — metrics-driven, SLA (latency) target කරලා.',
    keyPoints: ['-Xms/-Xmx/-Xmn/-XX:+UseG1GC/-Xlog:gc*.', 'Xms=Xmx in production.', 'Measure → tune → re-measure.'],
  },
};
