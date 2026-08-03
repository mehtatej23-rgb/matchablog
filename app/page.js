'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, Youtube, BadgeCheck, Search, Sparkles, Clock3, Leaf, Mail, ArrowRight, MoonStar } from 'lucide-react';
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
    <main className="min-h-screen bg-[#FAF7F2] text-[#5C3A21]">
      <header className="sticky top-0 z-40 border-b border-[#5C3A21]/10 bg-[#FAF7F2]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Image src="/Screenshot 2026-08-02 at 7.57.02 PM.png" alt="The Green Whisk logo" width={48} height={48} className="rounded-full border border-[#3B5E2B]/20 shadow-sm" />
            <div>
              <p className="text-lg font-semibold text-[#3B5E2B]">The Green Whisk</p>
              <p className="text-xs uppercase tracking-[0.3em] text-[#5C3A21]/70">Drink & Recipe Journal</p>
            </div>
          </div>
          <nav className="flex items-center gap-3 text-[#3B5E2B]">
            <a href="#recipes" className="rounded-full px-3 py-2 text-sm transition hover:bg-[#3B5E2B]/10">Recipes</a>
            <a href="#newsletter" className="rounded-full px-3 py-2 text-sm transition hover:bg-[#3B5E2B]/10">Newsletter</a>
            <div className="flex items-center gap-2 rounded-full border border-[#5C3A21]/10 bg-white/70 p-2 shadow-sm">
              <a href="https://instagram.com" aria-label="Instagram" className="rounded-full p-1.5 transition hover:bg-[#3B5E2B]/10"><Instagram size={18} /></a>
              <a href="https://youtube.com" aria-label="YouTube" className="rounded-full p-1.5 transition hover:bg-[#3B5E2B]/10"><Youtube size={18} /></a>
              <a href="https://tiktok.com" aria-label="TikTok" className="rounded-full p-1.5 transition hover:bg-[#3B5E2B]/10"><BadgeCheck size={18} /></a>
            </div>
          </nav>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-16">
        <div className="space-y-6">
          <div className="inline-flex items-center rounded-full border border-[#D4A359]/40 bg-[#D4A359]/15 px-3 py-1 text-sm font-medium text-[#3B5E2B]">
            <Sparkles size={16} className="mr-2" /> Crafted for calm, color, and comfort
          </div>
          <div className="space-y-4">
            <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-[#3B5E2B] sm:text-5xl">
              Discover drinks that feel like a gentle ritual.
            </h1>
            <p className="max-w-xl text-lg leading-8 text-[#5C3A21]/80">
              From matcha mornings to moonlit lattes, The Green Whisk gathers recipes, styling notes, and flavor stories into one warm little archive.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="#recipes" className="rounded-full bg-[#3B5E2B] px-5 py-3 font-medium text-white shadow-sm transition hover:translate-y-[-1px]">Browse Recipes</a>
            <a href="#newsletter" className="rounded-full border border-[#5C3A21]/15 bg-white/70 px-5 py-3 font-medium text-[#5C3A21] transition hover:bg-white">Join the Newsletter</a>
          </div>
        </div>

        <div className="rounded-[28px] border border-[#5C3A21]/10 bg-white/70 p-5 shadow-soft backdrop-blur-sm">
          <div className="flex flex-col gap-3">
            <label className="text-sm font-semibold uppercase tracking-[0.25em] text-[#3B5E2B]">Search the collection</label>
            <div className="flex items-center gap-2 rounded-2xl border border-[#5C3A21]/10 bg-[#FAF7F2] px-4 py-3 shadow-sm">
              <Search size={18} className="text-[#3B5E2B]" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Try iced matcha, cozy latte, fruity..."
                className="w-full bg-transparent text-sm outline-none placeholder:text-[#5C3A21]/50"
              />
            </div>
            <p className="text-sm text-[#5C3A21]/70">Semantic filtering blends flavor, mood, and ingredient cues for a more intuitive browse.</p>
          </div>

          <div className="mt-5 overflow-hidden rounded-[24px] border border-[#5C3A21]/10 bg-[#FAF7F2] p-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={heroRecipes[activeIndex].title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
                className="grid gap-4 rounded-[20px] bg-white p-4 shadow-sm md:grid-cols-[1.1fr_0.9fr]"
              >
                <img src={heroRecipes[activeIndex].image} alt={heroRecipes[activeIndex].title} className="h-48 w-full rounded-[18px] object-cover" />
                <div className="flex flex-col justify-center">
                  <p className="mb-2 flex w-fit items-center gap-2 rounded-full bg-[#3B5E2B]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-[#3B5E2B]">
                    <Clock3 size={14} /> {heroRecipes[activeIndex].time}
                  </p>
                  <h3 className="text-2xl font-semibold text-[#3B5E2B]">{heroRecipes[activeIndex].title}</h3>
                  <p className="mt-2 text-sm leading-7 text-[#5C3A21]/80">{heroRecipes[activeIndex].blurb}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      <section id="recipes" className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-end justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#D4A359]">Recipe library</p>
            <h2 className="text-2xl font-semibold text-[#3B5E2B]">Seasonal sips and their design stories</h2>
          </div>
          <div className="hidden rounded-full border border-[#5C3A21]/10 bg-white/70 px-3 py-2 text-sm text-[#5C3A21]/70 sm:block">
            {filteredRecipes.length} recipes matched
          </div>
        </div>

        {loading ? (
          <div className="rounded-[24px] border border-[#5C3A21]/10 bg-white/70 p-8 text-center text-[#5C3A21]/70">Loading your recipe collection…</div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-2">
            {filteredRecipes.map((recipe, index) => (
              <motion.article
                key={recipe.id || recipe.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="overflow-hidden rounded-[28px] border border-[#5C3A21]/10 bg-white/80 shadow-soft"
              >
                <div className="grid gap-0 md:grid-cols-[0.9fr_1.1fr]">
                  <div className="relative h-56 md:h-full">
                    <img src={recipe.image || 'https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=1200&q=80'} alt={recipe.title} className="h-full w-full object-cover" />
                    <div className="absolute left-4 top-4 rounded-full bg-[#FAF7F2]/90 px-3 py-1 text-sm font-semibold text-[#3B5E2B]">{recipe.prepTime}</div>
                  </div>
                  <div className="flex flex-col gap-4 p-5">
                    <div>
                      <div className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.25em] text-[#D4A359]">
                        <Leaf size={14} /> {recipe.flavorProfile}
                      </div>
                      <h3 className="text-2xl font-semibold text-[#3B5E2B]">{recipe.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-[#5C3A21]/80">{recipe.description}</p>
                    </div>

                    <div className="rounded-[20px] border border-[#5C3A21]/10 bg-[#FAF7F2] p-4">
                      <h4 className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#3B5E2B]">Ingredients</h4>
                      <ul className="space-y-1 text-sm text-[#5C3A21]/80">
                        {recipe.ingredients?.map((item) => <li key={item} className="flex gap-2"><span className="text-[#D4A359]">•</span>{item}</li>)}
                      </ul>
                    </div>

                    <div className="rounded-[20px] border border-[#5C3A21]/10 bg-white p-4">
                      <h4 className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#3B5E2B]">Method</h4>
                      <ol className="space-y-2 text-sm text-[#5C3A21]/80">
                        {recipe.instructions?.map((step) => <li key={step} className="flex gap-2"><span className="text-[#3B5E2B]">{index + 1}.</span> {step}</li>)}
                      </ol>
                    </div>

                    <div className="rounded-[20px] border border-[#D4A359]/30 bg-[#FFF8EA] p-4">
                      <h4 className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#D4A359]">Design Notes</h4>
                      <ul className="space-y-1 text-sm text-[#5C3A21]/80">
                        {recipe.designNotes?.map((note) => <li key={note} className="flex gap-2"><span className="text-[#3B5E2B]">✦</span>{note}</li>)}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </section>

      <section id="newsletter" className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="rounded-[32px] border border-[#5C3A21]/10 bg-[#3B5E2B] p-8 text-white shadow-soft">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-[#D4A359]">Stay in the loop</p>
              <h2 className="text-3xl font-semibold">Get new recipes and visual notes in your inbox.</h2>
              <p className="mt-3 text-sm leading-7 text-white/80">Join the newsletter for fresh sips, soft seasonal inspiration, and the latest from The Green Whisk.</p>
            </div>
            <form onSubmit={handleSubscribe} className="w-full max-w-lg rounded-[24px] border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
              <div className="flex flex-col gap-3 sm:flex-row">
                <label className="flex flex-1 items-center gap-2 rounded-full bg-[#FAF7F2] px-4 py-3 text-[#5C3A21]">
                  <Mail size={16} />
                  <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="name@example.com" className="w-full bg-transparent text-sm outline-none" />
                </label>
                <button type="submit" className="flex items-center justify-center gap-2 rounded-full bg-[#D4A359] px-5 py-3 font-semibold text-[#3B5E2B] transition hover:opacity-90">
                  Subscribe <ArrowRight size={16} />
                </button>
              </div>
              {status ? <p className="mt-3 text-sm text-[#FAF7F2]">{status}</p> : null}
            </form>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#5C3A21]/10 bg-[#FAF7F2]/70">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 text-sm text-[#5C3A21]/70 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© 2026 The Green Whisk. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <a href="https://instagram.com" className="rounded-full border border-[#5C3A21]/10 bg-white/70 p-2"><Instagram size={16} /></a>
            <a href="https://youtube.com" className="rounded-full border border-[#5C3A21]/10 bg-white/70 p-2"><Youtube size={16} /></a>
            <a href="https://tiktok.com" className="rounded-full border border-[#5C3A21]/10 bg-white/70 p-2"><BadgeCheck size={16} /></a>
          </div>
        </div>
      </footer>
    </main>
  );
}
