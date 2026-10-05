"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ProjectList, type ProjectCard } from "@/components/project-list";
import githubProfileIcon from "@/assest/github.png";
import linkedinProfileIcon from "@/assest/linkedin.png";
import myPhoto from "@/assest/my-photo.png";

type Locale = "en" | "ar";
type SectionId = "home" | "skills" | "projects" | "websites";

const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/khaled-alwaked", src: linkedinProfileIcon },
  { label: "GitHub", href: "https://github.com/engKhaledalwaked", src: githubProfileIcon },
] as const;

const projectVideoEmbeds = {
  vSafety: "https://www.youtube.com/embed/CY1cl1wyc2A?rel=0",
  taskFlow: "https://www.youtube.com/embed/zjwj2abCUGg?rel=0",
  challenger: "https://www.youtube.com/embed/0G4Sf1w9_bQ?rel=0",
  taqsi: "https://www.youtube.com/embed/bEAN-scSSsQ?rel=0",
  bmi: "https://www.youtube.com/embed/tHY8ZVe-_Ys?rel=0",
  casher: "https://www.youtube.com/embed/r0LxGBrgS4U?rel=0",
} as const;

const projectCardsByLocale: Record<Locale, ProjectCard[]> = {
  en: [
    {
      title: "V-Safety Manager",
      category: "React + Next.js",
      span: "large",
      accent: "#ff4fd8",
      summary:
        "Many vehicle owners in Saudi Arabia are exposed to overpricing and fraud by untrusted repair and maintenance channels. V-Safety Manager addresses this by providing a government-aligned digital experience with fixed pricing and verified inspection centers in one trusted platform.",
      youtubeUrl: projectVideoEmbeds.vSafety,
      details: [
        "Replaces scattered workshop offers with one verified channel, reducing pricing ambiguity and fraud exposure.",
        "Connects users to state-documented inspection centers across Saudi Arabia through guided booking and verification flows.",
        "Enforces fixed, visible service pricing before commitment, improving trust and cost predictability for owners and families.",
        "Built as 27 validated client routes and 21 production pages to support secure, end-to-end operation at scale.",
        "Safer maintenance decisions, fewer exploitation scenarios, and a more reliable service journey for vehicle owners in the Kingdom.",
      ],
    },
    {
      title: "Masken Platform",
      category: "Web + Mobile + Supabase",
      span: "medium",
      accent: "#22d3ee",
      status: "inProgress",
      summary:
        "In Jordan, thousands of university students move between governorates every year and struggle to find suitable housing by price, location, and space. Masken solves this by unifying student housing, tourist stays, and regular rentals in one trusted platform, while giving landlords a single dashboard to manage units, leases, and maintenance.",
      details: [
        "Helps students compare options faster using practical filters for budget, area, and location near universities.",
        "Expands demand channels by serving tourists looking for hotels, apartments, or short-stay rooms at competitive prices in specific areas.",
        "Gives everyday renters one place to discover better-value homes instead of fragmented listings and manual back-and-forth.",
        "Enables landlords to manage units, leases, maintenance, and tenant communication from one dashboard instead of scattered calls and WhatsApp messages.",
      ],
    },
    {
      title: "Challenger Platform",
      category: "Gaming Cafe Ops",
      span: "medium",
      accent: "#6ee7ff",
      summary:
        "Gaming cafes often struggle with device booking because most cashier tools are difficult for staff and do not offer precise reservation control. Challenger solves this with a dedicated, accurate booking-management section built for real day-to-day floor operations.",
      youtubeUrl: projectVideoEmbeds.challenger,
      details: [
        "Gives teams a clear booking workflow for device allocation and session control, reducing reservation conflicts and manual corrections.",
        "Includes a complete Sales Report page with save-and-return capability, so managers can review reports anytime without rebuilding data.",
        "Removes heavy dependence on Excel sheets by keeping operational records inside the app for faster daily follow-up.",
        "Less staff friction, quicker shift handling, and more reliable reporting for gaming-cafe operations.",
      ],
    },
    {
      title: "Task Flow",
      category: "Task Management + Habit Tracking",
      span: "medium",
      accent: "#38bdf8",
      summary:
        "Most task apps are either too shallow or too monotonous, usually designed around a single use case. Task Flow solves this by combining detailed task tracking, smart prioritization, and goal-based organization with a motivating habit system in one focused experience.",
      youtubeUrl: projectVideoEmbeds.taskFlow,
      details: [
        "Enables structured planning by organizing tasks through priority, type, and purpose, helping users act faster with less mental overload.",
        "Includes a dedicated habit-tracking module with daily score accumulation to reinforce consistency and healthy routine-building.",
        "Turns progress into motivation through visible streak and score mechanics that reward sustained execution.",
        "Better retention and higher day-to-day goal completion through clarity, structure, and behavioral motivation.",
        "Planned weekly, monthly, and yearly leaderboards will add social competition to push long-term commitment even further.",
      ],
    },
    {
      title: "Weather App",
      category: "Flutter Weather",
      span: "medium",
      accent: "#93c5fd",
      summary:
        "Many weather apps require too many steps before users reach a decision. This app streamlines access to current conditions and forecasts with resilient data handling so users can act quickly in changing conditions.",
      youtubeUrl: projectVideoEmbeds.taqsi,
      details: [
        "Offers 3 fast entry paths (current location, city search, favorites) to reduce lookup friction.",
        "Provides hourly insights plus a 7-day forecast view for immediate and short-term planning decisions.",
        "Faster decision-making with lower drop-off risk when connectivity is unstable.",
      ],
    },
    {
      title: "BMI Calculator",
      category: "Flutter Health",
      span: "small",
      accent: "#f59e0b",
      summary:
        "Health tracking tools often fail when input is confusing or feedback is unclear. This BMI app simplifies data entry and interpretation, making regular self-check routines easier to sustain.",
      youtubeUrl: projectVideoEmbeds.bmi,
      details: [
        "Supports 2 unit systems (metric and imperial) to reduce entry mistakes across different user regions.",
        "Visualizes outcomes across 4 BMI ranges with an animated gauge and keeps historical readings for progress awareness.",
        "Clearer repeat-use experience that encourages ongoing self-tracking behavior.",
      ],
    },
    {
      title: "Casher POS System",
      category: "Flutter Commerce",
      span: "medium",
      accent: "#8bffb0",
      summary:
        "Retail checkout lines slow down when invoicing and printer handling depend on repeated manual setup. Casher centralizes selling, invoicing, and thermal printing so cashiers can complete bills with fewer interruptions.",
      youtubeUrl: projectVideoEmbeds.casher,
      details: [
        "Printer selection is done once, then reused with auto-connect on next launches, reducing repeated setup at the counter.",
        "Moves invoice printing from a 20+ line integration pattern to a single service call for faster feature delivery and maintenance.",
        "Faster checkout flow with lower cashier friction during peak billing windows.",
      ],
    },
  ],
  ar: [
    {
      title: "V-Safety Manager",
      category: "React + Next.js",
      span: "large",
      accent: "#ff4fd8",
      summary:
        "كثير من أصحاب المركبات في السعودية يتعرضون للاستغلال ورفع الأسعار من جهات صيانة غير موثوقة. V-Safety Manager يحل هذه المشكلة عبر منصة رقمية موثقة على مستوى الجهات الحكومية، تجمع التسعير الثابت ومراكز الفحص المعتمدة في تجربة واحدة موثوقة.",
      youtubeUrl: projectVideoEmbeds.vSafety,
      details: [
        "ينقل المستخدم من خيارات عشوائية بين الورش إلى قناة موثقة واحدة، مما يقلل تضارب الأسعار ومخاطر النصب.",
        "يربط أصحاب المركبات بمراكز فحص موثقة ومعتمدة على مستوى المملكة العربية السعودية ضمن تدفق حجز واضح.",
        "يعرض اسعارا ثابتة وواضحة قبل إكمال الطلب، ما يرفع الثقة ويقلل مفاجآت التكلفة على العميل.",
        "مبني عبر 27 مسارا معتمدا للعميل و21 شاشة إنتاجية فعلية لضمان تشغيل متكامل وآمن.",
        "قرارات صيانة أكثر أمانا، حالات استغلال أقل، وتجربة خدمة موثوقة لأصحاب المركبات في المملكة.",
      ],
    },
    {
      title: "منصة Masken",
      category: "ويب + موبايل + Supabase",
      span: "medium",
      accent: "#22d3ee",
      status: "inProgress",
      summary:
        "في الأردن، آلاف الطلاب ينتقلون بين المحافظات للدراسة ويواجهون صعوبة في إيجاد سكن مناسب بالسعر والموقع والمساحة. منصة Masken تحل ذلك عبر جمع سكن الطلاب، والإيجارات اليومية للسياح، وإيجارات السكن العادي في منصة واحدة موثوقة، مع لوحة إدارة موحدة للملاك لإدارة الشقق والعقود والإيجارات والصيانات.",
      details: [
        "يسرع قرار الطالب عبر فلاتر واضحة للسعر، المنطقة، والقرب من الجامعة بدل البحث العشوائي الطويل.",
        "يفتح قناة طلب إضافية للسياح الباحثين عن فنادق أو شقق أو غرف سياحية بأسعار منافسة ومواقع محددة.",
        "يوفر للمستأجر العادي مقارنة أفضل للخيارات السكنية للوصول إلى بيت مناسب بالسعر والمكان المفضل.",
        "يدير الشقق والعقود والإيجارات والصيانات والتواصل مع المستأجرين من مكان واحد بدل الاتصالات ورسائل الواتس المتفرقة.",
      ],
    },
    {
      title: "منصة Challenger",
      category: "إدارة كافيهات الألعاب",
      span: "medium",
      accent: "#6ee7ff",
      summary:
        "مشكلة مقاهي الألعاب أن إدارة حجز الأجهزة تكون صعبة لأن أغلب تطبيقات الكاشير متعبة للعاملين ولا تعطي دقة كافية في تنظيم الحجوزات. منصة Challenger تعالج ذلك عبر قسم مخصص لإدارة الحجوزات بشكل دقيق وعملي يناسب التشغيل اليومي.",
      youtubeUrl: projectVideoEmbeds.challenger,
      details: [
        "يوفر تدفقا واضحا لحجز الأجهزة وإدارة الجلسات، مما يقلل تعارضات الحجوزات والتعديلات اليدوية أثناء الضغط.",
        "يتضمن صفحة كاملة لتقرير المبيعات مع إمكانية حفظ التقارير والرجوع لها في أي وقت دون إعادة العمل من الصفر.",
        "يقلل الاعتماد على شيتات وجداول Excel عبر حفظ بيانات التشغيل داخل التطبيق بشكل منظم.",
        "وقت أقل في المتابعة اليومية، جهد تشغيلي أقل على الفريق، وموثوقية أعلى في التقارير والإدارة.",
      ],
    },
    {
      title: "Task Flow",
      category: "إدارة المهام + تتبع العادات",
      span: "medium",
      accent: "#38bdf8",
      summary:
        "المشكلة أن كثيراً من تطبيقات المهام تكون سطحية أو مملة وتركز على هدف واحد فقط. Task Flow يحل هذا عبر تجربة متكاملة تجمع تتبع المهام بالتفصيل، ترتيب الأولويات، وتصنيف المهام حسب نوعها وهدفها، مع نظام تحفيزي واضح للاستمرار.",
      youtubeUrl: projectVideoEmbeds.taskFlow,
      details: [
        "يساعد المستخدم على تنظيم يومه بوضوح عبر ترتيب المهام حسب الأولوية والنوع والهدف بدلاً من قوائم عشوائية.",
        "يتضمن قسماً مخصصاً لتتبع العادات وبناء عادات صحية جديدة مع نظام score يومي يزيد مع الاستمرارية.",
        "يحوّل الانضباط إلى تجربة محفزة من خلال تتبع النقاط اليومية وإظهار التقدم بشكل مستمر.",
        "إنجاز أعلى للأهداف اليومية واستمرارية أفضل لأن النظام يجمع بين التنظيم والتحفيز السلوكي.",
        "عند الإطلاق الكامل ستتوفر Leaderboards أسبوعية وشهرية وسنوية لتحفيز المستخدمين على المنافسة والاستمرار.",
      ],
    },
    {
      title: "تطبيق الطقس",
      category: "Flutter Weather",
      span: "medium",
      accent: "#93c5fd",
      summary:
        "الكثير من تطبيقات الطقس تحتاج خطوات كثيرة قبل الوصول لقرار. هذا التطبيق يختصر الوصول للبيانات الحالية والتوقعات مع معالجة مرنة للاتصال حتى يتخذ المستخدم قرارا أسرع.",
      youtubeUrl: projectVideoEmbeds.taqsi,
      details: [
        "يقدم 3 طرق سريعة للوصول (الموقع الحالي، البحث عن مدينة، المفضلة) لتقليل وقت الوصول للمعلومة.",
        "يوفر توقعات ساعية مع عرض 7 أيام لدعم قرارات فورية وقصيرة المدى.",
        "قرارات أسرع مع تقليل احتمال الانسحاب عند ضعف الشبكة.",
      ],
    },
    {
      title: "حاسبة BMI",
      category: "Flutter Health",
      span: "small",
      accent: "#f59e0b",
      summary:
        "أدوات المتابعة الصحية تفشل عندما يكون الإدخال معقدا أو التفسير غير واضح. هذا التطبيق يبسط إدخال البيانات وقراءة النتيجة، مما يسهل الالتزام بالمتابعة الدورية.",
      youtubeUrl: projectVideoEmbeds.bmi,
      details: [
        "يدعم نظامي قياس (متري وإمبريالي) لتقليل أخطاء الإدخال بين فئات المستخدمين.",
        "يعرض النتيجة ضمن 4 نطاقات BMI بمؤشر متحرك مع حفظ سجل القراءات لمتابعة التقدم.",
        "تجربة أوضح للاستخدام المتكرر تشجع الاستمرارية في المتابعة الصحية.",
      ],
    },
    {
      title: "Casher POS System",
      category: "Flutter Commerce",
      span: "medium",
      accent: "#8bffb0",
      summary:
        "طوابير الكاشير تتباطأ عندما تكون الفوترة والطباعة الحرارية معتمدة على إعداد يدوي متكرر. Casher يجمع البيع والفوترة والطباعة في تدفق واحد لتسريع الإنجاز وتقليل الانقطاع.",
      youtubeUrl: projectVideoEmbeds.casher,
      details: [
        "يتم اختيار الطابعة مرة واحدة ثم إعادة الاتصال تلقائيا في التشغيلات التالية، مما يقلل وقت الإعداد على نقطة البيع.",
        "ينقل الطباعة من نمط تكامل يتجاوز 20 سطرا إلى استدعاء خدمة واحد، ما يسرع التطوير والصيانة.",
        "سرعة أعلى في الإنهاء عند الكاشير واحتكاك أقل خلال فترات الذروة.",
      ],
    },
  ],
};

