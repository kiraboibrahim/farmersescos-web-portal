export default function parseJwt(jwt) {
  try {
    const [header, payload, signature] = jwt.split(".");
    if (!header || !payload || !signature)
      throw new Error("invalid jwt format");

    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padding = "===".slice(0, (4 - (base64.length % 4)) % 4);
    const decoded = atob(base64 + padding);
    const parsed = JSON.parse(decoded);

    return parsed;
  } catch (error) {
    throw new Error(`${error.message}`);
  }
}
