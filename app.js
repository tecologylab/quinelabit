-- =============================================
-- QUINIELA FIFA 2026 — Schema de Supabase
-- Ejecuta esto en el SQL Editor de Supabase
-- =============================================

-- 1. TABLA: participantes
CREATE TABLE IF NOT EXISTS participantes (
  id         BIGSERIAL PRIMARY KEY,
  nombre     TEXT NOT NULL,
  email      TEXT NOT NULL UNIQUE,
  tel        TEXT,
  cliente    TEXT,
  favorito   TEXT,
  fecha      TIMESTAMPTZ DEFAULT NOW()
);

-- 2. TABLA: quinielas (predicciones de partidos + campeón)
CREATE TABLE IF NOT EXISTS quinielas (
  id                BIGSERIAL PRIMARY KEY,
  participante_id   BIGINT REFERENCES participantes(id) ON DELETE CASCADE,
  predicciones      JSONB,   -- {"0":"L","1":"E","2":"V",...}
  campeon           TEXT,
  puntos            INTEGER DEFAULT 0,
  fecha             TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(participante_id)
);

-- 3. TABLA: clasificados (predicciones de clasificados por grupo)
CREATE TABLE IF NOT EXISTS clasificados (
  id                BIGSERIAL PRIMARY KEY,
  participante_id   BIGINT REFERENCES participantes(id) ON DELETE CASCADE,
  clasificados      JSONB,   -- {"A":["México","EEUU"],"B":[...],...}
  puntos            INTEGER DEFAULT 0,
  fecha             TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(participante_id)
);

-- 4. TABLA: resultados_reales (admin los llena al terminar cada partido)
CREATE TABLE IF NOT EXISTS resultados_reales (
  id          BIGSERIAL PRIMARY KEY,
  partido_idx INTEGER NOT NULL UNIQUE,  -- 0-11 según el array de PARTIDOS
  resultado   TEXT NOT NULL CHECK (resultado IN ('L','E','V')),
  fecha       TIMESTAMPTZ DEFAULT NOW()
);

-- 5. VISTA: ranking (join de participantes + quinielas + clasificados)
CREATE OR REPLACE VIEW ranking_view AS
SELECT
  p.id,
  p.nombre,
  COALESCE(q.campeon, '—')           AS campeon,
  COALESCE(q.puntos, 0) + COALESCE(c.puntos, 0) AS pts
FROM participantes p
LEFT JOIN quinielas    q ON q.participante_id = p.id
LEFT JOIN clasificados c ON c.participante_id = p.id
ORDER BY pts DESC;

-- =============================================
-- POLÍTICAS DE SEGURIDAD (Row Level Security)
-- =============================================

-- Habilitar RLS en todas las tablas
ALTER TABLE participantes  ENABLE ROW LEVEL SECURITY;
ALTER TABLE quinielas      ENABLE ROW LEVEL SECURITY;
ALTER TABLE clasificados   ENABLE ROW LEVEL SECURITY;
ALTER TABLE resultados_reales ENABLE ROW LEVEL SECURITY;

-- Permitir INSERT público (cualquiera puede registrarse)
CREATE POLICY "registro_publico" ON participantes
  FOR INSERT WITH CHECK (true);

-- Permitir lectura pública del ranking
CREATE POLICY "lectura_publica_participantes" ON participantes
  FOR SELECT USING (true);

-- Quinielas: INSERT y UPDATE solo si el participante_id coincide
CREATE POLICY "quiniela_insert" ON quinielas
  FOR INSERT WITH CHECK (true);

CREATE POLICY "quiniela_select" ON quinielas
  FOR SELECT USING (true);

CREATE POLICY "quiniela_update" ON quinielas
  FOR UPDATE USING (true);

-- Clasificados: igual
CREATE POLICY "clasif_insert" ON clasificados
  FOR INSERT WITH CHECK (true);

CREATE POLICY "clasif_select" ON clasificados
  FOR SELECT USING (true);

CREATE POLICY "clasif_update" ON clasificados
  FOR UPDATE USING (true);

-- Resultados: solo lectura pública (admin los ingresa desde el dashboard)
CREATE POLICY "resultados_select" ON resultados_reales
  FOR SELECT USING (true);

-- =============================================
-- FUNCIÓN: calcular puntos automáticamente
-- Se llama al insertar/actualizar resultados_reales
-- =============================================
CREATE OR REPLACE FUNCTION recalcular_puntos()
RETURNS TRIGGER AS $$
BEGIN
  -- Recalcular puntos de quinielas
  UPDATE quinielas q
  SET puntos = (
    SELECT COUNT(*)
    FROM resultados_reales r
    WHERE (q.predicciones->>r.partido_idx::text) = r.resultado
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER after_resultado
  AFTER INSERT OR UPDATE ON resultados_reales
  FOR EACH ROW EXECUTE FUNCTION recalcular_puntos();

-- =============================================
-- DATOS DE EJEMPLO (opcional, para probar)
-- =============================================
-- INSERT INTO participantes (nombre, email, cliente, favorito)
-- VALUES
--   ('Carlos Rodríguez', 'carlos@test.com', 'CLI-001', 'Brasil'),
--   ('María González',   'maria@test.com',  'CLI-002', 'Argentina'),
--   ('Andrés Morales',   'andres@test.com', 'CLI-003', 'Francia');
