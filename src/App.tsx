import React, { useMemo, useState, useEffect, useRef } from "react";
import {
  Book, School, FileText, GraduationCap, Award, Briefcase, Newspaper, Users,
  Wrench, Mail, Phone, Linkedin, Download, Home
} from "lucide-react";

/* -------------------------
   Minimal UI primitives
   ------------------------- */
type BtnVariant = "default" | "outline" | "ghost";
type BtnSize = "default" | "icon";
function Button(
  { variant = "default", size = "default", className = "", ...props }:
  React.ButtonHTMLAttributes<HTMLButtonElement> & {variant?: BtnVariant; size?: BtnSize}
) {
  const base = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors";
  const byVariant = {
    default: "bg-neutral-900 text-white hover:opacity-95",
    outline: "border border-neutral-300 bg-white text-neutral-900 hover:bg-neutral-50",
    ghost: "text-neutral-900 hover:bg-neutral-100",
  }[variant];
  const bySize = size === "icon" ? "h-9 w-9 p-0" : "h-10 sm:h-9 px-3 py-2";
  return <button className={`${base} ${byVariant} ${bySize} ${className}`} {...props} />;
}
function Card({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`rounded-2xl border border-neutral-200 bg-white p-0 shadow-sm ${className}`} {...props} />;
}
function CardHeader({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`px-4 sm:px-5 pt-4 sm:pt-5 pb-0 ${className}`} {...props} />;
}
function CardTitle({ className = "", ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={`text-lg font-semibold tracking-tight ${className}`} {...props} />;
}
function CardContent({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`px-4 sm:px-5 pb-4 sm:pb-5 pt-3 ${className}`} {...props} />;
}
function Badge({ className = "", ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={`inline-flex items-center rounded-full border border-neutral-300 px-2 py-1 text-xs ${className}`} {...props} />;
}
function Separator({ className = "", ...props }: React.HTMLAttributes<HTMLHRElement>) {
  return <hr className={`border-t border-neutral-200 ${className}`} {...props} />;
}

/* =========================
   DATA (content only)
   ========================= */
const data = {
  name: "Shiril Saju",
  email: "shirilsaju@gmail.com",
  phone: "+91 9995747327",
  linkedin: "https://www.linkedin.com/in/shiril-saju-pom/",
  tagline: "Ph.D. Candidate in Production & Operations Management | IIM Bangalore",
  location: "Bengaluru, India",
  photo: { src: "./portrait.jpg", alt: "Portrait of Shiril Saju" }, // relative for GH Pages

  researchInterests: ["Technology Adoption","Sustainability","Government Interventions","Innovation Ecosystems"],
  teachingInterests: [
    "Operations Management","Business Analytics","Operations for Entrepreneurship",
    "Strategic Decision-Making in Competitive Environments",
  ],
  education: [
    {
      institution: "Indian Institute of Management Bangalore, India",
      url: "https://www.iimb.ac.in/",
      period: "2021–2026",
      degree: "Ph.D. in Production and Operations Management",
      details: ["CGPA: 3.61/4"],
      thesis: "Government Interventions for Socially Beneficial Technology Adoption",
      committee: [
        { name: "Nishant Kumar Verma (Chair)", url: "https://www.iimb.ac.in/user/157/nishant-kumar-verma" },
        { name: "Ananth Krishnamurthy", url: "https://www.iimb.ac.in/user/180/ananth-krishnamurthy" },
        { name: "Rajeev R. Tripathi", url: "https://www.iimb.ac.in/user/151/rajeev-r-tripathi" },
      ],
    },
    {
      institution: "National Institute of Technology Calicut, India",
      url: "https://nitc.ac.in/",
      period: "2012–2016",
      degree: "B.Tech in Mechanical Engineering",
      details: ["CGPA: 9.36/10"],
    },
  ],
  papersUnderReview: [
    {
      title: "Performance of Ecosystem Facilitating Precision Agriculture through Drones in Emerging Economies",
      authors: [{ name: "Nishant Kumar Verma (IIMB)", url: "https://www.iimb.ac.in/user/157/nishant-kumar-verma" }],
      status: "Under revision for resubmission to Production and Operations Management (UTD 24; FT50; ABDC A★)",
      awards: [
        { label: "EurOMA Inclusiveness Program Grant (2025)", url: null },
        { label: "POMS Nagesh Murthy EEDSA — Honorable Mention (2024)", url: "https://www.linkedin.com/posts/indian-institute-of-management-bangalore_phd-innovation-iimb-activity-7179047666545225728-kqd-" },
      ],
      conferences: [
        "INFORMS MSOM 2025 (UK)",
        "32nd EurOMA 2025 (Italy) — Doctoral Seminar & Main Conference",
        "34th POMS 2024 (USA)",
        "11th EurOMA Sustainable Operations & Supply Chains Forum 2024 (Germany)",
      ],
    },
    {
      title: "Evaluating the Ecosystem Facilitating Agriculture Technology Adoption in Emerging Economies",
      authors: [{ name: "Nishant Kumar Verma (IIMB)", url: "https://www.iimb.ac.in/user/157/nishant-kumar-verma" }],
      status: "Under review at International Journal of Production Economics (ABDC A)",
    },
  ],
  workInProgress: [
    {
      title: "Dynamic Pricing of Precision Agriculture Services under Two-Sided Learning and Yield and Service Uncertainty",
      target: "Manufacturing and Service Operations Management (UTD 24; FT50; ABDC A★)",
      coauthors: [
        { name: "Nishant Kumar Verma (IIMB)", url: "https://www.iimb.ac.in/user/157/nishant-kumar-verma" },
        { name: "Nagesh Murthy (University of Oregon)", url: "https://business.uoregon.edu/directory/faculty-staff/all/nmurthy" },
      ],
      status: "In progress",
      conferences: ["12th EurOMA Sustainable Operations & Supply Chains Forum 2025"],
    },
    {
      title: "Technology Intervention to Improve Precision Agriculture Awareness among Smallholder Farmers: A Field Experiment",
      target: "Journal of Operations Management (UTD 24; FT50; ABDC A★)",
      coauthors: [
        { name: "Nishant Kumar Verma (IIMB)", url: "https://www.iimb.ac.in/user/157/nishant-kumar-verma" },
        { name: "Ashish Kumar Jha (Trinity Business School)", url: "https://www.tcd.ie/business/people/faculty-professors/akjha/" },
      ],
      partner: { label: "Kerala Agricultural University", url: "https://kau.in/" },
      funding: "Research Seed Grant, IIM Bangalore",
      status: "In progress",
      conferences: ["18th Behavioral Operations Conference 2025 (Germany)"],
    },
  ],
  otherResearch: [
    {
      role: "Research Assistant, IIMB",
      period: "2021–2023",
      bullets: [
        { text: "Impact of Covid Second-Wave on Indian Automotive Industry", with: { name: "Prof. Jishnu Hazra", url: "https://www.iimb.ac.in/user/77/jishnu-hazra" } },
        { text: "Urban Air Mobility Infrastructure and Coalition Formation", with: { name: "Prof. Nishant Kumar Verma", url: "https://www.iimb.ac.in/user/157/nishant-kumar-verma" } },
      ],
    },
  ],
  press: [
    {
      title: "Solar boats: Opportunities and challenges towards achieving sustainable water transport",
      outlet: "Manufacturing Today",
      year: 2024,
      url: "https://www.manufacturingtodayindia.com/solar-boats-opportunities-and-challenges-towards-achieving-sustainable-water-transport/",
      authors: ["Shiril Saju", "Nishant Kumar Verma", "Sandith Thandasherry"],
    },
    {
      title: "5 hurdles India needs to overcome to become a global drone hub by 2030",
      outlet: "Forbes India",
      year: 2022,
      url: "https://www.forbesindia.com/article/iim-bangalore/5-hurdles-india-needs-to-overcome-to-become-a-global-drone-hub-by-2030/75437/1",
      authors: ["Shiril Saju", "Nishant Kumar Verma"],
    },
  ],
  testimonials: [
    "His ability to connect all concepts with real life situations keeps us engaged throughout. No suggestions for improvement.",
    "Very engaging and detailed course.",
    "the pace, content everything is good",
    "Good session with hands on practice also was good.",
    "Amazing faculty",
  ],
  teachingInstructor: [
    { name: "Probability and Statistics (PreDoc Math Clinic)", hours: "7.5 hrs (5 sessions)", rating: "Course scheduled in Term 2 AY2025–26" },
    { name: "Quantitative Techniques (PGP Prep Course)", hours: "9 hrs (6 sessions)", rating: "4.77/5 (46 students)" },
    { name: "Probability and Statistics (PhD Prep Course)", hours: "1.5 hrs (1 session)", rating: "4.61/5 (42 students)" },
    { name: "Introduction to Queueing (Foundations of Management Programme)", hours: "1.25 hrs (1 session)", rating: "4.4/5 (64 students)" },
    { name: "Operations Management (DEI Initiative)", hours: "10.5 hrs (7 sessions)", rating: "4.13/5 (10 students)" },
  ],
  teachingTA: [
    { name: "Operations Management (PGPEM Core)", faculty: "Jishnu Hazra", hours: "3 hrs (2 sessions)", rating: "4.92/5 (76 students)", grade: "Yet to receive" },
    { name: "Operations Management (EPGP Core)", faculty: "Haritha Saranga", hours: "4.5 hrs (3 sessions)", rating: "4.90/5 (82 students)", grade: "Excellent" },
    { name: "Project Management (PGP Elective)", faculty: "Nishant Kumar Verma", hours: "No tutorials", rating: null, grade: "Excellent" },
    { name: "Operations Management (PGP Core)", faculty: "Nishant Kumar Verma", hours: "9 hrs (6 sessions)", rating: "Not Available", grade: "Excellent" },
  ],
  teachingCase: {
    title: "Navalt: Scaling a Clean Tech Venture through Supply Chain Restructuring",
    coauthor: { name: "Nishant Kumar Verma (IIMB)", url: "https://www.iimb.ac.in/user/157/nishant-kumar-verma" },
    status: "In progress",
  },
  coursework:
    "Stochastic Models, Inventory Control, Advanced Supply Chain Management, Game Theory, Econometrics I & II, Empirical Research in OM, Operations Management (PGP Core), Microeconomics, Behavioural Economics, Probability, Linear/Nonlinear/Dynamic Programming, Statistical Inference, Marketing Models, Financial Mathematics, Revenue Management.",
  industry: [
    {
      org: "Bajaj Auto Ltd.",
      url: "https://www.bajajauto.com/",
      role: "Assistant Manager, Robotics and Machines",
      period: "2016–2021",
      bullets: [
        "Supplier evaluation, selection and development.",
        "In-house and outsourced production quality evaluation and improvement.",
        "Ensuring production readiness for emerging technology adoption.",
        "Special Purpose Machines, robotics & automation design and development.",
      ],
    },
    {
      org: "Hindustan Machine Tools Ltd.",
      url: "https://www.hmtindia.com/",
      role: "Intern/Trainee",
      period: "2014",
      bullets: ["Familiarized with job shop processes for low-volume production."],
    },
    {
      org: "The Kerala Minerals & Metals Ltd.",
      url: "https://www.kmml.com/",
      role: "Intern/Trainee",
      period: "2013",
      bullets: ["Familiarized with continuous processes for high-volume production."],
    },
  ],
  awards: [
    "EurOMA Inclusiveness Program Conference Grant (2025)",
    "EurOMA Summer School at University of Nottingham (2025)",
    "POMS Emerging Economies Doctoral Student Award — Honorable Mention (2024)",
    "IIMB Doctoral Fellowship (2021–2026)",
    "VidyaSamunnathi Scholarship, KSWCFC, Govt. of Kerala (2013–2016)",
  ],
  workshops: [
    "Doctoral Consortium on Teaching, IIMB (2025)",
    "Winter Research Methodology Workshop, IIMB (2024)",
    "Advanced Methods for Transportation and Logistics Research, IIMA (2024)",
    "Human Subjects Research Certification, CITI (2024)",
    "Qualitative Research Methods, IIMB (2024)",
    "Data Visualization and Storytelling, DCAL IIMB (2023)",
  ],
  service: [
    "Track Chair, International Sustainability Conference, IIMB (2025)",
    "Reviewer, AOM Annual Meeting (OSCM Division) (2025)",
    "Reviewer, IIMB Management Review (2024–Present)",
    "Track Chair, Supply Chain Management Conference, IIMB (2024)",
    "Business Plan Judge, Aspiring Women Entrepreneurs Program Cohort 4 (GoK & IIMB) (2023)",
    "Senior Volunteer, IMRDC Conference, IIMB (2023)",
  ],
  positions: [
    "PhD SAC Alumni, Placement, Media Representative, IIMB (2023–2024)",
    "PhD SAC Administrative Representative, IIMB (2021–2022)",
    "Head, SAE Collegiate Club, NITC (2014–2015)",
    "Head, Mechanical Engineering Association, NITC (2014–2015)",
    "Event Manager, Annual Tech Fest (Tathva), NITC (2014)",
  ],
  memberships: [
    { label: "POMS", url: "https://poms.org/" },
    { label: "EurOMA", url: "https://euroma-online.org/" },
    { label: "DSI", url: "https://decisionsciences.org/" },
  ],
  references: [
    { name: "Nishant Kumar Verma", title: "Assistant Professor, Production and Operations Management", email: "nishant.verma@iimb.ac.in", org: "Indian Institute of Management Bangalore, India" },
    { name: "Nagesh Murthy", title: "Roger Engemann Professor of Operations and Business Analytics", email: "nmurthy@uoregon.edu", org: "Lundquist College of Business, University of Oregon, USA" },
    { name: "Ashish Kumar Jha", title: "Associate Professor, Business Analytics", email: "akjha@tcd.ie", org: "Trinity Business School, Ireland" },
    { name: "Ananth Krishnamurthy", title: "Professor, Decision Sciences", email: "ananthk@iimb.ac.in", org: "Indian Institute of Management Bangalore, India" },
  ],
};

/* ============= HELPERS ============= */
const Section = ({ id, icon: Icon, title, children }: any) => (
  <section id={id} className="scroll-mt-24" aria-label={title}>
    <div className="mb-3 flex items-center gap-2">{Icon && <Icon className="h-5 w-5" />}<h2 className="text-xl font-semibold tracking-tight">{title}</h2></div>
    <Separator className="mb-4" />
    {children}
  </section>
);
const Pill = ({ children }: any) => <span className="text-xs px-2 py-1 rounded-full border">{children}</span>;

// History safety check
function isHistoryReplaceSafe(): boolean {
  try {
    const href = window.location?.href || "";
    if (href.startsWith("about:")) return false;
    return "replaceState" in window.history;
  } catch { return false; }
}
function extractRating(text: string | null | undefined): number | null {
  if (!text) return null;
  const m = String(text).match(/([0-9]+(?:\.[0-9]+)?)\s*\/\s*5/);
  return m ? parseFloat(m[1]) : null;
}
function extractHours(text: string | null | undefined): number | null {
  if (!text) return null;
  const m = String(text).match(/([0-9]+(?:\.[0-9]+)?)\s*hr\w*/i);
  return m ? parseFloat(m[1]) : null;
}
function extractYear(s: string): number | null { const m = s.match(/(20[0-9]{2})/); return m ? parseInt(m[1], 10) : null; }
function recentConferences(limit = 5): string[] {
  const fromPR = data.papersUnderReview.flatMap((p) => p.conferences || []);
  const fromWIP = data.workInProgress.flatMap((w) => w.conferences || []);
  const all = [...fromPR, ...fromWIP];
  const unique = Array.from(new Set(all));
  return unique.sort((a,b)=>(extractYear(b) ?? -Infinity) - (extractYear(a) ?? -Infinity)).slice(0, limit);
}

/* ============= NAV / PAGES ============= */
const PAGES = [
  { id: "summary", label: "Summary", icon: Home },
  { id: "research", label: "Research", icon: FileText },
  { id: "teaching", label: "Teaching", icon: School },
  { id: "experience", label: "Industry Experience", icon: Briefcase },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "achievements", label: "Achievements & Continuous Learning", icon: Award },
  { id: "service", label: "Service & Leadership", icon: Users },
  { id: "references", label: "References", icon: Users },
  { id: "contact", label: "Contact", icon: Mail },
] as const;
type PageId = typeof PAGES[number]["id"];

export default function AcademicSite() {
  const [page, setPage] = useState<PageId>("summary");

  // photo width = 1.25 × name width (clamped)
  const nameRef = useRef<HTMLHeadingElement | null>(null);
  const [photoWidth, setPhotoWidth] = useState<number | null>(null);
  useEffect(() => {
    if (!nameRef.current) return;
    const el = nameRef.current;

    const compute = (w: number) => {
      const vwCap = Math.floor((typeof window !== "undefined" ? window.innerWidth : 480) * 0.85);
      const px = Math.min(Math.max(w * 1.25, 160), Math.min(520, vwCap));
      setPhotoWidth(px);
    };

    compute(el.offsetWidth || 0);
    const ro = new ResizeObserver(([entry]) => { if (entry?.contentRect?.width) compute(entry.contentRect.width); });
    ro.observe(el);
    const onResize = () => compute(el.offsetWidth || 0);
    window.addEventListener("resize", onResize);
    return () => { ro.disconnect(); window.removeEventListener("resize", onResize); };
  }, []);

  // sync page with hash
  useEffect(() => {
    const fromHash = (h: string): PageId | null => {
      const clean = (h.startsWith("#") ? h.slice(1) : h).toLowerCase();
      return PAGES.some(p => p.id === clean) ? (clean as PageId) : null;
    };
    const initial = fromHash(window.location.hash);
    if (initial) setPage(initial);
    const onHash = () => { const next = fromHash(window.location.hash); if (next) setPage(next); };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const historySafe = useMemo(() => (typeof window !== "undefined" ? isHistoryReplaceSafe() : false), []);
  useEffect(() => {
    const currentHash = `#${page}`;
    if (window.location.hash !== currentHash) {
      if (historySafe) { try { window.history.replaceState(null, "", currentHash); } catch { try { window.location.hash = currentHash; } catch {} } }
      else { try { window.location.hash = currentHash; } catch {} }
    }
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [page, historySafe]);

  const jsonLd = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "Person",
    name: data.name,
    email: `mailto:${data.email}`,
    telephone: data.phone,
    url: data.linkedin,
    affiliation: { name: "Indian Institute of Management Bangalore" },
    sameAs: [data.linkedin],
    knowsAbout: [...data.researchInterests, ...data.teachingInterests],
    address: { "@type": "PostalAddress", addressLocality: data.location },
  }), []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-sky-50 text-gray-900">
      <style>{`
        :root { --maxw: 1200px }
        @media print { .no-print { display:none } body{color:#000; background:#fff} }
        blockquote { border-left: 3px solid currentColor; padding-left: .75rem; margin-left: .25rem; opacity:.9 }
        a { color: #1d4ed8; word-break: break-word; overflow-wrap: anywhere; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Header (photo above name; left-aligned) */}
      <header className="md:sticky md:top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b">
        <div className="mx-auto w-full max-w-[var(--maxw)] px-4 py-4">
          <div className="flex flex-col items-start text-left gap-3">
            {data.photo?.src && (
              <img
                src={data.photo.src}
                alt={data.photo.alt || "Portrait"}
                style={{ width: photoWidth ? `${photoWidth}px` : undefined, height: "auto" }}
                className="rounded-xl object-cover border shadow-sm"
                onError={(e: any) => { (e.currentTarget as any).style.display = 'none'; }}
              />
            )}
            <h1 ref={nameRef} className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight">{data.name}</h1>
            <div className="text-xs sm:text-sm opacity-80">{data.tagline}</div>
            <div className="text-xs sm:text-sm flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
              <a href={`mailto:${data.email}`} className="inline-flex items-center gap-1 underline underline-offset-2"><Mail className="h-3.5 w-3.5" /> {data.email}</a>
              <a href={`tel:${data.phone.replace(/\s/g, "")}`} className="inline-flex items-center gap-1 underline underline-offset-2"><Phone className="h-3.5 w-3.5" /> {data.phone}</a>
              <a href={data.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 underline underline-offset-2"><Linkedin className="h-3.5 w-3.5" /> LinkedIn</a>
            </div>
          </div>
        </div>

        {/* Nav: wraps to next line */}
        <nav className="mx-auto w-full max-w-[var(--maxw)] px-4 pb-2 no-print">
          <div className="flex flex-wrap gap-2">
            {PAGES.map(({ id, label, icon: Icon }) => (
              <Button
                key={id}
                variant={page === id ? "default" : "outline"}
                className="gap-2 text-xs sm:text-sm h-9 px-3"
                onClick={() => setPage(id)}
              >
                <Icon className="h-4 w-4" /> {label}
              </Button>
            ))}
          </div>
        </nav>
      </header>

      {/* Pages */}
      <main className="mx-auto w-full max-w-[var(--maxw)] px-3 sm:px-4 py-6 sm:py-8 break-words">
        {/* SUMMARY */}
        {page === "summary" && (
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8">
            <div className="space-y-6">
              <Card>
                <CardHeader><CardTitle>Overview</CardTitle></CardHeader>
                <CardContent className="space-y-3 text-sm leading-relaxed">
                  <p>I'm a Ph.D. candidate in Production and Operations Management at IIM Bangalore. My research sits at the intersection of technology adoption, sustainability, and public policy—currently focusing on precision agriculture ecosystems in emerging economies.</p>
                  <div className="flex flex-wrap gap-2">{data.researchInterests.map((r) => (<Badge key={r}>{r}</Badge>))}</div>
                  <div>
                    <div className="font-medium mt-2 mb-1">Teaching Interests</div>
                    <div className="flex flex-wrap gap-2">{data.teachingInterests.map((t) => (<Badge key={t}>{t}</Badge>))}</div>
                  </div>
                </CardContent>
              </Card>

              {/* 4 highlights incl. total teaching hours */}
              <Card>
                <CardHeader><CardTitle>Highlights</CardTitle></CardHeader>
                <CardContent className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                  <div>
                    <div className="text-3xl font-semibold">{data.papersUnderReview.length}</div>
                    <div className="opacity-80">Papers under review / revision</div>
                  </div>
                  <div>
                    <div className="text-3xl font-semibold">{data.workInProgress.length}</div>
                    <div className="opacity-80">Works in progress</div>
                  </div>
                  <div>
                    <div className="text-3xl font-semibold">4.62</div>
                    <div className="opacity-80">Average rating / 5</div>
                  </div>
                  <div>
                    <div className="text-3xl font-semibold">
                      {
                        (() => {
                          const hours = [
                            ...data.teachingInstructor.map((t) => extractHours(t.hours)),
                            ...data.teachingTA.map((t) => extractHours(t.hours)),
                          ].filter((n): n is number => n != null)
                           .reduce((a,b)=>a+b,0)
                           .toFixed(1);
                          return hours;
                        })()
                      }
                    </div>
                    <div className="opacity-80">Total teaching hours</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>Featured</CardTitle></CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div>
                    <div className="font-medium">Flagship paper</div>
                    <div className="opacity-80">{data.papersUnderReview[0]?.title} — {data.papersUnderReview[0]?.status}</div>
                  </div>
                  <div>
                    <div className="font-medium">Recent recognition</div>
                    <div className="opacity-80">EurOMA Inclusiveness Program Grant (2025); POMS EEDSA Hon. Mention (2024)</div>
                  </div>
                  <div>
                    <div className="font-medium">Recent conferences</div>
                    <ul className="list-disc list-inside">{recentConferences(5).map(c => <li key={c}>{c}</li>)}</ul>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right column: Education + actions */}
            <div className="space-y-6">
              <Card>
                <CardHeader><CardTitle>Education</CardTitle></CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="font-medium"><a href={data.education[0].url} className="underline underline-offset-2" target="_blank" rel="noreferrer">{data.education[0].institution}</a></div>
                  <div>{data.education[0].degree}</div>
                  <div className="opacity-80">{data.education[0].period} • {data.education[0].details?.join(" · ")}</div>
                </CardContent>
              </Card>

              <div className="flex gap-2 no-print">
                <Button className="w-full" onClick={() => setPage("contact")}>Get in touch</Button>
                <a
                  href="./CV_Shiril%20Saju.pdf"  // relative for GH Pages
                  download="CV_Shiril Saju.pdf"
                  className="w-full inline-flex items-center justify-center rounded-md border border-neutral-300 bg-white text-neutral-900 hover:bg-neutral-50 h-10 sm:h-9 px-3 py-2 gap-2"
                  aria-label="Download CV (PDF)"
                >
                  <Download className="h-4 w-4" />
                  Download CV
                </a>
              </div>
            </div>
          </div>
        )}

        {/* RESEARCH */}
        {page === "research" && (
          <div className="space-y-10">
            <Card>
              <CardHeader><CardTitle className="text-lg">Highlights</CardTitle></CardHeader>
              <CardContent className="grid sm:grid-cols-2 gap-4 text-sm">
                <div><div className="text-3xl font-semibold">{data.papersUnderReview.length}</div><div className="opacity-80">Papers in review / revision</div></div>
                <div><div className="text-3xl font-semibold">{data.workInProgress.length}</div><div className="opacity-80">Working papers</div></div>
              </CardContent>
            </Card>

            <Section id="interests" icon={Book} title="Research Interests">
              <div className="flex flex-wrap gap-2">{data.researchInterests.map((r) => (<Pill key={r}>{r}</Pill>))}</div>
            </Section>

            <Section id="under-review" icon={FileText} title="Papers Under Review / Revision">
              <div className="space-y-6">
                {data.papersUnderReview.map((p) => (
                  <Card key={p.title}>
                    <CardHeader><CardTitle className="text-base leading-snug">{p.title}</CardTitle></CardHeader>
                    <CardContent className="space-y-2 text-sm">
                      <div><span className="font-semibold">Authors:</span>{" "}
                        {p.authors.map((a: any, i: number) => (
                          <span key={a.name}>
                            {a.url ? <a className="underline underline-offset-2" href={a.url} target="_blank" rel="noreferrer">{a.name}</a> : a.name}
                            {i < p.authors.length - 1 ? "; " : ""}
                          </span>
                        ))}
                      </div>
                      <div><span className="font-semibold">Status:</span> {p.status}</div>
                      {p.awards?.length ? (
                        <div className="flex flex-wrap gap-2 items-center">
                          <span className="font-semibold">Awards:</span>
                          {p.awards.map((aw: any) => (
                            <Badge key={aw.label} className="text-xs">
                              {aw.url ? <a href={aw.url} target="_blank" rel="noreferrer" className="underline underline-offset-2">{aw.label}</a> : aw.label}
                            </Badge>
                          ))}
                        </div>
                      ) : null}
                      {p.conferences && <div><span className="font-semibold">Conferences:</span> {p.conferences.join("; ")}</div>}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </Section>

            <Section id="wip" icon={School} title="Work in Progress">
              <div className="grid gap-6">
                {data.workInProgress.map((w) => (
                  <Card key={w.title}>
                    <CardHeader><CardTitle className="text-base leading-snug">{w.title}</CardTitle></CardHeader>
                    <CardContent className="space-y-2 text-sm">
                      <div><span className="font-semibold">Target Journal:</span> {w.target}</div>
                      <div><span className="font-semibold">Co-authors:</span>{" "}
                        {w.coauthors.map((c: any, i: number) => (
                          <span key={c.name}>
                            <a href={c.url} className="underline underline-offset-2" target="_blank" rel="noreferrer">{c.name}</a>
                            {i < w.coauthors.length - 1 ? "; " : ""}
                          </span>
                        ))}
                      </div>
                      {w.partner && <div><span className="font-semibold">Research Partner:</span> <a className="underline underline-offset-2" href={w.partner.url} target="_blank" rel="noreferrer">{w.partner.label}</a></div>}
                      {w.funding && <div><span className="font-semibold">Funding:</span> {w.funding}</div>}
                      <div><span className="font-semibold">Status:</span> {w.status}</div>
                      {w.conferences && <div><span className="font-semibold">Conferences:</span> {w.conferences.join("; ")}</div>}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </Section>

            <Section id="other-research" icon={Users} title="Other Research Experience">
              {data.otherResearch.map((r) => (
                <div key={r.role} className="mb-4">
                  <div className="font-medium flex justify-between"><span>{r.role}</span><span>{r.period}</span></div>
                  <ul className="list-disc list-inside text-sm mt-1 space-y-1">
                    {r.bullets.map((b, i) => (
                      <li key={i}>
                        {b.text} (with {b.with?.url ? <a className="underline underline-offset-2" href={b.with.url} target="_blank" rel="noreferrer">{b.with.name}</a> : b.with?.name})
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </Section>

            <Section id="press" icon={Newspaper} title="Press Publications">
              <ul className="space-y-2 text-sm">
                {data.press.map((p) => (
                  <li key={p.title}>
                    {p.authors.join(", ")} ({p.year}). <em><a className="underline underline-offset-2" href={p.url} target="_blank" rel="noreferrer">{p.title}</a></em>, {p.outlet}.
                  </li>
                ))}
              </ul>
            </Section>
          </div>
        )}

        {/* EDUCATION */}
        {page === "education" && (
          <div className="space-y-10">
            <Section id="education" icon={GraduationCap} title="Education">
              <div className="space-y-6">
                {data.education.map((ed) => (
                  <div key={ed.institution} className="leading-relaxed">
                    <div className="flex flex-wrap justify-between gap-2 font-medium">
                      <a href={ed.url} target="_blank" rel="noreferrer" className="underline underline-offset-2">{ed.institution}</a>
                      <span>{ed.period}</span>
                    </div>
                    <div>{ed.degree}</div>
                    {ed.details && <div className="text-sm opacity-80">{ed.details.join(" · ")}</div>}
                    {ed.thesis && <div className="mt-1 text-sm"><span className="font-semibold">Thesis:</span> {ed.thesis}</div>}
                    {ed.committee && (
                      <div className="mt-1 text-sm">
                        <span className="font-semibold">Committee:</span>{" "}
                        {ed.committee.map((m, i) => (
                          <span key={m.name}>
                            <a className="underline underline-offset-2" href={m.url} target="_blank" rel="noreferrer">{m.name}</a>
                            {i < ed.committee!.length - 1 ? ", " : ""}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Section>

            <Section id="coursework" icon={Book} title="Doctoral Coursework">
              <p className="text-sm leading-relaxed">{data.coursework}</p>
            </Section>
          </div>
        )}

        {/* ACHIEVEMENTS */}
        {page === "achievements" && (
          <div className="space-y-10">
            <Section id="awards" icon={Award} title="Awards / Scholarships / Grants">
              <ul className="grid md:grid-cols-2 gap-2 text-sm">
                {data.awards.map((a) => (<li key={a} className="leading-snug">• {a}</li>))}
              </ul>
            </Section>
            <Section id="workshops" icon={Wrench} title="Workshops / Certifications">
              <ul className="grid md:grid-cols-2 gap-2 text-sm">
                {data.workshops.map((w) => (<li key={w} className="leading-snug">• {w}</li>))}
              </ul>
            </Section>
          </div>
        )}

        {/* TEACHING */}
        {page === "teaching" && (
          <div className="space-y-10">
            <Card>
              <CardHeader><CardTitle>Highlights</CardTitle></CardHeader>
              <CardContent className="grid sm:grid-cols-2 gap-4 text-sm">
                <div><div className="text-3xl font-semibold">
                  {
                    (() => {
                      const hours = [
                        ...data.teachingInstructor.map((t) => extractHours(t.hours)),
                        ...data.teachingTA.map((t) => extractHours(t.hours)),
                      ].filter((n): n is number => n != null)
                       .reduce((a,b)=>a+b,0)
                       .toFixed(1);
                      return hours;
                    })()
                  }
                </div><div className="opacity-80">Total teaching hours (incl. tutorials)</div></div>
                <div><div className="text-3xl font-semibold">4.62</div><div className="opacity-80">Average rating / 5</div></div>
              </CardContent>
            </Card>

            <Section id="teaching-interests" icon={School} title="Teaching Interests">
              <div className="flex flex-wrap gap-2">{data.teachingInterests.map((ti) => (<Pill key={ti}>{ti}</Pill>))}</div>
            </Section>

            <Section id="teaching" icon={Book} title="Teaching Experience">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Course Instructor</h3>
                  <ul className="space-y-2 text-sm">
                    {data.teachingInstructor.map((t) => (
                      <li key={t.name} className="leading-snug">
                        <div className="font-medium">{t.name}</div>
                        <div className="opacity-80">{t.hours} • {t.rating}</div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Tutorial Sessions as Teaching Assistant</h3>
                  <ul className="space-y-2 text-sm">
                    {data.teachingTA.map((t) => (
                      <li key={t.name} className="leading-snug">
                        <div className="font-medium">{t.name}</div>
                        <div className="opacity-80">Faculty: {t.faculty} • {t.hours}{t.rating ? ` • ${t.rating}` : ""} • TA Grade: {t.grade}</div>
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs mt-2 opacity-80">Other responsibilities: Tutorials, exam questions creation, evaluation of answer sheets and case submissions, class participation grading.</p>
                </div>
              </div>
            </Section>

            <Section id="testimonials" icon={Users} title="Testimonials">
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                {data.testimonials.map((q, i) => (<blockquote key={i}>“{q}”</blockquote>))}
              </div>
            </Section>

            <Section id="case" icon={FileText} title="Teaching Case Study">
              <div className="text-sm">
                <div className="font-medium">{data.teachingCase.title}</div>
                <div>Co-author: <a className="underline underline-offset-2" href={data.teachingCase.coauthor.url} target="_blank" rel="noreferrer">{data.teachingCase.coauthor.name}</a></div>
                <div>Status: {data.teachingCase.status}</div>
              </div>
            </Section>
          </div>
        )}

        {/* EXPERIENCE */}
        {page === "experience" && (
          <div className="space-y-10">
            <Section id="industry" icon={Briefcase} title="Industry Experience">
              <div className="grid gap-6">
                {data.industry.map((job) => (
                  <Card key={job.org}>
                    <CardHeader><CardTitle className="text-base"><a href={job.url} className="underline underline-offset-2" target="_blank" rel="noreferrer">{job.org}</a> — {job.role}</CardTitle></CardHeader>
                    <CardContent>
                      <div className="text-sm opacity-80 mb-2">{job.period}</div>
                      <ul className="list-disc list-inside text-sm space-y-1">{job.bullets.map((b, i) => (<li key={i}>{b}</li>))}</ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </Section>
          </div>
        )}

        {/* SERVICE */}
        {page === "service" && (
          <div className="space-y-10">
            <Section id="service" icon={Users} title="Academic Service & Leadership">
              <ul className="space-y-1 text-sm">{data.service.map((s) => (<li key={s}>• {s}</li>))}</ul>
            </Section>

            <Section id="positions" icon={Users} title="Other Positions of Responsibility">
              <ul className="space-y-1 text-sm">{data.positions.map((p) => (<li key={p}>• {p}</li>))}</ul>
            </Section>

            <Section id="memberships" icon={Users} title="Professional Memberships">
              <div className="flex flex-wrap gap-2">{data.memberships.map((m) => (<Badge key={m.label}><a href={m.url} target="_blank" rel="noreferrer" className="underline underline-offset-2">{m.label}</a></Badge>))}</div>
            </Section>
          </div>
        )}

        {/* REFERENCES */}
        {page === "references" && (
          <div className="space-y-10 max-w-4xl">
            <Section id="references" icon={Users} title="References">
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                {data.references.map((r) => (
                  <div key={r.name}>
                    <div className="font-medium">{r.name}</div>
                    <div className="opacity-80">{r.title}</div>
                    <div className="opacity-80">{r.org}</div>
                    <a href={`mailto:${r.email}`} className="underline underline-offset-2">{r.email}</a>
                  </div>
                ))}
              </div>
            </Section>
          </div>
        )}

        {/* CONTACT */}
        {page === "contact" && (
          <div className="space-y-10 max-w-3xl">
            <Section id="contact" icon={Mail} title="Contact">
              <div className="text-sm space-y-2">
                <div className="flex flex-wrap gap-3">
                  <a href={`mailto:${data.email}`} className="underline underline-offset-2 inline-flex items-center gap-1"><Mail className="h-4 w-4" /> {data.email}</a>
                  <a href={`tel:${data.phone.replace(/\s/g, "")}`} className="underline underline-offset-2 inline-flex items-center gap-1"><Phone className="h-4 w-4" /> {data.phone}</a>
                  <a href={data.linkedin} target="_blank" rel="noreferrer" className="underline underline-offset-2 inline-flex items-center gap-1"><Linkedin className="h-4 w-4" /> LinkedIn</a>
                </div>
                <p className="opacity-80">Location: {data.location}</p>
              </div>
            </Section>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t mt-10">
        <div className="mx-auto w-full max-w-[var(--maxw)] px-3 sm:px-4 py-6 text-xs opacity-80 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0 sm:justify-between">
          <div className="text-left">© {new Date().getFullYear()} {data.name}</div>
          <div className="flex items-center gap-3">
            <a href={`mailto:${data.email}`} className="underline underline-offset-2">Email</a>
            <a href={`tel:${data.phone.replace(/\s/g, "")}`} className="underline underline-offset-2">Call</a>
            <a href={data.linkedin} className="underline underline-offset-2" target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
