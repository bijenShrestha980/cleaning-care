export type Location = {
  slug: string;
  city: string;
  state: "NSW" | "VIC" | "QLD" | "WA" | "SA" | "ACT" | "TAS";
  stateName: string;
  postcodeRange: string;
  geo: { latitude: number; longitude: number };
  intro: string;
  popularSuburbs: string[];
};

export const LOCATIONS: readonly Location[] = [
  {
    slug: "sydney",
    city: "Sydney",
    state: "NSW",
    stateName: "New South Wales",
    postcodeRange: "1000-2249",
    geo: { latitude: -33.8688, longitude: 151.2093 },
    intro:
      "From the CBD high-rises to leafy North Shore homes and Eastern Suburbs apartments, our Sydney cleaners deliver consistent, fully-insured cleaning across every postcode.",
    popularSuburbs: [
      "Sydney CBD",
      "Parramatta",
      "Bondi",
      "Chatswood",
      "Manly",
      "Surry Hills",
      "Hurstville",
      "Liverpool",
    ],
  },
  {
    slug: "melbourne",
    city: "Melbourne",
    state: "VIC",
    stateName: "Victoria",
    postcodeRange: "3000-3207",
    geo: { latitude: -37.8136, longitude: 144.9631 },
    intro:
      "Trusted residential, commercial and end-of-lease cleaning across greater Melbourne — from inner-city apartments in Southbank to family homes in the eastern and bayside suburbs.",
    popularSuburbs: [
      "Melbourne CBD",
      "Southbank",
      "Richmond",
      "St Kilda",
      "Carlton",
      "Box Hill",
      "Footscray",
      "Brighton",
    ],
  },
  {
    slug: "brisbane",
    city: "Brisbane",
    state: "QLD",
    stateName: "Queensland",
    postcodeRange: "4000-4179",
    geo: { latitude: -27.4698, longitude: 153.0251 },
    intro:
      "Reliable cleaning services across Brisbane's CBD, inner suburbs and bayside — bond cleans, regular house cleans, office cleans and one-off spring cleans.",
    popularSuburbs: [
      "Brisbane CBD",
      "Fortitude Valley",
      "South Brisbane",
      "New Farm",
      "Toowong",
      "Chermside",
      "Mount Gravatt",
      "Carindale",
    ],
  },
  {
    slug: "perth",
    city: "Perth",
    state: "WA",
    stateName: "Western Australia",
    postcodeRange: "6000-6175",
    geo: { latitude: -31.9523, longitude: 115.8613 },
    intro:
      "Professional cleaning across Perth metro — Northbridge, Subiaco, Fremantle and beyond. Quality cleans backed by police-checked, insured cleaners.",
    popularSuburbs: [
      "Perth CBD",
      "Subiaco",
      "Fremantle",
      "Joondalup",
      "Cottesloe",
      "Cannington",
      "Mandurah",
    ],
  },
  {
    slug: "adelaide",
    city: "Adelaide",
    state: "SA",
    stateName: "South Australia",
    postcodeRange: "5000-5199",
    geo: { latitude: -34.9285, longitude: 138.6007 },
    intro:
      "End-to-end cleaning across Adelaide and the surrounding hills — homes, offices, end-of-lease and carpet steam cleaning by fully insured local cleaners.",
    popularSuburbs: [
      "Adelaide CBD",
      "North Adelaide",
      "Glenelg",
      "Norwood",
      "Prospect",
      "Marion",
    ],
  },
  {
    slug: "canberra",
    city: "Canberra",
    state: "ACT",
    stateName: "Australian Capital Territory",
    postcodeRange: "2600-2920",
    geo: { latitude: -35.2809, longitude: 149.13 },
    intro:
      "Trusted cleaners servicing Canberra's inner north, south, Belconnen, Tuggeranong and Gungahlin — from apartments to government-grade office spaces.",
    popularSuburbs: [
      "Canberra City",
      "Belconnen",
      "Woden",
      "Tuggeranong",
      "Gungahlin",
      "Kingston",
    ],
  },
  {
    slug: "gold-coast",
    city: "Gold Coast",
    state: "QLD",
    stateName: "Queensland",
    postcodeRange: "4207-4228",
    geo: { latitude: -28.0167, longitude: 153.4 },
    intro:
      "Holiday-home, short-stay and residential cleaning across the Gold Coast — Surfers, Broadbeach, Burleigh and Robina. Same-day quotes available.",
    popularSuburbs: [
      "Surfers Paradise",
      "Broadbeach",
      "Burleigh Heads",
      "Robina",
      "Coolangatta",
      "Southport",
    ],
  },
  {
    slug: "newcastle",
    city: "Newcastle",
    state: "NSW",
    stateName: "New South Wales",
    postcodeRange: "2280-2330",
    geo: { latitude: -32.9283, longitude: 151.7817 },
    intro:
      "Local cleaners across Newcastle and Lake Macquarie — bond cleans, weekly home cleans and commercial cleaning with consistent, vetted teams.",
    popularSuburbs: [
      "Newcastle CBD",
      "Hamilton",
      "Charlestown",
      "Mayfield",
      "Cardiff",
      "Maitland",
    ],
  },
  {
    slug: "wollongong",
    city: "Wollongong",
    state: "NSW",
    stateName: "New South Wales",
    postcodeRange: "2500-2530",
    geo: { latitude: -34.4278, longitude: 150.8931 },
    intro:
      "Cleaning services across the Illawarra — from Wollongong CBD to Shellharbour and Kiama. Fully insured, satisfaction guaranteed.",
    popularSuburbs: [
      "Wollongong CBD",
      "Shellharbour",
      "Kiama",
      "Figtree",
      "Corrimal",
      "Dapto",
    ],
  },
  {
    slug: "hobart",
    city: "Hobart",
    state: "TAS",
    stateName: "Tasmania",
    postcodeRange: "7000-7050",
    geo: { latitude: -42.8821, longitude: 147.3272 },
    intro:
      "Hobart-based cleaners covering the CBD, eastern shore and Kingborough — homes, offices and end-of-lease cleans with detail you can see.",
    popularSuburbs: [
      "Hobart CBD",
      "Sandy Bay",
      "Glenorchy",
      "Kingston",
      "Bellerive",
      "Battery Point",
    ],
  },
] as const;

export const getLocation = (slug: string): Location | undefined =>
  LOCATIONS.find((l) => l.slug === slug);

export const getAllLocationSlugs = (): string[] =>
  LOCATIONS.map((l) => l.slug);

export const locationPath = (slug: string): string =>
  `/cleaning-services-${slug}`;
