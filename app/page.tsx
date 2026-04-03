"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { BentoGrid, type ProjectCard } from "@/components/bento-grid";
import { fadeUpItem, MotionReveal, staggerChildren } from "@/components/motion-reveal";
import { SceneBackground } from "@/components/scene-background";
import myPhoto from "@/assest/my-photo.png";

type Locale = "en" | "ar";

const navigationConfig = [
  { id: "home", href: "#home" },
  { id: "skills", href: "#skills" },
  { id: "projects", href: "#projects" },
  { id: "contact", href: "#contact" },
] as const;

type NavigationSectionId = (typeof navigationConfig)[number]["id"];

const defaultSectionScrollOffset = 112;
const sectionScrollOffsets: Partial<Record<NavigationSectionId, number>> = {
  projects: 0,
};

const marqueeItemsByLocale: Record<Locale, string[]> = {
  en: ["Next.js", "React", "Flutter", "Supabase", "AI Model Integration", "System Design", "Motion UI"],
  ar: ["Next.js", "React", "Flutter", "Supabase", "تكامل نماذج الذكاء الاصطناعي", "تصميم الأنظمة", "واجهات حركية"],
};

const statsByLocale: Record<Locale, { label: string; value: string }[]> = {
  en: [
    { label: "Products Shipped", value: "7" },
    { label: "Platforms", value: "Web · Mobile · AI" },
    { label: "Focus", value: "Scalable UX Systems" },
  ],
  ar: [
    { label: "مشاريع مكتملة", value: "7" },
    { label: "المنصات", value: "ويب · موبايل · ذكاء اصطناعي" },
    { label: "التركيز", value: "أنظمة UX قابلة للتوسع" },
  ],
};

