import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

export const SEO: React.FC<SEOProps> = ({ 
  title = "Startup Confluence 2.0 | India's Premier Startup Summit",
  description = "Join the biggest startup ecosystem gathering in India. Discover, connect, and grow with top founders, investors, and mentors at United Incubation Hub.",
  image = "/og-image.jpg",
  url = "https://startupconfluence.com"
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      
      {/* Schema.org */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Event",
          "name": "Startup Confluence 2.0",
          "startDate": "2026-10-15T09:00",
          "endDate": "2026-10-16T18:00",
          "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
          "eventStatus": "https://schema.org/EventScheduled",
          "location": {
            "@type": "Place",
            "name": "United Incubation Hub",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "United Institute of Technology",
              "addressLocality": "Prayagraj",
              "postalCode": "211010",
              "addressRegion": "UP",
              "addressCountry": "IN"
            }
          },
          "description": description
        })}
      </script>
    </Helmet>
  );
};
