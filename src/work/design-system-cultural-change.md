---
title: "Transforming a design system through cultural change"
deck: "Implementing strategic problem-solving in design system development"
topics:
  - "Cultural change"
  - "Design systems"
  - "Leadership"
  - "Product management"
  - "UX design"
  - "UI design"
hero: "/img/design-system-cultural-change/hero.png"
thumb: "/img/design-system-cultural-change/thumb.png"
heroAlt: "Transforming a design system through cultural change"
order: 4
---

## Strategic trigger

The Quantium Design System had become a source of design churn and team frustration. Designers were required to contribute, but the system lacked structure, ownership, and direction. Contributions were often limited to surface-level fixes that addressed symptoms rather than root problems. Meanwhile, larger foundational issues went unaddressed, creating inconsistencies in our product designs and inefficiencies in our workflow.

I recognised that to evolve the Quantium Design System, we needed to treat design system work like any other UX project: structured, owned, problem-led, and user-informed. That became the North Star for a cultural and operational shift in our design practice.

## Key stakeholders

Driving this change required influencing multiple stakeholders:

- The head of design, whose buy-in was essential for enabling structural change
- The team's design system maintainers, whose workflows would be significantly altered
- A diverse group of designers and engineers, many of whom were used to contributing reactively, with little influence

## The challenge

When I began using the Quantium Design System extensively, I discovered it was difficult to work with, particularly in Figma. Our designs frequently didn't translate properly to the coded version of the system. Team members would spend considerable time on minor fixes, while systemic issues persisted. A particularly telling example was the recurring question around which shade of grey to use for element outlines: "grey 6 or grey 7?" Designers would frequently need to ask this, resulting in rework, misalignment, and inconsistency across products. The lack of clear system guidance led to repeated confusion and design debt. Everyone was expected to contribute to the design system, but most people only had an hour or two to spare, which meant they could only tackle minor tasks. Without someone taking ownership of larger problems, they weren't being addressed. The system had also become rigid, with rules that sometimes contradicted good UX principles.

{% figure "/img/design-system-cultural-change/figure-1.png", "Symptomatic, isolated designing had produced disjointed component styles across products" %}

## Change catalyst: Problem-driven entry point

While between projects, I worked hands-on with the Quantium Design System. That revealed usability issues in both Figma and production. I documented these problems in a clear, visual presentation that highlighted real product consequences such as colour misapplication and heuristic violations. I used the presentation to build a case for change and framed it as a call to action. During a key meeting, I asked a simple question: "Who is solving the biggest problems in the design system?" The response was silence. That moment became a turning point for everyone in the room.

## Introducing the EPIC framework

To replace scattered, one-off contributions, I introduced a structured approach we called the **EPIC framework**. This model treated each foundational area of the design system as its own UX project, problem-led and team-owned. EPIC stood for:

- **E**stablish the problem (through interviews, heuristics, and research)
- **P**rioritise the themes and opportunities
- **I**nvestigate the root causes collaboratively
- **C**o-create structured solutions

We broke down the system into discrete epics such as Spacing, Colour, Radius, and Typography. We prioritised these epics based on effort, foundational impact, and the opportunity to test new ways of working.

We piloted the EPIC framework with the Spacing Epic, applying design research, team workshops, and co-creation methods to understand the problem space. From there, we developed new patterns and naming conventions that addressed underlying issues, not just surface-level symptoms. This approach helped us move from reactive patching to system-wide improvement.

{% figure "/img/design-system-cultural-change/figure-2.png", "The design system EPIC roadmap" %}
{% figure "/img/design-system-cultural-change/figure-3.png", "The design system high-level plan" %}
{% figure "/img/design-system-cultural-change/figure-4.png", "Colour epic planning" %}

## Cultural shift: From enforcing rules to enabling principles

A major cultural barrier was the rigid rulebook mentality. Designers were expected to follow established patterns for the sake of consistency, even when they contradicted usability principles. I reframed the system as an enabler, not an enforcer, with the mantra: "Consistency is important. But being consistently wrong is not great." This mindset shift gave designers permission to question defaults. In critiques, designers began presenting reasoned arguments for breaking certain rules. Those breakpoints became inputs into a prioritised backlog for system evolution.

A key technical innovation supporting this cultural shift was the introduction of semantic tokens. Instead of designers having to remember specific colour codes (like "grey-3" or "blue-500"), we created tokens named by their function or intent, such as "outline" or "negative-alert". Quantium products are often white-labelled or rebranded for external clients. Previously, redesigning a product to match a client's brand required months of resourcing, manually replacing hard-coded tokens tied to Quantium's palette. With semantic tokens in place, the system became more "headless": we could define theme-able roles (like "negative-alert") and swap them out across brands without rebuilding the UI from scratch. This reduced the effort and cost of onboarding new clients and future-proofed the system for scale.

## Introducing the new model to the team

We introduced the EPIC framework and our new contribution approach through structured team presentations. These sessions created space for open discussion, feedback, and reflection. By walking through the rationale and inviting critique, we shifted how the team saw their role in shaping the design system. This wasn't a one-off announcement, but an invitation to co-own the system's future. Over time, designers started to identify with the EPIC model and bring their own thinking into future contributions.

## Results and impact

- Team members moved from blindly following rules to making informed decisions based on design principles
- Design critiques evolved from enforcing consistency to discussing user experience
- The backlog of systemic issues became visible and actionable rather than ignored
- Foundational issues were prioritised, leading to improvements in the design system
- Fixes began to resolve multiple issues at once rather than causing new problems, which reduced rework and lowered the overall cost of maintaining the system

{% figure "/img/design-system-cultural-change/figure-5.png", "Collaborative problem solving in practice: workshop output from the team" %}

## Key learnings

- **Asking the right questions:** Questions that highlighted current limitations were the most effective catalyst for change. By asking who was responsible for solving our biggest problems, I was able to demonstrate the need for a different approach.
- **Challenging "the way it's always been done":** A breakthrough came from questioning established ways of working. The phrase "we've always done it this way" had become a barrier to improvement.
- **Balancing consistency with quality:** Consistency matters, but not at the expense of quality. Our goal became consistent, high-quality designs, not consistency for its own sake.

## Conclusion

Transforming the Quantium Design System meant changing how we approached the work. We moved from scattered fixes to strategic problem-solving, from following rules blindly to making informed decisions. Today the design system is easier to use, trust, evolve, and teach.
