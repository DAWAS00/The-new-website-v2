# Eman-Platform: Supporting Student Mental Health

## Table of Contents

*   [Project Overview](#project-overview)
*   [Website Pages and Purpose](#website-pages-and-purpose)
    *   [Home (index.html)](#home-indexhtml)
    *   [Causes (causes.html)](#causes-causeshtml)
    *   [Resources (resources.html)](#resources-resourceshtml)
    *   [Self-Help Tools (tools.html)](#self-help-tools-toolshtml)
    *   [Counseling (counseling.html)](#counseling-counselinghtml)
    *   [Success Stories (stories.html)](#success-stories-storieshtml)
    *   [Contact (contact.html)](#contact-contacthtml)
*   [JavaScript Functionalities](#javascript-functionalities)
    *   [main.js](#mainjs)
    *   [carousel.js](#carouseljs)
    *   [clock.js](#clockjs)
    *   [emotional-intelligence.js](#emotional-intelligencejs)
    *   [tools.js](#toolsjs)
*   [CSS Styling](#css-styling)
    *   [style.css](#stylecss)
    *   [Page-Specific CSS](#page-specific-css)
*   [Resources and Libraries Used](#resources-and-libraries-used)

## Project Overview

The Eman-Platform is a web-based project designed to support university students with their mental health challenges. It provides a safe and accessible space for students to find help, understanding, and resources tailored to their academic journey. The platform aims to break down barriers to mental health support in academic environments by offering various tools, information, and a sense of community.

## Website Pages and Purpose

### Home (index.html)

This is the main landing page of the Eman-Platform. It introduces the website's mission, "Your Mental Health Matters," and highlights key sections such as resources and contact information. It features a dynamic carousel showcasing the platform's core values: "Who We Are," "Our Mission," and "How We Help."

**Key Features:**
*   Hero section with a compelling call to action.
*   Introduction to the platform's identity and goals.
*   Interactive image carousel.
*   Email subscription form.

### Causes (causes.html)

This page is dedicated to explaining common causes of mental health issues among students. It categorizes these causes into Academic, Social, and Personal, providing detailed insights and examples for each. The goal is to help students understand the root causes of their struggles.

**Key Features:**
*   Tabbed interface for easy navigation between different cause categories.
*   Detailed descriptions and impact areas for academic pressure, social pressure, and personal well-being factors.
*   Visual elements and badges to highlight key information.

### Resources (resources.html)

The Resources page offers a curated collection of materials to help students understand, manage, and improve their mental health. It includes sections for books, articles, videos, courses, apps, and community support options.

**Key Features:**
*   Categorized resources for easy access.
*   Links to external books, articles, videos, and organizations.
*   Provides practical tools and information for self-help.

### Self-Help Tools (tools.html)

This section provides practical, interactive tools and techniques designed to support mental well-being. It includes a breathing exercise, a mood tracker, a CBT thought challenger, guided meditations, a focus timer, and a gratitude journal.

**Key Features:**
*   Interactive breathing exercise (4-7-8 technique).
*   Mood tracker for emotional awareness and pattern identification.
*   Cognitive Behavioral Therapy (CBT) thought challenging tool.
*   Guided meditation player for academic stress and relaxation.
*   Focus timer for productivity.
*   Gratitude journal for positive reflection.

### Counseling (counseling.html)

The Counseling page provides information about the supportive and confidential counseling services available to students. It explains what counseling is, areas it can help with, and how to book a session.

**Key Features:**
*   Explanation of counseling benefits and process.
*   Details on areas of support (academic pressure, personal identity, life balance, future planning).
*   Call to action for booking a session.
*   Embedded YouTube video for background visuals.

### Success Stories (stories.html)

This page features inspiring success stories from students who have overcome mental health challenges. It aims to provide hope, encourage seeking help, and build a sense of community by sharing relatable experiences.

**Key Features:**
*   Collection of personal narratives and testimonials.
*   Encourages users to share their own stories.
*   Visually engaging layout for each story.

### Contact (contact.html)

The Contact page provides information about the team behind the Eman-Platform and ways to get in touch. It includes details about the founder and a contact form for inquiries.

**Key Features:**
*   Introduction to the team members.
*   Personal story of the project's inception.
*   Contact form for user submissions.
*   Links to social media profiles.

## JavaScript Functionalities

The project utilizes several JavaScript files to enhance interactivity and provide dynamic features:

### main.js

Handles the email subscription form functionality. It validates email input using a regular expression and provides success or error feedback to the user.

**Functions:**
*   `DOMContentLoaded` event listener: Initializes the subscription button and input fields.
*   Click event listener for `subscribeBtn`: Triggers email validation and feedback display.
*   `showError(message)`: Displays an error message for invalid input.
*   `showSuccess(message)`: Displays a success message upon valid subscription.

### carousel.js

Initializes and controls the Bootstrap carousel on the `index.html` page. It sets the interval, ride behavior, wrap, and pause on hover options for the carousel.

**Functions:**
*   `DOMContentLoaded` event listener: Selects the carousel element and initializes a new Bootstrap Carousel instance with specified options.

### clock.js

Displays a real-time digital clock in the navigation bar across all pages. It updates the time every second and formats it in a 12-hour format with AM/PM.

**Functions:**
*   `updateClock()`: Retrieves the current time, formats it, and updates the text content of elements with the `clock-display` class.
*   `DOMContentLoaded` event listener: Calls `updateClock()` immediately and sets up a `setInterval` to update it every second.

### emotional-intelligence.js

Powers the mood tracker functionality on the `tools.html` page. It allows users to select an emotion, set its intensity, add notes, and save mood entries. It also provides personalized insights and tips.

**Functions:**
*   `DOMContentLoaded` event listener: Loads mood data, sets up emotion buttons, and the save button, and shows a random tip.
*   `setupEmotionButtons()`: Attaches click event listeners to emotion buttons for selection.
*   `setupSaveButton()`: Attaches a click event listener to the save button.
*   `saveMoodEntry()`: Validates input, creates a mood entry object, adds it to `moodData`, saves to local storage, shows personalized insights, and resets the form.
*   `showPersonalizedInsight(entry)`: Displays an insight based on the selected emotion and recent patterns.
*   `getEmotionInsight(emotion)`: Returns a specific insight message for a given emotion.
*   `getSimplePattern()`: Analyzes recent mood entries to identify common emotional patterns.
*   `showRandomTip()`: Displays a random mental health tip.
*   `resetForm()`: Resets the mood tracker form fields and button states.
*   `showAlert(message, type)`: Displays a temporary alert message to the user.
*   `saveMoodData()`: Saves `moodData` to local storage.
*   `loadMoodData()`: Loads `moodData` from local storage.

### tools.js

Contains the JavaScript logic for various self-help tools on the `tools.html` page, including the breathing exercise, CBT thought challenging, guided meditation, focus timer, and gratitude journal.

**Functions:**
*   **Breathing Exercise:**
    *   `startBreathing()`: Initiates the 4-7-8 breathing exercise with visual cues and instructions.
    *   `stopBreathing()`: Halts the breathing exercise and resets the UI.
*   **CBT Thought Challenging Tool:**
    *   `saveThoughtChallenge()`: Captures user input for negative thoughts, distortions, evidence, and balanced thoughts, then displays them in a history section.
*   **Guided Meditation Player:**
    *   `playMeditation(type)`: Simulates a guided meditation session with a timer and progress bar for different meditation types (exam, sleep, morning).
*   **Focus Timer:**
    *   `startTimer()`: Starts a countdown timer based on user input.
    *   `updateTimerDisplay()`: Updates the timer display in minutes and seconds.
    *   `pauseTimer()`: Pauses the active timer.
    *   `resetTimer()`: Resets the timer to its initial duration.
*   **Gratitude Journal:**
    *   Event listener for `gratitudeForm` submission: Saves gratitude entries with the current date and displays them.

## CSS Styling

The project uses a combination of global and page-specific CSS files to manage its styling.

### style.css

This is the main stylesheet that defines the global look and feel of the website. It includes base styles, header and navigation styling, hero section styles, and general layout for common components.

**Key Sections:**
*   **Base styles:** `font-family`, `font-size`.
*   **Header & Navigation:** Styling for the fixed header, navbar, and navigation links.
*   **Hero Section:** General styles for hero banners across pages.
*   **Introduction Sections:** Styling for introductory content blocks.
*   **Mental Health Awareness Section:** Styles for awareness cards and grids.
*   **Footer:** Styling for the website footer.

### Page-Specific CSS

Each major HTML page has its own dedicated CSS file to handle unique layouts and styling requirements, ensuring modularity and easier maintenance.

*   **causes.css:** Specific styles for the "Causes" page, including the tabbed interface and cause-specific content.
*   **contact.css:** Styles for the "Contact" page, including team member cards and the contact form layout.
*   **counseling.css:** Styling for the "Counseling" page, including the video background hero section and service cards.
*   **resources.css:** Styles for the "Resources" page, including resource cards for books, videos, apps, and community support.
*   **stories.css:** Styling for the "Success Stories" page, including story cards and the share story section.
*   **tools.css:** Styles for the "Self-Help Tools" page, including the layout and specific styling for each interactive tool (breathing circle, mood tracker, CBT challenger, meditation player, timers, journal).

## Resources and Libraries Used

*   **Bootstrap 5.3.2:** A popular CSS framework for responsive design and pre-built components.
    *   `https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css`
    *   `https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js`
*   **Bootstrap Icons 1.11.1:** A free, high-quality icon set designed to work with Bootstrap.
    *   `https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css`
*   **Font Awesome 6.0.0:** A widely used icon library for scalable vector icons.
    *   `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css`
*   **Google Fonts (Baloo 2):** Custom font used for typography.
    *   `https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;500;600;700&display=swap`
*   **Animate.css:** A library of ready-to-use CSS animations.
    *   `https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css`
*   **Unsplash:** Source for various background images used in hero sections.
*   **YouTube:** Embedded video content for the counseling page.