const projectCardsByLocale: Record<Locale, ProjectCard[]> = {
  en: [
    {
      title: "V-Safety Manager",
      category: "React + Next.js",
      span: "large",
      accent: "#ff4fd8",
      summary:
        "Many vehicle owners in Saudi Arabia are exposed to overpricing and fraud by untrusted repair and maintenance channels. V-Safety Manager addresses this by providing a government-aligned digital experience with fixed pricing and verified inspection centers in one trusted platform.",
      details: [
        "Business impact: Replaces scattered workshop offers with one verified channel, reducing pricing ambiguity and fraud exposure.",
        "Connects users to state-documented inspection centers across Saudi Arabia through guided booking and verification flows.",
        "Enforces fixed, visible service pricing before commitment, improving trust and cost predictability for owners and families.",
        "Built as 27 validated client routes and 21 production pages to support secure, end-to-end operation at scale.",
        "Business result: Safer maintenance decisions, fewer exploitation scenarios, and a more reliable service journey for vehicle owners in the Kingdom.",
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
        "Business impact: Helps students compare options faster using practical filters for budget, area, and location near universities.",
        "Expands demand channels by serving tourists looking for hotels, apartments, or short-stay rooms at competitive prices in specific areas.",
        "Gives everyday renters one place to discover better-value homes instead of fragmented listings and manual back-and-forth.",
        "Owner value: Enables landlords to manage units, leases, maintenance, and tenant communication from one dashboard instead of scattered calls and WhatsApp messages.",
      ],
    },
    {
      title: "Challenger Platform",
      category: "Gaming Cafe Ops",
      span: "medium",
      accent: "#6ee7ff",
      summary:
        "Gaming cafes often struggle with device booking because most cashier tools are difficult for staff and do not offer precise reservation control. Challenger solves this with a dedicated, accurate booking-management section built for real day-to-day floor operations.",
      details: [
        "Business impact: Gives teams a clear booking workflow for device allocation and session control, reducing reservation conflicts and manual corrections.",
        "Includes a complete Sales Report page with save-and-return capability, so managers can review reports anytime without rebuilding data.",
        "Removes heavy dependence on Excel sheets by keeping operational records inside the app for faster daily follow-up.",
        "Business result: Less staff friction, quicker shift handling, and more reliable reporting for gaming-cafe operations.",
      ],
    },
    {
      title: "Task Flow",
      category: "Task Management + Habit Tracking",
      span: "medium",
      accent: "#38bdf8",
      summary:
        "Most task apps are either too shallow or too monotonous, usually designed around a single use case. Task Flow solves this by combining detailed task tracking, smart prioritization, and goal-based organization with a motivating habit system in one focused experience.",
      details: [
        "Business impact: Enables structured planning by organizing tasks through priority, type, and purpose, helping users act faster with less mental overload.",
        "Includes a dedicated habit-tracking module with daily score accumulation to reinforce consistency and healthy routine-building.",
        "Turns progress into motivation through visible streak and score mechanics that reward sustained execution.",
        "Business result: Better retention and higher day-to-day goal completion through clarity, structure, and behavioral motivation.",
        "Roadmap value: Planned weekly, monthly, and yearly leaderboards will add social competition to push long-term commitment even further.",
      ],
    },
    {
      title: "Weather App",
      category: "Flutter Weather",
      span: "medium",
      accent: "#93c5fd",
      summary:
        "Many weather apps require too many steps before users reach a decision. This app streamlines access to current conditions and forecasts with resilient data handling so users can act quickly in changing conditions.",
      details: [
        "Business impact: Offers 3 fast entry paths (current location, city search, favorites) to reduce lookup friction.",
        "Provides hourly insights plus a 7-day forecast view for immediate and short-term planning decisions.",
        "Business result: Faster decision-making with lower drop-off risk when connectivity is unstable.",
      ],
    },
    {
      title: "BMI Calculator",
      category: "Flutter Health",
      span: "small",
      accent: "#f59e0b",
      summary:
        "Health tracking tools often fail when input is confusing or feedback is unclear. This BMI app simplifies data entry and interpretation, making regular self-check routines easier to sustain.",
      details: [
        "Business impact: Supports 2 unit systems (metric and imperial) to reduce entry mistakes across different user regions.",
        "Visualizes outcomes across 4 BMI ranges with an animated gauge and keeps historical readings for progress awareness.",
        "Business result: Clearer repeat-use experience that encourages ongoing self-tracking behavior.",
      ],
    },
    {
      title: "Casher POS System",
      category: "Flutter Commerce",
      span: "medium",
      accent: "#8bffb0",
      summary:
        "Retail checkout lines slow down when invoicing and printer handling depend on repeated manual setup. Casher centralizes selling, invoicing, and thermal printing so cashiers can complete bills with fewer interruptions.",
      details: [
        "Business impact: Printer selection is done once, then reused with auto-connect on next launches, reducing repeated setup at the counter.",
        "Moves invoice printing from a 20+ line integration pattern to a single service call for faster feature delivery and maintenance.",
        "Business result: Faster checkout flow with lower cashier friction during peak billing windows.",
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
        "المشكلة: كثير من أصحاب المركبات في السعودية يتعرضون للاستغلال ورفع الأسعار من جهات صيانة غير موثوقة. V-Safety Manager يحل هذه المشكلة عبر منصة رقمية موثقة على مستوى الجهات الحكومية، تجمع التسعير الثابت ومراكز الفحص المعتمدة في تجربة واحدة موثوقة.",
      details: [
        "أثر الأعمال: ينقل المستخدم من خيارات عشوائية بين الورش إلى قناة موثقة واحدة، مما يقلل تضارب الأسعار ومخاطر النصب.",
        "يربط أصحاب المركبات بمراكز فحص موثقة ومعتمدة على مستوى المملكة العربية السعودية ضمن تدفق حجز واضح.",
        "يعرض اسعارا ثابتة وواضحة قبل إكمال الطلب، ما يرفع الثقة ويقلل مفاجآت التكلفة على العميل.",
        "مبني عبر 27 مسارا معتمدا للعميل و21 شاشة إنتاجية فعلية لضمان تشغيل متكامل وآمن.",
        "نتيجة الأعمال: قرارات صيانة أكثر أمانا، حالات استغلال أقل، وتجربة خدمة موثوقة لأصحاب المركبات في المملكة.",
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
        "أثر الأعمال: يسرع قرار الطالب عبر فلاتر واضحة للسعر، المنطقة، والقرب من الجامعة بدل البحث العشوائي الطويل.",
        "يفتح قناة طلب إضافية للسياح الباحثين عن فنادق أو شقق أو غرف سياحية بأسعار منافسة ومواقع محددة.",
        "يوفر للمستأجر العادي مقارنة أفضل للخيارات السكنية للوصول إلى بيت مناسب بالسعر والمكان المفضل.",
        "قيمة للمالك: يدير الشقق والعقود والإيجارات والصيانات والتواصل مع المستأجرين من مكان واحد بدل الاتصالات ورسائل الواتس المتفرقة.",
      ],
    },
    {
      title: "منصة Challenger",
      category: "إدارة كافيهات الألعاب",
      span: "medium",
      accent: "#6ee7ff",
      summary:
        "مشكلة مقاهي الألعاب أن إدارة حجز الأجهزة تكون صعبة لأن أغلب تطبيقات الكاشير متعبة للعاملين ولا تعطي دقة كافية في تنظيم الحجوزات. منصة Challenger تعالج ذلك عبر قسم مخصص لإدارة الحجوزات بشكل دقيق وعملي يناسب التشغيل اليومي.",
      details: [
        "أثر الأعمال: يوفر تدفقا واضحا لحجز الأجهزة وإدارة الجلسات، مما يقلل تعارضات الحجوزات والتعديلات اليدوية أثناء الضغط.",
        "يتضمن صفحة كاملة لتقرير المبيعات مع إمكانية حفظ التقارير والرجوع لها في أي وقت دون إعادة العمل من الصفر.",
        "يقلل الاعتماد على شيتات وجداول Excel عبر حفظ بيانات التشغيل داخل التطبيق بشكل منظم.",
        "نتيجة الأعمال: وقت أقل في المتابعة اليومية، جهد تشغيلي أقل على الفريق، وموثوقية أعلى في التقارير والإدارة.",
      ],
    },
    {
      title: "Task Flow",
      category: "إدارة المهام + تتبع العادات",
      span: "medium",
      accent: "#38bdf8",
      summary:
        "المشكلة أن كثيراً من تطبيقات المهام تكون سطحية أو مملة وتركز على هدف واحد فقط. Task Flow يحل هذا عبر تجربة متكاملة تجمع تتبع المهام بالتفصيل، ترتيب الأولويات، وتصنيف المهام حسب نوعها وهدفها، مع نظام تحفيزي واضح للاستمرار.",
      details: [
        "أثر الأعمال: يساعد المستخدم على تنظيم يومه بوضوح عبر ترتيب المهام حسب الأولوية والنوع والهدف بدلاً من قوائم عشوائية.",
        "يتضمن قسماً مخصصاً لتتبع العادات وبناء عادات صحية جديدة مع نظام score يومي يزيد مع الاستمرارية.",
        "يحوّل الانضباط إلى تجربة محفزة من خلال تتبع النقاط اليومية وإظهار التقدم بشكل مستمر.",
        "نتيجة الأعمال: إنجاز أعلى للأهداف اليومية واستمرارية أفضل لأن النظام يجمع بين التنظيم والتحفيز السلوكي.",
        "قيمة مستقبلية: عند الإطلاق الكامل ستتوفر Leaderboards أسبوعية وشهرية وسنوية لتحفيز المستخدمين على المنافسة والاستمرار.",
      ],
    },
    {
      title: "تطبيق الطقس",
      category: "Flutter Weather",
      span: "medium",
      accent: "#93c5fd",
      summary:
        "الكثير من تطبيقات الطقس تحتاج خطوات كثيرة قبل الوصول لقرار. هذا التطبيق يختصر الوصول للبيانات الحالية والتوقعات مع معالجة مرنة للاتصال حتى يتخذ المستخدم قرارا أسرع.",
      details: [
        "أثر الأعمال: يقدم 3 طرق سريعة للوصول (الموقع الحالي، البحث عن مدينة، المفضلة) لتقليل وقت الوصول للمعلومة.",
        "يوفر توقعات ساعية مع عرض 7 أيام لدعم قرارات فورية وقصيرة المدى.",
        "نتيجة الأعمال: قرارات أسرع مع تقليل احتمال الانسحاب عند ضعف الشبكة.",
      ],
    },
    {
      title: "حاسبة BMI",
      category: "Flutter Health",
      span: "small",
      accent: "#f59e0b",
      summary:
        "أدوات المتابعة الصحية تفشل عندما يكون الإدخال معقدا أو التفسير غير واضح. هذا التطبيق يبسط إدخال البيانات وقراءة النتيجة، مما يسهل الالتزام بالمتابعة الدورية.",
      details: [
        "أثر الأعمال: يدعم نظامي قياس (متري وإمبريالي) لتقليل أخطاء الإدخال بين فئات المستخدمين.",
        "يعرض النتيجة ضمن 4 نطاقات BMI بمؤشر متحرك مع حفظ سجل القراءات لمتابعة التقدم.",
        "نتيجة الأعمال: تجربة أوضح للاستخدام المتكرر تشجع الاستمرارية في المتابعة الصحية.",
      ],
    },
    {
      title: "Casher POS System",
      category: "Flutter Commerce",
      span: "medium",
      accent: "#8bffb0",
      summary:
        "طوابير الكاشير تتباطأ عندما تكون الفوترة والطباعة الحرارية معتمدة على إعداد يدوي متكرر. Casher يجمع البيع والفوترة والطباعة في تدفق واحد لتسريع الإنجاز وتقليل الانقطاع.",
      details: [
        "أثر الأعمال: يتم اختيار الطابعة مرة واحدة ثم إعادة الاتصال تلقائيا في التشغيلات التالية، مما يقلل وقت الإعداد على نقطة البيع.",
        "ينقل الطباعة من نمط تكامل يتجاوز 20 سطرا إلى استدعاء خدمة واحد، ما يسرع التطوير والصيانة.",
        "نتيجة الأعمال: سرعة أعلى في الإنهاء عند الكاشير واحتكاك أقل خلال فترات الذروة.",
      ],
    },
  ],
};

const textByLocale = {
  en: {
    nav: {
      home: "Home",
      skills: "Skills",
      projects: "Projects",
      contact: "Contact",
      openMenu: "Open navigation menu",
      closeMenu: "Close navigation menu",
      languageSwitchAria: "Switch language",
      letsBuild: "Let's build",
    },
    hero: {
      badge: "Software engineer · full-stack developer · AI trainer · UI/UX Designer",
      titleMain: "Software Developer",
      titleAccent: "Architecting Scalable Solutions",
      titleLine2: "Architecting",
      titleLine3: "Scalable Solutions",
      description:
        "I design immersive digital products that merge clean interface systems, motion-led storytelling, and robust engineering foundations for web, mobile, and AI-enhanced experiences.",
      primaryCta: "Explore projects",
      secondaryCta: "Start a conversation",
      portraitAlt: "Portrait photo",
      portraitRole: "Software engineer · full-stack developer · AI trainer · UI/UX Designer",
    },
    skills: {
      eyebrow: "Core capabilities",
      title: "High-performance product engineering with design-led execution.",
      description:
        "From frontend architecture to mobile systems and AI integration, the stack is structured for scale, speed, and memorable user interaction.",
    },
    projects: {
      eyebrow: "Selected work",
      title: "A bento grid of product thinking, architecture depth, and polished execution.",
      description:
        "Each case study is framed around product outcomes, technical decisions, and the interaction detail that turns complex workflows into intuitive user journeys.",
      labels: {
        featuredLarge: "Flagship Delivery",
        featuredDefault: "Client Ready",
        featuredInProgress: "In Active Development",
        scopeLarge: "End-to-end build",
        scopeMedium: "Feature stream",
        scopeSmall: "Focused module",
        clientValue: "Client value delivered",
        footerReady: "Ready for immediate rollout",
        footerInProgress: "MVP under active development",
      },
    },
    contact: {
      eyebrow: "Contact",
      title: "Let's turn ambitious ideas into elegant, scalable products.",
      description:
        "Share the product vision, timeline, and technical direction. The form validates on the client and transitions into a success state with a lightweight motion cue.",
      availability: "Available for frontend systems, product design collaboration, and AI-enabled feature builds.",
      successTitle: "Message sent successfully",
      successDescription:
        "Thanks for reaching out. The request is validated, captured, and ready for the next step in the collaboration flow.",
      sendAnother: "Send another message",
    },
    form: {
      name: "Name",
      email: "Email",
      brief: "Project brief",
      namePlaceholder: "Your name",
      emailPlaceholder: "you@example.com",
      briefPlaceholder: "Tell me about the product, goals, constraints, and target users...",
      hint: "Client-side validation · sleek success animation",
      submit: "Submit inquiry",
      errors: {
        nameRequired: "Name is required.",
        emailRequired: "Email is required.",
        emailInvalid: "Enter a valid email address.",
        briefRequired: "Project details are required.",
        briefMin: "Add at least 20 characters so the request is actionable.",
      },
    },
  },
  ar: {
    nav: {
      home: "الرئيسية",
      skills: "المهارات",
      projects: "المشاريع",
      contact: "تواصل",
      openMenu: "فتح قائمة التنقل",
      closeMenu: "إغلاق قائمة التنقل",
      languageSwitchAria: "تبديل اللغة",
      letsBuild: "ابدا مشروعك",
    },
    hero: {
      badge: "مهندس برمجيات · مطور Full-Stack · مدرب ذكاء اصطناعي · مصمم UI/UX",
      titleMain: "مهندس برمجيات",
      titleAccent: "ابني حلولا رقمية قابلة للتوسع",
      titleLine2: "ابني حلولا رقمية",
      titleLine3: "قابلة للتوسع",
      description:
        "اصمم منتجات رقمية غامرة تجمع بين واجهات نظيفة، وسرد بصري بالحركة، واساس هندسي قوي لمنصات الويب والموبايل وميزات الذكاء الاصطناعي.",
      primaryCta: "استكشف المشاريع",
      secondaryCta: "ابدا محادثة",
      portraitAlt: "صورة شخصية",
      portraitRole: "مهندس برمجيات · مطور Full-Stack · مدرب ذكاء اصطناعي · مصمم UI/UX",
    },
    skills: {
      eyebrow: "القدرات الاساسية",
      title: "هندسة منتجات عالية الاداء بتنفيذ يقوده التصميم.",
      description:
        "من معمارية الواجهات الى انظمة الموبايل وتكامل الذكاء الاصطناعي، يتم بناء الستاك ليدعم التوسع والسرعة وتجربة استخدام تظل في الذاكرة.",
    },
    projects: {
      eyebrow: "اعمال مختارة",
      title: "شبكة مشاريع تجمع التفكير المنتجـي وعمق المعمارية وجودة التنفيذ.",
      description:
        "كل مشروع معروض بمنظور نتائج الاعمال والقرارات التقنية والتفاصيل التفاعلية التي تحول التعقيد الى تجربة سهلة وواضحة.",
      labels: {
        featuredLarge: "المشروع الاقوى",
        featuredDefault: "جاهز للعميل",
        featuredInProgress: "قيد التطوير",
        scopeLarge: "تنفيذ شامل",
        scopeMedium: "ميزات متدفقة",
        scopeSmall: "وحدة مركزة",
        clientValue: "القيمة المقدمة للعميل",
        footerReady: "جاهز للتنفيذ الفوري",
        footerInProgress: "نسخة MVP قيد التطوير",
      },
    },
    contact: {
      eyebrow: "تواصل",
      title: "لنحول الافكار الطموحة الى منتجات انيقة وقابلة للتوسع.",
      description:
        "شارك فكرة المنتج والجدول الزمني والاتجاه التقني. النموذج يتحقق من المدخلات في الواجهة وينتقل لحالة نجاح بتاثير حركي خفيف.",
      availability: "متاح لبناء انظمة الواجهات، وتطوير المنتج، وتنفيذ ميزات مدعومة بالذكاء الاصطناعي.",
      successTitle: "تم ارسال الرسالة بنجاح",
      successDescription: "شكرا لتواصلك. تم التحقق من الطلب وتجهيزه للخطوة التالية في رحلة التعاون.",
      sendAnother: "ارسال رسالة جديدة",
    },
    form: {
      name: "الاسم",
      email: "البريد الالكتروني",
      brief: "ملخص المشروع",
      namePlaceholder: "اكتب اسمك",
      emailPlaceholder: "you@example.com",
      briefPlaceholder: "اشرح فكرة المنتج والاهداف والقيود والمستخدمين المستهدفين...",
      hint: "تحقق مباشر من المدخلات · حالة نجاح انيقة",
      submit: "ارسال الطلب",
      errors: {
        nameRequired: "الاسم مطلوب.",
        emailRequired: "البريد الالكتروني مطلوب.",
        emailInvalid: "ادخل بريدا الكترونيا صحيحا.",
        briefRequired: "تفاصيل المشروع مطلوبة.",
        briefMin: "اضف 20 حرفا على الاقل ليكون الطلب واضحا للتنفيذ.",
      },
    },
  },
} as const;

type FormState = {
  name: string;
  email: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const initialForm: FormState = {
  name: "",
  email: "",
  message: "",
};

const heroPhotoScale = 1.05;
const heroPhotoOffsetY = 10;

export default function Home() {
  const [locale, setLocale] = useState<Locale>("en");
  const [isLocaleHydrated, setIsLocaleHydrated] = useState(false);
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const scrollRafRef = useRef<number | null>(null);

  const isArabic = locale === "ar";
  const t = textByLocale[locale];
  const projectCards = projectCardsByLocale[locale];
  const stats = statsByLocale[locale];
  const marqueeItems = marqueeItemsByLocale[locale];
  const duplicatedMarquee = useMemo(() => [...marqueeItems, ...marqueeItems], [marqueeItems]);
  const navigation = navigationConfig.map((item) => ({ ...item, label: t.nav[item.id] }));

  useEffect(() => {
    const storedLocale = window.localStorage.getItem("portfolio-locale");
    const preferredLocale: Locale =
      storedLocale === "ar" || storedLocale === "en"
        ? storedLocale
        : window.navigator.language.toLowerCase().startsWith("ar")
          ? "ar"
          : "en";

    const frameId = window.requestAnimationFrame(() => {
      setLocale(preferredLocale);
      setIsLocaleHydrated(true);
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = isArabic ? "rtl" : "ltr";
  }, [isArabic, locale]);

  useEffect(() => {
    if (!isLocaleHydrated) {
      return;
    }

    window.localStorage.setItem("portfolio-locale", locale);
  }, [isLocaleHydrated, locale]);

  useEffect(() => {
    const sections = navigationConfig
      .map((item) => document.querySelector<HTMLElement>(item.href))
      .filter((section): section is HTMLElement => section !== null);

    if (!sections.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries.find((entry) => entry.isIntersecting);

        if (visibleSection) {
          setActiveSection(visibleSection.target.id);
        }
      },
      {
        rootMargin: "-42% 0px -42% 0px",
        threshold: 0.01,
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();

      if (scrollRafRef.current !== null) {
        window.cancelAnimationFrame(scrollRafRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const closeMenuOnDesktop = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    closeMenuOnDesktop();
    window.addEventListener("resize", closeMenuOnDesktop);

    return () => {
      window.removeEventListener("resize", closeMenuOnDesktop);
    };
  }, []);

  const smoothScrollToSection = (id: NavigationSectionId) => {
    const section = document.getElementById(id);
    const scrollingElement = document.scrollingElement;

    if (!section || !scrollingElement) {
      return;
    }

    const sectionOffset = sectionScrollOffsets[id] ?? defaultSectionScrollOffset;
    const targetTop = section.offsetTop - sectionOffset;
    const startTop = scrollingElement.scrollTop;
    const maxTop = scrollingElement.scrollHeight - window.innerHeight;
    const clampedTargetTop = Math.max(0, Math.min(targetTop, Math.max(0, maxTop)));
    const distance = clampedTargetTop - startTop;

    if (Math.abs(distance) < 1) {
      return;
    }

    if (scrollRafRef.current !== null) {
      window.cancelAnimationFrame(scrollRafRef.current);
      scrollRafRef.current = null;
    }

    const duration = Math.min(1400, Math.max(700, Math.abs(distance) * 0.55));
    const startTime = performance.now();

    const easeInOutQuart = (progress: number) => {
      return progress < 0.5 ? 8 * progress * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 4) / 2;
    };

    const step = (now: number) => {
      const progress = Math.min(1, (now - startTime) / duration);
      const eased = easeInOutQuart(progress);
      scrollingElement.scrollTop = startTop + distance * eased;

      if (progress < 1) {
        scrollRafRef.current = window.requestAnimationFrame(step);
      } else {
        scrollRafRef.current = null;
      }
    };

    scrollRafRef.current = window.requestAnimationFrame(step);
  };

  const handleNavigationClick = (id: NavigationSectionId) => {
    setActiveSection(id);
    setIsMobileMenuOpen(false);
    smoothScrollToSection(id);
  };

  const toggleLocale = () => {
    setLocale((current) => (current === "en" ? "ar" : "en"));
  };

  const validate = () => {
    const nextErrors: FormErrors = {};

    if (!form.name.trim()) {
      nextErrors.name = t.form.errors.nameRequired;
    }

    if (!form.email.trim()) {
      nextErrors.email = t.form.errors.emailRequired;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = t.form.errors.emailInvalid;
    }

    if (!form.message.trim()) {
      nextErrors.message = t.form.errors.briefRequired;
    } else if (form.message.trim().length < 20) {
      nextErrors.message = t.form.errors.briefMin;
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validate()) {
      setSubmitted(false);
      return;
    }

    setSubmitted(true);
    setErrors({});
    setForm(initialForm);
  };

  return (
    <div dir={isArabic ? "rtl" : "ltr"} className="relative overflow-x-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 z-0 bg-grid-fade" />
      <div className="pointer-events-none absolute inset-0 z-[1] grid-overlay" />
      <SceneBackground />

      <header className="relative z-50 mx-2 mt-3 md:fixed md:left-1/2 md:top-6 md:mx-0 md:mt-0 md:w-[calc(100%-1.5rem)] md:max-w-5xl md:-translate-x-1/2">
        <motion.div
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <nav className="glass neon-ring flex min-w-0 items-center gap-2 rounded-2xl px-3 py-2 text-xs text-white/75 shadow-glow sm:rounded-full sm:text-sm lg:px-4 lg:py-3 xl:px-6">
            <button
              type="button"
              onClick={() => handleNavigationClick("home")}
              className="min-w-0 max-w-[44vw] shrink pr-1 text-[13px] font-semibold tracking-[0.08em] text-white sm:max-w-[36vw] sm:text-base sm:tracking-[0.12em] lg:max-w-none lg:shrink-0 lg:pr-0 lg:tracking-[0.24em]"
            >
              <span className="block truncate lg:hidden">{isArabic ? "خالد الواكد" : "Khaled Alwaked"}</span>
              <span className="hidden lg:block">{isArabic ? "خالد الواكد" : "Khaled M Alwaked"}</span>
            </button>

            <div className="hidden min-w-0 flex-1 md:grid md:grid-cols-4 md:items-center md:gap-1 md:px-1 lg:gap-1.5 lg:px-2 xl:gap-2 xl:px-4">
              {navigation.map((item) => (
                <button
                  type="button"
                  key={item.href}
                  onClick={() => handleNavigationClick(item.id)}
                  className={`relative w-full min-w-0 rounded-full px-1 py-1 text-[10px] leading-none transition md:px-1 lg:px-2 lg:text-xs xl:px-3 xl:py-1.5 xl:text-sm ${
                    activeSection === item.id ? "text-white" : "text-white/72 hover:text-white"
                  }`}
                >
                  {activeSection === item.id ? (
                    <motion.span
                      layoutId="active-nav-pill"
                      className="absolute inset-0 -z-10 rounded-full border border-neon/45 bg-neon/20"
                      transition={{ type: "spring", stiffness: 420, damping: 34, mass: 0.8 }}
                    />
                  ) : null}
                  <span className="relative block truncate">{item.label}</span>
                </button>
              ))}
            </div>

            <div className={`${isArabic ? "mr-auto" : "ml-auto"} hidden items-center gap-2 min-[1380px]:flex`}>
              <button
                type="button"
                onClick={toggleLocale}
                aria-label={t.nav.languageSwitchAria}
                className="inline-flex h-9 min-w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 px-3 text-xs font-semibold tracking-[0.12em] text-white transition hover:border-neon/40 hover:bg-neon/10"
              >
                {isArabic ? "EN" : "AR"}
              </button>
              <button
                type="button"
                onClick={() => handleNavigationClick("contact")}
                className="inline-flex whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:border-neon/40 hover:bg-neon/10"
              >
                {t.nav.letsBuild}
              </button>
            </div>

            <div className={`${isArabic ? "mr-2" : "ml-2"} flex shrink-0 items-center gap-2 md:hidden`}>
              <button
                type="button"
                onClick={toggleLocale}
                aria-label={t.nav.languageSwitchAria}
                className="inline-flex h-9 min-w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 px-3 text-xs font-semibold tracking-[0.12em] text-white transition hover:border-neon/40 hover:bg-neon/10"
              >
                {isArabic ? "EN" : "AR"}
              </button>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen((current) => !current)}
                aria-expanded={isMobileMenuOpen}
                aria-label={isMobileMenuOpen ? t.nav.closeMenu : t.nav.openMenu}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-neon/40 hover:bg-neon/10"
              >
                <span className="text-base leading-none">{isMobileMenuOpen ? "✕" : "☰"}</span>
              </button>
            </div>
          </nav>

          <AnimatePresence>
            {isMobileMenuOpen ? (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="glass neon-ring mt-2 space-y-2 rounded-2xl px-2 py-2 shadow-glow md:hidden"
              >
                {navigation.map((item) => (
                  <button
                    type="button"
                    key={`mobile-${item.href}`}
                    onClick={() => handleNavigationClick(item.id)}
                    className={`flex w-full items-center justify-center rounded-xl border px-3 py-2 text-[11px] transition ${
                      activeSection === item.id
                        ? "border-neon/55 bg-neon/15 text-white"
                        : "border-white/10 bg-black/25 text-white/70 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => handleNavigationClick("contact")}
                  className="flex w-full items-center justify-center rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-[11px] text-white transition hover:border-neon/40 hover:bg-neon/10"
                >
                  {t.nav.letsBuild}
                </button>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </motion.div>
      </header>

      <main className="relative z-10">
        <section id="home" className="section-shell flex min-h-screen items-center py-20 sm:py-28">
          <motion.div
            variants={staggerChildren}
            initial="hidden"
            animate="visible"
            className="grid w-full items-center gap-10 sm:gap-12 lg:grid-cols-[1.15fr_0.85fr]"
          >
            <div className="max-w-3xl space-y-8">
              <motion.div
                variants={fadeUpItem}
                className="glass inline-flex rounded-full px-3 py-2 text-[10px] tracking-[0.22em] text-white/65 sm:px-4 sm:text-xs sm:tracking-[0.35em]"
              >
                {t.hero.badge}
              </motion.div>

              <motion.div variants={fadeUpItem} className="space-y-5">
                <h1
                  className={`max-w-4xl text-4xl font-semibold text-white sm:text-6xl lg:text-7xl ${
                    isArabic ? "leading-[1.3] tracking-normal overflow-visible pt-1 pb-4" : "leading-[0.95] tracking-[-0.04em]"
                  }`}
                >
                  {isArabic ? (
                    <>
                      <span className="block leading-[1.22]">{t.hero.titleMain}</span>
                      <span className="mt-3 block leading-[1.22] pb-1">
                        <span className="text-white/40">| </span>
                        <span className="text-gradient">{t.hero.titleLine2}</span>
                      </span>
                      <span className="mt-3 block leading-[1.22] text-cyan-100">{t.hero.titleLine3}</span>
                    </>
                  ) : (
                    <>
                      {t.hero.titleMain} <span className="text-white/40">|</span> <span className="text-gradient">{t.hero.titleAccent}</span>
                    </>
                  )}
                </h1>
                <p className="max-w-2xl text-base leading-7 text-white/68 sm:text-xl sm:leading-8">{t.hero.description}</p>
              </motion.div>

              <motion.div variants={fadeUpItem} className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
                <button
                  type="button"
                  onClick={() => handleNavigationClick("projects")}
                  className="w-full rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:scale-[1.02] sm:w-auto"
                >
                  {t.hero.primaryCta}
                </button>
                <button
                  type="button"
                  onClick={() => handleNavigationClick("contact")}
                  className="glass w-full rounded-full px-6 py-3 text-sm font-semibold text-white transition hover:border-neon/40 hover:text-neon sm:w-auto"
                >
                  {t.hero.secondaryCta}
                </button>
              </motion.div>

              <motion.div variants={fadeUpItem} className="grid gap-3 sm:grid-cols-3 sm:gap-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="glass rounded-3xl p-5 shadow-card">
                    <div className="text-2xl font-semibold text-white">{stat.value}</div>
                    <div className="mt-2 text-sm text-white/55">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            <motion.div variants={fadeUpItem} className="relative mx-auto h-[360px] w-full max-w-xl sm:h-[420px] lg:h-[540px]">
              <div className="absolute inset-0 rounded-[2rem] border border-white/10 bg-white/[0.02] backdrop-blur-sm" />
              <div className="absolute inset-4 rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(110,231,255,0.12),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(255,79,216,0.12),transparent_30%)] sm:inset-6" />
              <div className="pointer-events-none absolute bottom-4 left-4 right-4 top-4 overflow-hidden rounded-[2rem] sm:bottom-6 sm:left-6 sm:right-6 sm:top-6">
                <Image
                  src={myPhoto}
                  alt={t.hero.portraitAlt}
                  priority
                  className="absolute inset-0 h-full w-full object-cover object-top"
                  style={{
                    transform: `translate3d(0, ${heroPhotoOffsetY}px, 0) scale(${heroPhotoScale})`,
                    transformOrigin: "center top",
                  }}
                />
              </div>
              <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/30 px-4 py-3 backdrop-blur-md sm:bottom-8 sm:left-8 sm:right-8 sm:rounded-3xl sm:px-5 sm:py-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.16em] text-white/45 sm:text-base sm:tracking-[0.22em]">{isArabic ? "خالد الواكد" : "Khaled M Alwaked"}</p>
                  <p className="mt-1 text-xs text-white/70 sm:text-sm">{t.hero.portraitRole}</p>
                </div>
                <div className="h-3 w-3 animate-pulse rounded-full bg-neon shadow-[0_0_20px_rgba(110,231,255,0.9)]" />
              </div>
            </motion.div>
          </motion.div>
        </section>

        <section id="skills" className="section-shell py-8 sm:py-16">
          <MotionReveal className="space-y-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="space-y-3">
                <p className="text-sm tracking-[0.45em] text-neon/70">{t.skills.eyebrow}</p>
                <h2 className="text-2xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">{t.skills.title}</h2>
              </div>
              <p className="max-w-2xl text-sm leading-7 text-white/62 sm:text-base">{t.skills.description}</p>
            </div>

            <div className="glass overflow-hidden rounded-[1.5rem] border-white/10 py-4 shadow-card sm:rounded-[2rem] sm:py-5">
              <div className="marquee-track flex gap-4 px-4">
                {duplicatedMarquee.map((item, index) => (
                  <div
                    key={`${item}-${index}`}
                    className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs text-white/78 sm:gap-3 sm:px-5 sm:py-3 sm:text-base"
                  >
                    <span className="h-2.5 w-2.5 rounded-full bg-neon shadow-[0_0_14px_rgba(110,231,255,0.9)]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </MotionReveal>
        </section>

        <section id="projects" className="section-shell py-10 sm:py-20">
          <MotionReveal className="space-y-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="space-y-3">
                <p className="text-sm tracking-[0.45em] text-neon/70">{t.projects.eyebrow}</p>
                <h2 className="text-2xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">{t.projects.title}</h2>
              </div>
              <p className="max-w-2xl text-sm leading-7 text-white/62 sm:text-base">{t.projects.description}</p>
            </div>

            <BentoGrid items={projectCards} labels={t.projects.labels} />
          </MotionReveal>
        </section>

        <section id="contact" className="section-shell pb-16 pt-10 sm:pb-28 sm:pt-20">
          <MotionReveal>
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="space-y-5">
                <p className="text-sm tracking-[0.45em] text-neon/70">{t.contact.eyebrow}</p>
                <h2 className="max-w-xl text-2xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">{t.contact.title}</h2>
                <p className="max-w-xl text-sm leading-7 text-white/64 sm:text-base">{t.contact.description}</p>
                <div className="glass inline-flex rounded-3xl px-5 py-4 text-sm text-white/65 shadow-card">{t.contact.availability}</div>
              </div>

              <div className="glass neon-ring rounded-[1.5rem] p-4 shadow-glow sm:rounded-[2rem] sm:p-8">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95, y: 12 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.96, y: -10 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className="flex min-h-[420px] flex-col items-center justify-center gap-5 text-center"
                    >
                      <div className="flex h-20 w-20 items-center justify-center rounded-full border border-neon/30 bg-neon/10 text-3xl text-neon shadow-glow">
                        ✓
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-2xl font-semibold text-white">{t.contact.successTitle}</h3>
                        <p className="max-w-md text-sm leading-7 text-white/65 sm:text-base">{t.contact.successDescription}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSubmitted(false)}
                        className="rounded-full border border-white/10 px-5 py-3 text-sm font-medium text-white transition hover:border-neon/40 hover:text-neon"
                      >
                        {t.contact.sendAnother}
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -14 }}
                      transition={{ duration: 0.4 }}
                      onSubmit={handleSubmit}
                      className="space-y-5"
                    >
                      <div className="grid gap-5 sm:grid-cols-2">
                        <label className="space-y-2 text-sm text-white/70">
                          <span>{t.form.name}</span>
                          <input
                            value={form.name}
                            onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                            className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-neon/50 focus:bg-black/40"
                            placeholder={t.form.namePlaceholder}
                          />
                          {errors.name ? <span className="text-xs text-rose-300">{errors.name}</span> : null}
                        </label>
                        <label className="space-y-2 text-sm text-white/70">
                          <span>{t.form.email}</span>
                          <input
                            value={form.email}
                            onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                            className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-neon/50 focus:bg-black/40"
                            placeholder={t.form.emailPlaceholder}
                            type="email"
                          />
                          {errors.email ? <span className="text-xs text-rose-300">{errors.email}</span> : null}
                        </label>
                      </div>

                      <label className="space-y-2 text-sm text-white/70">
                        <span>{t.form.brief}</span>
                        <textarea
                          value={form.message}
                          onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
                          className="min-h-40 w-full rounded-[1.5rem] border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-neon/50 focus:bg-black/40"
                          placeholder={t.form.briefPlaceholder}
                        />
                        {errors.message ? <span className="text-xs text-rose-300">{errors.message}</span> : null}
                      </label>

                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-xs tracking-[0.3em] text-white/38">{t.form.hint}</p>
                        <button
                          type="submit"
                          className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:scale-[1.02]"
                        >
                          {t.form.submit}
                        </button>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </MotionReveal>
        </section>
      </main>
    </div>
  );
}
