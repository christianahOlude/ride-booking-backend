# Chauffeured Fleet Rental & Cab Management System

A high-performance, real-time vehicle rental and chauffeured fleet management platform built with a modern, highly scalable JavaScript/TypeScript stack. This platform enables car owners to list their fleets with custom pricing, allows passengers to negotiate rental prices and pay securely via bank transfers, and dynamically matches trips with professional drivers who receive commissions directly into their digital wallets.

---

## Technical Ecosystem

*   **Backend Framework:** [NestJS](https://nestjs.com/) (TypeScript enterprise-grade modular framework)
*   **Database ORM:** [Prisma v7](https://www.prisma.io/) (Type-safe query builder & migration engine)
*   **Database Engine:** [PostgreSQL](https://www.postgresql.org/) (Relational database with strict schemas)
*   **Real-Time Layer:** [Socket.io](https://socket.io/) (Bidirectional WebSocket events for live spatial tracking and dispatch)
*   **Frontend Framework:** [React Native](https://reactnative.dev/) with [Expo](https://expo.dev/) (Native iOS & Android mobile clients)

---

## Core Features

### 1. Fleet & Car Owner Management
*   **Multi-Vehicle Fleet Upload:** Car owners can register, manage an unlimited fleet of vehicles, set base rental prices, and toggle individual vehicle availability states (`isAvailable`).
*   **Automated Split Ledger (Owner Wallets):** A dedicated `OwnerWallet` automatically receives rental balances (total fare minus driver commissions) upon booking completion.

### 2. Verified Driver Network
*   **Company Identification:** Drivers register with mandatory `companyName` and verification uploads (`idCardUrl`) to ensure high-security compliance.
*   **Commission Earnings (Driver Wallets):** Drivers are matched with rental vehicles and automatically receive their calculated commission splits into their personal wallets upon trip completion.

### 3. Passenger Booking & Price Negotiation
*   **Bid/Negotiation Flow:** Passengers can request a specific vehicle and driver, proposing a custom `negotiatedPrice` that car owners can review and accept.
*   **Strict Transfer Payments:** To secure transactions and protect fleet assets, payments are restricted entirely to digital **Bank Transfers / Card Escrows** (No cash allowed).

### 4. Real-Time Tracking & Event Dispatch
*   **Active Trip Lifecycle:** Manages states seamlessly from `PENDING` ➔ `ACCEPTED` ➔ `ON_TRIP` ➔ `COMPLETED` or `CANCELLED`.
*   **Live WebSockets:** Broadcasts location coordinates, booking updates, and dispatch statuses in real time.

---

## System Architecture & Financial Split

The system orchestrates a real-time event loop coupled with atomic database transactions to handle automated payouts instantly.

```text
               ┌──────────────────────────────────────────┐
               │         React Native App (Expo)          │
               └─────────────┬──────────────────────┬─────┘
                             │                      │
                  (REST API Actions)          (Live WebSockets)
                             │                      │
                             ▼                      ▼
               ┌──────────────────────────┐   ┌──────────────┐
               │    NestJS Controllers    │   │ NestJS WS    │
               │  (HTTP /drivers, /rides) │   │   Gateway    │
               └─────────────┬────────────┘   └──────┬───────┘
                             │                       │
                             ▼                       │
               ┌─────────────────────────────────────▼────┐
               │              NestJS Services             │
               │        (Core Business & Event Logic)     │
               └─────────────────────┬────────────────────┘
                                     │
                                (Split Payout)
                                     ├──────────────────────────────┐
                                     ▼                              ▼
                         ┌──────────────────────┐        ┌──────────────────────┐
                         │   Driver's Wallet    │        │  Car Owner's Wallet  │
                         │ (Commission Earnings)│        │   (Trip Earnings)    │
                         └───────────┬──────────┘        └──────────┬───────────┘
                                     │                              │
                                     └──────────────┬───────────────┘
                                                    │
                                            (Prisma Client v7)
                                                    │
                                                    ▼
                               ┌──────────────────────────────────────────┐
                               │            PostgreSQL Database           │
                               └──────────────────────────────────────────┘





ride-booking-backend/
├── prisma/
│   ├── generated/
│   │   └── client/             # Global client backup directory
│   ├── migrations/             # Relational migration tracking
│   │   └── 20260703104445_init/
│   │   └── migration_lock.toml
│   └── schema.prisma           # Schema Blueprint (User, Driver, CarOwner, Vehicle, Ride, Wallets)
├── src/
│   ├── users/                  # Passenger/Client Module (Profiles, Registration)
│   │   ├── dto/
│   │   │   ├── create-user.dto.ts
│   │   │   └── update-user.dto.ts
│   │   ├── entities/
│   │   │   └── user.entity.ts
│   │   ├── users.controller.ts
│   │   ├── users.module.ts
│   │   └── users.service.ts
│   │
│   ├── drivers/                # Driver Resource Module (Verification, Profiles)
│   │   ├── dto/
│   │   │   ├── create-driver.dto.ts
│   │   │   └── update-driver.dto.ts
│   │   ├── entities/
│   │   │   └── driver.entity.ts
│   │   ├── drivers.controller.ts
│   │   ├── drivers.module.ts
│   │   └── drivers.service.ts
│   │
│   ├── generated/              # Localized Compilation Types Target (Prisma 7 Output)
│   │   └── prisma/
│   │       ├── internal/
│   │       ├── models/
│   │       │   ├── Driver.ts
│   │       │   ├── CarOwner.ts
│   │       │   ├── Vehicle.ts
│   │       │   ├── Ride.ts
│   │       │   ├── Payment.ts
│   │       │   ├── Wallet.ts
│   │       │   ├── OwnerWallet.ts
│   │       │   └── Transaction.ts
│   │       ├── browser.ts
│   │       ├── client.ts
│   │       ├── commonInputTypes.ts
│   │       ├── enums.ts
│   │       └── models.ts
│   │
│   ├── prisma/                 # Centralized Prisma Database Connector Module
│   │   ├── prisma.module.ts
│   │   ├── prisma.service.ts
│   │   └── prisma.service.spec.ts
│   │
│   ├── rides/                  # Ride Lifecycle, Bidding & Dispatch Module
│   │   ├── dto/
│   │   │   ├── create-ride.dto.ts
│   │   │   └── update-ride.dto.ts
│   │   ├── entities/
│   │   │   └── ride.entity.ts
│   │   ├── rides.controller.ts
│   │   ├── rides.module.ts
│   │   └── rides.service.ts
│   │
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   └── main.ts
│
├── test/                       # E2E Test Suite
├── .env                        # Local database credentials
├── .gitignore
├── .prettierrc
├── eslint.config.mjs
├── nest-cli.json
├── package-lock.json
├── package.json
├── prisma.config.ts            # Prisma 7 configuration file
├── README.md
└── tsconfig.build.json





Local Development & Installation

Follow these steps to deploy and run your development workspace locally:
1. Install Workspace Dependencies

npm install

2. Configure Local Database Connection String

Add your Postgres path inside .env at the root directory:
Code snippet

DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ride_booking_db?schema=public"

3. Deploy the Database Schema

# Compile and output the localized Type System to src/generated/prisma
npx prisma generate

# Create and apply SQL database tables directly on your PostgreSQL instance
npx prisma migrate dev --name init

4. Boot Up the Server

npm run start:dev

Your server will boot cleanly on http://localhost:3000 and is ready to handle vehicle rental requests!
