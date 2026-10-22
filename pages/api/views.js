// Total page-view counter backed by Abacus (free hosted counter, no account needed).
// POST increments and returns the new total; GET just reads it.
// Outside production we only read, so local dev doesn't inflate the count.
const COUNTER = 'https://abacus.jasoncameron.dev';
const NAMESPACE = 'rahulbaweja7-portfolio';
const KEY = 'views';

export default async function handler(req, res) {
  const shouldHit = req.method === 'POST' && process.env.NODE_ENV === 'production';
  const url = `${COUNTER}/${shouldHit ? 'hit' : 'get'}/${NAMESPACE}/${KEY}`;

  try {
    const r = await fetch(url, { cache: 'no-store' });
    // A key that has never been hit yet reads as 404 — treat it as zero views
    if (r.status === 404) return res.status(200).json({ views: 0 });
    if (!r.ok) throw new Error(`counter responded ${r.status}`);
    const { value } = await r.json();
    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).json({ views: value });
  } catch (err) {
    return res.status(502).json({ error: 'counter unavailable' });
  }
}
