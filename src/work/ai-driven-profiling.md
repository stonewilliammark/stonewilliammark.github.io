---
title: "Transforming customer insights with Ai-driven profiling"
deck: "Creating an Ai-driven profiling solution in a complex banking environment"
topics:
  - "Agentic design"
  - "Agentic workflows"
  - "Product design"
  - "UX design"
  - "UI design"
hero: "/img/ai-driven-profiling/hero.png"
thumb: "/img/ai-driven-profiling/thumb.png"
heroAlt: "Transforming customer insights with Ai-driven profiling"
order: 1
---

## Spotting an opportunity to enhance our profiling service

Our organisation's profiling services delivered valuable insights but presented opportunities for improvement in how customers experienced them. As the sole designer, I identified several ways we could enhance our approach. Customers received insights through multiple formats—Excel files, PDFs, PowerPoints—often requiring additional explanation to help them extract full value.

This presented both customer experience challenges and business opportunities:

- The service required significant resources for delivery and support
- Analysts dedicated considerable time to data analysis that sometimes yielded limited actionable insights
- When initial profiles didn't reveal clear patterns, both customers and our team needed to invest additional effort
- Working within our banking data environment meant navigating security protocols while showing we could build effective AI solutions in-house.

## Using archetypes to focus our innovation

To guide our approach, I used a framework of user archetypes I had previously introduced to the organisation:

- **Experts:** Users who prefer raw data to conduct their own analyses
- **Explorers:** Users who like to manipulate visualisations to discover trends
- **So Whater's:** Users who simply want clear insights and implications

This framework helped us scope our 30-day proof of concept. We decided to focus specifically on serving the "So Whater's"—users who needed direct insights without complexity. This clarity helped define our priorities from the start and provided a shared language for discussing user needs.

### Archetype cards

**Experts**
Expert-level users with advanced data manipulation skills. They prefer performing unique analyses and require the flexibility to manipulate raw data for tailored insights.
- Conduct independent insight discovery.
- Manipulate raw data and graphs with advanced techniques.
- Cross-reference multiple data sources for comprehensive analysis.
- Require tailored solutions to meet specific needs.

**Explorers**
Intermediate users skilled in manipulating data filters and exploring various visualisations to uncover deeper insights.
- Capable of understanding data visuals and extracting insights from graphs.
- Understands data terminology but may require occasional assistance.
- Aim to build a comprehensive picture and make connections between data points.

**So Whater's**
Users with limited skill who frequently ask 'so what?' when presented with data visuals, requiring help to understand the relevance and implications of the data.
- Requires help to grasp technical terms.
- Uncertain about identifying insights alone, often waits for a peer to request an insight.
- Relies on peers or analysts to clarify the significance of data insights.

{% figure "/img/ai-driven-profiling/figure-1.png", "The three user archetypes — Experts, Explorers and So Whater's — used to scope the proof of concept" %}

## Creating alignment through collaborative discovery

In the first week, I helped facilitate a full-day workshop bringing together our cross-functional team—the head of product, analytics lead, engineers, and customer team representatives. We mapped the complete journey for marketing users, from problem identification through campaign implementation. This exercise showed us exactly where our solution could add the most value: in the "producing insights and analysing" phase of the journey.

The alignment created immediate momentum, with the customer team scheduling recurring interviews with potential users while we refined our solution scope. From there, we established daily collaborative sessions where we used whiteboarding to discuss ideas, map user needs, and agree on direction—creating a feedback loop that maintained focus throughout the project.

*[Images: workshop / whiteboarding photos]*

{% figure "/img/ai-driven-profiling/figure-2.png", "The full-day discovery workshop bringing the team together around the problem" %}

## The breakthrough - from metrics to intent

The most significant innovation was a shift in our thinking. We moved from metric-based profiling (age, affluence, life stage) to intent-based profiling that directly answered business questions:

- "Who are the people leaving my business?"
- "Who are my biggest opportunities to retain?"
- "Who are my competitors' customers?"

This change meant that the profile itself provided clear answers to business questions. Users could immediately understand the insights without needing to interpret complex data.

The intent-based approach meant profiles were naturally more useful to customers. Since they directly answered business questions, they were more likely to provide meaningful insights from the start. This benefited both our customers, who got more valuable information, and our team, who could focus on creating impactful analyses.

*[Product screenshot: "Customer profiles" — segmented view showing Competitor's Customers, Potential Customers, and Category Newcomers, each with a size-of-opportunity and people-in-opportunity insight.]*

{% figure "/img/ai-driven-profiling/figure-3.png", "The shift from metric-led profiles to intent-based profiles" %}

## Using AI tools to enhance our design process

To deliver within our tight timeframe, I developed an effective design workflow using AI tools:

- I used Claude to research potential user needs and scenarios, helping me explore different approaches based on our target users.
- For the AI components of our product, I created guiding instructions and testing processes for our language model, treating these as important design considerations.
- Using V0 for UI code generation allowed me to create working prototypes quickly, allowing our engineers to focus on building the complex backend systems. This approach enabled users to interact with a working product during testing, rather than static mockups.
- I also used Perplexity to create detailed contextual information about clients that helped train our AI system, allowing it to have better understanding of client contexts.

*[Screenshots: prototype screens; Claude and v0 tool marks]*

{% figure "/img/ai-driven-profiling/figure-4.png", "The AI-assisted design workflow, from requirements through to front-end prototype" %}

## Users respond with enthusiasm

In every user testing session, we witnessed a moment of realisation—users would look at each other with genuine excitement, having what we called their "iPhone moment" as they saw the potential value. By making insights directly accessible without requiring data expertise, we created an experience that resonated strongly with our target users.

The intent-based profiles provided clear value that was easy to understand, helping users get to insights faster. After each testing session, our team would hold immediate whiteboarding sessions to discuss feedback and make improvements. This quick improvement cycle ensured we stayed focused on user needs throughout development.

## Building foundations for future innovation

The proof of concept received approval for further development as a full product, showing that our internal teams could successfully build effective AI solutions within our environment. Beyond the product itself, we established a design workflow using AI tools that continues to influence how we approach product development across the organisation:

- Using AI to help with research and understanding requirements
- Creating multiple design concepts efficiently
- Developing front-end prototypes quickly while engineers work on backend systems
- Applying design thinking to all aspects of the product, including how the AI works

## Key principles for Ai-first product design

This project taught us several important lessons:

- **Focus on the "So What":** By prioritising clear answers over complex data, we create products that better meet user needs.
- **Intent-Based Design Provides Direct Value:** Building around user goals rather than raw data gives immediate value without requiring expertise to understand.
- **Design Includes How Ai Behaves:** In Ai products, design isn't just about the interface but also how the Ai understands and responds to users.
- **Address Technical Challenges Directly:** When technical limitations affect the user experience, look for solutions rather than changing the design to work around them.

By rethinking our approach to customer profiling with AI, we've created a more effective product that delivers clear value while establishing new patterns for future innovation.
