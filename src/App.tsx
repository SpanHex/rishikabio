import { type CSSProperties, useEffect, useRef, useState } from "react";

const asset = (name: string) => `/assets/${name}`;

const cards = [
  {
    eyebrow: "about me",
    title: "click",
    color: "#b8a8d8",
    icon: "26402.svg",
    items: [
      "Proud Multi-Stan",
      "Favorite Groups & Tracks",
      "Stream & Dance Practice",
      "Concert & Merch",
      "Iconic Choreographies",
    ],
    className: "card-kpop",
  },
  {
    eyebrow: "things i love:",
    title: "anime & chill",
    color: "#c8d8e0",
    icon: "c33b7.svg",
    items: [
      "Weekend Binge Sessions",
      "Manga Reading Nights",
      "Favorite Openings & OSTs",
      "Cosplay & Fan Art",
      "Anime Edits & AMVs",
    ],
    className: "card-anime",
  },
  {
    eyebrow: "Yummy Tummy :P",
    title: "Food & Snacks",
    color: "#d8c8a3",
    icon: "food",
    items: [
      "Loaded Shawarmas",
      "Chicken Biryani",
      "Steaming Hot Momos",
      "Crispy Fries & Dips",
      "Boba & Sweet Treats",
      "Spicy Noodles",
    ],
    className: "card-food",
  },
  {
    eyebrow: "daily life",
    title: "good vibes only",
    color: "#d8b8c8",
    icon: "6bc7d.svg",
    items: [
      "Good Vibes & Laughs",
      "Trendy & Cozy Outfits",
      "Aesthetic Photo Dumps",
      "Curating Spotify Playlists",
      "Memes & Reels Humor",
      "Spreading Kindness",
    ],
    className: "card-daily",
  },
];

interface DayEntry {
  day: string;
  weekday: string;
  label: string;
  time: string;
  accent: string;
  title: string;
  caption: string;
  sceneKind: "school" | "kpop" | "anime" | "food" | "music" | "vibes";
}

const MEMORY_DAYS: DayEntry[] = [
  {
    day: "11",
    weekday: "MON",
    label: "SCHOOL",
    time: "08:30 AM",
    accent: "#dd8c96",
    title: "CLASS 11TH NOTES & DOODLES.",
    caption: "Surviving 11th grade one aesthetic notebook page at a time, doodling stars in the margins between lectures.",
    sceneKind: "school",
  },
  {
    day: "12",
    weekday: "TUE",
    label: "K-POP",
    time: "05:00 PM",
    accent: "#b8a8d8",
    title: "MV DROPS & CHOREO BREAKDOWNS.",
    caption: "Headphones all the way up—replaying favorite bridges, learning point dances, and updating the bias list.",
    sceneKind: "kpop",
  },
  {
    day: "13",
    weekday: "WED",
    label: "ANIME",
    time: "08:15 PM",
    accent: "#c8d8e0",
    title: "OPENINGS, MANGA & CHILL.",
    caption: "Cozy blanket, late-evening episodes, rewatching iconic arcs, and getting lost in manga chapters.",
    sceneKind: "anime",
  },
  {
    day: "14",
    weekday: "THU",
    label: "FOOD RUN",
    time: "06:30 PM",
    accent: "#d8c8a3",
    title: "SHAWARMA & STEAMING MOMOS.",
    caption: "The undefeated comfort combo: crispy fries, spicy noodles, loaded shawarma, and sweet boba to wrap it up.",
    sceneKind: "food",
  },
  {
    day: "15",
    weekday: "FRI",
    label: "PLAYLISTS",
    time: "10:00 PM",
    accent: "#d8b8c8",
    title: "MUSIC ON, WORLD OFF.",
    caption: "Curating late-night Spotify playlists for every mood—dreamy lo-fi, upbeat pop, and favorite OST tracks.",
    sceneKind: "music",
  },
  {
    day: "16",
    weekday: "SAT",
    label: "VIBES",
    time: "04:20 PM",
    accent: "#dd8c96",
    title: "PHOTO DUMPS & GOOD LAUGHS.",
    caption: "Cozy outfits, candid polaroid snaps, sending memes back and forth, and always staying curious.",
    sceneKind: "vibes",
  },
];

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

