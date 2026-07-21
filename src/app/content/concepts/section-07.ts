import { Concept } from '../../core/models/roadmap.model';

/** Section 7 — Spring Boot. */
export const SECTION_07: Record<string, Concept> = {
  '7.1.1': {
    summary: '@SpringBootApplication = @Configuration + @EnableAutoConfiguration + @ComponentScan. Auto-config classpath අනුව beans configure කරනවා.',
    sinhala: [
      {
        heading: 'Auto-configuration',
        body: '`@SpringBootApplication` annotations තුනක combo එකක්. `@EnableAutoConfiguration` classpath එකේ තියෙන දේ බලලා (`spring-boot-starter-web` තියෙනවා නම් Tomcat + Jackson auto-configure) sensible defaults දෙනවා — `@Conditional` annotations හරහා. Manual config අඩු, convention-over-configuration.',
      },
    ],
    analogy: 'නව flat එකකට ගියාම electricity/water කලින්ම connect කරලා තියෙනවා වගේ — ඔයාට setup කරන්න ඕන නෑ.',
    code: [
      {
        filename: 'MortarApp.java',
        language: 'java',
        code: `@SpringBootApplication          // config + auto-config + component-scan
public class MortarApp {
    public static void main(String[] args) {
        SpringApplication.run(MortarApp.class, args);
    }
}
// classpath has spring-boot-starter-web => embedded Tomcat, JSON, MVC auto-set`,
        note: 'One annotation + main() = fully wired app.',
      },
    ],
    mortar:
      'Mortar microservices හැම එකක්ම `@SpringBootApplication` — starters add කරාම DB, web, security auto-configure. Boilerplate config අඩු, teams business features වලට focus.',
    keyPoints: ['3-in-1 annotation.', 'Auto-config = classpath-driven defaults (@Conditional).', 'Convention over configuration.'],
  },

  '7.1.2': {
    summary: 'Starter dependencies = curated dependency bundles (spring-boot-starter-web, -data-jpa, -security) — version conflicts නෑ.',
    sinhala: [
      {
        heading: 'Curated bundles',
        body: 'Starter එකක් (`spring-boot-starter-data-jpa`) එකට ගැලපෙන compatible dependencies set එකක් transitively ගේනවා — versions Spring Boot BOM එකෙන් managed. Dependency hell අඩු. ඕන feature එකට starter එකක් add කරාම ready.',
      },
    ],
    analogy: 'Combo meal එකක් වගේ — burger, fries, drink වෙන වෙනම order කරන්නෙ නැතුව එක package එකක්.',
    code: [
      {
        filename: 'pom.xml',
        language: 'xml',
        code: `<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-web</artifactId>
</dependency>
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
<!-- versions managed by the Spring Boot BOM -->`,
        note: 'Starter = compatible deps, no version juggling.',
      },
    ],
    mortar:
      'Mortar services starters combine කරනවා: web (REST APIs), data-jpa (Postgres), security (auth), actuator (health), kafka. Version conflicts නැතුව feature stacks ඉක්මනට assemble.',
    keyPoints: ['Starter = curated transitive deps.', 'Versions via Spring Boot BOM.', 'Feature = add one starter.'],
  },

  '7.1.3': {
    summary: 'Embedded servers = Tomcat/Jetty/Undertow app එකට ඇතුලේ. `java -jar` = standalone runnable app.',
    sinhala: [
      {
        heading: 'Self-contained apps',
        body: 'Traditional වලදී WAR එකක් external server එකකට deploy කරනවා. Spring Boot embedded server එකක් (default Tomcat) fat JAR එකට bundle කරනවා — `java -jar app.jar` කරාම server එකත් ඇතුලේ run වෙනවා. Containers/microservices/cloud වලට perfect (12-factor).',
      },
    ],
    analogy: 'External generator එකක් ඕන නැති, battery built-in device එකක් වගේ — කෙලින්ම on කරන්න පුළුවන්.',
    code: [
      {
        filename: 'run.bash',
        language: 'bash',
        code: `mvn clean package
java -jar target/mortar-service.jar    # embedded Tomcat starts, no external server

# switch to Undertow/Jetty by swapping the starter
# spring-boot-starter-web (Tomcat) -> exclude + add starter-undertow`,
        note: 'Fat JAR = server included = container-friendly.',
      },
    ],
    mortar:
      'Mortar microservices fat JARs → Docker images (11.2.1) → Kubernetes pods (11.2.2). Embedded server නිසා "build once, run anywhere" — external app-server ops නෑ, cloud-native.',
    keyPoints: ['Embedded Tomcat/Jetty/Undertow.', 'java -jar = standalone app.', 'Container/cloud-native friendly.'],
  },

  '7.2.1': {
    summary: 'DispatcherServlet = Spring MVC front controller — හැම HTTP request එකම route කරලා handler එකට යවනවා.',
    sinhala: [
      {
        heading: 'Front controller',
        body: 'හැම request එකම `DispatcherServlet` එකට එනවා. ඒක HandlerMapping එකෙන් හරි controller method එක find කරලා, arguments resolve කරලා (HandlerAdapter), method call කරලා, result එක HttpMessageConverter (JSON) වලින් response එකට convert කරනවා. Central orchestrator.',
      },
    ],
    analogy: 'Airport control tower එකක් වගේ — හැම flight (request) එකම එතනින් හරි gate (controller) එකට route කරනවා.',
    code: [
      {
        filename: 'flow.txt',
        language: 'plaintext',
        code: `HTTP request
   -> DispatcherServlet (front controller)
   -> HandlerMapping   (find controller method)
   -> HandlerAdapter   (resolve args, invoke)
   -> Controller method
   -> HttpMessageConverter (object -> JSON)
   -> HTTP response`,
        note: 'DispatcherServlet = central request orchestrator.',
      },
    ],
    mortar:
      'Mortar REST API request එකක් (`GET /segments`) DispatcherServlet හරහා → SegmentController → JSON response. මේ flow තේරුම්ගැනීම custom filters, arg resolvers, error handling debug කරන්න වැදගත්.',
    keyPoints: ['Single front controller for all requests.', 'HandlerMapping → HandlerAdapter → Converter.', 'Objects ↔ JSON via message converters.'],
  },

  '7.2.2': {
    summary: '@RestController = @Controller + @ResponseBody — methods return objects → JSON (REST APIs).',
    sinhala: [
      {
        heading: 'REST vs MVC',
        body: '`@Controller` view names return කරනවා (server-side HTML/templates). `@RestController` = `@Controller` + `@ResponseBody` — return objects HttpMessageConverter වලින් directly JSON/XML body එකට. REST APIs වලට `@RestController`.',
      },
    ],
    analogy: '@Controller = full web page දෙනවා. @RestController = data (JSON) විතරක් දෙනවා (SPA/mobile වලට).',
    code: [
      {
        filename: 'SegmentController.java',
        language: 'java',
        code: `@RestController
@RequestMapping("/api/segments")
class SegmentController {
    private final SegmentService service;
    SegmentController(SegmentService s) { this.service = s; }

    @GetMapping
    List<SegmentDto> list() { return service.findAll(); }  // -> JSON array
}`,
        note: 'Return object → auto JSON (no view resolution).',
      },
    ],
    mortar:
      'Mortar backend = REST APIs for the Angular frontend. `@RestController` classes segments, customers, analytics JSON විදිහට serve කරනවා. `@Controller` (HTML) Mortar වගේ SPA එකකට අවශ්‍ය නෑ.',
    keyPoints: ['@RestController = @Controller + @ResponseBody.', 'Returns JSON/XML, not view names.', 'REST/SPA/mobile backends.'],
  },

  '7.2.3': {
    summary: '@RequestMapping + shortcuts (@GetMapping, @PostMapping...) = URLs + HTTP methods → controller methods map කරනවා.',
    sinhala: [
      {
        heading: 'Routing',
        body: '`@RequestMapping` class/method level එකේ base paths + methods define කරනවා. Shortcuts: `@GetMapping` (read), `@PostMapping` (create), `@PutMapping` (replace), `@PatchMapping` (partial), `@DeleteMapping`. REST conventions follow කරන්න.',
      },
    ],
    analogy: 'Building එකේ room number signs වගේ — කුමන URL එක කුමන method එකටද කියලා map.',
    code: [
      {
        filename: 'Mapping.java',
        language: 'java',
        code: `@RestController
@RequestMapping("/api/segments")
class SegmentController {
    @GetMapping           List<SegmentDto> list()            { ... }
    @GetMapping("/{id}")  SegmentDto get(@PathVariable id)   { ... }
    @PostMapping          SegmentDto create(@RequestBody..)  { ... }
    @DeleteMapping("/{id}") void delete(@PathVariable id)    { ... }
}`,
        note: 'HTTP verb + path → method (REST conventions).',
      },
    ],
    mortar:
      'Mortar segment/customer/audience APIs REST conventions follow කරනවා — `GET /segments`, `POST /segments`, `DELETE /segments/{id}`. Angular frontend එකට predictable, clean API surface.',
    keyPoints: ['@RequestMapping base; @GetMapping etc shortcuts.', 'Verb + path routing.', 'Follow REST conventions.'],
  },

  '7.2.4': {
    summary: 'Request data binding: @PathVariable (URL segment), @RequestParam (query), @RequestBody (JSON body), @RequestHeader.',
    sinhala: [
      {
        heading: 'Binding annotations',
        body: '`@PathVariable` — URL path එකේ value (`/segments/{id}`). `@RequestParam` — query params (`?page=2&size=50`). `@RequestBody` — JSON body → object (POST/PUT). `@RequestHeader` — headers (Authorization, tenant). Spring automatic convert + validate.',
      },
    ],
    analogy: 'Form එකකේ වෙනස් fields වගේ — path, query, body, header වෙන වෙන තැන් වලින් data.',
    code: [
      {
        filename: 'Binding.java',
        language: 'java',
        code: `@GetMapping("/{id}/customers")
Page<CustomerDto> customers(
    @PathVariable String id,
    @RequestParam(defaultValue = "0") int page,
    @RequestParam(defaultValue = "50") int size,
    @RequestHeader("X-Brand-Id") String brandId) {
    return service.customers(id, brandId, page, size);
}`,
        note: 'Path/query/body/header — each bound automatically.',
      },
    ],
    mortar:
      'Mortar paginated customer grid API: `@PathVariable` segment id, `@RequestParam` page/size/filters, `@RequestHeader` tenant/brand id (multi-tenant), `@RequestBody` segment definitions. Clean, typed binding.',
    keyPoints: ['@PathVariable/@RequestParam/@RequestBody/@RequestHeader.', 'Auto type-conversion + defaults.', 'Body = JSON→object.'],
  },

  '7.2.5.1': {
    summary: '@ExceptionHandler = controller එකක් ඇතුලේ specific exceptions handle කරලා custom responses දෙනවා.',
    sinhala: [
      {
        heading: 'Local exception handling',
        body: 'Controller එකක් ඇතුලේ `@ExceptionHandler(X.class)` method එකක් — ඒ controller එකේ methods throw කරන X exceptions catch කරලා custom HTTP response (status + body) දෙනවා. Try-catch scatter නොකර declarative.',
      },
    ],
    analogy: 'Department එකක තමන්ගේම complaints desk එකක් වගේ — ඒ දෙපාර්තමේන්තුවේ ප්‍රශ්න එතන handle.',
    code: [
      {
        filename: 'ExceptionHandler.java',
        language: 'java',
        code: `@RestController
class SegmentController {
    @ExceptionHandler(NotFoundException.class)
    ResponseEntity<ApiError> handle(NotFoundException ex) {
        return ResponseEntity.status(404)
            .body(new ApiError("SEGMENT_NOT_FOUND", ex.getMessage()));
    }
}`,
        note: 'Exception → clean HTTP response (no scattered try-catch).',
      },
    ],
    mortar:
      'Mortar controllers domain exceptions (`SegmentNotFound`, `SyncQuotaExceeded`) `@ExceptionHandler` වලින් clean JSON errors වලට map — frontend එකට consistent error contract.',
    keyPoints: ['Controller-scoped exception → response mapping.', 'Declarative, no try-catch clutter.', 'Custom status + body.'],
  },

  '7.2.5.2': {
    summary: '@RestControllerAdvice = global exception handling හැම controller එකටම — centralized error handling.',
    sinhala: [
      {
        heading: 'Global handling',
        body: '`@ControllerAdvice` (+ `@ResponseBody` = `@RestControllerAdvice`) එකෙන් `@ExceptionHandler` methods application-wide apply. එක තැනකින් හැම controller එකකම exceptions consistent විදිහට handle — DRY + uniform error responses.',
      },
    ],
    analogy: 'හැම department එකටම පොදු central help desk එකක් වගේ — ඕන තැනකින් එන ප්‍රශ්නෙ එකම විදිහට handle.',
    code: [
      {
        filename: 'GlobalHandler.java',
        language: 'java',
        code: `@RestControllerAdvice
class GlobalExceptionHandler {
    @ExceptionHandler(NotFoundException.class)
    ResponseEntity<ApiError> notFound(NotFoundException ex) { ... 404 ... }

    @ExceptionHandler(AccessDeniedException.class)
    ResponseEntity<ApiError> denied(AccessDeniedException ex) { ... 403 ... }

    @ExceptionHandler(Exception.class)
    ResponseEntity<ApiError> generic(Exception ex) { ... 500 + alert ... }
}`,
        note: 'One place → all controllers get consistent errors.',
      },
    ],
    mortar:
      'Mortar `@RestControllerAdvice` එකෙන් හැම API එකකම errors uniform JSON shape (`{code, message, traceId}`). 500s ට proactive alerts (10.4) trigger. Frontend + support teams predictable errors.',
    keyPoints: ['Global exception handling (all controllers).', 'Consistent error contract (DRY).', 'Central place for alerts/logging.'],
  },

  '7.2.5.3': {
    summary: 'Custom error responses = structured error bodies (code, message, timestamp, traceId) — clients friendly.',
    sinhala: [
      {
        heading: 'Structured errors',
        body: 'Default Spring error page/JSON වෙනුවට, custom error DTO එකක් (machine-readable `code`, human `message`, `timestamp`, `traceId`, field errors) return කරනවා. Frontend localize/handle කරන්න, support debug කරන්න ලේසි.',
      },
    ],
    analogy: '"Error!" කියනවා වෙනුවට "SEGMENT_NOT_FOUND: id s99, trace abc123" වගේ actionable message.',
    code: [
      {
        filename: 'ApiError.java',
        language: 'java',
        code: `public record ApiError(
    String code,           // machine-readable
    String message,        // human-readable
    Instant timestamp,
    String traceId,        // ties to logs/tracing
    Map<String, String> fieldErrors  // for validation
) {}`,
        note: 'Structured errors = frontend + support friendly.',
      },
    ],
    mortar:
      'Mortar APIs structured `ApiError` return කරනවා — Angular frontend එකට error code එකෙන් localized message පෙන්නන්න, `traceId` එකෙන් distributed tracing (8.2.6) logs එකට tie කරන්න. Great DX.',
    keyPoints: ['code + message + timestamp + traceId + fieldErrors.', 'Machine + human readable.', 'traceId ties to logs/tracing.'],
  },

  '7.2.6': {
    summary: '@Valid + Bean Validation (Hibernate Validator) = incoming requests declaratively validate (@NotNull, @Email...).',
    sinhala: [
      {
        heading: 'Declarative validation',
        body: 'DTO fields වල constraints (`@NotBlank`, `@Email`, `@Min`, `@Size`) දාලා, controller එකේ `@Valid @RequestBody` කරාම Spring automatic validate කරනවා. Fail වුනොත් `MethodArgumentNotValidException` (→ 400 + field errors). Manual if-checks අඩු.',
      },
    ],
    analogy: 'Form validation වගේ — required fields, email format automatic check, wrong නම් submit වෙන්නෙ නෑ.',
    code: [
      {
        filename: 'Validation.java',
        language: 'java',
        code: `record CreateSegment(
    @NotBlank String name,
    @Min(0) double minSpend,
    @Email String notifyEmail) {}

@PostMapping
SegmentDto create(@Valid @RequestBody CreateSegment req) {  // auto-validated
    return service.create(req);
}`,
        note: '@Valid → auto validation → 400 + field errors on failure.',
      },
    ],
    mortar:
      'Mortar segment/upload/user APIs `@Valid` DTOs — invalid segment definitions, bad emails, negative thresholds request boundary එකේම reject. Bad data pipeline එකට කවදාවත් යන්නෙ නෑ (data quality).',
    keyPoints: ['@Valid + constraints (@NotBlank/@Email/@Min).', 'Auto 400 + field errors.', 'Validate at the boundary.'],
  },

  '7.2.7': {
    summary: 'HATEOAS = responses වල related actions වලට links include කරනවා — self-descriptive REST APIs.',
    sinhala: [
      {
        heading: 'Hypermedia',
        body: 'HATEOAS (Hypermedia as the Engine of Application State) — resource එකක් එක්කම ඒකට කරන්න පුළුවන් next actions (links: self, sync, delete) response එකේ. Client එකට URLs hardcode කරන්නෙ නැතුව, links follow කරන්න පුළුවන් — evolvable APIs. Practice එකේ optional (added complexity).',
      },
    ],
    analogy: 'Web page එකක links වගේ — දැන් කොහෙද යන්න පුළුවන් කියලා page එකෙන්ම පේනවා, URLs මතක තියාගන්න ඕන නෑ.',
    code: [
      {
        filename: 'Hateoas.java',
        language: 'java',
        code: `EntityModel<SegmentDto> get(@PathVariable String id) {
    SegmentDto seg = service.find(id);
    return EntityModel.of(seg,
        linkTo(methodOn(SegmentController.class).get(id)).withSelfRel(),
        linkTo(methodOn(SyncController.class).sync(id)).withRel("sync"));
}`,
        note: 'Response includes actionable links (self, sync).',
      },
    ],
    mortar:
      'Mortar segment response එකක් self + "sync-to-meta" + "export" links carry කරන්න පුළුවන් — frontend URLs hardcode නොකර available actions discover කරනවා. Enterprise API maturity; often optional.',
    keyPoints: ['Responses carry action links (hypermedia).', 'Self-descriptive, evolvable APIs.', 'Optional — weigh added complexity.'],
  },

  '7.3.1': {
    summary: 'Actuator = production-ready endpoints (health, info, metrics, env) — monitoring + ops out of the box.',
    sinhala: [
      {
        heading: 'Ops endpoints',
        body: '`spring-boot-starter-actuator` එකෙන් `/actuator/health` (up/down), `/metrics`, `/info`, `/env`, `/loggers` වගේ endpoints. Load balancers/K8s health checks, monitoring (Prometheus) වලට. Sensitive endpoints security එකෙන් protect කරන්න ඕන.',
      },
    ],
    analogy: 'රථයක dashboard එක වගේ — fuel, temperature, warnings ඔක්කොම එක බැල්මකින්.',
    code: [
      {
        filename: 'actuator.yml',
        language: 'yaml',
        code: `management:
  endpoints:
    web:
      exposure:
        include: health, info, metrics, prometheus
  endpoint:
    health:
      show-details: when-authorized

# GET /actuator/health -> {"status":"UP"}`,
        note: 'Health/metrics endpoints for K8s + monitoring.',
      },
    ],
    mortar:
      'Mortar microservices Actuator `/health` → Kubernetes liveness/readiness probes (11.2.2). `/metrics` → Prometheus dashboards. Connection health (PROJECT_IDEA 1.2), uptime monitoring — production observability.',
    keyPoints: ['health/info/metrics/env endpoints.', 'K8s probes + monitoring integration.', 'Secure sensitive endpoints.'],
  },

  '7.3.2': {
    summary: 'Custom health indicators = app-specific health checks (DB, connectors, Kafka) → /health status.',
    sinhala: [
      {
        heading: 'Custom checks',
        body: '`HealthIndicator` implement කරලා, app-specific dependencies (DB reachable, connector API up, Kafka connected) health එකට report කරනවා. Overall `/health` = ඔක්කොම indicators aggregate. එකක් DOWN නම් service DOWN — accurate readiness.',
      },
    ],
    analogy: 'Full body checkup එකක් වගේ — heart, lungs, blood වෙන වෙනම check කරලා overall health.',
    code: [
      {
        filename: 'ConnectorHealth.java',
        language: 'java',
        code: `@Component
class ShopifyHealthIndicator implements HealthIndicator {
    public Health health() {
        return shopifyApi.ping()
            ? Health.up().withDetail("latencyMs", 42).build()
            : Health.down().withDetail("reason", "api unreachable").build();
    }
}`,
        note: 'App-specific dependency → overall health status.',
      },
    ],
    mortar:
      'Mortar custom health indicators: Postgres, Redis, Kafka, each connector API. `/health` accurately reflects real readiness — K8s traffic route කරන්නෙ ඇත්තටම ready pods වලට. Connection-health UI එකටත් feed.',
    keyPoints: ['HealthIndicator = custom dependency checks.', 'Aggregated into /health.', 'Accurate readiness for K8s/monitoring.'],
  },

  '7.4.1': {
    summary: 'JPA = ORM specification (interface); Hibernate = the popular implementation. Spring Data JPA = repository abstraction on top.',
    sinhala: [
      {
        heading: 'Spec vs impl',
        body: 'JPA (Jakarta Persistence API) = ORM standard (annotations, EntityManager, JPQL) — interface. Hibernate = default implementation (provider). Spring Data JPA = boilerplate අඩු කරන repository layer (JPA උඩ). ORM = Java objects ↔ relational tables map කරලා SQL අඩුවෙන් ලියනවා.',
      },
    ],
    analogy: 'JPA = "USB standard". Hibernate = "SanDisk USB drive" (standard එක implement කරන brand එකක්).',
    code: [
      {
        filename: 'jpa.txt',
        language: 'plaintext',
        code: `JPA (spec)         -> @Entity, EntityManager, JPQL (the contract)
Hibernate (impl)   -> actually generates & runs the SQL
Spring Data JPA    -> CustomerRepository extends JpaRepository (no SQL)`,
        note: 'Spec → implementation → repository abstraction.',
      },
    ],
    mortar:
      'Mortar customer/product/sales data Postgres එකේ. JPA entities + Hibernate + Spring Data repositories වලින් object-oriented විදිහට access — raw SQL අඩු, type-safe, maintainable data layer.',
    keyPoints: ['JPA = spec; Hibernate = implementation.', 'Spring Data JPA = repository boilerplate remover.', 'ORM = objects ↔ tables.'],
  },

  '7.4.2': {
    summary: 'Entity lifecycle states: Transient (new), Persistent (managed), Detached (context closed), Removed (delete queued).',
    sinhala: [
      {
        heading: 'Persistence states',
        body: '`Transient` — `new` object, DB/context එකට connected නෑ. `Persistent/Managed` — persistence context එකේ tracked (changes auto-flush = dirty checking). `Detached` — කලින් managed, දැන් context closed (changes track වෙන්නෙ නෑ). `Removed` — delete scheduled. State තේරුම්ගැනීම update/save bugs වළක්වනවා.',
      },
    ],
    analogy: 'Employee: applicant (transient), active staff — auto-tracked (persistent), on leave (detached), resigned (removed).',
    code: [
      {
        filename: 'Lifecycle.java',
        language: 'java',
        code: `Customer c = new Customer("a@x.com");   // TRANSIENT
em.persist(c);                          // PERSISTENT (managed)
c.setCountry("LK");                     // auto-flushed (dirty checking) - no save() call!
// after tx/context closes -> DETACHED
em.remove(c);                           // REMOVED`,
        note: 'Managed entity වෙනස්කම් auto-flush (dirty checking).',
      },
    ],
    mortar:
      'Mortar enrichment එකේ managed customer entity එකක field එකක් set කරාම, explicit save නැතුව auto-persist වෙනවා (dirty checking). Detached entities update කරන්න merge ඕන — මේ නොදැන update lost වෙන bugs common.',
    keyPoints: ['Transient/Persistent/Detached/Removed.', 'Managed = dirty checking (auto-flush).', 'Detached updates need merge.'],
  },

  '7.4.3': {
    summary: '@Entity/@Table/@Id/@GeneratedValue = Java class එකක් DB table එකකට map කරනවා.',
    sinhala: [
      {
        heading: 'Mapping annotations',
        body: '`@Entity` — class = table. `@Table(name)` — table name. `@Id` — primary key. `@GeneratedValue` — auto-generate PK (IDENTITY/SEQUENCE/UUID). `@Column` — column mapping/constraints. Object model ↔ schema bridge.',
      },
    ],
    analogy: 'Class එකට "මේක මේ table එක, මේ field එක මේ column එක" කියලා label දානවා වගේ.',
    code: [
      {
        filename: 'CustomerEntity.java',
        language: 'java',
        code: `@Entity
@Table(name = "customers")
class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    private String country;
}`,
        note: 'Class → table, fields → columns, @Id → PK.',
      },
    ],
    mortar:
      'Mortar `Customer`, `Product`, `Sales` entities `@Entity` classes → Postgres tables. Golden-record id `@GeneratedValue`, email unique constraint DB-level — identity resolution integrity code + schema දෙකෙන්ම protect.',
    keyPoints: ['@Entity/@Table/@Id/@GeneratedValue/@Column.', 'PK generation strategies (IDENTITY/SEQUENCE/UUID).', 'Object model ↔ schema.'],
  },

  '7.4.4.1': {
    summary: 'Relationships: @OneToOne, @OneToMany, @ManyToOne, @ManyToMany — entities අතර associations map කරනවා.',
    sinhala: [
      {
        heading: 'Entity associations',
        body: '`@ManyToOne` (many orders → one customer, FK owning side), `@OneToMany` (one customer → many orders, `mappedBy`), `@OneToOne` (customer ↔ profile), `@ManyToMany` (customers ↔ segments, join table). Owning side (FK) + inverse side (`mappedBy`) නිවැරදිව define කරන්න ඕන.',
      },
    ],
    analogy: 'Family tree එකක relationships වගේ — parent-child (one-to-many), siblings/groups (many-to-many).',
    code: [
      {
        filename: 'Relations.java',
        language: 'java',
        code: `@Entity class Customer {
    @Id Long id;
    @OneToMany(mappedBy = "customer")   // inverse side
    List<Order> orders;
    @ManyToMany
    Set<Segment> segments;              // join table
}
@Entity class Order {
    @ManyToOne                          // owning side (FK customer_id)
    Customer customer;
}`,
        note: 'ManyToOne = owning (FK); OneToMany = mappedBy inverse.',
      },
    ],
    mortar:
      'Mortar model: Customer 1—* Orders (`@OneToMany`/`@ManyToOne`), Order 1—* OrderLines, Customer *—* Segments (`@ManyToMany`). Customer-360 (PROJECT_IDEA 2.6) profile මේ relationships traverse කරලා build.',
    keyPoints: ['ManyToOne (FK owning) / OneToMany (mappedBy) / OneToOne / ManyToMany.', 'Owning vs inverse side.', 'Maps real domain associations.'],
  },

  '7.4.4.2': {
    summary: 'Fetch types: LAZY (on-access) vs EAGER (immediate). N+1 problem = careless lazy loading → many queries.',
    sinhala: [
      {
        heading: 'LAZY/EAGER + N+1',
        body: '`LAZY` — association access කරනකොට විතරයි DB hit (default for collections). `EAGER` — parent load කරනකොටම. N+1 problem: customers 100ක් load කරලා, එකින් එකේ orders access කරාම extra 100 queries (1 + N). විසඳුම්: `JOIN FETCH`, `@EntityGraph`, batch fetching.',
      },
    ],
    analogy: 'LAZY = "ඕන වුනාම ගේන්නම්". EAGER = "දැන්ම ඔක්කොම ගේනවා". N+1 = හැම item එකකටම වෙන වෙනම trip 100ක්.',
    code: [
      {
        filename: 'NPlusOne.java',
        language: 'java',
        code: `// N+1: 1 query for customers + 1 query PER customer for orders
for (Customer c : customerRepo.findAll())
    c.getOrders().size();            //  extra query each time

// FIX: fetch join -> single query
@Query("SELECT c FROM Customer c JOIN FETCH c.orders")
List<Customer> findAllWithOrders();`,
        note: 'JOIN FETCH / @EntityGraph = kill N+1.',
      },
    ],
    mortar:
      'Mortar customer grid (millions of rows) careless lazy loading කලොත් N+1 explosion — DB overwhelmed. `@EntityGraph`/fetch joins + projections වලින් queries minimize — grid + Customer-360 fast.',
    keyPoints: ['LAZY (on-access, default collections) vs EAGER.', 'N+1 = 1 + N queries.', 'Fix: JOIN FETCH / @EntityGraph / batch.'],
    pitfalls: ['EAGER everywhere = over-fetching; LAZY without fetch plan = N+1. Measure queries.'],
  },

  '7.4.4.3': {
    summary: 'Cascade types = parent operations (persist, remove...) children වලට propagate කරනවා.',
    sinhala: [
      {
        heading: 'Cascade operations',
        body: '`CascadeType.PERSIST/MERGE/REMOVE/ALL` — parent save/delete කරනකොට children ටත් same operation. `orphanRemoval = true` — collection එකෙන් අයින් කරපු child delete. Composition (1.2.7) relationships වලට cascade හොඳයි; shared entities වලට danger (accidental delete).',
      },
    ],
    analogy: 'Order එකක් delete කරාම ඒකේ OrderLines ත් යනවා වගේ — parent operation children වලට flow.',
    code: [
      {
        filename: 'Cascade.java',
        language: 'java',
        code: `@Entity class Order {
    @OneToMany(mappedBy = "order",
               cascade = CascadeType.ALL,
               orphanRemoval = true)      // lines die with the order
    List<OrderLine> lines;
}
orderRepo.delete(order);                  // lines auto-deleted too`,
        note: 'Composition → cascade ALL + orphanRemoval.',
      },
    ],
    mortar:
      'Mortar Order → OrderLines composition (1.2.7): `cascade = ALL, orphanRemoval` — order delete කරාම lines auto-clean. ඒත් Customer ↔ Segment (shared, aggregation) වලට cascade REMOVE දැම්මොත් අහම්බෙන් segments delete — danger.',
    keyPoints: ['Cascade propagates parent ops to children.', 'orphanRemoval = delete removed children.', 'Composition = cascade; shared entities = careful.'],
  },

  '7.4.5': {
    summary: 'Spring Data repositories: JpaRepository/CrudRepository/PagingAndSortingRepository — CRUD + queries no boilerplate.',
    sinhala: [
      {
        heading: 'Repository abstraction',
        body: 'Interface එකක් `JpaRepository<Entity, Id>` extend කරාම — save/find/delete/count/pagination methods නොමිලේ. Derived query methods (`findByEmail`, `findByCountryAndTotalSpendGreaterThan`) method name එකෙන් auto-generate. Implementation Spring එකෙන් proxy.',
      },
    ],
    analogy: 'Fully-stocked toolkit එකක් වගේ — save/find/delete ඔක්කොම කලින්ම ready, ඔයා interface එක define කරනවා විතරයි.',
    code: [
      {
        filename: 'CustomerRepository.java',
        language: 'java',
        code: `interface CustomerRepository extends JpaRepository<Customer, Long> {
    Optional<Customer> findByEmail(String email);         // derived query
    Page<Customer> findByCountry(String c, Pageable page); // pagination
    long countByChurnStatus(ChurnStatus status);
}
// no implementation needed - Spring generates it`,
        note: 'Method name → query. Zero boilerplate.',
      },
    ],
    mortar:
      'Mortar `CustomerRepository`, `SegmentRepository` etc. derived queries + pagination — customer grid (`Page<Customer>`), identity lookup (`findByEmail`), churn counts. Data layer code minimal, focus on logic.',
    keyPoints: ['JpaRepository = CRUD + paging + sorting free.', 'Derived query methods (findByX).', 'No implementation code.'],
  },

  '7.4.6': {
    summary: 'JPQL (@Query) = entity-based queries; native queries = raw SQL when needed.',
    sinhala: [
      {
        heading: 'Custom queries',
        body: 'Derived methods මදි වුනොත් `@Query` — JPQL (entities/fields මත, DB-agnostic) හෝ `nativeQuery = true` (raw SQL, DB-specific features/performance). Projections (DTOs) වලට constructor expressions. Complex analytics වලට powerful.',
      },
    ],
    analogy: 'Ready-made meals (derived) මදි නම්, custom recipe (JPQL/SQL) එකක්.',
    code: [
      {
        filename: 'Queries.java',
        language: 'java',
        code: `@Query("SELECT c.country AS country, SUM(c.totalSpend) AS revenue " +
       "FROM Customer c GROUP BY c.country ORDER BY revenue DESC")
List<CountryRevenue> revenueByCountry();          // JPQL

@Query(value = "SELECT * FROM customers WHERE similarity(name, :q) > 0.4",
       nativeQuery = true)
List<Customer> fuzzyName(@Param("q") String q);   // native (Postgres pg_trgm)`,
        note: 'JPQL for portable; native for DB-specific features.',
      },
    ],
    mortar:
      'Mortar analytics ("revenue by country", "top products") JPQL aggregations. Identity resolution fuzzy matching Postgres `pg_trgm` native queries. Portable queries JPQL, performance-critical/DB-specific native.',
    keyPoints: ['@Query JPQL (portable) vs native SQL (DB-specific).', 'Projections/DTOs for analytics.', 'Use native for DB features/performance.'],
  },

  '7.4.7': {
    summary: '@Transactional = method එකක් atomic transaction එකක්. Propagation + isolation levels control කරනවා.',
    sinhala: [
      {
        heading: 'Declarative transactions',
        body: '`@Transactional` method එකක් transaction එකකින් wrap කරනවා — success නම් commit, exception (RuntimeException) නම් rollback (atomicity). `propagation` (REQUIRED default, REQUIRES_NEW, ...) nested transactions handle කරනවා. `isolation` concurrent access behaviour (9.1.2). Spring AOP proxy (5.3.2.4) එකෙන් apply.',
      },
    ],
    analogy: 'Bank transfer එකක් වගේ — debit + credit දෙකම success නම් විතරයි commit, එකක් fail නම් දෙකම rollback.',
    code: [
      {
        filename: 'Transactional.java',
        language: 'java',
        code: `@Service
class SalesResolutionService {
    @Transactional                         // atomic: all-or-nothing
    void resolveSale(RawSale raw) {
        Customer c = customerRepo.save(resolveCustomer(raw));
        Product p = productRepo.save(resolveProduct(raw));
        salesRepo.save(new Sale(c, p, raw.amount()));
        // any exception here -> everything rolls back
    }
}`,
        note: 'Exception → rollback; success → commit (atomicity).',
      },
    ],
    mortar:
      'Mortar sales resolution — customer + product + sale link එකම transaction එකක. Middle එකේ fail වුනොත් partial/corrupt data නෑ (all-or-nothing). Clean, trustworthy sales history (PROJECT_IDEA 2.3).',
    keyPoints: ['@Transactional = atomic (commit/rollback).', 'propagation (REQUIRED/REQUIRES_NEW) + isolation.', 'RuntimeException → rollback (checked → not, by default).'],
    pitfalls: ['Self-invocation (same class method call) = proxy bypass → @Transactional ignored.'],
  },

  '7.4.8': {
    summary: 'Hibernate caching: First-level (session, automatic), Second-level (across sessions), Query cache.',
    sinhala: [
      {
        heading: 'Caching levels',
        body: '`First-level` (session/persistence-context) — automatic, එකම session එකේ same entity ආයෙ query කරන්නෙ නෑ. `Second-level` (SessionFactory-wide, cross-session, opt-in — Ehcache/Redis) — read-mostly reference data. `Query cache` — query results cache. Cache invalidation ගැන පරෙස්සම් වෙන්න ඕන.',
      },
    ],
    analogy: 'First-level = කෙටිකාලීන memory (එක conversation එකේ). Second-level = shared long-term notebook (හැමෝටම).',
    code: [
      {
        filename: 'Caching.java',
        language: 'java',
        code: `@Entity
@Cacheable
@org.hibernate.annotations.Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
class Product {                    // second-level cached (read-mostly)
    @Id Long id;
    String normalizedName;
}
// first-level is automatic within a persistence context / transaction`,
        note: 'Read-mostly reference data → second-level cache.',
      },
    ],
    mortar:
      'Mortar normalized product master / reference data (read-mostly) second-level cache — repeated resolution/analytics lookups DB hit අඩු. Fast-changing customer data cache කරන්නෙ නෑ (invalidation complexity). Redis (9.3.1) app-level cache.',
    keyPoints: ['L1 (session, auto) / L2 (cross-session, opt-in) / query cache.', 'Read-mostly data → L2.', 'Invalidation is the hard part.'],
  },

  '7.5.1': {
    summary: 'Authentication = "කවුද?" (identity verify); Authorization = "මොනවා කරන්න පුළුවන්ද?" (permissions).',
    sinhala: [
      {
        heading: 'AuthN vs AuthZ',
        body: '`Authentication` (AuthN) — user identity verify (username/password, token, OAuth). `Authorization` (AuthZ) — authenticated user ට කුමන resources/actions access ද (roles/permissions). AuthN මුලින්, AuthZ ඊට පස්සේ. Spring Security දෙකම handle කරනවා.',
      },
    ],
    analogy: 'Airport එකේ: passport check = authentication (කවුද). Boarding pass = authorization (කුමන flight එකට).',
    code: [
      {
        filename: 'authn-authz.txt',
        language: 'plaintext',
        code: `Authentication: verify WHO you are
   - login, JWT token, OAuth2 sign-in

Authorization:  decide WHAT you may do
   - roles (ADMIN, ANALYST), permissions, tenant scope
   - @PreAuthorize("hasRole('ADMIN')")`,
        note: 'AuthN (identity) first, then AuthZ (permissions).',
      },
    ],
    mortar:
      'Mortar: enterprise SSO / login = authentication. Role-based access (PROJECT_IDEA 10.2) — menus, data, sensitive-field visibility = authorization. Multi-brand isolation — user brand X data විතරයි (tenant-scoped AuthZ).',
    keyPoints: ['AuthN = who (identity); AuthZ = what (permissions).', 'AuthN first, then AuthZ.', 'Roles/permissions/tenant scope.'],
  },

  '7.5.2': {
    summary: 'SecurityFilterChain = Spring Security එකේ configurable filter pipeline (modern; WebSecurityConfigurerAdapter deprecated).',
    sinhala: [
      {
        heading: 'Filter chain config',
        body: 'Modern Spring Security `SecurityFilterChain` bean එකකින් configure — කුමන endpoints authenticate ඕන, කුමන public, CSRF/CORS, session policy, auth mechanism. පරණ `WebSecurityConfigurerAdapter` deprecated — component-based lambda DSL දැන්.',
      },
    ],
    analogy: 'Security checkpoints series එකක් වගේ — request එක filters ගණනාවක් හරහා (auth, authz, csrf) යනවා.',
    code: [
      {
        filename: 'SecurityConfig.java',
        language: 'java',
        code: `@Bean
SecurityFilterChain chain(HttpSecurity http) throws Exception {
    return http
        .authorizeHttpRequests(a -> a
            .requestMatchers("/actuator/health", "/login").permitAll()
            .requestMatchers("/api/admin/**").hasRole("ADMIN")
            .anyRequest().authenticated())
        .oauth2ResourceServer(o -> o.jwt(Customizer.withDefaults()))
        .build();
}`,
        note: 'Modern lambda DSL SecurityFilterChain bean.',
      },
    ],
    mortar:
      'Mortar API gateway/services `SecurityFilterChain` — public (health, login), authenticated (APIs), admin-only (brand management). JWT resource server config. Central, declarative security posture.',
    keyPoints: ['SecurityFilterChain bean (modern config).', 'WebSecurityConfigurerAdapter deprecated.', 'Per-path rules + auth mechanism.'],
  },

  '7.5.3': {
    summary: 'Password encoding (BCrypt) = passwords plain-text නෙවෙයි, salted one-way hash විදිහට store කරනවා.',
    sinhala: [
      {
        heading: 'Never store plain text',
        body: 'Passwords කවදාවත් plain-text store කරන්නෙ නෑ. `BCryptPasswordEncoder` salted, slow, one-way hash — brute-force අමාරු. Login එකේදී input එක hash කරලා stored hash එකට `matches()`. `PasswordEncoder` interface එකෙන් algorithm swap කරන්න පුළුවන්.',
      },
    ],
    analogy: 'Password එක blender එකකින් smoothie එකක් කරනවා වගේ — ආපහු original එකට හදන්න බෑ (one-way).',
    code: [
      {
        filename: 'Passwords.java',
        language: 'java',
        code: `@Bean PasswordEncoder encoder() { return new BCryptPasswordEncoder(); }

// register: store hash, never the raw password
String hash = encoder.encode(rawPassword);

// login: compare
boolean ok = encoder.matches(rawPassword, storedHash);`,
        note: 'Salted, slow, one-way — store hash only.',
      },
    ],
    mortar:
      'Mortar self-service signup / password reset (PROJECT_IDEA 10.2) — passwords BCrypt hashed. DB breach එකකදී පවා raw passwords expose වෙන්නෙ නෑ. Security best practice, compliance.',
    keyPoints: ['BCrypt = salted, slow, one-way hash.', 'Store hash, never plain text.', 'matches() for verification.'],
  },

  '7.5.4': {
    summary: 'JWT = stateless, signed token carrying claims — server session නැතුව scalable auth.',
    sinhala: [
      {
        heading: 'Stateless tokens',
        body: 'JWT (JSON Web Token) = header.payload.signature — claims (userId, roles, brandId, expiry) signed. Login එකේදී server token issue කරනවා, client හැම request එකකම `Authorization: Bearer` header එකේ එවනවා. Server signature verify කරලා claims trust — server-side session නෑ (stateless, horizontally scalable).',
      },
    ],
    analogy: 'Concert wristband එකක් වගේ — එක පාරක් verify කරලා දුන්නම, ආයෙ ID check නැතුව signature එකෙන් trust.',
    code: [
      {
        filename: 'Jwt.java',
        language: 'java',
        code: `// issue on login
String token = Jwts.builder()
    .subject(user.getId())
    .claim("roles", user.getRoles())
    .claim("brandId", user.getBrandId())
    .expiration(Date.from(now.plus(1, HOURS)))
    .signWith(secretKey)
    .compact();

// every request: verify signature -> trust claims (no DB/session lookup)`,
        note: 'Signed claims = stateless, scalable auth.',
      },
    ],
    mortar:
      'Mortar token-based API security + automatic session refresh (PROJECT_IDEA 10.5) JWT — stateless nature නිසා microservices/pods across scale කරන්න session-store bottleneck නෑ. `brandId` claim tenant isolation එකට.',
    keyPoints: ['JWT = signed claims (stateless).', 'Bearer header each request; verify signature.', 'Horizontally scalable (no session store).'],
    pitfalls: ['JWT revoke කරන්න අමාරු — short expiry + refresh tokens use කරන්න.'],
  },

  '7.5.5': {
    summary: 'OAuth2 = delegated authorization; OIDC = OAuth2 + identity layer (login/SSO).',
    sinhala: [
      {
        heading: 'Delegated auth + SSO',
        body: 'OAuth2 — passwords share නොකර third-party resources access කරන්න authorization (access tokens, scopes). OIDC (OpenID Connect) — OAuth2 උඩ identity layer (`id_token`) — "who logged in" (SSO, social login). Enterprise SSO, "Sign in with Google" මේවා.',
      },
    ],
    analogy: 'Hotel valet key එකක් වගේ — car park කරන්න පුළුවන් (scope), ඒත් trunk/glovebox නෑ. Password දෙන්නෙ නෑ.',
    code: [
      {
        filename: 'oauth.yml',
        language: 'yaml',
        code: `spring:
  security:
    oauth2:
      client:
        registration:
          google:
            client-id: \${GOOGLE_CLIENT_ID}
            client-secret: \${GOOGLE_CLIENT_SECRET}
            scope: openid, email, profile   # OIDC
# resource servers validate the issued JWT access tokens`,
        note: 'OAuth2 authorization + OIDC identity (openid scope).',
      },
    ],
    mortar:
      'Mortar "enterprise single sign-on built on OAuth2/OpenID Connect" (PROJECT_IDEA 10.5). Users org SSO/Google වලින් login (OIDC), platform APIs OAuth2 tokens වලින් secure. Ad-platform connectors (Google/Meta) OAuth2 වලින් authorize.',
    keyPoints: ['OAuth2 = delegated authorization (tokens/scopes).', 'OIDC = OAuth2 + identity (SSO/login).', 'Enterprise SSO + third-party connectors.'],
  },

  '7.5.6': {
    summary: 'Method-level security: @PreAuthorize/@PostAuthorize = per-method fine-grained authorization with SpEL.',
    sinhala: [
      {
        heading: 'Fine-grained AuthZ',
        body: '`@PreAuthorize` — method එකට කලින් SpEL condition check (roles, ownership, tenant). `@PostAuthorize` — return එකෙන් පස්සේ (returned object මත check). URL-level security එකට වඩා granular — business method level. `@EnableMethodSecurity` enable කරන්න ඕන.',
      },
    ],
    analogy: 'හැම කාමරෙකටම වෙන වෙනම access card check එකක් — building entrance (URL) එකට අමතරව.',
    code: [
      {
        filename: 'MethodSecurity.java',
        language: 'java',
        code: `@PreAuthorize("hasRole('ADMIN') and #brandId == authentication.principal.brandId")
void deleteBrand(String brandId) { }        // admin + own tenant only

@PostAuthorize("returnObject.brandId == authentication.principal.brandId")
Customer getCustomer(Long id) { return repo.find(id); } // tenant-scoped result`,
        note: 'SpEL: roles + ownership + tenant checks per method.',
      },
    ],
    mortar:
      'Mortar tenant isolation + role-based access `@PreAuthorize` — "user තමන්ගේ brand එකේ data විතරයි", "sensitive PII admin විතරයි". `@PostAuthorize` returned records tenant-scope. Complete tenant isolation (PROJECT_IDEA 10.5).',
    keyPoints: ['@PreAuthorize / @PostAuthorize with SpEL.', 'Roles + ownership + tenant per method.', 'Granular beyond URL security.'],
  },

  '7.5.7': {
    summary: 'CORS = cross-origin browser requests control; CSRF = forged request protection.',
    sinhala: [
      {
        heading: 'CORS + CSRF',
        body: '`CORS` — browser එකක් වෙන origin එකකින් (Angular app → API domain) request කරනකොට, server allowed origins/methods/headers declare කරන්නම ඕන. `CSRF` — logged-in user එකෙන් අනවසර action forge කරන attack; token-based protection. Stateless JWT APIs වල බොහෝවිට CSRF disable (session cookies නෑ).',
      },
    ],
    analogy: 'CORS = "කුමන ගෙවල් වලට කතා කරන්න පුළුවන්ද" list එකක්. CSRF = "මේ request එක ඇත්තටම ඔයාගෙන්ද?" verify.',
    code: [
      {
        filename: 'CorsCsrf.java',
        language: 'java',
        code: `http
  .cors(c -> c.configurationSource(request -> {
      var cfg = new CorsConfiguration();
      cfg.setAllowedOrigins(List.of("https://app.mortar.ai"));
      cfg.setAllowedMethods(List.of("GET","POST","PUT","DELETE"));
      return cfg;
  }))
  .csrf(csrf -> csrf.disable());   // stateless JWT API -> CSRF not needed`,
        note: 'CORS allow Angular origin; CSRF off for stateless JWT.',
      },
    ],
    mortar:
      'Mortar Angular frontend (app.mortar.ai) → API domain: CORS allowed-origins config. Stateless JWT APIs (cookie-less) නිසා CSRF disable. Browser security + OWASP (11.3.1) alignment.',
    keyPoints: ['CORS = allow cross-origin (declare origins/methods).', 'CSRF = forged-request protection (token).', 'Stateless JWT APIs usually disable CSRF.'],
  },
};
