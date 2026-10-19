import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowRightIcon, CheckIcon, PlusCircleIcon, ShieldCheckIcon } from 'lucide-react';
import { SiteHeader } from '../components/SiteHeader';
import { SiteFooter } from '../components/SiteFooter';
import { Breadcrumb, DocumentList } from '../components/patterns';
import { QuoteConfigurator } from '../components/productDetail/QuoteConfigurator';
import { ClaimsMadeEasy, EnquirySection, FaqSection, SectionNav } from '../components/productDetail/sections';
import { formatShortKes } from '../utils/currency';
import {
  annualPremium, categoryIcon, categoryImage, defaultInputs, fallbackDocuments, fallbackFaqs, img, monthlyFromAnnual,
  productById, relatedFor, richById } from
'../data/quoteProducts';
import type { Benefit, Feature } from '../data/quoteProducts';
import { productImage } from '../data/productImages';

const container = 'mx-auto max-w-[1440px] px-5 lg:px-[100px]';

/** Product detail page (/product/:id) — rich quote flow for key products, enquiry page for the rest. */
export function ProductDetail() {
  const { id } = useParams();
  const product = productById(id);
  if (!product) return <Navigate to="/products" replace />;

  const rich = richById[product.id];
  const Icon = categoryIcon[product.category];
  const heroImg = rich ? rich.hero : categoryImage[product.category];
  const art = productImage(product.id, product.category);
  const isInvest = rich?.kind === 'invest';
  const fromMonthly = rich && !isInvest ? monthlyFromAnnual(annualPremium(rich.kind, defaultInputs[rich.kind])) : 0;

  const features: Feature[] = rich?.features ?? product.highlights.slice(0, 3).map((h) => ({ title: h, body: product.description, icon: Icon }));
  const benefits: Benefit[] = rich?.benefits ?? product.highlights.map((h) => ({ title: h, body: `Part of ${product.name} from ${product.company}.`, icon: ShieldCheckIcon }));
  const documents = rich?.documents ?? fallbackDocuments(product);
  const faqs = rich?.faqs ?? fallbackFaqs(product);
  const related = relatedFor(product.id, rich?.related);
  const addOns = rich?.addOns ?? [];

  const sections = [
  { id: 'why', label: `Why ${product.name}` },
  { id: 'cover', label: 'Cover' },
  ...(addOns.length ? [{ id: 'add-ons', label: 'Add-ons' }] : []),
  { id: 'documents', label: 'Documents' },
  { id: 'faqs', label: 'FAQs' }];


  return (
    <div className="min-h-screen w-full bg-white text-cic-ink">
      <SiteHeader />

      {/* Hero */}
      <section className={`relative w-full overflow-hidden ${art.cutout ? 'bg-gradient-to-r from-cic-burgundy via-[#B8432C] to-cic-amber' : 'bg-[#2a1a17]'}`}>
        {art.cutout ?
        <>
            <span className="absolute -right-24 top-1/2 hidden h-[520px] w-[520px] -translate-y-1/2 rounded-full bg-white/10 lg:block" aria-hidden="true" />
            <img src={art.src} alt="" className={`absolute bottom-0 right-0 hidden h-[92%] max-w-[50%] object-contain object-bottom md:block lg:right-[6%] ${art.blend ? 'mix-blend-multiply' : ''}`} />
          </> :

        <>
            <img
            src={art.src}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            style={art.position ? { objectPosition: art.position } : heroImg.imagePosition ? { objectPosition: heroImg.imagePosition } : undefined} />

            <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/35 to-transparent" aria-hidden="true" />
          </>
        }
        <div className={`relative ${container} flex min-h-[420px] flex-col justify-end py-12 text-white`}>
          <p className="text-[13px] font-semibold uppercase tracking-wide text-cic-amber">{product.company}</p>
          <h1 className="mt-2 max-w-2xl text-[44px] font-semibold leading-tight lg:text-[56px]">{product.name}</h1>
          <p className="mt-3 max-w-xl text-[17px]">{rich?.hero.promise ?? product.description}</p>
          {fromMonthly > 0 &&
          <p className="mt-4 text-[15px]">
              Illustrative from <span className="text-[24px] font-semibold">{formatShortKes(fromMonthly)}</span>/month
            </p>
          }
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#quote" className="bg-cic-orange px-6 py-2.5 text-[15px] font-semibold text-white transition-colors duration-150 hover:bg-[#8A1B23]">
              {rich ? isInvest ? 'See how it could grow' : 'Get your quote' : 'Enquire now'}
            </a>
            <Link to="/contact-us" className="border border-white px-6 py-2.5 text-[15px] font-semibold text-white transition-colors duration-150 hover:bg-white/15">
              Talk to us
            </Link>
          </div>
        </div>
      </section>

      <SectionNav sections={sections} cta={{ label: rich && !isInvest ? 'Get your quote' : isInvest ? 'Start investing' : 'Enquire', href: '#quote' }} />

      <main>
        <div className={container}>
          <div className="pt-5">
            <Breadcrumb items={[{ label: 'Individual', to: '/' }, { label: 'All products', to: '/products' }, { label: product.name }]} />
          </div>

          {/* Intro + why */}
          <section id="why" aria-labelledby="why-title" className="scroll-mt-16 pt-10">
            <div className="grid items-center gap-10 bg-cic-mist p-6 lg:grid-cols-2 lg:p-10">
              <div>
                <h2 id="why-title" className="text-[32px] font-semibold leading-tight">{rich?.intro.title ?? `Why ${product.name}?`}</h2>
                {(rich?.intro.paragraphs ?? [product.description]).map((p) =>
                <p key={p} className="mt-4 text-[15px] leading-relaxed">{p}</p>
                )}
                <p className="mt-4 text-[13px] text-cic-muted">
                  Available to: {product.segments.join(', ')} · Provided by {product.company}
                </p>
              </div>
              <img
                src={rich?.intro.image ?? img.adviser}
                alt=""
                className="aspect-[16/10] w-full object-cover"
                style={rich?.intro.imagePosition ? { objectPosition: rich.intro.imagePosition } : undefined} />

            </div>

            <h3 className="mt-14 text-[26px] font-semibold">Why choose {product.name}?</h3>
            <ul className="mt-6 grid gap-5 md:grid-cols-3">
              {features.map((f) =>
              <li key={f.title} className="flex flex-col bg-white shadow-card">
                  {f.image ?
                <img src={f.image} alt="" className="h-44 w-full object-cover" /> :

                <span className="flex h-44 items-center justify-center bg-cic-mist">
                      <f.icon className="h-16 w-16 text-cic-red" strokeWidth={1.25} aria-hidden="true" />
                    </span>
                }
                  <span className="flex flex-1 flex-col border-t-4 border-cic-red p-5">
                    <span className="flex items-center gap-2 text-[17px] font-semibold">
                      <f.icon className="h-5 w-5 text-cic-red" aria-hidden="true" />
                      {f.title}
                    </span>
                    <span className="mt-2 text-[14px] text-cic-muted">{f.body}</span>
                  </span>
                </li>
              )}
            </ul>
          </section>

          {/* Cover / benefits */}
          <section id="cover" aria-labelledby="cover-title" className="scroll-mt-16 pt-14">
            <h2 id="cover-title" className="text-[32px] font-semibold">What you’re covered for</h2>
            <ul className="mt-6 divide-y divide-cic-line border-y border-cic-line">
              {benefits.map((b) =>
              <li key={b.title} className="grid gap-2 py-5 md:grid-cols-[minmax(240px,1fr)_2fr] md:gap-8">
                  <span className="flex items-center gap-3 text-[16px] font-semibold">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-[#FBECEC] text-cic-red">
                      <b.icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    {b.title}
                  </span>
                  <span className="text-[14px] text-cic-muted md:pt-2">{b.body}</span>
                </li>
              )}
            </ul>
          </section>
        </div>

        {/* Quote configurator or enquiry */}
        <div className="mt-14">
          {rich ? <QuoteConfigurator product={rich} name={product.name} /> : <EnquirySection name={product.name} />}
        </div>

        <div className={container}>
          {addOns.length > 0 &&
          <section id="add-ons" aria-labelledby="addons-title" className="scroll-mt-16 pt-14">
              <div className="flex items-end justify-between">
                <h2 id="addons-title" className="text-[32px] font-semibold">Add-ons for even better cover</h2>
                <span className="text-[13px] text-cic-muted">{addOns.length} available</span>
              </div>
              <p className="mt-2 text-[14px] text-cic-muted">Choose them when you apply. Prices are illustrative.</p>
              <ul className="mt-6 grid gap-5 md:grid-cols-3">
                {addOns.map((a) =>
              <li key={a.id} className="bg-white p-6 shadow-card">
                    <PlusCircleIcon className="h-6 w-6 text-cic-red" aria-hidden="true" />
                    <p className="mt-3 text-[17px] font-semibold">{a.title}</p>
                    <p className="mt-2 text-[14px] text-cic-muted">{a.body}</p>
                    <p className="mt-4 text-[13px]">
                      From <span className="font-semibold">{formatShortKes(a.monthly)}</span>/month
                    </p>
                  </li>
              )}
              </ul>
            </section>
          }

          <section id="documents" aria-labelledby="docs-title" className="scroll-mt-16 pt-14">
            <h2 id="docs-title" className="text-[32px] font-semibold">Policy documents</h2>
            <div className="mt-6">
              <DocumentList items={documents} />
            </div>
          </section>

          <FaqSection faqs={faqs} image={img.commute} />

          <ClaimsMadeEasy image={img.adviser} />

          {related.length > 0 &&
          <section aria-labelledby="related-title" className="pb-6 pt-14">
              <h2 id="related-title" className="text-[32px] font-semibold">You may also like</h2>
              <ul className="mt-6 grid gap-5 md:grid-cols-3">
                {related.map((r) => {
                const RIcon = categoryIcon[r.category];
                return (
                  <li key={r.id} className="flex flex-col bg-white p-6 shadow-card">
                      <RIcon className="h-7 w-7 text-cic-red" strokeWidth={1.5} aria-hidden="true" />
                      <p className="mt-3 text-[12px] font-semibold uppercase tracking-wide text-cic-muted">{r.category}</p>
                      <p className="mt-1 text-[18px] font-semibold">{r.name}</p>
                      <p className="mt-2 flex-1 text-[14px] text-cic-muted">{r.description}</p>
                      <ul className="mt-3 space-y-1 text-[13px]">
                        {r.highlights.slice(0, 2).map((h) =>
                      <li key={h} className="flex gap-2">
                            <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-cic-green" aria-hidden="true" />
                            {h}
                          </li>
                      )}
                      </ul>
                      <Link
                      to={`/product/${r.id}`}
                      className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-semibold text-cic-orange hover:underline">

                        Tell me more <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    </li>);

              })}
              </ul>
            </section>
          }
        </div>
      </main>
      <SiteFooter />
    </div>);

}
