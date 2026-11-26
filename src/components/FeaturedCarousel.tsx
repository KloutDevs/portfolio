import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
import SpotlightCard from './reactbits/SpotlightCard';
import BlurText from './reactbits/BlurText';

interface Slide {
  id: string;
  title: string;
  description: string;
  tags: string[];
  href: string;
  image: string;
}

interface Props {
  slides: Slide[];
  label: string;
  source: string;
  carouselLabel: string;
  className?: string;
}

const ACTIVE_GROW = 12; // the open project takes this many parts of the width, each collapsed one takes 1
const SWIPE_DISTANCE = 50;

// The open project's picture sits on the right and fades out toward the left and the top, strongest at the bottom right
// and the centre right. A second gradient fades its right edge so it never ends in a hard line.
const IMAGE_MASK =
  'radial-gradient(ellipse 72% 82% at 90% 74%, #000 0%, rgba(0,0,0,0.7) 36%, rgba(0,0,0,0.25) 64%, transparent 90%), linear-gradient(to left, transparent 0%, #000 22%)';

// One bento card split into panels: the open project is wide, the others are narrow vertical strips with their number
// and title. Selecting a strip opens it and the panels resize inside the same card.
export default function FeaturedCarousel({ slides, label, source, carouselLabel, className = '' }: Props) {
  const [index, setIndex] = useState(0);
  const pointerStart = useRef<number | null>(null);
  const swiped = useRef(false);
  const panels = useRef<(HTMLDivElement | null)[]>([]);
  const moveFocus = useRef(false);
  const last = slides.length - 1;

  const select = (target: number, fromUser = true) => {
    moveFocus.current = fromUser;
    setIndex(Math.max(0, Math.min(last, target)));
  };

  // After the user opens a project, keyboard focus follows it so the arrow keys keep working.
  useEffect(() => {
    if (moveFocus.current) panels.current[index]?.focus({ preventScroll: true });
    moveFocus.current = false;
  }, [index]);

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowRight') select(index + 1);
    if (event.key === 'ArrowLeft') select(index - 1);
  };
  const onPointerDown = (event: PointerEvent) => {
    pointerStart.current = event.clientX;
    swiped.current = false;
  };
  const onPointerUp = (event: PointerEvent) => {
    if (pointerStart.current === null) return;
    const distance = event.clientX - pointerStart.current;
    pointerStart.current = null;
    if (Math.abs(distance) >= SWIPE_DISTANCE) {
      swiped.current = true;
      select(index + (distance < 0 ? 1 : -1));
    }
  };

  return (
    <SpotlightCard
      className={`select-none rounded-card! bg-canvas/45! backdrop-blur-md p-2! overflow-hidden! fit:min-h-0 ${className}`}
      spotlightColor="rgba(183, 245, 66, 0.22)"
      theme="dark"
      role="region"
      aria-roledescription="carousel"
      aria-label={carouselLabel}
      onKeyDown={onKeyDown}
    >
      <div
        className="flex h-full gap-2"
        style={{ touchAction: 'pan-y' }}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => (pointerStart.current = null)}
        onClickCapture={(event) => {
          // A swipe that ends on a link or strip must not also activate it.
          if (swiped.current) {
            event.preventDefault();
            event.stopPropagation();
            swiped.current = false;
          }
        }}
      >
        {slides.map((slide, i) => {
          const active = i === index;
          return (
            <div
              key={slide.id}
              ref={(node) => {
                panels.current[i] = node;
              }}
              tabIndex={-1}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} / ${slides.length}: ${slide.title}`}
              className="relative min-w-11 overflow-hidden rounded-[14px] border border-line/70 bg-canvas/50 outline-none transition-[flex-grow] duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
              style={{ flexGrow: active ? ACTIVE_GROW : 1, flexBasis: 0 }}
            >
              {/* Collapsed look: the picture behind the strip, darkened. */}
              <img
                src={slide.image}
                alt=""
                aria-hidden="true"
                loading={i === 0 ? 'eager' : 'lazy'}
                draggable={false}
                className={`pointer-events-none absolute inset-0 size-full select-none object-cover object-[85%_50%] transition-opacity duration-500 ${active ? 'opacity-0' : 'opacity-40'}`}
              />
              {/* Open look: the picture faded into the card. */}
              <img
                src={slide.image}
                alt=""
                aria-hidden="true"
                loading={i === 0 ? 'eager' : 'lazy'}
                draggable={false}
                className={`pointer-events-none absolute inset-y-0 right-0 h-full w-[52%] select-none object-cover object-right transition-opacity duration-500 ${active ? 'opacity-85' : 'opacity-0'}`}
                style={{ maskImage: IMAGE_MASK, WebkitMaskImage: IMAGE_MASK, maskComposite: 'intersect', WebkitMaskComposite: 'source-in' }}
              />

              {!active && (
                <button
                  type="button"
                  aria-label={slide.title}
                  aria-expanded="false"
                  onClick={() => select(i)}
                  className="absolute inset-0 z-10 flex cursor-pointer flex-col items-center justify-between bg-gradient-to-t from-canvas/70 via-transparent to-canvas/30 py-4 transition-colors hover:from-canvas/50"
                >
                  <span className="[writing-mode:vertical-rl] rotate-180 text-base font-bold tracking-tight text-ink fit:text-[clamp(0.8rem,2.4dvh,1rem)]">{slide.title}</span>
                  <span className="text-xs font-semibold tabular-nums text-accent">{String(i + 1).padStart(2, '0')}</span>
                </button>
              )}

              <div
                inert={!active}
                className={`relative flex h-full min-w-[20rem] flex-col justify-between gap-8 p-6 transition-opacity duration-500 sm:p-8 fit:gap-2 fit:p-[clamp(0.875rem,2.4dvh,1.75rem)] ${
                  active ? 'opacity-100 delay-200' : 'pointer-events-none opacity-0'
                }`}
              >
                <div>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent fit:mb-[0.8dvh]">
                    <span className="tabular-nums">{String(i + 1).padStart(2, '0')}</span> · {label}
                  </p>
                  <h2 className="text-3xl font-bold tracking-tight fit:text-[clamp(1.4rem,3.8dvh,1.9rem)]">
                    <BlurText text={slide.title} animateBy="words" delay={140} />
                  </h2>
                  <p className="mt-3 max-w-[26rem] leading-relaxed text-muted fit:mt-[1dvh] fit:text-[clamp(0.8rem,1.9dvh,1rem)]">{slide.description}</p>
                  <ul className="mt-5 flex flex-wrap gap-2 fit:mt-[1.4dvh] fit:short:hidden">
                    {slide.tags.map((tag) => (
                      <li key={tag} className="rounded-full border border-line px-3 py-1 text-sm text-ink/90">
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <a
                    href={slide.href}
                    className="inline-flex items-center gap-2 rounded-xl border border-line px-5 py-3 font-semibold transition-colors hover:border-accent hover:text-accent fit:py-[clamp(0.4rem,1.2dvh,0.75rem)]"
                  >
                    {source}
                    <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </SpotlightCard>
  );
}
