# Cooperative Gig Services Platform
## AI-Portable Product, UX & Design Specification

**Document purpose:** This is the single source of truth for generating the product with different AI tools or coding agents.

**Portability goal:** The same document should produce a substantially consistent product whether it is given to Claude, Antigravity, Cursor, Gemini, another coding agent, or a future AI tool.

**Important:** This document defines the *product, UX, visual language, behavior, architecture principles, and constraints*. It does not depend on a specific AI platform.

---

# 1. PRODUCT IDENTITY

## Working Product

**Cooperative Gig Services Platform**

A trusted, community-driven marketplace for finding and offering local services.

The platform connects:

- People who need services
- People who want to earn by providing services
- Local communities
- Cooperatives/community funds

The same account can be both a customer and a service provider.

---

# 2. CORE PRODUCT IDEA

The platform should make local services:

- Easy to discover
- Easy to understand
- Easy to book
- Affordable and transparent
- Safer and more trustworthy
- Accessible to people with limited digital literacy
- Useful for students and part-time workers
- Scalable into a real startup

The product should feel like a **modern public-service platform**, but not like a boring government website.

### Desired feeling

> **Simple enough for anyone to understand. Modern enough that younger users enjoy using it. Trustworthy enough that users feel safe using it for real services and payments.**

---

# 3. DESIGN DIRECTION

## Primary Design Style

**Minimalist + trustworthy + approachable + modern public-service aesthetic.**

The visual language should take inspiration from well-designed government/public-service applications:

- Clear hierarchy
- Large readable text
- Simple navigation
- Strong labels
- Obvious actions
- Minimal decoration
- High usability
- Accessibility-first thinking

But it must avoid the weaknesses of traditional government interfaces:

- No boring walls of text
- No cluttered forms
- No excessive tables
- No outdated-looking UI
- No unnecessarily tiny text
- No confusing navigation
- No excessive dropdowns
- No visually overwhelming dashboards

### Design target

Think:

**Government/public-service clarity**
+
**Modern consumer-app simplicity**
+
**Friendly marketplace experience**

Not:

**Government portal copied directly into an app.**

---

# 4. ACCESSIBILITY & DIGITAL LITERACY PRINCIPLES

A significant portion of the target audience may have:

- Limited digital literacy
- Limited English proficiency
- Limited experience with marketplace applications
- Older age
- Lower educational background
- Different levels of smartphone familiarity

Therefore, usability takes priority over visual complexity.

## Rules

### Use plain language

Prefer:

- "Book Service"
- "Offer a Service"
- "My Bookings"
- "Your Earnings"
- "Start Job"
- "Finish Job"
- "Get Help"

Avoid:

- "Initiate Transaction"
- "Service Provider Onboarding"
- "Transaction History"
- "Engagement Analytics"

### Use icons + text

Do not rely on icons alone for important actions.

Good:

> 🔍 Search Services

Better than:

> 🔍

### Keep important actions obvious

Primary actions should be visually clear.

Examples:

- Book Service
- Offer Service
- Start Job
- Complete Job
- Confirm Completion
- Get Help

### Avoid unnecessary steps

A user should not have to navigate through several screens to perform common actions.

### Use progressive disclosure

Show the important information first.

Additional details can be opened when needed.

### Use large touch targets

Buttons and interactive controls should be comfortable to use on a phone.

### Error messages should explain the solution

Bad:

> Invalid input.

Good:

> Please enter your mobile number.

### Never make users guess

Every important screen should make clear:

1. Where am I?
2. What can I do here?
3. What happens next?

---

# 5. VISUAL DESIGN SYSTEM

The AI must follow these design tokens consistently.

## 5.1 Color Philosophy

The palette should communicate:

- Trust
- Safety
- Community
- Reliability
- Accessibility

### Primary color

Use a **deep civic blue** as the main brand/action color.

Suggested:

```text
Primary: #1F4E79
```

### Secondary color

Use a restrained **teal/green** for positive states and community-oriented elements.

```text
Secondary: #2F7D6B
```

### Accent

Use a warm but controlled accent for highlights and calls to attention.

