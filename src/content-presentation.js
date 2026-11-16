// Content taken from the presentation "Aspecto – Akvakultur" (PDF), in Norwegian and English.
// The oil & gas pop-up text is a DRAFT written from Aspecto's general capabilities:
// the presentation itself only covers aquaculture. Have Aspecto review it.

export const team = [
  { name: 'Fredrik Nordøy', role: { no: 'CEO & Founder', en: 'CEO & Founder' }, phone: '90 75 60 90', email: 'fredrik@aspecto.no' },
  { name: 'Caroline Navjord', role: { no: 'CPO & Founder', en: 'CPO & Founder' }, phone: '41 07 91 05', email: 'caroline@aspecto.no' },
  { name: 'Glenn-Roar Stenfeldt', role: { no: 'COO', en: 'COO' } },
  { name: 'Kelsey Barnhill, PhD', role: { no: 'CSO', en: 'CSO' }, phone: '48 90 39 69', email: 'kelsey@aspecto.no' },
  { name: 'Kristin Galtung', role: { no: 'Marinbiolog', en: 'Marine Biologist' }, phone: '46 81 22 44', email: 'kristin@aspecto.no' },
  { name: 'Marte Åsmul', role: { no: 'Marinbiolog', en: 'Marine Biologist' } },
  { name: 'Kristoffer Christiansen', role: { no: 'Robotikkspesialist', en: 'Robotics Specialist' } },
  { name: 'Reid Jægtvik', role: { no: 'Båtfører / AUV-operatør', en: 'Skipper / AUV operator' } },
  { name: 'Andrè Hanssen', role: { no: 'Båtfører / AUV-operatør', en: 'Skipper / AUV operator' } },
]

export const fleet = [
  { id: 'ST-002', name: 'Elvira', depth: 300, hours: 5, camera: 'MID', speed: '0,7 m/s' },
  { id: 'ST-003', name: 'Georg', depth: 370, hours: 5, camera: 'MID', speed: '0,7 m/s' },
  { id: 'ST-004', name: 'Otto', depth: 600, hours: 8, camera: 'REAR', speed: '0,7 m/s' },
]

export const workflowDays = [21, 14, 5, 20, 5]

