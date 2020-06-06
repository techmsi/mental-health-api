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

- GET `/api/phq9`
  - return PHQ-9 questionnaire

- POST  `/api/diagnosis`
  -  return PHQ-9 score to receive diagnosis

- GET `/api/therapists`
  -  return a list of therapists

- GET `/api/therapists?limit=5` no default
  - returns an `n` number of therapists

### Technologies

- Backend: lambda function
