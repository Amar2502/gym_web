export type NavLink = {
  label: string;
  href: string;
};

export type Program = {
  title: string;
  description: string;
  icon: "barbell" | "muscle" | "heart" | "user" | "nutrition";
};

export type MembershipTier = {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  featured: boolean;
  cta: string;
  whatsappMessage: string;
};

export type GalleryImage = {
  src: string;
  alt: string;
};

export type Testimonial = {
  name: string;
  quote: string;
  detail: string;
  image: string;
};

export type PetersGymConfig = {
  site: {
    name: string;
    displayName: string;
    tagline: string;
    description: string;
    location: string;
    address: string;
    city: string;
    phone: string;
    whatsapp: string;
    whatsappMessage: string;
    instagram: string;
    facebook: string;
    hours: { day: string; time: string }[];
  };
  metadata: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
  };
  nav: NavLink[];
  hero: {
    backgroundImage: string;
    headline: string;
    tagline: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
    badges: string[];
  };
  founder: {
    name: string;
    image: string;
    titles: string[];
    bio: string;
    philosophy: string;
  };
  programs: {
    label: string;
    title: string;
    description: string;
    items: Program[];
  };
  membership: {
    label: string;
    title: string;
    description: string;
    disclaimer: string;
    tiers: MembershipTier[];
  };
  gallery: {
    label: string;
    title: string;
    description: string;
    images: GalleryImage[];
  };
  testimonials: {
    label: string;
    title: string;
    items: Testimonial[];
  };
  contact: {
    label: string;
    title: string;
    description: string;
    whatsappCta: {
      title: string;
      description: string;
      buttonLabel: string;
    };
    mapEmbedUrl: string;
  };
  footer: {
    tagline: string;
    copyright: string;
  };
};

