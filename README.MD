# ☕ Beverage & Retail Store Management API

A robust and modern Backend API designed to manage a store specializing in ready-to-drink beverages (coffee, tea, anise) and retail products sold by weight (coffee beans, spices, etc.). The system provides comprehensive management for producers, products, orders, order details, and shop expenses.

---

## 🚀 Key Features

- ✅ **Beverage & Retail Management**: Full support for products sold by weight (`retail_products`) and ready-to-drink beverages by the cup (`beverages`).
- ✅ **Producer Management**: Track producers, their ratings, and associated phone numbers.
- ✅ **Order System**: Manage the complete order lifecycle (`pending`, `preparing`, `completed`, `cancelled`) with detailed line items for each order.
- ✅ **Expense Tracking**: Log and monitor daily shop expenses (electricity, rent, etc.).
- ✅ **Strict Data Validation**: Utilizes `Zod` for robust runtime schema validation.
- ✅ **Modern & High Performance**: Built with `TypeScript` and `ES Modules`, featuring a fast development environment powered by `tsx`.

---

## 🛠️ Tech Stack

| Technology     | Description                                                      |
| :------------- | :--------------------------------------------------------------- |
| **Node.js**    | Core runtime environment                                         |
| **Express.js** | Web framework for routing and middleware                         |
| **TypeScript** | Static typing for code reliability and maintainability           |
| **PostgreSQL** | Relational database management system                            |
| **Zod**        | TypeScript-first schema declaration and validation library       |
| **PNPM**       | Fast, disk-space-efficient package manager                       |
| **tsx**        | Node.js enhanced with TypeScript execution for rapid development |

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v20 or higher recommended)

- [PostgreSQL](https://www.postgresql.org/) (v14 or higher)

- [PNPM](https://pnpm.io/) (Install via `npm install -g pnpm`)

---

## ⚙️ Installation & Setup

1. **Clone the Repository**:

   ```bash
   git clone <repository-url>
   cd <project-folder>/backend
   ```

2. **Install Dependencies**:

   ```bash
   pnpm install
   ```

3. **Environment Variables**:

   Create a `.env` file in the root of the `backend` directory and configure it with your local settings:

   ```env
   PORT=3000
   NODE_ENV=development
   DATABASE_URL=postgresql://username:password@localhost:5432/your_database_name
   ```

4. **Database Setup**:
   Execute the provided database schema script in your PostgreSQL client (e.g., pgAdmin, DBeaver, or psql).
   _Note: The system utilizes a dedicated schema named `hossam`._

5. **Run the Project**:
   - Development mode (with hot-reloading):

     ```bash
     pnpm run dev
     ```

   - Production build:

     ```bash
     pnpm run build
     pnpm run start
     ```

---

## 🗄️ Database Schema Overview

The database operates under the `hossam` schema and consists of the following core tables:

| Table Name        | Description                                                                                                        |
| :---------------- | :----------------------------------------------------------------------------------------------------------------- |
| `producers`       | Producer details (name, rating 0.0-5.0, timestamps).                                                               |
| `producer_phones` | Producer phone numbers (One-to-Many relationship with `producers`).                                                |
| `retail_products` | Products sold by weight (name, category, price per kg, stock in kg, producer ID).                                  |
| `beverages`       | Ready-to-drink beverages (name, drink type, roast level, `is_mahuj` flag, price, description).                     |
| `orders`          | Main order records (customer name, address, total price, status).                                                  |
| `order_items`     | Order line items (links an order to either a `retail_product` or a `beverage`, including quantity and unit price). |
| `shop_expenses`   | Shop expense logs (expense type, amount, description, date).                                                       |

---

## 🌐 API Endpoints

All responses follow a standardized format, returning either a `success` payload with `data`, or an `error` payload with a `message`.

### 🥤 Beverages

| Method   | Endpoint             | Description                        |
| :------- | :------------------- | :--------------------------------- |
| `GET`    | `/api/beverages`     | Retrieve a list of all beverages   |
| `GET`    | `/api/beverages/:id` | Retrieve a specific beverage by ID |
| `POST`   | `/api/beverages`     | Create a new beverage              |
| `PUT`    | `/api/beverages/:id` | Update an existing beverage        |
| `DELETE` | `/api/beverages/:id` | Delete a beverage                  |

### 📦 Retail Products

| Method   | Endpoint                   | Description                                    |
| :------- | :------------------------- | :--------------------------------------------- |
| `GET`    | `/api/retail-products`     | Retrieve all retail products                   |
| `GET`    | `/api/retail-products/:id` | Retrieve a specific retail product by ID       |
| `POST`   | `/api/retail-products`     | Create a new retail product                    |
| `PUT`    | `/api/retail-products/:id` | Update a retail product (e.g., stock or price) |
| `DELETE` | `/api/retail-products/:id` | Delete a retail product                        |

### 🏭 Producers

| Method   | Endpoint             | Description                                            |
| :------- | :------------------- | :----------------------------------------------------- |
| `GET`    | `/api/producers`     | Retrieve all producers                                 |
| `GET`    | `/api/producers/:id` | Retrieve a specific producer (including phone numbers) |
| `POST`   | `/api/producers`     | Create a new producer                                  |
| `PUT`    | `/api/producers/:id` | Update a producer's details                            |
| `DELETE` | `/api/producers/:id` | Delete a producer                                      |

### 🛒 Orders & Order Items

| Method   | Endpoint                 | Description                                                     |
| :------- | :----------------------- | :-------------------------------------------------------------- |
| `GET`    | `/api/orders`            | Retrieve all orders                                             |
| `GET`    | `/api/orders/:id`        | Retrieve a specific order with its `order_items`                |
| `POST`   | `/api/orders`            | Create a new order (includes creating associated `order_items`) |
| `PUT`    | `/api/orders/:id/status` | Update order status (e.g., `pending` → `preparing`)             |
| `DELETE` | `/api/orders/:id`        | Cancel/Delete an order                                          |

---

## 📂 Project Structure

```text
backend/
├── src/
│   ├── controllers/       # Request handlers (Controllers)
│   ├── services/          # Business logic and database interactions
│   ├── routes/            # API route definitions
│   ├── db/                # PostgreSQL connection setup and queries
│   ├── schemas/           # Zod validation schemas
│   ├── utils/             # Helper functions (e.g., successResponse, errorResponse)
│   └── index.ts           # Main application entry point
├── .env                   # Environment variables
├── package.json           # Project dependencies and scripts
├── tsconfig.json          # TypeScript configuration
└── README.md              # This file
```

---

## 📝 Important Notes for Developers

- **Auto-incrementing IDs**: The database uses `GENERATED ALWAYS AS IDENTITY` for primary keys. Do not attempt to manually insert `id` values.
- **Cascading Deletes**: Deleting a `producer` will automatically delete their associated phone numbers (`ON DELETE CASCADE`). However, their associated products will retain a `NULL` producer ID (`ON DELETE SET NULL`).
- **Data Constraints**: The `rating` column in the `producers` table is strictly constrained to values between `0.0` and `5.0` via a database `CHECK` constraint.

---

## 👨‍💻 Author

Developed by **Adham Said**  
For inquiries, bug reports, or contributions, please open an Issue or submit a Pull Request.

---

## 📄 License

This project is licensed under the **ISC License**.
