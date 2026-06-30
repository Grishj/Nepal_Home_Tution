import {
  Award,
  BadgeCheck,
  BookOpen,
  Brain,
  BriefcaseBusiness,
  Calculator,
  CalendarClock,
  CheckCircle2,
  Code2,
  GraduationCap,
  Headphones,
  Home,
  Languages,
  Laptop,
  LineChart,
  Microscope,
  PenTool,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  WalletCards,
} from "lucide-react";

export const contact = {
  name: "Nepal Home Tuition Center",
  phone: import.meta.env.VITE_OWNER_PHONE || "+977 9810754805",
  phoneHref: import.meta.env.VITE_OWNER_PHONE_HREF || "+9779810754805",
  whatsapp: import.meta.env.VITE_WHATSAPP_NUMBER || "9779810754805",
  email: import.meta.env.VITE_OWNER_EMAIL || "joshisanjaya049@gmail.com",
  formEmail:
    import.meta.env.VITE_FORMSUBMIT_EMAIL ||
    import.meta.env.VITE_OWNER_EMAIL ||
    "joshisanjaya049@gmail.com",
  facebook:
    import.meta.env.VITE_FACEBOOK_URL ||
    "https://www.facebook.com/share/1HcZcLV1DT/",
  instagram:
    import.meta.env.VITE_INSTAGRAM_URL ||
    "https://www.instagram.com/nepal_home_tuition/",
  tiktok: import.meta.env.VITE_TIKTOK_URL || "",
  youtube: import.meta.env.VITE_YOUTUBE_URL || "",
  linkedin: import.meta.env.VITE_LINKEDIN_URL || "",
  address: import.meta.env.VITE_OFFICE_ADDRESS || "Kathmandu, Nepal",
  workingHours: "Sunday - Friday, 7:00 AM - 8:00 PM",
  mapsEmbed:
    import.meta.env.VITE_GOOGLE_MAPS_EMBED ||
    "https://www.google.com/maps?q=Kathmandu%2C%20Nepal&output=embed",
};

export const visuals = {
  hero: "https://assets-api.kathmandupost.com/thumb.php?src=https://assets-cdn.kathmandupost.com/uploads/source/news/2020/miscellaneous/shutterstock_784612318.jpg&w=900&height=601",
  about:
    "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=82",
  online:
    "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?auto=format&fit=crop&w=1200&q=82",
};

export const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Vacancies", href: "/vacancies" },
  { label: "Commission", href: "/commission" },
  { label: "Become Tutor", href: "/become-tutor" },
  { label: "Contact", href: "/contact" },
];

export const whyChooseUs = [
  {
    title: "Experienced Tutors",
    icon: Award,
    text: "Skilled teachers for school, college, language, and entrance preparation.",
  },
  {
    title: "Verified Teachers",
    icon: ShieldCheck,
    text: "Tutor profiles are reviewed before matching them with parents.",
  },
  {
    title: "Affordable Service",
    icon: WalletCards,
    text: "Practical fee guidance for families and fair earning for tutors.",
  },
  {
    title: "Home Tuition",
    icon: Home,
    text: "One-to-one learning at the student's home with flexible schedules.",
  },
  {
    title: "Online Tuition",
    icon: Laptop,
    text: "Remote classes for students who need reliable online support.",
  },
  {
    title: "Flexible Schedule",
    icon: CalendarClock,
    text: "Morning, day, and evening options based on student availability.",
  },
  {
    title: "Fast Tutor Matching",
    icon: BadgeCheck,
    text: "We quickly shortlist suitable tutors after understanding requirements.",
  },
  {
    title: "Trusted by Parents",
    icon: Star,
    text: "Clear communication, transparent process, and long-term support.",
  },
];

export const services = [
  {
    title: "Home Tuition",
    icon: Home,
    text: "Personal tutor visits for focused academic support.",
  },
  {
    title: "Online Tuition",
    icon: Headphones,
    text: "Live online learning with flexible timing.",
  },
  {
    title: "SEE Preparation",
    icon: BookOpen,
    text: "Targeted support for board exam confidence.",
  },
  {
    title: "+2 Science",
    icon: Microscope,
    text: "Physics, Chemistry, Biology, Math, and Computer.",
  },
  {
    title: "Management",
    icon: BriefcaseBusiness,
    text: "Account, Economics, Business Studies, and more.",
  },
  {
    title: "Bachelor Level",
    icon: GraduationCap,
    text: "Subject help for higher-level learners.",
  },
  {
    title: "Japanese Language",
    icon: Languages,
    text: "Language classes for study, work, and interviews.",
  },
  {
    title: "IELTS Preparation",
    icon: PenTool,
    text: "Reading, writing, speaking, and listening guidance.",
  },
  {
    title: "Spoken English",
    icon: Sparkles,
    text: "Confidence-building English communication practice.",
  },
  {
    title: "Computer Courses",
    icon: Code2,
    text: "Programming, office tools, and practical computer skills.",
  },
];

export const subjects = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "Nepali",
  "Computer",
  "Account",
  "Economics",
  "Optional Math",
  "Science",
  "Social Studies",
  "C Programming",
  "Python",
  "Java",
];

export const subjectIcons = [
  Calculator,
  Brain,
  Microscope,
  BookOpen,
  PenTool,
  Languages,
  Laptop,
  LineChart,
];

export const howItWorks = [
  "Parent contacts us.",
  "We understand requirements.",
  "We select a qualified tutor.",
  "Demo class.",
  "Regular tuition starts.",
];

export interface Testimonial {
  label: string;
  quote: string;
  name: string;
  avatar: string;
}

export const testimonials: Testimonial[] = [
  {
    label: "Happy Parents",
    quote:
      "The tutor understood our child's weak areas quickly and the regular updates helped us feel confident.",
    name: "Radha Sharma",
    avatar: "https://i.pravatar.cc/60?u=radha-sharma",
  },
  {
    label: "Happy Students",
    quote:
      "My Math lessons became easier because the tutor explained every topic step by step.",
    name: "Aarav Thapa",
    avatar: "https://i.pravatar.cc/60?u=aarav-thapa",
  },
  {
    label: "Happy Tutors",
    quote:
      "The process was transparent, the parent matched my subjects, and the commission policy was clear.",
    name: "Prakash Adhikari",
    avatar: "https://i.pravatar.cc/60?u=hari-poudel",
  },
];

export const stats = [
  { value: 200, suffix: "+", label: "Tutors", icon: Users },
  { value: 500, suffix: "+", label: "Students", icon: GraduationCap },
  { value: 1000, suffix: "+", label: "Classes Completed", icon: BookOpen },
  { value: 95, suffix: "%", label: "Parent Satisfaction", icon: CheckCircle2 },
];

export const tutorSubjectOptions = subjects;

export const classOptions = [
  "Nursery - Class 5",
  "Class 6 - 8",
  "Class 9 - 10",
  "SEE",
  "+2 Science",
  "+2 Management",
  "Bachelor Level",
  "Language Classes",
  "IELTS",
  "Computer Courses",
];

export const languageOptions = [
  "Nepali",
  "English",
  "Hindi",
  "Japanese",
  "Korean",
];
