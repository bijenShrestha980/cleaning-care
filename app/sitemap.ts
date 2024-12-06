import { createWriteStream } from "fs";
import { SitemapStream, streamToPromise } from "sitemap";
import { Readable } from "stream";

interface Link {
  url: string;
  changefreq: string;
  priority: number;
}

const links: Link[] = [
  { url: "/", changefreq: "daily", priority: 1.0 },
  { url: "/about", changefreq: "monthly", priority: 0.8 },
  { url: "/contact", changefreq: "monthly", priority: 0.8 },
  { url: "/services", changefreq: "monthly", priority: 0.8 },
  { url: "/services/1", changefreq: "monthly", priority: 0.8 },
  { url: "/services/2", changefreq: "monthly", priority: 0.8 },
  { url: "/services/3", changefreq: "monthly", priority: 0.8 },
  { url: "/services/4", changefreq: "monthly", priority: 0.8 },
  { url: "/services/5", changefreq: "monthly", priority: 0.8 },
  { url: "/services/6", changefreq: "monthly", priority: 0.8 },
  { url: "/services/7", changefreq: "monthly", priority: 0.8 },
  { url: "/services/8", changefreq: "monthly", priority: 0.8 },
  { url: "/services/9", changefreq: "monthly", priority: 0.8 },
  { url: "/services/10", changefreq: "monthly", priority: 0.8 },
];
const stream = new SitemapStream({ hostname: "www.cleaningcare.au" });

const sitemap = Readable.from(links).pipe(stream);

streamToPromise(sitemap)
  .then((data: Buffer) => {
    const writeStream = createWriteStream("./sitemap.xml");
    writeStream.write(data.toString());
    writeStream.end();
  })
  .catch((error: Error) => {
    console.error("Error generating sitemap:", error);
  });
