// Edge Function: football-proxy
// Proxy de football-data.org para NO exponer la API key en el frontend.
// La key vive como secreto del servidor (FOOTBALL_API_KEY), nunca en el cliente.
//
// Desplegar:
//   supabase functions deploy football-proxy --project-ref <TU_PROJECT_REF>
//   supabase secrets set FOOTBALL_API_KEY=<TU_KEY_NUEVA> --project-ref <TU_PROJECT_REF>
//
// (Rota la key vieja en football-data.org: la anterior quedó en el historial de git.)

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const API = "https://api.football-data.org/v4";
const COMP = 2000; // ID del Mundial FIFA 2026 en football-data.org

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), { status, headers: { ...cors, "Content-Type": "application/json" } });

  try {
    const key = Deno.env.get("FOOTBALL_API_KEY");
    if (!key) return json({ error: "FOOTBALL_API_KEY no configurada en el servidor" }, 500);

    const res = await fetch(`${API}/competitions/${COMP}/matches?status=FINISHED`, {
      headers: { "X-Auth-Token": key },
    });
    const data = await res.json();
    return json(data, res.status);
  } catch (e) {
    return json({ error: String(e) }, 500);
  }
});
