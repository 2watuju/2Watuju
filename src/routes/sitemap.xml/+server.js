// src/routes/sitemap.xml/+server.js
import { getAllProjects } from '$lib/data/projects.js';
import { getAllCategories } from '$lib/data/category-projects.js';

const SITE_URL = 'https://2watuju.com';

const MONTH_MAP = {
  JAN: 0,
  FEB: 1,
  MAR: 2,
  APR: 3,
  MAY: 4,
  JUN: 5,
  JUL: 6,
  AUG: 7,
  SEP: 8,
  OCT: 9,
  NOV: 10,
  DEC: 11
};

const normalizePath = (path) => (path.startsWith('/') ? path : `/${path}`);
const EXCLUDED_PATHS = new Set(['/project-editor']);

const toLastModISO = (year, month) => {
  if (!year) {
    return new Date().toISOString();
  }

  const monthKey = month?.toUpperCase();
  const monthIndex = monthKey in MONTH_MAP ? MONTH_MAP[monthKey] : 0;
  return new Date(Date.UTC(year, monthIndex, 1)).toISOString();
};

const createUrlNode = ({ path, lastmod, changefreq = 'weekly', priority = '0.7' }) => {
  const normalizedPath = normalizePath(path);
  const loc = encodeURI(`${SITE_URL}${normalizedPath}`);

  return `
    <url>
      <loc>${loc}</loc>
      <lastmod>${lastmod}</lastmod>
      <changefreq>${changefreq}</changefreq>
      <priority>${priority}</priority>
    </url>`.trim();
};

export const prerender = true;

export async function GET() {
  const nowIso = new Date().toISOString();
  const projects = getAllProjects();
  const categories = getAllCategories();

  const staticRoutes = [
    { path: '/', priority: '1.0', changefreq: 'weekly', lastmod: nowIso },
    { path: '/about', priority: '0.8', changefreq: 'monthly', lastmod: nowIso },
    { path: '/projects', priority: '0.9', changefreq: 'weekly', lastmod: nowIso }
  ];

  const categoryRoutes = categories.map((category) => ({
    path: `/projects/${category.id}`,
    priority: '0.8',
    changefreq: 'weekly',
    lastmod: nowIso
  }));

  const projectRoutes = projects.map((project) => ({
    path: `/projects/${project.categoryId}/${project.slug}`,
    priority: '0.7',
    changefreq: 'monthly',
    lastmod: toLastModISO(project.year, project.month)
  }));

  const urls = [...staticRoutes, ...categoryRoutes, ...projectRoutes]
    .filter(({ path }) => !EXCLUDED_PATHS.has(normalizePath(path)))
    .map(createUrlNode)
    .join('\n');

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'max-age=0, s-maxage=3600'
    }
  });
}
