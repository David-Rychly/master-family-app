import * as cheerio from "cheerio";
import type { NewGasPrice } from "./repository";

// Petrol (Benzín Natural 95) prices from mbenzin.cz for the stations near home.
// Ported from the old be-node actions/getGasPrice.js.

const STATION_URLS = [
  "https://www.mbenzin.cz/Ceny-benzinu-a-nafty/Praha-5---Barrandov/Orlen-K-Barrandovu-6/17216",
  "https://www.mbenzin.cz/Ceny-benzinu-a-nafty/Praha-5---Barrandov/OMV-K-Barrandovu-10/17215",
  "https://www.mbenzin.cz/Ceny-benzinu-a-nafty/Praha-5---Barrandov/MOL-K-Barrandovu/17062",
  "https://www.mbenzin.cz/Ceny-benzinu-a-nafty/Praha-5/Prim-Slavinskeho--/19281",
  "https://www.mbenzin.cz/stanice/900018",
];

const FUEL_LABEL = "Benzín";

type ScrapedStation = Omit<NewGasPrice, "updatedAt">;

function stationIdFromUrl(url: string) {
  const id = url.match(/(\d+)\/?$/)?.[1];
  if (!id) throw new Error(`No station id in ${url}`);
  return id;
}

/** "34,50" -> 34.5 */
function parseCzPrice(text: string) {
  const value = Number(text.trim().replace(/\s/g, "").replace(",", "."));
  if (!Number.isFinite(value)) throw new Error(`Failed to parse price: "${text}"`);
  return value;
}

/** "350 m" -> 350, "1,2 km" -> 1200 */
function parseDistance(text: string) {
  const value = parseFloat(text.replace(",", "."));
  if (!Number.isFinite(value)) return null;
  return /km/i.test(text) ? Math.round(value * 1000) : Math.round(value);
}

async function fetchPage(url: string) {
  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0 Safari/537.36",
      Accept: "text/html",
      "Accept-Language": "cs-CZ,cs;q=0.9,en;q=0.8",
    },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} fetching ${url}`);
  const $ = cheerio.load(await res.text());
  // Since autumn 2026 mbenzin.cz answers scripts with a browser check instead of the page. Scripts are meant
  // to use an access key, requested at https://www.mbenzin.cz/klic.
  if ($('a[href$="/klic"]').length > 0 && $(".station-card").length === 0) {
    throw new BrowserCheckError(url);
  }
  return $;
}

export class BrowserCheckError extends Error {
  constructor(url: string) {
    super(
      `mbenzin.cz showed its browser check instead of ${url}. Request an access key at https://www.mbenzin.cz/klic.`,
    );
    this.name = "BrowserCheckError";
  }
}

/** The station a detail page is about. Null when it has no petrol price. */
function parseMainStation($: cheerio.CheerioAPI): ScrapedStation | null {
  const card = $(".station-card").first();
  const stationId = card.find("> meta[itemprop='identifier']").attr("content")?.trim();
  let price: number | null = null;
  $(".fuelcards .fuelcard").each((_i, el) => {
    if ($(el).find(".fuelcard-head h2").first().text().trim() !== FUEL_LABEL) return;
    const content = $(el).find("meta[itemprop='price']").attr("content");
    if (content) price = parseFloat(content);
  });
  if (!stationId || price === null) return null;
  return {
    stationId,
    name: card.find(".station-card-info h1 [itemprop='name']").text().trim(),
    city: card.find(".station-addr-col [itemprop='addressLocality']").text().trim(),
    street: card.find(".station-addr-col [itemprop='streetAddress']").text().trim(),
    price,
    distance: 0,
  };
}

/** The "nearby stations" list on a detail page, only entries with a petrol price. */
function parseNearbyList($: cheerio.CheerioAPI): ScrapedStation[] {
  const stations: ScrapedStation[] = [];
  $(".stationlist .st-row").each((_i, el) => {
    const row = $(el);
    const stationId = row.find('meta[itemprop="identifier"]').attr("content")?.trim();
    let price: number | null = null;
    row.find(".st-prices .st-price").each((_j, fuelEl) => {
      const label = $(fuelEl).find(".lbl").text().trim();
      const text = $(fuelEl).find(".val").text().trim();
      if (label === FUEL_LABEL && text !== "–" && text !== "-") price = parseCzPrice(text);
    });
    if (!stationId || price === null) return;
    stations.push({
      stationId,
      name: row.find('[itemprop="name"]').text().trim(),
      city: row.find('[itemprop="addressLocality"]').text().trim(),
      street: row.find('[itemprop="streetAddress"]').text().trim(),
      price,
      distance: parseDistance(row.find(".st-km").text().trim()),
    });
  });
  return stations;
}

/**
 * Loads the first station's page and reads both its own price and its "nearby stations" list, which together
 * usually cover every station. Any station still missing is read from its own page, which has no distance.
 */
export async function scrapeStations(): Promise<ScrapedStation[]> {
  const [firstUrl] = STATION_URLS;
  const $ = await fetchPage(firstUrl!);

  const found = new Map<string, ScrapedStation>();
  const main = parseMainStation($);
  if (main) found.set(main.stationId, main);
  for (const station of parseNearbyList($)) found.set(station.stationId, station);

  const stations: ScrapedStation[] = [];
  for (const url of STATION_URLS) {
    const id = stationIdFromUrl(url);
    const station = found.get(id);
    if (station) {
      stations.push(station);
      continue;
    }
    try {
      const own = parseMainStation(await fetchPage(url));
      if (own) stations.push({ ...own, distance: null });
      else console.error(`No petrol price on ${url}`);
    } catch (err) {
      console.error(
        `Failed to read station ${id} (${url}):`,
        err instanceof Error ? err.message : err,
      );
    }
  }
  return stations;
}
