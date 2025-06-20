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

---

### 🧑 Users data

#### Obtener todos los usuarios

🔍**GET** `/api/users`

#### Obtener usuario por su ID

🔍**GET** `/api/users/:id`

#### Agregar un nuevo usuario

➕**POST** `/api/users/newUser`

#### Obtener usuario por email

🔍**GET** `/api/users/email/:email`

#### Actualizar usuario

📝**PATCH** `/api/users/:id`

---

### 🛑 Permissions data

#### Obtener todos los permisos

🔍**GET** `/api/permissions`

#### Obtener permiso por ID

🔍**GET** `/api/permissions/:id`

#### Agregar un nuevo permiso

➕**POST** `/api/permissions/newPermission`

---

### 👤 User Roles

#### Agregar un nuevo user-role

➕**POST** `/api/user-roles/newUserRole`

---

### 👨‍🏫 Instructors

#### Agregar un nuevo instructor

➕**POST** `/api/instructors/newInstructor`

#### Obtener todos los instructores

🔍**GET** `/api/instructors`

#### Obtener instructor por ID

🔍**GET** `/api/instructors/:id`

---

### 💸 Comisiones

#### Agregar una nueva comisión

➕**POST** `/api/comissions/newCommission`

---

### 🎓 Students

#### Agregar un nuevo estudiante

➕**POST** `/api/students/newStudent`

#### Obtener estudiante por userId

🔍**GET** `/api/students/user?userId={userId}`

#### Obtener todos los estudiantes

🔍**GET** `/api/students`

#### Obtener estudiante por ID

🔍**GET** `/api/students/:id`

---

### 📚 Cursos

#### Agregar un nuevo curso

➕**POST** `/api/courses/newCourse`

#### Obtener todos los cursos

🔍**GET** `/api/courses`

#### Obtener curso por ID

🔍**GET** `/api/courses/:id`

---

### 🎓 Grados académicos

#### Obtener todos los grados académicos

🔍**GET** `/api/degrees`

#### Obtener grado académico por ID

🔍**GET** `/api/degrees/:id`

#### Crear grado académico

➕**POST** `/api/degrees/newDegree`

---

### 📚 Categorías

#### Obtener todas las categorías

🔍**GET** `/api/categories`

#### Obtener categoría por ID

🔍**GET** `/api/categories/:id`

#### Crear categoría

➕**POST** `/api/categories`

---

### 📚 Subcategorías

#### Obtener todas las subcategorías

🔍**GET** `/api/subcategories`

#### Obtener subcategoría por ID

🔍**GET** `/api/subcategories/:id`

#### Crear subcategoría

➕**POST** `/api/subcategories`

---

### 🎟️ Promociones

#### Obtener todas las promociones

🔍**GET** `/api/promotions`

#### Obtener promoción por ID

🔍**GET** `/api/promotions/:id`

#### Crear promoción

➕**POST** `/api/promotions`

---

### 📄 Documentos de curso

#### Obtener todos los documentos

🔍**GET** `/api/course-documents`

#### Obtener documento por ID

🔍**GET** `/api/course-documents/:id`

#### Crear documento

➕**POST** `/api/course-documents`

---

### 🎬 Videos de curso

#### Obtener todos los videos

🔍**GET** `/api/course-videos`

#### Obtener video por ID

🔍**GET** `/api/course-videos/:id`

#### Crear video

➕**POST** `/api/course-videos`

---

### 💰 Instructor Commissions

#### Obtener todas las comisiones de instructor

🔍**GET** `/api/instructor-commissions`

#### Obtener comisión de instructor por ID

🔍**GET** `/api/instructor-commissions/:id`

#### Crear comisión de instructor

➕**POST** `/api/instructor-commissions`

---

### 🧾 Historial de pagos

#### Obtener todo el historial de pagos

🔍**GET** `/api/payment-history`

#### Obtener historial de pago por ID

🔍**GET** `/api/payment-history/:id`

#### Crear historial de pago

➕**POST** `/api/payment-history`

---

### ⭐ Calificaciones de curso

#### Obtener todas las calificaciones

🔍**GET** `/api/course-ratings`

#### Obtener calificación por ID

🔍**GET** `/api/course-ratings/rating/:id`

#### Crear calificación

➕**POST** `/api/course-ratings`

---

### 📥 Inscripciones

#### Obtener todas las inscripciones

🔍**GET** `/api/enrollments`

#### Obtener inscripción por ID

🔍**GET** `/api/enrollments/:id`

#### Crear inscripción

➕**POST** `/api/enrollments`

#### Obtener cursos de un estudiante

🔍**GET** `/api/enrollments/studentCourses`

---

### 🗒️ Access Logs

#### Obtener todos los logs de acceso

🔍**GET** `/api/access-logs`

#### Obtener log de acceso por ID

🔍**GET** `/api/access-logs/:id`

#### Crear log de acceso

➕**POST** `/api/access-logs/newAccessLog`

---

### 📢 Publicidad

#### Obtener todas las publicidades

🔍**GET** `/api/advertising`

#### Agregar nueva Publicidad

## ➕**POST** `/api/advertising`

### 🔎 Búsqueda de contenido

#### Buscar contenido en cursos, videos y documentos

🔍**GET** `/api/search/content`

---
