# Cleaning Care — SEO Strategy

A reference doc for content, keyword targeting, and internal linking. Pair with
the implementation in `lib/seo/` and `app/`.

---

## 1. Keyword Clusters (Australian cleaning niche)

Build topical authority by covering each cluster end-to-end (one pillar +
several supporting pages).

### Cluster A — House / residential cleaning

- **Pillar**: "House cleaning services Australia"
- **Supporting pages**: weekly house cleaning, fortnightly cleaning, deep
  cleaning, spring cleaning, post-renovation cleaning, NDIS cleaning, airbnb /
  short-stay cleaning, eco-friendly cleaning.
- **Target intent**: informational + transactional.
- **Sample queries**: "house cleaning near me", "cleaner [city]", "weekly
  cleaning service [city]", "domestic cleaning [city]", "how much does a
  cleaner cost in australia".

### Cluster B — End-of-lease / bond cleaning

- **Pillar**: "End of lease cleaning Australia (bond clean checklist)"
- **Supporting pages**: bond cleaning checklist [city], end-of-lease oven
  cleaning, exit clean carpets, what real estate agents look for, vacate clean
  guarantee.
- **Target intent**: highly transactional, time-sensitive.
- **Sample queries**: "bond cleaning [city]", "end of lease cleaning near me",
  "vacate clean cost", "do I need professional carpet cleaning at end of
  lease".

### Cluster C — Carpet cleaning

- **Pillar**: "Carpet steam cleaning services Australia"
- **Supporting pages**: stain removal, pet odour, drying time, rugs vs wall-to-
  wall, mattress steam cleaning, upholstery cleaning.
- **Sample queries**: "carpet cleaning [city]", "steam clean carpet cost",
  "pet stain carpet cleaning".

### Cluster D — Commercial / office cleaning

- **Pillar**: "Commercial cleaning services Australia"
- **Supporting pages**: office cleaning, retail cleaning, medical-clinic
  cleaning, gym cleaning, school cleaning, after-hours cleaning, daily vs
  weekly contracts.
- **Sample queries**: "office cleaners [city]", "commercial cleaning contract
  [city]", "after hours cleaners".

### Cluster E — Specialty / one-off

- Window cleaning, oven cleaning, tile and grout cleaning, pressure washing,
  builders cleans, hoarder / extreme cleans, biohazard / trauma cleaning.

### Cluster F — Local intent (programmatic)

- Pillar = each `cleaning-services-[city]` page.
- Supporting: suburb-level pages once volume justifies them (e.g.
  `cleaning-services-bondi`).
- Sample queries: "cleaners [suburb]", "[suburb] cleaning company",
  "cleaning services [postcode]".

---

## 2. Internal Linking Map

Hub-and-spoke: home and service pillars link out to clusters; cluster pages
link back up.

```
                 Home  ←──────────────  Location pages (10 metros)
                  │     ╲                       │
                  │      ╲                      │
              Services    ╲                     │
              (pillar)     ╲                    │
              ╱  │  ╲       ╲                   │
     House clean End-lease Carpet  Commercial   │
        │           │       │         │         │
        ▼           ▼       ▼         ▼         │
     Sub-topics  Sub-topics ...   Sub-topics    │
        │___________________________ │__________│
                          ▲                     │
                          └─ all link back ─────┘
```

Practical rules:

1. Every service-detail page links **up** to home and **across** to two
   related services in-body (not just in nav).
2. Every location page links to:
   - Every service page (under "Services available in {city}").
   - The other 9 location pages (under "Other service areas").
   - Home.
3. Home links to the top 4 services + the top 4 cities in-content (not just
   nav).
4. Blog posts (when added) link up to the pillar service for their topic
   cluster.