const no = {
  brand: {
    tags: ['Marine Inspection', 'Environmental Technology'],
    line: 'Marine Inspection & Environmental Technology Company',
  },
  heroNew: {
    title: ['Your access to', 'the ocean space.'],
    prompt: 'Velg din bransje',
    scroll: 'Se forbi overflaten',
  },
  survey: {
    label: 'Survey and monitoring',
    title: ['Kartlegging og', 'overvåking.'],
    items: [
      { title: 'Environmental', text: 'Miljøundersøkelser, habitatkartlegging og georefererte data for endringsdeteksjon over tid.' },
      { title: 'Infrastructure', text: 'Inspeksjon og overvåking av rørledninger, kabler, havner og anlegg i sjø.' },
      { title: 'Search and recovery', text: 'Høyoppløselige bilder av havbunnen, uten kabel til overflaten.' },
    ],
  },
  fleet: {
    label: 'Flåten',
    title: ['Tre autonome', 'undervannsfarkoster.'],
    text: 'Våre AUV-er kartlegger havbunnen helt uten kabel til overflaten, med jevn hastighet og høyde for konsistente målinger.',
    depth: 'Dybde',
    endurance: 'Driftstid',
    camera: 'Kamera',
    speed: 'Hastighet',
    hours: 'timer',
  },
  auvBenefits: {
    title: ['AUV: effektiv', 'habitatkartlegging for havbruk.'],
    items: [
      'Presise, rette transekter gir bedre oversikt over influensområdet',
      'Jevn hastighet og høyde gir konsistente målinger og færre feil',
      'Nedovervendt kamera gir jevne og pålitelige størrelsesmålinger av arter og forekomster',
      'Større arealdekning på kortere tid',
      'Ingen kabel gir lavere risiko for driftsstans og skader på anlegget',
      'Forutsigbare operasjonskostnader',
    ],
  },
  workflow: {
    title: ['Fra SNIS-kartlegging', 'til ferdig rapport.'],
    steps: ['Forundersøkelse', 'Kartlegging', 'Data', 'Prosessering', 'Kvalitetskontroll', 'Levering'],
    days: 'dager',
    total: '65 dager totalt',
  },
  artskart: {
    label: 'Prosjekt',
    title: ['Artsfunn til', 'Artskart.'],
    stat: '6 800+',
    statLabel: 'nye marine artsfunn tilgjengeliggjort i Artsdatabanken',
    text: 'Det er stor datamangel i Artskart, og Norsk rødliste for arter skal revideres i 2027. Ved å dele data gir vi et bedre kunnskapsgrunnlag, riktigere vurderinger og en potensiell fordel for næringen.',
    points: ['Bedre datagrunnlag for Artskart', 'Støtter revisjonen av Norsk rødliste 2027', 'Øker verdien av eksisterende miljødata'],
  },
  strengths: {
    title: ['Vår', 'styrke.'],
    lead: 'Vi kombinerer marinbiologi, teknologi og presise havbunnsdata for å gi næring og myndigheter et bedre beslutningsgrunnlag.',
    items: [
      'Tverrfaglig team med juridisk, vitenskapelig og teknisk kompetanse',
      'Avansert teknologi for presis datainnsamling',
      'Egne fartøy for effektiv kartlegging',
      'Solid erfaring fra marine prosjekter nasjonalt og internasjonalt',
      'Skreddersydde løsninger tilpasset din lokalitet',
    ],
    chainTitle: 'Vår kompetanse dekker hele verdikjeden',
    chain: [
      'Kartlegging og identifisering av sårbare marine habitater',
      'Kaldtvannskoraller og dypvannsøkosystemer',
      'Marinbiologiske feltundersøkelser og datainnsamling',
      'Analyse og tolkning av havbunnsdata',
      'Koblingen mellom vitenskap, teknologi og forvaltning',
    ],
  },
  science: {
    label: 'Marinbiologisk ekspertise i kjernen av Aspecto',
    name: 'Dr. Kelsey Archer Barnhill',
    role: 'Chief Science Officer | PhD, kaldtvannskoraller og dypvannsøkosystemer',
    paragraphs: [
      'Kelsey leder Aspectos vitenskapelige arbeid og bringer internasjonal spisskompetanse innen kaldtvannskorallrev, dypvannsøkosystemer og marin naturforvaltning.',
      'Hun har doktorgrad fra University of Edinburgh og bred erfaring med ROV/AUV-baserte havbunnsundersøkelser, habitatkartlegging og -klassifisering, romlige analyser og faglige vurderinger av marine naturverdier.',
      'I Aspecto leder hun vitenskapelige analyser og rapportering, kvalitetssikring og arbeidet med å omsette marine data og forskning til beslutningsgrunnlag for kunder, forvaltning og regulatoriske prosesser. Hun har også bidratt til IUCNs globale rødlistevurdering av kaldtvannskoraller.',
    ],
  },
  products: {
    title: ['Våre', 'produkter.'],
    groups: [
      {
        title: 'Juridisk bistand, oppfølging og håndtering',
        items: ['Søknadsprosesser for akvakulturtillatelser', 'Plan- og forvaltningssaker', 'Klagesaker', 'Vurdering av egnede lokaliteter', 'Forundersøkelsesrapport', 'Konsekvensutredning i sjø', 'Juridiske vurderinger', 'Faglige vurderinger av SNIS'],
        note: 'Tett samarbeid med SANDS advokatfirma',
      },
      {
        title: 'Havbunnskartlegging – fra planlegging til ferdig rapport',
        items: ['Visuell kartlegging med AUV', 'QuickMAP', 'FullMAP', 'Alternativ MOM-B', 'Overvåkningsprogram SNIS', 'Not- og fortøyningsinspeksjon', 'Strandsonebefaring', 'Strømmålinger', 'Multistrålerapport', 'Kartpakke'],
      },
    ],
  },
  diagram: {
    surface: 'Havoverflaten',
    hoursShort: 't',
    depthAlt: 'Dybderating for de tre AUV-ene: Elvira 300 m, Georg 370 m, Otto 600 m',
    area: 'Influensområde',
    farm: 'Oppdrettsanlegg sett ovenfra',
    transects: 'Rette transekter, ingen kabel',
    transectAlt: 'AUV-en kjører rette, parallelle transekter som dekker hele området rundt anlegget',
  },
  images: {
    crew: 'Mannskap klargjør AUV-en på dekk',
    seabed: 'Havbunn opplyst av undervannsfarkost',
    camera: 'Undervannskamera',
    vessel: 'Aspectos fartøy sett fra luften',
    coast: 'Norskekysten i skumringen',
    operator: 'Operatør følger kartleggingen fra styrhuset',
    auv: 'Autonom undervannsfarkost i sjøen',
  },
  industries: {
    switchLabel: 'Bransje',
    cta: 'Bestill en konsultasjon',
    draft: null,
    aqua: {
      name: 'Akvakultur',
      title: ['Fra lokalitet til', '«licence to operate».'],
      intro: 'Vi bistår med hele eller deler av akvakultursøknaden, gjennomfører samtlige miljøundersøkelser og følger hele prosessen – fra start til innsendt søknad, og videre opp mot kommune, statsforvalter og Miljødirektoratet.',
      stats: [
        ['65', 'dager fra SNIS-kartlegging til ferdig rapport'],
        ['6 800+', 'marine artsfunn delt med Artskart'],
        ['0', 'kabler – lavere risiko for skader på anlegget'],
      ],
      lists: [
        {
          title: 'Søknad og juss',
          items: ['Akvakultursøknad og supplerende opplysninger', 'Forundersøkelsesrapport og kartpakke', 'Konsekvensutredning og vurdering etter KU-forskriften', 'Biosikkerhetsplan, internkontroll og beredskapsplan', 'Klagebehandling og oppfølging i ettertid', 'Tett samarbeid med SANDS advokatfirma'],
        },
        {
          title: 'Miljøundersøkelser',
          items: ['QuickMAP og SNIS – FullMAP med AUV', 'Multistråle (multibeam) og strømmålinger', 'MOM-B og alternativ MOM-B', 'MOM-C med akkreditert underleverandør, fra egen båt', 'Not- og fortøyningsinspeksjon', 'Overvåkningsprogram SNIS'],
        },
      ],
      extraTitle: 'Lokalitetsutvikling, steg for steg',
      extra: ['Områdevurdering: laksetildelingsforskriften § 8, lusetall, total belastning, strøm og naturmangfold', 'Avsjekk mot kommuneplan', 'Dialog med kommunen', 'Miljøundersøkelser: QuickMAP, multistråle, strøm, FullMAP, B- og C-undersøkelse'],
    },
    oil: {
      name: 'Olje & gass',
      title: ['Inspeksjon og miljødata', 'rundt infrastruktur på havbunnen.'],
      intro: 'Autonome undervannsfarkoster inspiserer rørledninger, kabler og installasjoner uten kabel til overflaten, og kartlegger samtidig naturverdiene rundt. Du får georefererte bilder og data som tåler faglig og regulatorisk gjennomgang.',
      stats: [
        ['600 m', 'dybderating på vår dypeste AUV'],
        ['8 t', 'driftstid per dykk'],
        ['0,5–1 m', 'posisjonsnøyaktighet under vann'],
      ],
      lists: [
        {
          title: 'Inspeksjon og overvåking',
          items: ['Visuell inspeksjon av rørledninger og kabler', 'Overvåking av kritisk infrastruktur over tid', 'Georefererte data for endringsdeteksjon', 'Fotomosaikker og 3D-modeller av havbunnen', 'Search and recovery'],
        },
        {
          title: 'Miljø og regelverk',
          items: ['Kartlegging av sårbare marine habitater før tiltak', 'Kaldtvannskoraller og dypvannsøkosystemer', 'Konsekvensutredning i sjø', 'Juridiske og faglige vurderinger', 'Dialog med myndigheter'],
        },
      ],
      extraTitle: 'Hvorfor AUV uten kabel?',
      extra: ['Ingen kabel gir lavere risiko nær installasjoner', 'Jevn hastighet og høyde gir konsistente, repeterbare målinger', 'Større arealdekning på kortere tid', 'Forutsigbare operasjonskostnader'],
    },
  },
}

