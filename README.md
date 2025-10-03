# Employee Management System (Angular)

This is a sample **Employee Management System** built with **Angular 20**.  
It demonstrates real-world Angular features such as **JWT Authentication, HTTP Interceptors, Guards, CRUD operations, Services, and API integration** using a free backend API.

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.1.5.

---

## 🚀 Features

- **Authentication**
  - Login with JWT token
  - Token stored securely in browser storage
  - HTTP Interceptor automatically attaches token to API requests

- **Authorization**
  - Guards to protect routes (only logged-in users can access employee dashboard)

- **Employee Management**
  - View employees list
  - Add, update, and delete employees
  - Search and filter employees

- **UI/UX**
  - Responsive design
  - Reactive Forms with validation
  - Toast/Alert messages for success & error handling

- **API**
  - Uses free sample API: [https://freeapi.miniprojectideas.com](https://freeapi.miniprojectideas.com)

---

## 🛠️ Technologies Used

- **Frontend**: Angular 20, TypeScript, RxJS  
- **UI Styling**: Angular Material / Bootstrap  
- **Authentication**: JWT with Interceptor  
- **Backend API**: Free Public API (no custom backend used)  

---

## 🔑 Login Credentials (Sample)

Username: jamee@123
Password: jamee

*(Or whatever credentials the free API provides)*

---

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
