# 📚 Microservicio: Biblioteca de Recursos

Este microservicio permite a las usuarias acceder a recursos educativos sobre activismo climático y a las administradoras subir, editar y eliminar dichos recursos.

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

> El proyecto corre por defecto en `http://localhost:3002/api/v1`

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

Puedes visualizarla navegando a:

📄 [`http://localhost:3002/docs`](http://localhost:3002/docs)

Endpoints principales:
- `GET /recursos` → Lista todos los recursos
- `POST /recursos` → Crea un nuevo recurso (solo admin)
- `PUT /recursos/:id` → Actualiza un recurso (solo admin)
- `DELETE /recursos/:id` → Elimina un recurso (solo admin)

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
| Falta de validación en campos `POST`     | express-validator      | Se permitía crear recursos vacíos            | Se agregaron reglas mínimas en `titulo`, `url_archivo`    |
| Acceso sin autenticación a `POST`        | Middleware personalizado | Cualquier usuario podía crear recursos      | Se agregó middleware `authenticate` para proteger rutas  |
| Acceso indebido a modificación/eliminación| Middleware personalizado | Usuarios sin rol podían modificar recursos | Se implementó `requireAdmin` y lectura desde `app_metadata.role` |
| Documentación incompleta de endpoints    | Spectral               | Faltaban descripciones y `operationId`       | Se completó `openapi.yaml` con descripciones y tags      |
| Tags sin definir en OpenAPI              | Spectral               | `operation-tag-defined` en cada endpoint     | Se agregó sección `tags:` global con `Recursos`          |
| Falta de definición de seguridad (JWT)   | Spectral               | No se indicaba esquema de seguridad          | Se agregó `securitySchemes > bearerAuth`                 |

---

### 📊 Verificación de malas prácticas en APIs (especificación oficial)

| Nº  | Mala práctica detectada                   | ¿Cumplido? | Herramienta / Técnica             | Detalles |
|-----|--------------------------------------------|------------|----------------------------------|----------|
| 1️⃣  | Uso de verbos en las rutas                | ✅ Sí      | Spectral (regla personalizada)   | Rutas limpias: `/recursos`, no se usa `/crearRecurso`     |
| 2️⃣  | Sobrecarga de endpoints                   | ✅ Sí      | Revisión manual                  | Cada acción tiene su propia ruta (`POST`, `PUT`, `DELETE`) |
| 3️⃣  | Ignorar códigos de estado HTTP            | ✅ Sí      | Spectral + revisión manual       | Se usan 201, 400, 401, 403, 404, 422 correctamente         |
| 4️⃣  | Inconsistencias en el diseño              | ✅ Sí      | Spectral                         | Tags, paths y responses consistentes                       |
| 5️⃣  | Falta de versionado                       | ✅ Sí      | Spectral                         | Todas las rutas están bajo `/api/v1/...`                  |
| 6️⃣  | Seguridad por oscuridad                   | ✅ Sí      | Middleware + Spectral            | Autenticación con JWT y control de roles                  |
| 7️⃣  | Datos expuestos innecesariamente          | ✅ Sí      | Revisión manual                  | Solo se expone `titulo`, `descripcion`, `categoria`, etc. |
| 8️⃣  | Falta de Rate Limiting                    | ⚠️ No aplicado | No requerido en este proyecto    | Fuera de alcance actual                                   |
| 9️⃣  | Documentación insuficiente o desactualizada| ✅ Sí     | Spectral                         | `openapi.yaml` completo, con tags, summaries, descriptions |
| 🔟  | No manejar errores adecuadamente           | ✅ Sí      | Middleware Express + Spectral    | Manejo centralizado de errores HTTP                      |
| 1️⃣1️⃣ | Falta de paginación en respuestas grandes| ✅ Sí      | Query params + Supabase          | Soportado en `GET /recursos`                             |
| 1️⃣2️⃣ | No aplicar control de concurrencia        | ⚠️ No requerido | No evaluado en esta versión       | No relevante en esta fase                                |

---

### 📌 Estado final del `openapi.yaml`

- Todas las rutas documentadas
- Sin errores Spectral (✔ `No results with a severity of 'error' found!`)
- Estructura RESTful respetada
- Seguridad con JWT especificada

---

## 📁 Estructura del proyecto

```
biblioteca-recursos/
├── docs/
│   └── openapi.yaml
├── src/
│   ├── controllers/
│   │   └── recursoController.js
│   ├── lib/
│   │   └── supabaseClient.js
│   ├── middlewares/
│   │   ├── authMiddleware.js
│   │   ├── errorHandler.js
│   │   └── validationResultHandler.js
│   ├── routes/
│   │   └── recursos.js
│   ├── validators/
│   │   ├── recursoValidator.js
│   └── index.js
├── .env ✅ Incluye SUPABASE_URL, SUPABASE_KEY, PORT
├── .spectral.yaml
├── eslint.config.mjs
├── package.json
├── BibliotecaRecursos.postman_collection.json
└── README.md
```
