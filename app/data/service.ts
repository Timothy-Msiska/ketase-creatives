export type PortfolioDetail = {
  title: string;
  content: string;
};

export type PortfolioItem = {
  id: number;
  title: string;
  client: string;
  year: number;
  category: string;
  image: string;
  slug: string;
  details: PortfolioDetail[];
};

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 1,
    title: 'Kayelekera Resort Brand Identity',
    client: 'Kayelekera Resort',
    year: 2024,
    category: 'Branding',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
    slug: 'kayelekera-resort-brand-identity',
    details: [
      { title: 'Overview', content: 'Developed a luxury brand identity for Kayelekera Resort, highlighting Malawian heritage and elegance.' },
      { title: 'Process', content: 'Research → Moodboard → Logo Design → Branding Guidelines → Final Presentation.' },
      { title: 'Outcome', content: 'A unique visual identity that positions the resort as a premium destination in Malawi.' },
    ],
  },
  {
    id: 2,
    title: 'Digital Platform Redesign',
    client: 'TechNova Ltd.',
    year: 2024,
    category: 'Digital',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop',
    slug: 'digital-platform-redesign',
    details: [
      { title: 'Overview', content: 'Redesigned TechNova’s digital platform to enhance usability and increase conversions.' },
      { title: 'Process', content: 'User Research → Wireframes → UI Design → Prototyping → Development Handoff.' },
      { title: 'Outcome', content: 'Improved UX, faster onboarding, and higher engagement metrics.' },
    ],
  },
  {
    id: 3,
    title: 'Marketing Campaign',
    client: 'GreenFoods',
    year: 2023,
    category: 'Campaign',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
    slug: 'marketing-campaign',
    details: [
      { title: 'Overview', content: 'Executed a full marketing campaign to increase brand awareness and customer engagement.' },
      { title: 'Process', content: 'Strategy Planning → Creative Concept → Content Creation → Media Buying → Analytics.' },
      { title: 'Outcome', content: 'Achieved significant growth in social media reach and customer engagement.' },
    ],
  },
  {
    id: 4,
    title: 'UrbanWear Africa Marketing Campaign',
    client: 'UrbanWear Africa',
    year: 2023,
    category: 'Marketing',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop',
    slug: 'urbanwear-africa-marketing-campaign',
    details: [
      { title: 'Overview', content: 'Developed a marketing campaign for UrbanWear Africa to engage local youth and grow brand awareness.' },
      { title: 'Process', content: 'Market Research → Creative Concept → Social Media Strategy → Campaign Execution.' },
      { title: 'Outcome', content: 'Increased brand visibility and engagement across key African markets.' },
    ],
  },
  {
    id: 5,
    title: 'Social Media Management Platform',
    client: 'FinTech Solutions',
    year: 2023,
    category: 'Digital',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop',
    slug: 'social-media-management-platform',
    details: [
      { title: 'Overview', content: 'Developed a platform to help African SMEs manage their social media accounts efficiently.' },
      { title: 'Process', content: 'Requirement Gathering → UI/UX Design → Frontend & Backend Development → Testing → Launch.' },
      { title: 'Outcome', content: 'Streamlined social media posting, scheduling, and analytics for small businesses.' },
    ],
  },
  {
    id: 6,
    title: 'Package Design',
    client: 'FreshBites',
    year: 2023,
    category: 'Design',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
    slug: 'package-design',
    details: [
      { title: 'Overview', content: 'Designed innovative and attractive packaging for FreshBites products.' },
      { title: 'Process', content: 'Market Research → Concept Sketches → Packaging Mockups → Final Design → Production.' },
      { title: 'Outcome', content: 'Eye-catching packaging that enhances brand recognition and customer appeal.' },
    ],
  },
];