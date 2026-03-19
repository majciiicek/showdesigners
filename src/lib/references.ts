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
      "Program pro 30. výročí firmy — světelná show jako hlavní číslo, doplněná párovou akrobacií a dekorativními walking acts po celou dobu večeře.",
    image:
      "/images/lightshow/5250_REPORTAZ_2025_10_09_UNIS_COMPUTER_BESEDNI_DUM_BRNO_OSLAVA_VYROCI_30LET_UNIS_COMPUTER_A_AXENTA_S9203495.webp",
    tags: ["Lightshow", "Párová akrobacie", "Walking acts"],
    detail: {
      subtitle: "Galavečer pro 120 hostů v Besedním domě v Brně",
      date: "Říjen 2025",
      guests: "120 hostů",
      venue: "Besední dům, Brno",
      brief:
        "Klient slavil 30 let existence — výjimečné jubileum, které si zasluhovalo víc než standardní večírek. Chtěli program, který bude skutečně reprezentativní, vstřičný vůči smíšenému publiku (management i technické týmy) a zakončí večer silným emocionálním momentem. Zároveň bylo důležité, aby entertainment nebyl v konfliktu se slavnostní atmosférou a proslovy.",
      solution:
        "Navrhli jsme dramaturgii, která respektuje tok večera. V první části večeře jsme nasadili elegantní dekorativní walking acts — hosté je mohli volně sledovat mezi stoly, aniž by přerušovaly konverzace. Hlavní číslo večera — světelná show synchronizovaná na vlastní soundtrack — bylo zařazeno přesně po poslední zdravici, jako přirozené vyvrcholení. Celý program jsme koordinovali s cateringem a AV technikou, takže večer plynul bez záseků.",
      program: [
        {
          time: "19:00",
          act: "Příchod hostů",
          note: "Dekorativní walking acts v hale — elegantní vizuální doprovod recepce",
        },
        {
          time: "19:30",
          act: "Slavnostní večeře",
          note: "Průběžné walking acts mezi stoly, diskrétní — nevyrušují proslovy",
        },
        {
          time: "21:00",
          act: "Proslovy a poděkování",
          note: "Entertainment pauzuje, přebírá moderátor",
        },
        {
          time: "21:30",
          act: "Hlavní číslo: Světelná show",
          note: "Synchronizovaná LED show s vlastním soundtrackem, 8 minut — kulminující moment večera",
        },
        {
          time: "21:45",
          act: "Párová vzdušná akrobacie",
          note: "Intimní závěrečné číslo jako přechod do volné zábavy",
        },
        {
          time: "22:00",
          act: "Volná zábava",
          note: "Živá hudba, konec dramaturgického programu",
        },
      ],
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
    tags: ["Walking acts", "Brass band", "Fire show", "Akrobacie", "Family day"],
    detail: {
      subtitle: "Firemní family day pro 400 hostů na Pražské náplavce",
      date: "Září 2023",
      guests: "400 hostů",
      venue: "Pražská náplavka, Praha",
      brief:
        "Klient chtěl zorganizovat celodenní family day s vesmírným tématem — akci, která zabaví děti i dospělé zároveň a vytvoří nezapomenutelnou atmosféru pod otevřeným nebem.",
      solution:
        "Navrhli jsme celodenní dramaturgii s vesmírným leitmotivem. Přes den procházely areálem vesmírné walking acts a hostesky, brass band Groove Army roztančil celé místo, pro děti byl připraven žonglér s balónky a face painting. Večer gradoval LED Cryomanem a fire show jako finálním vrcholem celé akce.",
      program: [
        { time: "Celý den", act: "Vesmírné walking acts", note: "Vesmírné víly a hostesky v kostýmech mezi hosty" },
        { time: "Celý den", act: "Vesmírné hostesky", note: "Tematické kostýmy, interakce s hosty" },
        { time: "Celý den", act: "Dětský program", note: "Žonglér s balónky, face painting, bubliny" },
        { time: "Odpoledne", act: "Groove Army — brass band", note: "Mobilní brass band roztančil celý areál" },
        { time: "Večer", act: "LED Cryoman", note: "Světelný efektní výstup jako přechod do finále" },
        { time: "Závěr", act: "Fire show", note: "Finální velké číslo — kulminace celého dne" },
      ],
      gallery: [
        "/images/second-foundation/DSCF4241.webp",
        "/images/second-foundation/2023-09-24_6-uprava.webp",
        "/images/second-foundation/DSCF4662.webp",
        "/images/second-foundation/DSCF4704.webp",
        "/images/second-foundation/DSCF4496.webp",
        "/images/second-foundation/DSCF4569.webp",
        "/images/second-foundation/DSCF4317.webp",
        "/images/second-foundation/DSCF2147.webp",
        "/images/second-foundation/DSCF4874.webp",
      ],
      showDesigner: {
        name: "Bára",
        bio: "Bára má na starosti firemní akce a family days. Její silná stránka je práce s tématem — dokáže z každého zadání vytáhnout příběh, který baví děti i dospělé zároveň.",
      },
    },
  },
  {
    slug: "beats4love",
    title: "Beats for Love",
    type: "Festival",
    description:
      "Doprovodný program pro jeden z největších českých elektronických festivalů — fire show a tribal walking acts pro 20 000 návštěvníků.",
    image: "/images/beats4love/514323960_1280871783405571_4616947194946571481_n.webp",
    tags: ["Fire show", "Walking acts", "Festival"],
    detail: {
      subtitle: "Doprovodný program pro 20 000 návštěvníků v Ostravě",
      date: "2025",
      guests: "20 000 návštěvníků",
      venue: "Beats for Love, Ostrava",
      brief:
        "Organizátoři festivalu hledali doprovodný program, který doplní elektronickou hudbu a vytvoří vizuálně silné momenty mezi pódiemi. Program musel fungovat v exteriéru, ve dne i v noci, a oslovit široké publikum.",
      solution:
        "Nasadili jsme fire show s tribal tematikou — silné vizuální číslo ideální pro festivalové prostředí. Walking acts v originálních kostýmech procházely mezi návštěvníky a vytvářely organické, neskriptované momenty po celý den.",
      program: [
        { time: "Celý den", act: "Tribal walking acts", note: "Kostýmované postavy mezi návštěvníky — interakce, fotky, atmosféra" },
        { time: "Večer", act: "Fire show", note: "Hlavní vizuální číslo — fire breathing, fire spinning, tribal choreografie" },
      ],
      gallery: [
        "/images/beats4love/514323960_1280871783405571_4616947194946571481_n.webp",
        "/images/beats4love/514533974_1280873206738762_2765605584119081362_n.webp",
        "/images/beats4love/515066035_1280872003405549_7023314359884496701_n.webp",
        "/images/beats4love/515092361_1147352534096587_4320891036437574728_n.webp",
        "/images/beats4love/515248490_1281846076641475_3545357660649189530_n.webp",
        "/images/beats4love/515273131_1147352510763256_4167051802346195294_n.webp",
        "/images/beats4love/515299455_1281844249974991_9089787568378980497_n.webp",
        "/images/beats4love/515405640_1147352700763237_8243366955638978700_n.webp",
      ],
    },
  },
  {
    slug: "kasperskehory-mestske-slavnosti",
    title: "Kašperskohorské slavnosti",
    type: "Městská akce",
    description:
      "Program pro městskou slavnost v historickém centru Kašperských Hor — mirror couple walking acts a doprovodný program pro 1 000 návštěvníků.",
    image: "/images/kasperskehory/2025 09 13 - 14 48 17 - 133.webp",
    tags: ["Walking acts", "Mirror couple", "Venkovní akce"],
    detail: {
      subtitle: "Doprovodný program pro 1 000 návštěvníků v historickém centru",
      date: "Září 2025",
      guests: "1 000 návštěvníků",
      venue: "Kašperské Hory",
      brief:
        "Město hledalo doprovodný program pro letní slavnosti, který by oživil historické náměstí a dal akci vizuální charakter odpovídající malebné lokalitě.",
      solution:
        "Nasadili jsme mirror couple walking acts — stříbrné kostýmy krásně kontrastovaly s historickou architekturou náměstí. Program fungoval jako živá dekorace prostoru i jako interaktivní zážitek pro návštěvníky.",
      program: [
        { time: "Celý den", act: "Mirror couple walking acts", note: "Stříbrné kostýmy, interakce s návštěvníky, fotky" },
        { time: "Dopoledne / odpoledne", act: "Doprovodný program", note: "Průchod areálem, animace prostoru" },
      ],
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
    tags: ["Akrobacie", "Taneční show", "Gala večeře"],
    detail: {
      subtitle: "Mezinárodní gala večeře pro 300 hostů v Praze",
      date: "2024",
      guests: "300 hostů",
      venue: "Praha",
      brief:
        "Mezinárodní organizace WANO pořádala gala večeři pro delegáty z celého světa. Program musel být světové úrovně, respektovat slavnostní atmosféru a naplnit velký sál, aniž by přerušoval networking a proslovy.",
      solution:
        "Navrhli jsme dramaturgii, která respektuje tok slavnostního večera. Vzdušná akrobacie jako hlavní číslo v kulminačním momentu, doplněná elegantními tanečními vystoupeními. Celý program byl koordinován s cateringem a AV produkcí.",
      program: [
        { time: "Recepce", act: "Walking acts", note: "Elegantní uvítání hostů při příchodu" },
        { time: "Večeře", act: "Taneční vystoupení", note: "Jemný doprovodný program během servírování" },
        { time: "Kulminace", act: "Vzdušná akrobacie", note: "Hlavní číslo večera — vrchol dramaturgického oblouku" },
      ],
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
    title: "Watroja — Firemní akce",
    type: "Korporátní akce",
    description:
      "Program pro firemní akci 800 hostů v Trojském zámku — historické walking acts v barokních kostýmech ladící s prostředím.",
    image: "/images/watroja/15062024_JTPrag24_559.webp",
    tags: ["Walking acts", "Historické kostýmy", "Zámek"],
    detail: {
      subtitle: "Firemní akce pro 800 hostů v Trojském zámku",
      date: "Červen 2024",
      guests: "800 hostů",
      venue: "Trojský zámek, Praha",
      brief:
        "Klient hledal program, který bude ladit s výjimečným prostředím Trojského zámku a jeho barokními zahradami. Walking acts musely být elegantní, nenápadné a vyvolávat atmosféru doby.",
      solution:
        "Vybrali jsme historické walking acts v autentických barokních kostýmech — páry v dobovém oblečení procházely zahradami a sály, přirozeně splývaly s prostředím a zároveň přitahovaly pozornost hostů.",
      program: [
        { time: "Příchod hostů", act: "Barokní walking acts", note: "Uvítání v zahradách zámku — elegantní, tematické" },
        { time: "Celý večer", act: "Historické kostýmy", note: "Průchod sály a terasami, interakce s hosty" },
      ],
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
      "Celodenní program pro 2 000 hostů v Opavě — dětský program, bubliny, brass band a artistika pro firemní family day.",
    image: "/images/witzenmann/witzenmann-tribalka-1.webp",
    tags: ["Family day", "Dětský program", "Brass band", "Artistika"],
    detail: {
      subtitle: "Firemní family day pro 2 000 hostů v Opavě",
      date: "Červen 2023",
      guests: "2 000 hostů",
      venue: "Opava",
      brief:
        "Firma Witzenmann připravila velký family day u příležitosti výročí — akce musela bavit děti všech věků i dospělé, probíhat celý den a vytvořit přátelskou, festivalovou atmosféru.",
      solution:
        "Sestavili jsme celodenní program s několika zónami. Pro děti artistika, bubliny a interaktivní program. Pro dospělé brass band a taneční vystoupení. Dramaturgický oblouk zajistil, že atmosféra rostla celý den až k závěrečnému finále.",
      program: [
        { time: "Celý den", act: "Dětský program", note: "Bubliny, artistika, interaktivní aktivity" },
        { time: "Celý den", act: "Brass band", note: "Mobilní hudební doprovod po celém areálu" },
        { time: "Odpoledne", act: "Taneční vystoupení", note: "Show pro celou rodinu na hlavním pódiu" },
        { time: "Závěr", act: "Finální show", note: "Vyvrcholení celého dne" },
      ],
      gallery: [
        "/images/witzenmann/2023_06_10_profeel_witzenmann_30_let-274.webp",
        "/images/witzenmann/2023_06_10_profeel_witzenmann_30_let-278.webp",
        "/images/witzenmann/2023_06_10_profeel_witzenmann_30_let-318.webp",
        "/images/witzenmann/2023_06_10_profeel_witzenmann_30_let-325.webp",
        "/images/witzenmann/2023_06_10_profeel_witzenmann_30_let-331.webp",
        "/images/witzenmann/2023_06_10_profeel_witzenmann_30_let-356.webp",
        "/images/witzenmann/2023_06_10_profeel_witzenmann_30_let-395.webp",
        "/images/witzenmann/witzenmann-tribalka-1.webp",
      ],
    },
  },
];
