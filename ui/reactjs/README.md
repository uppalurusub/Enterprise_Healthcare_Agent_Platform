# 🏥 Enterprise Healthcare Agent Platform - React Frontend

## Overview

The **Enterprise Healthcare Agent Platform** is a React + TypeScript frontend that provides an interactive dashboard for healthcare platform analysis. It enables users to submit healthcare analysis requests, visualize AI-generated insights, monitor platform health, and review agent execution details.

The application is built using modern React practices including:

- React with TypeScript
- Component-based architecture
- Custom Hooks
- Axios for REST API communication
- Dashboard-oriented UI
- Unit Testing

---

# Features

- Healthcare Platform Analysis
- Executive Summary Dashboard
- Agent Execution Visualization
- Platform Health Monitoring
- Human Review Support
- Metadata Display
- Report Viewer
- Responsive Layout
- API Integration
- Unit Tests

---

# Project Structure

```
src
│
├── api
│   ├── axios.ts
│   └── healthcareApi.ts
│
├── assets
│   ├── hero.png
│   ├── react.svg
│   └── vite.svg
│
├── components
│   │
│   ├── common
│   │   ├── ReportViewer.tsx
│   │   └── MarkCard.tsx
│   │
│   ├── healthcare
│   │   ├── PlatformAnalysisDashboard.tsx
│   │   ├── PlatformAnalysisForm.tsx
│   │   ├── ExecutiveSummaryCard.tsx
│   │   ├── HumanReviewCard.tsx
│   │   ├── HealthStatusCard.tsx
│   │   ├── MetadataCard.tsx
│   │   ├── AgentAnalysisCard.tsx
│   │   ├── AgentsCard.tsx
│   │   └── AgentsInfoCard.tsx
│   │
│   └── layout
│       ├── Header.tsx
│       ├── Sidebar.tsx
│       └── Footer.tsx
│
├── hooks
│   ├── useAgents.ts
│   ├── useAgentsInfo.ts
│   ├── usePlatformAnalysis.ts
│   └── usePlatformHealth.ts
│
├── models
│   ├── healthcareRequest.ts
│   └── healthcareResponse.ts
│
├── pages
│   └── Dashboard.tsx
│
├── unit_testing
│
├── utils
│   └── reportFormatter.ts
│
├── App.tsx
├── main.tsx
├── index.css
└── App.css
```

---

# Architecture

```
User

   │

Dashboard Page

   │

Platform Analysis Form

   │

Custom Hook

   │

Healthcare API

   │

Axios Client

   │

REST Backend API

   │

Healthcare Response

   │

Dashboard Components

   ├── Executive Summary
   ├── Agent Analysis
   ├── Metadata
   ├── Human Review
   ├── Platform Health
   └── Report Viewer
```

---

# Major Components

## Dashboard

Main application page responsible for orchestrating the healthcare workflow.

---

## Platform Analysis Form

Collects user input and submits analysis requests.

Responsibilities

- Validate input
- Submit requests
- Handle loading states

---

## Executive Summary Card

Displays:

- Overall analysis
- Key findings
- Recommendations
- Risk summary

---

## Agent Analysis Card

Displays:

- Individual AI Agent outputs
- Confidence
- Reasoning
- Decisions

---

## Human Review Card

Displays information requiring manual review.

---

## Metadata Card

Displays response metadata including

- Request ID
- Processing time
- Model information
- Version
- Timestamp

---

## Platform Health Card

Displays

- Platform Status
- Health Indicators
- System Metrics

---

## Report Viewer

Displays formatted reports generated from API responses.

---

# Custom Hooks

## usePlatformAnalysis

Responsible for

- API request
- Response handling
- Loading
- Error management

---

## usePlatformHealth

Fetches platform health information.

---

## useAgents

Retrieves available healthcare agents.

---

## useAgentsInfo

Retrieves detailed information about agents.

---

# API Layer

```
api/

├── axios.ts
└── healthcareApi.ts
```

Provides

- Centralized Axios instance
- Base URL configuration
- Request methods
- Response handling
- Error handling

---

# Data Models

## healthcareRequest

Contains request interfaces sent to backend APIs.

---

## healthcareResponse

Contains response interfaces returned from backend services.

---

# Utility Functions

## reportFormatter

Responsible for formatting backend reports before rendering.

---

# Layout Components

The application contains reusable layout components.

- Header
- Sidebar
- Footer

---

# Unit Testing

The project includes React component tests covering

- Dashboard
- App
- Platform Analysis Dashboard
- Report Viewer
- Metadata Card

Testing Frameworks typically include

- Vitest
- React Testing Library
- Jest DOM

---

# Installation

Clone the repository

```bash
git clone <repository-url>
```

Navigate to the project

```bash
cd healthcare-agent-platform
```

Install dependencies

```bash
npm install
```

Run the application

```bash
npm run dev
```

Build

```bash
npm run build
```

Preview

```bash
npm run preview
```

Run Tests

```bash
npm test
```

or

```bash
npm run test
```

Run Coverage

```bash
npm run coverage
```

---

# Expected Backend

The frontend communicates with a Healthcare REST API.

Typical flow

```
React UI
      │
Axios
      │
Healthcare REST API
      │
AI Agents
      │
Healthcare Analysis
      │
JSON Response
      │
Dashboard
```

---

# Technologies

- React
- TypeScript
- Axios
- HTML5
- CSS3
- REST APIs
- Custom Hooks
- Component Architecture
- React Testing Library
- Vitest

---


# Testing Commands

npm run test:run

npm run test:run -- src/unit_testing/ReportViewer.test.ts

npm run test:coverage

---
# Best Practices Used

- Modular Architecture
- Separation of Concerns
- Reusable Components
- Strong Typing
- Custom Hooks
- API Abstraction
- Unit Testing
- Scalable Folder Structure

---

# Future Enhancements

- Authentication
- Authorization
- Dark Mode
- Export Reports
- Real-time Notifications
- Dashboard Analytics
- Charts & Visualizations
- Role-Based Access Control
- Audit Logs
- WebSocket Integration

---

# License

This project is intended for educational and enterprise healthcare application development. Update this section according to your organization's licensing requirements.