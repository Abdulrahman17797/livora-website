// [0] = plain prefix (empty string = all-gradient heading), [1] = gradient part
type HeadParts = readonly [string, string];

interface SiteTranslation {
  nav: {
    home: string; products: string; about: string; order: string; orderCta: string;
  };
  footer: {
    tagline: string; getInTouch: string; copyright: string;
  };
  home: {
    heroBadge: string;
    heroH1: HeadParts;
    heroSub: string;
    heroPrimary: string;
    heroSecondary: string;
    liveBadge: string;
    flavoursH2: HeadParts;
    flavoursSub: string;
    viewDetails: string;
    brewH2: HeadParts;
    brewBody: string;
    stats: ReadonlyArray<{ stat: string; label: string }>;
    ctaH2: HeadParts;
    ctaSub: string;
    ctaBtn: string;
  };
  products: {
    badge: string;
    h1: HeadParts;
    sub: string;
    orderNow: string;
    brewNote: string;
    ctaH2: HeadParts;
    ctaSub: string;
    ctaBtn: string;
  };
  about: {
    badge: string;
    h1: HeadParts;
    valuesH2: HeadParts;
    ctaH2: HeadParts;
    seeProducts: string;
    orderNow: string;
    values: ReadonlyArray<{ title: string; body: string; emoji: string }>;
  };
  order: {
    badge: string;
    h1: HeadParts;
    sub: string;
    chooseFlavours: string;
    yourDetails: string;
    fullName: string;
    namePlaceholder: string;
    phone: string;
    phonePlaceholder: string;
    address: string;
    addressPlaceholder: string;
    notes: string;
    notesOptional: string;
    notesPlaceholder: string;
    summary: string;
    total: string;
    brewNote: string;
    disabledBtn: string;
    submitBtnPrefix: string;
    successH1: HeadParts;
    anotherOrder: string;
    waHeader: string;
    waTotal: string;
    waName: string;
    waPhone: string;
    waAddress: string;
    waNotes: string;
    deliveryAreaLabel: string;
    areaOptions: ReadonlyArray<{ value: string; label: string }>;
    deliveryLabel: string;
    deliveryFree: string;
    freeDeliveryNote: string;
    subtotalLabel: string;
    disabledAreaBtn: string;
    waArea: string;
    waDelivery: string;
    waSubtotal: string;
    gccPickupNote: string;
    travelPackingLabel: string;
    waTravel: string;
  };
  flavours: ReadonlyArray<{
    id: string;
    name: string;
    shortName: string;
    note: string;
    tagline: string;
    image: string;
  }>;
}

