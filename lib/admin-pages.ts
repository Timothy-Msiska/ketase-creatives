export interface PageData {
  id: string;
  title: string;
  slug: string;
  status: 'draft' | 'review' | 'approved' | 'published';
  content: string;
  lastModified: string;
  modifiedBy: string;
  version: number;
}

const STORAGE_KEY = 'ketase_pages_data';

const defaultPages: PageData[] = [
  {
    id: '1',
    title: 'Home Page',
    slug: 'home',
    status: 'published',
    content: 'Home page content',
    lastModified: new Date().toISOString(),
    modifiedBy: 'Admin User',
    version: 1,
  },
  {
    id: '2',
    title: 'About Page',
    slug: 'about',
    status: 'published',
    content: 'About page content',
    lastModified: new Date().toISOString(),
    modifiedBy: 'Admin User',
    version: 1,
  },
];

export function getPagesData(): PageData[] {
  if (typeof window === 'undefined') return defaultPages;
  
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : defaultPages;
  } catch {
    console.error('[v0] Failed to parse pages data');
    return defaultPages;
  }
}

export function savePagesData(pages: PageData[]): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pages));
  } catch {
    console.error('[v0] Failed to save pages data');
  }
}

export function getPageById(id: string): PageData | undefined {
  return getPagesData().find((p) => p.id === id);
}

export function updatePage(id: string, updates: Partial<PageData>, modifiedBy: string): PageData {
  const pages = getPagesData();
  const pageIndex = pages.findIndex((p) => p.id === id);
  
  if (pageIndex === -1) throw new Error('Page not found');
  
  const updatedPage: PageData = {
    ...pages[pageIndex],
    ...updates,
    lastModified: new Date().toISOString(),
    modifiedBy,
    version: pages[pageIndex].version + 1,
  };
  
  pages[pageIndex] = updatedPage;
  savePagesData(pages);
  
  return updatedPage;
}

export function createPage(data: Omit<PageData, 'id' | 'lastModified' | 'version'>, modifiedBy: string): PageData {
  const pages = getPagesData();
  const newPage: PageData = {
    ...data,
    id: Date.now().toString(),
    lastModified: new Date().toISOString(),
    modifiedBy,
    version: 1,
  };
  
  pages.push(newPage);
  savePagesData(pages);
  
  return newPage;
}
