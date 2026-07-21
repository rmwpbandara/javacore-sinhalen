Mortar AI Platform — Complete Feature Guide
The AI-Powered Customer Data & Marketing Intelligence Platform
--------------------------------------------------------------------------------
Executive Overview
Mortar is an all-in-one Customer Data Platform (CDP) and marketing activation suite powered by artificial intelligence. It connects to the tools your business already uses — e-commerce stores, CRMs, email platforms, and advertising channels — and unifies all of that data into a single, clean, intelligent view of every customer.
From there, Mortar's AI engines automatically segment your customers, predict who is about to churn, recommend which products to promote to whom, discover profitable product bundles, and forecast which audiences will perform best. You can then activate those insights instantly: build precise audiences, sync them to email and advertising platforms, launch campaigns, buy programmatic media, and measure everything — all from one portal.
Who Mortar is for:
Brands & retailers who want a single view of their customers across every channel
Marketing teams who want AI to do the heavy lifting on segmentation, prediction, and planning
Agencies managing multiple brands who need multi-brand workspaces, dashboards, and billing in one place
--------------------------------------------------------------------------------
Platform at a Glance
Pillar
What You Get
Data Integrations
15+ native connectors (Shopify, WooCommerce, Magento, Klaviyo, Mailchimp, HubSpot, Salesforce, and more) plus flexible CSV upload
Unified Customer Data
AI-powered identity resolution, deduplication, and automatic data enrichment
AI & Predictive Intelligence
Automated segmentation, churn prediction, product recommendations, market basket analysis, audience forecasting
Audiences & Activation
Visual segment builder, list management, one-click sync to Klaviyo, Meta, and Google
Analytics & Dashboards
Pre-built AI analytics plus a full custom dashboard builder
Email & Journeys
Campaign management, visual journey builder, conversion tracking
Social & Display Advertising
Deep Facebook/Meta reporting, Google Analytics insights, AdRoll, benchmarking
Digital Media Buying
Full programmatic campaign creation and management (display advertising)
AI Copilot & Helix Planning
Conversational AI analyst plus a guided, AI-driven campaign planning studio
Administration
Multi-brand management, roles & permissions, billing, enterprise security
--------------------------------------------------------------------------------
1. Data Integrations
Mortar connects directly to your existing platforms and continuously syncs customers, orders, and products into your workspace — no engineering effort required.
1.1 Native Connectors
Platform
Category
Data Synced
Shopify
E-commerce
Customers, products, orders, refunds
WooCommerce
E-commerce
Customers, products, product variations, orders
Magento
E-commerce
Customers, products, orders, invoices
Klaviyo
Email marketing
Customers, email lists, list profiles (two-way sync)
Mailchimp
Email marketing
Audience members / subscribers
Omnisend
Omnichannel marketing
Customer profiles
HubSpot
CRM
Contacts, email subscriptions and subscription changes
Salesforce
CRM
Contacts, leads, accounts, opportunities
Google Ads
Advertising
Ad account connection for audience activation
Facebook / Meta
Advertising
Ad accounts, campaign performance data
Google Analytics (GA4)
Web analytics
Website events and analytics data
Acoustic
Marketing cloud
Mailings, events, and journey data
AdRoll
Advertising
Campaign and audience data
Adform
Programmatic
Campaign, banner, and performance data
Xero
Finance
Invoicing (for agency billing workflows)
1.2 Connector Micro-Features
Guided setup — each connector has a step-by-step connection flow with secure OAuth sign-in where supported (Shopify, Mailchimp, Google Ads, Facebook)
Attribute mapping — view and map customer, sales, and product attributes per connector before syncing
Connection health — live connection status, active connection counts, and last-sync visibility per brand
Sync control — connect, disconnect, or reconfigure any integration at any time; choose sync type where supported (e.g., Klaviyo)
Profile sync settings — control how incoming profiles are matched and merged into your customer base
Extensible source library — beyond native connectors, additional data sources can be provisioned through Mortar's extensible connector framework, so new platforms can be added on request
1.3 CSV / File Upload (Bring Any Data)
For data that lives outside connected platforms, Mortar includes a full file-upload pipeline:
Upload customer, sales, or product files directly into your secure data lake
Instant validation preview — Mortar reads the first 100 records so you can verify the file before processing
Column mapping wizard — map your file's columns to Mortar's schema, with per-column validation
Custom data sources — register your own named data sources so uploads stay organised by origin
Error handling — download an error file listing any rejected rows, fix, and re-upload
Upload history — a complete audit trail of every file processed
Merge completion — uploaded records flow through the same cleansing and identity-resolution pipeline as connector data
--------------------------------------------------------------------------------
2. Unified Customer Data (The CDP Core)
Raw data from multiple systems is messy: the same customer appears three times, product names differ between platforms, and records are incomplete. Mortar fixes this automatically.
2.1 AI-Powered Identity Resolution
Mortar's identity resolution engine finds and merges duplicate customer records across all your data sources:
Exact matching — records with matching email addresses are merged with confidence
AI semantic matching — a deep-learning model converts customer attributes into mathematical representations and finds near-duplicates that simple rules would miss (e.g., "Jon Smith" vs "Jonathan Smith" at the same address)
Smart candidate detection — advanced indexing keeps matching fast even across millions of records
Transitive merging — if A matches B and B matches C, all three are unified into a single golden record
The result: one accurate, deduplicated profile per real customer, no matter how many systems they appear in.
2.2 Product Resolution
The same product often appears under different names across sales channels. Mortar:
Automatically clusters similar product names using AI (including a graph neural network model that learns how your catalog relates)
Presents exact matches, possible matches, and potential matches for review
Lets your team merge, edit merges, un-merge, or ignore suggestions with a purpose-built review screen
Maintains a normalized product master so analytics and recommendations are always based on the true catalog
2.3 Sales Resolution
Every sales transaction is validated, deduplicated, and linked to the correct unified customer and normalized product — giving you a clean, trustworthy sales history that updates incrementally as new data arrives.
2.4 Automatic Data Enrichment
Mortar fills the gaps in your customer data automatically:
Name inference — extracts first and last names from email addresses when missing
Gender prediction — machine-learning model infers likely gender from first name (for demographic analytics)
Email validation — bulk-validates email addresses and flags invalid ones (protecting your sender reputation)
Location enrichment — geocodes addresses to standardised suburb, state, and country
Phone enrichment — enriches and verifies phone number data
2.5 My Customers — The Customer Explorer
A powerful, fast grid over your entire unified customer base:
Keyword search across all customers, with live result counts
Advanced sorting and filtering on any attribute, per brand
Custom columns — add, remove, and save your preferred column layout; layouts persist per user
Encrypted column handling — sensitive fields are encrypted and only visible to authorised roles
Visual query builder — build multi-condition filters without writing any code; save queries and reuse them later
Saved advanced queries — create, update, and manage a personal library of complex customer queries
Quick find and full exports — export any filtered view of customers to file
Favourites — mark favourite products for fast access in analysis views
This-week counters — see at a glance how many customers were added this week
CDP profile counts — track total known profiles across the platform
2.6 Customer 360 Profile
Click any customer to open a complete single-customer view:
Personal details — name, gender, and all known contact details
Multiple emails and phone numbers, each with validation status
Full address with standardised location data
Sales summary — total spend, average order value, full purchase history
Product history — every product the customer has bought
Segment membership — which AI segments the customer belongs to
Churn insight — the customer's churn status and predicted churn date
Email engagement — mailings received, opens, clicks, and journey participation
--------------------------------------------------------------------------------
3. AI & Predictive Intelligence
Mortar's machine-learning models run automatically over your unified data and keep themselves up to date — no data science team required.
3.1 Automated Customer Segmentation
Every customer is scored on Recency, Frequency, Monetary value, and Tenure (RFM+T) and assigned to one of seven behavioural segments:
Segment
Meaning
VIP
Your best customers — frequent, recent, high-value
Sporadic VIP
High spenders who purchase irregularly
Committed
Consistent, loyal repeat purchasers
New
Recently acquired customers
One-Off
Bought once, never returned
Dormant
Previously active, now going quiet
Lapsed
Effectively lost — long inactive
Segments refresh automatically as new sales data arrives, so your view of the customer base is always current.
3.2 Churn Prediction
Mortar learns each customer's individual purchase rhythm and predicts churn at the individual customer level:
Calculates each customer's expected purchase interval from their own transaction history
Classifies every customer as Active, Soft-Churned (overdue for a purchase), or Hard-Churned (statistically lost)
Predicts the date each active customer will cross into churn — so you can intervene before it happens
Surfaces supporting metrics: average spend, purchase count, and days since last purchase
Churn statuses are available in analytics, on customer profiles, and as targeting conditions in the segment builder.
3.3 Product Recommendations
A collaborative-filtering recommendation engine (the same family of technology used by major retailers) learns from your entire purchase history:
Top 10 recommended products for every customer, ranked with an affinity score from 0–100
Top matching customers for every product — perfect for finding the right audience for a product push
Recommendations retrain regularly so they reflect current buying behaviour
3.4 Market Basket Analysis (Promotion Discovery)
Mortar mines your transaction data for statistically significant product associations:
Discovers which products are bought together, with full statistical backing (support, confidence, lift, and conviction scores)
Automatically flags BOGO opportunities (buy-one-get-one candidates) where one product strongly drives another
Automatically identifies product bundle opportunities where combinations of products predict a third purchase
Thresholds adapt to your store's order volume, so results stay meaningful for both small and large catalogs
3.5 Target Audience Forecasting
Mortar identifies which audience profiles will perform best in the future, not just the past:
Builds audiences from location (suburb/state/country), gender, and age band
Applies time-series forecasting (the same statistical techniques used in demand planning) to each audience's conversion rate
Surfaces high-performing audiences whose forecast conversion beats your baseline, each with a performance index score
Ideal for deciding where to focus acquisition spend
3.6 Demographic Analytics
Instant answers on who your customers are: gender distribution, customer counts and spend by location, and income and age breakdowns by product category.
--------------------------------------------------------------------------------
4. Audiences: Lists & Segments
Turn insight into targeting. Mortar's audience tools let you define exactly who you want to reach, then push those audiences wherever you need them.
4.1 Visual Segment Builder
Build precise audiences with a drag-free, no-code condition builder. Three condition types can be combined in one segment:
Attribute conditions — any customer attribute (demographics, location, spend, source, custom fields) with full AND/OR logic and nested rule groups
Event conditions — behavioural rules based on customer events, with dynamic dropdowns of available event types and values
Predictive conditions — target directly on Mortar's AI outputs: churn status, behavioural segment, recommendation affinity, and more
Micro-features:
Live profile counts — see how many customers match as you build, streamed in real time (no waiting on large databases)
Segment detail views — inspect exactly which profiles are in any segment
Full-screen builder with real-time validation of every rule
Edit, duplicate, and delete segments at any time
4.2 Lists
Create static lists from any filter, with real-time creation progress for large lists
View, search, and paginate list members
Edit list settings; track profile counts per list
4.3 Exports & Activation
CSV export of any list or segment (with streamed generation for very large audiences)
DSP export — export audiences formatted for demand-side advertising platforms
Segment Sync — connect ad platform accounts as destinations, validate them, and set up recurring syncs that keep audiences fresh:
Klaviyo — two-way list and segment sync, with pause/resume control per sync and sync-count monitoring
Meta (Facebook/Instagram) — push segments as Custom Audiences for ad targeting; engineered to handle audiences of tens of millions of profiles
Google — audience sync to Google's advertising ecosystem
--------------------------------------------------------------------------------
5. Analytics & Dashboards
5.1 AI Analytics Suite
Purpose-built analytical views, powered by the AI models above:
Churn Analytics
Churn breakdowns over time with chart and table views
Export churn data and sales data for offline analysis
Segment Analysis (RMFT)
Per-segment customer totals
Average days since last purchase, average revenue per customer, and average purchase count by segment
Data-source distribution and top-5 products per segment
Demographic and location breakdowns by segment
Product Analysis
Top and bottom 10 products by revenue and by quantity, with date filtering
Custom product categories — create your own categories, mark favourites, and analyse by category
Per-category customer analytics: age, gender, income, and acquisition-source distributions
Highest-volume customer lists by revenue and quantity, with export
Top/bottom products within any filtered customer group
Demographics
Gender distribution, customer counts by location, and spend by location
5.2 Custom Dashboards (Business Intelligence)
A full BI layer built into the platform:
Create unlimited custom dashboards with a professional dashboard editor (powered by embedded enterprise BI technology)
Default dashboards provided out of the box for immediate value
Copy dashboards within a brand or across multiple brands — perfect for agencies rolling out a standard reporting pack
Dashboard search, pagination, publish status, and chart counts
Dashboard ownership management for team governance
Custom-field awareness — dashboards adapt to your custom data columns
5.3 Home Dashboard
The landing view brings your marketing performance together: conversions and impressions across date ranges, ad platforms, brands, and email campaigns in one picture.
--------------------------------------------------------------------------------
6. Email Marketing & Customer Journeys
6.1 Campaign Management
Create, search, sort, and manage email campaigns
Paginated campaign lists with full campaign counts
Mailing lists by date range and organisation
6.2 Visual Journey Builder
Design multi-step customer journeys on a visual canvas
Save, name, duplicate, and manage a library of journeys
Import journey definitions from file
Search and sort saved journeys
6.3 Tracking & Conversions
Mailing-level tracking: sends, opens, clicks per mailing and per domain
Journey-level mail tracking — see performance across an entire automated journey
Conversion tracking — conversions per mailing, per action, and down to individual contact detail
Sent-mailing reporting by organisation
6.4 Klaviyo Deep Integration
View Mortar and Klaviyo lists side by side in one combined view
Create Klaviyo lists or Mortar lists from either side, with streamed progress for large lists
List sync — keep Mortar lists and Klaviyo lists continuously in sync; pause, resume, or delete syncs at any time
Segment sync — push AI segments to Klaviyo on a schedule, with per-sync edit and toggle control
Profile and sync-count monitoring so you always know what's synced
--------------------------------------------------------------------------------
7. Social & Display Advertising
7.1 Facebook / Meta Advertising Intelligence
Secure account connection, then deep performance reporting at every level of the hierarchy:
Campaign level — results, spend, and performance with breakdowns by platform placement, age, gender, and device; live campaign status
Ad set level — the same complete breakdown set per ad set, plus ad-set status
Ad level — creative-level performance across platform, age, gender, and device
Last-sync visibility so you know exactly how fresh the data is
Cost markup management — apply data-CPM adjustments for agency billing transparency
7.2 Google Analytics Reporting
Audience reports, user path/flow reports, device reports, and country reports — inside Mortar, alongside your other channels
7.3 AdRoll
Campaign data and single-campaign deep dives
Attribution summaries and UTM attribution reporting
New-visitor insights and audience graphs, including segment-level views
7.4 Benchmarking
Compare campaign performance against benchmark data with multi-dimensional filtering (channel, cost, impressions, conversions) over daily, weekly, and monthly windows
7.5 Support Workflow (HubSpot Ticketing)
Raise and track support tickets, attach notes, and search company tickets without leaving the platform
--------------------------------------------------------------------------------
8. Digital Media Buying (Programmatic Display)
A complete programmatic buying workspace, so teams can plan, launch, and measure display campaigns in the same platform that holds their audience data:
8.1 Campaign Creation & Management
Create programmatic campaigns with geographic targeting from available location libraries
Manage campaign status (activate/pause) across your whole campaign list
Line items — create and manage line items under each campaign
Banners & creatives — upload banners, manage creative settings, deactivate creatives, and create click-through URLs
8.2 Targeting
First-party audiences — target the segments you built in Mortar
Third-party audiences — browse and apply third-party audience marketplaces
Contextual targeting with unified taxonomy support
Brand safety controls
Custom segment rules per line item
8.3 Reporting
Report statistics with percentage views, order statistics, and banner-level details and summaries
Performance graphs and statistics per campaign
Full pricing visibility
--------------------------------------------------------------------------------
9. AI Copilot & Helix Planning Studio
9.1 AI Copilot — Your Conversational Data Analyst
Ask questions about your business in plain language and get answers, charts, and recommendations in seconds:
Natural-language Q&A over your own customer, sales, and marketing data — answers stream in real time
Automatic visualisations — the Copilot generates charts and graphs when they help answer the question
Multi-source intelligence — combines your database, uploaded documents, and web knowledge into one answer
Smart follow-ups — suggested next questions keep the analysis flowing
Predefined question library to help teams get started
Marketing Mix Modelling data — interrogate media-mix model outputs conversationally
Media plan & report export — turn a Copilot conversation into an exportable media plan or report
Workspaces keep Copilot work organised:
Create unlimited workspaces per brand; copy, rename, and manage them
Custom instructions per workspace — tune how the Copilot behaves for each project
Move conversations between workspaces; full chat history with pagination
Asset library — upload files to a workspace, process them into the Copilot's knowledge, and download or manage them at any time
9.2 Helix — AI-Guided Campaign Planning Sessions
Helix is Mortar's flagship AI planning studio: a structured, expert-grade campaign planning workflow run by a team of specialised AI agents, with you in control at every step.
A Helix planning session walks your team through nine professional planning stages:
Brief Onboarding — capture and structure the campaign brief
Challenge Diagnosis — diagnose the real business and communications challenge
Comms Task Profiling — define what communications must achieve
Audience Profiling — build a data-driven picture of the target audience
Channel Effectiveness — assess which channels can deliver the task
Channel Mix Optimisation — optimise the mix across channels
Flighting Optimisation — optimise timing and phasing of activity
Scenario Planning — compare alternative plans and budget scenarios
Comms Framework — produce the final integrated communications framework
Key capabilities:
Human-in-the-loop at every stage — each stage pauses for your review; approve, refine, or redirect before the AI continues
Interactive canvases — each stage produces rich, visual, interactive outputs (not just text)
Grounded in your data — the AI draws on your unified customer data, documents, and market context
Real-time streaming — watch the AI's work appear live
Session management — track ongoing and completed planning sessions, search and filter them, and revisit any stage
Feedback capture — rate each step so outputs keep improving
Exportable deliverables — export the finished plan for stakeholders
--------------------------------------------------------------------------------
10. Administration, Security & Platform
10.1 Multi-Brand / Agency Management
Run multiple brands in one account, each with fully isolated data
Per-brand integrations, dashboards, audiences, and users
Brand-level settings, activation/deactivation, and deletion
Agency views across all tenants
10.2 User Management
Self-service signup with email validation and confirmation flows
Invite and remove users per brand
Role-based access control — permissions govern menus, data access, and sensitive-data visibility
Profile management, password change, and secure password-reset by email
Multi-factor authentication (MFA) support
10.3 Billing & Subscriptions
Subscription plan management with plan changes and coupon support
Card management and transaction history
Invoicing — create, send, download, and manage invoices, including recurring invoices (integrated with Xero for agency workflows)
10.4 Notifications
Automated email notifications for sync completions, exports, user invitations, and password resets
Proactive error alerts so issues never go unnoticed
10.5 Security & Privacy
Enterprise single sign-on — authentication built on industry-standard OAuth2/OpenID Connect
Complete tenant isolation — every brand's data is segregated at the platform level
Field-level encryption for sensitive customer data, with decryption restricted to authorised roles
Token-based API security across every service, with automatic session refresh
In-app support and engagement via integrated customer-messaging tools
--------------------------------------------------------------------------------
How Mortar Works — The Data Journey
Connect — link your stores, CRMs, email tools, and ad accounts in minutes, or upload files directly. Data flows into Mortar continuously through a real-time streaming pipeline.
Cleanse & Unify — every record lands in Mortar's governed data lake, where AI identity resolution merges duplicates and product/sales resolution builds clean master data.
Enrich — missing names, genders, locations, and contact validity are filled in automatically.
Predict — machine-learning models continuously score every customer: segment, churn risk, product affinity, and audience potential.
Activate — build audiences visually and sync them to Klaviyo, Meta, Google, and programmatic channels; launch email journeys and media campaigns.
Measure — dashboards, AI analytics, and cross-channel reporting close the loop, while the AI Copilot and Helix turn results into the next plan.