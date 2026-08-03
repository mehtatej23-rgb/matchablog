'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Instagram,
  Youtube,
  BadgeCheck,
  Search,
  Sparkles,
  Clock3,
  Leaf,
  Mail,
  ArrowRight,
  MoonStar,
  CupSoda
} from 'lucide-react';
import Image from 'next/image';
import { fetchRecipes, subscribeToNewsletter } from '../lib/firebase';

const heroRecipes = [
  {
    title: 'Iced Matcha Glow',
    time: '8 min',
    blurb: 'Bright citrus, soft cream, and a powdery finish.',
    image: 'https://images.unsplash.com/photo-1499638673689-79a0b5115d87?auto=format&fit=crop&w=1000&q=80'
  },
  {
    title: 'Cozy Cinnamon Latte',
    time: '10 min',
    blurb: 'Velvety warmth with a whisper of spice.',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=1000&q=80'
  },
  {
    title: 'Berry Garden Spritz',
    time: '6 min',
    blurb: 'A fruity sip with herbal, radiant energy.',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1000&q=80'
  }
];

const socialLinks = [
  { href: 'https://instagram.com', label: 'Instagram', Icon: Instagram },
  { href: 'https://youtube.com', label: 'YouTube', Icon: Youtube },
  { href: 'https://tiktok.com', label: 'TikTok', Icon: BadgeCheck }
];

