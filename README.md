# 📡 API de Proyecto Educativo

## 🚀 Introducción

Esta API conecta con una base de datos Turso y gestiona un sistema educativo con cursos, usuarios, roles, estudiantes, instructores, pagos, promociones y más.

## 🛠️ Tecnologías Utilizadas

- Node.js
- Express.js
- TypeScript
- Turso (Database)
- RESTful Principles

## 📁 Estructura del Proyecto

```
src/
  api.ts
  config/
    db.ts
  controllers/
    accessLogController.ts
    advertisingController.ts
    categoryController.ts
    commissionController.ts
    courseController.ts
    courseDocumentController.ts
    courseRatingController.ts
    courseVideoController.ts
    degreeController.ts
    enrollmentController.ts
    instructorCommissionController.ts
    instructorController.ts
    lessonController.ts
    notificationController.ts
    paymentHistoryController.ts
    permissionController.ts
    promotionController.ts
    roleController.ts
    searchController.ts
    studentController.ts
    userController.ts
    userRoleController.ts
  models/
    AccessLog.ts
    Advertising.ts
    Category.ts
    Comission.ts
    Course.ts
    CourseDocument.ts
    CourseRating.ts
    CourseVideo.ts
    Degree.ts
    Enrollment.ts
    Instructor.ts
    InstructorCommission.ts
    Lesson.ts
    Notification.ts
    PaymentHistory.ts
    Permission.ts
    Promotion.ts
    Role.ts
    RolePermission.ts
    Student.ts
    User.ts
    UserRole.ts
  routes/
    accessLogRoutes.ts
    advertisingRoutes.ts
    categoryRoutes.ts
    commissionRoutes.ts
    courseDocumentRoutes.ts
    courseRatingRoutes.ts
    courseRoutes.ts
    courseVideoRoutes.ts
    degreeRoutes.ts
    enrollmentRoutes.ts
    instructorCommissionRoutes.ts
    instructorRoute.ts
    lessonRoutes.ts
    notificationRoute.ts
    paymentHistoryRoutes.ts
    permissionRoutes.ts
    promotionRoutes.ts
    roleRoutes.ts
    searchRoutes.ts
    studentRoutes.ts
    userRoleRoutes.ts
    userRoutes.ts
  services/
    accessLogService.ts
    advertisingService.ts
    categoryService.ts
    commissionService.ts
    courseDocumentService.ts
    courseRatingService.ts
    courseService.ts
    courseVideoService.ts
    degreeService.ts
    enrollmentService.ts
    instructorCommissionService.ts
    instructorService.ts
    lessonsServices.ts
    notificationService.ts
    paymentHistoryService.ts
    permissionService.ts
    promotionService.ts
    roleService.ts
    rolPermissionService.ts
    searchServices.ts
    studentService.ts
    userRolesService.ts
    userService.ts
  types/
    express.ts
  utils/
    hashPassword.ts
```

## 📌 Ejecución

```bash
pnpm run dev
```

## 🧩 Principales Funcionalidades

- **Usuarios:** Registro, consulta, actualización y roles.
- **Estudiantes:** Gestión de estudiantes y sus cursos.
- **Instructores:** Registro y comisiones.
- **Cursos:** Creación, consulta, documentos, videos y categorías.
- **Lecciones:** Gestión de lecciones por curso.
- **Roles y Permisos:** Control de acceso y permisos por usuario.
- **Promociones:** Gestión de promociones y descuentos.
- **Pagos:** Historial y gestión de pagos.
- **Publicidad:** Gestión de anuncios.
- **Logs de acceso:** Registro y consulta de accesos.
- **Búsqueda:** Endpoint para buscar contenido en cursos, videos y documentos.

## 🔗 Endpoints Principales

### Roles
- `POST /api/roles/newRole` — Agregar nuevo rol
- `GET /api/roles` — Listar roles
- `GET /api/roles/:id` — Rol por ID

### Usuarios
- `GET /api/users` — Listar usuarios
- `GET /api/users/:id` — Usuario por ID
- `POST /api/users/newUser` — Crear usuario
- `GET /api/users/email/:email` — Usuario por email
- `PATCH /api/users/:id` — Actualizar usuario

