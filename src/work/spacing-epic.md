---
title: "Reimagining spacing: The Quantium Design System spacing epic"
deck: "Developing a semantic spacing model to enable flexible interface density"
topics:
  - "Design systems"
  - "Leadership"
  - "UX design"
  - "UI design"
hero: "/img/spacing-epic/hero.png"
heroAlt: "Reimagining spacing: The Quantium Design System spacing epic"
order: 5
---

## Strategic trigger

The spacing improvements within our design system began with a practical product request: to implement density controls similar to applications like Outlook, allowing users to switch between compact, comfortable, and spacious interface modes. While attempting to address this request, we discovered our spacing guidelines were too basic and inconsistent to support such functionality. Designers were frequently uncertain about which spacing values to apply in different contexts. Questions like "What spacing should I use between a heading and paragraph?" or "Which value is correct for grouped cards?" highlighted the lack of clear guidance. This resulted in inconsistent designs, frequent rework, and unnecessary time spent debating spacing decisions that should have been straightforward.

Spacing presented an appropriate challenge for our first structured epic: it was foundational to the design system, had clearly defined problems, and offered a manageable scope that could demonstrate value quickly while testing our new approach to design system evolution.

## Key challenges

Our existing spacing system had several significant limitations:

- **Limited guidance:** Designers had minimal direction on which spacing values to use where, leading to inconsistent decisions
- **Arbitrary decision-making:** Team members would frequently debate specific pixel values due to lack of clear principles
- **No consistent rationale:** The system offered values but lacked meaning or relationships between those values
- **Inability to scale:** Without a coherent model, implementing density controls was practically impossible

These issues created inefficiencies in the design process and inconsistencies in our products. Previous attempts to improve spacing had focused on addressing individual symptoms rather than creating a comprehensive solution.

## Building a collaborative approach

I approached the Spacing Epic by assembling a dedicated team of four designers, myself included. My first priority was establishing genuine ownership and investment in the outcome. In an initial whiteboarding session, I focused not just on the problems but on why these problems mattered. I presented examples of our current inconsistent spacing alongside best-in-class designs, clearly illustrating the gap between our current state and where we needed to be. This collaborative approach was particularly valuable for the junior designers on the team who typically worked individually on their day-to-day projects. The Spacing Epic would provide them with collaborative experience while deepening their understanding of design fundamentals.

## Applying the EPIC framework

We treated spacing as a proper UX project rather than a simple design system task, following our structured EPIC framework:

- **Establish** – We conducted interviews with both designers and engineers to capture a wide range of perspectives. We reviewed existing products to identify inconsistencies and document specific pain points.
- **Prioritise** – Using Figma for virtual sticky notes, we organised feedback into themes and identified root causes. We created a prioritised list of must-solve problems and quick wins.
- **Investigate** – Team members took ownership of specific problem areas, exploring how other systems handled spacing logic and researching best practices. We evaluated different approaches to creating a flexible yet consistent spacing system.
- **Co-create** – We developed solutions collaboratively, testing approaches against real product scenarios. The team worked together to refine the system, ensuring it addressed the needs identified in our research.

This approach transformed what could have been a technical exercise into a meaningful learning opportunity. The once-weekly cadence gave team members space to think deeply and contribute thoughtfully.

## Key breakthroughs

Our collaborative process led to several important breakthroughs:

**Establishing a consistent scale**
We selected a half base unit sequence for our spacing scale, which provided:

- Fine-grained control when needed
- Consistency through divisibility by 4
- A predictable, scalable system for token values

This foundational decision created clarity and consistency across all spacing applications.

**Reframing spacing as relationships**
Our most significant conceptual breakthrough came when we shifted from thinking about spacing in terms of pixel values to semantic relationships. We defined three fundamental spatial relationships:

- **Local:** Spacing between closely related elements
- **Similar:** Spacing between elements with moderate relationship
- **Different:** Spacing between distinct or unrelated elements

This approach fundamentally changed how designers thought about spacing—from "What size should I use?" to "What relationship am I trying to express?" This removed the burden of remembering specific pixel values and focused attention on design intent.

**Integrating density controls**
Building on our relationship model, we added a second dimension: spatial density. Each relationship type (local, similar, different) could now be expressed in multiple density modes:

- **Compact:** Tighter spacing for information-dense interfaces
- **Comfortable:** Our standard spacing (default)
- **Spacious:** More generous spacing for less dense interfaces

This two-dimensional approach allowed us to maintain consistent relationship signals while adapting to different UI contexts—directly addressing the original product request for density controls.

## Implementation and technical alignment

As we moved toward implementation, we needed to align our semantic model with technical requirements:

- **Token naming conventions:** We rewrote our token system to be semantic—using names like "spacing-different-compact" instead of arbitrary values like "spacing-16"
- **Breaking change management:** We carefully planned the transition to minimise disruption to existing components
- **Cross-functional testing:** We conducted multiple rounds of validation with both designers and engineers

An additional benefit emerged during implementation: our semantic tokens made the design system more "headless." Rather than hardcoding specific values, we used semantic roles that could be swapped out across different brands. This significantly improved our ability to customise products for clients without extensive rework, reducing cost and effort while future-proofing the system.

## Education and adoption

To ensure successful adoption, we created comprehensive educational materials:

- **UX Academy integration:** We integrated spacing principles into our structured learning program
- **Visual communication:** We developed accessible, visual explanations of key concepts
- **Hands-on workshops:** We conducted interactive sessions where designers could apply the new model

Our documentation focused not just on what to do but why it mattered—helping designers understand the principles behind the guidelines rather than simply following rules.

## Results and impact

The Spacing Epic delivered several significant outcomes:

- **Enabled density controls:** Our original product request became feasible through our new two-dimensional spacing model
- **Improved design efficiency:** Designers spent less time debating arbitrary values and more time focusing on meaningful design decisions
- **More consistent interfaces:** Products began showing more coherent, intentional spacing patterns
- **Enhanced team capabilities:** Designers gained confidence in making spacing decisions based on clear principles
- **Efficient client customisation:** The semantic model significantly reduced the time required to adapt products for different clients

In design critiques, conversations shifted from debating specific pixel values to discussing whether spacing effectively communicated the intended relationships between elements—a fundamental improvement in design quality.

## Key learnings

- **Principles over specifications:** By focusing on the intent behind spacing decisions rather than specific measurements, we created a system that was both more flexible and easier to understand
- **Design systems as UX projects:** The techniques we use to solve user problems—research, synthesis, ideation, testing—are equally valuable when solving design system problems
- **Building ownership yields better results:** Taking time to build team investment and understanding produces more durable solutions than simply assigning tasks
- **Semantic models enable scaling:** Creating a meaning-based system rather than a value-based one allowed for both consistency and flexibility

## Conclusion

The Spacing Epic transformed how we approach spatial relationships in our design system and established a template for our new way of working. By shifting from pixel values to meaningful relationships, and from individual contributions to collaborative problem-solving, we created a system that better serves both our designers and our users. This work provided a strong foundation for subsequent epics and demonstrated the value of our new approach to design system evolution—one that emphasises deep understanding, cross-functional collaboration, and principled design thinking.