const en: SiteTranslation = {
  nav: {
    home: "Home",
    products: "Products",
    about: "About",
    order: "Order",
    orderCta: "Order Now",
  },
  footer: {
    tagline: "Live Better. Drink Better.",
    getInTouch: "Get in Touch",
    copyright: "Livora Kombucha. All rights reserved.",
  },
  home: {
    heroBadge: "Small-Batch Kombucha",
    heroH1: ["Drink Your Way to", "Feeling Alive"],
    heroSub:
      "Livora Kombucha is crafted with real ingredients, live cultures, and the belief that what you drink should make you feel extraordinary.",
    heroPrimary: "Order Now",
    heroSecondary: "Our Story",
    liveBadge: "Freshly brewed to order — 3 flavours available now",
    flavoursH2: ["Our", "Flavours"],
    flavoursSub: "Three kombucha brewed fresh to order in Bahrain.",
    viewDetails: "View details →",
    brewH2: ["Brewed with", "Purpose"],
    brewBody:
      "We source organic teas, use raw cane sugar, and let time do its work. No shortcuts. No artificial anything. Just pure, living kombucha that your gut will thank you for.",
    stats: [
      { stat: "5–7", label: "Days brewed to order" },
      { stat: "100%", label: "Organic tea" },
    ],
    ctaH2: ["Ready to", "feel the difference?"],
    ctaSub: "Order your kombucha and we'll brew it fresh for you.",
    ctaBtn: "Start Your Order",
  },
  products: {
    badge: "The Range",
    h1: ["Our", "Kombucha"],
    sub: "Three flavours. Freshly brewed to order in Bahrain. Nothing artificial.",
    orderNow: "Order Now",
    brewNote:
      "Available in 500ml & 1 Litre | Handcrafted in Bahrain. No preservatives. No shortcuts. Raw. Alive. Delicious. Freshly brewed to order — please allow 5–7 days for preparation before delivery.",
    ctaH2: ["Ready to", "taste the difference?"],
    ctaSub: "Place your order and we'll brew it fresh. Delivered within 5–7 days.",
    ctaBtn: "Place an Order",
  },
  about: {
    badge: "Our Story",
    h1: ["We brew for", "people who care"],
    valuesH2: ["What we", "stand for"],
    ctaH2: ["Want to taste the", "difference?"],
    seeProducts: "See Our Products",
    orderNow: "Order Now",
    values: [
      {
        title: "Real Ingredients",
        body: "Every botanical, every fruit, every spice is sourced from trusted organic suppliers. If we wouldn't eat it, it won't touch our brew.",
        emoji: "🌿",
      },
      {
        title: "Live Cultures",
        body: "Our SCOBY — Symbiotic Culture of Bacteria and Yeast — has been carefully maintained for years. It's the beating heart of every bottle.",
        emoji: "🧬",
      },
      {
        title: "No Shortcuts",
        body: "Every batch is brewed fresh to order in 5–7 days. No pasteurisation, no shortcuts — just honest kombucha bottled at its peak.",
        emoji: "⏳",
      },
      {
        title: "Gut-First Philosophy",
        body: "We believe food and drink should nourish, not just fill. Everything we make is designed to support your microbiome and your wellbeing.",
        emoji: "💜",
      },
    ],
  },
  order: {
    badge: "Place Your Order",
    h1: ["Place Your", "Order"],
    sub: "Pick your flavours, fill in your details, and we'll brew it fresh for you.",
    chooseFlavours: "Choose Your Flavours",
    yourDetails: "Your Details",
    fullName: "Full Name",
    namePlaceholder: "Jane Smith",
    phone: "Phone Number",
    phonePlaceholder: "+973 XXXX XXXX",
    address: "Delivery Address",
    addressPlaceholder: "Street, area, city",
    notes: "Notes",
    notesOptional: "optional",
    notesPlaceholder: "Gifting, specific instructions, etc.",
    summary: "Order Summary",
    total: "Total",
    brewNote:
      "Freshly brewed to order — please allow 5–7 days for preparation before delivery.",
    disabledBtn: "Select at least one bottle to continue",
    submitBtnPrefix: "Place Order — BHD",
    successH1: ["Order", "Received!"],
    anotherOrder: "Place Another Order",
    waHeader: "🛒 *New Livora Order*",
    waTotal: "*Total:*",
    waName: "*Name:*",
    waPhone: "*Phone:*",
    waAddress: "*Address:*",
    waNotes: "*Notes:*",
    deliveryAreaLabel: "Delivery Area",
    areaOptions: [
      { value: "muharraq", label: "Muharraq" },
      { value: "rest", label: "Rest of Bahrain" },
      { value: "gcc", label: "GCC travel pack (pickup in Bahrain)" },
    ],
    deliveryLabel: "Delivery",
    deliveryFree: "Free",
    freeDeliveryNote: "Free delivery on orders over BHD 25.000",
    subtotalLabel: "Items",
    disabledAreaBtn: "Select a delivery area to continue",
    waArea: "*Area:*",
    waDelivery: "*Delivery:*",
    waSubtotal: "*Items:*",
    gccPickupNote: "Pickup details will be sent via WhatsApp after ordering.",
    travelPackingLabel: "Travel packing",
    waTravel: "*Travel packing:*",
  },
  flavours: [
    {
      id: "orange-ginger",
      name: "Orange Ginger Kombucha",
      shortName: "Orange Ginger",
      note: "Vibrant and gut-loving",
      tagline: "Sun-ripened orange and fresh ginger. Vibrant and gut-loving.",
      image: "/orange-ginger.jpeg",
    },
    {
      id: "ginger-lime",
      name: "Ginger Lime Kombucha",
      shortName: "Ginger Lime",
      note: "Spicy-citrus balance",
      tagline: "Zesty lime meets warming ginger. Spicy-citrus balance.",
      image: "/ginger-lime.png.jpeg",
    },
    {
      id: "berry-hibiscus",
      name: "Berry Hibiscus Kombucha",
      shortName: "Berry Hibiscus",
      note: "Rich and tangy",
      tagline: "Bold mixed berries and hibiscus. Rich and tangy.",
      image: "/berry.hebiscus.jpeg.jpeg",
    },
  ],
};

