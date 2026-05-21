import type { MetadataRoute } from 'next'

const BASE_URL = 'https://saudadeefado.pt'

const routes = ['', '/elenco', '/galeria', '/historia', '/eventos', '/reserva']

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return routes.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified,
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : 0.7,
  }))
}