```text
Accent: #E6A23C
```

### Background

Use an extremely light neutral background.

```text
Background: #F7F8FA
Surface: #FFFFFF
```

### Text

```text
Primary Text: #1F2937
Secondary Text: #5B6470
Muted Text: #7A8491
```

### Status colors

```text
Success: #2E7D32
Warning: #B7791F
Error: #C62828
Info: #2563EB
```

The AI may slightly adjust values for accessibility/contrast, but the overall visual character must remain consistent.

---

# 6. COLOR USAGE RULES

Do not turn the application into a rainbow.

Use:

- Primary blue for major actions and navigation
- Green/teal for verified/success/community indicators
- Orange sparingly for highlights
- Neutral surfaces for most content
- Red only for destructive/error states

Avoid:

- Neon gradients
- Excessive purple
- Excessive glassmorphism
- Dark futuristic interfaces
- Strong visual effects
- Multiple competing accent colors

The interface should remain calm and trustworthy.

---

# 7. TYPOGRAPHY

The typography must prioritize readability.

## Preferred fonts

Use:

**Inter** as the primary UI font where available.

Acceptable alternatives:

- Noto Sans
- Roboto
- System sans-serif

For multilingual support, prefer a font family with broad Unicode coverage such as Noto Sans.

## Typography hierarchy

Example:

```text
Page Title:       28-32px / semibold
Section Heading:  20-24px / semibold
Card Title:       16-18px / semibold
Body:             15-16px / regular
Secondary:        13-14px
Button:           15-16px / semibold
```

Do not make body text unnecessarily small.

---

# 8. SPACING & LAYOUT

Use a consistent spacing system.

Base spacing unit:

```text
4px
```

Common spacing:

```text
4
8
12
16
20
24
32
40
48
```

The application should feel spacious without wasting screen space.

---

# 9. BORDER RADIUS

Use moderate rounded corners.

Recommended:

```text
Cards: 12px
Buttons: 8px
Inputs: 8px
Modals: 16px
Badges: 999px
```

Avoid excessively rounded "bubble UI".

---

# 10. SHADOWS

Use subtle shadows only where necessary.

Cards should generally use:

- Border
- Very light shadow
- Clear surface separation

Avoid dramatic shadows.

---

# 11. ICONOGRAPHY

Use one consistent icon library.

Preferred options:

- Lucide
- Material Symbols
- Another consistent open-source icon set

Do not mix multiple unrelated icon styles.

Icons should support comprehension rather than decorate the interface.

---

# 12. IMAGES & ILLUSTRATIONS

Use real-looking service imagery or simple illustrations.

Avoid:

- Excessive stock-photo usage
- Giant hero images
- Decorative graphics that reduce clarity
- AI-generated imagery that looks unrealistic

Service cards should prioritize the actual service.

---

# 13. RESPONSIVE DESIGN

The product must be designed mobile-first.

Primary target:

**Android/mobile users**

Also support:

- Tablet
- Desktop/web

The AI must not simply shrink the desktop interface onto mobile.

Mobile should be treated as the primary experience.

---

# 14. APPLICATION STRUCTURE

The application should be one coherent product.

Do NOT create separate independent websites for:

- Profile
- Gigs
- Explore
- Provider dashboard
- Bookings

Instead, create one application with modular pages and reusable components.

Conceptually:

```text
Application
│
├── Authentication
├── Onboarding
├── Home
├── Explore
├── Search
├── Gig Details
├── Booking
├── Messages
├── Notifications
├── Profile
├── Provider Mode
│   ├── My Services
│   ├── Create Service
│   ├── Bookings
│   └── Earnings
├── Settings
└── Admin
```

---

# 15. ACCOUNT MODEL

Every user has one account.

The account can have two capabilities:

```text
FIND SERVICES
OFFER SERVICES
```

Users can switch between these modes.

Do not force users to create separate accounts.

---

# 16. APP LAUNCH FLOW

```text
App Launch
    ↓
Splash Screen
    ↓
Authentication
    ↓
Onboarding
    ↓
Home
```

## Splash screen

