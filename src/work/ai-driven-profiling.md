---
title: "Transforming customer insights with AI-driven profiling"
deck: "Creating an AI-driven profiling solution in a complex banking environment"
topics:
  - "Agentic design"
  - "Agentic workflows"
  - "Product design"
  - "UX design"
  - "UI design"
hero: "/img/ai-driven-profiling/hero.png"
thumb: "/img/ai-driven-profiling/thumb.png"
heroAlt: "Transforming customer insights with AI-driven profiling"
order: 1
---

## Spotting an opportunity to enhance our profiling service

Our organisation's profiling services delivered insights, but the way customers experienced them could be better. As the sole designer, I identified several ways we could improve. Customers received insights through multiple formats (Excel files, PDFs, PowerPoints), often needing extra explanation before they could get the full value.

This presented both customer experience challenges and business opportunities:

- The service was resource-heavy to deliver and support
- Analysts spent considerable time on analysis that sometimes yielded few actionable insights
- When initial profiles didn't reveal clear patterns, both customers and our team had to put in more work
- Working within our banking data environment meant meeting security protocols while showing we could build AI solutions in-house.

## Using archetypes to focus our innovation

To guide our approach, I used a framework of user archetypes I had previously introduced to the organisation:

- **Experts:** Users who prefer raw data to conduct their own analyses
- **Explorers:** Users who like to manipulate visualisations to discover trends
- **So Whater's:** Users who simply want clear insights and implications

The framework scoped our 30-day proof of concept. We focused on the "So Whater's", users who needed direct insights without complexity. That clarity set our priorities from the start and gave the team a shared language for user needs.

### Archetype cards

**Experts**
Expert-level users with advanced data manipulation skills. They prefer performing unique analyses and require the flexibility to manipulate raw data for tailored insights.
- Conduct independent insight discovery.
- Manipulate raw data and graphs with advanced techniques.
- Cross-reference multiple data sources.
- Require tailored solutions to meet specific needs.

**Explorers**
Intermediate users skilled in manipulating data filters and exploring various visualisations to uncover deeper insights.
- Can read data visuals and pull insights from graphs.
- Understands data terminology but may require occasional assistance.
- Aim to build a full picture and connect data points.

**So Whater's**
Users with limited skill who frequently ask 'so what?' when shown data visuals, and need help to see the relevance and implications of the data.
- Requires help to grasp technical terms.
- Uncertain about identifying insights alone, often waits for a peer to request an insight.
- Relies on peers or analysts to clarify the significance of data insights.

{% figure "/img/ai-driven-profiling/figure-1.png", "The three user archetypes used to scope the proof of concept: Experts, Explorers and So Whater's" %}

## Creating alignment through collaborative discovery

In the first week, I helped facilitate a full-day workshop bringing together our cross-functional team: the head of product, analytics lead, engineers, and customer team representatives. We mapped the complete journey for marketing users, from problem identification through campaign implementation. This showed us exactly where our solution could add the most value: the "producing insights and analysing" phase of the journey.

The alignment created immediate momentum. The customer team scheduled recurring interviews with potential users while we refined our solution scope. From there, we ran daily whiteboard sessions to discuss ideas, map user needs, and agree on direction, creating a feedback loop that kept the project focused.

{% figure "/img/ai-driven-profiling/figure-2.png", "The full-day discovery workshop bringing the team together around the problem" %}

## The breakthrough: From metrics to intent

The biggest shift was in our thinking. We moved from metric-based profiling (age, affluence, life stage) to intent-based profiling that directly answered business questions:

- "Who are the people leaving my business?"
- "Who are my biggest opportunities to retain?"
- "Who are my competitors' customers?"

The profile itself now answered the business question. Users could understand the insights immediately, without interpreting complex data.

Because profiles answered a business question directly, they were more likely to produce useful insights from the start. Customers got better information, and our team could focus on the analyses that made a difference.

{% figure "/img/ai-driven-profiling/figure-3.png", "The shift from metric-led profiles to intent-based profiles" %}

## Using AI tools to enhance our design process

To deliver within our tight timeframe, I developed a design workflow using AI tools:

- I used Claude to research potential user needs and scenarios, and to explore different approaches for our target users.
- For the AI components, I wrote the guiding instructions and testing processes for our language model, and treated those as design work.
- V0 generated the UI code, so I could build working prototypes quickly while our engineers stayed on the complex backend systems. In testing, users interacted with a working product rather than static mockups.
- I also used Perplexity to build detailed context on clients to train our AI system, so it understood each client's situation better.

{% figure "/img/ai-driven-profiling/figure-4.png", "The AI-assisted design workflow, from requirements through to front-end prototype" %}

## Users respond with enthusiasm

In every user testing session, we saw a moment of realisation. Users would look at each other with genuine excitement, having what we called their "iPhone moment" as they saw the potential value. Making insights directly accessible without requiring data expertise resonated strongly with our target users.

The intent-based profiles provided clear value that was easy to understand, helping users get to insights faster. After each testing session, our team whiteboarded the feedback and made improvements straight away, which kept us focused on user needs throughout development.

## Building foundations for future innovation

The proof of concept was approved for further development as a full product, showing that our internal teams could build AI solutions inside our environment. We also established a design workflow using AI tools that continues to influence product development across the organisation:

- Using AI for research and requirements
- Creating multiple design concepts efficiently
- Developing front-end prototypes quickly while engineers work on backend systems
- Applying design thinking to all aspects of the product, including how the AI works

## Key principles for AI-first product design

- **Focus on the "So What":** Prioritising clear answers over complex data makes products that better meet user needs.
- **Intent-Based Design Provides Direct Value:** Building around user goals rather than raw data gives immediate value, with no expertise needed to understand it.
- **Design Includes How AI Behaves:** In AI products, design covers the interface and how the AI understands and responds to users.
- **Address Technical Challenges Directly:** When technical limitations affect the user experience, look for solutions rather than changing the design to work around them.
