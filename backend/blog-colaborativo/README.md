# 📝 Microservicio: Blog Colaborativo

Este microservicio permite a las usuarias crear artículos sobre activismo climático y a las administradoras revisarlos y aprobarlos antes de su publicación.

## 🚀 Instalación y ejecución

1. Clona el repositorio o descomprime el ZIP
2. Crea un archivo `.env` a partir de `.env.example`
3. Instala las dependencias:

```bash
npm install
```

4. Inicia el servidor:

```bash
npm run dev
```

> El proyecto corre por defecto en `http://localhost:3000/api/v1`

---

## 🔐 Seguridad

- Autenticación mediante **JWT (Supabase)**
- Roles: "user" y "admin" definidos en `app_metadata.role`
- Middleware de autorización `requireAdmin` incluido

---

## 📘 Documentación de la API

La especificación OpenAPI se encuentra en:

```
docs/openapi.yaml
```

Puedes abrirla en [Swagger Editor](https://editor.swagger.io/) para explorar los endpoints.

Endpoints principales:
- `POST /articles` → Crea un nuevo artículo (requiere autenticación)
- `GET /articles` → Lista artículos (público, con filtro opcional por estado)
- `PATCH /articles/:id/approve` → Aprueba o rechaza un artículo (solo admin)

---

## 🧪 Validación de calidad (Requisitos de Revisión)

### Scripts disponibles

```bash
npm run lint         # Revisión con ESLint
npm run lint:api     # Revisión del archivo openapi.yaml con Spectral
```

### Herramientas aplicadas

| Herramienta       | Propósito                                      |
|-------------------|-----------------------------------------------|
| ESLint            | Detección de code smells, errores de estilo y duplicación |
| Express-validator | Validación de datos de entrada en peticiones  |
| JWT (jsonwebtoken)| Autenticación de usuarias y validación de roles |
| Spectral          | Validación de la especificación OpenAPI (RESTful, seguridad, estructura) |

---

### 🧩 Mapeo de herramientas vs. malas prácticas detectadas

| Mala práctica detectada                  | Herramienta aplicada  | Diagnóstico                                 | Corrección aplicada                                      |
|------------------------------------------|------------------------|----------------------------------------------|-----------------------------------------------------------|
| Falta de validación en campos `POST`     | express-validator      | Se permitía crear artículos vacíos           | Se agregaron reglas mínimas en `title` y `content`       |
| Acceso sin autenticación a `POST`        | Middleware personalizado | Cualquier usuario podía crear artículos     | Se agregó middleware `authenticate` para proteger rutas  |
| Envío manual de `author_id`              | Revisión técnica manual| Riesgo de suplantación                       | Se extrae del token JWT                                  |
| Acceso indebido a aprobación de artículos| Middleware personalizado | Usuarios sin rol podían aprobar             | Se implementó `requireAdmin` y lectura desde `app_metadata.role` |
| Documentación incompleta de endpoints    | Spectral               | Faltaban descripciones y `operationId`       | Se completó `openapi.yaml` con descripciones y tags      |
| Tags sin definir en OpenAPI              | Spectral               | `operation-tag-defined` en cada endpoint     | Se agregó sección `tags:` global con `Artículos`         |
| Falta de definición de seguridad (JWT)   | Spectral               | No se indicaba esquema de seguridad          | Se agregó `securitySchemes > bearerAuth`                 |

---

### 📊 Verificación de malas prácticas en APIs (especificación oficial)

| Nº  | Mala práctica detectada                   | ¿Cumplido? | Herramienta / Técnica             | Detalles |
|-----|--------------------------------------------|------------|----------------------------------|----------|
| 1️⃣  | Uso de verbos en las rutas                | ✅ Sí      | Spectral (regla personalizada)   | Rutas limpias: `/articles`, no se usa `/createArticle`, etc. |
| 2️⃣  | Sobrecarga de endpoints                   | ✅ Sí      | Revisión manual                  | Cada acción tiene su propia ruta (`POST`, `PATCH`, etc.) |
| 3️⃣  | Ignorar códigos de estado HTTP            | ✅ Sí      | Spectral + revisión manual       | Se usan 201, 400, 401, 403, 404, 422 correctamente |
| 4️⃣  | Inconsistencias en el diseño              | ✅ Sí      | Spectral                         | Tags, paths y responses consistentes |
| 5️⃣  | Falta de versionado                       | ✅ Sí      | Spectral                         | Todas las rutas están bajo `/api/v1/...` |
| 6️⃣  | Seguridad por oscuridad                   | ✅ Sí      | Middleware + Spectral            | Autenticación con JWT y control de roles |
| 7️⃣  | Datos expuestos innecesariamente          | ✅ Sí      | Revisión manual                  | Solo se expone `title`, `content`, `status`, `author_id` |
| 8️⃣  | Falta de Rate Limiting                    | ⚠️ No aplicado | No requerido en este proyecto    | No se simulan ataques, fuera de alcance actual |
| 9️⃣  | Documentación insuficiente o desactualizada| ✅ Sí     | Spectral                         | `openapi.yaml` completo, con tags, summaries, descriptions |
| 🔟  | No manejar errores adecuadamente           | ✅ Sí      | Middleware Express + Spectral    | Manejo centralizado de errores HTTP |
| 1️⃣1️⃣ | Falta de paginación en respuestas grandes| ⚠️ No aplicado | No requerido actualmente         | `GET /articles` sin paginación (opcional para v2) |
| 1️⃣2️⃣ | No aplicar control de concurrencia        | ⚠️ No requerido | No evaluado en esta versión       | No relevante en esta fase, se puede testear en producción |

---

### 📌 Estado final del `openapi.yaml`

- Todas las rutas documentadas
- Sin errores Spectral (✔ `No results with a severity of 'error' found!`)
- Estructura RESTful respetada
- Seguridad con JWT especificada

---

### 🧠 Conclusión

Este microservicio fue desarrollado con enfoque en calidad técnica, seguridad, modularidad y cumplimiento estricto de los requisitos funcionales y técnicos. Se aplicaron herramientas de revisión durante el desarrollo y se validó la estructura final con Spectral.

---

## 📁 Estructura del proyecto

```
blog-colaborativo/
├── docs/
│   └── openapi.yaml
├── node_modules/
├── src/
│   ├── controllers/
│   │   └── article.controller.js
│   ├── lib/
│   │   └── supabaseClient.js
│   ├── middlewares/
│   │   ├── authMiddleware.js
│   │   ├── errorHandler.js
│   │   └── validationResultHandler.js
│   ├── routes/
│   │   └── article.routes.js
│   ├── validators/
│   │   └── article.validator.js
│   ├── app.js
│   └── testConnection.js
├── .env.
├── .spectral.yaml
├── eslint.config.mjs
├── package.json
├── package-lock.json
└── README.md (este archivo)
```
