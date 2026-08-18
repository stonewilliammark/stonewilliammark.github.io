---
title: "Reimagining spacing: The Quantium Design System spacing epic"
deck: "Developing a semantic spacing model to enable flexible interface density"
topics:
  - "Design systems"
  - "Leadership"
  - "UX design"
  - "UI design"
hero: "/img/spacing-epic/hero.png"
thumb: "/img/spacing-epic/thumb.png"
heroAlt: "Reimagining spacing: The Quantium Design System spacing epic"
order: 5
---

## Strategic trigger

The spacing improvements within our design system began with a practical product request: to implement density controls similar to applications like Outlook, allowing users to switch between compact, comfortable, and spacious interface modes. While attempting to address this request, we discovered our spacing guidelines were too basic and inconsistent to support such functionality. Designers were frequently uncertain about which spacing values to apply in different contexts. Questions like "What spacing should I use between a heading and paragraph?" or "Which value is correct for grouped cards?" highlighted the lack of clear guidance. This resulted in inconsistent designs, frequent rework, and unnecessary time spent debating spacing decisions that should have been straightforward.

Spacing presented an appropriate challenge for our first structured epic: it was foundational to the design system, had clearly defined problems, and offered a manageable scope that could demonstrate value quickly while testing our new approach to design system evolution.

## Key challenges

- Designers had minimal direction on which spacing values to use where, leading to inconsistent decisions
- Team members would frequently debate specific pixel values due to lack of clear principles
- The system offered values but lacked meaning or relationships between those values
- Without a coherent model, implementing density controls was practically impossible

These issues created inefficiencies in the design process and inconsistencies in our products. Previous attempts to improve spacing had treated individual symptoms, never the system as a whole.

## Building a collaborative approach

I approached the Spacing Epic by assembling a dedicated team of four designers, myself included. My first priority was establishing genuine ownership of the outcome. In an initial whiteboarding session, I focused on the problems and on why they mattered. I presented examples of our current inconsistent spacing alongside best-in-class designs, showing the gap between where we were and where we needed to be. The junior designers on the team typically worked individually on their day-to-day projects. The Spacing Epic would give them collaborative experience while deepening their understanding of design fundamentals.

{% figure "/img/spacing-epic/figure-1.png", "The team whiteboarding session that established shared ownership of the problem" %}

## Applying the EPIC framework

We treated spacing as a proper UX project rather than a simple design system task, following our structured EPIC framework:

- **Establish:** We conducted interviews with both designers and engineers to capture a wide range of perspectives. We reviewed existing products to identify inconsistencies and document specific pain points.
- **Prioritise:** Using Figma for virtual sticky notes, we organised feedback into themes and identified root causes. We created a prioritised list of must-solve problems and quick wins.
- **Investigate:** Team members took ownership of specific problem areas, exploring how other systems handled spacing logic and researching best practices. We evaluated different approaches to creating a flexible yet consistent spacing system.
- **Co-create:** We developed solutions collaboratively, testing approaches against real product scenarios and refining the system to address the needs identified in our research.

This approach turned what could have been a technical exercise into a learning opportunity. The once-weekly cadence gave team members space to think and contribute.

## Key breakthroughs

**Establishing a consistent scale**
We selected a half base unit sequence for our spacing scale, which provided:

- Fine-grained control when needed
- Consistency through divisibility by 4
- A predictable, scalable system for token values

This decision created clarity and consistency across all spacing applications.

**Reframing spacing as relationships**
Our biggest conceptual breakthrough came when we shifted from thinking about spacing in terms of pixel values to semantic relationships. We defined three spatial relationships:

- **Local:** Spacing between closely related elements
- **Similar:** Spacing between elements with moderate relationship
- **Different:** Spacing between distinct or unrelated elements

This approach changed how designers thought about spacing: from "What size should I use?" to "What relationship am I trying to express?" This removed the burden of remembering specific pixel values and focused attention on design intent.

**Integrating density controls**
Building on our relationship model, we added a second dimension: spatial density. Each relationship type (local, similar, different) could now be expressed in multiple density modes:

- **Compact:** Tighter spacing for information-dense interfaces
- **Comfortable:** Our standard spacing (default)
- **Spacious:** More generous spacing for less dense interfaces

This two-dimensional approach allowed us to maintain consistent relationship signals while adapting to different UI contexts. It directly addressed the original product request for density controls.

{% figure "/img/spacing-epic/figure-2.png", "The half-base-unit spacing scale" %}
{% figure "/img/spacing-epic/figure-3.png", "Semantic spacing tokens mapped to interface relationships" %}
{% figure "/img/spacing-epic/figure-4.png", "Spatial relationships: how spacing communicates grouping" %}

## Implementation and technical alignment

- **Token naming conventions:** We rewrote our token system to be semantic, using names like "spacing-different-compact" instead of arbitrary values like "spacing-16"
- **Breaking change management:** We carefully planned the transition to minimise disruption to existing components
- **Cross-functional testing:** We conducted multiple rounds of validation with both designers and engineers

An additional benefit emerged during implementation: our semantic tokens made the design system more "headless." Instead of hardcoding specific values, we used semantic roles that could be swapped out across different brands. This improved our ability to customise products for clients without extensive rework, reducing cost and effort while future-proofing the system.

## Education and adoption

We integrated spacing principles into UX Academy, our structured learning program. We developed accessible, visual explanations of key concepts, and ran hands-on workshops where designers could apply the new model.

Our documentation covered what to do and why it mattered, so designers could understand the principles behind the guidelines rather than simply following rules.

{% figure "/img/spacing-epic/figure-5.png", "Why spacing matters: the case made to the wider team" %}
{% figure "/img/spacing-epic/figure-6.png", "Establishing type and spacing together" %}
{% figure "/img/spacing-epic/figure-7.png", "Levels of density: compact, comfortable and spacious" %}
{% figure "/img/spacing-epic/figure-8.png", "Applying the model across real product screens" %}
{% figure "/img/spacing-epic/figure-9.png", "The documented spacing guidance the team adopted" %}

## Results and impact

- Our original product request became feasible through our new two-dimensional spacing model
- Designers spent less time debating arbitrary values and more time on design decisions
- Products began showing more coherent, intentional spacing patterns
- Designers gained confidence in making spacing decisions based on clear principles
- The semantic model reduced the time required to adapt products for different clients

In design critiques, conversations shifted from debating specific pixel values to discussing whether spacing communicated the intended relationships between elements.

## Key learnings

- **Principles over specifications:** By focusing on the intent behind spacing decisions rather than specific measurements, we created a system that was both more flexible and easier to understand
- **Design systems as UX projects:** The techniques we use to solve user problems (research, synthesis, ideation, testing) are equally valuable when solving design system problems
- **Building ownership yields better results:** Taking time to build team investment and understanding produces more durable solutions than simply assigning tasks
- **Semantic models enable scaling:** A meaning-based system, not a value-based one, allowed for both consistency and flexibility

## Conclusion

The Spacing Epic transformed how we approach spatial relationships in our design system and established a template for our new way of working. By shifting from pixel values to relationships, and from individual contributions to collaborative problem-solving, we created a system that better serves both our designers and our users. This work provided a strong foundation for subsequent epics.
