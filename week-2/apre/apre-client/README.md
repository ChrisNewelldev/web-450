# ApreClient

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Week 3 Major Task (Sprint 2): Agent Performance – Call Duration by Date Range

### What changed
Added the **Call Duration by Date Range** report (server API + Angular component) and unit tests.

### Server (apre-server)
From the repo root:

```bash
cd week-2/apre/apre-server
npm install
npm test
npm start
```

API endpoint:

- `GET /api/reports/agent-performance/call-duration-by-date-range?startDate=2023-01-01&endDate=2023-01-31`

### Client (apre-client)
From the repo root:

```bash
cd week-2/apre/apre-client
npm install
npm test
npm start
```

UI route:

- `http://localhost:4200/reports/agent-performance/call-duration-by-date-range`


	•	how to run: npm install, npm start
	•	how to test: npm test
	•	note: “Karma/ChromeHeadless reports ‘full page reload’ even though specs show SUCCESS” (paste the exact line)