export default function HomePage() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRecipes = async () => {
      const data = await fetchRecipes();
      setRecipes(data);
      setLoading(false);
    };

    loadRecipes();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % heroRecipes.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const filteredRecipes = useMemo(() => {
    const query = search.toLowerCase();
    if (!query) return recipes;
    return recipes.filter((recipe) => {
      const haystack = [
        recipe.title,
        recipe.description,
        recipe.flavorProfile,
        recipe.ingredients?.join(' '),
        recipe.designNotes?.join(' ')
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return haystack.includes(query);
    });
  }, [recipes, search]);

  async function handleSubscribe(e) {
    e.preventDefault();
    if (!email.trim()) {
      setStatus('Please enter an email address.');
      return;
    }

    const result = await subscribeToNewsletter(email);
    if (result.success) {
      setStatus('You are on the list — welcome to the whisk.');
      setEmail('');
    } else {
      setStatus(result.error || 'Something went wrong, please try again.');
    }
  }

  return (
    <main className="min-h-screen">
      {/* ---------------------------------------------------------------- */}
      {/* Header                                                          */}
      {/* ---------------------------------------------------------------- */}
      <header className="sticky top-0 z-40 border-b border-espresso-600/10 bg-cream-200/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Image
              src="/Screenshot 2026-08-02 at 7.57.02 PM.png"
              alt="The Green Whisk logo"
              width={48}
              height={48}
              className="rounded-full border border-matcha-600/20 shadow-sm"
            />
            <div>
              <p className="text-lg font-semibold text-matcha-600">The Green Whisk</p>
              <p className="eyebrow text-espresso-600/60">Drink &amp; Recipe Journal</p>
            </div>
          </div>
          <nav className="flex items-center gap-3 text-matcha-600">
            <a href="#recipes" className="rounded-full px-3 py-2 text-sm transition hover:bg-matcha-600/10">
              Recipes
            </a>
            <a href="#newsletter" className="rounded-full px-3 py-2 text-sm transition hover:bg-matcha-600/10">
              Newsletter
            </a>
            <div className="flex items-center gap-1 rounded-full border border-espresso-600/10 bg-white/70 p-2 shadow-sm">
              {socialLinks.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="rounded-full p-1.5 text-matcha-600 transition hover:bg-matcha-600/10"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </nav>
        </div>
      </header>

      {/* ---------------------------------------------------------------- */}
      {/* Hero                                                             */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative overflow-hidden">
        {/* Soft decorative blobs for depth, purely visual */}
        <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-matcha-200/50 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 top-32 h-64 w-64 animate-floaty rounded-full bg-ochre-200/50 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-16">
          <div className="animate-fade-up space-y-6">
            <div className="pill border-ochre-400/40 bg-ochre-100 text-matcha-600">
              <Sparkles size={16} /> Crafted for calm, color, and comfort
            </div>
            <div className="space-y-4">
              <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-matcha-600 sm:text-5xl">
                Discover drinks that feel like a gentle ritual.
              </h1>
              <p className="max-w-xl text-lg leading-8 text-espresso-600/80">
                From matcha mornings to moonlit lattes, The Green Whisk gathers recipes, styling notes, and
                flavor stories into one warm little archive.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href="#recipes" className="btn-primary">
                Browse Recipes
              </a>
              <a href="#newsletter" className="btn-secondary">
                <MoonStar size={16} /> Join the Newsletter
              </a>
            </div>
          </div>

          <div className="card animate-fade-up p-5" style={{ animationDelay: '0.1s' }}>
            <div className="flex flex-col gap-3">
              <label htmlFor="recipe-search" className="eyebrow text-matcha-600">
                Search the collection
              </label>
              <div className="flex items-center gap-2 rounded-2xl border border-espresso-600/10 bg-cream-200 px-4 py-3 shadow-sm transition focus-within:border-matcha-400 focus-within:ring-2 focus-within:ring-matcha-200">
                <Search size={18} className="shrink-0 text-matcha-600" />
                <input
                  id="recipe-search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Try iced matcha, cozy latte, fruity..."
                  className="input-field"
                />
              </div>
              <p className="text-sm text-espresso-600/70">
                Semantic filtering blends flavor, mood, and ingredient cues for a more intuitive browse.
              </p>
            </div>

            <div className="mt-5 overflow-hidden rounded-[24px] border border-espresso-600/10 bg-cream-200 p-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={heroRecipes[activeIndex].title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35 }}
                  className="grid gap-4 rounded-[20px] bg-white p-4 shadow-sm md:grid-cols-[1.1fr_0.9fr]"
                >
                  <img
                    src={heroRecipes[activeIndex].image}
                    alt={heroRecipes[activeIndex].title}
                    className="h-48 w-full rounded-[18px] object-cover"
                  />
                  <div className="flex flex-col justify-center">
                    <p className="pill mb-2 w-fit border-transparent bg-matcha-600/10 py-1 text-xs uppercase tracking-[0.25em] text-matcha-600">
                      <Clock3 size={14} /> {heroRecipes[activeIndex].time}
                    </p>
                    <h3 className="text-2xl font-semibold text-matcha-600">{heroRecipes[activeIndex].title}</h3>
                    <p className="mt-2 text-sm leading-7 text-espresso-600/80">{heroRecipes[activeIndex].blurb}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Carousel dots — small addition so the rotation feels intentional and is clickable */}
            <div className="mt-3 flex items-center justify-center gap-2">
              {heroRecipes.map((recipe, index) => (
                <button
                  key={recipe.title}
                  type="button"
                  aria-label={`Show ${recipe.title}`}
                  onClick={() => setActiveIndex(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === activeIndex ? 'w-6 bg-matcha-600' : 'w-1.5 bg-matcha-600/25 hover:bg-matcha-600/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Recipe library                                                   */}
      {/* ---------------------------------------------------------------- */}
      <section id="recipes" className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="eyebrow text-ochre-500">Recipe library</p>
            <h2 className="text-2xl font-semibold text-matcha-600">Seasonal sips and their design stories</h2>
          </div>
          <div className="pill border-espresso-600/10 bg-white/70 text-espresso-600/70">
            <Leaf size={14} className="text-matcha-600" /> {filteredRecipes.length} recipes matched
          </div>
        </div>

        {loading ? (
          <div className="grid gap-6 lg:grid-cols-2" aria-busy="true" aria-label="Loading recipes">
            {[0, 1].map((i) => (
              <div key={i} className="card grid gap-0 overflow-hidden md:grid-cols-[0.9fr_1.1fr]">
                <div className="skeleton h-56 md:h-full" />
                <div className="space-y-3 p-5">
                  <div className="skeleton h-4 w-24" />
                  <div className="skeleton h-6 w-3/4" />
                  <div className="skeleton h-16 w-full" />
                  <div className="skeleton h-24 w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredRecipes.length === 0 ? (
          <div className="card flex flex-col items-center gap-3 p-10 text-center text-espresso-600/70">
            <CupSoda size={28} className="text-matcha-600" />
            <p className="font-medium text-matcha-600">No sips match &ldquo;{search}&rdquo; just yet.</p>
            <p className="text-sm">Try a different flavor, mood, or ingredient.</p>
            <button type="button" onClick={() => setSearch('')} className="btn-secondary mt-2">
              Clear search
            </button>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-2">
            {filteredRecipes.map((recipe, index) => (
              <motion.article
                key={recipe.id || recipe.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="card card-interactive overflow-hidden"
              >
                <div className="grid gap-0 md:grid-cols-[0.9fr_1.1fr]">
                  <div className="relative h-56 md:h-full">
                    <img
                      src={
                        recipe.image ||
                        'https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=1200&q=80'
                      }
                      alt={recipe.title}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute left-4 top-4 rounded-full bg-cream-200/90 px-3 py-1 text-sm font-semibold text-matcha-600 shadow-sm">
                      {recipe.prepTime}
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 p-5">
                    <div>
                      <div className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.25em] text-ochre-500">
                        <Leaf size={14} /> {recipe.flavorProfile}
                      </div>
                      <h3 className="text-2xl font-semibold text-matcha-600">{recipe.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-espresso-600/80">{recipe.description}</p>
                    </div>

                    <div className="rounded-[20px] border border-espresso-600/10 bg-cream-200 p-4">
                      <h4 className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-matcha-600">
                        Ingredients
                      </h4>
                      <ul className="space-y-1 text-sm text-espresso-600/80">
                        {recipe.ingredients?.map((item) => (
                          <li key={item} className="flex gap-2">
                            <span className="text-ochre-500">•</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-[20px] border border-espresso-600/10 bg-white p-4">
                      <h4 className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-matcha-600">
                        Method
                      </h4>
                      <ol className="space-y-2 text-sm text-espresso-600/80">
                        {recipe.instructions?.map((step, stepIndex) => (
                          <li key={step} className="flex gap-2">
                            <span className="font-semibold text-matcha-600">{stepIndex + 1}.</span> {step}
                          </li>
                        ))}
                      </ol>
                    </div>

                    <div className="rounded-[20px] border border-ochre-400/30 bg-ochre-50 p-4">
                      <h4 className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-ochre-500">
                        Design Notes
                      </h4>
                      <ul className="space-y-1 text-sm text-espresso-600/80">
                        {recipe.designNotes?.map((note) => (
                          <li key={note} className="flex gap-2">
                            <span className="text-matcha-600">✦</span>
                            {note}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Newsletter                                                       */}
      {/* ---------------------------------------------------------------- */}
      <section id="newsletter" className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[32px] border border-espresso-600/10 bg-matcha-600 p-8 text-white shadow-soft">
          <MoonStar className="pointer-events-none absolute -right-6 -top-6 h-32 w-32 text-white/10" />
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <p className="eyebrow text-ochre-300">Stay in the loop</p>
              <h2 className="text-3xl font-semibold">Get new recipes and visual notes in your inbox.</h2>
              <p className="mt-3 text-sm leading-7 text-white/80">
                Join the newsletter for fresh sips, soft seasonal inspiration, and the latest from The Green
                Whisk.
              </p>
            </div>
            <form
              onSubmit={handleSubscribe}
              className="w-full max-w-lg rounded-[24px] border border-white/15 bg-white/10 p-4 backdrop-blur-sm"
            >
              <div className="flex flex-col gap-3 sm:flex-row">
                <label htmlFor="newsletter-email" className="flex flex-1 items-center gap-2 rounded-full bg-cream-200 px-4 py-3 text-espresso-600">
                  <Mail size={16} className="shrink-0 text-matcha-600" />
                  <input
                    id="newsletter-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="name@example.com"
                    className="input-field"
                  />
                </label>
                <button type="submit" className="btn-accent">
                  Subscribe <ArrowRight size={16} />
                </button>
              </div>
              <p aria-live="polite" className="mt-3 min-h-[1.25rem] text-sm text-cream-100">
                {status}
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Footer                                                           */}
      {/* ---------------------------------------------------------------- */}
      <footer className="border-t border-espresso-600/10 bg-cream-200/70">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 text-sm text-espresso-600/70 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© 2026 The Green Whisk. All rights reserved.</p>
          <div className="flex items-center gap-2">
            {socialLinks.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="rounded-full border border-espresso-600/10 bg-white/70 p-2 transition hover:bg-white"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}
