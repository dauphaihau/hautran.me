import { animate, createTimeline, scrambleText } from 'animejs';

// ─── Speed knobs ────────────────────────────────────────────────────────────
// INTRO_DURATION     ms each element spends scrambling on page load
// INTRO_SETTLE       ms the text takes to "lock in" after scrambling
// INTRO_STAGGER      ms between each visual row starting (lower = faster cascade)
// HOVER_DURATION     ms the scramble runs when hovering an element
// HOVER_SETTLE       ms to settle after hover scramble
// ────────────────────────────────────────────────────────────────────────────
const INTRO_DURATION = 400;
const INTRO_SETTLE = 150;
const INTRO_STAGGER = 80;
const HOVER_DURATION = 500;
const HOVER_SETTLE = 250;

export function runScrambleAnimation(): void {
  const els: Element[] = [];
  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_ELEMENT,
    {
      acceptNode(node) {
        const el = node as Element;
        if (el instanceof SVGElement) return NodeFilter.FILTER_SKIP;
        if (el.children.length === 0 && el.textContent?.trim()) return NodeFilter.FILTER_ACCEPT;
        return NodeFilter.FILTER_SKIP;
      },
    }
  );
  let node;
  while ((node = walker.nextNode())) els.push(node as Element);

  // Batch all reads up front to avoid layout thrashing
  const metrics = els.map(el => {
    const { height, top } = el.getBoundingClientRect();
    const bg = getComputedStyle(el).backgroundColor;
    const hasBg = bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent';
    return { height, top, hasBg };
  });

  // Batch all writes — height alone is enough to stabilise parent layout;
  // overflow:hidden is intentionally omitted so the cursor chars are never clipped.
  els.forEach((el, i) => {
    const htmlElement = el as HTMLElement;
    htmlElement.style.height = `${metrics[i].height}px`;
    if (metrics[i].hasBg) htmlElement.style.opacity = '0';
  });

  // For each text element, find sibling elements that contain only icons
  // (siblings with no text leaves of their own), and hide them initially.
  const elsSet = new Set(els);
  const nearbyIconsMap = new Map<Element, Element[]>();
  const collectIconSiblings = (container: Element, child: Element, out: Element[]): void => {
    Array.from(container.children).forEach(sibling => {
      if (sibling === child) return;
      if ([...elsSet].some(textEl => sibling.contains(textEl))) return;
      if (sibling instanceof SVGElement) out.push(sibling);
      else sibling.querySelectorAll('svg').forEach(svg => out.push(svg));
    });
  };
  els.forEach(el => {
    const icons: Element[] = [];
    const parent = el.parentElement;
    if (parent) {
      collectIconSiblings(parent, el, icons);
      const grandparent = parent.parentElement;
      if (grandparent) collectIconSiblings(grandparent, parent, icons);
    }
    if (icons.length) {
      icons.forEach(svg => ((svg as HTMLElement).style.opacity = '0'));
      nearbyIconsMap.set(el, icons);
    }
  });

  // Split by column: Profile (first <section>) vs Background (second <section>)
  const profileSection = document.querySelectorAll('.content > section')[0];
  const profileEls = els.filter(el => profileSection?.contains(el));
  const backgroundEls = els.filter(el => !profileSection?.contains(el));

  // Hide fade-only elements (no text, e.g. decorative dividers) until the intro plays.
  const fadeEls = Array.from(document.querySelectorAll<HTMLElement>('[data-scramble-fade]'));
  fadeEls.forEach(el => { el.style.opacity = '0'; });

  // Both timelines share the same cleanup; run it only after the last one finishes.
  let doneCount = 0;
  const cleanup = (): void => {
    if (++doneCount < 2) return;
    els.forEach((el, i) => {
      const htmlElement = el as HTMLElement;
      htmlElement.style.height = '';
      if (metrics[i].hasBg) htmlElement.style.opacity = '';
    });
    animate(fadeEls, { opacity: 1, duration: 400 });
  };

  const buildTimeline = (groupEls: Element[]): ReturnType<typeof createTimeline> => {
    const elsIndex = new Map(els.map((el, i) => [el, i]));
    const roundedTop = (el: Element): number => Math.round(metrics[elsIndex.get(el)!].top);
    const uniqueTops = [...new Set(groupEls.map(roundedTop))].sort((left, right) => left - right);
    const topToRow = new Map(uniqueTops.map((top, rowIdx) => [top, rowIdx]));

    const tl = createTimeline({ delay: 500, onComplete: cleanup });
    groupEls.forEach(el => {
      const i = elsIndex.get(el)!;
      const icons = nearbyIconsMap.get(el);
      const row = topToRow.get(roundedTop(el)) ?? 0;
      tl.add(el, {
        ...(metrics[i].hasBg ? { opacity: { to: 1, duration: 300 } } : {}),
        innerHTML: scrambleText({
          override: '',
          duration: INTRO_DURATION,
          settleDuration: INTRO_SETTLE,
          perturbation: 0.2,
          cursor: '░▒▓█',
        }),
        onBegin() {
          if (icons?.length) animate(icons as HTMLElement[], { opacity: 1, duration: 400 });
        },
      }, row * INTRO_STAGGER);
    });
    return tl;
  };

  buildTimeline(profileEls).init();
  buildTimeline(backgroundEls).init();

  attachScrambleHover(els);
}

function collectLeafEls(): Element[] {
  const els: Element[] = [];
  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_ELEMENT,
    {
      acceptNode(node) {
        const el = node as Element;
        if (el instanceof SVGElement) return NodeFilter.FILTER_SKIP;
        if (el.children.length === 0 && el.textContent?.trim()) return NodeFilter.FILTER_ACCEPT;
        return NodeFilter.FILTER_SKIP;
      },
    }
  );
  let node;
  while ((node = walker.nextNode())) els.push(node as Element);
  return els;
}

export function attachScrambleHover(els: Element[] = collectLeafEls()): void {
  els.forEach(el => {
    const replay = (): void => {
      const htmlElement = el as HTMLElement;
      const { width, height } = htmlElement.getBoundingClientRect();
      htmlElement.style.width = `${width}px`;
      htmlElement.style.height = `${height}px`;
      htmlElement.style.overflow = 'hidden';
      animate(el, {
        innerHTML: scrambleText({
          cursor: '░▒▓█',
          duration: HOVER_DURATION,
          settleDuration: HOVER_SETTLE,
          settleRate: 30,
        }),
        onComplete() {
          htmlElement.style.width = '';
          htmlElement.style.height = '';
          htmlElement.style.overflow = '';
        },
      });
    };
    el.addEventListener('pointerenter', replay);
  });
}
