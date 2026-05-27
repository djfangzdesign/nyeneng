import { Link } from "react-router-dom";
import { useState } from "react";
import { z } from "zod";
import {
  Hammer, Droplets, Zap, Wrench, Flame, Grid3x3, Package,
  CheckCircle2, ArrowRight, Send,
} from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Seo } from "@/components/Seo";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { SITE, whatsappLink } from "@/lib/site";

const FAQS = [
  { q: "Do you issue an Electrical Certificate of Compliance (COC)?", a: "Yes. All residential electrical work — new installs, DB boards, repairs and additions — is signed off by a registered electrician and we issue a valid Certificate of Compliance (COC) on completion." },
  { q: "How long does borehole drilling and equipping take?", a: "A typical residential borehole is drilled in 1–2 days once the site is accessible. Equipping (pump, pipework, tank stand, JoJo tank and electrical connection) usually adds another 2–4 days." },
  { q: "Do you supply and install genuine JoJo tanks?", a: "Yes — we supply genuine JoJo tanks in standard sizes from 750L up to 10,000L+. Installation includes a level base or stand, inlet/outlet plumbing, overflow, and connection to your booster pump or municipal backup line." },
  { q: "How long does it take to build a new house?", a: "A standard 3-bedroom home typically takes 4–6 months from foundation to handover. We give you a project programme upfront and stage payments are linked to completed milestones." },
  { q: "Which areas do you service?", a: "We are based in Rustenburg and work across the North West, including Tlhabane, Phokeng, Boitekong, Marikana, Mogwase and surrounding farms and townships." },
  { q: "How do I get a quote and is it free?", a: "Quotes are 100% free. Send us your details via the form on this page or WhatsApp us directly — we usually reply within a few hours during business days." },
  { q: "Do you offer a workmanship guarantee?", a: "Yes. All our work carries a workmanship guarantee, and manufacturer warranties (pumps, tanks, geysers, materials) are passed through to you in full." },
];

const SITE_URL = "https://www.nyeneng.co.za";

const SERVICES = [
  { icon: Hammer, slug: "construction", title: "Residential Construction", desc: "Turnkey home building from foundation to finishes — managed end-to-end by our site team.", items: ["New house builds", "Extensions & additions", "Renovations & remodels", "Roofing", "Brickwork & plastering", "Full project management"] },
  { icon: Droplets, slug: "water", title: "Water Security Solutions", desc: "Total water independence for homes, farms and businesses across the North West.", items: ["Borehole drilling & equipping", "JoJo tank supply & installation", "Rainwater harvesting", "Water reticulation", "Pumps & pressure systems"] },
  { icon: Zap, slug: "electrical", title: "Electrical Services", desc: "Safe, compliant residential electrical work with COC certification.", items: ["Residential wiring", "DB board installations", "Solar backup systems", "Outdoor & security lighting", "Certificates of Compliance"] },
  { icon: Wrench, slug: "plumbing", title: "Plumbing", desc: "From a leaking tap to a full sewer connection — done right the first time.", items: ["Geyser supply & install", "Drain laying", "Leak detection & repair", "Sewer connections", "Water reticulation"] },
  { icon: Flame, slug: "welding", title: "Welding & Fabrication", desc: "Custom steelwork built to last in tough South African conditions.", items: ["Driveway & pedestrian gates", "Burglar bars & window guards", "Carports & shade structures", "Steel repairs", "Staircases & railings"] },
  { icon: Grid3x3, slug: "tiling", title: "Tiling & Finishing", desc: "Precision finishes that lift any room — neat lines, level surfaces, no shortcuts.", items: ["Floor & wall tiling", "Bathroom waterproofing", "Paving", "Surface preparation", "Grouting & sealing"] },
  { icon: Package, slug: "materials", title: "Materials Supply", desc: "Genuine products at fair prices, with quick delivery around Rustenburg.", items: ["Building materials", "Plumbing materials", "Electrical products", "Steel products", "Genuine JoJo tanks"] },
];

