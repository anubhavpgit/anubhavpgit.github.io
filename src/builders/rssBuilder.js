import fs from "fs/promises";
import path from "path";
import rss from "rss";
import { JSDOM } from "jsdom";
import toml from "toml";

// Read the config file
async function loadConfig() {
	const configFile = await fs.readFile("./config.toml", "utf-8");
	const config = toml.parse(configFile);
	return config;
}

// Set up RSS feed
const feed = new rss({
	title: "fuzzymusings",
	description: "A space for my two cents, musings, and insights.",
	feed_url: "https://anubhavp.dev/blog/feed.xml",
	site_url: "https://anubhavp.dev/blog",
	guid: "https://anubhavp.dev/blog",
	date: new Date(),
	author: "Anubhab Patnaik",
	custom_namespaces: {
		content: "http://purl.org/rss/1.0/modules/content/",
	},
	custom_elements: [
		{
			"atom:link": {
				_attr: {
					href: "https://anubhavp.dev/blog/feed.xml",
					rel: "self",
					type: "application/rss+xml",
				},
			},
		},
	],
});

// Parse HTML files in directory

export async function generateXmls() {
	try {
		const config = await loadConfig();
		// const directoryPath = path.resolve(".dist/blog");
		const directoryPath = path.resolve(config.srcPath.blogOutPath);
		const blogFiles = await fs.readdir(directoryPath);

		for (const file of blogFiles) {
			const filePath = path.join(directoryPath, file);
			if (path.extname(filePath) === ".html" && file !== "index.html") {
				const url = `https://anubhavp.dev/blog/${file}`;
				const html = await fs.readFile(filePath, "utf-8");

				const dom = new JSDOM(html);
				const title = dom.window.document.querySelector("title").textContent;
				const dateElement = dom.window.document.querySelector(
					'meta[name="publish-date"]'
				);
				const authorElement = dom.window.document.querySelector(
					'meta[name="author"]'
				);
				const descriptionElement = dom.window.document.querySelector(
					'meta[name="description"]'
				);
				const bodyElement = dom.window.document.querySelector("main");

				if (dateElement) {
					const dateValue = dateElement.getAttribute("content");
					const day = dateValue.substring(0, 2);
					const month = dateValue.substring(3, 5);
					const year = dateValue.substring(6, 10);
					const formattedDate = `${month}-${day}-${year}`;
					dateElement.setAttribute("content", formattedDate);
				}

				const date = dateElement ? dateElement.getAttribute("content") : "";
				let author = authorElement ? authorElement.getAttribute("content") : "";

				if (author === "<!-- AUTHOR -->") author = "Anubhab Patnaik";

				const description = descriptionElement
					? descriptionElement.getAttribute("content")
					: "";
				const body = bodyElement ? bodyElement.innerHTML : "";
				const subtitle = description;

				const item = {
					title,
					description,
					url,
					date,
					author,
					custom_elements: [{ "content:encoded": body }, { subtitle }],
				};
				feed.item(item);
			}
		}

		const feedXML = feed.xml({ indent: true });
		const feedPath = path.resolve(".dist/blog", "feed.xml");
		await fs.writeFile(feedPath, feedXML); // Using await with promise-based writeFile
		console.log("📑 RSS feed generated successfully.");

		const rootPath = path.resolve(".dist");
		const rootFiles = await fs.readdir(rootPath);
		const sitemapItems = [];

		for (const file of blogFiles) {
			const filePath = path.join(directoryPath, file);
			if (path.extname(filePath) === ".html" && file !== "index.html") {
				const url = `https://anubhavp.dev/blog/${file}`;
				const stat = await fs.stat(filePath);
				const lastmod = new Date(stat.mtime).toISOString();
				const changefreq = "monthly"; // You can adjust this as needed
				const priority = 0.5; // You can adjust this as needed

				const sitemapItem = `
              <url>
                  <loc>${url}</loc>
                  <lastmod>${lastmod}</lastmod>
                  <changefreq>${changefreq}</changefreq>
                  <priority>${priority}</priority>
              </url>
          `;

				sitemapItems.push(sitemapItem);
			}
		}

		for (const file of rootFiles) {
			const filePath = path.join(rootPath, file);
			if (file.endsWith(".html") && file !== "index.html") {
				const url = `https://anubhavp.dev/${file}`;
				const stat = await fs.stat(filePath);
				const lastmod = new Date(stat.mtime).toISOString();
				const changefreq = "monthly";
				const priority = 0.5;

				const sitemapItem = `
              <url>
                  <loc>${url}</loc>
                  <lastmod>${lastmod}</lastmod>
                  <changefreq>${changefreq}</changefreq>
                  <priority>${priority}</priority>
              </url>
          `;
				sitemapItems.push(sitemapItem);
			}
		}

		const sitemapXML = `<?xml version="1.0" encoding="utf-8" standalone="yes"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xhtml="http://www.w3.org/1999/xhtml">
      ${sitemapItems.join("\n")}
    </urlset>`;
		const sitemapPath = path.resolve(".dist", "sitemap.xml");
		await fs.writeFile(sitemapPath, sitemapXML);
		console.log("📑 Sitemap generated successfully.");
	} catch (err) {
		console.error(err);
	}
}

// generateXmls();
