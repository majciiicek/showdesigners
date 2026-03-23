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
    slug: "beats4love",
    title: "Beats for Love",
    type: "Festival",
    description:
      "Doprovodný program pro jeden z největších českých elektronických festivalů — ohnivé, květinové a alien walking acts pro 20 000 návštěvníků.",
    image: "/images/beats4love/514323960_1280871783405571_4616947194946571481_n.webp",
    tags: ["Fire walking acts", "Květinové walking acts", "Alien walking acts"],
    detail: {
      subtitle: "Doprovodný program pro 20 000 návštěvníků v Ostravě",
      date: "2025",
      guests: "20 000 návštěvníků",
      venue: "Beats for Love, Ostrava",
      brief:
        "Organizátoři festivalu hledali doprovodný program, který doplní elektronickou hudbu a vytvoří vizuálně silné momenty mezi pódiemi. Program musel fungovat v exteriéru, ve dne i v noci, a oslovit široké publikum.",
      solution:
        "Na Beats4Love nebyly žádné klasické show — vše stálo na walking acts a jejich herecké přítomnosti. Ohnivé walking acts procházely festivalem a všude kolem sebe přitahovaly pozornost. Květinové ženy s LED růžemi obcházely VIP zónu a živé růže rozdávaly přítomným ženám — reakce předčily očekávání. Alien walking acts obývali space zónu a po setmění bavili návštěvníky svými světelnými efekty. Klíč k úspěchu byl charakter: každá role byla čistě herecká a nesměla se ani na chvilku stát civilní. Celkem 9 umělců doplňovalo atmosféru festivalu — nenápadně, ale nezaměnitelně.",
      quote: "20 000 lidí, tři světy — oheň, květiny a vesmír. Všechno walking acts, žádná show. A přesto nezapomenutelné.",
      program: [],
      showDesigner: {
        name: "Michal Halačka",
        photo: "/images/obchod/michalhalacka.webp",
        bio: "Michal byl show designerem na místě — koordinoval 9 umělců napříč festivalem a dohlížel na to, aby každý charakter zůstal v roli po celou dobu akce.",
      },
      gallery: [
        "/images/beats4love/518228813_1289115189247897_9001348068671658612_n.webp",
        "/images/beats4love/518346991_1289637875862295_5149584555201831834_n.webp",
        "/images/beats4love/514323960_1280871783405571_4616947194946571481_n.webp",
        "/images/beats4love/517062740_1287315082761241_1794878994026850395_n.webp",
        "/images/beats4love/521383584_1295789908580425_3743370139646895029_n.webp",
        "/images/beats4love/515066035_1280872003405549_7023314359884496701_n.webp",
        "/images/beats4love/517160172_1287313889428027_865632768298332395_n.webp",
        "/images/beats4love/522638628_1295785341914215_8445266688160647552_n.webp",
        "/images/beats4love/515248490_1281846076641475_3545357660649189530_n.webp",
        "/images/beats4love/518137249_1289630285863054_1841570846223595874_n.webp",
        "/images/beats4love/521638891_1295790831913666_468567995605328117_n.webp",
        "/images/beats4love/515405640_1147352700763237_8243366955638978700_n.webp",
        "/images/beats4love/518314112_1291990868960329_8994433300064659951_n.webp",
        "/images/beats4love/522720052_1295822821910467_6193967126862211223_n.webp",
        "/images/beats4love/515743289_1283464646479618_3543072411667212634_n.webp",
        "/images/beats4love/519099548_1291977892294960_6067855359277094902_n.webp",
        "/images/beats4love/523786449_1295790578580358_4112649924785802574_n.webp",
        "/images/beats4love/516098530_1147352474096593_6329556014708418711_n.webp",
        "/images/beats4love/520574965_1290558052436944_8308382296754324717_n.webp",
        "/images/beats4love/IMG_4355.webp",
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
    tags: ["Walking acts", "Mirror couple"],
    detail: {
      subtitle: "Doprovodný program pro 1 000 návštěvníků v historickém centru",
      date: "Září 2025",
      guests: "1 000 návštěvníků",
      venue: "Kašperské Hory",
      brief:
        "Město hledalo doprovodný program pro letní slavnosti, který by oživil historické náměstí a dal akci vizuální charakter odpovídající malebné lokalitě.",
      solution:
        "Nasadili jsme mirror couple walking acts — stříbrné kostýmy krásně kontrastovaly s historickou architekturou náměstí. Program fungoval jako živá dekorace prostoru i jako interaktivní zážitek pro návštěvníky.",
      quote: "Historické náměstí jako kulisa, stříbrné postavy jako živá dekorace — program, který splynul s místem.",
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
    title: "Watroja — Firemní akce",
    type: "Korporátní akce",
    description:
      "Program pro firemní akci 800 hostů v Trojském zámku — historické walking acts v barokních kostýmech ladící s prostředím.",
    image: "/images/watroja/15062024_JTPrag24_559.webp",
    tags: ["Walking acts", "Historické kostýmy"],
    detail: {
      subtitle: "Firemní akce pro 800 hostů v Trojském zámku",
      date: "Červen 2024",
      guests: "800 hostů",
      venue: "Trojský zámek, Praha",
      brief:
        "Klient hledal program, který bude ladit s výjimečným prostředím Trojského zámku a jeho barokními zahradami. Walking acts musely být elegantní, nenápadné a vyvolávat atmosféru doby.",
      solution:
        "Vybrali jsme historické walking acts v autentických barokních kostýmech — páry v dobovém oblečení procházely zahradami a sály, přirozeně splývaly s prostředím a zároveň přitahovaly pozornost hostů.",
      quote: "Barokní zahrady, 800 hostů, dobové kostýmy — entertainment jako součást architektury místa.",
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
      "Celodenní program pro 2 000 hostů v Opavě — dětský program, bubliny, brass band a artistika pro firemní family day.",
    image: "/images/witzenmann/witzenmann-tribalka-1.webp",
    tags: ["Dětský program", "Brass band", "Artistika"],
    detail: {
      subtitle: "Firemní family day pro 2 000 hostů v Opavě",
      date: "Červen 2023",
      guests: "2 000 hostů",
      venue: "Opava",
      brief:
        "Firma Witzenmann připravila velký family day u příležitosti výročí — akce musela bavit děti všech věků i dospělé, probíhat celý den a vytvořit přátelskou, festivalovou atmosféru.",
      solution:
        "Sestavili jsme celodenní program s několika zónami. Pro děti artistika, bubliny a interaktivní program. Pro dospělé brass band a taneční vystoupení. Dramaturgický oblouk zajistil, že atmosféra rostla celý den až k závěrečnému finále.",
      quote: "2 000 hostů, celý den, všechny věkové kategorie — program, který bavil od rána do večera.",
      program: [],
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
