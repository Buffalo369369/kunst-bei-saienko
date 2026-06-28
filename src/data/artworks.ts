type Artwork = {

  slug: string;

  title: string;

  image: string;

  price: string;

  status: string;

  exhibition: string;

  description: string;

};
export const artworks = [
  {
    slug: "der-tagesruckstand",
    title: "der Tagesrückstand",
    image: "/images/project-100.jpg",
    price: "€220",
    status: "Verfügbar",
    exhibition: "freiraum",

    description: `Das abstrakte Kunstwerk  „der Tagesrückstand“ fängt mit seinen tiefdunklen, feinkörnigen Texturen und dem hellen, vertikalen Akzent im Zentrum die poetischen Spuren ein, die das Ende eines Kaffeetages hinterlässt.`,
  },

  {
    slug: "laktoserfreier-cappuccino",
    title: "Laktosefreier Cappuccino",
    image: "/images/project-200.jpg",
    price: "€220",
    status: "Verfügbar",
    exhibition: "freiraum",

    description: `Das abstrakte Kunstwerk  „Laktosefreier Cappuccino“ fängt mit seinen feinen, dynamischen Spritzern vor dunklem Hintergrund und den sanften, cremigen Nuancen die lebendige Leichtigkeit und Energie von frisch aufgeschäumtem Milchschaum ein.`,
  },

  {
    slug: "flussiges-leuchten",
    title: "Flüssiges Leuchten",
    image: "/images/project-300.jpg",
    price: "€220",
    status: "Verfügbar",
    exhibition: "freiraum",

    description: `Das abstrakte Kunstwerk „Flüssiges Leuchten“ fasziniert durch ein glühendes Zusammenspiel aus intensiv strahlenden Goldtönen und dunklen Strukturen, die wie flüssiges Gold oder Lichtreflexe über eine schattige Oberfläche gleiten.`,
  },
  {
    slug: "patina-des-morgens",
    title: "Patina des Morgens",
    image: "/images/project-400.jpg",
    price: "€220",
    status: "Verfügbar",
    exhibition: "freiraum",

    description: `Das abstrakte Kunstwerk „Patina des Morgens“ fängt mit seinem warm leuchtenden Goldgrund im Kontrast zu tiefen, strukturierten dunklen Schichten das sanfte Licht und die besondere Atmosphäre des frühen Tagesanfangs ein.`,
  },
  {
    slug: "der-geist-des-kaffees",
    title: "der Geist des Kaffees",
    image: "/images/project-500.jpg",
    price: "€220",
    status: "Verfügbar",
    exhibition: "freiraum",

    description: `Das abstrakte Kunstwerk „der Geist des Kaffees“ fasziniert durch seine horizontalen, warm leuchtenden Goldschichten, die wie eine schwebende Essenz durch die tiefen, dunklen Strukturen hindurchschimmern.`,
  },
  {
    slug: "stratigraphie-des-kaffees",
    title: "Stratigraphie des Kaffees",
    image: "/images/project-600.jpg",
    price: "€220",
    status: "Verfügbar",
    exhibition: "morgenlicht",

    description: `Das abstrakte Kunstwerk „Stratigraphie des Kaffees“ besticht durch eine geschichtete Struktur aus einer hellen, goldglänzenden Basis und dunklen, texturierten Ablagerungen, die visuell an die Sedimente eines Kaffees erinnern.`,
  },
  {
    slug: "espresso-noir",
    title: "Espresso Noir",
    image: "/images/project-700.jpg",
    price: "€220",
    status: "Verfügbar",
    exhibition: "morgenlicht",

    description: `Das abstrakte Kunstwerk „Espresso Noir“ fasziniert durch ein kontrastreiches Zusammenspiel aus leuchtendem Goldgrund und tiefschwarzen, dichten Texturen, die an die Intensität und die Struktur von feinem Kaffeesatz erinnern.`,
  },
  {
    slug: "fragmente-des-genusses",
    title: "Fragmente des Genusses",
    image: "/images/project-800.jpg",
    price: "€220",
    status: "Verfügbar",
    exhibition: "morgenlicht",

    description: `Das abstrakte Kunstwerk „Fragmente des Genusses“ fängt mit seinen vielschichtigen Strukturen aus warmen Ockertönen, tiefem Schwarz und cremigen Nuancen die lebendige Dynamik eines Kaffeemoments ein.`,
  },
  {
    slug: "goldene-risse",
    title: "Goldene Risse",
    image: "/images/project-900.jpg",
    price: "€220",
    status: "Verfügbar",
    exhibition: "morgenlicht",

    description: `Das abstrakte Kunstwerk „Goldene Risse“ zeigt strahlende goldene Fragmente, die wie flüssiges Licht oder edle Kintsugi-Risse impulsiv durch einen tiefen, dunklen Hintergrund brechen.`,
  },
  {
    slug: "goldener-bruch",
    title: "Goldener Bruch",
    image: "/images/project-1000.jpg",
    price: "€220",
    status: "Verfügbar",
    exhibition: "atelier",

    description: `Das abstrakte Kunstwerk „Goldener Bruch“ fasziniert durch ein spannungsvolles Zusammenspiel aus tiefdunklen Schichten und intensiv schimmernden Goldschichten, die von feinen, kontrastreichen Linien effektvoll durchbrochen werden – wie ein kostbarer Riss, durch den pures Licht dringt.`,
  },
  {
    slug: "schichten-der-zeit",
    title: "Schichten der Zeit",
    image: "/images/project-1001.jpg",
    price: "€220",
    status: "Verfügbar",
    exhibition: "atelier",

    description: `Das abstrakte Kunstwerk „Schichten der Zeit“ fasziniert durch seine harmonische horizontale Gliederung, bei der ein warm leuchtender Streifen aus Gold- und Bernsteintönen von tiefen, dunklen Texturen umschlossen wird – wie die sichtbaren Spuren und Ablagerungen vergangener Momente.`,
  },
  {
    slug: "ein-schuss-kaffee",
    title: "ein Schuss Kaffee",
    image: "/images/project-1002.jpg",
    price: "€220",
    status: "Verfügbar",
    exhibition: "atelier",

    description: `Das abstrakte Kunstwerk „ein Schuss Kaffee“ besticht durch seinen markanten, hellen Vertikalstreifen in Creme- und Goldtönen, der sich kraftvoll durch tiefdunkle, strukturierte Schichten zieht – visuell genau wie ein konzentrierter Espresso, der das Dunkel durchbricht.`,
  },
  {
    slug: "der-sediment-des-sonnenlichts",
    title: "der Sediment des Sonnenlichts",
    image: "/images/project-1003.jpg",
    price: "€220",
    status: "Verfügbar",
    exhibition: "atelier",

    description: `Das abstrakte Kunstwerk „Das Sediment des Sonnenlichts“ besticht durch seine vielschichtige Struktur aus warmen Erdtönen und schimmernden Goldnuancen, die wie abgelagerte, eingefangene Sonnenstrahlen wirken.`,
  },
  {
    slug: "kaffeegenuss",
    title: "Kaffeegenuss",
    image: "/images/project-1004.jpg",
    price: "€220",
    status: "Verfügbar",
    exhibition: "atelier",

    description: `Das abstrakte Kunstwerk „Kaffeegenuss“ besticht durch das spannungsvolle Zusammenspiel von tiefem Schwarz und feinen, goldenen Verästelungen, die sich wie glühende Funken nach unten hin in eine strahlend goldene Fläche ergießen.`,
  },
  {
    slug: "vorfreude-auf-den-kaffee",
    title: "Vorfreude auf den Kaffee",
    image: "/images/project-1005.jpg",
    price: "€220",
    status: "Verfügbar",
    exhibition: "atelier",

    description: `Das abstrakte Kunstwerk „Vorfreude auf den Kaffee“ fängt mit seinen sanften, warmen Erdtönen und harmonisch fließenden Strukturen die beruhigende und erdende Wirkung eines Kaffeemoments ein.`,
  },
  {
    slug: "ein-duft-in-schwarz-weis",
    title: "Ein Duft in Schwarz-Weiß",
    image: "/images/project-1006.jpg",
    price: "€245",
    status: "Verfügbar",
    exhibition: "atelier",

    description: `Das abstrakte Kunstwerk „Ein Duft in Schwarz-Weiß“ fasziniert durch seine feine, monochrome Textur aus dynamisch fließenden Schwarz- und Weißtönen, die visuell an das flüchtige Aufsteigen eines intensiven Kaffeearomas erinnern.`,
  },
  {
    slug: "das-restliche",
    title: "Das restliche",
    image: "/images/project-1007.jpg",
    price: "€220",
    status: "Verfügbar",
    exhibition: "atelier",

    description: `Das abstrakte Kunstwerk „Das restliche“ erinnert mit seinen hellen, geschwungenen Kreisbögen an die charakteristischen Spuren und Ringe von Kaffeetassen auf einer vielschichtigen Textur aus erdigen Brauntönen, Weiß und feinen Strukturen.`,
  },
];