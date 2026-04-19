# Quiniela FIFA 2026 — Guía de despliegue

Plataforma web completa para quiniela mundialista. Funciona en modo local (sin backend) o conectada a Supabase para datos reales multi-usuario.

---

## Archivos incluidos

| Archivo | Descripción |
|---|---|
| `index.html` | La aplicación completa (UI + lógica) |
| `app.js` | Lógica JavaScript (Supabase + localStorage) |
| `supabase_schema.sql` | Tablas y políticas de seguridad para Supabase |

---

## Opción A — Solo abrir en el navegador (demo local)

Sin configurar nada, la app funciona en modo local:
- Los registros se guardan en `localStorage` del navegador
- Perfecta para demos y pruebas
- Cada persona solo ve sus propios datos

**Pasos:**
1. Descarga los 3 archivos en una carpeta
2. Abre `index.html` en el navegador
3. Listo — puedes registrarte y llenar la quiniela

---

## Opción B — Despliegue completo con Supabase + Vercel ($0/mes)

### Paso 1: Crear proyecto en Supabase

1. Ve a [supabase.com](https://supabase.com) → **New project**
2. Elige un nombre (ej: `quiniela2026`) y una contraseña para la base de datos
3. Selecciona región: **South America (São Paulo)** — la más cercana a Panamá
4. Espera ~2 minutos a que termine de configurarse

### Paso 2: Crear las tablas

1. En Supabase, ve al menú **SQL Editor**
2. Copia todo el contenido de `supabase_schema.sql`
3. Pégalo en el editor y haz clic en **Run**
4. Deberías ver las tablas: `participantes`, `quinielas`, `clasificados`, `resultados_reales`

### Paso 3: Obtener las credenciales

1. Ve a **Project Settings → API**
2. Copia:
   - **Project URL** → ejemplo: `https://abcdefgh.supabase.co`
   - **anon (public) key** → la clave larga que empieza con `eyJ...`

### Paso 4: Desplegar en Vercel

1. Ve a [vercel.com](https://vercel.com) y crea una cuenta gratuita
2. Haz clic en **Add New → Project**
3. Selecciona **Deploy from a folder** o sube los archivos
4. Vercel te dará una URL tipo `https://quiniela2026.vercel.app`

> **Alternativa más fácil:** Usa [netlify.com](https://netlify.com) → arrastra la carpeta directamente al dashboard. URL lista en 30 segundos.

### Paso 5: Conectar Supabase desde la app

1. Abre tu URL de Vercel/Netlify
2. Ve a la sección **Registro**
3. En el cuadro amarillo de configuración, pega tu **Project URL** y tu **anon key**
4. Haz clic en **Conectar**
5. El indicador debe mostrar "Conectado a Supabase" en verde

---

## Personalización

En la sección **Admin** de la app puedes cambiar:
- **Nombre de la empresa** — aparece en el header y el banner
- **Color principal** — cambia toda la paleta de colores (en formato hex, ej: `#1a472a`)

Para personalización más avanzada, edita en `index.html`:
- `Mi Empresa` en la línea del header → cambia al nombre real
- Los colores en `:root` al inicio del `<style>`

---

## Sistema de puntos

| Predicción | Puntos |
|---|---|
| Resultado correcto (L/E/V) | 3 puntos |
| Clasificado correcto | 2 puntos |
| Campeón correcto | 10 puntos |

Los puntos se calculan automáticamente con el trigger de Supabase cada vez que el administrador ingresa un resultado real en la tabla `resultados_reales`.

---

## Ingresar resultados reales (admin)

Desde el SQL Editor de Supabase:

```sql
-- Ejemplo: partido 0 (México vs EEUU), ganó México (Local)
INSERT INTO resultados_reales (partido_idx, resultado)
VALUES (0, 'L')
ON CONFLICT (partido_idx) DO UPDATE SET resultado = 'L';

-- Partido 6 (España vs Francia), empate
INSERT INTO resultados_reales (partido_idx, resultado)
VALUES (6, 'E')
ON CONFLICT (partido_idx) DO UPDATE SET resultado = 'E');
```

Los puntos se recalculan automáticamente para todos los participantes.

---

## Índice de partidos

| Idx | Partido | Grupo |
|---|---|---|
| 0 | México vs EEUU | A |
| 1 | Canadá vs Polonia | A |
| 2 | Argentina vs Chile | B |
| 3 | Bolivia vs Perú | B |
| 4 | Brasil vs Colombia | C |
| 5 | Uruguay vs Paraguay | C |
| 6 | España vs Francia | D |
| 7 | Portugal vs Alemania | D |
| 8 | Inglaterra vs Países Bajos | E |
| 9 | Bélgica vs Croacia | E |
| 10 | Japón vs Arabia Saudita | F |
| 11 | Irán vs Australia | F |

---

## Soporte

Desarrollado por Efraín Gómez / Tecology Panama