const websiteCardsByLocale: Record<Locale, ProjectCard[]> = {
  en: [
    {
      title: "Arab Dental Center",
      site: { url: "https://arab-dental.vercel.app", image: "/projects/arab-dental.jpg" },
      category: "Dental center · Shmeisani, Amman",
      status: "redesign",
      summary:
        "Jordan’s first comprehensive dental center had an outdated website that buried its eight departments, eleven dentists and emergency service in cluttered pages. I rebuilt it as a fast bilingual site that turns a visit into a booking.",
      details: [
        "Choosing a department or a doctor carries straight into a booking form that opens WhatsApp with a ready-made message.",
        "Draggable before/after sliders for real cases, a doctor directory filtered by specialty and a photo tour of the center.",
        "Emergency hours up front, a sticky call/book bar on mobile and a dedicated path for patients travelling from abroad.",
      ],
    },
    {
      title: "Lucca Steakhouse",
      site: { url: "https://lucca-steakhouse.vercel.app", image: "/projects/lucca.jpg" },
      category: "Steakhouse · Jabal Amman",
      status: "newSite",
      summary:
        "A Jabal Amman steakhouse with 3,600+ Google reviews was relying on Instagram and Facebook alone, with its menu available only as an old photo. I designed a site that sells the experience and takes reservations.",
      details: [
        "Interactive butcher’s chart: hover any cut to see where it comes from, with weights taken from the house menu.",
        "Reservation form with occasion and seating choices that reaches the restaurant’s WhatsApp as a structured request.",
        "A dark walnut-and-oxblood identity with Arabic and English typography chosen to match the room.",
      ],
    },
    {
      title: "Sicilia",
      site: { url: "https://sicilia-livid.vercel.app", image: "/projects/sicilia.jpg" },
      category: "Italian restaurant · Irbid",
      status: "newSite",
      summary:
        "A popular Italian restaurant in Irbid (4.7 on Google, 1,000+ reviews) had no website, so guests pieced the menu together from Google Maps photos. I built one around a full priced menu and direct bookings.",
      details: [
        "Complete menu with medium and large prices in JD, organized by category so guests can decide before they arrive.",
        "Identity drawn from the restaurant itself: its majolica tiles redrawn as an SVG band, arches taken from its logo and décor.",
        "Swipeable signature dishes, a photo gallery and a WhatsApp booking form with a sticky call/book bar on mobile.",
      ],
    },
    {
      title: "STEEL Restaurant & Cafe",
      site: { url: "https://steel-cafe.vercel.app", image: "/projects/steel.jpg" },
      category: "Restaurant & café · Irbid",
      status: "newSite",
      summary:
        "An Irbid restaurant and café with 46K Facebook followers but no website of its own. I designed one that covers everything from breakfast to late dinner and turns events into enquiries.",
      details: [
        "Menu organized by meal, from Levantine breakfast through to mains and desserts.",
        "Events section for birthdays, Ramadan iftars and corporate lunches, each leading to a quote request.",
        "Booking form with booking type, indoor or outdoor seating and group size, sent to WhatsApp in one tap.",
      ],
    },
  ],
  ar: [
    {
      title: "المركز العربي لطب الأسنان",
      site: { url: "https://arab-dental.vercel.app", image: "/projects/arab-dental.jpg" },
      category: "مركز أسنان · الشميساني، عمّان",
      status: "redesign",
      summary:
        "أول مركز متخصص شامل لطب الأسنان في الأردن كان موقعه قديماً، يُخفي أقسامه الثمانية وأطباءه الأحد عشر وخدمة الطوارئ خلف صفحات مزدحمة. أعدت بناءه كموقع سريع بالعربي والإنجليزي يحوّل الزيارة إلى حجز.",
      details: [
        "اختيار القسم أو الطبيب ينتقل مباشرة إلى نموذج حجز يفتح واتساب برسالة جاهزة.",
        "شرائح مقارنة قبل/بعد قابلة للسحب لحالات حقيقية، ودليل أطباء مصنّف حسب التخصص، وجولة مصوّرة داخل المركز.",
        "ساعات الطوارئ في الواجهة، وشريط اتصال وحجز ثابت على الهاتف، ومسار مخصص للمرضى القادمين من خارج الأردن.",
      ],
    },
    {
      title: "Lucca Steakhouse",
      site: { url: "https://lucca-steakhouse.vercel.app", image: "/projects/lucca.jpg" },
      category: "مطعم ستيك · جبل عمّان",
      status: "newSite",
      summary:
        "مطعم ستيك في جبل عمّان بأكثر من 3,600 مراجعة على Google كان يعتمد على إنستغرام وفيسبوك فقط، وقائمته مجرد صورة قديمة. صممت له موقعاً يعرض التجربة ويستقبل الحجوزات.",
      details: [
        "مخطط جزّار تفاعلي: مرّر على أي قطعة لترى موقعها على الذبيحة مع أوزانها من قائمة المطعم.",
        "نموذج حجز يحدد المناسبة ومكان الجلوس، ويصل إلى واتساب المطعم كطلب منظّم.",
        "هوية داكنة بألوان خشب الجوز والأحمر العميق، وخطوط عربية وإنجليزية تناسب أجواء المكان.",
      ],
    },
    {
      title: "مطعم صقلية",
      site: { url: "https://sicilia-livid.vercel.app", image: "/projects/sicilia.jpg" },
      category: "مطعم إيطالي · إربد",
      status: "newSite",
      summary:
        "مطعم إيطالي معروف في إربد (تقييم 4.7 على Google بأكثر من 1,000 مراجعة) بلا موقع، والزبون يجمع القائمة من صور Google Maps. بنيت له موقعاً يرتكز على قائمة كاملة بالأسعار وحجز مباشر.",
      details: [
        "قائمة كاملة بأسعار الحجم الوسط والكبير بالدينار، مرتّبة حسب الأصناف ليقرر الزبون قبل وصوله.",
        "هوية مستوحاة من المطعم نفسه: بلاط المايوليكا مرسوم كشريط SVG، وشكل القوس من شعاره وديكوره.",
        "أطباق مميزة بالسحب، ومعرض صور، ونموذج حجز عبر واتساب مع شريط اتصال وحجز ثابت على الهاتف.",
      ],
    },
    {
      title: "مطعم وكافيه STEEL",
      site: { url: "https://steel-cafe.vercel.app", image: "/projects/steel.jpg" },
      category: "مطعم وكافيه · إربد",
      status: "newSite",
      summary:
        "مطعم وكافيه في إربد لديه 46 ألف متابع على فيسبوك لكن بلا موقع خاص به. صممت له موقعاً يغطي كل شيء من الفطور حتى العشاء المتأخر، ويحوّل المناسبات إلى طلبات.",
      details: [
        "قائمة مرتّبة حسب الوجبة، من الفطور الشرقي حتى الأطباق الرئيسية والحلويات.",
        "قسم للمناسبات: أعياد الميلاد، والإفطارات الرمضانية، وغداء الشركات، ولكلٍّ منها طلب عرض سعر.",
        "نموذج حجز يحدد نوع الحجز ومكان الجلوس داخلي أو خارجي وعدد الضيوف، ويُرسل إلى واتساب بضغطة واحدة.",
      ],
    },
  ],
};

