# SB-Ecom — Spring Boot E-Commerce REST API

> 🚧 **Project status: under active development.** The backend REST API is functional, but a frontend UI has not been built yet — it's on the roadmap. Expect breaking changes as the project evolves.

A RESTful e-commerce backend built with **Spring Boot 3**, **Spring Security (JWT)**, and **Spring Data JPA**. It provides everything needed to power an online store: category and product catalogs, shopping carts, address management, order placement, and role-based authentication (User / Seller / Admin) — all documented with Swagger/OpenAPI.

Currently the API can be explored and tested via **Swagger UI** or tools like Postman while the frontend is being built.

## Features

- 🔐 **JWT-based authentication** with HTTP-only cookie support and role-based authorization (`ROLE_USER`, `ROLE_SELLER`, `ROLE_ADMIN`)
- 🗂️ **Category management** — create, update, delete, and list product categories with pagination & sorting
- 🛍️ **Product catalog** — add/update/delete products, browse by category or keyword search, and upload product images
- 🛒 **Shopping cart** — add, update, and remove items with quantity management
- 📦 **Orders** — checkout and place orders against a chosen payment method
- 📍 **Address book** — manage multiple shipping addresses per user
- 📖 **API documentation** via springdoc-openapi (Swagger UI)
- 🗄️ **PostgreSQL** persistence (MySQL/H2 configs also included, commented out)

## Tech Stack

| Layer          | Technology                              |
|----------------|------------------------------------------|
| Language       | Java 17                                   |
| Framework      | Spring Boot 3.5                           |
| Security       | Spring Security + JJWT (JSON Web Tokens)  |
| Persistence    | Spring Data JPA / Hibernate + PostgreSQL  |
| Docs           | springdoc-openapi (Swagger UI)            |
| Mapping        | ModelMapper                               |
| Build Tool     | Maven                                     |
| Boilerplate    | Lombok                                    |

## Project Structure

```
src/main/java/com/ecommerce/project
├── config/          # App config, constants, Swagger setup
├── controller/       # REST controllers (Auth, Category, Product, Cart, Order, Address)
├── exceptions/        # Global exception handling
├── model/             # JPA entities (Category, Product, Cart, Order, User, Role, etc.)
├── payload/           # DTOs and API response wrappers
├── repositories/      # Spring Data JPA repositories
├── security/          # JWT filters, entry points, and Spring Security config
├── service/           # Business logic interfaces + implementations
└── util/              # Utility helpers (e.g. AuthUtil)
```

## Getting Started

### Prerequisites

- Java 17+
- Maven 3.9+ (or use the included `./mvnw` wrapper)
- PostgreSQL running locally (or update `application.properties` to use MySQL/H2 instead)

### Configuration

The app reads database credentials from environment variables. Set the following before running:

```bash
export DB_URL=jdbc:postgresql://localhost:5432/ecommerce
export DB_USERNAME=postgres
export DB_PASSWORD=your_password
```

> Alternate MySQL/H2 configuration snippets are available (commented out) in `application.properties` and in `Configurations and dependencies.txt`.

### Run the application

```bash
./mvnw spring-boot:run
```

The API will start on `http://localhost:8080`.

### API Documentation

Once running, explore the interactive API docs at:

```
http://localhost:8080/swagger-ui/index.html
```

## Authentication

- `POST /api/auth/signup` — register a new user
- `POST /api/auth/signin` — log in and receive a JWT (returned as an HTTP-only cookie)
- `POST /api/auth/signout` — log out
- `GET /api/auth/user` — get details of the currently authenticated user

Default seed accounts (created on startup if they don't exist):

| Username  | Password    | Role(s)                          |
|-----------|-------------|-----------------------------------|
| `user1`   | `password1` | ROLE_USER                         |
| `seller1` | `password2` | ROLE_SELLER                       |
| `admin`   | `adminPass` | ROLE_USER, ROLE_SELLER, ROLE_ADMIN |

## Key API Endpoints

| Method | Endpoint                                              | Description                     |
|--------|--------------------------------------------------------|----------------------------------|
| GET    | `/api/public/categories`                                | List all categories             |
| POST   | `/api/public/categories`                                | Create a category                |
| PUT    | `/api/admin/categories/{categoryId}`                     | Update a category                |
| DELETE | `/api/admin/categories/{categoryId}`                     | Delete a category                |
| GET    | `/api/public/products`                                   | List all products               |
| GET    | `/api/public/categories/{categoryId}/products`           | List products in a category     |
| GET    | `/api/public/products/keyword/{keyword}`                 | Search products by keyword      |
| POST   | `/api/admin/categories/{categoryId}/product`             | Add a product to a category     |
| PUT    | `/api/admin/prodcuts/{productId}`                        | Update a product                 |
| DELETE | `/api/admin/products/{productId}`                        | Delete a product                 |
| PUT    | `/products/{productId}/image`                            | Upload/update product image      |
| GET    | `/api/carts`                                             | List all carts                   |
| GET    | `/api/carts/user/cart`                                   | Get the current user's cart      |
| POST   | `/api/carts/products/{productId}/quantity/{quantity}`    | Add product to cart              |
| PUT    | `/api/cart/products/{productId}/quantity/{operation}`    | Update quantity in cart          |
| DELETE | `/api/carts/{cartId}/product/{productId}`                | Remove product from cart         |
| GET    | `/api/addresses`                                         | List addresses                   |
| POST   | `/api/addresses`                                         | Create an address                |
| PUT    | `/api/addresses/{addressId}`                             | Update an address                |
| DELETE | `/api/addresses/{addressId}`                             | Delete an address                |
| POST   | `/api/order/user/payments/{paymentMethod}`               | Place an order                   |

Full request/response schemas are available via Swagger UI.

## Roadmap

- [ ] Frontend UI (in progress)
- [ ] Replace `ddl-auto=create-drop` with a proper migration tool (Flyway/Liquibase)
- [ ] Externalize JWT secret and seed credentials
- [ ] Fix known endpoint path typos
- [ ] Add automated test coverage
- [ ] Add a LICENSE

## Notes & Known Issues

- A couple of endpoint paths contain minor typos carried over from the codebase (e.g. `/admin/prodcuts/{productId}` instead of `products`) — flagging here for anyone integrating against the API.
- The JWT secret and default seed passwords in `application.properties`/`WebSecurityConfig` are for local development only — replace them with secure, externally-managed secrets before deploying.
- `spring.jpa.hibernate.ddl-auto=create-drop` will drop and recreate the schema on every restart — switch to `update` or a migration tool (e.g. Flyway/Liquibase) for production use.

## Contributing

This project is a work in progress and open to contributions — the frontend UI in particular is a good place to start. Feel free to open an issue or PR.

## License

No license file is currently included in this repository. Add one (e.g. MIT, Apache-2.0) before making the repo public if you intend for others to reuse the code.