const ar: SiteTranslation = {
  nav: {
    home: "الرئيسية",
    products: "المنتجات",
    about: "من نحن",
    order: "الطلب",
    orderCta: "اطلب الآن",
  },
  footer: {
    tagline: "عِش أفضل. اشرب أفضل.",
    getInTouch: "تواصل معنا",
    copyright: "Livora Kombucha. جميع الحقوق محفوظة.",
  },
  home: {
    heroBadge: "ليفورا",
    heroH1: ["من الطبيعة…", "تنبض بالحياة"],
    heroSub:
      "كومبوتشا مصنوعة من مكونات طبيعية ونكهات حقيقية — مشروب غازي صحي يمنحك إحساساً مختلفاً.",
    heroPrimary: "اطلب الآن",
    heroSecondary: "قصتنا",
    liveBadge: "يُحضّر عند الطلب — 3 نكهات متاحة الآن",
    flavoursH2: ["", "نكهاتنا"],
    flavoursSub: "ثلاث نكهات كومبوتشا تُحضَّر طازجة عند الطلب في البحرين.",
    viewDetails: "التفاصيل ←",
    brewH2: ["نصنعه", "بعناية"],
    brewBody:
      "نستخدم شاياً عضوياً وسكر قصب خاماً، ونترك الوقت يكمل عمله. بلا اختصارات. بلا مضافات اصطناعية. فقط كومبوتشا نقي وحي تشكرك صحتك عليه.",
    stats: [
      { stat: "5–7", label: "أيام تحضير عند الطلب" },
      { stat: "100%", label: "شاي عضوي" },
    ],
    ctaH2: ["هل أنت مستعد", "لتشعر بالفرق؟"],
    ctaSub: "اطلب كومبوتشاك وسنُحضّره طازجاً لك.",
    ctaBtn: "ابدأ طلبك",
  },
  products: {
    badge: "المجموعة",
    h1: ["", "كومبوتشاتنا"],
    sub: "ثلاث نكهات. تُحضَّر طازجة عند الطلب في البحرين. بلا أي مواد اصطناعية.",
    orderNow: "اطلب الآن",
    brewNote:
      "متوفر بحجمي 500 مل و 1 لتر | صناعة يدوية في البحرين. بلا مواد حافظة. بلا اختصارات. خام. حي. لذيذ. يُحضَّر طازجاً عند الطلب — يُرجى السماح بـ 5–7 أيام للتحضير قبل التوصيل.",
    ctaH2: ["هل أنت مستعد", "لتذوق الفرق؟"],
    ctaSub: "ضع طلبك وسنُحضّره طازجاً. التوصيل خلال 5–7 أيام.",
    ctaBtn: "اطلب الآن",
  },
  about: {
    badge: "قصتنا",
    h1: ["نصنع من أجل", "من يهتم"],
    valuesH2: ["ما نؤمن", "به"],
    ctaH2: ["هل تريد", "تذوق الفرق؟"],
    seeProducts: "تصفح منتجاتنا",
    orderNow: "اطلب الآن",
    values: [
      {
        title: "مكونات حقيقية",
        body: "كل نبتة وكل ثمرة وكل توابل نستخدمها مصدرها موردون عضويون موثوقون. ما لا نقبله على طعامنا، لن يقترب من مشروبنا.",
        emoji: "🌿",
      },
      {
        title: "ثقافات حية",
        body: "مزرعتنا الحية (SCOBY) — ثقافة تكافلية من البكتيريا والخميرة — يتم العناية بها بعناية منذ سنوات. إنها القلب النابض لكل زجاجة.",
        emoji: "🧬",
      },
      {
        title: "بلا اختصارات",
        body: "كل دفعة تُحضّر طازجة عند الطلب خلال 5–7 أيام. بلا اختصارات — كومبوتشا صادقة بأفضل نكهة.",
        emoji: "⏳",
      },
      {
        title: "فلسفة صحة الأمعاء",
        body: "نؤمن بأن الطعام والشراب يجب أن يغذّيا لا أن يملآ فقط. كل ما نصنعه مصمم لدعم صحة أمعائك ورفاهيتك العامة.",
        emoji: "💜",
      },
    ],
  },
  order: {
    badge: "ضع طلبك",
    h1: ["ضع", "طلبك"],
    sub: "اختر نكهاتك، أدخل بياناتك، وسنُحضّره طازجاً لك.",
    chooseFlavours: "اختر نكهاتك",
    yourDetails: "بياناتك",
    fullName: "الاسم الكامل",
    namePlaceholder: "محمد علي",
    phone: "رقم الهاتف",
    phonePlaceholder: "+973 XXXX XXXX",
    address: "عنوان التوصيل",
    addressPlaceholder: "الشارع، المنطقة، المدينة",
    notes: "ملاحظات",
    notesOptional: "اختياري",
    notesPlaceholder: "هدية، تعليمات خاصة، إلخ.",
    summary: "ملخص الطلب",
    total: "المجموع",
    brewNote:
      "يُحضَّر طازجاً عند الطلب — يُرجى السماح بـ 5–7 أيام للتحضير قبل التوصيل.",
    disabledBtn: "اختر زجاجة واحدة على الأقل للمتابعة",
    submitBtnPrefix: "تأكيد الطلب — BHD",
    successH1: ["تم استلام", "طلبك!"],
    anotherOrder: "طلب جديد",
    waHeader: "🛒 *طلب جديد من Livora*",
    waTotal: "*المجموع:*",
    waName: "*الاسم:*",
    waPhone: "*الهاتف:*",
    waAddress: "*العنوان:*",
    waNotes: "*ملاحظات:*",
    deliveryAreaLabel: "منطقة التوصيل",
    areaOptions: [
      { value: "muharraq", label: "المحرق" },
      { value: "rest", label: "باقي البحرين" },
      { value: "gcc", label: "طلب لدول الخليج (الاستلام من البحرين)" },
    ],
    deliveryLabel: "التوصيل",
    deliveryFree: "مجاني",
    freeDeliveryNote: "توصيل مجاني للطلبات فوق 25.000 د.ب",
    subtotalLabel: "المنتجات",
    disabledAreaBtn: "اختر منطقة التوصيل للمتابعة",
    waArea: "*المنطقة:*",
    waDelivery: "*التوصيل:*",
    waSubtotal: "*المنتجات:*",
    gccPickupNote: "سيتم إرسال تفاصيل الاستلام عبر واتساب بعد الطلب.",
    travelPackingLabel: "التغليف للسفر",
    waTravel: "*التغليف للسفر:*",
  },
  // Product names stay in English — only taglines/notes are translated
  flavours: [
    {
      id: "orange-ginger",
      name: "Orange Ginger Kombucha",
      shortName: "Orange Ginger",
      note: "حمضيات منعشة مع لسعة الزنجبيل الدافئة.",
      tagline:
        "حمضيات منعشة مع لسعة الزنجبيل الدافئة. مشروب غازي صحي ومنعش.",
      image: "/orange-ginger.jpeg",
    },
    {
      id: "ginger-lime",
      name: "Ginger Lime Kombucha",
      shortName: "Ginger Lime",
      note: "نكهة منعشة وخفيفة بالليم والزنجبيل.",
      tagline:
        "نكهة منعشة وخفيفة بالليم والزنجبيل. مشروب غازي صحي ومنعش.",
      image: "/ginger-lime.png.jpeg",
    },
    {
      id: "berry-hibiscus",
      name: "Berry Hibiscus Kombucha",
      shortName: "Berry Hibiscus",
      note: "نكهة جريئة وعميقة بلمسة من الكركديه.",
      tagline:
        "نكهة جريئة وعميقة بلمسة من الكركديه. توت طبيعي، مشروب غازي صحي ومنعش.",
      image: "/berry.hebiscus.jpeg.jpeg",
    },
  ],
};

export const translations = { en, ar };
