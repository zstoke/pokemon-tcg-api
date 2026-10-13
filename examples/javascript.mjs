// Master Setter Catalog API: JavaScript example (Node 18+, no dependencies).
// Run: MS_API_KEY=mst_... node examples/javascript.mjs
const BASE = "https://api.master-setter.com/v1";
const headers = { Authorization: `Bearer ${process.env.MS_API_KEY}` };

async function get(path) {
  const r = await fetch(BASE + path, { headers });
  if (!r.ok) throw new Error(`${r.status}: ${(await r.json()).error}`);
  return r.json();
}

// newest English sets
const sets = await get("/sets?lang=en&limit=5");
for (const s of sets.data) console.log(s.id, s.name, s.release_date);

// one card with every printing (printings need a paid key; on a free key "variants" is null with a note)
const { data: card } = await get("/cards?id=en-base1-4");
console.log(card.name, card.variants?.map((v) => v.variant_key));

// every card in a set, page by page (200 per call)
let offset = 0, all = [];
while (true) {
  const page = await get(`/cards?set=en-base1&limit=200&offset=${offset}`);
  all = all.concat(page.data);
  if (!page.pagination.has_more) break;
  offset += page.data.length;
}
console.log(`Base Set: ${all.length} cards`);
