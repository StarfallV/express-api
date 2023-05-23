# Fastify
# REST API for News and Topic Management

## Installation setups
1. Make sure you have Node.js (app built in v18) and PostgreSQL (version 14) Installed in your workspace
2. Clone this repository
3. Do `npm install` using terminal
4. Create an environment file `.env` using the example `.env-example` (terminal command: `cp .env.example .env`)
5. Configure the `.env` file based on the parameter
6. Do `npx prisma db push` in the root folder using terminal

## Development server
- Development server command: `npm start`

## Unit tests
- Unit tests command: `npm test`
- Workflow: file `unit_test.yml` to run unit test when there is a pull request

## Building the project
- Build command: `npm build`

## Stacks
- Runtime: NodeJS
- Language: TypeScript
- Web framework: Fastify
- Database: PostgreSQL
- App setup: Nx
- Testing framework: Jest
- ORM: Prisma

## Postman collection
- Link: https://drive.google.com/file/d/1kSCNGG0qFz1aa-MoI7jZ5tiPhjovf0Wf/view?usp=sharing

Made with ♥,
StarfallV (Envrico Tjhen)
