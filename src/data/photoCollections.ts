export interface PhotoCollection {
  slug: string;
  number: string;
  title: string;
  description: string;
  photos: string[];
}

export const photoCollections: PhotoCollection[] = [
  {
    slug: "birds",
    number: "Collection 01",
    title: "Birds",
    description: "The birds I’ve seen in New York City, and beyond.",
    photos: [
      "photos/birds/American%20Woodcock.JPG",
      "photos/birds/Black%20Crowned%20Night%20Heron.JPG",
      "photos/birds/Brown%20Thrasher.JPG",
      "photos/birds/Red%20Tailed%20Hawk.JPG",
      "photos/birds/Red%20Winged%20Blackbird.JPG",
    ],
  },
  {
    slug: "argus-c4",
    number: "Collection 02",
    title: "Argus C4",
    description: "Random pictures taken on an old Argus C4",
    photos: [
      "photos/argus-c4/Brooklyn%20Bridge.JPG",
      "photos/argus-c4/Central%20Park%20in%20Snow.JPG",
      "photos/argus-c4/The%20Beresford.JPG",
    ],
  },
];
