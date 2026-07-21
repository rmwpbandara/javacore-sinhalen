import { Concept } from '../../core/models/roadmap.model';

/** Section 8 — Microservices Architecture. */
export const SECTION_08: Record<string, Concept> = {
  '8.1.1': {
    summary: 'Monolith = single deployable; Microservices = small independent services per capability. Trade-offs දෙකටම.',
    sinhala: [
      {
        heading: 'Monolith vs Microservices',
        body: 'Monolith — ඔක්කොම එක codebase/deployment එකක (simple, low latency, ඒත් scale/deploy coupling). Microservices — business capability අනුව බෙදපු, independently deployable/scalable services (flexibility, ඒත් distributed complexity: networking, data consistency, ops). කුඩා teams/products වලට monolith බොහෝවිට හොඳයි; scale එද්දී split.',
      },
    ],
    analogy: 'Monolith = එක ලොකු supermarket එකක්. Microservices = specialized shops street එකක් — වෙන වෙනම manage, ඒත් coordination ඕන.',
    code: [
      {
        filename: 'architecture.txt',
        language: 'plaintext',
        code: `Monolith:        [ web | resolution | prediction | activation ]  (1 deploy)

Microservices:   [connector-svc] [resolution-svc] [prediction-svc]
                 [activation-svc]  -- each: own deploy, scale, DB`,
        note: 'Split by business capability, not technical layer.',
      },
    ],
    mortar:
      'Mortar capabilities — ingestion, resolution, prediction, activation — independent scaling profiles (prediction = CPU-heavy, ingestion = IO-heavy). Microservices වලින් each independently scale/deploy. Start monolith, split as scale demands.',
    keyPoints: ['Monolith = simple/coupled; microservices = flexible/complex.', 'Split by business capability.', 'Don\'t start micro without a reason.'],
  },

  '8.1.2': {
    summary: 'DDD = domain model business language එකට align කරලා, Bounded Contexts වලින් boundaries define කරනවා.',
    sinhala: [
      {
        heading: 'Bounded Contexts',
        body: 'Domain-Driven Design — software model එක business domain + ubiquitous language එකට match. `Bounded Context` = model එකක් valid වෙන boundary (context එකකට "Customer" තේරුම වෙනස් වෙන්න පුළුවන්). Microservice boundaries බොහෝවිට bounded contexts. Aggregates, entities, value objects.',
      },
    ],
    analogy: '"Customer" කියන වචනෙ sales team එකට සහ support team එකට වෙනස් තේරුම් වගේ — each context එකට තමන්ගේම model.',
    code: [
      {
        filename: 'contexts.txt',
        language: 'plaintext',
        code: `Bounded Context: RESOLUTION   -> Customer = raw + golden records, matching
Bounded Context: ACTIVATION   -> Customer = a targetable audience member
Bounded Context: BILLING      -> Customer = an invoiced account

Same word, different model per context -> often a service boundary`,
        note: 'Bounded context boundaries ≈ microservice boundaries.',
      },
    ],
    mortar:
      'Mortar bounded contexts: Resolution (identity/golden records), Prediction (scored customer), Activation (audience member), Billing (account). Each context own model + likely own service — clean boundaries, less coupling.',
    keyPoints: ['DDD = model matches business language.', 'Bounded Context = model validity boundary.', 'Contexts guide service boundaries.'],
  },

  '8.1.3': {
    summary: '12-Factor App = cloud-native best practices (config in env, stateless, logs as streams, disposability...).',
    sinhala: [
      {
        heading: 'Cloud-native principles',
        body: '12-Factor = portable, scalable SaaS build කරන්න principles: config environment එකේ (6.3.2), backing services attached resources, stateless processes, port binding, disposability (fast start/graceful stop), dev/prod parity, logs = event streams. Containers/K8s වලට foundational.',
      },
    ],
    analogy: 'Cloud apps වලට "building code" එකක් වගේ — follow කරාම portable, scalable, maintainable.',
    code: [
      {
        filename: 'twelve-factor.txt',
        language: 'plaintext',
        code: `III. Config      -> env vars, not hardcoded  (spring profiles)
IV.  Backing svc -> DB/Redis/Kafka = attached resources
VI.  Processes   -> stateless, share-nothing
IX.  Disposability -> fast startup, graceful shutdown
XI.  Logs        -> write to stdout as event streams`,
        note: 'Foundational for containerized microservices.',
      },
    ],
    mortar:
      'Mortar microservices 12-factor: config via env (per-brand secrets), stateless (JWT — 7.5.4), logs → stdout → aggregation, graceful shutdown (6.2.1). ඒ නිසා K8s (11.2.2) වල cleanly scale/deploy/roll.',
    keyPoints: ['Config in env, stateless processes, logs as streams.', 'Disposability + dev/prod parity.', 'Enables containers/K8s scaling.'],
  },

  '8.2.1': {
    summary: 'API Gateway = single entry point — routing, auth, rate limiting, aggregation for all services.',
    sinhala: [
      {
        heading: 'Single front door',
        body: 'Clients services එකින් එකට කෙලින්ම කතා කරනවා වෙනුවට, `API Gateway` (Spring Cloud Gateway) එකක් හරහා. Gateway routing, authentication, rate limiting (11.1.3), CORS, request aggregation centralize කරනවා. Internal service topology clients වලට hidden.',
      },
    ],
    analogy: 'Building එකක reception + security desk එකක් වගේ — හැම visitor එකම එතනින්, ඊට පස්සේ හරි department එකට route.',
    code: [
      {
        filename: 'gateway.yml',
        language: 'yaml',
        code: `spring:
  cloud:
    gateway:
      routes:
        - id: segments
          uri: lb://resolution-svc
          predicates: [ Path=/api/segments/** ]
        - id: predictions
          uri: lb://prediction-svc
          predicates: [ Path=/api/churn/** ]
      # + global filters: JWT auth, rate limit, CORS`,
        note: 'Central routing + cross-cutting concerns.',
      },
    ],
    mortar:
      'Mortar API Gateway — Angular frontend එකට single endpoint, behind එකේ resolution/prediction/activation services route. JWT auth, per-tenant rate limiting, CORS එක තැනකින්. Clients internal services දන්නෙ නෑ.',
    keyPoints: ['Single entry point for clients.', 'Central routing/auth/rate-limit/CORS.', 'Hides internal topology.'],
  },

  '8.2.2': {
    summary: 'Service Discovery (Eureka/Consul) = services register + find each other dynamically (no hardcoded hosts).',
    sinhala: [
      {
        heading: 'Dynamic locating',
        body: 'Microservices scale/restart කරනකොට IPs වෙනස්. `Service Discovery` — services registry එකකට register වෙනවා, අනිත්වා name එකෙන් lookup කරනවා (`lb://prediction-svc`). Hardcoded hosts නෑ, auto load-balance + resilience. Kubernetes එකේ built-in DNS discovery තියෙනවා.',
      },
    ],
    analogy: 'Phone directory එකක් වගේ — number මතක තියාගන්නෙ නැතුව, name එකෙන් lookup කරනවා.',
    code: [
      {
        filename: 'discovery.java',
        language: 'java',
        code: `@SpringBootApplication
@EnableDiscoveryClient          // register with Eureka/Consul on startup
public class PredictionServiceApp { }

// call by logical name, not IP:
webClient.get().uri("lb://prediction-svc/churn/{id}", id)...;`,
        note: 'Register + resolve by name, not hardcoded host.',
      },
    ],
    mortar:
      'Mortar services (scaled to many pods) service discovery/registry වලින් dynamically locate. Prediction service pods scale වුනත්, activation service name එකෙන් find + load-balance. K8s native discovery බොහෝවිට enough.',
    keyPoints: ['Register + discover by logical name.', 'Handles dynamic IPs/scaling.', 'K8s has native DNS discovery.'],
  },

  '8.2.3': {
    summary: 'Config Server = centralized externalized configuration for all services (git-backed).',
    sinhala: [
      {
        heading: 'Centralized config',
        body: 'Services ගොඩක config එකින් එකේ තියෙනවා වෙනුවට, `Spring Cloud Config Server` එකක් (git repo-backed) central config serve කරනවා. Per-service, per-profile properties එක තැනකින් manage + version + refresh (restart නැතුව). Consistency + auditability.',
      },
    ],
    analogy: 'Company policy manual එකක් central තැනක — හැම department එකම එතනින්ම read කරනවා, කොපි ගොඩක් නෑ.',
    code: [
      {
        filename: 'config.yml',
        language: 'yaml',
        code: `# each service points to the config server
spring:
  config:
    import: optional:configserver:http://config-server:8888
  application:
    name: prediction-svc     # pulls prediction-svc.yml from git repo`,
        note: 'Git-backed central config, version-controlled.',
      },
    ],
    mortar:
      'Mortar many services config (thresholds, feature flags, connector settings) Config Server + git — one place, versioned, auditable. Refresh වලින් restart නැතුව update. 12-factor config (8.1.3) at scale.',
    keyPoints: ['Central, externalized, git-backed config.', 'Per-service/per-profile + refresh.', 'Consistency + auditability.'],
  },

  '8.2.4': {
    summary: 'Client-side load balancing (Spring Cloud LoadBalancer) = client picks a service instance from discovery.',
    sinhala: [
      {
        heading: 'Distribute calls',
        body: 'Service instances කිහිපයක් තියෙනකොට, client-side load balancer discovery registry එකෙන් instances ලැයිස්තුව අරන්, requests ඒවා අතර distribute කරනවා (round-robin, etc.) — dedicated LB hop එකක් නැතුව. Resilience + throughput.',
      },
    ],
    analogy: 'Queue කිහිපයක් තියෙන bank එකක — ඔයාම අඩුම queue එක තෝරගන්නවා (client-side) වගේ.',
    code: [
      {
        filename: 'LoadBalancer.java',
        language: 'java',
        code: `@Bean
@LoadBalanced                     // enable client-side LB on this WebClient
WebClient.Builder webClientBuilder() { return WebClient.builder(); }

// "lb://" -> LoadBalancer picks a healthy prediction-svc instance
webClient.get().uri("lb://prediction-svc/churn/{id}", id)...;`,
        note: 'Client distributes across instances via discovery.',
      },
    ],
    mortar:
      'Mortar activation-svc → prediction-svc (many instances) calls client-side load balanced — high-volume scoring requests instances අතර spread, single-instance bottleneck නෑ. K8s Service LB alternative.',
    keyPoints: ['Client picks instance from discovery.', 'Round-robin/etc distribution.', 'No extra LB hop.'],
  },

  '8.2.5': {
    summary: 'Circuit Breaker (Resilience4j) = failing dependency එකකදී calls "trip" කරලා cascading failures වළක්වනවා.',
    sinhala: [
      {
        heading: 'Fail fast + recover',
        body: 'Dependency එකක් fail/slow වෙනකොට, circuit breaker "open" වෙලා calls වහාම fail (fallback) කරනවා — threads block වෙලා cascading failure වළක්වනවා. Cooldown එකකට පස්සේ "half-open" — test call. Recover වුනොත් "closed". Timeouts, retries, bulkheads එක්ක resilience.',
      },
    ],
    analogy: 'Electrical circuit breaker එකක් වගේ — overload එකකදී trip වෙලා, ගිනි ගන්නවා වෙනුවට power cut.',
    code: [
      {
        filename: 'CircuitBreaker.java',
        language: 'java',
        code: `@CircuitBreaker(name = "shopify", fallbackMethod = "cachedCustomers")
List<Customer> fetchFromShopify(String brandId) {
    return shopifyClient.getCustomers(brandId);  // may fail/timeout
}
List<Customer> cachedCustomers(String brandId, Throwable t) {
    return cache.get(brandId);                   // graceful fallback
}`,
        note: 'Trips on failures → fast fallback, no cascade.',
      },
    ],
    mortar:
      'Mortar external connector APIs (Shopify/Meta) down/slow වුනොත් circuit breaker + fallback — sync pipeline එක hang/crash වෙන්නෙ නෑ, cached/degraded data එක්ක continue. One flaky vendor whole platform එක බිඳ දාන්නෙ නෑ.',
    keyPoints: ['Open on failures → fast fallback.', 'Half-open probes recovery.', 'Prevents cascading failures.'],
  },

  '8.2.6': {
    summary: 'Distributed tracing (Micrometer/Zipkin/Jaeger) = request එකක් services හරහා යන path එක trace කරනවා.',
    sinhala: [
      {
        heading: 'Trace across services',
        body: 'Request එකක් services කිහිපයක් හරහා යනකොට, trace id + span ids propagate කරලා end-to-end flow + latency visualize කරනවා (Zipkin/Jaeger). Bottlenecks/failures කුමන service එකේද කියලා find. Micrometer Tracing auto-instruments.',
      },
    ],
    analogy: 'Courier tracking number එකක් වගේ — parcel එක කුමන hubs හරහා ගියාද, කොහෙද delay වුනේද කියලා පේනවා.',
    code: [
      {
        filename: 'tracing.txt',
        language: 'plaintext',
        code: `traceId: abc123  (one request, end to end)
 ├─ gateway         span 2ms
 ├─ resolution-svc  span 40ms
 ├─ prediction-svc  span 120ms   <- bottleneck!
 └─ activation-svc  span 15ms
# traceId also appears in logs + ApiError (7.2.5.3)`,
        note: 'One traceId links all spans + logs.',
      },
    ],
    mortar:
      'Mortar request (segment build → sync) services කිහිපයක් touch කරනවා. Distributed tracing එකෙන් slow stage (e.g. prediction) pinpoint. `traceId` API errors (7.2.5.3) + logs එකට tie — fast debugging across the platform.',
    keyPoints: ['traceId + spans across services.', 'Zipkin/Jaeger visualize latency/path.', 'traceId ties logs + errors.'],
  },

  '8.3.1': {
    summary: 'Synchronous comms: RestTemplate (legacy blocking), WebClient (reactive), OpenFeign (declarative).',
    sinhala: [
      {
        heading: 'Request-response',
        body: 'Service එකක් අනිකට කෙලින්ම call කරලා response එකට wait කරනවා (synchronous, coupling). `RestTemplate` — legacy, blocking. `WebClient` — modern, reactive/non-blocking. `OpenFeign` — interface එකකින් declarative HTTP client (implementation auto). Simple ඒත් latency chain + availability coupling.',
      },
    ],
    analogy: 'Phone call එකක් වගේ — කතා කරලා answer එකට wait කරනවා (දෙන්නම එකවර available වෙන්න ඕන).',
    code: [
      {
        filename: 'Feign.java',
        language: 'java',
        code: `@FeignClient(name = "prediction-svc")
interface PredictionClient {
    @GetMapping("/churn/{id}")
    ChurnResult churn(@PathVariable String id);   // declarative HTTP call
}
// inject & call like a normal method - Feign generates the client
ChurnResult r = predictionClient.churn(customerId);`,
        note: 'OpenFeign = interface → HTTP client (declarative).',
      },
    ],
    mortar:
      'Mortar activation-svc → prediction-svc real-time churn score OpenFeign/WebClient (sync). Immediate answer ඕන flows වලට. ඒත් sync chains latency + coupling add කරන නිසා, heavy pipelines async (8.3.2).',
    keyPoints: ['RestTemplate (legacy) / WebClient (reactive) / OpenFeign (declarative).', 'Simple but couples availability + latency.', 'Immediate-answer flows.'],
  },

  '8.3.2': {
    summary: 'Asynchronous comms (Kafka/RabbitMQ) = message brokers via events — decoupled, resilient, scalable.',
    sinhala: [
      {
        heading: 'Message brokers',
        body: 'Services කෙලින්ම call කරනවා වෙනුවට messages/events broker එකකට publish කරනවා; අනිත්වා consume කරනවා. Producer/consumer decoupled — consumer down වුනත් messages queue එකේ (durability). Kafka (high-throughput streaming, log), RabbitMQ (flexible routing). Scalable, resilient.',
      },
    ],
    analogy: 'Email/notice board එකක් වගේ — message දාලා යනවා, receiver ඔහුට පුළුවන් වෙලාවක read කරනවා (දෙන්නම එකවර online ඕන නෑ).',
    code: [
      {
        filename: 'Kafka.java',
        language: 'java',
        code: `// producer: publish an event, don't wait
kafkaTemplate.send("customer-resolved",
    new CustomerResolvedEvent(customerId, brandId));

// consumer: react independently
@KafkaListener(topics = "customer-resolved")
void onResolved(CustomerResolvedEvent e) {
    predictionService.scoreAsync(e.customerId());
}`,
        note: 'Decoupled: producer & consumer scale/fail independently.',
      },
    ],
    mortar:
      'Mortar "real-time streaming pipeline" (PROJECT_IDEA "How Mortar Works") Kafka — connectors events publish, resolution/prediction/activation independently consume. BlockingQueue back-pressure (2.4.6.3) idea at platform scale. Resilient, decoupled ingestion.',
    keyPoints: ['Events via broker (Kafka/RabbitMQ).', 'Decoupled + durable + scalable.', 'Consumer down ≠ data lost.'],
  },

  '8.3.3': {
    summary: 'Event-Driven Architecture: Event Sourcing (state = event log), CQRS (separate read/write models).',
    sinhala: [
      {
        heading: 'Events as source of truth',
        body: '`Event Sourcing` — current state store කරනවා වෙනුවට, state වෙනස් කරන events sequence එක store කරලා, replay කරලා state rebuild (full audit history). `CQRS` (Command Query Responsibility Segregation) — writes (commands) සහ reads (queries) වෙනම models/stores — each independently optimize/scale. Complexity වැඩි — ඕන තැන් වලට.',
      },
    ],
    analogy: 'Bank account එකක් වගේ — balance එක store කරනවා නෙවෙයි, transactions ලොග් එකෙන් balance calculate (event sourcing).',
    code: [
      {
        filename: 'cqrs.txt',
        language: 'plaintext',
        code: `Event Sourcing:  [CustomerCreated][EmailAdded][OrderPlaced]...  -> replay = state

CQRS:
  WRITE side -> commands -> event store (normalized, consistent)
  READ  side -> denormalized views (fast queries, e.g. Customer-360)`,
        note: 'Events = truth; reads/writes optimized separately.',
      },
    ],
    mortar:
      'Mortar sales/customer changes events විදිහට (audit trail, "incrementally as new data arrives" — PROJECT_IDEA 2.3). CQRS — write side normalized golden records, read side denormalized Customer-360 / analytics views (fast). Selective use where it pays.',
    keyPoints: ['Event Sourcing = state from event log (audit).', 'CQRS = separate read/write models.', 'Powerful but complex — use selectively.'],
  },

  '8.4.1': {
    summary: 'Database per Service = each microservice owns its DB — loose coupling, independent scaling.',
    sinhala: [
      {
        heading: 'Own your data',
        body: 'හැම service එකක්ම තමන්ගේම database — වෙන services කෙලින්ම access කරන්නෙ නෑ (only via APIs/events). Loose coupling, independent schema evolution + scaling + tech choice. Trade-off: cross-service data consistency + joins අමාරු (Saga, API composition ඕන).',
      },
    ],
    analogy: 'හැම shop එකක්ම තමන්ගේම inventory book එකක් තියාගන්නවා වගේ — වෙන shop එකක් ඔයාගේ book එකට අත දාන්නෙ නෑ.',
    code: [
      {
        filename: 'db-per-service.txt',
        language: 'plaintext',
        code: `resolution-svc  -> resolution_db  (customers, matches)
prediction-svc  -> prediction_db  (scores, models)
activation-svc  -> activation_db  (segments, syncs)

# NO shared DB. cross-service data via API/events only.`,
        note: 'No shared DB — access via APIs/events.',
      },
    ],
    mortar:
      'Mortar each service own store: resolution (golden records), prediction (scores), activation (segments/syncs), billing. Independent scaling + schema evolution. Cross-service reads via APIs/events (no shared DB coupling). Complete tenant isolation aligns too.',
    keyPoints: ['Each service owns its DB.', 'Access via APIs/events only.', 'Loose coupling, but cross-service consistency is harder.'],
  },

  '8.4.2': {
    summary: 'Saga Pattern = distributed transaction as a sequence of local transactions + compensations (Choreography/Orchestration).',
    sinhala: [
      {
        heading: 'Distributed transactions',
        body: 'Services ගොඩක් වෙනම DBs (8.4.1) — global ACID transaction නෑ. Saga = local transactions sequence එකක්; step එකක් fail වුනොත් කලින් steps `compensating transactions` (undo) වලින් reverse. `Choreography` — events driven (decentralized). `Orchestration` — central coordinator. Eventual consistency.',
      },
    ],
    analogy: 'Travel booking එකක් වගේ — flight + hotel + car. Car fail වුනොත්, flight + hotel cancel (compensate).',
    code: [
      {
        filename: 'saga.txt',
        language: 'plaintext',
        code: `Onboard-brand saga (choreography via events):
  1. connector-svc:  BrandConnected        --event-->
  2. resolution-svc: CustomersResolved      --event-->
  3. prediction-svc: ScoresComputed         --event-->
  X. any failure -> emit compensating events to undo prior steps`,
        note: 'Local txns + compensations = eventual consistency.',
      },
    ],
    mortar:
      'Mortar multi-service brand onboarding / bulk sync — Saga (choreography via Kafka events). Prediction step fail වුනොත், resolution/activation compensate. Distributed data consistency without a global lock. Eventual consistency accepted.',
    keyPoints: ['Local txns + compensations (undo).', 'Choreography (events) vs Orchestration (coordinator).', 'Eventual consistency, no global ACID.'],
  },

  '8.4.3': {
    summary: 'API Composition / Aggregator = multiple services වලින් data එකතු කරලා single response එකක් build කරනවා.',
    sinhala: [
      {
        heading: 'Aggregate reads',
        body: 'Data services කිහිපයක තියෙනකොට (db-per-service), එක view එකකට (උදා: Customer-360) හැම එකෙන්ම data ගෙනත් aggregate කරන්නම ඕන. Aggregator service/gateway parallel calls කරලා combine කරනවා. Simple ඒත් latency = slowest service; partial-failure handle කරන්න ඕන.',
      },
    ],
    analogy: 'Dashboard එකක් වගේ — වෙන වෙන sources වලින් widgets ගෙනත් එක screen එකකට එකතු කරනවා.',
    code: [
      {
        filename: 'Aggregator.java',
        language: 'java',
        code: `Customer360 build(String id) {
    var profile = CompletableFuture.supplyAsync(() -> resolutionClient.get(id));
    var churn   = CompletableFuture.supplyAsync(() -> predictionClient.churn(id));
    var segs    = CompletableFuture.supplyAsync(() -> activationClient.segments(id));
    return CompletableFuture.allOf(profile, churn, segs)
        .thenApply(v -> new Customer360(profile.join(), churn.join(), segs.join()))
        .join();                       // parallel aggregate (2.4.6.2)
}`,
        note: 'Parallel calls (CompletableFuture) then combine.',
      },
    ],
    mortar:
      'Mortar Customer-360 profile (PROJECT_IDEA 2.6) = resolution (details) + prediction (churn) + activation (segments) + email engagement. API composition parallel (CompletableFuture — 2.4.6.2) aggregate → single response. Home dashboard similar.',
    keyPoints: ['Aggregate data from multiple services.', 'Parallel calls (CompletableFuture) → combine.', 'Latency = slowest; handle partial failures.'],
  },

  '8.4.4': {
    summary: 'Outbox Pattern = DB write + event publish atomically (dual-write problem solve).',
    sinhala: [
      {
        heading: 'Reliable event publishing',
        body: 'Service එකක් DB update කරලා event publish කරනවා — දෙක වෙන වෙනම වුනොත් එකක් fail වුනොත් inconsistency (dual-write problem). Outbox: event එක same DB transaction එකේ "outbox" table එකට write. වෙනම relay/CDC process outbox rows read කරලා broker එකට publish. Atomicity + guaranteed delivery.',
      },
    ],
    analogy: 'Letter එකක් ලියලා, same time එකේම "outbox" tray එකට දානවා — postman පස්සේ guaranteed එවනවා.',
    code: [
      {
        filename: 'outbox.txt',
        language: 'plaintext',
        code: `@Transactional {
   customerRepo.save(golden);              // business change
   outboxRepo.save(new OutboxEvent(       // event in SAME transaction
       "customer-resolved", payload));
}  // both commit together (atomic)

// separate relay/CDC (e.g. Debezium) publishes outbox rows to Kafka`,
        note: 'Event in same txn → no lost/duplicate publishes.',
      },
    ],
    mortar:
      'Mortar resolution-svc golden record save + "customer-resolved" event publish outbox pattern — DB commit + event guaranteed consistent (dual-write problem නෑ). Downstream prediction/activation reliably triggered. Data integrity across services.',
    keyPoints: ['Event in same DB txn (outbox table).', 'Relay/CDC publishes to broker.', 'Solves dual-write, guarantees delivery.'],
  },
};
