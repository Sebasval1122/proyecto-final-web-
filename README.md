# DrivePoint — Frontend (React + TypeScript)

Frontend skeleton para el proyecto DrivePoint: plataforma para compra, venta y alquiler de vehículos.

## Estructura propuesta

- `index.html` — punto de entrada HTML
- `package.json` — scripts y dependencias
- `tsconfig.json` — configuración TypeScript
- `vite.config.ts` — configuración de Vite
- `src/`
  - `main.tsx` — bootstrap React
  - `App.tsx` — enrutamiento y layout principal
  - `pages/`
    - `Home.tsx` — dashboard principal
    - `Login.tsx` — formulario de acceso
    - `Register.tsx` — formulario de registro
    - `Marketplace.tsx` — listado y compra/venta
    - `Rentals.tsx` — interfaz de alquileres
  - `components/`
    - `Header.tsx`, `Footer.tsx`, `CarCard.tsx` — componentes reutilizables
  - `styles/` — estilos globales
  - `types/` — tipos TypeScript (por ejemplo `Car`)

## Cómo arrancar (desarrollo)

Requisitos: `node` >= 18, `npm` o `pnpm`/`yarn`.

Instala dependencias:

```bash
npm install
# o: pnpm install
# o: yarn
```

Arrancar servidor de desarrollo:

```bash
npm run dev
```

Abrir `http://localhost:5173`.

Comandos útiles:

- `npm run dev` — servidor de desarrollo
- `npm run build` — generar bundle de producción
- `npm run preview` — previsualizar build
- `npm run typecheck` — comprobación TypeScript

## Notas de implementación (front)

- Usamos Vite + React + TypeScript para velocidad y DX.
- Recomendado: organizar estado con React Query o Zustand según necesidad.
- Autenticación: planear endpoints `/api/auth` y flujo JWT/OAuth.
- Geo/Mapa: integrar Mapbox o Leaflet para el mapa interactivo.
- Pagos: Stripe o proveedor local según país.

## Siguientes pasos sugeridos

1. Añadir CI (lint + typecheck + build) y archivo `.editorconfig`.
2. Implementar layout responsive y tema (dark/light).
3. Definir API contract (OpenAPI) para backend.
4. Añadir pruebas unitarias (Vitest) y E2E (Playwright).

---
Si quieres, puedo:

- Añadir autenticación básica (mock) en el frontend.
- Crear componentes UI con Tailwind o Material UI.
- Generar OpenAPI básico para el backend.

Indícame qué prefieres que haga a continuación.# proyecto-final-web-