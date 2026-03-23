export interface ReferenceDetail {
  slug: string;
  title: string;
  type: string;
  description: string;
  image: string; // hero / card image
  tags: string[];
  // Extended fields — only present on detail pages
  detail?: {
    subtitle: string;
    date: string;
    guests: string;
    venue: string;
    brief: string;       // what the client wanted
    solution: string;    // what we designed
    quote?: string;      // optional pull quote displayed large between brief and gallery
    program: { time: string; act: string; note: string }[];
    gallery: string[];
    showDesigner?: {
      name: string;
      photo?: string;    // optional — path to photo
      bio: string;       // short description
    };
  };
}

export const references: ReferenceDetail[] = [
  {
    slug: "vyroci-unis-computer",
    title: "30. výročí UNIS Computer",
    type: "Korporátní akce",
    description:
      "Program pro 30. výročí firmy — světelná a laserová show s projekcemi na míru, zrcadlový pár a walking acts pro 120 hostů v Besedním domě v Brně.",
    image:
      "/images/lightshow/5250_REPORTAZ_2025_10_09_UNIS_COMPUTER_BESEDNI_DUM_BRNO_OSLAVA_VYROCI_30LET_UNIS_COMPUTER_A_AXENTA_S9203495.webp",
    tags: ["Lightshow", "Laser show", "Walking acts", "Projekce na kostýmy"],
    detail: {
      subtitle: "Galavečer pro 120 hostů v Besedním domě v Brně",
      date: "Říjen 2025",
      guests: "120 hostů",
      venue: "Besední dům, Brno",
      brief:
        "Klient slavil 30 let existence — výjimečné jubileum, které si zasluhovalo víc než standardní večírek. Chtěli program, který bude skutečně reprezentativní, vstřičný vůči smíšenému publiku (management i technické týmy) a zakončí večer silným emocionálním momentem. Zároveň bylo důležité, aby entertainment nebyl v konfliktu se slavnostní atmosférou a proslovy.",
      solution:
        "Walking acts provázeli hosty od prvního momentu — vítali je u vstupu, korzovali mezi nimi, bavili a fotili se s nimi ve fotokoutku. Vrcholem večera byla světelná a laserová show s projekcemi na míru: milníky 30leté historie firmy, rebranding loga i projekce přímo na kostýmy umělců. Celou show provázel speciální voice over, který příběh firmy vyprávěl. Na závěr zrcadlový pár roztančil sál krátkým tanečním výstupem — a párty mohla začít.",
      quote: "30 let historie firmy promítnuté na kostýmy umělců — show, která propojila minulost značky s energií párty.",
      program: [],
      showDesigner: {
        name: "Michal Halačka",
        photo: "/images/obchod/michalhalacka.webp",
        bio: "Michal byl show designerem na místě — koordinoval průběh večera, komunikoval s umělci a dohlížel na to, aby program proběhl přesně podle plánu.",
      },
      gallery: [
        "/images/lightshow/5209_REPORTAZ_2025_10_09_UNIS_COMPUTER_BESEDNI_DUM_BRNO_OSLAVA_VYROCI_30LET_UNIS_COMPUTER_A_AXENTA_SA901928.webp",
        "/images/lightshow/5250_REPORTAZ_2025_10_09_UNIS_COMPUTER_BESEDNI_DUM_BRNO_OSLAVA_VYROCI_30LET_UNIS_COMPUTER_A_AXENTA_S9203495.webp",
        "/images/lightshow/5285_REPORTAZ_2025_10_09_UNIS_COMPUTER_BESEDNI_DUM_BRNO_OSLAVA_VYROCI_30LET_UNIS_COMPUTER_A_AXENTA_SA901995.webp",
        "/images/lightshow/5286_REPORTAZ_2025_10_09_UNIS_COMPUTER_BESEDNI_DUM_BRNO_OSLAVA_VYROCI_30LET_UNIS_COMPUTER_A_AXENTA_SA901996.webp",
        "/images/lightshow/5297_REPORTAZ_2025_10_09_UNIS_COMPUTER_BESEDNI_DUM_BRNO_OSLAVA_VYROCI_30LET_UNIS_COMPUTER_A_AXENTA_S9203502.webp",
        "/images/lightshow/5306_REPORTAZ_2025_10_09_UNIS_COMPUTER_BESEDNI_DUM_BRNO_OSLAVA_VYROCI_30LET_UNIS_COMPUTER_A_AXENTA_SA902009.webp",
        "/images/lightshow/5415_REPORTAZ_2025_10_09_UNIS_COMPUTER_BESEDNI_DUM_BRNO_OSLAVA_VYROCI_30LET_UNIS_COMPUTER_A_AXENTA_SA902105.webp",
        "/images/lightshow/5442_REPORTAZ_2025_10_09_UNIS_COMPUTER_BESEDNI_DUM_BRNO_OSLAVA_VYROCI_30LET_UNIS_COMPUTER_A_AXENTA_SA902132.webp",
        "/images/lightshow/5531_REPORTAZ_2025_10_09_UNIS_COMPUTER_BESEDNI_DUM_BRNO_OSLAVA_VYROCI_30LET_UNIS_COMPUTER_A_AXENTA_S9203532.webp",
        "/images/lightshow/5544_REPORTAZ_2025_10_09_UNIS_COMPUTER_BESEDNI_DUM_BRNO_OSLAVA_VYROCI_30LET_UNIS_COMPUTER_A_AXENTA_S9203545.webp",
        "/images/lightshow/5671_REPORTAZ_2025_10_09_UNIS_COMPUTER_BESEDNI_DUM_BRNO_OSLAVA_VYROCI_30LET_UNIS_COMPUTER_A_AXENTA_S9203634.webp",
        "/images/lightshow/5790_REPORTAZ_2025_10_09_UNIS_COMPUTER_BESEDNI_DUM_BRNO_OSLAVA_VYROCI_30LET_UNIS_COMPUTER_A_AXENTA_S9203690.webp",
      ],
    },
  },
  {
    slug: "second-foundation-family-day",
    title: "Second Foundation Family Day",
    type: "Family day",
    description:
      "Celodenní program s vesmírným tématem pro 400 hostů na Pražské náplavce — walking acts, brass band, akrobacie, fire show a LED Cryoman.",
    image: "/images/second-foundation/DSCF4662.webp",
    tags: ["Walking acts", "Brass band", "Fire show", "Akrobacie", "Moderátor", "360° video"],
    detail: {
      subtitle: "Firemní family day pro 400 hostů na Pražské náplavce",
      date: "Září 2023",
      guests: "400 hostů",
      venue: "Pražská náplavka, Praha",
      brief:
        "Klient chtěl zorganizovat celodenní family day s vesmírným tématem — akci, která zabaví děti i dospělé zároveň a vytvoří nezapomenutelnou atmosféru pod otevřeným nebem.",
      solution:
        "Celý den prostupovalo jedno téma — vesmír. Vesmírné walking acts a hostesky v kostýmech korzovaly areálem, žonglér modeloval vesmírné rakety z balónků, face painting maloval planety a galaxie. Brass band Groove Army roztančil celé místo. Moderátor držel dramaturgický oblouk celého dne a 360° video point byl jednou z velmi vytížených atrakcí. Večer gradoval LED Cryomanem a fire show jako finálním vrcholem. Nad rámec programu jsme přes naše partnery zajistili i ozvučení akce — protože pro naše klienty uděláme prostě o krok víc.",
      quote: "400 hostů, celý den, vesmírné téma — a fire show jako finále, na které se nezapomíná.",
      program: [],
      gallery: [
        "/images/second-foundation/DSCF4662.webp",
        "/images/second-foundation/DSCF4704.webp",
        "/images/second-foundation/2023-09-24_1.webp",
        "/images/second-foundation/DSCF4241.webp",
        "/images/second-foundation/DSCF4496.webp",
        "/images/second-foundation/2023-09-24_2.webp",
        "/images/second-foundation/DSCF4569.webp",
        "/images/second-foundation/DSCF4317.webp",
        "/images/second-foundation/2023-09-24_3.webp",
        "/images/second-foundation/DSCF2147.webp",
        "/images/second-foundation/DSCF4874.webp",
        "/images/second-foundation/2023-09-24_4.webp",
        "/images/second-foundation/DSCF4380.webp",
        "/images/second-foundation/DSCF4449.webp",
        "/images/second-foundation/2023-09-24_5.webp",
        "/images/second-foundation/DSCF4643.webp",
        "/images/second-foundation/DSCF4685.webp",
        "/images/second-foundation/2023-09-24_7.webp",
        "/images/second-foundation/DSCF4711.webp",
        "/images/second-foundation/DSCF2371.webp",
        "/images/second-foundation/2023-09-24_8.webp",
        "/images/second-foundation/DSCF4854.webp",
        "/images/second-foundation/DSCF2186.webp",
        "/images/second-foundation/2023-09-24_9.webp",
      ],
      showDesigner: {
        name: "Bára Adamušová",
        photo: "/images/showdesigneri/bara_adamusova.webp",
        bio: "Bára byla show designerkou na místě — starala se o plynulý průběh celého dne, koordinovala umělce a řešila vše operativně přímo na akci.",
      },
    },
  },
  {
    slug: "kasperskehory-mestske-slavnosti",
    title: "Kašperskohorské slavnosti",
    type: "Městská akce",
    description:
      "Program pro městskou slavnost v historickém centru Kašperských Hor — walking acts, divadlo, workshop žonglování a akrobatické vystoupení pro 1 000 návštěvníků.",
    image: "/images/kasperskehory/2025 09 13 - 14 48 17 - 133.webp",
    tags: ["Walking acts", "Divadlo", "Workshop žonglování", "Akrobacie"],
    detail: {
      subtitle: "Doprovodný program pro 1 000 návštěvníků v historickém centru",
      date: "Září 2025",
      guests: "1 000 návštěvníků",
      venue: "Kašperské Hory",
      brief:
        "Město hledalo doprovodný program pro letní slavnosti, který by oživil historické náměstí a dal akci vizuální charakter odpovídající malebné lokalitě.",
      solution:
        "Nasadili jsme walking acts — kostýmované postavy procházely historickým náměstím a přirozeně zapojovaly návštěvníky. Program doplnilo pouliční divadlo, workshop žonglování pro děti i dospělé a akrobatické vystoupení jako vrchol odpoledne.",
      quote: "Historické náměstí jako kulisa, živé postavy jako dekorace — program, který splynul s místem.",
      program: [],
      gallery: [
        "/images/kasperskehory/2025 09 13 - 14 48 17 - 133.webp",
        "/images/kasperskehory/2025 09 13 - 14 49 22 - 136.webp",
        "/images/kasperskehory/2025 09 13 - 17 07 26 - 206.webp",
        "/images/kasperskehory/2025 09 13 - 18 30 23 - 32.webp",
        "/images/kasperskehory/2025 09 13 - 18 30 29 - 34.webp",
        "/images/kasperskehory/2025 09 13 - 18 31 09 - 36.webp",
        "/images/kasperskehory/2025 09 13 - 18 31 20 - 39.webp",
        "/images/kasperskehory/2025 09 13 - 18 31 22 - 40.webp",
      ],
    },
  },
  {
    slug: "wano-gala-vecere",
    title: "WANO Gala Večeře",
    type: "Korporátní akce",
    description:
      "Celovečerní program pro mezinárodní gala večeři 300 hostů v Praze — vzdušná akrobacie a taneční vystoupení v luxusním sálu.",
    image: "/images/wano/BMG_Prague_Day-4-Tue-Galadinner_by-adam-costey-O-101.webp",
    tags: ["Akrobacie", "Taneční show"],
    detail: {
      subtitle: "Mezinárodní gala večeře pro 300 hostů v Praze",
      date: "2024",
      guests: "300 hostů",
      venue: "Praha",
      brief:
        "Mezinárodní organizace WANO pořádala gala večeři pro delegáty z celého světa. Program musel být světové úrovně, respektovat slavnostní atmosféru a naplnit velký sál, aniž by přerušoval networking a proslovy.",
      solution:
        "Navrhli jsme dramaturgii, která respektuje tok slavnostního večera. Vzdušná akrobacie jako hlavní číslo v kulminačním momentu, doplněná elegantními tanečními vystoupeními. Celý program byl koordinován s cateringem a AV produkcí.",
      quote: "300 delegátů z celého světa — a vzdušná akrobacie jako kulminační moment, který překonal jazykové bariéry.",
      program: [],
      gallery: [
        "/images/wano/BMG_Prague_Day-4-Tue-Galadinner_by-adam-costey-O-027.webp",
        "/images/wano/BMG_Prague_Day-4-Tue-Galadinner_by-adam-costey-O-037.webp",
        "/images/wano/BMG_Prague_Day-4-Tue-Galadinner_by-adam-costey-O-101.webp",
        "/images/wano/BMG_Prague_Day-4-Tue-Galadinner_by-adam-costey-O-125.webp",
        "/images/wano/BMG_Prague_Day-4-Tue-Galadinner_by-adam-costey-O-126.webp",
        "/images/wano/BMG_Prague_Day-4-Tue-Galadinner_by-adam-costey-O-127.webp",
        "/images/wano/BMG_Prague_Day-4-Tue-Galadinner_by-adam-costey-O-128_uprava.webp",
        "/images/wano/BMG_Prague_Day-4-Tue-Galadinner_by-adam-costey-O-129.webp",
      ],
    },
  },
  {
    slug: "watroja-firemni-akce",
    title: "Trojský zámek — Historický program",
    type: "Korporátní akce",
    description:
      "Historický program pro firemní akci německého klienta na Trojském zámku — walking acts v roli hostitelů, kejklíři a akrobatické vystoupení pro 800 hostů.",
    image: "/images/watroja/15062024_JTPrag24_559.webp",
    tags: ["Historické walking acts", "Žonglování", "Akrobacie"],
    detail: {
      subtitle: "Firemní akce pro 800 hostů na zámku v pražské Tróji",
      date: "Červen 2024",
      guests: "800 hostů",
      venue: "Zámek v pražské Tróji",
      brief:
        "Německý firemní klient hledal program, který plně využije unikátní prostředí zámku v pražské Tróji a jeho barokních zahrad. Akce měla mít jasné téma a nenásilně vtáhnout hosty do atmosféry místa.",
      solution:
        "Celý program jsme postavili na jediném tématu: hosté přijeli na návštěvu do zámku a my jsme je hostili. Herci v historických kostýmech hráli roli vlastníků zámku — vítali hosty při příchodu, nabízeli občerstvení, provázeli zahradami a přirozeně je zapojovali do atmosféry. Kejklíři a žongléři v roli historických dvorních bavičů hostům předváděli svá umění. Vrcholem večera bylo akrobatické vystoupení v historickém stylu — jako dvorní kejklíři středověkého banketu.",
      quote: "Hosté nepřišli na firemní akci — přijeli na návštěvu do zámku. A my jsme je tam uvítali.",
      program: [],
      gallery: [
        "/images/watroja/15062024_JTPrag24_492.webp",
        "/images/watroja/15062024_JTPrag24_504.webp",
        "/images/watroja/15062024_JTPrag24_527.webp",
        "/images/watroja/15062024_JTPrag24_534.webp",
        "/images/watroja/15062024_JTPrag24_542.webp",
        "/images/watroja/15062024_JTPrag24_559.webp",
        "/images/watroja/15062024_JTPrag24_564.webp",
        "/images/watroja/15062024_JTPrag24_565.webp",
      ],
    },
  },
  {
    slug: "witzenmann-family-day",
    title: "Witzenmann Family Day",
    type: "Family day",
    description:
      "Celodenní Street Circus Festival pro 2 000 hostů v Opavě — cirkusový svět, který propojil děti s dospělými od rána až po ohnivé finále s 11 umělci na scéně.",
    image: "/images/witzenmann/witzenmann-tribalka-1.webp",
    tags: ["Street Circus Festival", "Ohnivá show", "Brass band", "Walking acts", "Bubenický workshop"],
    detail: {
      subtitle: "Firemní family day pro 2 000 hostů v Opavě",
      date: "Červen 2023",
      guests: "2 000 hostů",
      venue: "Opava",
      brief:
        "Firma Witzenmann připravila velký family day u příležitosti 30. výročí — akce musela bavit děti všech věků i dospělé, propojit je dohromady a udržet atmosféru celý den.",
      solution:
        "Celý entertainment jsme postavili na tématu Street Circus Festival. V areálu bylo 5 mini stanovišť s živými vystoupeními — loutkové divadlo, bublinnář, cirkusové představení, workshop žonglování a živé sochy. Mezi diváky procházeli chůdaři, zrcadlové a headless walking acts, květinové víly. Cirkusový stan dal akci vizuální dominantu. Děti sbíraly Witzenmann penízky za aktivity a vyměňovaly je za odměny — propojili jsme zábavu s přemýšlením o hodnotě peněz. Šifrovací hra o zlatý poklad pak přiměla celé rodiny spolupracovat. Pět selfie fotokoutků s vlastním tiskem bylo po celý den obsazených. Na hlavním pódiu vystoupila rumunská brass band jako headliner, bubenický koncert přilákal davy a bubenický workshop je zapojil přímo do akce. Večer zakončila ohnivá show — 11 umělců a bubeníci společně na jednom jevišti. Celou akci dohrával DJ.",
      quote: "11 umělců, bubeníci, oheň — a 2 000 lidí, kteří nevěděli, kam se dřív dívat.",
      program: [],
      showDesigner: {
        name: "Michal Halačka",
        photo: "/images/obchod/michalhalacka.webp",
        bio: "Michal byl show designerem na místě — koordinoval desítky umělců napříč celým areálem, dohlížel na průběh všech stanovišť a řídil dramaturgický oblouk od otevření až po finální ohnivou show.",
      },
      gallery: [
        "/images/witzenmann/witzenmann-tribalka-1.webp",
        "/images/witzenmann/witzenmann-tribalka-2.webp",
        "/images/witzenmann/witzenmann-tribalka-3.webp",
        "/images/witzenmann/witzenmann-tribalka-4.webp",
        "/images/witzenmann/2023_06_10_profeel_witzenmann_30_let-274.webp",
        "/images/witzenmann/2023_06_10_profeel_witzenmann_30_let-275.webp",
        "/images/witzenmann/2023_06_10_profeel_witzenmann_30_let-278.webp",
        "/images/witzenmann/2023_06_10_profeel_witzenmann_30_let-280.webp",
        "/images/witzenmann/2023_06_10_profeel_witzenmann_30_let-283.webp",
        "/images/witzenmann/2023_06_10_profeel_witzenmann_30_let-285.webp",
        "/images/witzenmann/2023_06_10_profeel_witzenmann_30_let-318.webp",
        "/images/witzenmann/2023_06_10_profeel_witzenmann_30_let-320.webp",
        "/images/witzenmann/2023_06_10_profeel_witzenmann_30_let-323.webp",
        "/images/witzenmann/2023_06_10_profeel_witzenmann_30_let-325.webp",
        "/images/witzenmann/2023_06_10_profeel_witzenmann_30_let-328.webp",
        "/images/witzenmann/2023_06_10_profeel_witzenmann_30_let-331.webp",
        "/images/witzenmann/2023_06_10_profeel_witzenmann_30_let-338.webp",
        "/images/witzenmann/2023_06_10_profeel_witzenmann_30_let-342.webp",
        "/images/witzenmann/2023_06_10_profeel_witzenmann_30_let-344.webp",
        "/images/witzenmann/2023_06_10_profeel_witzenmann_30_let-356.webp",
        "/images/witzenmann/2023_06_10_profeel_witzenmann_30_let-361.webp",
        "/images/witzenmann/2023_06_10_profeel_witzenmann_30_let-376.webp",
        "/images/witzenmann/2023_06_10_profeel_witzenmann_30_let-378.webp",
        "/images/witzenmann/2023_06_10_profeel_witzenmann_30_let-395.webp",
        "/images/witzenmann/2023_06_10_profeel_witzenmann_30_let-397.webp",
        "/images/witzenmann/2023_06_10_profeel_witzenmann_30_let-400.webp",
        "/images/witzenmann/2023_06_10_profeel_witzenmann_30_let-404.webp",
        "/images/witzenmann/2023_06_10_profeel_witzenmann_30_let-407.webp",
        "/images/witzenmann/2023_06_10_profeel_witzenmann_30_let-410.webp",
        "/images/witzenmann/2023_06_10_profeel_witzenmann_30_let-413.webp",
      ],
    },
  },
];
