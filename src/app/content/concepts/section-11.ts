import { Concept } from '../../core/models/roadmap.model';

/** Section 11 — System Design & Deployment. */
export const SECTION_11: Record<string, Concept> = {
  '11.1.1': {
    summary: 'Load Balancers distribute traffic. L4 (transport: IP/port) vs L7 (application: HTTP paths/headers).',
    sinhala: [
      {
        heading: 'L4 vs L7',
        body: 'Load balancer traffic instances අතර distribute කරලා scale + availability දෙනවා. `L4` (transport layer) — IP/port මත route, fast, content-agnostic. `L7` (application layer) — HTTP content (path, header, cookie) මත smart routing (path-based, sticky sessions, SSL termination). API Gateway (8.2.1) බොහෝවිට L7.',
      },
    ],
    analogy: 'L4 = mail sorting by postal code විතරයි (ඉක්මන්). L7 = letter ඇතුල බලලා content අනුව route (smart).',
    code: [
      {
        filename: 'lb.txt',
        language: 'plaintext',
        code: `L4 (transport): route by IP:port      -> fast, no content awareness
L7 (application): route by HTTP        -> /api/churn -> prediction-svc
                                          /api/segments -> resolution-svc
                  + SSL termination, sticky sessions, header routing`,
        note: 'L7 = smart HTTP routing; L4 = fast/dumb.',
      },
    ],
    mortar:
      'Mortar edge L7 load balancer / gateway — path-based routing to services, SSL termination, per-tenant sticky/routing. L4 for raw high-throughput internal balancing. HA + scale for the multi-tenant platform.',
    keyPoints: ['LB = distribute traffic (scale + HA).', 'L4 = IP/port (fast); L7 = HTTP-aware (smart).', 'L7 does path routing + SSL termination.'],
  },

  '11.1.2': {
    summary: 'CDN = static/cacheable content edge servers වලින් users ට ළඟින් serve — latency අඩු, origin load අඩු.',
    sinhala: [
      {
        heading: 'Edge delivery',
        body: 'CDN (Content Delivery Network) — static assets (JS, CSS, images, exports) globally distributed edge servers වල cache කරලා, user ට geographically ළඟම server එකෙන් serve. Latency dramatically අඩු, origin server load අඩු, DDoS absorb. Frontend + downloadable content වලට.',
      },
    ],
    analogy: 'Global warehouse chain එකක් වගේ — customer ට ළඟම branch එකෙන් deliver (central warehouse එකෙන් නෙවෙයි).',
    code: [
      {
        filename: 'cdn.txt',
        language: 'plaintext',
        code: `User (Colombo) --> CDN edge (Singapore, cached) --> fast
                     (only cache-miss goes to origin)

Cached: Angular app bundle, CSS, images, large CSV/report downloads
Cache-Control + versioned filenames control freshness`,
        note: 'Serve from nearest edge; origin only on miss.',
      },
    ],
    mortar:
      'Mortar Angular frontend bundles, images, large audience CSV / report downloads (PROJECT_IDEA 4.3) CDN-served — global users fast load, origin/API servers offloaded. Streamed large exports edge-cached where possible.',
    keyPoints: ['CDN = edge-cached content near users.', 'Lower latency + origin offload + DDoS buffer.', 'Static assets + downloadable content.'],
  },

  '11.1.3': {
    summary: 'Rate limiting = requests/time cap කරලා abuse/overload වළක්වනවා. Token Bucket, Leaky Bucket.',
    sinhala: [
      {
        heading: 'Throttle requests',
        body: 'Rate limiting client එකකට/tenant එකකට time window එකකට allowed requests cap කරනවා — abuse, overload, unfair usage වළක්වනවා. `Token Bucket` — tokens refill rate එකකට, request එකකට token එකක් (bursts allow). `Leaky Bucket` — steady constant output rate (smooths bursts). Gateway (8.2.1) එකේ enforce.',
      },
    ],
    analogy: 'Token Bucket = bucket එකක tokens — burst එකකට වැඩිය use කරන්න පුළුවන්, ඒත් refill rate limited.',
    code: [
      {
        filename: 'ratelimit.txt',
        language: 'plaintext',
        code: `Token Bucket: capacity=100, refill=10/sec
  - each request consumes 1 token
  - allows short bursts (up to 100), then throttles to 10/s
  - empty bucket -> HTTP 429 Too Many Requests

Leaky Bucket: constant drain rate -> smooth, no bursts`,
        note: 'Token bucket allows bursts; leaky bucket smooths.',
      },
    ],
    mortar:
      'Mortar API gateway per-tenant rate limits (token bucket) — one brand heavy usage එකකින් platform overwhelm වෙන්නෙ නෑ, fair multi-tenant sharing. Outbound connector calls Semaphore (2.4.6.5) / rate-limit — vendor API quotas respect.',
    keyPoints: ['Cap requests/time → prevent abuse/overload.', 'Token Bucket (bursts) vs Leaky Bucket (smooth).', 'Enforce at gateway; per-tenant fairness.'],
  },

  '11.1.4': {
    summary: 'High Availability + Fault Tolerance = failures වුනත් system keep running — redundancy, no single point of failure.',
    sinhala: [
      {
        heading: 'Stay up despite failures',
        body: '`High Availability` (HA) — minimal downtime (redundancy, multiple instances/zones, failover, health checks). `Fault Tolerance` — component failures gracefully handle (circuit breakers — 8.2.5, retries, graceful degradation). Eliminate single points of failure (SPOF). Measured in "nines" (99.9%+ uptime).',
      },
    ],
    analogy: 'Plane එකක engines කිහිපයක් වගේ — එකක් fail වුනත් අනිත් ඒවායින් safely පියාසර.',
    code: [
      {
        filename: 'ha.txt',
        language: 'plaintext',
        code: `HA techniques:
  - multiple instances across availability zones
  - health checks (7.3) + auto-restart/failover (K8s)
  - DB replication (9.1.5) + automated failover
  - no single point of failure (redundant LBs, gateways)

Fault tolerance: circuit breakers, retries, graceful degradation`,
        note: 'Redundancy + failover + graceful degradation.',
      },
    ],
    mortar:
      'Mortar (enterprise SaaS, PROJECT_IDEA 10.5): multi-instance services across zones, K8s auto-restart/failover, DB replicas, circuit breakers (8.2.5). One node/vendor failure = degraded, not down. HA/FT = enterprise SLA foundation.',
    keyPoints: ['HA = minimal downtime (redundancy/failover).', 'Fault tolerance = graceful failure handling.', 'Eliminate single points of failure.'],
  },

  '11.2.1': {
    summary: 'Docker = apps + dependencies containers වලට package — "works on my machine" solve, portable, isolated.',
    sinhala: [
      {
        heading: 'Containers',
        body: 'Docker app එකයි ඒකේ dependencies (JRE, libs, config) ඔක්කොම එක portable `image` එකකට package කරනවා. `Container` = image එකේ running instance (isolated, lightweight — VM වලට වඩා). Dockerfile build recipe. Consistent dev→prod (dev/prod parity — 8.1.3), fast startup, dense packing.',
      },
    ],
    analogy: 'Shipping container එකක් වගේ — ඇතුලෙ මොනවා තිබුණත්, ඕන ship/truck/port එකක standard විදිහට move.',
    code: [
      {
        filename: 'Dockerfile',
        language: 'dockerfile',
        code: `FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY target/mortar-service.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]

# docker build -t mortar/resolution-svc:1.0 .
# docker run -p 8080:8080 mortar/resolution-svc:1.0`,
        note: 'Fat JAR (7.1.3) + JRE → portable image.',
      },
    ],
    mortar:
      'Mortar each microservice Docker image (embedded server — 7.1.3). Consistent artifact dev → staging → prod. Kubernetes (11.2.2) orchestrates these images. Container = the deployment unit for the whole platform.',
    keyPoints: ['Package app + deps → portable image.', 'Containers = isolated, lightweight, fast.', 'Dev/prod parity; deployment unit.'],
  },

  '11.2.2': {
    summary: 'Kubernetes (K8s) = containers orchestrate — deploy, scale, self-heal, service-discover automatically.',
    sinhala: [
      {
        heading: 'Container orchestration',
        body: 'Containers ගොඩක් production එකේ manage කරන්න K8s. `Pod` (containers unit), `Deployment` (desired replicas + rolling updates), `Service` (stable endpoint + LB + discovery), `ConfigMap`/`Secret` (config/secrets — 8.1.3). K8s auto-scaling, self-healing (crash → restart), rolling deploys, load balancing දෙනවා.',
      },
    ],
    analogy: 'Container ship fleet එකක් manage කරන harbor master කෙනෙක් වගේ — scheduling, replacing, routing ඔක්කොම automatic.',
    code: [
      {
        filename: 'deployment.yaml',
        language: 'yaml',
        code: `apiVersion: apps/v1
kind: Deployment
metadata: { name: prediction-svc }
spec:
  replicas: 3                    # 3 pods, auto-restarted if they die
  template:
    spec:
      containers:
        - name: prediction
          image: mortar/prediction-svc:1.0
          livenessProbe:          # uses /actuator/health (7.3)
            httpGet: { path: /actuator/health, port: 8080 }`,
        note: 'Declare desired state; K8s maintains it (self-heal/scale).',
      },
    ],
    mortar:
      'Mortar microservices K8s — Deployments (replicas + rolling updates, zero-downtime), Services (discovery — 8.2.2 + LB), ConfigMaps/Secrets (per-tenant config/keys), HPA auto-scaling (prediction spikes). Self-healing + scaling = the platform\'s HA (11.1.4) backbone.',
    keyPoints: ['Pods/Deployments/Services/ConfigMaps/Secrets.', 'Auto-scale + self-heal + rolling deploys.', 'Declarative desired state.'],
  },

  '11.2.3': {
    summary: 'Infrastructure as Code (Terraform) = infrastructure declaratively code එකෙන් provision — versioned, repeatable.',
    sinhala: [
      {
        heading: 'Declarative infra',
        body: 'Servers, DBs, networks, K8s clusters manually (click-ops) හදනවා වෙනුවට, `Terraform` වගේ IaC tool එකකින් code (declarative config) එකෙන් define + provision. Version-controlled, repeatable, reviewable, `plan` (preview) → `apply`. Consistent environments (dev/staging/prod), disaster recovery ලේසි.',
      },
    ],
    analogy: 'ගෙදරක් හැම වතාවෙම අතින් හදනවා වෙනුවට, blueprint එකකින් automatic build කරනවා වගේ — හැම වතාවෙම එකම විදිහට.',
    code: [
      {
        filename: 'main.tf',
        language: 'plaintext',
        code: `resource "aws_db_instance" "resolution_db" {
  engine         = "postgres"
  engine_version = "16"
  instance_class = "db.r6g.xlarge"
  multi_az       = true          # HA (11.1.4)
}
# terraform plan  -> preview changes
# terraform apply -> provision, version-controlled infra`,
        note: 'Infra in code: plan → apply, versioned + repeatable.',
      },
    ],
    mortar:
      'Mortar cloud infra (K8s clusters, Postgres, Redis, Kafka, networking) Terraform — per-environment consistent, reviewable, disaster-recoverable. New tenant/region spin-up repeatable. GitOps + IaC = reliable platform operations.',
    keyPoints: ['IaC = infra defined declaratively in code.', 'Versioned, repeatable, reviewable (plan → apply).', 'Consistent environments + DR.'],
  },

  '11.3.1': {
    summary: 'OWASP Top 10 = most critical web security risks (SQL Injection, XSS, CSRF, broken auth...).',
    sinhala: [
      {
        heading: 'Common vulnerabilities',
        body: 'OWASP Top 10 = commonly-exploited web vulnerabilities awareness list. `SQL Injection` — parameterized queries/JPA වලින් වළක්වනවා (string-concat SQL නෙවෙයි). `XSS` — output encode/sanitize. `CSRF` (7.5.7) — tokens. Broken auth/access control, misconfig, etc. Security = design-time concern, afterthought නෙවෙයි.',
      },
    ],
    analogy: 'ගෙදරක common weak points list එකක් වගේ — unlocked doors, weak windows කලින්ම දැනගෙන fix.',
    code: [
      {
        filename: 'security.java',
        language: 'java',
        code: `// SQL INJECTION (vulnerable): string concatenation
// "SELECT * FROM users WHERE email = '" + input + "'"

// SAFE: parameterized (JPA / prepared statements)
@Query("SELECT c FROM Customer c WHERE c.email = :email")
Optional<Customer> findByEmail(@Param("email") String email);
// input is bound, never interpolated -> injection impossible`,
        note: 'Parameterized queries kill SQL injection.',
      },
    ],
    mortar:
      'Mortar (customer PII at scale) OWASP-aligned: parameterized JPA queries (no SQLi), input validation (7.2.6), output encoding, CSRF/CORS (7.5.7), field-level encryption + RBAC (PROJECT_IDEA 10.5). SonarQube (10.3.2) scans for these. Security = built-in.',
    keyPoints: ['OWASP Top 10 = critical web risks.', 'SQLi → parameterized queries; XSS → encode; CSRF → tokens.', 'Security is a design-time concern.'],
  },

  '11.3.2': {
    summary: 'Securing REST APIs = auth (JWT/OAuth2), HTTPS, validation, rate limiting, least-privilege — defense in depth.',
    sinhala: [
      {
        heading: 'Layered API security',
        body: 'REST APIs secure කරන්න layers: authentication (JWT/OAuth2 — 7.5.4/7.5.5), authorization (RBAC, method security — 7.5.6), transport (HTTPS/TLS — 11.3.3), input validation (7.2.6), rate limiting (11.1.3), no sensitive data in URLs/logs, least-privilege. Single control මදි — defense in depth.',
      },
    ],
    analogy: 'Bank vault එකක් වගේ — guard + locked door + safe + camera. එක layer එකක් fail වුනත් අනිත් ඒවා protect.',
    code: [
      {
        filename: 'api-security.txt',
        language: 'plaintext',
        code: `1. HTTPS/TLS everywhere            (11.3.3)
2. Authenticate: JWT / OAuth2      (7.5.4/7.5.5)
3. Authorize: RBAC + @PreAuthorize (7.5.6) + tenant scope
4. Validate all input             (7.2.6)
5. Rate limit                     (11.1.3)
6. No secrets/PII in URLs or logs; audit access`,
        note: 'Layered controls = defense in depth.',
      },
    ],
    mortar:
      'Mortar APIs: HTTPS, JWT auth, per-method + per-tenant authorization (7.5.6 — "brand X data only"), validation, gateway rate limiting, encrypted PII, audit logs. Multiple layers protect customer data even if one control is bypassed. Enterprise-grade.',
    keyPoints: ['Auth + AuthZ + HTTPS + validation + rate limit.', 'Least privilege + no secrets in URLs/logs.', 'Defense in depth (layered).'],
  },

  '11.3.3': {
    summary: 'SSL/TLS = transit data encrypt කරලා eavesdropping/tampering වළක්වනවා (HTTPS). Certificates + handshake.',
    sinhala: [
      {
        heading: 'Encryption in transit',
        body: 'TLS (SSL successor) client-server communication encrypt කරලා confidentiality + integrity + server authenticity දෙනවා. Certificate (CA-signed) + handshake (key exchange) → encrypted channel (HTTPS). Data in transit protect. mTLS — both sides authenticate (service-to-service). Modern TLS 1.2/1.3, strong ciphers.',
      },
    ],
    analogy: 'Sealed, locked armored van එකක් වගේ — පාරේ යනකොට ඇතුලේ දේ බලන්නෙවත් වෙනස් කරන්නෙවත් බෑ.',
    code: [
      {
        filename: 'tls.txt',
        language: 'plaintext',
        code: `TLS handshake (simplified):
  1. client hello  -> server presents CA-signed certificate
  2. verify cert + exchange keys
  3. encrypted channel established (HTTPS)

mTLS: both client AND server present certs (service-to-service)`,
        note: 'Encrypts in transit + authenticates the server.',
      },
    ],
    mortar:
      'Mortar all traffic HTTPS/TLS — customer PII in transit encrypted (browser↔API, service↔connector). Internal service-to-service mTLS (zero-trust). Complements field-level encryption at rest (PROJECT_IDEA 10.5) — data protected end to end. Compliance requirement.',
    keyPoints: ['TLS = encrypt + integrity + server auth (HTTPS).', 'Certificates + handshake; TLS 1.2/1.3.', 'mTLS for service-to-service (zero-trust).'],
  },
};
