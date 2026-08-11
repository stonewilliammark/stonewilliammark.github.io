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

The Quantium Design System had become a source of significant design churn and team frustration. Designers were required to contribute, but the system lacked structure, ownership, and strategic direction. Contributions were often limited to surface-level fixes that addressed symptoms rather than root problems. Meanwhile, larger foundational issues went unaddressed, creating inconsistencies in our product designs and inefficiencies in our workflow.

I recognised that to meaningfully evolve the Quantium Design System, we needed to treat design system work like any other UX project—structured, owned, problem-led, and user-informed. This realisation became the North Star for a cultural and operational shift within our design practice.

## Key stakeholders

Driving this change required influencing multiple stakeholders:

- The head of design, whose buy-in was essential for enabling structural change
- The team's design system maintainers, whose workflows would be significantly altered
- A diverse group of designers and engineers, many of whom were accustomed to reactive, low-influence contribution models

## The challenge

When I began using the Quantium Design System extensively, I discovered it was difficult to work with—particularly in Figma. Our designs frequently didn't translate properly to the coded version of the system. Team members would spend considerable time on minor fixes, while systemic issues persisted. A particularly telling example was the recurring question around which shade of grey to use for element outlines—"grey 6 or grey 7?" Designers would frequently need to ask this, resulting in rework, misalignment, and inconsistency across products. The lack of clear system guidance led to repeated confusion and design debt. Everyone was expected to contribute to the design system, but most people only had an hour or two to spare, which meant they could only tackle minor tasks. Without someone taking ownership of larger problems, they simply weren't being addressed. The system had also become quite rigid, with rules that sometimes contradicted good UX principles.

{% figure "/img/design-system-cultural-change/figure-1.png", "Symptomatic, isolated designing had produced disjointed component styles across products" %}

## Change catalyst: Problem-driven entry point

While between projects, I took the opportunity to work hands-on with the Quantium Design System. This direct experience revealed a system with significant usability issues, both in Figma and in production. I documented these problems in a clear, visual presentation that highlighted real product consequences—such as colour misapplication and heuristic violations. I used this presentation to build a case for change, positioning it not just as a critique, but as a call to action. During a key meeting, I asked a simple but significant question: "Who is solving the biggest problems in the design system?" The response was silence. That moment of recognition became a turning point for everyone in the room.

## Introducing the EPIC framework

To replace scattered, one-off contributions, I introduced a structured approach we called the **EPIC framework**. This model treated each foundational area of the design system as its own UX project—dedicated, problem-led, and team-owned. EPIC stood for:

- **E**stablish the problem (through interviews, heuristics, and research)
- **P**rioritise the themes and opportunities
- **I**nvestigate the root causes collaboratively
- **C**o-create structured solutions

We broke down the system into discrete epics—such as Spacing, Colour, Radius, and Typography—and prioritised them based on effort, foundational impact, and the opportunity to test new ways of working.

We piloted the EPIC framework with the Spacing Epic. In that epic, we applied design research, team workshops, and co-creation methods to deeply understand the problem space. From there, we developed new patterns and naming conventions that addressed underlying issues, not just surface-level symptoms. This approach helped us move from reactive patching to intentional, system-wide improvement.

{% figure "/img/design-system-cultural-change/figure-2.png", "The design system EPIC roadmap" %}
{% figure "/img/design-system-cultural-change/figure-3.png", "The design system high-level plan" %}
{% figure "/img/design-system-cultural-change/figure-4.png", "Colour epic planning" %}

## Cultural shift: From enforcing rules to enabling principles

A major cultural barrier was the rigid rulebook mentality. Designers were expected to follow established patterns for the sake of consistency, even when they contradicted usability principles. I reframed the system as an enabler, not an enforcer, with the mantra: "Consistency is important—but being consistently wrong is not great." This mindset shift gave designers permission to question defaults. In critiques, designers began presenting reasoned arguments for breaking certain rules—and those breakpoints became inputs into a prioritised backlog for system evolution.

A key technical innovation that supported this cultural shift was the introduction of semantic tokens. Instead of designers having to remember specific colour codes (like "grey-3" or "blue-500"), we created tokens named by their function or intent—such as "outline" or "negative-alert". This had far-reaching benefits. Quantium products are often white-labelled or rebranded for external clients. Previously, redesigning a product to match a client's brand required months of resourcing—manually replacing hard-coded tokens tied to Quantium's palette. With semantic tokens in place, the system became more "headless"—we could define theme-able roles (like "negative-alert") and swap them out across brands without rebuilding the UI from scratch. This reduced the effort and cost of onboarding new clients and future-proofed the system for scale.

## Introducing the new model to the team

We introduced the EPIC framework and our new approach to contribution through structured team presentations. These sessions weren't just broadcasts—they created space for open discussion, feedback, and reflection. By walking through the rationale and inviting critique, we began to shift how the team saw their role in shaping the design system. This wasn't a one-off announcement—it was an invitation to co-own the system's future. Over time, designers started to identify with the EPIC model and bring their own thinking into future contributions.

## Results and impact

The new approach demonstrated clear improvements in both efficiency and quality:

- Team members moved from blindly following rules to making informed decisions based on design principles
- Design critiques evolved from enforcing consistency to thoughtful discussions about user experience
- The backlog of systemic issues became visible and actionable rather than ignored
- Foundational issues were elevated and prioritised, leading to meaningful improvements in the design system
- Fixes began to resolve multiple issues at once, rather than causing new problems—reducing rework and lowering the overall cost of maintaining the system

{% figure "/img/design-system-cultural-change/figure-5.png", "Collaborative problem solving in practice — workshop output from the team" %}

## Key learnings

- **Asking the right questions:** The most effective catalyst for change was asking questions that highlighted current limitations. By asking who was responsible for solving our biggest problems, I was able to demonstrate the need for a different approach.
- **Challenging "the way it's always been done":** A major breakthrough came from questioning established ways of working. The phrase "we've always done it this way" had become a barrier to meaningful improvement.
- **Balancing consistency with quality:** We discovered that consistency is valuable, but not at the expense of quality. Our goal became creating consistent, high-quality designs rather than maintaining consistency for its own sake.

## Conclusion

The transformation of the Quantium Design System wasn't just about technical improvements—it was about changing how we approached design system work. We moved from scattered fixes to strategic problem-solving, from following rules blindly to making informed decisions. Today, the design system isn't just easier to use—it's easier to trust, evolve, and teach.