const saudiWebsiteCardsByLocale: Record<Locale, ProjectCard[]> = {
  en: [
    {
      title: "Madar Al Nojoom Recruitment",
      site: { url: "https://madar-demo-psi.vercel.app", image: "/projects/madar.jpg" },
      category: "Recruitment office · Al Maghrazat, Riyadh",
      status: "rebuild",
      summary:
        "A recruitment office with 1,200+ Google reviews, an old website failing with an SSL error, and one question filling its reviews: where is my request? I built a site that takes the request step by step and lets clients follow it up without calling.",
      details: [
        "Guided request flow (profession → nationality → requirements → contact) with a live summary ticket, sent to WhatsApp.",
        "“Track your request”: a Musaned contract number and name become a ready follow-up message to the office.",
        "The request journey shown as an orbit of six clickable stages, so clients know what happens after they apply.",
      ],
    },
    {
      title: "DPTC Physical Therapy",
      site: { url: "https://dptc-demo.vercel.app", image: "/projects/dptc.jpg" },
      category: "Physical therapy center · Al Sulimaniyah, Riyadh",
      status: "rebuild",
      summary:
        "A physical therapy center rated 4.5 on Google whose domain no longer existed and had no social presence. I gave it a site that starts from the patient’s pain, not a list of services.",
      details: [
        "Interactive body map: tap where it hurts to see how the center treats it, and the choice carries into the booking form.",
        "A four-step treatment journey from assessment to a home program, with real photos of the rehab hall and treatment rooms.",
        "Wordmark redrawn in SVG from the center’s blue neon sign.",
      ],
    },
    {
      title: "Al Raha Appliance Repair",
      site: { url: "https://raha-demo.vercel.app", image: "/projects/raha.jpg" },
      category: "Appliance repair workshop · Al Masif, Riyadh",
      status: "rebuild",
      summary:
        "A busy repair workshop with 1,250+ Google reviews and a dead domain. “Spare parts” appears 125 times in its reviews, so the site is built around diagnosing a device and finding a part.",
      details: [
        "“Diagnose your device”: device → fault (the faults change per device) → details, building a numbered repair ticket sent to WhatsApp.",
        "Spare-parts finder: type the part and model to ask about availability in one tap.",
        "A workshop identity with blueprint grids, an inspection frame with a scan line and monospace part codes.",
      ],
    },
    {
      title: "Badaea Lebanon Decoration",
      site: { url: "https://badaea-demo.vercel.app", image: "/projects/badaea.jpg" },
      category: "Shop & hotel fit-out supplier · Olaya St., Riyadh",
      status: "rebuild",
      summary:
        "A two-floor showroom supplying racks, mannequins, hotel trolleys and café furniture, whose domain had expired. Its customers are projects, not shoppers, so the site works like a quote request.",
      details: [
        "Quote list: add products with quantities, then send the whole list on WhatsApp for pricing.",
        "Products filtered by project type: fashion retail, hotels, cafés, exhibitions and jewelry.",
        "Identity taken from the storefront: lime green from the day sign, black from the night sign, gold from the products.",
      ],
    },
    {
      title: "Bin Yahya Real Estate",
      site: { url: "https://yahya-demo.vercel.app", image: "/projects/yahya.jpg" },
      category: "Real estate office · Umm Al Hamam, Riyadh",
      status: "rebuild",
      summary:
        "A neighborhood real estate office whose old site was down and whose reviews kept mentioning unanswered phones. I built a site that captures the request in detail and offers a callback instead.",
      details: [
        "Property request: rent, list my property or manage my property → type → district → rooms → annual budget slider → WhatsApp.",
        "“Missed us? We’ll call you”: a callback request at the client’s preferred time.",
        "A section for landlords covering marketing, Ejar contracts, rent collection and maintenance.",
      ],
    },
    {
      title: "Rodna Training Academy",
      site: { url: "https://rodna-demo.vercel.app", image: "/projects/rodna.jpg" },
      category: "Women’s training academy · Al Hamra, Riyadh",
      status: "rebuild",
      summary:
        "A women’s training academy offering admin, computer and HR courses, with a website failing on an SSL error. I built a site that helps a trainee pick a track and register in under a minute.",
      details: [
        "“Which track suits me?”: a three-question quiz that recommends a track and moves straight to registration.",
        "Color-coded track tabs: administrative courses, computer courses, HR diploma and co-op training.",
        "Registration by track, morning or evening period and status (employee, job seeker or student), sent to WhatsApp.",
      ],
    },
    {
      title: "Dorar Al Wataniya Car Rental",
      site: { url: "https://durar-demo.vercel.app", image: "/projects/durar.jpg" },
      category: "Car rental · Al Sulimaniyah, Riyadh",
      status: "rebuild",
      summary:
        "A car rental branch whose website no longer worked, leaving phone calls as the only way to book. The new site puts a booking form right in the hero.",
      details: [
        "Booking widget: car class, daily, weekly or monthly rental, pick-up and return dates with a live day count.",
        "Optional extras (delivery, full insurance, child seat) included in the WhatsApp price request.",
        "Bold identity from the street sign: yellow, red and blue with heavy outlines and offset shadows.",
      ],
    },
    {
      title: "MAZ Higher Institute of Training",
      site: { url: "https://maz-demo.vercel.app", image: "/projects/maz.jpg" },
      category: "Training institute · Riyadh, Jeddah, Buraydah",
      status: "rebuild",
      summary:
        "A training institute with four branches across three cities, and both of its websites down. The new site presents its programs and sends every enquiry to the right branch.",
      details: [
        "Programs shown only where there was evidence for them: AI diploma, cybersecurity, CSCP prep and robotics for kids.",
        "Registration routes to the selected branch’s WhatsApp admissions number, in person or online.",
        "Branch finder with directions and hours for the men’s and women’s branches in Riyadh, Jeddah and Buraydah.",
      ],
    },
    {
      title: "Smile Life Pet Clinic",
      site: { url: "https://smilelife-demo.vercel.app", image: "/projects/smilelife.jpg" },
      category: "Veterinary clinic · As Suwaidi, Riyadh",
      status: "rebuild",
      summary:
        "A late-night vet clinic with 500+ Google reviews and a website that would not open over HTTPS. I built a warm, pet-first site around its services and hours.",
      details: [
        "Circular stamp logo redrawn in SVG (“Every pet has a smile”, with a cat, a dog and a heart).",
        "The 20% spay and neuter offer from the reception desk, featured with a direct booking link.",
        "Services, a patients gallery, day-by-day late opening hours and a WhatsApp booking form.",
      ],
    },
    {
      title: "Three Star Studio",
      site: { url: "https://threestar-demo.vercel.app", image: "/projects/threestar.jpg" },
      category: "Photo studio · Al Yarmouk, Riyadh",
      status: "rebuild",
      summary:
        "A photo studio with 760+ Google reviews whose domain showed only a default hosting page. Its reviews praise fast passport photos, so that is what the site leads with.",
      details: [
        "Hero recreates the studio’s brand wall of framed family, kids and newborn portraits.",
        "Passport and visa photo guide with each size drawn to scale: passport, US visa, Schengen and UK.",
        "Family and newborn sessions, printing and framing, with WhatsApp booking.",
      ],
    },
    {
      title: "Lady Studio",
      site: { url: "https://lady-demo.vercel.app", image: "/projects/lady.jpg" },
      category: "Women-only photo studio · Al Quds, Riyadh",
      status: "rebuild",
      summary:
        "A women-only photo studio whose domain no longer existed. Privacy is the reason clients choose it, so the site leads with an all-female team and makes ID photo visits easy to prepare for.",
      details: [
        "Civil Affairs photo requirements, taken from the notice posted in the studio, so clients arrive prepared.",
        "Services from ID and passport photos to event and product shoots, photo restoration, framing and albums.",
        "Calm, elegant identity and a WhatsApp booking form.",
      ],
    },
    {
      title: "Rukn Al Yamama Auto Service",
      site: { url: "https://yamama-demo.vercel.app", image: "/projects/yamama.jpg" },
      category: "Chinese car specialist · Umm Al Hamam, Riyadh",
      status: "rebuild",
      summary:
        "A 24/7 workshop for Chinese cars, rated 4.4 on Google, listed under a generic name and with a dead domain. I gave it a clear specialist identity for MG, Changan, Geely and more.",
      details: [
        "Services from the shop sign (mechanics, electrics, programming, body work) plus gearbox repair from its reviews.",
        "Brands section, and a booking form that takes the car model and the problem straight to WhatsApp.",
        "Only about seven photos existed, so the rest of the site is designed with SVG icons and illustration.",
      ],
    },
  ],
  ar: [
    {
      title: "مكتب مدار النجوم للاستقدام",
      site: { url: "https://madar-demo-psi.vercel.app", image: "/projects/madar.jpg" },
      category: "مكتب استقدام · حي المغرزات، الرياض",
      status: "rebuild",
      summary:
        "مكتب استقدام بأكثر من 1,200 مراجعة على Google، موقعه القديم يعطي خطأ شهادة SSL، وأكثر سؤال يتكرر في مراجعاته: وين وصل طلبي؟ بنيت له موقعاً يأخذ الطلب خطوة بخطوة ويتيح للعميل متابعته دون اتصال.",
      details: [
        "طلب استقدام تفاعلي (المهنة ← الجنسية ← المواصفات ← البيانات) مع تذكرة ملخص حيّة، يُرسل إلى واتساب.",
        "«تابع طلبك»: رقم عقد مساند والاسم يتحولان إلى رسالة متابعة جاهزة للمكتب.",
        "رحلة الطلب معروضة كمدار من 6 محطات قابلة للنقر، ليعرف العميل ماذا يحدث بعد التقديم.",
      ],
    },
    {
      title: "مركز الضباب للعلاج الطبيعي DPTC",
      site: { url: "https://dptc-demo.vercel.app", image: "/projects/dptc.jpg" },
      category: "مركز علاج طبيعي · السليمانية، الرياض",
      status: "rebuild",
      summary:
        "مركز علاج طبيعي بتقييم 4.5 على Google، دومين موقعه لم يعد موجوداً ولا حسابات له على السوشيال. صممت له موقعاً يبدأ من ألم المريض لا من قائمة خدمات.",
      details: [
        "خريطة جسم تفاعلية: اضغط على مكان الألم لترى كيف يعالجه المركز، وينتقل اختيارك إلى نموذج الحجز.",
        "رحلة علاج من 4 خطوات من التقييم حتى برنامج التمارين المنزلي، مع صور حقيقية لصالة التأهيل وغرف العلاج.",
        "علامة نصية مرسومة SVG من لافتة النيون الزرقاء للمركز.",
      ],
    },
    {
      title: "ورشة الرحى لصيانة الأجهزة المنزلية",
      site: { url: "https://raha-demo.vercel.app", image: "/projects/raha.jpg" },
      category: "ورشة صيانة أجهزة · المصيف، الرياض",
      status: "rebuild",
      summary:
        "ورشة صيانة مزدحمة بأكثر من 1,250 مراجعة على Google ودومين متوقف. كلمة «قطع غيار» تتكرر 125 مرة في مراجعاتها، لذلك بُني الموقع حول تشخيص الجهاز والبحث عن القطعة.",
      details: [
        "«شخّص جهازك»: الجهاز ← العطل (تتغير الأعطال حسب الجهاز) ← التفاصيل، فتتكوّن بطاقة صيانة برقم تُرسل إلى واتساب.",
        "باحث قطع الغيار: اكتب اسم القطعة والموديل واسأل عن توفرها بضغطة.",
        "هوية «ورشة فنية»: شبكة مخططات هندسية، وإطار فحص بخط مسح، وأكواد قطع بخط Mono.",
      ],
    },
    {
      title: "بدائع لبنان للديكور",
      site: { url: "https://badaea-demo.vercel.app", image: "/projects/badaea.jpg" },
      category: "تجهيز المحلات والفنادق · شارع العليا، الرياض",
      status: "rebuild",
      summary:
        "معرض من طابقين يورّد علاقات الملابس والمانيكانات وتروليات الفنادق وأثاث المقاهي، ودومين موقعه منتهٍ. عملاؤه مشاريع لا متسوقون، لذلك يعمل الموقع كطلب عرض سعر.",
      details: [
        "قائمة عرض السعر: أضف المنتجات بالكميات، ثم أرسل القائمة كاملة على واتساب لتصلك الأسعار.",
        "فلترة المنتجات حسب نوع المشروع: محلات الملابس، الفنادق، المقاهي، المعارض، والمجوهرات.",
        "هوية مأخوذة من الواجهة: الأخضر الليموني من اللافتة النهارية، والأسود من الليلية، والذهبي من المنتجات.",
      ],
    },
    {
      title: "مكتب بن يحيى للعقارات",
      site: { url: "https://yahya-demo.vercel.app", image: "/projects/yahya.jpg" },
      category: "مكتب عقاري · أم الحمام، الرياض",
      status: "rebuild",
      summary:
        "مكتب عقاري في الحي، موقعه القديم متوقف، ومراجعاته تتكرر فيها شكوى عدم الرد على الجوال. بنيت له موقعاً يأخذ الطلب بالتفصيل ويعرض معاودة الاتصال بدلاً من ذلك.",
      details: [
        "اطلب عقار: إيجار، أو أبي أأجّر عقاري، أو إدارة أملاكي ← نوع العقار ← الحي ← الغرف ← شريط الميزانية السنوية ← واتساب.",
        "«ما لحقت ترد؟ نحن نتصل فيك»: طلب معاودة اتصال في الوقت الذي يناسب العميل.",
        "قسم للملّاك: التسويق والتأجير، عقود إيجار، التحصيل، والصيانة.",
      ],
    },
    {
      title: "أكاديمية ردنا العالي للتدريب",
      site: { url: "https://rodna-demo.vercel.app", image: "/projects/rodna.jpg" },
      category: "أكاديمية تدريب نسائية · الحمراء، الرياض",
      status: "rebuild",
      summary:
        "أكاديمية تدريب نسائية تقدّم دورات إدارية وحاسب وموارد بشرية، وموقعها يعطي خطأ شهادة SSL. بنيت لها موقعاً يساعد المتدربة على اختيار مسارها والتسجيل في أقل من دقيقة.",
      details: [
        "«وش يناسبني؟»: اختبار من 3 أسئلة يرشّح المسار الأنسب وينقل مباشرة إلى التسجيل.",
        "تبويبات ملونة للمسارات: الدورات الإدارية، دورات الحاسب، دبلوم الموارد البشرية، والتدريب التعاوني.",
        "تسجيل حسب المسار والفترة (صباحي/مسائي) والحالة (موظفة/باحثة عن عمل/طالبة)، يُرسل إلى واتساب.",
      ],
    },
    {
      title: "درر الوطنية لتأجير السيارات",
      site: { url: "https://durar-demo.vercel.app", image: "/projects/durar.jpg" },
      category: "تأجير سيارات · السليمانية، الرياض",
      status: "rebuild",
      summary:
        "فرع تأجير سيارات موقعه لم يعد يعمل، فبقي الاتصال الهاتفي الطريقة الوحيدة للحجز. الموقع الجديد يضع نموذج الحجز في الواجهة مباشرة.",
      details: [
        "نموذج حجز: فئة السيارة، إيجار يومي أو أسبوعي أو شهري، تاريخ الاستلام والتسليم مع حساب الأيام تلقائياً.",
        "إضافات اختيارية (توصيل، تأمين شامل، كرسي أطفال) تُضمَّن في طلب السعر عبر واتساب.",
        "هوية جريئة من لافتة الفرع: أصفر وأحمر وأزرق بحدود سميكة وظلال مُزاحة.",
      ],
    },
    {
      title: "معهد ماز العالي للتدريب",
      site: { url: "https://maz-demo.vercel.app", image: "/projects/maz.jpg" },
      category: "معهد تدريب · الرياض، جدة، بريدة",
      status: "rebuild",
      summary:
        "معهد تدريب بأربعة فروع في ثلاث مدن، وموقعاه كلاهما متوقفان. الموقع الجديد يعرض برامجه ويوجّه كل استفسار إلى الفرع الصحيح.",
      details: [
        "البرامج المعروضة فقط ما له دليل فعلي: دبلوم الذكاء الاصطناعي، الأمن السيبراني، التحضير لـ CSCP، والروبوت للأطفال.",
        "نموذج التسجيل يُرسل إلى واتساب القبول في الفرع المختار، حضورياً أو عن بُعد.",
        "دليل الفروع مع الاتجاهات والدوام لفرعي الرياض رجال ونساء وجدة وبريدة.",
      ],
    },
    {
      title: "عيادة بسمة الحياة البيطرية",
      site: { url: "https://smilelife-demo.vercel.app", image: "/projects/smilelife.jpg" },
      category: "عيادة بيطرية · السويدي، الرياض",
      status: "rebuild",
      summary:
        "عيادة بيطرية تعمل حتى منتصف الليل بأكثر من 500 مراجعة على Google، وموقعها لا يفتح عبر HTTPS. بنيت لها موقعاً دافئاً يضع الأليف أولاً حول خدماتها ومواعيدها.",
      details: [
        "الشعار الدائري مرسوم SVG («Every pet has a smile» مع قط وكلب وقلب).",
        "عرض خصم 20% على التعقيم والإخصاء من لوحة الاستقبال، مع رابط حجز مباشر.",
        "الخدمات، ومعرض المرضى الصغار، ومواعيد العمل المتأخرة يوماً بيوم، ونموذج حجز عبر واتساب.",
      ],
    },
    {
      title: "استوديو تري ستار للتصوير",
      site: { url: "https://threestar-demo.vercel.app", image: "/projects/threestar.jpg" },
      category: "استوديو تصوير · اليرموك، الرياض",
      status: "rebuild",
      summary:
        "استوديو تصوير بأكثر من 760 مراجعة على Google، ودومينه يعرض صفحة الاستضافة الافتراضية فقط. مراجعاته تمدح سرعة صور الجواز، فهذا ما يبدأ به الموقع.",
      details: [
        "الواجهة تعيد بناء جدار هوية الاستوديو بصور العائلات والأطفال والمواليد المؤطّرة.",
        "دليل صور الجواز والتأشيرات بمقاسات مرسومة بالنسبة الحقيقية: الجواز، التأشيرة الأمريكية، شنغن وبريطانيا.",
        "جلسات العائلة والمواليد، والطباعة والتأطير، مع الحجز عبر واتساب.",
      ],
    },
    {
      title: "ستوديو ليدي للتصوير النسائي",
      site: { url: "https://lady-demo.vercel.app", image: "/projects/lady.jpg" },
      category: "استوديو تصوير نسائي · حي القدس، الرياض",
      status: "rebuild",
      summary:
        "استوديو تصوير نسائي لم يعد دومين موقعه موجوداً. الخصوصية هي سبب اختيار العميلات له، لذلك يبدأ الموقع بالطاقم النسائي ويسهّل التحضير لصور الأحوال.",
      details: [
        "اشتراطات صورة الأحوال منقولة من الورقة المعلّقة في الاستوديو، لتصل العميلة جاهزة.",
        "الخدمات من صور الأحوال والجواز إلى تصوير المناسبات والمنتجات وترميم الصور والتأطير والألبومات.",
        "هوية هادئة وأنيقة ونموذج حجز عبر واتساب.",
      ],
    },
    {
      title: "ركن اليمامة لصيانة السيارات",
      site: { url: "https://yamama-demo.vercel.app", image: "/projects/yamama.jpg" },
      category: "متخصص السيارات الصينية · أم الحمام، الرياض",
      status: "rebuild",
      summary:
        "ورشة سيارات صينية تعمل 24 ساعة بتقييم 4.4 على Google، مسجّلة باسم عام ودومينها متوقف. أعطيتها هوية متخصص واضحة لـ MG وشانجان وجيلي وغيرها.",
      details: [
        "الخدمات من لافتة الورشة (ميكانيكا، كهرباء، برمجة، سمكرة) إضافة إلى الجيربوكس من المراجعات.",
        "قسم للماركات، ونموذج حجز ينقل موديل السيارة والعطل مباشرة إلى واتساب.",
        "لم يكن لديهم سوى 7 صور تقريباً، فصُمم باقي الموقع بأيقونات ورسومات SVG.",
      ],
    },
  ],
};