Display the product logo and branding briefly.

Target:

**Approximately 1-1.5 seconds or until initial application setup completes.**

Do not intentionally force a long wait.

---

# 17. AUTHENTICATION

Required:

- Sign up
- Login
- OTP/mobile verification
- Email verification if applicable
- Password recovery
- Logout

Authentication should be visually simple.

Do not overwhelm users with unnecessary fields during registration.

---

# 18. ONBOARDING

Collect only essential information initially.

Possible:

- Name
- Mobile number
- Location
- Preferred language
- Optional profile photo

Then introduce:

```text
What would you like to do?

[ Find a Service ]

[ Offer a Service ]
```

This selection should not permanently lock the account.

---

# 19. HOME PAGE

The home page is primarily a service discovery feed.

Recommended structure:

```text
Hello, [Name] 👋

What service do you need?

[ 🔍 Search for a service... ] [Filter]

--------------------------------

PROMOTIONAL BANNER

Trusted services near you

--------------------------------

Popular Near You

[Car Wash] [Cleaning] [Moving] [Painting]

[Tutoring] [Tech Help] [Home Decor] [More]

--------------------------------

Recommended For You

[ Gig Card ]

[ Gig Card ]

[ Gig Card ]

                    + Offer a Service

--------------------------------

Home | Explore | Bookings | Messages | Profile
```

## Important

The service feed should remain the primary purpose.

Do not allow promotional banners to dominate the screen.

---

# 20. SEARCH EXPERIENCE

Search should be free-text.

Do not use a huge category dropdown as the primary discovery mechanism.

Example:

```text
User types:

car
```

Suggestions:

```text
Car Wash
Car Detailing
Car Repair
Car Interior Cleaning
```

Also show:

```text
Popular Searches

House Cleaning
Home Painting
House Shifting
Furniture Assembly
Tutoring
```

---

# 21. NATURAL-LANGUAGE SEARCH

Future/advanced functionality:

User enters:

> "I need someone to clean my 2BHK tomorrow evening."

The system can identify:

```text
Service: House Cleaning
Property: 2BHK
Date: Tomorrow
Time: Evening
Location: User's location
```

Then show matching providers.

The system should ask a simple follow-up question if important information is missing.

---

# 22. FILTERS

Filters should remain simple.

Possible filters:

- Distance
- Price
- Rating
- Availability
- Verified providers
- Service category
- Service type

Sorting:

- Recommended
- Nearest
- Lowest price
- Highest rated

Do not expose dozens of filters to ordinary users.

---

# 23. SERVICE CATEGORIES

Categories should be broad and searchable.

## Home Services

- House Cleaning
- Deep Cleaning
- Bathroom Cleaning
- Kitchen Cleaning
- Home Organization
- Furniture Assembly
- Home Decoration
- Interior Assistance
- Painting
- Plumbing
- Electrical Work
- Appliance Installation

## Vehicle Services

- Car Wash
- Bike Wash
- Car Detailing
- Interior Cleaning
- Vehicle Polishing
- Basic Vehicle Maintenance

## Moving & Logistics

- House Shifting
- Furniture Moving
- Local Delivery
- Packing
- Unpacking
- Loading
- Unloading

## Personal Services

- Haircut at Home
- Makeup
- Fitness Training
- Yoga
- Pet Care
- Elder Assistance

## Education

- School Tutoring
- College Tutoring
- Language Learning
- Coding Lessons
- Exam Preparation

## Technology

- Laptop Setup
- Software Installation
- Computer Repair
- Technical Support
- Website Assistance

## Creative

- Photography
- Videography
- Graphic Design
- Video Editing
- Social Media Assistance

## Student / Part-Time

- Event Assistance
- Note Making
- Presentation Design
- Research Assistance
- Resume Assistance
- Photography
- Delivery Assistance

Providers must also be able to create custom service categories where appropriate.

---

# 24. GIG CARD

Every gig card should communicate the most important information quickly.

Recommended:

```text
[Service Image]

Car Wash

⭐ 4.8 (126)
₹499
~1 hour
📍 2.4 km

Rahul Kumar
✓ Verified

[View Service]
```

