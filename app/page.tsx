"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ProjectList, type ProjectCard } from "@/components/project-list";
import githubProfileIcon from "@/assest/github.png";
import linkedinProfileIcon from "@/assest/linkedin.png";
import myPhoto from "@/assest/my-photo.png";

type Locale = "en" | "ar";
type SectionId = "home" | "skills" | "projects";

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


const textByLocale = {
  en: {
    name: "Khaled Alwaked",
    fullName: "Khaled M Alwaked",
    nav: { skills: "Skills", projects: "Work", switchLanguage: "العربية", switchLanguageAria: "Switch to Arabic" },
    hero: {
      meta: "Software developer · Irbid, Jordan",
      titleA: "I build web and mobile products",
      titleB: "that businesses rely on every day.",
      description:
        "Full-stack developer working with Next.js, React and Flutter. I take products from the first screen to a working release — booking systems, point-of-sale apps and service platforms.",
      primaryCta: "View selected work",
      portraitAlt: "Portrait of Khaled Alwaked",
      role: "Software engineer · Full-stack · UI/UX",
      availability: "Open to new projects",
      facts: [
        { value: "7", label: "Products built" },
        { value: "Web + Mobile", label: "Platforms" },
        { value: "Next.js · Flutter", label: "Main stack" },
      ],
    },
    skills: {
      title: "Tools & focus",
      description: "A small, deliberate stack I know well — not a long list of things I use once.",
      groups: [
        { label: "Web", items: ["Next.js", "React"] },
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
    footer: {
      title: "Have a product in mind?",
      description: "Send me a message on LinkedIn — I’m happy to talk through scope, timeline and the right stack.",
      rights: "All rights reserved.",
    },
  },
  ar: {
    name: "خالد الواكد",
    fullName: "خالد محمد الواكد",
    nav: { skills: "المهارات", projects: "الأعمال", switchLanguage: "English", switchLanguageAria: "التبديل إلى الإنجليزية" },
    hero: {
      meta: "مطوّر برمجيات · إربد، الأردن",
      titleA: "أبني منتجات ويب وموبايل",
      titleB: "تعتمد عليها الشركات كل يوم.",
      description:
        "مطوّر Full-Stack أعمل بـ Next.js وReact وFlutter. أنقل المنتج من أول شاشة حتى إصدار يعمل فعلياً — أنظمة حجز، وتطبيقات نقاط بيع، ومنصات خدمات.",
      primaryCta: "تصفّح الأعمال",
      portraitAlt: "صورة خالد الواكد",
      role: "مهندس برمجيات · Full-Stack · UI/UX",
      availability: "متاح لمشاريع جديدة",
      facts: [
        { value: "7", label: "منتجات منجزة" },
        { value: "ويب + موبايل", label: "المنصات" },
        { value: "Next.js · Flutter", label: "التقنيات الأساسية" },
      ],
    },
    skills: {
      title: "الأدوات والتركيز",
      description: "مجموعة تقنيات مختارة أتقنها جيداً، بدلاً من قائمة طويلة أستخدمها مرة واحدة.",
      groups: [
        { label: "الويب", items: ["Next.js", "React"] },
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
    const sections = (["home", "skills", "projects"] as const)
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);

        if (visible.length) {
          setActiveSection(visible[visible.length - 1].target.id as SectionId);
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
