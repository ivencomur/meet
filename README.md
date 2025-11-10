# Meet App

A serverless, progressive web application (PWA) for discovering tech events, built with React and Test-Driven Development.

[Live Demo](https://ivans-events.vercel.app/) • [Case Study](https://ivan-cortes-portfolio-v1.onrender.com/MEET_APP_SERVERLESS_CASE_STUDY/MEET_APP_CASE_STUDY.html)

---

🚀 ## Overview

As part of my CareerFoundry training, I was tasked with building a serverless, progressive web application (PWA). The goal was to fetch and display real-world event data from a Google Calendar API, allowing users to find tech events in different cities. I developed the "Meet App" to not only meet these requirements but to rigorously apply Test-Driven Development (TDD) principles from the ground up. This project showcases my ability to integrate third-party APIs, implement a serverless backend, and build a reliable, offline-capable PWA.

---

✨ ## Features

* **Serverless Backend:** Uses AWS Lambda functions to securely process API requests and handle OAuth2 authentication.
* **Test-Driven Development (TDD):** Built from the ground up using Jest and React Testing Library to ensure code quality and reliability.
* **Progressive Web App (PWA):** Fully installable on mobile devices with offline capabilities thanks to a service worker.
* **City Search & Filtering:** Dynamically filters events based on user's city search, with suggestions.
* **Data Visualization:** Uses Recharts to display charts showing the number of events per city and by topic.
* **Event Details:** Allows users to expand and collapse event details.
* **Customizable Event Count:** Users can specify the number of events to display at once.

---

🛠 ## Technologies Used

| Category | Technologies |
| :--- | :--- |
| **Frontend** | React, Vite, Recharts (Data Visualization) |
| **Styling** | CSS3 |
| **Testing** | Jest, React Testing Library, Atatus (Monitoring) |
| **Backend** | Serverless Functions (AWS Lambda) |
| **API & Auth** | Google Calendar API, Google OAuth2 |
| **Deployment** | Vercel |

---

📋 ## User Stories

* **👤 Feature 1: Filter Events By City**
    > As a user, I would like to be able to filter events by city so that I can see the list of events that take place in that city.

* **📖 Feature 2: Show/Hide Event Details**
    > As a user, I would like to be able to show/hide event details so that I can see more/less information about an event.

* **🔢 Feature 3: Specify Number of Events**
    > As a user, I would like to be able to specify the number of events I want to view in the app so that I can see more or fewer events in the events list at once.

---

⚙️ ## Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/ivencomur/meet.git](https://github.com/ivencomur/meet.git)
    cd meet
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The app will be available at `http://localhost:3000`.

---

🧪 ## Testing

This project was developed using a strict **Test-Driven Development (TDD)** workflow. Every component and feature was built by first writing a failing test with Jest and React Testing Library, then writing the code to pass the test, and finally refactoring.

To run the full test suite:
```bash
npm run test
🔒 ## Serverless Architecture & Security

To protect API credentials and securely handle authentication, this project uses a serverless backend.

Problem: The app needed to access the Google Calendar API, which requires secure OAuth2 authentication and must not expose sensitive credentials (like API keys) on the client-side.

Solution: I engineered a serverless backend using AWS Lambda functions. This approach creates a secure API endpoint that handles the OAuth2 authentication flow and data fetching on the server side, protecting my API keys. The React client only communicates with my secure Lambda function, not directly with the Google API.

🚀 ## Deployment

This application is deployed on Vercel. The serverless functions are automatically deployed and managed by Vercel's infrastructure.

Live Demo: https://ivans-events.vercel.app/

📁 ## Project Structure

meet/
├── public/                 # Static assets
├── src/
│   ├── components/         # React components (CitySearch, Event, EventList, etc.)
│   ├── features/           # User story feature tests (TDD)
│   ├── __tests__/          # Unit tests for components
│   ├── api.js              # Functions for fetching data (Google Calendar API)
│   ├── App.css             # Main stylesheet
│   ├── App.js              # Main React app component
│   └── index.js            # Entry point
├── .github/                # GitHub Actions workflows
├── functions/              # Serverless functions (AWS Lambda)
│   ├── get-auth-url.js     # Handles Google OAuth login
│   └── get-events.js       # Securely fetches calendar events
├── package.json            # Dependencies and scripts
└── README.md               # This file
🌟 ## Features Roadmap (Future Steps)

Allow users to save or "favorite" events

Implement push notifications for saved events

Improve data visualization with more chart types

Add user accounts and profiles.

📞 ## Support

For questions, issues, or contributions:

Email: ivancortes@hotmail.com

GitHub: @ivencomur

LinkedIn: Ivan Cortes Murcia

📄 ## License

This project is licensed under the MIT License - see the LICENSE.md file for details.

🤖 ## AI Assistance Declaration

This project was developed with assistance from AI tools to navigate complex technical requirements, particularly related to Test-Driven Development and serverless function implementation.

AI Assistance Scope
TDD Workflow: Debugging complex asynchronous tests in Jest and React Testing Library.

Serverless Functions: Scaffolding and debugging the AWS Lambda functions for handling OAuth2 and API requests.

PWA & Service Workers: Implementing the service worker logic for offline caching.

Code Documentation: Standardizing JSDoc comments.

Human Oversight
All AI-generated solutions underwent thorough testing, code review, and adaptation to meet specific project requirements. The core architecture, user-flow logic, and final implementation remained under complete developer control. The use of AI assistance was instrumental in implementing modern development patterns (TDD, Serverless) effectively.

Built with ❤️ using React, AWS Lambda, and TDD


⬆ Back to Top