Do not overload cards with descriptions.

---

# 25. GIG DETAILS

Required:

- Image/gallery
- Service name
- Rating
- Reviews
- Price
- Duration
- Distance
- Provider
- Verification
- Jobs completed
- Description
- What's included
- Availability
- Service area
- Book button

Primary action:

**Book Service**

Secondary actions:

- Save
- Message Provider
- Report

---

# 26. PROVIDER PROFILE

Display:

- Profile photo
- Name
- About
- Skills
- Services
- Verification
- Community vouches
- Rating
- Reviews
- Jobs completed
- Availability
- Service area

Example:

```text
Rahul Kumar

✓ Community Verified

⭐ 4.8
87 jobs completed

Services:
Car Wash
Car Detailing

Available:
Mon-Sat

Service Area:
Within 8 km
```

---

# 27. CREATE SERVICE FLOW

Use a simple multi-step process.

```text
1. Choose Service
        ↓
2. Description
        ↓
3. Photos
        ↓
4. Price
        ↓
5. Availability
        ↓
6. Service Area
        ↓
7. Review
        ↓
8. Publish
```

Each step should be easy to understand.

---

# 28. FAIRPRICE AI

The platform can provide an AI-assisted pricing recommendation.

Potential factors:

```text
Service type
+
Estimated duration
+
Location
+
Experience
+
Local wage benchmarks
+
Demand
+
Distance
+
Historical platform prices
=
Suggested price range
```

Example:

```text
House Cleaning
2 hours

Suggested:
₹600 - ₹800

Recommended:
₹699
```

## Critical rule

AI must **recommend**, not silently control the provider's price.

The provider decides the final price.

---

# 29. MATCHING ENGINE

Potential ranking factors:

- Service relevance
- Distance
- Availability
- Price
- Rating
- Trust
- Experience
- Successful jobs
- Customer preferences

Conceptual flow:

```text
Customer Request
      ↓
Understand Request
      ↓
Find Candidate Providers
      ↓
Filter
      ↓
Rank
      ↓
Recommended Services
```

For the hackathon, deterministic scoring or realistic mock data is acceptable.

A sophisticated machine-learning system is not required for the MVP.

---

# 30. COMMUNITY TRUST

Community vouching is a major product differentiator.

Trust can combine:

```text
Community Vouches
+
Identity Verification
+
Jobs Completed
+
Ratings
+
Reviews
+
Completion Rate
+
Dispute History
=
Trust Profile
```

Example:

```text
✓ Community Verified
⭐ 4.8
87 jobs completed
98% completion rate
```

Never present a fabricated verification badge as a real-world verification claim in a production environment.

For the hackathon, clearly treat demo verification data as prototype/mock data.

---

# 31. BOOKING FLOW

```text
Select Service
      ↓
Select Date
      ↓
Select Time
      ↓
Review Details
      ↓
Confirm Booking
      ↓
Payment
      ↓
Booking Confirmed
      ↓
Provider Notified
```

Booking states:

- Requested
- Confirmed
- Upcoming
- In Progress
- Completed
- Cancelled
- Disputed

---

# 32. PAYMENT FLOW

Conceptual:

```text
Customer Books
      ↓
Payment Initiated
      ↓
Payment Held
      ↓
Booking Confirmed
      ↓
Service Performed
      ↓
Customer Confirms
      ↓
Payment Released
      ↓
Cooperative Split
```

For the hackathon, a simulated payment/escrow flow is acceptable if a real payment provider cannot be safely integrated.

Do not claim that the prototype provides real escrow if it does not.

---

# 33. QR JOB VERIFICATION

The QR system verifies the start and completion of a real-world booking.

## Start

Provider arrives.

QR is scanned.

System records:

- Booking ID
- Customer
- Provider
- Timestamp
- Start status

Display:

```text
Booking #4821

✓ Customer verified
✓ Provider verified

Service Started
10:32 AM
```

## End

QR is scanned again.

System records completion.

Customer confirms.

```text
Service Completed

10:32 AM → 11:41 AM

[Confirm Completion]
```