const SERVICE_TITLES = SERVICES.map((s) => s.title);

const contactRegex = /^(?:\+?\d[\d\s\-()]{6,}|[^\s@]+@[^\s@]+\.[^\s@]+)$/;
const schema = z.object({
  name: z.string().trim().min(2).max(100).regex(/^[\p{L}\s'.-]+$/u, "Letters only."),
  contact: z.string().trim().min(7).max(100).regex(contactRegex, "Enter a valid phone or email."),
  service: z.string().min(1, "Please pick a service."),
  location: z.string().trim().min(2).max(120),
  details: z.string().trim().max(600).optional().or(z.literal("")),
});

export default function ServicesPage() {
  const servicesJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Nyeneng Services",
    itemListElement: SERVICES.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: s.title,
        serviceType: s.title,
        areaServed: "Rustenburg, North West, South Africa",
        provider: { "@id": `${SITE_URL}/#business` },
        url: `${SITE_URL}/services#${s.slug}`,
      },
    })),
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
    ],
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <>
      <Seo
        title="Services — Construction, Boreholes & More | Nyeneng"
        description="Rustenburg builders for new homes, boreholes, JoJo tanks, plumbing, electrical (COC), welding, tiling & materials supply."
        path="/services"
        jsonLd={[servicesJsonLd, breadcrumb, faq]}
      />

      <PageHeader
        eyebrow="Our Services"
        title="Seven core trades. One accountable team."
        subtitle="Whether you're building a new home, securing your water supply, or upgrading a single room — Nyeneng covers it end-to-end."
      />

      <section className="container-x py-12 md:py-16">
        <div className="grid gap-5 md:grid-cols-2 md:gap-6">
          {SERVICES.map((s) => (
            <article id={s.slug} key={s.slug} className="rounded-3xl border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-soft md:p-7">
              <div className="flex items-start gap-4">
                <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
                  <s.icon className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="font-display text-xl font-bold text-accent">{s.title}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
                </div>
              </div>
              <ul className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {s.items.map((i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {i}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={whatsappLink(`Hi Nyeneng, I'd like a quote for ${s.title}.`)} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-soft hover:opacity-95">
                  Request a quote <ArrowRight className="h-4 w-4" />
                </a>
                <a href="#quote" className="inline-flex items-center rounded-full border border-border px-4 py-2 text-sm font-semibold text-accent hover:bg-secondary">Use form</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <FaqSection />
      <QuoteForm services={SERVICE_TITLES} />
    </>
  );
}

function QuoteForm({ services }: { services: string[] }) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const clearFieldError = (name: string) => {
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;
    setFormError(null);

    const form = e.currentTarget;
    const fd = new FormData(form);
    const data = Object.fromEntries(fd) as Record<string, string>;
    const r = schema.safeParse(data);

    if (!r.success) {
      const errs: Record<string, string> = {};
      r.error.issues.forEach((i) => { errs[i.path[0] as string] = i.message; });
      setErrors(errs);
      setFormError("Please fix the highlighted fields below and try again.");
      return;
    }

    setErrors({});
    setSubmitting(true);
    try {
      const msg =
        `Hi Nyeneng, I'd like a quote.\n\n` +
        `Name: ${r.data.name}\nContact: ${r.data.contact}\nService: ${r.data.service}\nLocation: ${r.data.location}` +
        (r.data.details ? `\n\nDetails: ${r.data.details}` : "");
      window.open(whatsappLink(msg), "_blank", "noopener");
      setSent(true);
      form.reset();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="quote" className="border-t bg-secondary/40">
      <div className="container-x py-14 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Free quote</span>
          <h2 className="mt-2 font-display text-3xl font-bold text-accent md:text-4xl">Tell us about your project</h2>
          <p className="mt-3 text-sm text-muted-foreground md:text-base">Submit the form and we'll continue the conversation on WhatsApp.</p>
        </div>

        <form onSubmit={onSubmit} noValidate className="mx-auto mt-8 grid max-w-2xl gap-4 rounded-3xl border bg-card p-5 shadow-card md:mt-10 md:grid-cols-2 md:p-8">
          {formError && (
            <div role="alert" className="md:col-span-2 rounded-2xl border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">{formError}</div>
          )}

          <FormField label="Full name" name="name" placeholder="Your name" error={errors.name} required onChange={() => clearFieldError("name")} />
          <FormField label="Phone or email" name="contact" placeholder="072 123 4567 or you@email.com" error={errors.contact} required onChange={() => clearFieldError("contact")} />

          <div className="flex flex-col gap-1.5">
            <label htmlFor="qf-service" className="text-sm font-medium text-accent">Service <span className="text-destructive">*</span></label>
            <select id="qf-service" name="service" defaultValue="" onChange={() => clearFieldError("service")} className={`h-11 rounded-xl border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring ${errors.service ? "border-destructive" : ""}`}>
              <option value="" disabled>Select a service…</option>
              {services.map((s) => <option key={s} value={s}>{s}</option>)}
              <option value="Other / Not sure">Other / Not sure</option>
            </select>
            {errors.service && <p className="text-xs text-destructive">{errors.service}</p>}
          </div>

          <FormField label="Project location" name="location" placeholder="e.g. Rustenburg, Tlhabane" error={errors.location} required onChange={() => clearFieldError("location")} />

          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label htmlFor="qf-details" className="text-sm font-medium text-accent">Project details (optional)</label>
            <textarea id="qf-details" name="details" rows={4} maxLength={600} onChange={() => clearFieldError("details")} placeholder="Scope, size, timeline…" className={`rounded-xl border bg-background p-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring ${errors.details ? "border-destructive" : ""}`} />
          </div>

          <div className="md:col-span-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-muted-foreground">By submitting you agree to be contacted on WhatsApp at {SITE.phone}.</p>
            <button type="submit" disabled={submitting} className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition hover:opacity-95 disabled:opacity-60">
              <Send className="h-4 w-4" /> Send via WhatsApp
            </button>
          </div>

          {sent && (
            <div role="status" className="md:col-span-2 flex items-start gap-3 rounded-2xl bg-secondary p-4">
              <CheckCircle2 className="mt-0.5 h-5 w-5 text-primary" />
              <p className="text-sm text-accent">Thanks! Your enquiry is opening in WhatsApp. If nothing happened, call us on <a href={`tel:${SITE.phone}`} className="font-semibold underline">{SITE.phone}</a>.</p>
            </div>
          )}
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Prefer the full contact page?{" "}
          <Link to="/contact" className="font-semibold text-primary hover:underline">Visit Contact →</Link>
        </p>
      </div>
    </section>
  );
}

function FormField({ label, name, type = "text", placeholder, error, required, onChange }: { label: string; name: string; type?: string; placeholder?: string; error?: string; required?: boolean; onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; }) {
  const id = `qf-${name}`;
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-accent">
        {label} {required && <span className="text-destructive">*</span>}
      </label>
      <input id={id} name={name} type={type} maxLength={255} placeholder={placeholder} onChange={onChange} className={`h-11 rounded-xl border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring ${error ? "border-destructive" : ""}`} />
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

function FaqSection() {
  return (
    <section id="faq" className="border-t">
      <div className="container-x py-14 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">FAQs</span>
          <h2 className="mt-2 font-display text-3xl font-bold text-accent md:text-4xl">Questions we hear every week</h2>
        </div>

        <Accordion type="single" collapsible className="mx-auto mt-8 max-w-3xl rounded-3xl border bg-card px-5 shadow-card md:mt-10 md:px-7">
          {FAQS.map((f, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="last:border-b-0">
              <AccordionTrigger className="text-left font-display text-base font-semibold text-accent md:text-lg">{f.q}</AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground md:text-base">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