function useScrollChoreography() {
  useEffect(() => {
    let rafId = 0;
    let dirty = true;

    const update = () => {
      rafId = 0;
      if (!dirty) return;
      dirty = false;

      const vh = window.innerHeight || 900;
      const scrollY = window.scrollY;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - vh);
      const pageProgress = clamp(scrollY / maxScroll, 0, 1);

      document.documentElement.style.setProperty("--page-progress", pageProgress.toFixed(4));

      const scenes = document.querySelectorAll<HTMLElement>("[data-scene]");

      scenes.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const idx = Number(el.dataset.scene ?? 0);

        if (idx === 0) {
          const rawSp = clamp(-rect.top / Math.max(1, rect.height * 0.92), 0, 1);
          const sp = Math.sin(rawSp * Math.PI);
          const sv = clamp((rect.top + rect.height * 0.5 - vh * 0.5) / Math.max(1, vh), -1, 1);
          el.style.setProperty("--sp", sp.toFixed(4));
          el.style.setProperty("--sv", sv.toFixed(4));
        } else {
          const sp = clamp((vh - rect.top) / Math.max(1, vh + rect.height), 0, 1);
          const sv = clamp(
            (rect.top + rect.height * 0.5 - vh * 0.5) / Math.max(1, vh * 0.5 + rect.height * 0.5),
            -1,
            1,
          );
          el.style.setProperty("--sp", sp.toFixed(4));
          el.style.setProperty("--sv", sv.toFixed(4));
        }
      });
    };

    const scheduleUpdate = () => {
      dirty = true;
      if (!rafId) {
        rafId = window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate, { passive: true });

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);
}

function FoodIcon() {
  return (
    <span className="food-icon" aria-hidden="true">
      <img src={asset("840ed.svg")} alt="" />
      <img src={asset("6b908.svg")} alt="" />
    </span>
  );
}