---

# 34. RATINGS & REVIEWS

After completion:

- Customer rates provider
- Customer leaves review
- Provider may optionally rate customer

Suggested dimensions:

- Service quality
- Professionalism
- Timeliness
- Value for money

Keep the experience quick.

---

# 35. DISPUTES

The product needs a basic dispute mechanism.

```text
Dispute Raised
      ↓
Payment Held
      ↓
Evidence / Communication
      ↓
Admin Review
      ↓
Resolution
```

Possible outcomes:

- Refund
- Partial payment
- Payment release

Possible reasons:

- Service not delivered
- Poor service
- Wrong service
- Provider did not arrive
- Customer unavailable
- Payment issue
- Safety issue

---

# 36. PROVIDER DASHBOARD

Provider mode should prioritize active work.

Suggested navigation:

```text
Home
Services
Bookings
Earnings
Profile
```

Dashboard information:

- Today's bookings
- Upcoming jobs
- Active services
- Earnings
- Rating
- Jobs completed

---

# 37. EARNINGS DASHBOARD

Example:

```text
Your Earnings

₹18,450
This Month

Pending: ₹1,200
Available: ₹17,250

Jobs Completed
42

Average Rating
4.8 ⭐

Recent Earnings

Car Wash          +₹499
Home Cleaning     +₹699
Tutoring          +₹800
```

Future:

- Weekly/monthly graphs
- Withdrawals
- Platform fees
- Community contribution
- Invoices
- Tax information

---

# 38. BOOKINGS

Customers should see:

```text
Upcoming
In Progress
Completed
Cancelled
```

Providers should see:

```text
New Requests
Upcoming
In Progress
Completed
Cancelled
```

Each booking should show its current status clearly.

---

# 39. MESSAGES

Customer ↔ Provider communication.

Use simple conversation UI.

Possible actions:

- Send message
- Share service-related information
- View booking
- Contact support

---

# 40. NOTIFICATIONS

Examples:

- Booking confirmed
- Provider accepted request
- Provider arriving soon
- Service started
- Service completed
- Payment released
- New review
- New booking
- Verification update

Notifications should be meaningful rather than excessive.

---

# 41. FAVORITES

Customers can save:

- Services
- Providers

This creates a simple retention mechanism.

---

# 42. REBOOK

After a successful service:

```text
Service Completed

[Book Again]
```

Useful for recurring services:

- Cleaning
- Car wash
- Tutoring
- Pet care
- Maintenance

---

# 43. PROVIDER AVAILABILITY

Providers can define schedules.

Example:

```text
Monday     5 PM - 9 PM
Tuesday    Unavailable
Wednesday  4 PM - 8 PM
Thursday   5 PM - 9 PM
```

Providers can also define service radius.

Example:

```text
Service Area: 8 km
```

---

# 44. AI BOOKING ASSISTANT

Optional advanced feature.

User:

> "I need someone to clean my 2BHK tomorrow evening."

Assistant:

> "I found 6 suitable services near you. Estimated price: ₹600-₹900."

Action:

**Show Matches**

Possible future capabilities:

- Understand natural-language requests
- Identify missing information
- Recommend providers
- Suggest times
- Compare services
- Start booking

The core application must remain usable without the chatbot.

---

# 45. PROFILE

## Customer

```text
Profile
├── Personal Information
├── Location
├── Saved Services
├── Upcoming Bookings
├── Booking History
├── Reviews Given
├── Payment Methods
└── Settings
```

## Provider

```text
Profile
├── Personal Information
├── Verification
├── Services
├── Active Bookings
├── Completed Jobs
├── Earnings
├── Ratings & Reviews
├── Availability
├── Service Area
└── Settings
```

---

# 46. SETTINGS

```text
Settings

Account
- Personal Information
- Phone / Email
- Security

Preferences
- Language
- Currency
- Location
- Notifications

Provider Settings
- Availability
- Service Area
- Pricing Preferences

Privacy & Security
- Privacy
- Blocked Users
- Data Controls

Support
- Help Center
- Report a Problem
- Contact Support

Legal
- Terms & Conditions
- Privacy Policy
- Refund Policy
- Community Guidelines

Logout
```

