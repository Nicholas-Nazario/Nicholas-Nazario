export interface PhotoCollection {
  slug: string;
  number: string;
  title: string;
  description: string;
  photos: Photo[];
}

export interface Photo {
  src: string;
  title: string;
  subtitle: string;
}

export const photoCollections: PhotoCollection[] = [
  {
    slug: "birds",
    number: "Collection 01",
    title: "Birds",
    description: "The birds I’ve seen in New York City, and beyond.",
    photos: [
      { src: "photos/birds/American%20Woodcock.JPG", title: "American Woodcock", subtitle: "Spotted in Bryant Park early in the spring" },
      { src: "photos/birds/Black%20Crowned%20Night%20Heron.JPG", title: "Black-crowned Night Heron", subtitle: "Spotted at the Harlem Meer" },
      { src: "photos/birds/Brown%20Thrasher.JPG", title: "Brown Thrasher", subtitle: "Spotted on the Magothy River" },
      { src: "photos/birds/Red%20Tailed%20Hawk.JPG", title: "Red-tailed Hawk", subtitle: "Spotted from my apartment window! The hawk was just perched on my deck" },
      { src: "photos/birds/Red%20Winged%20Blackbird.JPG", title: "Red-winged Blackbird", subtitle: "Spotted at the Harlem Meer" },
    ],
  },
  {
    slug: "argus-c4",
    number: "Collection 02",
    title: "Argus C4",
    description: "Random pictures taken on an old Argus C4",
    photos: [
      { src: "photos/argus-c4/Brooklyn%20Bridge.JPG", title: "Brooklyn Bridge", subtitle: "Walking towards Brooklyn; Shot with an Argus C4" },
      { src: "photos/argus-c4/Central%20Park%20in%20Snow.JPG", title: "Central Park in Snow", subtitle: "Taken on a snowy evening in Central Park; Shot with an Argus C4" },
      { src: "photos/argus-c4/The%20Beresford.JPG", title: "The Beresford", subtitle: "The Beresford apartment complex on the UWS; Shot with an Argus C4" },
    ],
  },
];