function InterestCard({ card, index }: { card: (typeof cards)[number]; index: number }) {
  return (
    <article
      className={`interest-card ${card.className}`}
      style={{ backgroundColor: card.color, "--card-idx": index } as CSSProperties}
      tabIndex={0}
    >
      <img className="card-glow" src={asset("8f45e.svg")} alt="" />
      <img className="card-dot" src={asset("f9fa2.svg")} alt="" />
      <header>
        <div>
          <p className="card-eyebrow">{card.eyebrow}</p>
          <h3>{card.title}</h3>
        </div>
        <span className="icon-badge">
          {card.icon === "food" ? <FoodIcon /> : <img src={asset(card.icon)} alt="" />}
        </span>
      </header>
      <ul>
        {card.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  );
}

function VectorStarFlower({ className = "" }: { className?: string }) {
  return (
    <svg className={`vector-flower ${className}`} viewBox="0 0 120 120" aria-hidden="true">
      {[0, 72, 144, 216, 288].map((deg) => (
        <ellipse
          key={deg}
          cx="60"
          cy="32"
          rx="21"
          ry="28"
          transform={`rotate(${deg} 60 60)`}
          fill="currentColor"
        />
      ))}
      <circle cx="60" cy="60" r="14" fill="#2e4060" />
    </svg>
  );
}

function DaySceneIllustration({ kind, accent }: { kind: DayEntry["sceneKind"]; accent: string }) {
  return (
    <svg className="memory-scene-svg" viewBox="0 0 360 220" aria-hidden="true">
      <rect width="360" height="220" fill="#182338" />
      <circle cx="290" cy="56" r="56" fill={accent} opacity="0.22" />
      <circle cx="290" cy="56" r="34" fill={accent} opacity="0.45" />
      {kind === "school" && (
        <g stroke="#f7f7f1" strokeWidth="3" fill="none">
          <rect x="46" y="42" width="160" height="126" rx="10" fill={accent} stroke="#182338" />
          <line x1="72" y1="74" x2="180" y2="74" stroke="#182338" />
          <line x1="72" y1="98" x2="165" y2="98" stroke="#182338" />
          <line x1="72" y1="122" x2="145" y2="122" stroke="#182338" />
          <polygon points="260,82 268,104 290,104 272,118 278,140 260,126 242,140 248,118 230,104 252,104" fill="#f7f7f1" stroke="none" />
        </g>
      )}
      {kind === "kpop" && (
        <g>
          <circle cx="135" cy="112" r="58" fill="#101828" stroke="#f7f7f1" strokeWidth="3" />
          <circle cx="135" cy="112" r="22" fill={accent} />
          <circle cx="135" cy="112" r="6" fill="#182338" />
          <rect x="225" y="72" width="12" height="76" rx="6" fill={accent} />
          <rect x="247" y="54" width="12" height="94" rx="6" fill="#f7f7f1" />
          <rect x="269" y="88" width="12" height="60" rx="6" fill={accent} />
          <rect x="291" y="66" width="12" height="82" rx="6" fill="#f7f7f1" />
        </g>
      )}
      {kind === "anime" && (
        <g>
          <rect x="52" y="42" width="180" height="122" rx="16" fill="#23324d" stroke="#f7f7f1" strokeWidth="4" />
          <rect x="66" y="56" width="152" height="94" rx="8" fill={accent} />
          <polygon points="128,82 164,103 128,124" fill="#182338" />
          <line x1="115" y1="42" x2="92" y2="18" stroke="#f7f7f1" strokeWidth="3" />
          <line x1="168" y1="42" x2="192" y2="18" stroke="#f7f7f1" strokeWidth="3" />
        </g>
      )}
      {kind === "food" && (
        <g>
          <ellipse cx="145" cy="148" rx="76" ry="22" fill="#f7f7f1" />
          <path d="M88 144 C88 94, 202 94, 202 144 Z" fill={accent} stroke="#182338" strokeWidth="3" />
          <path d="M120 74 Q130 56 122 40" stroke="#f7f7f1" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M148 70 Q158 52 150 36" stroke="#f7f7f1" strokeWidth="3" fill="none" strokeLinecap="round" />
          <rect x="246" y="82" width="44" height="76" rx="10" fill={accent} stroke="#f7f7f1" strokeWidth="3" />
          <line x1="274" y1="82" x2="286" y2="48" stroke="#f7f7f1" strokeWidth="4" />
        </g>
      )}
      {kind === "music" && (
        <g>
          <path d="M76 126 A68 68 0 0 1 212 126" fill="none" stroke="#f7f7f1" strokeWidth="10" strokeLinecap="round" />
          <rect x="64" y="114" width="24" height="50" rx="10" fill={accent} stroke="#182338" strokeWidth="3" />
          <rect x="200" y="114" width="24" height="50" rx="10" fill={accent} stroke="#182338" strokeWidth="3" />
          <path d="M254 118 V62 L302 52 V108" fill="none" stroke="#f7f7f1" strokeWidth="4" strokeLinecap="round" />
          <circle cx="246" cy="122" r="10" fill={accent} />
          <circle cx="294" cy="112" r="10" fill={accent} />
        </g>
      )}
      {kind === "vibes" && (
        <g>
          <rect x="62" y="42" width="112" height="134" rx="4" fill="#f7f7f1" transform="rotate(-6 118 109)" />
          <rect x="74" y="54" width="88" height="86" fill={accent} transform="rotate(-6 118 109)" />
          <rect x="156" y="54" width="112" height="134" rx="4" fill="#f7f7f1" transform="rotate(7 212 121)" />
          <rect x="168" y="66" width="88" height="86" fill="#2e4060" transform="rotate(7 212 121)" />
          <circle cx="212" cy="108" r="18" fill={accent} />
        </g>
      )}
    </svg>
  );
}

function MemoryCalendar() {
  const [activeDay, setActiveDay] = useState(0);
  const entry = MEMORY_DAYS[activeDay];

  return (
    <div className="memory-calendar">
      <div className="calendar-top">
        <span>
          WEEK <strong>04</strong>
        </span>
      </div>

      <div className="memory-day-tabs" role="tablist" aria-label="Choose a day in Rishika's week">
        {MEMORY_DAYS.map((item, idx) => (
          <button
            key={item.day}
            type="button"
            role="tab"
            aria-selected={idx === activeDay}
            id={`memory-tab-${idx}`}
            onClick={() => setActiveDay(idx)}
          >
            <span className="memory-weekday">{item.weekday}</span>
            <strong>{item.day}</strong>
            <span className="memory-activity-label">{item.label}</span>
          </button>
        ))}
      </div>

      <div className="memory-panel" role="tabpanel" aria-labelledby={`memory-tab-${activeDay}`}>
        <div className="memory-photo">
          <DaySceneIllustration kind={entry.sceneKind} accent={entry.accent} />
          <span className="memory-date">
            DAY {entry.day}
            <span>
              {entry.weekday} · {entry.time}
            </span>
          </span>
        </div>
        <div className="memory-caption" aria-live="polite">
          <h3>{entry.title}</h3>
          <p>{entry.caption}</p>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const secondPhotoRef = useRef<HTMLDivElement>(null);

  useScrollChoreography();

  const scrollToSecondPhoto = () => {
    secondPhotoRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  return (
    <div className="experience">
      <div className="overall-progress" aria-hidden="true" />

      <main className="bio-page">
        <section id="prologue" className="hero" aria-labelledby="intro-title" data-scene="0">
          <img className="hero-panel" src={asset("e79ea.svg")} alt="" />
          <img className="corner corner-tl" src={asset("068b2.svg")} alt="" />
          <img className="corner corner-tr" src={asset("0a0cf.svg")} alt="" />
          <img className="corner corner-bl" src={asset("f4983.svg")} alt="" />
          <img className="corner corner-br" src={asset("f4983.svg")} alt="" />

          <div className="hero-copy">
            <h1 id="intro-title">
              <span className="hero-word" style={{ "--word-shift": "-42px", "--word-drop": "-18px" } as CSSProperties}>
                Hi!
              </span>{" "}
              <span className="hero-word" style={{ "--word-shift": "-20px", "--word-drop": "14px" } as CSSProperties}>
                I
              </span>{" "}
              <span className="hero-word" style={{ "--word-shift": "-8px", "--word-drop": "-12px" } as CSSProperties}>
                am
              </span>{" "}
              <span className="rishika-anchor hero-word" style={{ "--word-shift": "0px", "--word-drop": "-22px" } as CSSProperties}>
                Rishika
                <img className="flourish" src={asset("896ed.svg")} alt="" />
              </span>
              ,{" "}
              <span className="hero-word" style={{ "--word-shift": "16px", "--word-drop": "18px" } as CSSProperties}>
                Welcome
              </span>{" "}
              <span className="hero-word" style={{ "--word-shift": "26px", "--word-drop": "-14px" } as CSSProperties}>
                to
              </span>{" "}
              <span className="hero-word" style={{ "--word-shift": "34px", "--word-drop": "16px" } as CSSProperties}>
                my
              </span>{" "}
              <span className="hero-word" style={{ "--word-shift": "44px", "--word-drop": "-16px" } as CSSProperties}>
                Bio!
              </span>
            </h1>

            <div className="hero-art" aria-hidden="true">
              <span className="heart-wrap">
                <img className="heart" src={asset("7814f.svg")} alt="" />
                <img className="star star-1" src={asset("6eb2a.svg")} alt="" />
                <img className="star star-2" src={asset("b7d06.svg")} alt="" />
                <img className="star star-3" src={asset("37acf.svg")} alt="" />
                <img className="star star-4" src={asset("fe478.svg")} alt="" />
                <img className="star star-5" src={asset("796c9.svg")} alt="" />
              </span>
            </div>
          </div>
        </section>

        <section
          id="scrapbook"
          className="scrapbook"
          aria-label="A little about me"
          data-scene="1"
        >
          <div className="chapter-label">
            <span>01</span>
            <span>A LITTLE ABOUT ME</span>
            <i aria-hidden="true" />
          </div>

          <div className="photo-area photo-area-one">
            <button
              className="polaroid polaroid-one"
              type="button"
              onClick={scrollToSecondPhoto}
              aria-label="Scroll to the next photo"
            >
              <img src={asset("fe783.png")} alt="Rishika outdoors" />
            </button>
            <p className="note note-music">i love listening to music, especially Kpop!</p>
          </div>

          <div className="photo-area photo-area-two" ref={secondPhotoRef}>
            <div className="polaroid polaroid-two">
              <img src={asset("d5052.png")} alt="Rishika posing for a portrait" />
            </div>
            <p className="note note-school">
              i am 16 year old and currently studying class 11th!{" "}
            </p>
          </div>

          <div className="polaroid polaroid-three">
            <img src={asset("9337e.png")} alt="Rishika wearing glasses" />
          </div>
        </section>

        <section id="interests" className="interests" aria-label="Things I love" data-scene="2">
          <div className="chapter-label">
            <span>02</span>
            <span>THINGS I LOVE</span>
            <i aria-hidden="true" />
          </div>

          <div className="card-grid">
            {cards.map((card, idx) => (
              <InterestCard key={card.title} card={card} index={idx} />
            ))}
          </div>
        </section>

        <section id="days" className="days-scene" aria-labelledby="days-title" data-scene="3">
          <div className="chapter-label">
            <span>03</span>
            <span>EVERY DAY MATTERS</span>
            <i aria-hidden="true" />
          </div>

          <div className="days-layout">
            <div className="days-heading">
              <span className="days-kicker">ONE UNFORGETTABLE YEAR.</span>
              <h2 id="days-title">
                EVERY
                <br />
                <em>DAY</em>
                <br />
                MATTERS<span>.</span>
              </h2>
              <p>
                Find your rhythm. Little moments every day make class 11th unforgettable.
              </p>
              <VectorStarFlower className="days-flower" />
            </div>

            <div className="calendar-wrap">
              <MemoryCalendar />
            </div>
          </div>
        </section>

        <footer id="fin" className="footer" data-scene="4">
          <div className="final-orbits" aria-hidden="true">
            <div className="final-orbit" />
            <div className="final-orbit" />
          </div>

          <div className="sunrise-copy" aria-hidden="true">
            STAY CURIOUS
          </div>

          <div className="chapter-label chapter-label-dark">
            <span>04</span>
            <span>THE END</span>
            <i aria-hidden="true" />
          </div>

          <div className="status-grid">
            <div>
              <span>current status</span>
              <strong>surviving 11th grade &amp; living my best life</strong>
            </div>
            <div>
              <span>location</span>
              <strong>
                somewhere cozy
                <br />
                with a shawarma in hand
              </strong>
            </div>
            <div>
              <span>daily mantra</span>
              <strong>
                music on, world off
                <br />
                always stay curious
              </strong>
            </div>
          </div>

          <p className="fin">fin.</p>
        </footer>
      </main>
    </div>
  );
}