---

# 47. LANGUAGE SUPPORT

The architecture should support localization.

Potential languages:

- English
- Hindi
- Marathi
- Tamil
- Telugu
- Bengali

For the MVP, only implement languages that can be properly translated and tested.

Important:

Do not rely on tiny text or complicated English wording.

---

# 48. ADMIN DASHBOARD

The admin dashboard demonstrates that this is a real platform rather than only a consumer UI.

Metrics:

```text
Total Users
Total Providers
Active Gigs
Bookings Today
Platform Revenue
Pending Verification
Open Disputes
Community Fund
```

Admin functionality:

- Manage users
- Manage providers
- Review verification
- Moderate gigs
- Manage categories
- Handle disputes
- View transactions
- View analytics

---

# 49. COMMUNITY / COOPERATIVE MODEL

A portion of platform economics can potentially contribute to a community fund.

Conceptual:

```text
Customer Payment
      ↓
Service Completed
      ↓
Payment Released
      ↓
+-------------------------------+
| Provider Share                |
| Platform Share                |
| Community Fund Contribution   |
+-------------------------------+
```

Exact percentages must remain configurable and should not be hardcoded into the UI unless officially decided.

---

# 50. DESIGN COMPONENT SYSTEM

Create reusable components.

Example:

```text
components/
├── Button
├── Input
├── SearchBar
├── FilterButton
├── GigCard
├── ProviderCard
├── Rating
├── Badge
├── Modal
├── BottomNavigation
├── Navbar
├── BookingCard
├── StatusBadge
├── PriceDisplay
├── EmptyState
├── LoadingState
└── ErrorState
```

The same component must be reused across pages.

Example:

```text
GigCard
├── Home
├── Explore
├── Search Results
└── Saved Services
```

---

# 51. COMPONENT CONSISTENCY RULE

If a component already exists, reuse it.

Do not create:

```text
GigCard
GigCard2
GigCardNew
GigCardFinal
GigCardProvider
```

unless there is a genuine functional reason.

Instead, make one reusable component with appropriate properties/variants.

---

# 52. UI STATES

Every important page/component should account for:

## Loading

Show a clear loading state.

## Empty

Example:

> No bookings yet.

Then provide a useful action:

> Find a Service

## Error

Explain what happened and what the user can do.

## Success

Give clear confirmation.

Example:

> Booking confirmed!

---

# 53. RESPONSIVENESS

Mobile:

- Bottom navigation
- Large touch targets
- Compact cards
- Single-column layouts
- Sticky primary actions where appropriate

Desktop:

- Wider content areas
- Sidebar where useful
- Multi-column grids
- More information visible simultaneously

Do not force desktop navigation patterns onto mobile.

---

# 54. UX RULE: ONE PRIMARY ACTION

Each important screen should have one obvious primary action.

Examples:

Home:

> Search Service

Gig Details:

> Book Service

Create Service:

> Publish Service

Active Booking:

> Start Job / Complete Job

Completed Booking:

> Rate Service

Avoid competing primary buttons.

---

# 55. UX RULE: DO NOT OVERDESIGN

The AI must NOT introduce:

- Excessive gradients
- Glassmorphism
- Floating 3D elements
- Excessive animations
- Huge decorative illustrations
- Complex charts everywhere
- Tiny text
- Excessive cards inside cards
- Dark futuristic themes
- Unnecessary micro-interactions

The product should look **professional, calm and modern**.

---

# 56. ANIMATION

Use subtle animation only when it improves comprehension.

Good:

- Page transitions
- Button feedback
- Loading indicators
- Modal transitions
- Success confirmation

Avoid:

- Constant motion
- Bouncing UI
- Large animated backgrounds
- Animation on every element

---

# 57. INFORMATION HIERARCHY

For service discovery, prioritize:

```text
Service
↓
Price
↓
Rating
↓
Distance
↓
Provider
↓
Additional details
```

For booking:

```text
Service
↓
Date
↓
Time
↓
Price
↓
Confirmation
```