export const petersGym: PetersGymConfig = {
  site: {
    name: "Iron House Gym",
    displayName: "Iron House Gym",
    tagline: "Mumbai's Premier Bodybuilding Gym",
    description:
      "Hardcore strength training and bodybuilding coaching in the heart of Mumbai — built by champions, for champions.",
    location: "Motilal Nagar I, Near Oshiwara Bus Depot",
    address: "Motilal Nagar I, Near Oshiwara Bus Depot",
    city: "Mumbai, Maharashtra",
    phone: "+91 8291613471",
    whatsapp: "918291613471",
    whatsappMessage: "Hi, I'd like to join Iron House Gym. Please share membership details.",
    instagram: "https://instagram.com/ironhousegymmumbai",
    facebook: "https://facebook.com/ironhousegymmumbai",
    hours: [
      { day: "Mon – Sat", time: "5:00 AM – 11:00 PM" },
      { day: "Sunday", time: "6:00 AM – 9:00 PM" },
    ],
  },
  metadata: {
    title: "Iron House Gym — Mumbai's Premier Bodybuilding Gym",
    description:
      "Train at Iron House Gym in Oshiwara, Mumbai. Founded by 2x Mr. India Josh Stanner. Hardcore bodybuilding, strength training, and personal coaching.",
    ogTitle: "Iron House Gym — Where Champions Are Forged",
    ogDescription:
      "Mumbai's premier bodybuilding gym. Strength training, coaching, and nutrition guidance under champion-level leadership.",
  },
  nav: [
    { label: "About", href: "#about" },
    { label: "Programs", href: "#programs" },
    { label: "Pricing", href: "#membership" },
    { label: "Gallery", href: "#gallery" },
    { label: "Reviews", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
  ],
  hero: {
    backgroundImage: "/images/hero-bg.svg",
    headline: "Iron House Gym",
    tagline: "Discipline builds muscle. Excuses build nothing.",
    primaryCta: { label: "Join Now", href: "#whatsapp" },
    secondaryCta: { label: "View Programs", href: "#programs" },
    badges: [
      "2x Mr. India Founder",
      "IFBB Athlete Led",
      "Oshiwara, Mumbai",
    ],
  },
  founder: {
    name: "Josh Stanner",
    image: "/images/founder.jpg",
    titles: [
      "2x Mr. India",
      "2x Mr. World",
      "3x Inter-Services Champion",
      "2x National Champion",
      "Champion of Champions",
      "IFBB Athlete",
    ],
    bio: "Josh Stanner has spent decades at the pinnacle of competitive bodybuilding — representing India on the world stage and dominating national and inter-services championships. His training philosophy is forged in the trenches of elite competition.",
    philosophy:
      "Iron House Gym exists for one reason: to give serious lifters the environment, equipment, and coaching they need to build real muscle and real strength. No gimmicks. No shortcuts. Just iron, discipline, and results.",
  },
  programs: {
    label: "Programs & Services",
    title: "Built for serious lifters.",
    description:
      "Every program is designed around progressive overload, proper form, and the relentless consistency that separates champions from casual gym-goers.",
    items: [
      {
        title: "Strength Training",
        description:
          "Heavy compound lifts, power racks, and progressive overload programming for raw strength gains.",
        icon: "barbell",
      },
      {
        title: "Bodybuilding Coaching",
        description:
          "Hypertrophy-focused training under champion-level guidance — split routines, posing, and peak-week prep.",
        icon: "muscle",
      },
      {
        title: "Cardio & Conditioning",
        description:
          "Targeted conditioning to stay lean without sacrificing muscle — sleds, stairs, and HIIT finishers.",
        icon: "heart",
      },
      {
        title: "Personal Training",
        description:
          "One-on-one sessions with experienced coaches who train what they preach, every single day.",
        icon: "user",
      },
      {
        title: "Diet & Nutrition Guidance",
        description:
          "Macro planning, meal timing, and supplementation advice tailored to your physique goals.",
        icon: "nutrition",
      },
      {
        title: "Powerlifting Prep",
        description:
          "Specialized programming and coaching for competitive squat, bench, and deadlift — from first meet to national level.",
        icon: "barbell",
      },
 
    ],
  },
  membership: {
    label: "Membership",
    title: "Invest in iron. Invest in yourself.",
    description:
      "Straightforward pricing with no hidden fees. Choose the plan that matches your commitment level.",
    disclaimer: "",
    tiers: [
      {
        name: "Monthly",
        price: "₹2,000",
        period: "per month",
        description: "Full gym access with flexible month-to-month commitment.",
        features: [
          "Unlimited gym access",
          "Locker & shower facilities",
          "Basic training guidance",
          "Access to all equipment zones",
        ],
        featured: false,
        cta: "Join Monthly",
        whatsappMessage:
          "Hi, I'd like to join Iron House Gym on the Monthly plan (₹2,000/month). Please share details.",
      },
      {
        name: "Quarterly",
        price: "₹5,000",
        period: "per quarter",
        description: "Best value for committed lifters — save vs monthly billing.",
        features: [
          "Everything in Monthly",
          "2 personal training sessions",
          "Nutrition consultation",
          "Priority equipment access",
          "Body composition tracking",
        ],
        featured: true,
        cta: "Join Quarterly",
        whatsappMessage:
          "Hi, I'd like to join Iron House Gym on the Quarterly plan (₹5,000/quarter). Please share details.",
      },
      {
        name: "Yearly",
        price: "₹18,000",
        period: "per year",
        description: "Maximum savings for athletes who train year-round.",
        features: [
          "Everything in Quarterly",
          "6 personal training sessions",
          "Quarterly progress reviews",
          "Competition prep guidance",
          "Member-only training events",
        ],
        featured: false,
        cta: "Join Yearly",
        whatsappMessage:
          "Hi, I'd like to join Iron House Gym on the Yearly plan (₹18,000/year). Please share details.",
      },
    ],
  },
  gallery: {
    label: "Gallery",
    title: "The iron speaks for itself.",
    description:
      "Heavy racks, hard training, and real transformations — this is what Iron House Gym looks like.",
    images: [
      { src: "/images/gallery-1.jpg", alt: "Free weight training area" },
      { src: "/images/gallery-3.jpg", alt: "Dumbbell section" },
      { src: "/images/gallery-5.jpg", alt: "Leg day in progress" },
      { src: "/images/gallery-6.jpg", alt: "Back and shoulders workout" },
      { src: "/images/gallery-7.jpg", alt: "Cardio section" },
      { src: "/images/gallery-8.jpg", alt: "Gym floor overview" },
    ],
  },
  testimonials: {
    label: "Member Stories",
    title: "Real lifters. Real results.",
    items: [
      {
        name: "Rahul Sharma",
        quote:
          "I've trained at a dozen gyms in Mumbai. Iron House Gym is the only place that feels like a real bodybuilding gym — heavy iron, no nonsense, and coaches who actually know what they're doing.",
        detail: "Member · 14 months",
        image: "/images/testimonial-1.svg",
      },
      {
        name: "Amit Desai",
        quote:
          "Under Josh sir's guidance I added 8 kg of lean mass in six months. The programming is brutal but effective — exactly what I needed to prep for my first physique show.",
        detail: "Bodybuilding coaching",
        image: "/images/testimonial-2.svg",
      },
      {
        name: "Karan Mehta",
        quote:
          "The atmosphere here pushes you. Everyone is serious about their training. My deadlift went from 120 kg to 180 kg in under a year. No fluff, just results.",
        detail: "Strength training · 2 years",
        image: "/images/testimonial-3.svg",
      },
    ],
  },
  contact: {
    label: "Contact & Location",
    title: "Come train with us.",
    description:
      "Walk in near Oshiwara Bus Depot or message us directly — we reply fast on WhatsApp.",
    whatsappCta: {
      title: "Start on WhatsApp",
      description:
        "Tap below to chat with us. Ask about memberships, timings, personal training, or book a gym visit.",
      buttonLabel: "Message on WhatsApp",
    },
    // Paste from Google Maps "Embed a map" — apostrophe must be %27, not &#39;
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d764.0324389189113!2d72.83700604974972!3d19.155073382407505!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b7bcb64935ef%3A0xb10dd0b06c466f00!2sPeter%27s%20Gym%20Mumbai!5e0!3m2!1sen!2sin!4v1781540556153!5m2!1sen!2sin",
  },
  footer: {
    tagline: "Forged in discipline. Built in iron.",
    copyright: "Iron House Gym. All rights reserved.",
  },
};

/** Pre-built WhatsApp deep link — pass a custom message for tier-specific CTAs */
export function getWhatsAppUrl(
  config: PetersGymConfig = petersGym,
  message?: string
): string {
  const text = encodeURIComponent(message ?? config.site.whatsappMessage);
  return `https://wa.me/${config.site.whatsapp}?text=${text}`;
}

/** Fix HTML entities from Google Maps "Copy HTML" embed snippets */
export function getMapEmbedUrl(config: PetersGymConfig = petersGym): string {
  return config.contact.mapEmbedUrl
    .replace(/&#39;/g, "%27")
    .replace(/&quot;/g, "%22")
    .replace(/&amp;/g, "&");
}
