READ ORDER

1. CONTENT_[PHILOSOPHY.md](http://PHILOSOPHY.md)

2. ARCHIVE_[SYSTEM.md](http://SYSTEM.md)

3. ARCHIVE_OPERATING_[LOGIC.md](http://LOGIC.md)

# ONI — Archive System Canon

## Position

This document is the foundational intelligence layer for the ONI archive system.

It sits between `CONTENT_PHILOSOPHY.md` — which establishes the studio's editorial position
toward content — and `ROADMAP.md` Phases 6–9 — which sequence the technical implementation
of that content system.

`CONTENT_PHILOSOPHY.md` answers: *what kind of thing is the archive, and what does it hold?*  
`ARCHIVE_SYSTEM.md` answers: *how is the archive structured, what are its objects, and how does it behave?*  
`ROADMAP.md` answers: *in what order do we build it?*

This document does not implement. It defines the architecture that implementations will build from.
Future AI agents and developers working on the archive should treat this document as authoritative
for the archive's object model, schema direction, territorial behavior, contributor logic, and
surface structure.

---

## 1. Archive Philosophy

### Archive as Spatial Field

The archive is not a section of the site. It is a deeper spatial layer of the same environment
the homepage establishes.

The homepage presents six territories — spatial anchors in the studio's practice. The archive
is what those territories contain. It does not begin with a list and end with pagination. It
begins with atmospheric conditions and deepens by association. A visitor entering the archive
does not switch to a new context. They continue into the same space — at increased depth.

The archive has texture, density, and direction. Objects within it do not occupy equivalent
positions. They exist at different spatial weights, different disclosure depths, different
distances from the surface. Two objects in the same territory may be encountered in very
different ways depending on their archetype, their relational density, and how far into the
archive the visitor has traveled.

This is not a metaphor. It has direct consequences for how objects are arranged, how they
are disclosed, and how the atmospheric infrastructure behaves at each layer.

### Artifacts, Not Portfolio Cards

Portfolio cards are equivalent containers. Each card receives the same dimensions, the same
layout, the same amount of surface area — a premise of neutrality that produces sameness.
The archive does not operate this way.

Archive objects are artifacts. Each artifact has its own spatial weight. A resolved Work
occupies more territory in the archive field than a Process Artifact from the same project.
A Signal Entity may carry no visual footprint of its own while shaping the spatial character
of every object around it. The archive's arrangement acknowledges these differences rather
than flattening them.

### Atmospheric Browsing

The archive does not demand a destination. It can be moved through without intent — by
territory, by density, by the ambient gravity of what sits nearby. A visitor who arrives
without a specific object in mind may still encounter the archive as a coherent spatial
experience. What they find depends on how far they travel, not on which filter they activate.

This is the opposite of search-first behavior. The archive accommodates search — by slug,
by title, by territory — but does not require it. The spatial logic produces its own forms
of discovery.

### Editorial Navigation

The spatial arrangement of objects in the archive field is an authored decision, not an
algorithmic sort. Curated proximity is the organizing intelligence.

Date and recency are honest metadata that each object carries — the archive is transparent
about time. But recency is not the navigation logic. Newer content does not rise to the top
of the field. Older content does not recede below a fold. Objects find their positions in the
archive based on their territory, their spatial weight, their authored associations, and the
curatorial decisions made about the field's spatial composition.

### Non-Feed Logic

The archive produces no feed. There is no infinite scroll. There is no publication timestamp
that surfaces newer content ahead of older content. There is no algorithmic recommendation
layer. There is no "you might also like" mechanic.

Content finds its position in the archive field based on what it is and who placed it there —
not on when it arrived.

This is not a technical constraint. It is a philosophical commitment. A feed is a river: it
moves in one direction, carries content past the viewer, and requires continuous supply to
function. The archive is a room: its objects persist, accumulate, and become richer in
relationship as more of them exist. The difference is architectural.

### Relationship Between Archive and Territories

The six territories on the homepage are not navigation categories. They are not filters.
They are spatial zones in the studio's practice — territories with distinct character, distinct
discipline families, and distinct atmospheric conditions.

The archive inherits this structure. Every archive object belongs to one or more territories.
Its territorial membership determines how it is encountered, what spatial conditions surround
it, and what other objects it may find as neighbors. Territory is not a label applied to
content after the fact — it is a primary field in the object model, assigned during authoring.

---

## 2. Object Model

The ONI archive recognizes seven canonical object types. Each has a defined purpose, a
spatial weight, a disclosure depth, behavioral characteristics, and a role within the
archive's spatial ecology.

---

### Work

The primary archive object. A resolved studio engagement — an investigation into a specific
problem, a collaborator's brief, or an internal studio question pursued to completion. Works
are the gravitational centers of the archive. Other objects orbit them or originate from them.

**Purpose:** Primary record of the studio's resolved output.  
**Spatial weight:** Maximum. Dominant presence in the archive field.  
**Disclosure depth:** Full — a surface entry point with a complete interior document. A Work
has both a surface presence in the archive field and an interior that rewards sustained attention.  
**Behavioral characteristics:** Slow reveal; dense typography; imagery as evidence rather than
illustration; no temporal urgency; no summary copy on the surface. You read it or you do not.  
**Archive role:** Gravitational anchor. Generates satellite objects — Process Artifacts during
production, Writings in its aftermath, Signal Entities across the connections it creates.
Works do not reference each other directly; they connect through Signal Entities and authored
relational fields in the schema.

---

### Event

A time-bound studio occurrence with archive permanence. Presentations, installations with
scheduled activations, exhibitions, public lectures, collaborative moments with external
participants. Events carry temporal coordinates that other archive objects do not — they
happened at a specific moment, in a specific place, and that moment is constitutive of what
they are.

**Purpose:** Temporal record of the studio's external presence and public practice.  
**Spatial weight:** Medium. Present in the archive field without dominance.  
**Disclosure depth:** Variable. Some events produce minimal records — a date, a location, a
brief notation. Others produce documentation as rich as a Work: photography, video, written
reflection.  
**Behavioral characteristics:** Carries a fixed date and location — not as metadata only, but
as spatial character. The event is anchored to time in a way Works are not. Documentation
may include media, writing, or both. Spatial treatment is lighter than a Work.  
**Archive role:** Temporal anchor. May connect to Works that originated from or continued
after the event. May connect to Writings that responded to it. Creates chronological landmarks
in a deliberately non-chronological archive.

---

### Writing

Authored text. A Writing is itself the artifact — not documentation of something else.
It exists because a position required precision that could not be delivered visually or
through the record of a project.

**Purpose:** Authored record of the studio's thinking at resolution. A Writing says one
thing and says it with exactness.  
**Spatial weight:** Moderate. Present in the archive field at editorial weight — neither
dominant nor ghost.  
**Disclosure depth:** Full text or nothing. No excerpt logic, no preview copy, no truncated
introduction. You enter the Writing or you read the title and move on. The archive surface
shows a title, a year, and a reading duration — no more.  
**Behavioral characteristics:** Text is the primary structural element. Atmospheric
conditions reduce to allow reading. Images, if present, appear as evidence within the text
— they do not illustrate. A Writing has no calls to action, no embedded summary, no
key-takeaway section.  
**Archive role:** Positions the studio's thinking in time. May connect to multiple Works
it spans without belonging to any single one. May generate Signal Entities through the
positions it articulates. Functions as an independent record, not as a Work's appendix.

---

### Code Artifact

Work where code is the medium. Not infrastructure, not a prototype, not a demo. A Code
Artifact is a made thing — it executes in a browser but produces an aesthetic or
experiential result worth encountering in its own right. It runs; running is its form.

**Purpose:** Record of the studio's technical production as creative output.  
**Spatial weight:** Light on the archive surface; dense in the interior. The artifact itself
carries the weight — the surface entry is minimal.  
**Disclosure depth:** The running or rendered artifact is the entry point. Technical
documentation and written context are optional and supplementary — the artifact does not
require explanation to be encountered.  
**Behavioral characteristics:** Live or static presentation of the artifact at the center of
the page. Surrounding text is minimal or absent. The archive surface shows a title or the
artifact itself — no required description.  
**Archive role:** Experimental record. May be referenced by a Work that originated it or a
Writing that discusses it. May exist independently in a territory without a parent Work.
Code Artifacts are content — not a sub-brand, not a "labs" section.

---

### Atmospheric Fragment

The most diffuse archive object. A color field, a texture study, an untitled image, a single
sentence without context. Atmospheric Fragments do not deliver information. They set
conditions. They are ambient — the temperature of a period, the residue of a process that
produced something else alongside them.

**Purpose:** Atmospheric record. Sets conditions in the archive field rather than communicating
content. Thickens the environment without requiring attention.  
**Spatial weight:** Minimal. Ghost presence in the archive field — encountered, not sought.  
**Disclosure depth:** Surface only. No interior required. The fragment is what it presents.  
**Behavioral characteristics:** No required title. No required description. Carries a medium
classification and a date. May be entirely untitled by intention. Encountered rather than
indexed.  
**Archive role:** Ambient accumulation. Provides the diffuse texture between heavier objects.
May be attached to a Work as its atmospheric residue, or may exist independently in
Atmospheric Fragments territory. In aggregate, Fragments are more significant than
individually — the territory they populate is one of ONI's six canonical fields.

---

### Process Artifact

Provisional material — a direction tried and not completed, a render from a discarded
approach, a tool built for a single project and not kept. Process Artifacts are evidence,
not content. They do not explain themselves. They are available to the genuinely curious,
not promoted to the general visitor.

**Purpose:** Evidence record of the studio's working practice. What was tried, what
opened questions, what was discarded, and why.  
**Spatial weight:** Light. Accessible but not prominent. The archive field does not surface
Process Artifacts unless the visitor is already deep in a Work's territory.  
**Disclosure depth:** Minimal surface presence. Interior documentation is brief — a
classification, a date, a parent Work if applicable. No narrative required.  
**Behavioral characteristics:** Carries a classification (sketch / render / technical /
fragment / discarded). Carries a date and a parent Work if applicable. May contradict its
parent Work — that contradiction is part of the record, not a problem to resolve.  
**Archive role:** Evidence layer. Connects to Works as production history. May exist
independently when the Work itself was never completed.

---

### Signal Entity

A conceptual force or recurring motif that traverses the archive. A Signal Entity is not
a tag. It is not a category. It is a genuine signal — an idea, a constraint, a material
condition, an unresolved question — that appears across multiple Works, Writings, and
Fragments because it was genuinely present in each of them.

Signal Entities are detected and named by the studio. They are not assigned during content
creation. They emerge when sufficient mass accumulates in the archive and specific patterns
become legible across objects from different territories and different periods.

**Purpose:** Reveal the deep connective tissue of the studio's practice across time and
archetype. Make the archive's associative logic visible without reducing it to taxonomy.  
**Spatial weight:** Zero individual weight. Present as relational infrastructure, not as
a content object. A Signal Entity does not occupy space in the archive field — it shapes
the space between objects.  
**Disclosure depth:** Encountered through the objects that carry it. May have a minimal
record of its own once it has been named and stabilized — a brief authored statement, the
set of objects where it manifests. Nothing more is required.  
**Behavioral characteristics:** Not browseable in isolation. Surfaces as relational metadata
on connected objects. May become visible in the archive field as a spatial relation — not
as a page or a card, but as a thread connecting objects that otherwise seem unrelated.  
**Archive role:** Non-taxonomic associative layer. The connective tissue of the archive.
The mechanism through which the archive becomes more than a collection of individual objects.

---

## 3. Canonical Schema Direction

This section defines a future-facing structured object model — the fields all archive objects
share and the fields that are archetype-specific. This is architecture direction, not
implementation. No code is specified here.

Schema files, when implemented, should include commentary that maps each field back to this
document. The schema is the implementation of the model defined above.

---

### Universal Fields

Every archive object — regardless of archetype — carries the following fields.


| Field            | Type           | Notes                                                                                                                  |
| ---------------- | -------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `slug`           | string         | Permanent. Lowercase hyphenated. No UUID. No category prefix. Set once at creation and never changed after publishing. |
| `archetype`      | enum           | `Work` | `Event` | `Writing` | `CodeArtifact` | `AtmosphericFragment` | `ProcessArtifact` | `SignalEntity`             |
| `year`           | integer        | Year made or published. Honest. Required.                                                                              |
| `territories`    | string[ ]      | Array of territory IDs. One or more. Field IDs as defined in the territory system.                                     |
| `visibility`     | enum           | `draft` | `published` | `archived` | `unlisted`                                                                        |
| `atmosphereType` | enum           | `heavy` | `editorial` | `experimental` | `ambient` | `ghost`                                                           |
| `behaviorType`   | enum           | `static` | `generative` | `cinematic` | `typographic` | `encounter`                                                    |
| `contributors`   | Contributor[ ] | Array of contributor records. May be empty for studio-only work.                                                       |
| `signalEntities` | string[ ]      | Array of Signal Entity slugs this object participates in. Assigned retroactively.                                      |


---

### Archetype-Specific Fields

These fields extend the universal model per archetype. Fields not marked as required are
optional — their absence is intentional, not incomplete.

**Work**


| Field              | Notes                                                                                 |
| ------------------ | ------------------------------------------------------------------------------------- |
| `title`            | Required.                                                                             |
| `summary`          | 1–2 sentences. Editorial anchor only. Never displayed publicly.                       |
| `narrative`        | MDX body. The authored interior of the Work. Required before publishing.              |
| `cover`            | Primary media asset. Required.                                                        |
| `media`            | Additional media assets. Array.                                                       |
| `domain`           | Array. `spatial` | `motion` | `identity` | `technical` | `editorial` | `experimental` |
| `status`           | `resolved` | `ongoing`                                                                |
| `processArtifacts` | Array of related Process Artifact slugs.                                              |
| `relatedEntities`  | Authored associations. Array of slugs (any archetype). Assigned by studio.            |


**Event**


| Field           | Notes                                       |
| --------------- | ------------------------------------------- |
| `title`         | Required.                                   |
| `date`          | ISO date string (`YYYY-MM-DD`). Required.   |
| `location`      | Physical or virtual location string.        |
| `documentation` | MDX body. Optional.                         |
| `media`         | Array of media assets.                      |
| `relatedWorks`  | Authored connections to related Work slugs. |


**Writing**


| Field             | Notes                                                                     |
| ----------------- | ------------------------------------------------------------------------- |
| `title`           | Required or `null`. Null is intentionally untitled — not a missing value. |
| `readingDuration` | Integer, minutes. Calculated from body length.                            |
| `body`            | MDX body. Full text. Required before publishing.                          |
| `relatedWorks`    | Works this Writing responds to. Array of slugs.                           |


**Code Artifact**


| Field           | Notes                                                   |
| --------------- | ------------------------------------------------------- |
| `title`         | Required or `null`. Untitled artifacts are valid.       |
| `componentPath` | Path to the React component that is the artifact.       |
| `documentation` | MDX body. Optional. Subordinate to the artifact itself. |
| `techContext`   | Brief technical classification string. Optional.        |
| `parentWork`    | Slug of the originating Work, if applicable.            |


**Atmospheric Fragment**


| Field        | Notes                                                      |
| ------------ | ---------------------------------------------------------- |
| `title`      | `null` by default. Optional and intentional when present.  |
| `medium`     | `image` | `text` | `color` | `texture` | `sound` | `mixed` |
| `media`      | Primary media asset. Required.                             |
| `parentWork` | Slug of the originating Work, if applicable.               |


**Process Artifact**


| Field            | Notes                                                        |
| ---------------- | ------------------------------------------------------------ |
| `title`          | Optional.                                                    |
| `classification` | `sketch` | `render` | `technical` | `fragment` | `discarded` |
| `media`          | Primary media asset. Required.                               |
| `parentWork`     | Slug of the originating Work, if applicable.                 |
| `notes`          | Brief optional text. Not editorial prose.                    |


**Signal Entity**


| Field            | Notes                                                     |
| ---------------- | --------------------------------------------------------- |
| `name`           | Required. The signal's designated studio name.            |
| `description`    | Brief authored positioning statement. What the signal is. |
| `manifestations` | Array of object slugs where this signal is present.       |
| `firstDetected`  | Year (integer). When the studio first named this signal.  |


---

### Schema Notes for Future Implementation

- All enum values are named in this document. Implementations should not invent new enum
members without revising this canon first.
- `territories` uses the canonical territory IDs established in `WorkSection/index.tsx`:
`spatial-identity`, `system-architectures`, `editorial-motion`, `experimental-media`,
`archive-research`, `atmospheric-fragments`.
- `relatedEntities` / `relatedWorks` / `processArtifacts` are always authored associations —
never computed by matching fields. The studio decides what connects to what.
- `signalEntities` on individual objects and `manifestations` on Signal Entities are
two sides of the same relationship. They should resolve to the same set when traversed.
- `visibility: archived` marks objects that remain in the system's record but are not
surfaced in the public archive field. They are not deleted.
- `visibility: unlisted` marks objects accessible by direct slug but not surfaced in any
archive index or territory field.

---

## 4. Territory Behaviors

Each of the six homepage territories defines a distinct behavioral zone inside the archive.
Content within a territory does not inherit generic archive behavior — it inherits the
atmospheric conditions, media treatment, layout logic, and interaction register specific
to that territory.

This is not cosmetic differentiation. The territories have genuinely different characters
because the work that happens inside them is genuinely different. The archive amplifies
those differences rather than normalizing them into a shared container.

---

### SPATIAL IDENTITY — FIELD / 01

*campaigns / graphics / world systems*

**Character:** The heaviest territory. Works here are often extended visual systems — campaigns
deployed across media, formats, and time. The archive surface for Spatial Identity is dense
with resolved objects that have production histories.

**Media behavior:** Imagery-forward. Large, evidence-grade media with minimal surrounding text.
Video documentation where available and appropriate. No thumbnail economy — images appear
at a scale that respects the work.

**Layout behavior:** Maximum breathing room. Wide, horizontal compositions. Imagery
proportionally dominant. Typography restrains itself to allow visual evidence to occupy
its rightful space.

**Interaction tone:** Authoritative. Slow reveal. The visitor approaches the work; the work
does not perform for the visitor.

**Atmosphere density:** Full. All atmospheric infrastructure active, including depth parallax,
field presence, and cinematic reveal timing.

**Navigation style:** Entry by title and year. Cover image is atmospheric context — it is
not a click target that previews the interior. The visitor commits to entry before seeing
the full interior.

---

### SYSTEM ARCHITECTURES — FIELD / 02

*automation / platforms / bots*

**Character:** Process-heavy, often invisible in its final deployed form. Works here are
infrastructure — the artifact may be a running system, not an image. Documentation is
technical and specific rather than atmospheric. The archive must honor the work's
computational character.

**Media behavior:** Diagrammatic. SVG topology. State readouts. Signal behavior preferred
over static screenshots. Living artifacts where technically feasible. The archive record
for a running system should carry some trace of that system's behavior — not a photograph
of a screen.

**Layout behavior:** Structured. Grid-logical. Room for annotation, code fragments, and
technical context alongside visual documentation.

**Interaction tone:** Infrastructural. Dormant signal aesthetics. The work is computation
that precedes the visitor — the archive record carries that sense of an ongoing process
that does not pause to acknowledge an audience.

**Atmosphere density:** Medium. Signal traversal behavior active. Field motion reduced
relative to Spatial Identity — the territory's character is precision, not atmosphere.

**Navigation style:** Technical classification visible on the archive surface. Domain
taxonomy is more expressive here than in other territories — the distinction between
automation work and platform work and bot work matters.

---

### EDITORIAL MOTION — FIELD / 03

*typography / motion / interfaces*

**Character:** Time-based work. Motion graphics, typographic systems, interface design
where motion is a primary material. Works here require media to be understood — a
static image of a motion system is an incomplete record.

**Media behavior:** Video-first. Loop-capable media where available. Motion preserved in
the archive record. A still frame is permissible as a surface entry point, but the interior
must contain the work in motion.

**Layout behavior:** Measured. Typographic hierarchy is expressive — this territory values
precision in text treatment. Horizontal compositions predominate. The grid is more
disciplined than in Experimental Media.

**Interaction tone:** Refined. Where the archive surface carries motion, that motion
responds at the same register as the work it documents — not faster, not more spectacular.

**Atmosphere density:** Medium. Reveal timing is calibrated to editorial rhythm. No
ambient spectacle — the motion belongs to the work, not to the archive surface.

**Navigation style:** Title and year dominant. An animated thumbnail is contextual
— it is not the primary entry mechanic. Entry is by title.

---

### EXPERIMENTAL MEDIA — FIELD / 04

*touchdesigner / mixed media / installations*

**Character:** Process-intensive, often site-specific or hardware-dependent. Works here
may not have a pure-digital archive form. A TouchDesigner installation, a mixed-media
object, a physical installation: these cannot be reproduced in the archive. The
documentation is evidence of the encounter, not a reproduction of it.

**Media behavior:** Documentation photography. Process video. Hybrid media acceptable
where the work's nature demands it. The media record acknowledges that it is partial —
a record of something that existed in a different context.

**Layout behavior:** Irregular. Composition varies by work. The archive does not enforce
a grid cadence on territory that resists gridding. Objects occupy the space they require.

**Interaction tone:** Open. The encounter is the point, and the archive surface reflects
that openness — less structured, less anticipatory of the visitor's path.

**Atmosphere density:** Variable. The atmospheric conditions of the archive surface for
this territory may be sparse or dense depending on the original atmospheric character
of the work being documented.

**Navigation style:** Encounter-based. No systematic preview behavior. The visitor
arrives at the territory and enters the field without knowing in advance what they
will find.

---

### ARCHIVE RESEARCH — FIELD / 05

*writings / investigations / visual essays*

**Character:** The writing territory. Works here are Writings and visual essays —
long-form, precise, authored. The archive surface for Archive Research is typographic
and unhurried. Nothing here announces itself.

**Media behavior:** Text-primary. Images appear as evidence within the text, never as
illustration outside it. A visual essay may have a single defining image on the archive
surface. Writings have none — the title and reading duration are the only surface data.

**Layout behavior:** Reading column dominant. The interior layout is governed by the
`systems/typography/` reading system (Phase 7–8): 65–75 character measure, generous
leading, consistent typeface (Inter). The reading column is not disrupted by motion
or atmospheric effects.

**Interaction tone:** Intellectual. Settled. The visitor is invited to read — everything
else withdraws.

**Atmosphere density:** Reduced. The atmospheric infrastructure steps back at the
reading layer. No drift, no pulse, no ambient motion in or near the reading column.
The backdrop continues; the atmospheric behavior reduces to its most restrained state.

**Navigation style:** Title, year, and reading duration. No preview text. Entry is a
commitment. A visitor who selects a Writing has decided to read it.

---

### ATMOSPHERIC FRAGMENTS — FIELD / 06

*ambient residue / field material*

**Character:** The most diffuse territory. No individual object here demands attention.
Its significance is experienced as collective texture — the accumulated residue of
process and period. Objects in this territory are encountered, never sought.

**Media behavior:** Image, color field, texture, brief text, ambient sound (when future
infrastructure supports it). Single media assets. No required captions. No required
titles. The fragment presents itself without explanation.

**Layout behavior:** Dense and irregular at the territory level; minimal at the
individual object level. Objects may not have strict individual boundaries. The field
itself is the layout unit — the accumulation matters more than any single object.

**Interaction tone:** Ambient. Encounter-based. No interactive mechanics. The territory
does not respond to the visitor's presence — it persists independently of attention.

**Atmosphere density:** Ghost. Near-invisible individual presence. The collective weight
of many fragments produces density without any single fragment being heavy. The
atmospheric infrastructure for this territory is its most reduced — object presence
fades at the edges.

**Navigation style:** No index required. Objects in this territory may be encountered
through proximity to heavier objects in adjacent territories — a Fragment from a Work's
production period appearing in the field near that Work's surface presence.

---

## 5. Contributor System

ONI is simultaneously a studio identity and the frame through which individual practitioners
work. The archive must accommodate both without collapsing one into the other.

A studio identity without individual recognition produces corporate anonymity. Individual
recognition without a studio frame produces a loose collection of portfolios. The contributor
system is designed to hold both simultaneously.

---

### Credit Philosophy

Credit in the ONI archive is attributed and honest. It does not flatten individual
contribution into studio credit, and it does not fragment studio identity into individual
brands competing for the same surface.

ONI is always the primary frame. Work is positioned as studio output first — this reflects
the reality that studio infrastructure, editorial vision, client relationships, and
production systems belong to the studio as a whole. Contributor attribution exists within
that frame, not alongside it as a competing identity.

Credit for work made before ONI's formation is handled editorially. The studio takes no
retroactive credit for individual work predating the studio's existence. Individual work
does not claim studio infrastructure it was not produced within.

When credit is uncertain or disputed — when the nature of a collaboration is ambiguous —
the default is to under-claim rather than over-claim. An honest partial record is more
valuable than an inflated complete one.

---

### Contributor Visibility

Contributors are recorded at the object level — in the schema, in the archive metadata,
and in the object's editorial interior where appropriate.

Three levels of contributor visibility are recognized:

**Credited.**  
The contributor is named in the object record. Their name appears in the archive interior
of that object — in the Work's documentation, the Writing's byline, the Event's record.
No dedicated contributor page is required. Their presence in the archive is established
through the objects they contributed to.

**Attributed.**  
The contributor has accumulated enough object connections that a minimal contributor
record becomes meaningful. This record surfaces when their name is referenced across
multiple objects — it is not a personal portfolio page, but a disambiguation and presence
record. A brief description of their role at ONI, the objects they are credited on, and
nothing more.

**Invisible.**  
Some contributors prefer not to be individually identified. Studio credit applies.
No contributor record exists. This is always a documented agreement at the schema level —
a field value, not a missing field.

---

### Project Attribution Logic


| Production context                                       | Attribution logic                                                                                   |
| -------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| Studio collaboration (multiple contributors)             | Studio credit primary; contributors credited in the interior record.                                |
| Single contributor under the studio frame                | Studio credit primary; authoring contributor attributed prominently in the interior.                |
| Personal project entered the studio system retroactively | Origin noted editorially in the Work record; studio credit reflects actual studio involvement only. |
| External collaborator (not a studio contributor)         | Named in the Work record at the appropriate scope; no contributor record created.                   |
| Client work where client credit is contractually limited | Production credit internal only; client-facing framing follows the agreement.                       |


---

### Personal Portfolio Coexistence

Contributors may maintain personal portfolios outside ONI. The archive does not attempt
to subsume these.

If a contributor's work exists in both the ONI archive and their personal portfolio,
both references are legitimate and neither supersedes the other.

The ONI archive record is authoritative for the studio's version of that work — the
context, the territorial membership, the associations with other ONI objects. The
personal portfolio record is authoritative for the contributor's account of their
individual practice.

No conflict exists between these two records if both are honest about what they are.

---

### Contributor Schema Direction


| Field        | Notes                                                             |
| ------------ | ----------------------------------------------------------------- |
| `id`         | Stable identifier. Slug format.                                   |
| `name`       | Display name. Required.                                           |
| `visibility` | `credited` | `attributed` | `invisible`                           |
| `role`       | Brief role description. Optional.                                 |
| `url`        | External URL for personal portfolio or site. Optional.            |
| `objects`    | Resolved from the objects that reference this contributor's `id`. |


---

## 6. Archive Surface Logic

The archive is a layered environment. Each layer has its own spatial character, its own
rules of entry, and its own relationship to the atmospheric infrastructure. The layers
are not pages. They are depths.

---

### The Four Layers

**HOME — Territory Field**

The homepage. Six territories arranged as a spatial compositional field — not a navigation
menu, not a sitemap. The territories are anchors. They indicate the shape of the studio's
practice without delivering its contents.

The homepage is the widest layer. It shows the most surface area with the least content
depth. The six territories are present as titles, scales, field annotations, and — in some
territories — latent media behavior that signals the character of what lies inside. Nothing
on the homepage is the archive. Everything on the homepage is oriented toward it.

---

**ARCHIVE FIELD — Cross-Archetype Surface**

The archive layer reached from the territory field. Entry is by territory — the visitor
passes through one of the six territory anchors on the homepage and enters the archive
field for that territory, or they reach the cross-archetype archive index directly.

The archive field is not a grid. It is a spatial surface where archive objects exist at
different densities, different scales, and different positions based on their territorial
membership, their spatial weight, and their authored associations.

The atmospheric infrastructure extends fully into the archive field layer. The backdrop
continues. The atmosphere system operates at the archive field as it does on the homepage.
The visitor does not feel that they have arrived somewhere different. They feel that they
have gone deeper into the same place.

No date-sorted feed. No "latest" section. No algorithmic recommendation. The field's
spatial logic is its navigation.

---

**ARTIFACT INSPECTION — Individual Object View**

The interior of a single archive object. The spatial character at this layer is determined
entirely by the archetype of the object being inspected.

A Work: a full spatial document. Editorial heading, domain classification, cover under
full atmospheric treatment, authored interior — dense, slow, evidence-based.

A Writing: a reading column. Typographic, calm, atmospheric conditions reduced to allow
sustained reading. No distractions.

A Code Artifact: the artifact itself. Centered, running or statically rendered. Documentation
subordinate to the work. The page serves the artifact.

An Atmospheric Fragment or Process Artifact: minimal. The object and its metadata. No
surrounding editorial apparatus.

Artifact inspection extends the atmospheric infrastructure without reestablishing it. The
backdrop continues. Atmospheric primitives (`FadeIn`, `RevealUp`) are in use at the
appropriate density for each archetype. The visitor does not experience a context switch
— they experience a narrowing.

---

**IMMERSIVE ENVIRONMENTS — Territory Expansions**

Not every territory has an immersive environment, and those that do are not guaranteed
to exist at a fixed, permanent address.

Immersive environments are activations — spatial experiences associated with a territory
or a specific Work that extend the studio's practice into the medium of the site itself.
They may be entered from within a Work's interior, from the archive field when a territory
reaches sufficient density, or by direct authored reference.

These are not interactive demos. They are not marketing microsites. They are the most
extreme depth the archive reaches — places where the site stops being a container for
content and becomes an artifact in its own right.

The requirements for an immersive environment are: genuine depth of content in the
territory that motivates it, and a spatial concept for the environment that exceeds what
the standard artifact inspection layer can deliver.

---

### Structural Diagram

```
HOME
└─ territory field (6 territories as spatial compositional field)
   └─ ARCHIVE FIELD
      └─ objects at spatial weight / territory / authored association
         └─ ARTIFACT INSPECTION
            └─ archetype-specific interior document
               └─ IMMERSIVE ENVIRONMENT
                  (activated from specific Works or territory mass; not universally present)
```

---

### Entry and Traversal Logic

Entry from HOME to ARCHIVE FIELD: via territory navigation from the territory field.
Entry from ARCHIVE FIELD to ARTIFACT INSPECTION: by object selection.
Entry from ARTIFACT INSPECTION to IMMERSIVE ENVIRONMENT: via explicit authored trigger
within the object — never automatic, never ambient.

The archive does not enforce a single traversal path. A visitor may arrive at an
Artifact Inspection directly from an external link. A visitor may enter the archive field
and remain there without entering any individual object. A visitor may enter an Immersive
Environment from a Work without having visited the Archive Field that contains it.

Traversal is spatial, not linear. The layers are accessible independently. Their relationship
is depth, not sequence.

---

### What Each Layer Is Not

**HOME is not** a preview of archive contents. It is the territory field — a spatial
statement about the shape of the practice, not a contents page.

**ARCHIVE FIELD is not** a grid of cards. It is a spatial surface. The distinction is
architectural — a grid of cards is a neutral container; a spatial surface has authored
character.

**ARTIFACT INSPECTION is not** a template with slots to fill. It is an archetype-specific
spatial document. Different archetypes produce genuinely different documents.

**IMMERSIVE ENVIRONMENTS are not** easter eggs or hidden content. They are made because
the work justifies them.

---

## 7. Content Ingestion Philosophy

The archive is designed to grow without requiring structural revision. Each new content
addition follows the established schema and enters the existing spatial logic. No new
configuration is required to add a Work, a Writing, or a Fragment.

The system should feel — to the person adding content — like placing an object in a
space that already knows how to hold it.

---

### Easy Content Addition

Content addition is a schema operation and a content operation. A new Work requires: a
typed metadata object added to the content registry, an MDX file for the interior narrative
where required, and media assets placed in the appropriate directory structure.

No deployment configuration changes. No database updates. No form-filling. The repository
is the source of truth. The archive builds from it at build time.

Process Artifacts and Atmospheric Fragments have simpler addition paths than Works — they
require less metadata and no interior narrative. An Atmospheric Fragment may be added
with nothing more than a media asset and a date.

Content can be added to the archive in any state of completeness using `visibility: draft`.
A draft object exists in the system with its schema complete; it does not appear on the
public archive surface until `visibility: published`.

---

### AI-Readable Structure

The archive schema is designed to be explicitly legible to AI systems assisting future
development and content work.

Field names are semantic. Every field has a defined purpose in this document. The schema
is as flat as the data's relationships allow — nested only where the relationship requires
nesting. Commentary in schema files maps each field back to this canon document.

No magic values. All enum members are named in this document. No opaque identifiers. No
abbreviated field names that require context to interpret.

This document itself is part of the AI-readable layer. Future AI agents working on the
ONI archive system should be able to read `ARCHIVE_SYSTEM.md` and understand the full
object model, schema direction, and spatial logic without accessing implementation files.
This is an explicit design goal.

---

### Scalable Archive Expansion

The archive scales horizontally — more objects in more territories — without structural
revision. The seven archetypes defined in this document are designed to cover the full
range of the studio's output for the foreseeable operational horizon. New archetypes
are possible but require a deliberate revision of this canon document, not an ad-hoc
schema extension.

New territories require the same: revision of this document, deliberate expansion of
the territory system, and a considered decision about what the territory contains and
how it behaves. Territories are not added incrementally.

The archive is designed for a slow, deliberate accumulation of depth — not rapid expansion
of surface area.

---

### Metadata-First Architecture

Every archive object is complete at the metadata level before its interior content is
authored. The `slug`, `archetype`, `year`, `territories`, `visibility`, `atmosphereType`,
and `behaviorType` fields define the object's identity in the system. Interior content —
`narrative`, `body`, `media` — layers in after.

An object with complete metadata and `visibility: draft` is a valid archive entity. It
exists in the system with a defined identity. It does not appear on the public archive
surface until it is published. This supports gradual content development: the archive's
spatial logic and associative structure can be established before every object is
interior-complete.

Metadata is the object's commitment to the archive. The interior content fulfills that
commitment.

---

### Reusable Archive Logic

The archive rendering layer is archetype-aware but archetype-generic at the field level.
A single archive field component handles spatial arrangement logic for all object types.
Archetype-specific visual treatment is defined by the schema fields (`atmosphereType`,
`behaviorType`, `archetype`) and passed to rendering — not hardcoded per-archetype.

This means a new archetype requires a schema definition, a spatial treatment specification
in this document, and a rendering variant — not a parallel rendering system.

The territory behavioral logic defined in Section 4 is similarly reusable: territory
atmospheric conditions, media behavior, and layout behavior are defined per territory
and applied to any object of any archetype that belongs to that territory.

---

### Modular Content Growth

Content grows by object addition. The archive field widens. Territory densities increase.
Associative relationships multiply. No new infrastructure, no new navigation patterns,
no new surface-level UI is required for the first years of content accumulation.

When a territory reaches sufficient density to warrant territory-level spatial organization
within the archive field — when the mass of objects in that territory has grown beyond
what the flat field can hold gracefully — that expansion is an authored curatorial decision.
It is planned and executed deliberately. It is not triggered by a metric or a content count.

The transition from a sparse archive field to a dense one should feel like a garden maturing,
not a database scaling.

---

## Document Relations


| Document                     | Relationship to this document                                                                   |
| ---------------------------- | ----------------------------------------------------------------------------------------------- |
| `CONTENT_PHILOSOPHY.md`      | Foundational editorial position. Establishes what the archive is and what it holds. Read first. |
| `CONTENT_SYSTEM.md`          | Filesystem-native authoring model — object territory, registry, ingestion, non-goals.           |
| `ARCHIVE_OPERATING_LOGIC.md` | Browse/inspect operational authority — `mediaAspect`, masonry, layered runtime truth.           |
| `ARCHITECTURE.md`            | Technical infrastructure canon. Atmospheric system, layout system, section architecture.        |
| `VISUAL_LANGUAGE.md`         | Aesthetic direction. Color, typography, motion register, layout character.                      |
| `ROADMAP.md`                 | Implementation sequencing. Phases 6–9 build what this document defines.                         |
| `AI_RULES.md`                | Behavioral rules for AI and human contributors working inside the codebase.                     |
| `NAVIGATION_ARCHITECTURE.md` | Navigation system specification. Surface-level traversal infrastructure.                        |


This document is the authoritative source for archive object definitions, schema direction,
territorial behavior, contributor logic, and surface layer architecture. When implementation
decisions conflict with this document, this document takes precedence unless explicitly
revised.