For provider:

```text
Today's Work
↓
Upcoming Bookings
↓
Earnings
↓
Services
```

---

# 58. MVP PRIORITY

## Tier 1 — Core

- Authentication
- Onboarding
- Dual-role account
- Home
- Search
- Categories
- Filters
- Gig listing
- Gig details
- Create service
- Booking
- Customer profile
- Provider profile
- Ratings/reviews
- Provider bookings
- Earnings
- QR start/end
- Community verification
- Basic admin dashboard

## Tier 2 — Differentiators

- FairPrice AI
- Smart matching
- AI natural-language search
- Cooperative payment split
- AI booking assistant

## Tier 3 — Future

- Advanced AI
- Full multilingual system
- Fraud detection
- Advanced analytics
- Subscriptions
- Loyalty
- Insurance
- Automated dispute resolution
- Advanced cooperative management

---

# 59. HACKATHON DEMO JOURNEY

The most important demo should be one complete end-to-end story.

```text
User signs up
      ↓
Creates profile
      ↓
Searches "Car Wash"
      ↓
Filters nearby services
      ↓
Selects verified provider
      ↓
Views service
      ↓
Selects date/time
      ↓
Books service
      ↓
Payment simulated/held
      ↓
Provider receives booking
      ↓
Provider arrives
      ↓
QR Start
      ↓
Service performed
      ↓
QR End
      ↓
Customer confirms
      ↓
Payment released
      ↓
Customer rates provider
      ↓
Provider earnings update
```

This flow should work smoothly before secondary features are polished.

---

# 60. AI-PORTABILITY RULES

This section is critical.

Any AI coding agent receiving this document must treat it as the **product source of truth**.

## Rule 1 — Preserve the product

Do not change the core product concept without explicit instruction.

## Rule 2 — Preserve the visual language

Do not replace the design system with the AI's default style.

## Rule 3 — Preserve accessibility

Do not reduce font sizes, touch targets, or clarity just to fit more content.

## Rule 4 — Reuse components

Do not duplicate components unnecessarily.

## Rule 5 — Do not invent major features

The AI may suggest improvements, but must not silently introduce major product functionality.

## Rule 6 — Do not remove features

Do not remove requirements because the AI considers them unnecessary.

If something is technically infeasible, explain the issue and propose an alternative.

## Rule 7 — Maintain consistency

A newly generated page must look like it belongs to the same application as every existing page.

## Rule 8 — Do not rewrite unrelated modules

When implementing a feature, modify only the necessary files/components.

## Rule 9 — Respect existing code

If an existing project is provided, inspect its architecture before creating new files.

## Rule 10 — Ask only when necessary

If requirements are ambiguous but a safe, reasonable implementation is possible, make the smallest reasonable assumption and document it.

---

# 61. AI AGENT MASTER INSTRUCTION

Use the following instruction when giving this specification to an AI coding agent:

```text
You are implementing the Cooperative Gig Services Platform.

Treat the attached Product, UX & Design Specification as the single source of truth.

Your job is to implement the product faithfully, not redesign the concept.

IMPORTANT PRODUCT CHARACTER:
The application should feel like a modern public-service platform:
- trustworthy
- simple
- accessible
- professional
- minimal
- friendly

It must NOT look like:
- a generic AI-generated SaaS dashboard
- a futuristic AI application
- a gaming interface
- a luxury startup landing page
- an old-fashioned government portal

TARGET USERS:
The product must be understandable to people with different levels of digital literacy, including users who may have limited English proficiency or limited experience with digital marketplace applications.

DESIGN RULES:
- Use the specified color palette.
- Use readable typography.
- Use clear labels.
- Prefer icons + text.
- Use large touch targets.
- Keep layouts simple.
- Avoid excessive decoration.
- Avoid excessive gradients, glassmorphism and animations.
- Prioritize the primary action on each screen.
- Maintain strong accessibility and contrast.
- Design mobile-first.

ARCHITECTURE:
- Build one coherent application.
- Use reusable components.
- Do not create separate independent websites for different pages.
- Reuse existing components whenever possible.
- Keep features modular.
- Do not duplicate components without a functional reason.

IMPLEMENTATION:
Before changing an existing project:
1. Inspect the current folder structure.
2. Inspect existing components.
3. Inspect routing.
4. Inspect styling/design tokens.
5. Reuse existing patterns.

When implementing a new feature:
1. Identify required screens.
2. Identify reusable components.
3. Implement the smallest clean architecture.
4. Add loading, empty, error and success states.
5. Test responsive behavior.
6. Check accessibility.
7. Do not modify unrelated functionality.

IMPORTANT:
Do not generate a completely new design language for each page.

Every page must feel like part of the same product.

If a requirement cannot be implemented exactly, explain the limitation and provide the closest practical implementation rather than silently changing the product.

Do not claim that a feature is production-ready if it is only mocked or simulated.
```

