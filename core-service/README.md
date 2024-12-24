# Technocenter - Node.js Template [TypeScript]

### Version 1.0.0

## Requirements

- Node.js version: >= 20.18.1 (LTS)
- NPM version: >= 10.8

## How to Use

1. Clone this repository to your local machine.
2. Run `npm install` to install the project dependencies.
3. Run `npm run dev` to start the project in development mode.
4. Run `npm run build` to build the project. The output will be stored in the **dist/** folder.
5. Run `npm run start` to start the application from the built project output.

## Project Structure

- **[root]**  
  Contains the base configuration files for the project, including the `.env` file, Firebase/Google SDK configurations, and other essential setup files.

- **[src]**  
  Contains the source code for the project. The main entry point of the application is the `app.ts` file. The structure is organized as follows:

  1. **`configs/`**: Contains configuration files for the project, such as environment variable management, Kafka setup, Redis configuration, OSS configuration, etc.
  2. **`constants/`**: Contains predefined constants that are used across the entire project.
  3. **`controllers/`**: Contains API controllers for each service. These controllers handle HTTP requests and responses. **Business logic should not be placed in the controllers**; they should be used for orchestrating the request-response cycle only.
  4. **`enums/`**: Contains enumeration types used across the project for more structured and readable code.
  5. **`interfaces/`**: Contains TypeScript interfaces used for type definitions, as the project is built using TypeScript.
  6. **`middlewares/`**: Contains custom middleware used in the project. Middleware functions can be used to handle requests before they reach the controller logic (e.g., authentication, logging).
  7. **`prisma/`**: Contains files related to Prisma, which is used for database management and ORM (Object Relational Mapping).
  8. **`routes/`**: Contains the routing logic for the project. This folder defines the HTTP endpoints and the middleware functions that are applied before the main controller logic is executed.
  9. **`schedulers/`**: Contains tasks scheduled to run at specific intervals, such as cron jobs.
  10. **`services/`**: Contains business logic that interacts with the database and other services. These services are called within the controllers to handle the core functionality of the application.
  11. **`utils/`**: Contains utility functions that can be reused across the project, such as JWT token handling, string manipulation, etc.
  12. **`validators/`**: Contains validation logic for inputs and requests, ensuring that data conforms to the expected structure before processing.

- **[public]**  
  Used for serving static files, such as images or documents. If the project uses Object Storage Services (OSS), this folder can be used to temporarily store data, but permanent data should not be stored here.

- **[bin]**  
  Contains binary files, such as executables or other non-source code files.

- **[dist]**  
  The output folder where the compiled or built version of the project is stored after running `npm run build`. This folder contains the production-ready files.

## Naming Convention

1. **File Naming**: Use the format `[function].[service_name].[extension]`. For example, if you are creating an API to delete user data, name the file `delete.service.ts`.
2. **Folder Structure**: For better organization and maintainability, separate different features or business logic into individual folders. For example:

   - `users/delete.service.ts`
   - `transaction/delete.service.ts`

   Alternatively, you can use a nested folder structure to represent more specific logic:

   - `users/account/delete.service.ts`
   - `users/friendlist/delete.service.ts`

## Notes

- This template has been built using **npm** as the package manager, as specified in the `package.json` file.  
  You are encouraged to use _npm_ exclusively as the package manager. If you prefer to use a different package manager, you will need to remove the `packageManager` field from the `package.json` file.

- It is also possible to build a Docker image from this project. To view or modify the default Docker configuration, refer to the `Dockerfile`.

- If you add new variables to `.env`, please add the placeholder to the `.env.example` file.

---

_Node.js Trainer Team_
