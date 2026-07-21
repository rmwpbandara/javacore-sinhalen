import { Concept } from '../../core/models/roadmap.model';

/** Section 10 — Testing & Quality Assurance. */
export const SECTION_10: Record<string, Concept> = {
  '10.1.1': {
    summary: 'JUnit 5 (Jupiter) = modern Java testing framework — @Test, assertions, lifecycle, parameterized tests.',
    sinhala: [
      {
        heading: 'Unit testing basics',
        body: 'JUnit 5 = de-facto Java test framework. `@Test` methods, `assertEquals`/`assertThrows`/`assertAll` assertions, `@BeforeEach`/`@AfterEach` lifecycle, `@ParameterizedTest` (multiple inputs), `@DisplayName`. Unit tests = code එකේ smallest pieces (methods/classes) isolated verify — fast feedback + refactor confidence.',
      },
    ],
    analogy: 'Car එකක් හදනකොට හැම part එකම වෙන වෙනම test කරනවා වගේ — engine, brakes එකින් එක.',
    code: [
      {
        filename: 'SegmentTest.java',
        language: 'java',
        code: `class SegmentTest {
    @Test
    void vipCustomerMatchesHighSpendRule() {
        var rule = new SpendRule(1000);
        assertTrue(rule.matches(new Customer("a@x.com", 1500)));
        assertFalse(rule.matches(new Customer("b@x.com", 200)));
    }

    @ParameterizedTest
    @ValueSource(doubles = {1000.0, 1000.01, 5000.0})
    void matchesAtOrAboveThreshold(double spend) { ... }
}`,
        note: 'Fast, isolated verification of a single unit.',
      },
    ],
    mortar:
      'Mortar identity-resolution matching, RFM segmentation, churn rules JUnit 5 unit tests — logic edge cases (thresholds, nulls, dedup) verify. Refactor කරනකොට behaviour break වුනොත් වහාම දැනගන්නවා. Quality foundation.',
    keyPoints: ['@Test + assertions + lifecycle + parameterized.', 'Unit = isolated, fast.', 'Enables safe refactoring.'],
  },

  '10.1.2': {
    summary: 'Mockito = dependencies mock කරලා unit under test isolate. @Mock, @InjectMocks, @Spy.',
    sinhala: [
      {
        heading: 'Isolate with mocks',
        body: 'Unit test එකකදී real dependencies (DB, APIs) වෙනුවට mocks — controlled behaviour, fast, deterministic. `@Mock` (fake dependency), `@InjectMocks` (mocks inject කරන unit), `when(...).thenReturn(...)` (stub), `verify(...)` (interaction check), `@Spy` (real object + selective stub). DIP (5.1.5) නිසා mockable.',
      },
    ],
    analogy: 'Flight simulator එකක් වගේ — real plane නැතුව, controlled fake environment එකේ pilot (code) test.',
    code: [
      {
        filename: 'ServiceTest.java',
        language: 'java',
        code: `@ExtendWith(MockitoExtension.class)
class SegmentServiceTest {
    @Mock CustomerRepository repo;
    @InjectMocks SegmentService service;

    @Test
    void countsVips() {
        when(repo.countByChurnStatus(ACTIVE)).thenReturn(42L);   // stub
        assertEquals(42L, service.activeCount());
        verify(repo).countByChurnStatus(ACTIVE);                 // interaction
    }
}`,
        note: '@Mock deps, @InjectMocks unit, stub + verify.',
      },
    ],
    mortar:
      'Mortar service tests real Postgres/connector APIs නැතුව mocks — `SegmentService` logic isolate කරලා fast, deterministic tests. Constructor injection (6.1.2) නිසා mocks clean inject. CI වේගවත් + stable.',
    keyPoints: ['@Mock / @InjectMocks / @Spy.', 'when/thenReturn (stub) + verify (interaction).', 'Isolate unit from slow/external deps.'],
  },

  '10.1.3': {
    summary: 'AAA pattern = Arrange (setup), Act (execute), Assert (verify) — readable, structured tests.',
    sinhala: [
      {
        heading: 'Test structure',
        body: 'හැම test එකක්ම තුන් කොටසකට: `Arrange` — inputs/mocks/state setup. `Act` — method under test call (එක action). `Assert` — outcome verify. මේ structure එකෙන් tests readable, focused, maintainable — එක test එකකින් එක behaviour.',
      },
    ],
    analogy: 'Science experiment එකක් වගේ — setup (arrange), run (act), record result (assert).',
    code: [
      {
        filename: 'AaaTest.java',
        language: 'java',
        code: `@Test
void churnedCustomerFlaggedForWinback() {
    // Arrange
    var customer = new Customer("a@x.com");
    customer.setLastPurchase(Instant.now().minus(400, DAYS));

    // Act
    ChurnStatus status = churnEngine.classify(customer);

    // Assert
    assertEquals(ChurnStatus.HARD_CHURNED, status);
}`,
        note: 'One behaviour per test, clearly sectioned.',
      },
    ],
    mortar:
      'Mortar tests AAA structure — churn classification, segment matching, resolution logic clear Arrange/Act/Assert. New engineers tests කියෙව්වම behaviour + expectations වහාම තේරෙනවා. Living documentation.',
    keyPoints: ['Arrange → Act → Assert.', 'One behaviour per test.', 'Readable = living documentation.'],
  },

  '10.2.1': {
    summary: '@SpringBootTest = full application context load කරලා integration test — components එකට වැඩ කරනවද verify.',
    sinhala: [
      {
        heading: 'Full-context tests',
        body: '`@SpringBootTest` whole Spring context (beans, config, wiring) load කරලා, components integrate වෙනවද test කරනවා — unit tests miss කරන wiring/config bugs අල්ලනවා. Slower than unit tests (context startup) — critical flows වලට. `MockMvc`/`TestRestTemplate` වලින් endpoints test.',
      },
    ],
    analogy: 'Parts වෙන වෙනම test කරලා (unit), දැන් ඔක්කොම එකට assemble කරලා whole car එක test drive කරනවා වගේ.',
    code: [
      {
        filename: 'IntegrationTest.java',
        language: 'java',
        code: `@SpringBootTest
@AutoConfigureMockMvc
class SegmentApiTest {
    @Autowired MockMvc mvc;

    @Test
    void listSegmentsReturnsOk() throws Exception {
        mvc.perform(get("/api/segments"))
           .andExpect(status().isOk())
           .andExpect(jsonPath("$[0].name").exists());
    }
}`,
        note: 'Real context + wiring; test the API end to end.',
      },
    ],
    mortar:
      'Mortar critical flows (segment create → persist → retrieve, auth) `@SpringBootTest` integration tests — full wiring (security, JPA, controllers) verify. Unit tests miss කරන config/wiring issues deploy වෙන්න කලින් catch.',
    keyPoints: ['Full Spring context = integration test.', 'Catches wiring/config bugs.', 'Slower — for critical flows.'],
  },

  '10.2.2': {
    summary: 'Test slices (@WebMvcTest, @DataJpaTest) = context එකේ කොටසක් විතරක් load කරලා focused + faster tests.',
    sinhala: [
      {
        heading: 'Focused slices',
        body: 'Full `@SpringBootTest` slow. Slices layer එකක් විතරක් load: `@WebMvcTest` — web layer (controllers + MockMvc, services mock). `@DataJpaTest` — JPA layer (repositories + in-memory/test DB). `@JsonTest`, `@RestClientTest` තවත්. Faster, focused, layer-specific.',
      },
    ],
    analogy: 'Whole car test drive නැතුව, brakes system එක විතරක් isolated test කරනවා වගේ.',
    code: [
      {
        filename: 'SliceTest.java',
        language: 'java',
        code: `@WebMvcTest(SegmentController.class)     // only web layer
class SegmentControllerTest {
    @Autowired MockMvc mvc;
    @MockitoBean SegmentService service;    // service mocked
    ...
}

@DataJpaTest                             // only JPA layer + test DB
class CustomerRepoTest {
    @Autowired CustomerRepository repo;
    @Test void findsByEmail() { ... }
}`,
        note: 'Load one layer → faster, focused.',
      },
    ],
    mortar:
      'Mortar controllers `@WebMvcTest` (validation, routing, error handling — services mocked), repositories `@DataJpaTest` (derived queries, mappings on real test DB). Fast, targeted feedback per layer — CI quick.',
    keyPoints: ['@WebMvcTest (web) / @DataJpaTest (JPA) slices.', 'Load only the relevant layer.', 'Faster + focused than full context.'],
  },

  '10.2.3': {
    summary: 'Testcontainers = real dependencies (Postgres, Kafka, Redis) Docker containers එකේ integration tests වලට.',
    sinhala: [
      {
        heading: 'Real deps in Docker',
        body: 'In-memory DBs (H2) production DB එකට හරියටම match වෙන්නෙ නෑ (dialect/features වෙනස්). `Testcontainers` real Postgres/Kafka/Redis Docker container එකක් test එකට spin up කරලා, prod-like environment එකේ integration test. Accurate, disposable, CI-friendly.',
      },
    ],
    analogy: 'Flight simulator (H2) වෙනුවට, controlled runway එකක real plane එකකින් test කරනවා වගේ — production වගේම.',
    code: [
      {
        filename: 'Testcontainers.java',
        language: 'java',
        code: `@SpringBootTest
@Testcontainers
class ResolutionIT {
    @Container
    static PostgreSQLContainer<?> db = new PostgreSQLContainer<>("postgres:16");

    @DynamicPropertySource
    static void props(DynamicPropertyRegistry r) {
        r.add("spring.datasource.url", db::getJdbcUrl);   // point app at container
    }
    // tests run against REAL Postgres, disposed after
}`,
        note: 'Real Postgres per test run (prod-accurate).',
      },
    ],
    mortar:
      'Mortar resolution/analytics use Postgres-specific features (pg_trgm fuzzy match, JSON) — H2 එකෙන් test කරන්න බෑ. Testcontainers real Postgres/Kafka spin up කරලා, prod-accurate integration tests. Native-query (7.4.6) bugs deploy වෙන්න කලින් catch.',
    keyPoints: ['Real deps in disposable Docker containers.', 'Prod-accurate (dialect/features).', 'Beats in-memory fakes for integration.'],
  },

  '10.3.1': {
    summary: 'Code coverage (JaCoCo) = tests code එකෙන් කොච්චර % exercise කරනවද measure කරනවා.',
    sinhala: [
      {
        heading: 'Coverage metric',
        body: '`JaCoCo` tests run කරනකොට කුමන lines/branches execute වුනාද measure කරලා coverage % report කරනවා. Untested code find කරන්න useful. ඒත් high coverage = good tests කියලා guarantee නෑ (assertions weak වෙන්න පුළුවන්). Metric එකක් විතරයි — target 100% chase කරන්න එපා.',
      },
    ],
    analogy: 'Checklist එකක් වගේ — කොච්චර items cover කලාද පේනවා, ඒත් cover කරාම හරියට කරා කියලා නෙවෙයි.',
    code: [
      {
        filename: 'jacoco.txt',
        language: 'plaintext',
        code: `mvn test jacoco:report   -> target/site/jacoco/index.html

Class            Line Cov   Branch Cov
ResolutionSvc     87%        75%
ChurnEngine       92%        88%
# gaps highlight untested paths (edge cases)`,
        note: 'Find untested paths — not a quality guarantee alone.',
      },
    ],
    mortar:
      'Mortar CI JaCoCo coverage — critical logic (resolution, churn, billing) untested branches surface කරනවා. Coverage gate (e.g. min 80% on core) ඒත් meaningful assertions focus — number chase නෙවෙයි.',
    keyPoints: ['JaCoCo = line/branch coverage %.', 'Finds untested code.', 'High coverage ≠ good tests — assertions matter.'],
  },

  '10.3.2': {
    summary: 'Static analysis (SonarQube) = code run නොකර bugs, smells, vulnerabilities, duplication detect කරනවා.',
    sinhala: [
      {
        heading: 'Automated review',
        body: '`SonarQube` source code scan කරලා bugs, code smells, security vulnerabilities (OWASP — 11.3.1), duplication, complexity, coverage automated ර-eview කරනවා. CI gate එකක් විදිහට — quality standards enforce, tech debt track. Human review වලට complement.',
      },
    ],
    analogy: 'Spell/grammar checker එකක් වගේ — ලියන ගමන් mistakes automatic highlight.',
    code: [
      {
        filename: 'sonar.bash',
        language: 'bash',
        code: `mvn verify sonar:sonar -Dsonar.projectKey=mortar-resolution

# quality gate example (fails the CI build):
#  - 0 new bugs / vulnerabilities
#  - < 3% duplication
#  - >= 80% coverage on new code`,
        note: 'CI quality gate = enforce standards automatically.',
      },
    ],
    mortar:
      'Mortar CI/CD SonarQube quality gates — security vulnerabilities (SQL injection, hardcoded secrets), bugs, duplication merge වෙන්න කලින් block. Enterprise security (PROJECT_IDEA 10.5) posture automated, consistent across teams.',
    keyPoints: ['Static analysis = no execution needed.', 'Bugs/smells/vulns/duplication.', 'CI quality gate enforces standards.'],
  },

  '10.3.3': {
    summary: 'CI/CD (Jenkins/GitHub Actions/GitLab CI) = build, test, analyse, deploy automate කරන pipelines.',
    sinhala: [
      {
        heading: 'Automated delivery',
        body: '`CI` (Continuous Integration) — commit එකකදී automatic build + test + analyse (fast feedback, integration issues early). `CD` (Continuous Delivery/Deployment) — passing builds automatically staging/production වලට. Pipelines (Jenkins/GitHub Actions/GitLab CI) manual, error-prone steps automate — fast, reliable, repeatable releases.',
      },
    ],
    analogy: 'Factory assembly line එකක් වගේ — code එකෙන් deployed app එකට automatic, consistent steps.',
    code: [
      {
        filename: 'ci.yml',
        language: 'yaml',
        code: `name: mortar-ci
on: [push]
jobs:
  build:
    steps:
      - run: mvn clean verify         # compile + unit + integration tests
      - run: mvn sonar:sonar          # static analysis gate
      - run: docker build -t mortar . # containerize (11.2.1)
      - run: kubectl apply -f k8s/    # deploy (11.2.2)  [on main]`,
        note: 'Commit → build → test → scan → deploy (automated).',
      },
    ],
    mortar:
      'Mortar microservices CI/CD — each push builds, tests (unit + Testcontainers), Sonar-scans, containerizes, deploys to K8s (preview → prod). 12-factor (8.1.3) + containers (11.2) enable safe, frequent releases across many services.',
    keyPoints: ['CI = auto build/test on commit; CD = auto deploy.', 'Jenkins/GitHub Actions/GitLab CI.', 'Fast, reliable, repeatable releases.'],
  },
};