---

# 62. AI SWITCHING WORKFLOW

The intended workflow is:

```text
MASTER SPECIFICATION
        |
        +----------------+
        |                |
        v                v
      Claude         Antigravity
        |                |
        v                v
     Feature A        Feature B
        |                |
        +-------+--------+
                |
                v
             GitHub
                |
                v
            Integration
                |
                v
          Final Application
```

If the team switches AI tools, the specification remains the same.

The AI tool changes.

The product definition does not.

---

# 63. FEATURE PROMPT TEMPLATE

When implementing a specific feature, use this structure:

```text
PRODUCT:
Cooperative Gig Services Platform

REFERENCE:
Use the attached Master Product, UX & Design Specification.

CURRENT TASK:
[Describe one specific feature.]

EXAMPLE:
Implement the Gig Details page.

REQUIREMENTS:
- Show service image
- Show service name
- Show rating
- Show provider
- Show verification
- Show price
- Show duration
- Show distance
- Show description
- Show availability
- Provide Book Service action

DESIGN:
Follow the exact visual language defined in the master specification.

REUSE:
Reuse existing:
- Navbar
- Buttons
- Rating component
- Provider card
- Status badges

DO NOT:
- Change the application's primary color
- Introduce a new design system
- Modify unrelated pages
- Add unnecessary animations
- Create duplicate components

RESPONSIVE:
Mobile-first, then tablet and desktop.

STATES:
Implement loading, empty, error and success states where relevant.

DATA:
Use the existing data/API architecture. If unavailable, use clearly separated mock data.

OUTPUT:
Implement the feature cleanly and explain what files/components were created or modified.
```

---

# 64. TEAM DEVELOPMENT RULE

The team should never independently prompt an AI with:

> "Build me a website for our gig platform."

Instead, every member should work from:

```text
MASTER SPECIFICATION
        +
CURRENT CODEBASE
        +
SPECIFIC FEATURE PROMPT
```

This is what keeps multiple AI agents aligned.

---

# 65. DEFINITION OF DONE

A feature is considered complete when:

- It follows the master design system
- It works on mobile
- It works on desktop where applicable
- It uses reusable components
- It has clear states
- It has readable labels
- It does not break existing functionality
- It has been reviewed by another team member
- It is committed to the correct feature branch
- It can be integrated into the main application

---

# 66. FINAL PRODUCT PRINCIPLES

1. **Simple beats complicated.**
2. **Clarity beats decoration.**
3. **Trust must be visible.**
4. **Every account can find and offer services.**
5. **AI assists users; it does not silently control important decisions.**
6. **Pricing should be transparent.**
7. **Payments should protect both sides.**
8. **Real-world jobs should have verifiable start/end events.**
9. **Accessibility is a core requirement, not an optional feature.**
10. **The application should feel modern without becoming visually complex.**
11. **All AI-generated work must follow one source of truth.**
12. **The MVP should demonstrate one complete customer-provider journey exceptionally well.**
13. **The architecture should support future startup features without requiring a complete rebuild.**

---

# 67. PRODUCT NORTH STAR

> **Make local services as easy to find and book as asking a trusted person nearby — while giving ordinary people a simple, fair and trustworthy way to earn from their skills.**

---

## END OF AI-PORTABLE PRODUCT SPECIFICATION