5. Anchor text: descriptive (e.g. "see our end-of-lease cleaning service in
   Sydney") — not "click here".

---

## 3. Title & Meta Conventions

Encoded in `lib/seo/metadata.ts` via `buildMetadata()`. Patterns:

| Page type           | Title                                                                   |
|---------------------|-------------------------------------------------------------------------|
| Home                | Professional Cleaning Services Across Australia                         |
| Service detail      | {Service} \| Cleaning Services Australia                                |
| Location            | Cleaning Services in {City}, {State}                                    |
| Suburb (future)     | Cleaning Services {Suburb}, {City}                                      |
| Blog index          | Cleaning Tips & Guides                                                  |
| Blog post           | {Post Title}                                                            |

All titles get `| Cleaning Care` appended via the root layout's title template.

Meta descriptions: 150–160 chars, include the primary keyword, include a CTA
("Free quote", "Book online", "Call today"), include a location signal where
applicable.

---

## 4. Schema.org Coverage

Implemented in `lib/seo/jsonld.ts`:

- **Organization** + **WebSite**: every page (root layout).
- **LocalBusiness**: home, contact, every location page (city-scoped).
- **Service**: every service detail page.
- **BreadcrumbList**: home, service, location, about, contact.
- **FAQPage**: home, service detail (cluster-aware FAQs), each location.
- **AggregateRating**: home + each location (Google rating, when available).

Validate after each deploy with [Rich Results
Test](https://search.google.com/test/rich-results).

---

## 5. Content Hygiene

- **Word counts**: pillar pages ≥ 1,000 words; service detail ≥ 700; location
  pages ≥ 600; blog posts ≥ 1,200. Currently location pages and many service
  pages are below this — backfill via the admin content fields.
- **One H1 per page** (enforced via this refactor — see footer fix).
- **Image alt text**: dynamic, descriptive, keyword-aware. The `alt="banner"`,
  `alt="logo"`, `alt="Residential Cleaning"` issues from the audit have been
  cleared site-wide.
- **No thin pages indexed**: confirmation, license, privacy, terms now ship
  `noindex` (they're for users, not search).
- **Canonical**: every page emits an absolute canonical to the apex domain.

---

## 6. Off-page priorities (operator action)

These cannot be coded — flagged here so they're not forgotten:

1. **Google Business Profile**: claim/optimise GBP per metro (Sydney, Melbourne,
   Brisbane, Perth, Adelaide minimum). Service-area business setup, weekly
   posts, photo uploads.
2. **Citations**: AU-relevant directories (TrueLocal, Yellow Pages AU, hipages,
   Oneflare, ServiceSeeking, Word of Mouth).
3. **Reviews**: ramp Google reviews to 100+ per metro. Add a post-job email
   asking for a review with a direct GBP link.
4. **Backlinks**: partner with real-estate agencies (end-of-lease referrals),
   local property managers, AirBnB hosts. Sponsor one local community group
   per city per year.
5. **Search Console**: verify both `cleaningcare.au` and `www.cleaningcare.au`,
   set the apex as canonical, submit `https://cleaningcare.au/sitemap.xml`.
6. **Bing Webmaster Tools**: same.

---

## 7. Measurement

Track in GA4 (already wired via GTM-5XRHMQ22 / G-QMPK2W9W6E):

- Organic sessions per landing page (segment by service vs location vs blog).
- Quote-form submissions per landing page (already firing — confirm event
  schema).
- Time-to-first-byte (TTFB) and LCP per route (Web Vitals → GA4).
- Search Console: impressions and average position per query group (one row
  per cluster from §1).

---

## 8. Suggested next-quarter roadmap

1. Backfill long-form copy in admin for each existing service (`long_description`
   + the section_one / section_two fields).
2. Launch the blog scaffold (`app/(home)/blog/`) with 8 cornerstone posts
   covering each cluster.
3. Add suburb-level pages for the top 5 highest-CTR suburbs per metro.
4. Add `Review` schema (individual reviews) to home — currently only
   `AggregateRating`.
5. Image audit: compress hero images, verify all use AVIF/WebP via
   `next/image` (config now requests both formats).