const en = {
  brand: no.brand,
  heroNew: {
    title: ['Your access to', 'the ocean space.'],
    prompt: 'Choose your industry',
    scroll: 'See beyond the surface',
  },
  survey: {
    label: 'Survey and monitoring',
    title: ['Survey and', 'monitoring.'],
    items: [
      { title: 'Environmental', text: 'Environmental surveys, habitat mapping and georeferenced data for detecting change over time.' },
      { title: 'Infrastructure', text: 'Inspection and monitoring of pipelines, cables, ports and installations at sea.' },
      { title: 'Search and recovery', text: 'High-resolution seabed imagery, with no cable to the surface.' },
    ],
  },
  fleet: {
    label: 'The fleet',
    title: ['Three autonomous', 'underwater vehicles.'],
    text: 'Our AUVs map the seabed with no cable to the surface, holding a steady speed and altitude for consistent measurements.',
    depth: 'Depth',
    endurance: 'Endurance',
    camera: 'Camera',
    speed: 'Speed',
    hours: 'hours',
  },
  auvBenefits: {
    title: ['AUV: efficient', 'habitat mapping for aquaculture.'],
    items: [
      'Precise, straight transects give a better overview of the area of influence',
      'Steady speed and altitude give consistent measurements and fewer errors',
      'A downward-facing camera gives even, reliable size measurements of species and occurrences',
      'More area covered in less time',
      'No cable means lower risk of downtime and damage to the farm',
      'Predictable operating costs',
    ],
  },
  workflow: {
    title: ['From SNIS survey', 'to finished report.'],
    steps: ['Pre-survey', 'Mapping', 'Data', 'Processing', 'Quality control', 'Delivery'],
    days: 'days',
    total: '65 days in total',
  },
  artskart: {
    label: 'Project',
    title: ['Species records for', 'Artskart.'],
    stat: '6,800+',
    statLabel: 'new marine species records made available in the Norwegian Biodiversity Information Centre',
    text: 'Artskart has large data gaps, and the Norwegian Red List for species will be revised in 2027. Sharing data gives a better knowledge base, more accurate assessments and a potential advantage for the industry.',
    points: ['A better data foundation for Artskart', 'Supports the 2027 revision of the Norwegian Red List', 'Increases the value of existing environmental data'],
  },
  strengths: {
    title: ['Our', 'strengths.'],
    lead: 'We combine marine biology, technology and precise seabed data to give industry and authorities a better basis for decisions.',
    items: [
      'A cross-disciplinary team with legal, scientific and technical expertise',
      'Advanced technology for precise data collection',
      'Our own vessels for efficient mapping',
      'Solid experience from marine projects in Norway and abroad',
      'Tailored solutions adapted to your site',
    ],
    chainTitle: 'Our expertise covers the whole value chain',
    chain: [
      'Mapping and identifying vulnerable marine habitats',
      'Cold-water corals and deep-sea ecosystems',
      'Marine biological fieldwork and data collection',
      'Analysis and interpretation of seabed data',
      'The link between science, technology and management',
    ],
  },
  science: {
    label: 'Marine biology at the core of Aspecto',
    name: 'Dr. Kelsey Archer Barnhill',
    role: 'Chief Science Officer | PhD, cold-water corals and deep-sea ecosystems',
    paragraphs: [
      "Kelsey leads Aspecto's scientific work and brings international expertise in cold-water coral reefs, deep-sea ecosystems and marine nature management.",
      'She holds a PhD from the University of Edinburgh and has broad experience with ROV/AUV-based seabed surveys, habitat mapping and classification, spatial analysis and expert assessments of marine natural values.',
      "At Aspecto she leads scientific analysis and reporting, quality assurance, and the work of turning marine data and research into a basis for decisions for clients, authorities and regulatory processes. She has also contributed to the IUCN's global Red List assessment of cold-water corals.",
    ],
  },
  products: {
    title: ['Our', 'products.'],
    groups: [
      {
        title: 'Legal assistance, follow-up and case handling',
        items: ['Application processes for aquaculture permits', 'Planning and administrative cases', 'Appeals', 'Assessment of suitable sites', 'Pre-survey report', 'Impact assessment at sea', 'Legal assessments', 'Expert assessments of SNIS'],
        note: 'Close collaboration with the law firm SANDS',
      },
      {
        title: 'Seabed mapping, from planning to finished report',
        items: ['Visual mapping with AUV', 'QuickMAP', 'FullMAP', 'Alternative MOM-B', 'SNIS monitoring programme', 'Net and mooring inspection', 'Shoreline survey', 'Current measurements', 'Multibeam report', 'Map package'],
      },
    ],
  },
  diagram: {
    surface: 'Sea surface',
    hoursShort: 'h',
    depthAlt: 'Depth rating of the three AUVs: Elvira 300 m, Georg 370 m, Otto 600 m',
    area: 'Area of influence',
    farm: 'Fish farm seen from above',
    transects: 'Straight transects, no cable',
    transectAlt: 'The AUV runs straight, parallel transects that cover the whole area around the farm',
  },
  images: {
    crew: 'Crew preparing the AUV on deck',
    seabed: 'Seabed lit by an underwater vehicle',
    camera: 'Underwater camera',
    vessel: "Aspecto's vessel seen from the air",
    coast: 'The Norwegian coast at dusk',
    operator: 'Operator following the survey from the wheelhouse',
    auv: 'Autonomous underwater vehicle in the sea',
  },
  industries: {
    switchLabel: 'Industry',
    cta: 'Book a consultation',
    draft: null,
    aqua: {
      name: 'Aquaculture',
      title: ['From site to', '“licence to operate”.'],
      intro: 'We help with all or part of the aquaculture application, carry out every environmental survey and follow the whole process, from the start to a submitted application and onwards with the municipality, the County Governor and the Norwegian Environment Agency.',
      stats: [
        ['65', 'days from SNIS survey to finished report'],
        ['6,800+', 'marine species records shared with Artskart'],
        ['0', 'cables, so lower risk of damage to the farm'],
      ],
      lists: [
        {
          title: 'Application and legal',
          items: ['Aquaculture application and supplementary information', 'Pre-survey report and map package', 'Impact assessment and review under the EIA regulations', 'Biosecurity plan, internal control and contingency plan', 'Appeals and follow-up afterwards', 'Close collaboration with the law firm SANDS'],
        },
        {
          title: 'Environmental surveys',
          items: ['QuickMAP and SNIS FullMAP with AUV', 'Multibeam and current measurements', 'MOM-B and alternative MOM-B', 'MOM-C with an accredited subcontractor, from our own boat', 'Net and mooring inspection', 'SNIS monitoring programme'],
        },
      ],
      extraTitle: 'Site development, step by step',
      extra: ['Area assessment: salmon allocation regulations § 8, lice counts, total load, currents and biodiversity', 'Check against the municipal plan', 'Dialogue with the municipality', 'Environmental surveys: QuickMAP, multibeam, currents, FullMAP, B and C surveys'],
    },
    oil: {
      name: 'Oil & gas',
      title: ['Inspection and environmental data', 'around seabed infrastructure.'],
      intro: 'Autonomous underwater vehicles inspect pipelines, cables and installations with no cable to the surface, and map the natural values around them at the same time. You get georeferenced imagery and data that stand up to scientific and regulatory review.',
      stats: [
        ['600 m', 'depth rating on our deepest AUV'],
        ['8 h', 'endurance per dive'],
        ['0.5–1 m', 'positional accuracy under water'],
      ],
      lists: [
        {
          title: 'Inspection and monitoring',
          items: ['Visual inspection of pipelines and cables', 'Monitoring of critical infrastructure over time', 'Georeferenced data for change detection', 'Photomosaics and 3D models of the seabed', 'Search and recovery'],
        },
        {
          title: 'Environment and regulation',
          items: ['Mapping vulnerable marine habitats before a project', 'Cold-water corals and deep-sea ecosystems', 'Impact assessment at sea', 'Legal and expert assessments', 'Dialogue with authorities'],
        },
      ],
      extraTitle: 'Why an AUV with no cable?',
      extra: ['No cable means lower risk close to installations', 'Steady speed and altitude give consistent, repeatable measurements', 'More area covered in less time', 'Predictable operating costs'],
    },
  },
}

export const presentation = { no, en }
