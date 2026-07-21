import { RoadmapNode } from '../core/models/roadmap.model';

/**
 * The complete structural roadmap tree (numbers + English titles), mirroring
 * `java_springboot_roadmap.md`. Leaf nodes (no `children`) become routable
 * concept pages; slugs and attached content are wired up in ContentService.
 *
 * Keep this file structure-only. The teaching content lives in
 * `content/concepts/*` keyed by the dotted `number`.
 */

const n = (number: string, title: string, children?: RoadmapNode[]): RoadmapNode => ({
  number,
  title,
  ...(children ? { children } : {}),
});

export const ROADMAP_TREE: RoadmapNode[] = [
  n('1', 'Core Java & Object-Oriented Programming', [
    n('1.1', 'Basics of OOP', [
      n('1.1.1', 'Classes and Objects'),
      n('1.1.2', 'Inheritance'),
      n('1.1.3', 'Abstraction'),
      n('1.1.4', 'Encapsulation'),
      n('1.1.5', 'Polymorphism', [
        n('1.1.5.1', 'Method Overloading (Compile-time)'),
        n('1.1.5.2', 'Method Overriding (Run-time)'),
      ]),
    ]),
    n('1.2', 'Advanced OOP Concepts', [
      n('1.2.1', 'Abstract Classes'),
      n('1.2.2', 'Interfaces (Default and Static methods)'),
      n('1.2.3', 'Abstract Class vs Interface'),
      n('1.2.4', 'Constructor Chaining (this() and super())'),
      n('1.2.5', 'The Diamond Problem & Interface Solutions'),
      n('1.2.6', 'Composition vs Inheritance'),
      n('1.2.7', 'Association, Aggregation, and Composition'),
    ]),
    n('1.3', 'Java Keywords and Modifiers', [
      n('1.3.1', 'Access Modifiers'),
      n('1.3.2', 'The static keyword'),
      n('1.3.3', 'The final keyword'),
      n('1.3.4', 'transient and volatile'),
    ]),
    n('1.4', 'Data Types and Memory', [
      n('1.4.1', 'Primitives vs Wrappers'),
      n('1.4.2', 'Autoboxing and Unboxing'),
      n('1.4.3', 'String, StringBuilder, StringBuffer'),
      n('1.4.4', 'String Pool (Interning)'),
      n('1.4.5', 'Pass by Value vs Pass by Reference'),
    ]),
  ]),

  n('2', 'Advanced Java Concepts', [
    n('2.1', 'Exception Handling', [
      n('2.1.1', 'Checked vs Unchecked Exceptions'),
      n('2.1.2', 'try-catch-finally Mechanics'),
      n('2.1.3', 'throw vs throws'),
      n('2.1.4', 'Custom Exceptions'),
      n('2.1.5', 'Try-with-resources (AutoCloseable)'),
    ]),
    n('2.2', 'Java Collections Framework', [
      n('2.2.1', 'Hierarchy of Collections'),
      n('2.2.2', 'List: ArrayList, LinkedList, Vector, CopyOnWriteArrayList'),
      n('2.2.3', 'Set: HashSet, LinkedHashSet, TreeSet'),
      n('2.2.4', 'Map: HashMap, LinkedHashMap, TreeMap, ConcurrentHashMap'),
      n('2.2.5', 'Internal Working of HashMap'),
      n('2.2.6', 'Fail-Fast vs Fail-Safe Iterators'),
    ]),
    n('2.3', 'Generics', [
      n('2.3.1', 'Bounded Type Parameters (extends, super)'),
      n('2.3.2', 'Wildcards (?)'),
      n('2.3.3', 'Type Erasure'),
    ]),
    n('2.4', 'Multithreading & Concurrency', [
      n('2.4.1', 'Thread Lifecycle and States'),
      n('2.4.2', 'Creating Threads (Thread, Runnable, Callable)'),
      n('2.4.3', 'Thread Synchronization'),
      n('2.4.4', 'Inter-thread Communication (wait/notify)'),
      n('2.4.5', 'Deadlock, Livelock, and Starvation'),
      n('2.4.6', 'Java Concurrency API', [
        n('2.4.6.1', 'Executors Framework'),
        n('2.4.6.2', 'Future and CompletableFuture'),
        n('2.4.6.3', 'Concurrent Collections'),
        n('2.4.6.4', 'Locks (ReentrantLock, ReadWriteLock)'),
        n('2.4.6.5', 'Synchronizers (CountDownLatch, CyclicBarrier, Semaphore)'),
      ]),
      n('2.4.7', 'ThreadLocal'),
    ]),
  ]),

  n('3', 'Modern Java Features (Java 8 to 21)', [
    n('3.1', 'Java 8 Features', [
      n('3.1.1', 'Functional Interfaces'),
      n('3.1.2', 'Lambda Expressions'),
      n('3.1.3', 'Method References (::)'),
      n('3.1.4', 'Streams API', [
        n('3.1.4.1', 'map, filter, flatMap, reduce, collect'),
        n('3.1.4.2', 'Parallel Streams and ForkJoinPool'),
      ]),
      n('3.1.5', 'Optional class'),
      n('3.1.6', 'New Date and Time API (java.time)'),
    ]),
    n('3.2', 'Java 9 to 21 Highlight Features', [
      n('3.2.1', 'Java Module System (Project Jigsaw)'),
      n('3.2.2', 'var keyword (Local-Variable Type Inference)'),
      n('3.2.3', 'Records'),
      n('3.2.4', 'Text Blocks'),
      n('3.2.5', 'Pattern Matching (instanceof & switch)'),
      n('3.2.6', 'Sealed Classes'),
      n('3.2.7', 'Virtual Threads (Project Loom)'),
    ]),
  ]),

  n('4', 'JVM Internals & Memory Management', [
    n('4.1', 'JVM Architecture', [
      n('4.1.1', 'ClassLoader Subsystem'),
      n('4.1.2', 'Memory Areas (Heap, Stack, Method Area...)'),
      n('4.1.3', 'Execution Engine (Interpreter, JIT, Profiler)'),
    ]),
    n('4.2', 'Garbage Collection (GC)', [
      n('4.2.1', 'How GC Works (Mark and Sweep)'),
      n('4.2.2', 'Generations (Young, Old, Metaspace)'),
      n('4.2.3', 'Types of GC (Serial, Parallel, G1, ZGC, Shenandoah)'),
      n('4.2.4', 'Memory Leaks in Java'),
      n('4.2.5', 'GC Tuning Flags'),
    ]),
  ]),

  n('5', 'Software Design Principles & Patterns', [
    n('5.1', 'SOLID Principles', [
      n('5.1.1', 'Single Responsibility Principle (SRP)'),
      n('5.1.2', 'Open/Closed Principle (OCP)'),
      n('5.1.3', 'Liskov Substitution Principle (LSP)'),
      n('5.1.4', 'Interface Segregation Principle (ISP)'),
      n('5.1.5', 'Dependency Inversion Principle (DIP)'),
    ]),
    n('5.2', 'Other Core Principles', [
      n('5.2.1', 'DRY (Don’t Repeat Yourself)'),
      n('5.2.2', 'KISS (Keep It Simple, Stupid)'),
      n('5.2.3', 'YAGNI (You Aren’t Gonna Need It)'),
    ]),
    n('5.3', 'Design Patterns (GoF)', [
      n('5.3.1', 'Creational Patterns', [
        n('5.3.1.1', 'Singleton'),
        n('5.3.1.2', 'Factory Method'),
        n('5.3.1.3', 'Abstract Factory'),
        n('5.3.1.4', 'Builder'),
        n('5.3.1.5', 'Prototype'),
      ]),
      n('5.3.2', 'Structural Patterns', [
        n('5.3.2.1', 'Adapter'),
        n('5.3.2.2', 'Decorator'),
        n('5.3.2.3', 'Facade'),
        n('5.3.2.4', 'Proxy'),
      ]),
      n('5.3.3', 'Behavioral Patterns', [
        n('5.3.3.1', 'Strategy'),
        n('5.3.3.2', 'Observer'),
        n('5.3.3.3', 'Command'),
        n('5.3.3.4', 'Template Method'),
        n('5.3.3.5', 'Chain of Responsibility'),
      ]),
    ]),
  ]),

  n('6', 'Spring Framework Fundamentals', [
    n('6.1', 'Core Concepts', [
      n('6.1.1', 'Inversion of Control (IoC) Container'),
      n('6.1.2', 'Dependency Injection (DI)'),
      n('6.1.3', 'ApplicationContext vs BeanFactory'),
    ]),
    n('6.2', 'Spring Beans', [
      n('6.2.1', 'Bean Lifecycle'),
      n('6.2.2', 'Bean Scopes'),
      n('6.2.3', '@Bean, @Component, @Service, @Repository, @Controller'),
    ]),
    n('6.3', 'Advanced Core Spring', [
      n('6.3.1', 'Spring AOP', [
        n('6.3.1.1', 'Pointcut, Advice, Aspect, Joinpoint'),
        n('6.3.1.2', 'Types of Advice'),
      ]),
      n('6.3.2', 'Profiles and Environment Properties'),
      n('6.3.3', 'Spring Expression Language (SpEL)'),
    ]),
  ]),

  n('7', 'Spring Boot', [
    n('7.1', 'Spring Boot Internals', [
      n('7.1.1', '@SpringBootApplication & Auto-configuration'),
      n('7.1.2', 'Starter Dependencies'),
      n('7.1.3', 'Embedded Servers (Tomcat, Jetty, Undertow)'),
    ]),
    n('7.2', 'Spring Web (REST APIs)', [
      n('7.2.1', 'DispatcherServlet Architecture'),
      n('7.2.2', '@RestController vs @Controller'),
      n('7.2.3', '@RequestMapping, @GetMapping, etc.'),
      n('7.2.4', '@PathVariable, @RequestParam, @RequestBody, @RequestHeader'),
      n('7.2.5', 'Exception Handling', [
        n('7.2.5.1', '@ExceptionHandler'),
        n('7.2.5.2', '@ControllerAdvice & @RestControllerAdvice'),
        n('7.2.5.3', 'Custom Error Responses'),
      ]),
      n('7.2.6', 'Request Validation (@Valid)'),
      n('7.2.7', 'HATEOAS'),
    ]),
    n('7.3', 'Spring Boot Actuator', [
      n('7.3.1', 'Endpoints (health, info, metrics, env)'),
      n('7.3.2', 'Customizing Health Indicators'),
    ]),
    n('7.4', 'Data Access (Spring Data JPA & Hibernate)', [
      n('7.4.1', 'JPA vs Hibernate'),
      n('7.4.2', 'Entity Lifecycle'),
      n('7.4.3', '@Entity, @Table, @Id, @GeneratedValue'),
      n('7.4.4', 'Relationships', [
        n('7.4.4.1', '@OneToOne, @OneToMany, @ManyToOne, @ManyToMany'),
        n('7.4.4.2', 'Fetch Types & N+1 Problem'),
        n('7.4.4.3', 'Cascade Types'),
      ]),
      n('7.4.5', 'Repositories (JpaRepository, CrudRepository...)'),
      n('7.4.6', 'JPQL and Native Queries (@Query)'),
      n('7.4.7', 'Transaction Management (@Transactional)'),
      n('7.4.8', 'Caching in Hibernate'),
    ]),
    n('7.5', 'Spring Security', [
      n('7.5.1', 'Authentication vs Authorization'),
      n('7.5.2', 'SecurityFilterChain'),
      n('7.5.3', 'Password Encoding (BCrypt)'),
      n('7.5.4', 'Implementing JWT'),
      n('7.5.5', 'OAuth2 and OpenID Connect (OIDC)'),
      n('7.5.6', 'Method Level Security'),
      n('7.5.7', 'CORS and CSRF Protection'),
    ]),
  ]),

  n('8', 'Microservices Architecture', [
    n('8.1', 'Principles of Microservices', [
      n('8.1.1', 'Monolith vs Microservices'),
      n('8.1.2', 'Domain-Driven Design (DDD) Basics'),
      n('8.1.3', '12-Factor App Methodology'),
    ]),
    n('8.2', 'Spring Cloud Ecosystem', [
      n('8.2.1', 'API Gateway (Spring Cloud Gateway)'),
      n('8.2.2', 'Service Discovery (Eureka, Consul)'),
      n('8.2.3', 'Distributed Configuration (Config Server)'),
      n('8.2.4', 'Client-side Load Balancing'),
      n('8.2.5', 'Circuit Breaker Pattern (Resilience4j)'),
      n('8.2.6', 'Distributed Tracing (Micrometer, Zipkin, Jaeger)'),
    ]),
    n('8.3', 'Inter-Service Communication', [
      n('8.3.1', 'Synchronous (RestTemplate, WebClient, OpenFeign)'),
      n('8.3.2', 'Asynchronous (Kafka, RabbitMQ, ActiveMQ)'),
      n('8.3.3', 'Event-Driven Architecture (Event Sourcing, CQRS)'),
    ]),
    n('8.4', 'Database Patterns in Microservices', [
      n('8.4.1', 'Database per Service'),
      n('8.4.2', 'Saga Pattern (Choreography vs Orchestration)'),
      n('8.4.3', 'API Composition / Aggregator Pattern'),
      n('8.4.4', 'Outbox Pattern'),
    ]),
  ]),

  n('9', 'Databases, Caching & Performance', [
    n('9.1', 'Relational Databases (SQL)', [
      n('9.1.1', 'ACID Properties'),
      n('9.1.2', 'Isolation Levels'),
      n('9.1.3', 'Indexing (B-Trees, Hash, Composite)'),
      n('9.1.4', 'Query Optimization and Explain Plans'),
      n('9.1.5', 'Sharding vs Partitioning vs Replication'),
    ]),
    n('9.2', 'NoSQL Databases', [
      n('9.2.1', 'Types (Key-Value, Document, Column, Graph)'),
      n('9.2.2', 'CAP Theorem & PACELC Theorem'),
      n('9.2.3', 'MongoDB, Cassandra, DynamoDB Scenarios'),
    ]),
    n('9.3', 'Caching Strategies', [
      n('9.3.1', 'Redis and Memcached'),
      n('9.3.2', 'Cache Aside, Read/Write-Through, Write-Behind'),
      n('9.3.3', 'Cache Eviction Policies (LRU, LFU)'),
    ]),
  ]),

  n('10', 'Testing & Quality Assurance', [
    n('10.1', 'Unit Testing', [
      n('10.1.1', 'JUnit 5 (Jupiter)'),
      n('10.1.2', 'Mocking with Mockito'),
      n('10.1.3', 'AAA Pattern (Arrange, Act, Assert)'),
    ]),
    n('10.2', 'Integration Testing', [
      n('10.2.1', '@SpringBootTest'),
      n('10.2.2', 'Testing Slices (@WebMvcTest, @DataJpaTest)'),
      n('10.2.3', 'Testcontainers'),
    ]),
    n('10.3', 'Quality & CI/CD', [
      n('10.3.1', 'Code Coverage (JaCoCo)'),
      n('10.3.2', 'Static Code Analysis (SonarQube)'),
      n('10.3.3', 'CI/CD Pipelines'),
    ]),
  ]),

  n('11', 'System Design & Deployment', [
    n('11.1', 'High-Level Design (HLD) Components', [
      n('11.1.1', 'Load Balancers (L4 vs L7)'),
      n('11.1.2', 'Content Delivery Networks (CDN)'),
      n('11.1.3', 'Rate Limiting Strategies'),
      n('11.1.4', 'High Availability & Fault Tolerance'),
    ]),
    n('11.2', 'DevOps & Containerization', [
      n('11.2.1', 'Docker'),
      n('11.2.2', 'Kubernetes (K8s) Basics'),
      n('11.2.3', 'Infrastructure as Code (Terraform)'),
    ]),
    n('11.3', 'Security Best Practices', [
      n('11.3.1', 'OWASP Top 10'),
      n('11.3.2', 'Securing REST APIs'),
      n('11.3.3', 'SSL/TLS Implementations'),
    ]),
  ]),
];
