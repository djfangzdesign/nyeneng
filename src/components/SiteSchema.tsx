import { Helmet } from "react-helmet-async";

const SITE_URL = "https://www.nyeneng.co.za";

const business = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  "@id": `${SITE_URL}/#business`,
  name: "Nyeneng Trading & Projects",
  alternateName: "Nyeneng",
  url: SITE_URL,
  logo: "https://storage.googleapis.com/gpt-engineer-file-uploads/rIzLzgPYU8c7eVmTTyAe3QEOhN83/social-images/social-1778752868927-nyeneng_logo_light.webp",
  image: "https://storage.googleapis.com/gpt-engineer-file-uploads/rIzLzgPYU8c7eVmTTyAe3QEOhN83/social-images/social-1778752868927-nyeneng_logo_light.webp",
  description:
    "Multi-trade construction & infrastructure company in Rustenburg: residential builds, borehole drilling, JoJo tanks, plumbing, electrical (COC), welding, tiling and materials supply.",
  slogan: "Building Communities, Transforming Lives",
  foundingDate: "2016",
  telephone: "+27 72 129 6893",
  email: "info@nyeneng.co.za",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "556 Ngeneng Section, Lefaragatlha",
    addressLocality: "Rustenburg",
    addressRegion: "North West",
    postalCode: "0336",
    addressCountry: "ZA",
  },
  areaServed: [
    { "@type": "City", name: "Rustenburg" },
    { "@type": "AdministrativeArea", name: "North West, South Africa" },
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "17:00",
    },
  ],
};

const website = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "Nyeneng Trading & Projects",
  publisher: { "@id": `${SITE_URL}/#business` },
  inLanguage: "en-ZA",
};

export function SiteSchema() {
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(business)}</script>
      <script type="application/ld+json">{JSON.stringify(website)}</script>
    </Helmet>
  );
}

export { SITE_URL };
