# 📡 API de Proyecto educativo

## 🚀 Introducción

API con conexión a una base de datos en turso, para sistema de educación con cursos.

## 🛠️ Tecnologías Utilizadas

- Node.js
- Express.js
- TypeScript
- RESTful Principles
- Turso (Database)

## 📌 Ejecución

```bash
pnpm run dev
```

# 🔗Endpoints

### 🎖 Roles data

#### Agregar un nuevo rol

➕**POST** `/api/roles/newRole`

#### Obtener todos los roles

🔍**GET** `/api/roles`

#### Obtener role por su ID

🔍**GET** `/api/roles/:id`

### 🧑 Users data

#### Obtener todos los usuarios

🔍**GET** `/api/users`

#### Obtener usuario por su ID

🔍**GET** `/api/users/:id`

#### Agregar un nuevo usaurio

➕**POST** `/api/users/newUser`

### 🛑 Permissions data

#### Obtener todos los permisos

🔍**GET** `/api/permissions`

#### Obtener permiso por ID

🔍**GET** `/api/permissions/:id`

#### Agregar un nuevo permiso

➕**POST** `/api/permission/newPermission`

### 🎓 Obtener todos los grados académicos

**GET** `/api/degrees`

### 🎓 Crear grado académico

**POST** `/api/degrees/newDegree`

### 📚 Obtener todas las categorías

**GET** `/api/categories`

### 📚 Crear categoría

**POST** `/api/categories`

### 📚 Obtener todas las subcategorías

**GET** `/api/subcategories`

### 📚 Crear subcategoría

**POST** `/api/subcategories`