### Permisos
- `GET /api/permissions` — Listar permisos
- `GET /api/permissions/:id` — Permiso por ID
- `POST /api/permissions/newPermission` — Crear permiso

### User Roles
- `POST /api/user-roles/newUserRole` — Asignar rol a usuario

### Instructores
- `POST /api/instructors/newInstructor` — Crear instructor
- `GET /api/instructors` — Listar instructores
- `GET /api/instructors/:id` — Instructor por ID

### Comisiones
- `POST /api/comissions/newCommission` — Crear comisión

### Estudiantes
- `POST /api/students/newStudent` — Crear estudiante
- `GET /api/students/user?userId={userId}` — Estudiante por userId
- `GET /api/students` — Listar estudiantes
- `GET /api/students/:id` — Estudiante por ID

### Cursos
- `POST /api/courses/newCourse` — Crear curso
- `GET /api/courses` — Listar cursos
- `GET /api/courses/:id` — Curso por ID

### Grados Académicos
- `GET /api/degrees` — Listar grados
- `GET /api/degrees/:id` — Grado por ID
- `POST /api/degrees/newDegree` — Crear grado

### Categorías y Subcategorías
- `GET /api/categories` — Listar categorías
- `GET /api/categories/:id` — Categoría por ID
- `POST /api/categories` — Crear categoría
- `GET /api/subcategories` — Listar subcategorías
- `GET /api/subcategories/:id` — Subcategoría por ID
- `POST /api/subcategories` — Crear subcategoría

### Promociones
- `GET /api/promotions` — Listar promociones
- `GET /api/promotions/:id` — Promoción por ID
- `POST /api/promotions` — Crear promoción

### Documentos y Videos de Curso
- `GET /api/course-documents` — Listar documentos
- `GET /api/course-documents/:id` — Documento por ID
- `POST /api/course-documents` — Crear documento
- `GET /api/course-videos` — Listar videos
- `GET /api/course-videos/:id` — Video por ID
- `POST /api/course-videos` — Crear video

### Instructor Commissions
- `GET /api/instructor-commissions` — Listar comisiones de instructor
- `GET /api/instructor-commissions/:id` — Comisión por ID
- `POST /api/instructor-commissions` — Crear comisión

### Historial de Pagos
- `GET /api/payment-history` — Listar historial de pagos
- `GET /api/payment-history/:id` — Historial por ID
- `POST /api/payment-history` — Crear historial

### Calificaciones de Curso
- `GET /api/course-ratings` — Listar calificaciones
- `GET /api/course-ratings/rating/:id` — Calificación por ID
- `POST /api/course-ratings` — Crear calificación

### Inscripciones
- `GET /api/enrollments` — Listar inscripciones
- `GET /api/enrollments/:id` — Inscripción por ID
- `POST /api/enrollments` — Crear inscripción
- `GET /api/enrollments/studentCourses` — Cursos de un estudiante

### Logs de Acceso
- `GET /api/access-logs` — Listar logs
- `GET /api/access-logs/:id` — Log por ID
- `POST /api/access-logs/newAccessLog` — Crear log

### Publicidad
- `GET /api/advertising` — Listar publicidades
- `POST /api/advertising` — Crear publicidad

### Búsqueda de Contenido
- `GET /api/search/content` — Buscar en cursos, videos y documentos

---

## 📚 Modelos Principales

- User, Student, Instructor, Course, Lesson, Role, Permission, Enrollment, PaymentHistory, Promotion, Category, Subcategory, CourseDocument, CourseVideo, AccessLog, Advertising, Commission, Degree, Notification, InstructorCommission, CourseRating, UserRole, RolePermission

## 🧑‍💻 Servicios y Utilidades

- Servicios para cada entidad (CRUD y lógica de negocio)
- Utilidades para hashing de contraseñas y configuración de base de datos

---

## 📝 Notas

- Todos los endpoints siguen principios REST.
- La autenticación y autorización se gestionan mediante roles y permisos.
- La base de datos Turso almacena toda la información de la plataforma educativa.

---

¿Tienes dudas sobre algún endpoint o modelo? ¡Revisa la carpeta `/src` para ver la implementación!
