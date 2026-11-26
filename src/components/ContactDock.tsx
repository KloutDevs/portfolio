import { useEffect, useState, type CSSProperties } from 'react';
import Dock from './reactbits/Dock';

interface Contact {
  label: string;
  href: string;
  svg: string;
}

// Hides the shared panel behind the icons so every button stands on its own. Each icon keeps its own tile
// and the grow-on-hover animation.
const separateButtons = {
  '--dock-panel': 'transparent',
  '--dock-panel-edge': 'transparent',
  '--dock-panel-highlight': 'transparent',
  '--dock-panel-shadow': 'none',
  backdropFilter: 'none',
  WebkitBackdropFilter: 'none',
} as CSSProperties;

// The dock scales with the viewport height so it fills the card on tall screens and still fits on short ones.
function useDockSize() {
  const [size, setSize] = useState(52);
  useEffect(() => {
    const update = () => setSize(Math.round(Math.min(72, Math.max(40, window.innerHeight * 0.07))));
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  return size;
}

// macOS-style dock: icons grow near the pointer. Every contact opens in a new tab.
export default function ContactDock({ contacts }: { contacts: Contact[] }) {
  const size = useDockSize();
  const items = contacts.map((contact) => ({
    label: contact.label,
    icon: <span className="size-full [&>svg]:size-full" dangerouslySetInnerHTML={{ __html: contact.svg }} />,
    onClick: () => window.open(contact.href, '_blank', 'noopener,noreferrer'),
  }));
  return (
    <Dock
      items={items}
      position="bottom"
      theme="dark"
      baseItemSize={size}
      magnification={Math.round(size * 1.45)}
      gap={Math.round(size * 0.35)}
      accentColor="#b7f542"
      style={separateButtons}
    />
  );
}
