import { Concept } from '../../core/models/roadmap.model';

/** Section 6 — Spring Framework Fundamentals. */
export const SECTION_06: Record<string, Concept> = {
  '6.1.1': {
    summary: 'IoC = objects තමන් dependencies create කරනවා වෙනුවට, container එකක් ඒවා create + wire කරනවා (control inverted).',
    sinhala: [
      {
        heading: 'Inversion of Control',
        body: 'සාමාන්‍යයෙන් object එකක් තමන්ගේ dependencies `new` කරනවා (tight coupling). IoC වලදී ඒ control එක Spring container එකට handover කරනවා — container objects (beans) create කරලා, lifecycle manage කරලා, එකට wire කරනවා. ඔයාගේ code එක "framework එක call කරනවා" වෙනුවට "framework එක ඔයාව call කරනවා".',
      },
    ],
    analogy: 'Restaurant එකකට ගියාම කෑම හදන්නෙ නෑ — kitchen (container) හදලා serve කරනවා. ඔයා ඕන දේ දැනුම් දෙනවා විතරයි.',
    code: [
      {
        filename: 'IoC.java',
        language: 'java',
        code: `// WITHOUT IoC: object creates its own dependency (tight)
class ResolutionService {
    private final Repo repo = new PostgresRepo();  // hard-wired
}

// WITH IoC: container provides it
@Service
class ResolutionService {
    private final Repo repo;
    ResolutionService(Repo repo) { this.repo = repo; } // injected by Spring
}`,
        note: 'Spring container repo bean එක create කරලා inject කරනවා.',
      },
    ],
    mortar:
      'Mortar backend එකේ services, repositories, connectors හැම එකක්ම Spring container එකෙන් managed. Wiring/lifecycle framework එකට භාර දීලා, business logic එකට focus කරනවා. DIP (5.1.5) එකේ practical implementation එක.',
    keyPoints: ['Control of creation/wiring → container.', 'Loose coupling + testability.', 'DIP principle framework-level.'],
  },

  '6.1.2': {
    summary: 'DI = dependencies object එකට "inject" කරන ක්‍රමය. Constructor (best), Setter, Field injection.',
    sinhala: [
      {
        heading: 'තුන් ක්‍රමය',
        body: '`Constructor injection` (recommended) — dependencies final, immutable, mandatory, testable. `Setter injection` — optional dependencies වලට. `Field injection` (`@Autowired` field එකක) — concise ඒත් testing අමාරු, immutability නෑ (avoid). Constructor injection modern Spring default.',
      },
    ],
    analogy: 'Tool box එකක් වැඩට එනකොටම දෙනවා (constructor) — වැඩ මැද්දෙ එකින් එක ඉල්ලනවා (field) වෙනුවට.',
    code: [
      {
        filename: 'DI.java',
        language: 'java',
        code: `@Service
class SegmentService {
    private final CustomerRepo repo;
    private final AudienceSync sync;

    // constructor injection: final, testable, explicit deps
    SegmentService(CustomerRepo repo, AudienceSync sync) {
        this.repo = repo;
        this.sync = sync;
    }
}`,
        note: 'Constructor injection = immutable + easy to unit test.',
      },
    ],
    mortar:
      'Mortar services constructor injection වලින් dependencies ගන්නවා — unit tests වලදී mock repos/syncs inject කරන්න පුළුවන් (5.1.5 DIP). Field injection avoid — testing + immutability නිසා.',
    keyPoints: ['Constructor injection = best (final, testable).', 'Setter = optional deps; Field = avoid.', 'Explicit deps = clear + mockable.'],
  },

  '6.1.3': {
    summary: 'BeanFactory = basic IoC container (lazy); ApplicationContext = enterprise superset (eager, events, i18n, AOP).',
    sinhala: [
      {
        heading: 'දෙකේ වෙනස',
        body: '`BeanFactory` = basic container, lazy init (bean ඉල්ලනකොට create). `ApplicationContext` = BeanFactory extend කරලා enterprise features — eager singleton init (startup එකේ fail-fast), event publishing, internationalization, annotation config, AOP integration. Practice එකේ හැමවිටම ApplicationContext.',
      },
    ],
    analogy: 'BeanFactory = basic phone. ApplicationContext = smartphone (basic + apps + features).',
    code: [
      {
        filename: 'Context.java',
        language: 'java',
        code: `// Spring Boot gives you an ApplicationContext automatically
ApplicationContext ctx = SpringApplication.run(MortarApp.class, args);

SegmentService svc = ctx.getBean(SegmentService.class);
// eager init => misconfigured beans fail at startup, not mid-request`,
        note: 'ApplicationContext = fail-fast eager init + enterprise features.',
      },
    ],
    mortar:
      'Mortar Spring Boot app එකේ `ApplicationContext` — startup එකේදීම misconfigured beans (missing DB, bad connector config) fail-fast. Runtime එකේ mid-request surprise අඩු. Events වලින් (10.4) notifications decouple කරනවා.',
    keyPoints: ['BeanFactory = basic, lazy; ApplicationContext = enterprise, eager.', 'Eager init = fail-fast at startup.', 'Events/i18n/AOP = ApplicationContext.'],
  },

  '6.2.1': {
    summary: 'Bean lifecycle: instantiate → populate deps → init callbacks (@PostConstruct) → in-use → destroy (@PreDestroy).',
    sinhala: [
      {
        heading: 'Lifecycle callbacks',
        body: 'Container bean එකක් create කරලා, dependencies inject කරලා, `@PostConstruct` (init logic — connections open, caches warm) call කරනවා. Bean in-use. Shutdown එකේදී `@PreDestroy` (cleanup — connections close). InitializingBean/DisposableBean interfaces හෝ `@Bean(initMethod, destroyMethod)` විකල්ප.',
      },
    ],
    analogy: 'Employee onboarding → work → offboarding වගේ — join කරලා, setup (PostConstruct), වැඩ, resign කරනකොට handover (PreDestroy).',
    code: [
      {
        filename: 'Lifecycle.java',
        language: 'java',
        code: `@Service
class ConnectorPool {
    @PostConstruct
    void init() { /* open HTTP pools, warm caches */ }

    @PreDestroy
    void cleanup() { /* close pools, flush buffers */ }
}`,
        note: '@PostConstruct init; @PreDestroy graceful cleanup.',
      },
    ],
    mortar:
      'Mortar connection pools / metric registries `@PostConstruct` එකේ warm up, `@PreDestroy` එකේ gracefully close — deploy/restart එකකදී in-flight syncs corrupt වෙන්නෙ නෑ, resource leaks නෑ.',
    keyPoints: ['instantiate → inject → @PostConstruct → use → @PreDestroy.', 'Init = warm-up; destroy = cleanup.', 'Graceful shutdown = no leaks/corruption.'],
  },

  '6.2.2': {
    summary: 'Bean scopes: singleton (default, one per context), prototype (new each time), request/session (web).',
    sinhala: [
      {
        heading: 'Scopes',
        body: '`singleton` (default) — container එකකට instance එකයි, shared (stateless services වලට). `prototype` — inject/lookup එකකදී අලුත් instance. `request` — HTTP request එකකට එකක්. `session` — user session එකකට එකක්. `application`/`websocket` තවත්. Singleton beans stateless වෙන්න ඕන (thread-safety).',
      },
    ],
    analogy: 'Singleton = office එකේ shared printer (එකයි). Prototype = හැම කෙනෙක්ම ගන්න disposable cup (අලුත්).',
    code: [
      {
        filename: 'Scopes.java',
        language: 'java',
        code: `@Service                                   // singleton (default)
class SegmentService { /* stateless -> shared safely */ }

@Component
@Scope("prototype")                        // new instance each time
class ReportBuilder { /* stateful per-use */ }

@Component
@Scope(value = "request", proxyMode = ScopedProxyMode.TARGET_CLASS)
class RequestContext { String brandId; }   // per HTTP request`,
        note: 'Singleton beans stateless; stateful → prototype/request.',
      },
    ],
    mortar:
      'Mortar stateless services (resolution, segmentation) singleton. Per-request tenant/brand context request scope. Stateful builders (report/segment builders) prototype. Multi-tenant isolation එකට scope selection වැදගත්.',
    keyPoints: ['singleton (default, stateless) / prototype / request / session.', 'Singleton beans MUST be stateless/thread-safe.', 'Web scopes for per-request state.'],
  },

  '6.2.3': {
    summary: 'Stereotype annotations: @Component (generic), @Service (business), @Repository (data + exception translation), @Controller (web), @Bean (manual).',
    sinhala: [
      {
        heading: 'Bean declaration',
        body: '`@Component` — generic Spring-managed bean. `@Service` — business logic layer. `@Repository` — data access layer (+ automatic DB exception translation). `@Controller`/`@RestController` — web layer. `@Bean` — `@Configuration` class එකක method එකකින් manual bean (third-party classes වලට). Semantic clarity + layer-specific features.',
      },
    ],
    analogy: 'Company එකේ departments වගේ — Service (operations), Repository (records room), Controller (reception).',
    code: [
      {
        filename: 'Stereotypes.java',
        language: 'java',
        code: `@RestController class SegmentController { }   // web layer
@Service        class SegmentService    { }   // business layer
@Repository     class CustomerRepo      { }   // data layer (+ exc. translation)

@Configuration
class AppConfig {
    @Bean ObjectMapper objectMapper() { return new ObjectMapper(); } // 3rd-party bean
}`,
        note: 'Layer-specific stereotypes = clarity + features.',
      },
    ],
    mortar:
      'Mortar clean layered architecture: `@RestController` (segment/customer APIs), `@Service` (resolution/prediction logic), `@Repository` (JPA data access), `@Bean` (configure third-party clients — Kafka, S3, HTTP). Each layer clear.',
    keyPoints: ['@Component generic; @Service/@Repository/@Controller = layers.', '@Repository = DB exception translation.', '@Bean = manual/third-party beans.'],
  },

  '6.3.1.1': {
    summary: 'AOP terms: Aspect (cross-cutting module), Joinpoint (execution point), Pointcut (which joinpoints), Advice (what runs).',
    sinhala: [
      {
        heading: 'AOP building blocks',
        body: 'Cross-cutting concerns (logging, security, transactions) business code එකට scatter නොකර, Aspect එකකට extract කරනවා. `Joinpoint` = advice දාන්න පුළුවන් තැනක් (method execution). `Pointcut` = කුමන joinpoints ද තෝරන expression. `Advice` = එතන run වෙන code. `Aspect` = pointcut + advice bundle. Spring proxies (5.3.2.4) වලින් apply.',
      },
    ],
    analogy: 'Building එකකට හැම කාමරෙටම smoke detector දානවා වගේ — cross-cutting concern එකක් එක තැනකින් හැම තැනටම.',
    code: [
      {
        filename: 'Aspect.java',
        language: 'java',
        code: `@Aspect @Component
class AuditAspect {
    // Pointcut: all methods in service package
    @Around("execution(* com.mortar.service..*(..))")
    Object audit(ProceedingJoinPoint jp) throws Throwable {   // Advice
        long start = System.nanoTime();
        Object result = jp.proceed();                          // the joinpoint
        log.info("{} took {}ns", jp.getSignature(), System.nanoTime() - start);
        return result;
    }
}`,
        note: 'Pointcut = where; Advice = what; Aspect = both bundled.',
      },
    ],
    mortar:
      'Mortar audit logging, performance timing, tenant-security checks AOP aspects — business code (resolution/prediction) clutter නොකර, cross-cutting concerns centralize. නව service එකකට automatically apply වෙනවා.',
    keyPoints: ['Aspect = pointcut + advice.', 'Joinpoint = method exec; Pointcut = selector expression.', 'Cross-cutting concerns centralized.'],
  },

  '6.3.1.2': {
    summary: 'Advice types: Before, After, AfterReturning, AfterThrowing, Around (most powerful — wraps).',
    sinhala: [
      {
        heading: 'Advice වර්ග',
        body: '`@Before` — method එකට කලින්. `@After` — පස්සේ (finally වගේ, exception ආවත්). `@AfterReturning` — success return එකෙන් පස්සේ (result access). `@AfterThrowing` — exception එකකදී. `@Around` — before+after දෙකම, `proceed()` control, result modify පවා (most powerful).',
      },
    ],
    analogy: 'Function එකක් වටේ wrapper එකක් — before "hello", after "bye", around දෙකම + control.',
    code: [
      {
        filename: 'AdviceTypes.java',
        language: 'java',
        code: `@Aspect @Component
class SecurityAspect {
    @Before("@annotation(RequiresPii)")
    void checkPii(JoinPoint jp) { if (!currentUser().canViewPii())
        throw new AccessDeniedException(); }

    @AfterThrowing(pointcut = "execution(* com.mortar..*(..))", throwing = "ex")
    void alert(Exception ex) { alerts.notify(ex); }   // proactive error alert
}`,
        note: '@Around = full control; others = specific hooks.',
      },
    ],
    mortar:
      'Mortar `@Before` PII permission checks, `@AfterThrowing` proactive error alerts (10.4), `@Around` performance metrics + `@Transactional` (Spring එකේම around advice). Cross-cutting behaviour declaratively.',
    keyPoints: ['Before/After/AfterReturning/AfterThrowing/Around.', 'Around = wraps + controls proceed().', '@Transactional = around advice under the hood.'],
  },

  '6.3.2': {
    summary: 'Profiles = environment-specific beans/config (dev, test, prod). @Profile + application-{profile}.yml.',
    sinhala: [
      {
        heading: 'Environment config',
        body: '`@Profile("prod")` beans specific environments වලට activate කරනවා. `application-dev.yml`, `application-prod.yml` වලින් per-environment properties. Active profile `spring.profiles.active` වලින් set. එකම codebase එකෙන් dev/test/prod වෙනස් config — 12-factor (8.1.3) එකට align.',
      },
    ],
    analogy: 'එකම app එකට වෙනස් settings profiles — dev "test mode", prod "live mode".',
    code: [
      {
        filename: 'Profiles.java',
        language: 'java',
        code: `@Bean @Profile("dev")
DataSource devDb() { return new InMemoryDataSource(); }   // H2 for dev

@Bean @Profile("prod")
DataSource prodDb() { return new HikariDataSource(prodConfig); } // Postgres

// run: java -jar app.jar --spring.profiles.active=prod`,
        note: 'Environment අනුව හරි bean එක activate.',
      },
    ],
    mortar:
      'Mortar dev (in-memory/mock connectors), staging, prod (real Postgres/Kafka/Redis) profiles වලින් වෙනස් config. Secrets/URLs per-environment, codebase එක එකයි — safe promotion dev → prod.',
    keyPoints: ['@Profile + application-{profile}.yml.', 'spring.profiles.active selects.', 'Same code, env-specific config (12-factor).'],
  },

  '6.3.3': {
    summary: 'SpEL = Spring Expression Language — annotations/config වල runtime expressions evaluate කරනවා.',
    sinhala: [
      {
        heading: 'Expressions in config',
        body: 'SpEL (`#{...}`, properties වලට `${...}`) වලින් values, method calls, conditions annotations/XML වල evaluate කරනවා. `@Value("#{...}")`, security `@PreAuthorize("hasRole(...)")`, conditional beans වල use වෙනවා. Powerful ඒත් overuse කලොත් logic hidden වෙනවා.',
      },
    ],
    analogy: 'Config එකේ ඇතුලේම කුඩා formula එකක් වගේ — value එකක් calculate කරලා inject.',
    code: [
      {
        filename: 'SpEL.java',
        language: 'java',
        code: `@Value("\${mortar.batch.size:1000}")     // property with default
int batchSize;

@Value("#{ T(java.lang.Runtime).getRuntime().availableProcessors() }")
int workers;                              // SpEL expression

@PreAuthorize("hasRole('ADMIN') and #brandId == authentication.brandId")
void deleteBrand(String brandId) { }`,
        note: '${...} = property; #{...} = SpEL expression.',
      },
    ],
    mortar:
      'Mortar tunable params (batch size, worker count) `@Value` + SpEL වලින் config-driven. Method security `@PreAuthorize` SpEL වලින් tenant-scoped ("මේ brand එකට මේ user access ද") — multi-tenant safety.',
    keyPoints: ['SpEL = runtime expressions in annotations/config.', '${...} property vs #{...} expression.', 'Security/@Value/conditional beans — don\'t overuse.'],
  },
};
