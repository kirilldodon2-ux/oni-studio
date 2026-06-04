export async function checkRateLimit(
  kv: KVNamespace | undefined,
  ip: string,
  max: number,
  windowSec: number
): Promise<boolean> {
  if (!kv) return true;

  const key = `rl:${ip}`;
  const raw = await kv.get(key);
  const count = raw ? Number.parseInt(raw, 10) : 0;

  if (count >= max) return false;

  await kv.put(key, String(count + 1), { expirationTtl: windowSec });
  return true;
}
