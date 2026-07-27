/**
 * Leistungskatalog – wird auf der Startseite, der Leistungsseite
 * und im Buchungssystem verwendet.
 * TODO: Beschreibungstexte und Leistungsumfang an das echte Angebot anpassen.
 */

export type ServiceId =
  | "unterhaltsreinigung"
  | "umzugs-endreinigung"
  | "fensterreinigung"
  | "bueroreinigung"
  | "treppenhausreinigung"
  | "teppich-polsterreinigung";

export type Service = {
  id: ServiceId;
  title: string;
  short: string;
  description: string;
  bullets: string[];
  /** Schlüssel für die Icon-Komponente in src/components/Icons.tsx */
  icon: string;
};

export const services: Service[] = [
  {
    id: "unterhaltsreinigung",
    title: "Unterhaltsreinigung",
    short: "Regelmässige Reinigung für Privat- und Geschäftsräume.",
    description:
      "Wiederkehrende Reinigung nach festem Rhythmus – wöchentlich, zweiwöchentlich oder monatlich. Wir halten Ihre Räume dauerhaft sauber, damit Sie sich um nichts kümmern müssen.",
    bullets: [
      "Fester Rhythmus nach Ihren Wünschen",
      "Immer dasselbe, eingespielte Team",
      "Reinigungsmittel und Material inklusive",
    ],
    icon: "sparkles",
  },
  {
    id: "umzugs-endreinigung",
    title: "Umzugs- und Endreinigung",
    short: "Übergabebereit gereinigt – inklusive Abnahmegarantie.",
    description:
      "Bei Wohnungsübergaben zählt jedes Detail. Wir reinigen Ihre Wohnung oder Ihr Haus so, dass die Abnahme durch Verwaltung oder Vermieter reibungslos verläuft.",
    bullets: [
      "Abnahmegarantie", // TODO: Nur beibehalten, wenn tatsächlich angeboten
      "Küche, Bad, Böden, Storen und Fenster",
      "Termingerecht auf den Übergabetag",
    ],
    icon: "box",
  },
  {
    id: "fensterreinigung",
    title: "Fensterreinigung",
    short: "Streifenfreie Fenster, Rahmen und Storen.",
    description:
      "Fenster innen und aussen, inklusive Rahmen, Falzen und Storen – streifenfrei und schonend gereinigt.",
    bullets: ["Innen und aussen", "Rahmen und Falze inklusive", "Auch Storen und Rollläden"],
    icon: "window",
  },
  {
    id: "bueroreinigung",
    title: "Büroreinigung",
    short: "Diskrete Reinigung ausserhalb Ihrer Arbeitszeiten.",
    description:
      "Wir reinigen Ihre Büroräume dann, wenn Sie es am wenigsten stört – früh morgens, abends oder am Wochenende. Diskret, zuverlässig und mit klaren Abläufen.",
    bullets: [
      "Flexible Zeiten ausserhalb des Betriebs",
      "Arbeitsplätze, Sanitär und Küche",
      "Vertraulichkeit garantiert",
    ],
    icon: "building",
  },
  {
    id: "treppenhausreinigung",
    title: "Treppenhausreinigung",
    short: "Gepflegte Eingänge und Gemeinschaftsflächen.",
    description:
      "Der erste Eindruck einer Liegenschaft entsteht im Treppenhaus. Wir übernehmen die regelmässige Reinigung von Eingängen, Treppen, Liften und Waschküchen.",
    bullets: ["Treppen, Geländer und Lift", "Eingangsbereich und Briefkästen", "Waschküche und Keller"],
    icon: "stairs",
  },
  {
    id: "teppich-polsterreinigung",
    title: "Teppich- und Polsterreinigung",
    short: "Tiefenreinigung für Textilien und Polstermöbel.",
    description:
      "Mit professioneller Sprühextraktion lösen wir Flecken und Gerüche aus Teppichen, Sofas und Bürostühlen – materialschonend und mit kurzer Trocknungszeit.",
    bullets: ["Sprühextraktions-Verfahren", "Flecken- und Geruchsentfernung", "Materialschonend"],
    icon: "sofa",
  },
];

export const serviceById = (id: string): Service | undefined =>
  services.find((service) => service.id === id);

export const serviceTitles = (ids: string[]): string[] =>
  ids.map((id) => serviceById(id)?.title ?? id);
