export default function handler(req, res) {
  const { url } = req.query;
  // Only allow local paths — prevents open redirect abuse
  if (url && url.startsWith('/') && !url.startsWith('//')) {
    return res.redirect(302, url);
  }
  return res.status(400).end();
}
