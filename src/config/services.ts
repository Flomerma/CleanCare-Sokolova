/**
 * Leistungskatalog – wird auf der Startseite, der Leistungsübersicht,
 * den einzelnen Leistungsseiten und im Buchungssystem verwendet.
 *
 * Jede Leistung hat eine eigene Unterseite unter /leistungen/<id>.
 * TODO: Alle Texte an das echte Angebot anpassen.
 */

export type ServiceId =
  | "unterhaltsreinigung"
  | "umzugs-endreinigung"
  | "fensterreinigung"
  | "bueroreinigung"
  | "treppenhausreinigung"
  | "teppich-polsterreinigung";

export type Service = {
  /** Zugleich die URL der Detailseite: /leistungen/<id> */
  id: ServiceId;
  title: string;
  /** Kurztext für Kacheln und Buchungsformular */
  short: string;
  /** Einleitung auf der Detailseite */
  description: string;
  /** Stichpunkte für die Übersichtskarten */
  bullets: string[];
  /** Schlüssel für die Icon-Komponente in src/components/Icons.tsx */
  icon: string;

  // --- Inhalte der Detailseite ---
  /** Meta-Description der Detailseite (für Google) */
  metaDescription: string;
  /** Einleitende Absätze */
  intro: string[];
  /** Konkreter Leistungsumfang */
  umfang: { titel: string; punkte: string[] }[];
  /** Ablauf in Schritten */
  ablauf: { titel: string; text: string }[];
  /** Häufige Fragen */
  faq: { frage: string; antwort: string }[];
  /** Hinweis zu Preisen – TODO: echte Preise/Ansätze eintragen */
  preisHinweis: string;
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
    metaDescription:
      "Unterhaltsreinigung für Wohnungen, Häuser und Geschäftsräume – wöchentlich, zweiwöchentlich oder monatlich. Festes Team, faire Konditionen, kein Abo-Zwang.",
    intro: [
      "Die Unterhaltsreinigung ist die regelmässige Grundpflege Ihrer Räume. Statt sich selbst um Böden, Bad und Küche zu kümmern, übergeben Sie diese Aufgaben einem festen Team, das Ihr Objekt kennt.",
      "Wir stimmen Rhythmus und Umfang genau auf Ihren Haushalt oder Betrieb ab – vom wöchentlichen Einsatz in der Familienwohnung bis zur monatlichen Pflege einer Zweitwohnung.",
    ],
    umfang: [
      {
        titel: "Küche",
        punkte: [
          "Arbeitsflächen, Fronten und Spüle",
          "Kochfeld und Dunstabzug aussen",
          "Kühlschrank aussen, Abfalleimer",
        ],
      },
      {
        titel: "Bad und WC",
        punkte: [
          "Dusche, Badewanne und Armaturen entkalken",
          "WC gründlich reinigen und desinfizieren",
          "Spiegel und Ablagen",
        ],
      },
      {
        titel: "Wohn- und Schlafräume",
        punkte: [
          "Böden saugen und feucht aufnehmen",
          "Staubwischen aller frei zugänglichen Flächen",
          "Türgriffe und Lichtschalter",
        ],
      },
    ],
    ablauf: [
      { titel: "Kennenlernen", text: "Wir besichtigen Ihr Objekt und besprechen, was Ihnen wichtig ist." },
      { titel: "Offerte", text: "Sie erhalten eine schriftliche Offerte mit Rhythmus und Preis." },
      { titel: "Erster Einsatz", text: "Wir starten mit einer gründlichen Erstreinigung als Basis." },
      { titel: "Laufender Betrieb", text: "Ab dann kommt immer dasselbe Team zum vereinbarten Termin." },
    ],
    faq: [
      {
        frage: "Muss ich zu Hause sein?",
        antwort:
          "Nein. Viele Kundinnen und Kunden hinterlegen einen Schlüssel bei uns. Wir bewahren diesen gesichert auf und dokumentieren jede Übergabe.",
      },
      {
        frage: "Muss ich Reinigungsmittel bereitstellen?",
        antwort:
          "Nein, wir bringen sämtliches Material und alle Reinigungsmittel mit. Auf Wunsch arbeiten wir mit Ihren eigenen Produkten.",
      },
      {
        frage: "Kann ich einen Termin verschieben?",
        antwort:
          "Ja. Melden Sie sich bitte möglichst frühzeitig, dann finden wir einen Ersatztermin.",
      },
    ],
    // TODO: echte Preisangaben ergänzen
    preisHinweis:
      "Die Unterhaltsreinigung rechnen wir nach Stundenansatz oder als Pauschale pro Einsatz ab. Sie erhalten vorab eine verbindliche Offerte.",
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
    metaDescription:
      "Umzugsreinigung und Endreinigung mit Abnahmegarantie. Wir übergeben Ihre Wohnung oder Ihr Haus so, dass die Abnahme durch die Verwaltung problemlos gelingt.",
    intro: [
      "Die Endreinigung entscheidet darüber, ob die Wohnungsübergabe reibungslos verläuft oder ob Nacharbeiten und Abzüge vom Mietzinsdepot drohen. Wir kennen die Massstäbe der Verwaltungen und arbeiten genau danach.",
      "Sie sagen uns den Übergabetermin – wir planen den Einsatz so, dass die Wohnung rechtzeitig und vollständig gereinigt bereitsteht.",
    ],
    umfang: [
      {
        titel: "Küche komplett",
        punkte: [
          "Backofen, Herd und Dunstabzug innen und aussen",
          "Kühlschrank und Gefrierfach abgetaut und gereinigt",
          "Sämtliche Schränke innen und aussen",
        ],
      },
      {
        titel: "Bad, Böden und Wände",
        punkte: [
          "Kalk vollständig entfernt, Fugen gereinigt",
          "Böden gereinigt, Sockelleisten abgewischt",
          "Flecken an Wänden und Türen entfernt",
        ],
      },
      {
        titel: "Fenster und Aussenbereich",
        punkte: [
          "Fenster innen und aussen inklusive Rahmen und Falze",
          "Storen und Rollläden",
          "Balkon, Keller und Estrich",
        ],
      },
    ],
    ablauf: [
      { titel: "Besichtigung", text: "Wir schauen uns das Objekt an und erstellen eine Fixpreis-Offerte." },
      { titel: "Terminplanung", text: "Wir reinigen kurz vor dem Übergabetermin, damit alles frisch ist." },
      { titel: "Reinigung", text: "Das Team arbeitet die vollständige Übergabe-Checkliste ab." },
      {
        titel: "Abnahme",
        text: "Auf Wunsch sind wir bei der Übergabe dabei und beheben Beanstandungen sofort.",
      },
    ],
    faq: [
      {
        frage: "Was bedeutet Abnahmegarantie?",
        antwort:
          "Beanstandet die Verwaltung bei der Übergabe die Reinigung, kommen wir kostenlos zurück und arbeiten nach. Voraussetzung ist, dass wir bei der Abnahme informiert werden.",
        // TODO: Bedingungen der Abnahmegarantie prüfen und exakt formulieren
      },
      {
        frage: "Muss die Wohnung leer sein?",
        antwort:
          "Ja, die Wohnung sollte vollständig geräumt sein. Nur so können wir alle Flächen erreichen und sauber übergeben.",
      },
      {
        frage: "Wie kurzfristig ist ein Termin möglich?",
        antwort:
          "Endreinigungen planen wir idealerweise zwei bis drei Wochen im Voraus. Kurzfristige Anfragen prüfen wir gerne – melden Sie sich telefonisch.",
      },
    ],
    // TODO: echte Preisangaben ergänzen
    preisHinweis:
      "Endreinigungen bieten wir zum Fixpreis an. Grundlage ist eine kurze Besichtigung oder Ihre Angaben zu Zimmerzahl und Fläche.",
  },
  {
    id: "fensterreinigung",
    title: "Fensterreinigung",
    short: "Streifenfreie Fenster, Rahmen und Storen.",
    description:
      "Fenster innen und aussen, inklusive Rahmen, Falzen und Storen – streifenfrei und schonend gereinigt.",
    bullets: ["Innen und aussen", "Rahmen und Falze inklusive", "Auch Storen und Rollläden"],
    icon: "window",
    metaDescription:
      "Professionelle Fensterreinigung für Wohnungen, Häuser und Geschäftsräume: streifenfreie Scheiben inklusive Rahmen, Falze und Storen.",
    intro: [
      "Saubere Fenster verändern den Eindruck eines ganzen Raumes. Wir reinigen Scheiben streifenfrei und beziehen dabei Rahmen und Falze mit ein – dort sammelt sich der meiste Schmutz.",
      "Für Privathaushalte übernehmen wir die Reinigung einmalig oder in festen Abständen. Für Geschäftsräume vereinbaren wir einen Turnus, der zu Ihrer Fassade und Lage passt.",
    ],
    umfang: [
      {
        titel: "Glasflächen",
        punkte: ["Scheiben innen und aussen", "Streifenfreies Abziehen", "Balkon- und Terrassentüren"],
      },
      {
        titel: "Rahmen und Falze",
        punkte: ["Rahmen feucht gereinigt", "Falze ausgesaugt und ausgewischt", "Dichtungen kontrolliert"],
      },
      {
        titel: "Beschattung",
        punkte: ["Storen und Rollläden", "Lamellenstoren einzeln gereinigt", "Fenstersimse innen und aussen"],
      },
    ],
    ablauf: [
      { titel: "Anfrage", text: "Sie nennen uns Anzahl und Art der Fenster." },
      { titel: "Offerte", text: "Wir berechnen den Aufwand und melden uns mit einem Preis." },
      { titel: "Reinigung", text: "Wir arbeiten zügig und schützen Böden sowie Möbel." },
      { titel: "Kontrolle", text: "Gemeinsame Schlusskontrolle im Tageslicht." },
    ],
    faq: [
      {
        frage: "Reinigen Sie auch schwer zugängliche Fenster?",
        antwort:
          "Bis zu einer gewissen Höhe arbeiten wir mit Teleskopstangen. Für höhere Fassaden ziehen wir einen Partner mit entsprechender Ausrüstung bei.",
        // TODO: prüfen, bis zu welcher Höhe die Reinigung selbst angeboten wird
      },
      {
        frage: "Wie oft sollten Fenster gereinigt werden?",
        antwort:
          "Im Privatbereich sind zwei bis drei Reinigungen pro Jahr üblich. An stark befahrenen Lagen empfiehlt sich ein kürzerer Rhythmus.",
      },
      {
        frage: "Was passiert bei schlechtem Wetter?",
        antwort:
          "Leichter Regen ist kein Problem. Bei starkem Wind oder Frost verschieben wir den Termin, um ein sauberes Ergebnis zu garantieren.",
      },
    ],
    // TODO: echte Preisangaben ergänzen
    preisHinweis:
      "Die Fensterreinigung rechnen wir pro Fensterflügel oder nach Stundenaufwand ab – je nachdem, was für Sie günstiger ist.",
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
    metaDescription:
      "Büroreinigung ausserhalb Ihrer Arbeitszeiten: Arbeitsplätze, Sanitäranlagen, Küche und Sitzungszimmer – diskret, zuverlässig und nach festem Plan.",
    intro: [
      "Ein gepflegtes Büro wirkt auf Mitarbeitende wie auf Kundschaft. Wir übernehmen die Reinigung Ihrer Geschäftsräume nach einem festen Plan, der genau festhält, was in welchem Rhythmus gemacht wird.",
      "Gereinigt wird ausserhalb Ihrer Betriebszeiten – früh morgens, am Abend oder am Wochenende. Ihr Betrieb läuft ungestört weiter.",
    ],
    umfang: [
      {
        titel: "Arbeitsplätze",
        punkte: ["Schreibtische und Ablageflächen", "Bildschirme und Tastaturen auf Wunsch", "Böden saugen und feucht reinigen"],
      },
      {
        titel: "Sanitär und Küche",
        punkte: [
          "WC-Anlagen reinigen und desinfizieren",
          "Teeküche, Kaffeemaschine aussen, Spüle",
          "Verbrauchsmaterial nachfüllen",
        ],
      },
      {
        titel: "Gemeinschaftsflächen",
        punkte: ["Empfang und Sitzungszimmer", "Korridore, Treppen und Lift", "Glastüren und Trennwände"],
      },
    ],
    ablauf: [
      { titel: "Bedarfsanalyse", text: "Wir begehen Ihre Räume und erfassen Flächen und Anforderungen." },
      { titel: "Reinigungsplan", text: "Sie erhalten einen schriftlichen Plan mit Rhythmus und Umfang." },
      { titel: "Einführung", text: "Das Team wird vor Ort eingeführt, Zutritt und Alarm werden geregelt." },
      { titel: "Qualitätskontrolle", text: "Regelmässige Kontrollen und eine feste Ansprechperson für Sie." },
    ],
    faq: [
      {
        frage: "Wie ist der Zutritt geregelt?",
        antwort:
          "Über Schlüssel, Badge oder Code – wie es für Sie am besten passt. Zutrittsmittel werden dokumentiert und sicher aufbewahrt.",
      },
      {
        frage: "Sind Ihre Mitarbeitenden zur Verschwiegenheit verpflichtet?",
        antwort:
          "Ja. Alle Mitarbeitenden unterzeichnen eine Vertraulichkeitserklärung und sind im Umgang mit sensiblen Unterlagen geschult.",
      },
      {
        frage: "Können wir den Umfang später anpassen?",
        antwort:
          "Selbstverständlich. Wächst Ihr Team oder ändern sich die Flächen, passen wir den Reinigungsplan an.",
      },
    ],
    // TODO: echte Preisangaben ergänzen
    preisHinweis:
      "Für Büroreinigungen erstellen wir eine monatliche Pauschale auf Basis von Fläche, Rhythmus und Leistungsumfang.",
  },
  {
    id: "treppenhausreinigung",
    title: "Treppenhausreinigung",
    short: "Gepflegte Eingänge und Gemeinschaftsflächen.",
    description:
      "Der erste Eindruck einer Liegenschaft entsteht im Treppenhaus. Wir übernehmen die regelmässige Reinigung von Eingängen, Treppen, Liften und Waschküchen.",
    bullets: ["Treppen, Geländer und Lift", "Eingangsbereich und Briefkästen", "Waschküche und Keller"],
    icon: "stairs",
    metaDescription:
      "Treppenhausreinigung für Liegenschaften und Verwaltungen: Eingang, Treppen, Lift, Waschküche und Keller – nach festem Turnus und zuverlässig dokumentiert.",
    intro: [
      "Für Verwaltungen und Eigentümergemeinschaften übernehmen wir die regelmässige Reinigung der Gemeinschaftsflächen. Das Treppenhaus prägt den Eindruck einer Liegenschaft – bei Mietinteressenten wie bei den Bewohnenden.",
      "Wir arbeiten nach einem festen Turnus und dokumentieren jeden Einsatz, damit die Leistung für Sie jederzeit nachvollziehbar bleibt.",
    ],
    umfang: [
      {
        titel: "Eingangsbereich",
        punkte: ["Eingangstüren und Glasflächen", "Briefkastenanlage", "Schmutzfangmatten"],
      },
      {
        titel: "Treppen und Lift",
        punkte: ["Treppenstufen und Podeste", "Geländer und Handläufe", "Liftkabine inklusive Spiegel"],
      },
      {
        titel: "Nebenräume",
        punkte: ["Waschküche und Trocknungsraum", "Kellergänge und Veloraum", "Entsorgungsraum"],
      },
    ],
    ablauf: [
      { titel: "Objektaufnahme", text: "Wir erfassen Stockwerke, Flächen und Nebenräume." },
      { titel: "Turnusplan", text: "Sie legen fest, was wöchentlich, monatlich oder quartalsweise erfolgt." },
      { titel: "Regelmässiger Einsatz", text: "Feste Wochentage, damit Bewohnende sich darauf einstellen können." },
      { titel: "Rapportierung", text: "Auf Wunsch erhält die Verwaltung einen Nachweis der Einsätze." },
    ],
    faq: [
      {
        frage: "Arbeiten Sie auch für Verwaltungen mit mehreren Liegenschaften?",
        antwort:
          "Ja. Für Portfolios erstellen wir eine Gesamtofferte mit einheitlichen Standards und einer zentralen Ansprechperson.",
      },
      {
        frage: "Übernehmen Sie auch den Winterdienst?",
        antwort:
          "Bitte fragen Sie uns direkt an – wir prüfen, ob wir den gewünschten Zusatzdienst abdecken können.",
        // TODO: klären, ob Winterdienst und Gartenunterhalt angeboten werden
      },
      {
        frage: "Wer stellt Wasser und Strom?",
        antwort:
          "Wir benötigen einen Wasseranschluss und eine Steckdose in der Liegenschaft. Material und Maschinen bringen wir mit.",
      },
    ],
    // TODO: echte Preisangaben ergänzen
    preisHinweis:
      "Die Treppenhausreinigung rechnen wir als monatliche Pauschale pro Liegenschaft ab, abhängig von Stockwerkzahl und Turnus.",
  },
  {
    id: "teppich-polsterreinigung",
    title: "Teppich- und Polsterreinigung",
    short: "Tiefenreinigung für Textilien und Polstermöbel.",
    description:
      "Mit professioneller Sprühextraktion lösen wir Flecken und Gerüche aus Teppichen, Sofas und Bürostühlen – materialschonend und mit kurzer Trocknungszeit.",
    bullets: ["Sprühextraktions-Verfahren", "Flecken- und Geruchsentfernung", "Materialschonend"],
    icon: "sofa",
    metaDescription:
      "Teppich- und Polsterreinigung mit Sprühextraktion: Flecken und Gerüche werden materialschonend gelöst, bei kurzer Trocknungszeit.",
    intro: [
      "Teppiche und Polstermöbel nehmen über Jahre Staub, Hautschuppen und Gerüche auf. Eine Tiefenreinigung holt sie zurück – oft mit einem Ergebnis, das einen Neukauf überflüssig macht.",
      "Wir arbeiten mit dem Sprühextraktionsverfahren: Reinigungslösung wird ins Gewebe eingebracht und samt gelöstem Schmutz sofort wieder abgesaugt.",
    ],
    umfang: [
      {
        titel: "Teppiche",
        punkte: ["Spannteppiche und lose Teppiche", "Vorbehandlung stark belasteter Stellen", "Aufbürsten des Flors"],
      },
      {
        titel: "Polstermöbel",
        punkte: ["Sofas und Sessel", "Bürostühle", "Matratzen auf Anfrage"],
      },
      {
        titel: "Zusatzleistungen",
        punkte: ["Gezielte Fleckenbehandlung", "Geruchsneutralisation", "Imprägnierung auf Wunsch"],
      },
    ],
    ablauf: [
      { titel: "Materialprüfung", text: "Wir prüfen Gewebe und Farbechtheit an unauffälliger Stelle." },
      { titel: "Vorbereitung", text: "Gründliches Absaugen und Vorbehandlung der Flecken." },
      { titel: "Sprühextraktion", text: "Tiefenreinigung mit sofortigem Absaugen der Lösung." },
      { titel: "Trocknung", text: "Je nach Material rund 4 bis 12 Stunden bei guter Durchlüftung." },
    ],
    faq: [
      {
        frage: "Werden alle Flecken entfernt?",
        antwort:
          "Die meisten schon. Bei alten, eingetrockneten oder farbverändernden Flecken – etwa Rotwein oder Tinte – sagen wir Ihnen vorab ehrlich, was realistisch erreichbar ist.",
      },
      {
        frage: "Wie lange dauert die Trocknung?",
        antwort:
          "Üblicherweise 4 bis 12 Stunden. Wir empfehlen, die Räume in dieser Zeit gut zu lüften.",
      },
      {
        frage: "Sind die Mittel für Haustiere und Kinder unbedenklich?",
        antwort:
          "Ja. Wir verwenden sparsam dosierte, biologisch abbaubare Produkte. Nach dem Trocknen sind die Flächen wieder uneingeschränkt nutzbar.",
      },
    ],
    // TODO: echte Preisangaben ergänzen
    preisHinweis:
      "Abgerechnet wird nach Quadratmeter beziehungsweise pro Sitzplatz. Nennen Sie uns Fläche und Material für eine rasche Offerte.",
  },
];

export const serviceById = (id: string): Service | undefined =>
  services.find((service) => service.id === id);

export const serviceTitles = (ids: string[]): string[] =>
  ids.map((id) => serviceById(id)?.title ?? id);

/** Die übrigen Leistungen – für die Querverweise am Ende jeder Detailseite. */
export const otherServices = (id: string): Service[] =>
  services.filter((service) => service.id !== id);
