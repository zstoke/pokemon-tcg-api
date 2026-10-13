# Master Setter Catalog API: Python example (requests).
# Run: MS_API_KEY=mst_... python examples/python.py
import os
import requests

BASE = "https://api.master-setter.com/v1"
HEADERS = {"Authorization": f"Bearer {os.environ['MS_API_KEY']}"}


def get(path, **params):
    r = requests.get(BASE + path, params=params, headers=HEADERS, timeout=30)
    r.raise_for_status()
    return r.json()


# newest English sets
for s in get("/sets", lang="en", limit=5)["data"]:
    print(s["id"], s["name"], s["release_date"])

# one card with every printing (printings need a paid key; on a free key "variants" is null with a note)
card = get("/cards", id="en-base1-4")["data"]
print(card["name"], [v["variant_key"] for v in card.get("variants") or []])

# every card in a set, page by page (200 per call)
cards, offset = [], 0
while True:
    page = get("/cards", set="en-base1", limit=200, offset=offset)
    cards += page["data"]
    if not page["pagination"]["has_more"]:
        break
    offset += len(page["data"])
print(f"Base Set: {len(cards)} cards")
