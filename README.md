# Teach Blog - blogging backend

The Blog Project is a backend system for a blogging platform with Admin and User roles. Admins manage users and blogs, while Users can perform CRUD operations on their own blogs. Features include secure authentication, role-based access control, and a public API with search, sort, and filter functionalities. Built with TypeScript, Node.js, Express.js, and MongoDB, the project ensures security and efficiency.

## Developer

- [@Rana Arju](https://rana-arju.vercel.app)

## Live API url

<https://techblog-server.vercel.app/>

# or

```
https://techblog-server.vercel.app/

```

## Video Explaination:

[![Tech-Blog](https://res.cloudinary.com/db8l1ulfq/image/upload/v1734604071/tech_backend_qvgj2z.png)](https://youtu.be/UAo5M98yehk?si=JR22lwTtXNUUykbL)

### Technologies Used

- **TypeScript**: Strong typing and enhanced developer experience.
- **Node.js**: Runtime environment for JavaScript-based backend.
- **Express.js**: Framework for building RESTful APIs.
- **MongoDB & Mongoose**: NoSQL database with an ORM for schema validation and CRUD operations.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

```
DATABASE_URL= <Your database URL>
PORT= <Port number>
NODE_ENV = development

BCRYPT_SALT_ROUNDS=
JWT_ACCESS_TOKEN=
REFRESH_TOKEN=

JWT_ACCESS_EXPIRES =
REFRESH_ACCESS_EXPIRES =

```

## Admin login crediential:

```
email: admin@gmail.com
password: admin1234
```

## Installation

Install my-project with npm

### You will need to download Git and Node to run this project

- Node
- Git
- npm

### Also check this out if you are new to node js.

```bash
node --version
git --version
```

## Run Locally

Clone the project

```bash
  git clone https://github.com/rana-arju/techBlog.git
```

Go to the project directory

```bash
  cd techBlog
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

## API Endpoint

#### Get all Product with query

```http
  GET /api/products?searchTerm=
```

#### Post single product

```http
  POST /api/products/:productId
```

## Product example:

```
{
  "name": "Roadster 5000",
  "brand": "SpeedX",
  "price": 300,
  "type": "Road",
  "description": "A premium road bike designed for speed and performance.",
  "quantity": 20,
  "inStock": true
}

```

#### Get single product

```http
  GET /api/products/:productId
```

#### delete single product

```http
  DELETE /api/products/:productId
```

#### Update single product

```http
  PUT /api/products/:productId
```

#### Post a Order

```http
  POST /api/orders
```

### Order Example [totalPrice optional, functionality build for count totalPrice if totalPrice not provided]

```
{
    "email": "rana23@example.com",
    "product": "674057007c9f75443d09e463",
    "quantity": 1,
    "totalPrice": 950
}

```

#### Get all Order

```http
  GET /api/orders
```

#### Get Order single product

```http
  GET /api/orders/:orderId
```

#### delete single order

```http
  DELETE /api/orders/:orderId
```

#### Update single order

```http
  PUT /api/orders/:orderId
```

# Folder Structure 📂

```bash
├── README.md
├── tsconfig.json
├── .env
├── package-lock.json
├── package.json
├── src
│   ├── App.ts
│   ├── server.ts
│   └── app
│      ├── config
│      │    └── index.ts
|      ├── builder
│      │    └── QueryBuilder.ts
|      ├── errors
│      │    └── error all files
|      ├── middleware
│      │    └── auth, globalErrorHandler,notFound and validationRequest file
│      └── modules
│         └── Admin
|         |    ├── admin.controller.ts
|         |    ├── admin.service.ts
|         |    ├── admin.route.ts
│         └── Auth
|               ├── auth.controller.ts
|               ├── auth.schema.ts
|               ├── auth.interface.ts
|               ├── auth.service.ts
|               ├── auth.utils.ts
|               ├── auth.validation.ts
|               └── auth.route.ts
│         └── Blog
|               ├── blog.controller.ts
|               ├── blog.schema.ts
|               ├── blog.interface.ts
|               ├── blog.service.ts
|               ├── blog.validation.ts
|               └── blog.route.ts
│      └── routes
│         └── index.ts
│      └── utils
│         └── catchAsync.ts and sendResponse.ts
│
├──  vercel.json
├──  eslint.config.mjs
├── .gitignore
├── .prettierigmore
└── .prettierrc

```

---

# Packages Used 📦

| Used Package List |
| :---------------: |
|    express js     |
|     mongoose      |
|    typescript     |
|        JWT        |
|   jsonWebToken    |
|      bcrypt       |
|        Zod        |
|       cors        |
|      dotenv       |
|     prettier      |
|   eslint\_\_js    |

---