const textByLocale = {
  en: {
    name: "Khaled Alwaked",
    fullName: "Khaled M Alwaked",
    nav: { skills: "Skills", projects: "Work", websites: "Websites", switchLanguage: "العربية", switchLanguageAria: "Switch to Arabic" },
    hero: {
      meta: "Software developer · Irbid, Jordan",
      titleA: "I build web and mobile products",
      titleB: "that businesses rely on every day.",
      description:
        "Full-stack developer working with Next.js, React and Flutter. I take products from the first screen to a working release — booking systems, point-of-sale apps, service platforms and websites for local businesses.",
      primaryCta: "View selected work",
      portraitAlt: "Portrait of Khaled Alwaked",
      role: "Software engineer · Full-stack · UI/UX",
      availability: "Open to new projects",
      facts: [
        { value: "23", label: "Projects built" },
        { value: "Web + Mobile", label: "Platforms" },
        { value: "Next.js · Flutter", label: "Main stack" },
      ],
    },
    skills: {
      title: "Tools & focus",
      description: "A small, deliberate stack I know well — not a long list of things I use once.",
      groups: [
        { label: "Web", items: ["Next.js", "React", "Vue"] },
        { label: "Mobile", items: ["Flutter"] },
        { label: "Backend & data", items: ["Supabase", "System design"] },
        { label: "Product", items: ["UI/UX design", "Motion UI"] },
        { label: "AI", items: ["Model integration", "AI training"] },
      ],
    },
    projects: {
      title: "Selected work",
      description: "Real problems, the products built to solve them, and what changed for the people using them.",
      labels: { shipped: "Shipped", inProgress: "In development", watchDemo: "Watch demo", highlights: "Highlights" },
    },
    websites: {
      title: "Websites for businesses in Jordan",
      description:
        "Proposals I built on my own initiative for businesses that had no website, or one that was holding them back. Each is live, bilingual (Arabic and English) and built with Vue 3.",
      labels: { redesign: "Redesign proposal", newSite: "New website proposal", visitSite: "Visit live site" },
    },
    websitesSa: {
      title: "Websites for businesses in Saudi Arabia",
      description:
        "Twelve businesses whose registered websites had stopped working: dead domains, SSL errors or a blank hosting page. I rebuilt each one from its real photos, hours and reviews, with a booking or enquiry flow designed around what its customers actually ask for.",
      labels: { rebuild: "Rebuild proposal", visitSite: "Visit live site" },
    },
    footer: {
      title: "Have a product in mind?",
      description: "Send me a message on LinkedIn — I’m happy to talk through scope, timeline and the right stack.",
      rights: "All rights reserved.",
    },
  },
  ar: {
    name: "خالد الواكد",
    fullName: "خالد محمد الواكد",
    nav: { skills: "المهارات", projects: "الأعمال", websites: "المواقع", switchLanguage: "English", switchLanguageAria: "التبديل إلى الإنجليزية" },
    hero: {
      meta: "مطوّر برمجيات · إربد، الأردن",
      titleA: "أبني منتجات ويب وموبايل",
      titleB: "تعتمد عليها الشركات كل يوم.",
      description:
        "مطوّر Full-Stack أعمل بـ Next.js وReact وFlutter. أنقل المنتج من أول شاشة حتى إصدار يعمل فعلياً — أنظمة حجز، وتطبيقات نقاط بيع، ومنصات خدمات، ومواقع لأعمال محلية.",
      primaryCta: "تصفّح الأعمال",
      portraitAlt: "صورة خالد الواكد",
      role: "مهندس برمجيات · Full-Stack · UI/UX",
      availability: "متاح لمشاريع جديدة",
      facts: [
        { value: "23", label: "مشاريع منجزة" },
        { value: "ويب + موبايل", label: "المنصات" },
        { value: "Next.js · Flutter", label: "التقنيات الأساسية" },
      ],
    },
    skills: {
      title: "الأدوات والتركيز",
      description: "مجموعة تقنيات مختارة أتقنها جيداً، بدلاً من قائمة طويلة أستخدمها مرة واحدة.",
      groups: [
        { label: "الويب", items: ["Next.js", "React", "Vue"] },
        { label: "الموبايل", items: ["Flutter"] },
        { label: "الخلفية والبيانات", items: ["Supabase", "تصميم الأنظمة"] },
        { label: "المنتج", items: ["تصميم UI/UX", "واجهات حركية"] },
        { label: "الذكاء الاصطناعي", items: ["تكامل النماذج", "تدريب الذكاء الاصطناعي"] },
      ],
    },
    projects: {
      title: "أعمال مختارة",
      description: "مشكلات حقيقية، والمنتجات التي بُنيت لحلها، وما الذي تغيّر لمستخدميها.",
      labels: { shipped: "مُنجز", inProgress: "قيد التطوير", watchDemo: "شاهد العرض", highlights: "أبرز النقاط" },
    },
    websites: {
      title: "مواقع لأعمال في الأردن",
      description:
        "مواقع بنيتها بمبادرة مني لأعمال لم يكن لديها موقع، أو كان موقعها ضعيفاً ولا يخدمها. كلها منشورة، بالعربي والإنجليزي، ومبنية بـ Vue 3.",
      labels: { redesign: "مقترح إعادة تصميم", newSite: "مقترح موقع جديد", visitSite: "زيارة الموقع" },
    },
    websitesSa: {
      title: "مواقع لأعمال في السعودية",
      description:
        "اثنا عشر نشاطاً توقفت مواقعها المسجّلة عن العمل: دومينات منتهية، أو أخطاء شهادة SSL، أو صفحة استضافة فارغة. أعدت بناء كل موقع من صوره ومواعيده ومراجعاته الحقيقية، مع مسار حجز أو استفسار مصمم حول ما يسأل عنه عملاؤه فعلاً.",
      labels: { rebuild: "مقترح إعادة بناء", visitSite: "زيارة الموقع" },
    },
    footer: {
      title: "لديك فكرة منتج؟",
      description: "راسلني على LinkedIn — يسعدني أن نناقش النطاق والجدول الزمني والتقنيات المناسبة.",
      rights: "جميع الحقوق محفوظة.",
    },
  },
} as const;

