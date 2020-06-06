# mental-health-api

Prototype for mental health api using Patient Health Questionnaire (PHQ-9) & returning a list of therapists.

## Prerequisites

- node must be installed

## Run server locally

```
yarn
yarn start:lambda

```

### Endpoints

- `/api/phq9`

  - GETS PHQ-9 questionnaire

- `/api/diagnosis`

  - POSTS PHQ-9 score to receive diagnosis

- `/api/therapists`

  - GETS a list of therapists

- `/api/therapists?limit=5` no default
  - GETS an `n` number of therapists

### Technologies

- Backend: lambda function
