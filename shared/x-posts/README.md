# X posting queue

Archie queues Leo-approved X posts here; the Claude "X Poster" task on Leo's PC
posts them through Leo's signed-in Chrome and files the results.

- Queue items: `YYYY-MM-DD-<slug>.json` in this folder
  (`id`, `text`, `media`, `not_before`, `status`).
- Media files: `media/` (created by the first queued post that carries media).
- Results: `results/<id>.json` — one per attempted item. An item with a
  result file is done and is never posted again.

Full instructions live in the Claude task document
("X Poster — HamRadioBargains queue"). Nothing is posted from this folder
without Leo's prior approval of the exact text and media.