function SectionHeading({ index, title, description }: { index: string; title: string; description: string }) {
  return (
    <div className="grid gap-4 lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-4">
        <p className="font-mono text-xs text-subtle">{index}</p>
        <h2 className="mt-3 text-3xl font-medium tracking-tight text-foreground rtl:tracking-normal sm:text-4xl">{title}</h2>
      </div>
      <p className="max-w-xl text-base leading-relaxed text-muted lg:col-span-8 lg:self-end">{description}</p>
    </div>
  );
}

export default function Home() {
  const [locale, setLocale] = useState<Locale>("en");
  const [isLocaleReady, setIsLocaleReady] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>("home");
  const [isScrolled, setIsScrolled] = useState(false);

  const isArabic = locale === "ar";
  const t = textByLocale[locale];
  const projectCards = projectCardsByLocale[locale];
  const websiteCards = websiteCardsByLocale[locale];
  const saudiWebsiteCards = saudiWebsiteCardsByLocale[locale];

  useEffect(() => {
    let stored: string | null = null;

    try {
      stored = window.localStorage.getItem("portfolio-locale");
    } catch {
      stored = null;
    }

    const preferred: Locale =
      stored === "ar" || stored === "en" ? stored : window.navigator.language.toLowerCase().startsWith("ar") ? "ar" : "en";

    const frame = window.requestAnimationFrame(() => {
      setLocale(preferred);
      setIsLocaleReady(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = isArabic ? "rtl" : "ltr";

    if (!isLocaleReady) {
      return;
    }

    try {
      window.localStorage.setItem("portfolio-locale", locale);
    } catch {
      // Storage can be unavailable (private mode); the page still works.
    }
  }, [isArabic, isLocaleReady, locale]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = (["home", "skills", "projects", "websites", "websites-sa"] as const)
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);

        if (visible.length) {
          const id = visible[visible.length - 1].target.id;
          // Both website sections share the single "Websites" nav item.
          setActiveSection((id === "websites-sa" ? "websites" : id) as SectionId);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const navItems: { id: SectionId; label: string }[] = [
    { id: "skills", label: t.nav.skills },
    { id: "projects", label: t.nav.projects },
    { id: "websites", label: t.nav.websites },
  ];

  return (
    <div dir={isArabic ? "rtl" : "ltr"} className="min-h-screen bg-background text-foreground">
      <header
        className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
          isScrolled ? "hairline bg-background/85 backdrop-blur-md" : "border-transparent bg-background"
        }`}
      >
        <div className="shell flex h-16 items-center justify-between gap-4">
          <a href="#home" className="text-[15px] font-medium tracking-tight text-foreground rtl:tracking-normal">
            {t.name}
          </a>

          <nav className="flex items-center gap-1 sm:gap-2">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={activeSection === item.id ? "true" : undefined}
                className={`rounded-md px-2.5 py-2 text-sm transition-colors ${
                  activeSection === item.id ? "text-foreground" : "text-muted hover:text-foreground"
                }`}
              >
                {item.label}
              </a>
            ))}

            <span className="hairline mx-1 hidden h-4 border-s sm:block" aria-hidden="true" />

            {socialLinks.map(({ label, href, src }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
                className="hidden h-9 w-9 items-center justify-center rounded-md opacity-60 transition hover:opacity-100 sm:inline-flex"
              >
                <Image src={src} alt="" width={16} height={16} className="h-4 w-4 object-contain invert" />
              </a>
            ))}

            <button
              type="button"
              onClick={() => setLocale((current) => (current === "en" ? "ar" : "en"))}
              aria-label={t.nav.switchLanguageAria}
              className="hairline ms-1 rounded-md border px-3 py-1.5 text-[13px] text-muted transition-colors hover:border-foreground/30 hover:text-foreground"
            >
              {t.nav.switchLanguage}
            </button>
          </nav>
        </div>
      </header>

      <main>
        <section id="home" className="shell pb-20 pt-10 sm:pb-28 sm:pt-20">
          <div className="grid items-end gap-12 lg:grid-cols-12 lg:gap-12">
            <div className="fade-up lg:col-span-7 lg:pb-4">
              <p className="flex items-center gap-2 text-sm text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                {t.hero.meta}
              </p>

              <h1 className="mt-8 text-[2.5rem] font-medium leading-[1.08] tracking-[-0.03em] rtl:leading-[1.35] rtl:tracking-normal sm:text-6xl sm:leading-[1.04] lg:text-[4.1rem]">
                <span className="text-foreground">{t.hero.titleA}</span>{" "}
                <span className="text-muted">{t.hero.titleB}</span>
              </h1>

              <p className="mt-8 max-w-xl text-base leading-relaxed text-muted sm:text-lg sm:leading-relaxed">{t.hero.description}</p>

              <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-colors hover:bg-white"
                >
                  {t.hero.primaryCta}
                  <span aria-hidden="true" className="rtl:-scale-x-100">
                    →
                  </span>
                </a>
                <a
                  href={socialLinks[0].href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted underline decoration-subtle/60 underline-offset-[6px] transition-colors hover:text-foreground hover:decoration-foreground"
                >
                  LinkedIn
                </a>
                <a
                  href={socialLinks[1].href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted underline decoration-subtle/60 underline-offset-[6px] transition-colors hover:text-foreground hover:decoration-foreground"
                >
                  GitHub
                </a>
              </div>

              <dl className="hairline mt-14 grid grid-cols-3 gap-4 border-t pt-6 sm:gap-8">
                {t.hero.facts.map((fact) => (
                  <div key={fact.label} className="min-w-0">
                    <dt className="text-xs text-subtle sm:text-sm">{fact.label}</dt>
                    <dd className="mt-1.5 text-sm font-medium text-foreground sm:text-base">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <figure className="fade-up mx-auto w-full max-w-sm [animation-delay:120ms] sm:max-w-md lg:col-span-5 lg:max-w-none">
              <div className="hairline relative aspect-[4/5] overflow-hidden rounded-2xl border bg-surface">
                <div
                  className="absolute inset-0"
                  style={{ background: "radial-gradient(120% 70% at 50% 0%, rgb(var(--foreground) / 0.06), transparent 60%)" }}
                  aria-hidden="true"
                />
                <Image
                  src={myPhoto}
                  alt={t.hero.portraitAlt}
                  priority
                  placeholder="blur"
                  quality={80}
                  sizes="(min-width: 1024px) 28rem, (min-width: 640px) 28rem, 90vw"
                  className="absolute inset-x-0 bottom-0 h-[92%] w-full object-cover object-top"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-surface to-transparent" aria-hidden="true" />
              </div>
              <figcaption className="mt-4 flex items-start justify-between gap-4 text-sm">
                <span>
                  <span className="block font-medium text-foreground">{t.fullName}</span>
                  <span className="mt-0.5 block text-muted">{t.hero.role}</span>
                </span>
                <span className="mt-0.5 inline-flex shrink-0 items-center gap-2 text-xs text-muted">
                  <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                    <span className="absolute inset-0 animate-ping rounded-full bg-accent/60 [animation-duration:2.4s]" />
                    <span className="relative h-1.5 w-1.5 rounded-full bg-accent" />
                  </span>
                  {t.hero.availability}
                </span>
              </figcaption>
            </figure>
          </div>
        </section>

        <section id="skills" className="hairline border-t">
          <div className="shell py-20 sm:py-28">
            <SectionHeading index="01" title={t.skills.title} description={t.skills.description} />

            <div className="mt-12 grid sm:mt-16 lg:grid-cols-12 lg:gap-12">
            <dl className="lg:col-span-8 lg:col-start-5">
              {t.skills.groups.map((group) => (
                <div key={group.label} className="hairline grid grid-cols-[8rem_1fr] gap-4 border-t py-5 sm:grid-cols-[12rem_1fr]">
                  <dt className="text-sm text-subtle">{group.label}</dt>
                  <dd className="flex flex-wrap gap-x-5 gap-y-1 text-[15px] text-foreground">
                    {group.items.map((skill) => (
                      <span key={skill}>{skill}</span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
            </div>
          </div>
        </section>

        <section id="projects" className="hairline border-t">
          <div className="shell pt-20 sm:pt-28">
            <SectionHeading index="02" title={t.projects.title} description={t.projects.description} />
            <ProjectList items={projectCards} labels={t.projects.labels} />
          </div>
        </section>

        <section id="websites" className="hairline border-t">
          <div className="shell pt-20 sm:pt-28">
            <SectionHeading index="03" title={t.websites.title} description={t.websites.description} />
            <ProjectList
              items={websiteCards}
              labels={{ ...t.projects.labels, ...t.websites.labels }}
              startAt={projectCards.length + 1}
            />
          </div>
        </section>

        <section id="websites-sa" className="hairline border-t">
          <div className="shell pt-20 sm:pt-28">
            <SectionHeading index="04" title={t.websitesSa.title} description={t.websitesSa.description} />
            <ProjectList
              items={saudiWebsiteCards}
              labels={{ ...t.projects.labels, ...t.websitesSa.labels }}
              startAt={projectCards.length + websiteCards.length + 1}
            />
          </div>
        </section>
      </main>

      <footer className="hairline border-t">
        <div className="shell py-20 sm:py-28">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
            <h2 className="text-3xl font-medium tracking-tight rtl:tracking-normal sm:text-5xl lg:col-span-7">{t.footer.title}</h2>
            <div className="lg:col-span-5 lg:self-end">
              <p className="text-base leading-relaxed text-muted">{t.footer.description}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                {socialLinks.map(({ label, href, src }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hairline inline-flex items-center gap-2.5 rounded-full border px-4 py-2.5 text-sm text-foreground transition-colors hover:border-foreground/30 hover:bg-foreground/[0.03]"
                  >
                    <Image src={src} alt="" width={14} height={14} className="h-3.5 w-3.5 object-contain opacity-80 invert" />
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="hairline mt-20 flex flex-wrap items-center justify-between gap-3 border-t pt-6 text-xs text-subtle">
            <span>
              © {new Date().getFullYear()} {t.fullName}. {t.footer.rights}
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
