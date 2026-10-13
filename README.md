# Pokémon TCG API in 14 languages: Master Setter Catalog API

**Pokémon Trading Card Game card data as JSON, in every language the cards are printed in.**
199,314 cards · 276,657 printings · 1,821 sets · 14 languages, including the deepest **Korean, Thai, Indonesian, Traditional Chinese and Simplified Chinese** catalogs available through any API.

- Docs and free key: **https://api.master-setter.com**
- OpenAPI 3.1 spec: https://api.master-setter.com/openapi.json
- For AI assistants: https://api.master-setter.com/llms.txt
- Remote MCP server (Claude Code, Cursor, any MCP client): `https://api.master-setter.com/mcp`

## Why this API

Most Pokémon card APIs cover English, sometimes Japanese, and model each *card*. This one models each **printing**: one card in one language, finish and set (1st Edition vs Unlimited, holo vs reverse holo, stamped promos). That's the object a scanner identifies, a store lists and a collector owns.

| Language | Code | Cards | Sets |
|---|---|---:|---:|
| Japanese | `ja` | 22,164 | 239 |
| English | `en` | 21,795 | 216 |
| French | `fr` | 19,942 | 178 |
| Italian | `it` | 19,745 | 174 |
| German | `de` | 19,285 | 135 |
| Korean | `ko` | 16,778 | 234 |
| Spanish | `es` | 16,697 | 136 |
| Portuguese | `pt` | 15,701 | 105 |
| Traditional Chinese | `zh-tw` | 13,127 | 134 |
| Indonesian | `id` | 11,937 | 94 |
| Thai | `th` | 11,853 | 95 |
| Simplified Chinese | `zh-cn` | 6,946 | 55 |
| Latin American Spanish | `es-mx` | 1,758 | 10 |
| Russian | `ru` | 1,104 | 11 |

Per-language pages: [Japanese](https://api.master-setter.com/pokemon-card-api/japanese) · [Korean](https://api.master-setter.com/pokemon-card-api/korean) · [Traditional Chinese](https://api.master-setter.com/pokemon-card-api/traditional-chinese) · [Simplified Chinese](https://api.master-setter.com/pokemon-card-api/simplified-chinese) · [Thai](https://api.master-setter.com/pokemon-card-api/thai) · [Indonesian](https://api.master-setter.com/pokemon-card-api/indonesian) · [all languages](https://api.master-setter.com/pokemon-card-api)

## Quickstart

```bash
# 1. Get a free key (English cards, 250 requests/month, personal use). Returned immediately.
curl -X POST https://api.master-setter.com/v1/keys \
  -H "Content-Type: application/json" \
  -d '{"email":"you@example.com","personal_use":true}'

# 2. Call it
curl -H "Authorization: Bearer $KEY" \
  "https://api.master-setter.com/v1/sets?lang=en&limit=5"

curl -H "Authorization: Bearer $KEY" \
  "https://api.master-setter.com/v1/cards?id=en-base1-4"
```

Response:

```json
{
  "data": {
    "id": "en-base1-4",
    "name": "Charizard",
    "number": "4",
    "rarity": "Rare Holo",
    "hp": 120,
    "artist": "Mitsuhiro Arita",
    "variants": [
      { "variant_key": "1stEditionHolofoil" },
      { "variant_key": "shadowlessHolofoil" },
      { "variant_key": "unlimitedHolofoil" }
    ]
  },
  "retrieved_at": "2026-10-12T00:00:00.000Z"
}
```

More examples: [JavaScript](examples/javascript.mjs) · [Python](examples/python.py)

## Endpoints

| Method | Path | What it returns |
|---|---|---|
| `POST` | `/v1/keys` | A free key, immediately |
| `GET` | `/v1/sets?lang=ko` | Sets for a language, newest first, paginated |
| `GET` | `/v1/sets?id=ko-sv4a` | One set, with `card_count` computed from cards actually present |
| `GET` | `/v1/cards?id=en-base1-4` | One card with all of its printings |
| `GET` | `/v1/cards?set=ja-sv4a&include=variants` | A whole set by number, printings inline (paid) |
| `GET` | `/v1/cards?q=리자몽&lang=ko` | Name search, in each card's own language |
| `POST` | `/v1/billing` | Upgrade the same key, or open the billing portal |

IDs are `<lang>-<set code>` for sets (`en-base1`, `ko-sv4a`) and `<set id>-<number>` for cards.

## Use it from AI agents (MCP)

```bash
# Claude Code
claude mcp add --transport http master-setter https://api.master-setter.com/mcp \
  --header "Authorization: Bearer $KEY"
```

```json
// Cursor: ~/.cursor/mcp.json
{ "mcpServers": { "master-setter": {
    "url": "https://api.master-setter.com/mcp",
    "headers": { "Authorization": "Bearer YOUR_KEY" } } } }
```

Tools: `search_cards`, `get_card`, `list_cards_in_set`, `list_sets`, `get_set`, `get_api_key`. Also listed in the official MCP registry as `com.master-setter/pokemon-tcg`.

## Plans

| Plan | Requests / month | Includes | Use | Price |
|---|---:|---|---|---:|
| Free | 250 | English cards & sets | Personal | $0 |
| Indie | 50,000 | All 14 languages + every printing | Commercial OK | $29/mo |
| Studio | 500,000 | Indie + card images | Commercial OK | $99/mo |
| Bulk | custom | Everything | Commercial OK | [email](mailto:support@master-setter.com) |

Upgrading keeps the same key. Terms: https://api.master-setter.com/terms

## Compared with other Pokémon APIs

An honest side-by-side with TCGdex, JustTCG, Scrydex and PokemonPriceTracker: https://api.master-setter.com/compare

---

The examples in this repository are MIT licensed. The API and its data are provided under the [API terms](https://api.master-setter.com/terms). Master Setter is not affiliated with, endorsed or sponsored by The Pokémon Company, Nintendo, Creatures or GAME FREAK. Pokémon and all related names are trademarks of their owners. Card data includes content from TCGdex (MIT License).
