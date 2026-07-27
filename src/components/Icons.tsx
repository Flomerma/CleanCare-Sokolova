import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
};

export function SparklesIcon(props: IconProps) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      <path d="M12 3l1.8 4.7L18.5 9.5 13.8 11.3 12 16l-1.8-4.7L5.5 9.5l4.7-1.8L12 3Z" />
      <path d="M18 15l.9 2.3 2.3.9-2.3.9-.9 2.3-.9-2.3-2.3-.9 2.3-.9.9-2.3Z" />
    </svg>
  );
}

export function BoxIcon(props: IconProps) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      <path d="M3.5 7.5 12 3.5l8.5 4v9L12 20.5l-8.5-4v-9Z" />
      <path d="M3.5 7.5 12 11.5l8.5-4M12 11.5V20.5" />
    </svg>
  );
}

export function WindowIcon(props: IconProps) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" rx="2" />
      <path d="M12 3.5v17M3.5 12h17" />
    </svg>
  );
}

export function BuildingIcon(props: IconProps) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      <path d="M4 20.5V5.5A2 2 0 0 1 6 3.5h7a2 2 0 0 1 2 2v15" />
      <path d="M15 9.5h3a2 2 0 0 1 2 2v9M2.5 20.5h19" />
      <path d="M7.5 7.5h1.5M11 7.5h1.5M7.5 11h1.5M11 11h1.5M7.5 14.5h1.5M11 14.5h1.5" />
    </svg>
  );
}

export function StairsIcon(props: IconProps) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      <path d="M3 20.5h4v-4h4.5v-4H16V8.5h5" />
      <path d="M21 3.5v17" />
    </svg>
  );
}

export function SofaIcon(props: IconProps) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      <path d="M4 11V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3" />
      <path d="M4 11a2 2 0 0 0-2 2v4h20v-4a2 2 0 0 0-2-2 2 2 0 0 0-2 2v1H6v-1a2 2 0 0 0-2-2Z" />
      <path d="M5 17v2M19 17v2" />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      <path d="m4.5 12.5 5 5 10-11" />
    </svg>
  );
}

export function ShieldIcon(props: IconProps) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      <path d="M12 3.5 19.5 6v6c0 4.2-3.1 7.6-7.5 9-4.4-1.4-7.5-4.8-7.5-9V6L12 3.5Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  );
}

export function PinIcon(props: IconProps) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      <path d="M6.5 3.5h3l1.5 4-2 1.5a12 12 0 0 0 6 6l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.7 2 2 0 0 1 6.5 3.5Z" />
    </svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 6.5 8.5 6 8.5-6" />
    </svg>
  );
}

export function UsersIcon(props: IconProps) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
      <path d="M16 5.2a3.5 3.5 0 0 1 0 6.6M17 14.2a6.5 6.5 0 0 1 4.5 5.8" />
    </svg>
  );
}

export function LeafIcon(props: IconProps) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      <path d="M20 4C10 4 4 8.5 4 15a5 5 0 0 0 5 5c6.5 0 11-6 11-16Z" />
      <path d="M4 20C8 15 12 12 17 10" />
    </svg>
  );
}

/** Icon-Auflösung über den Schlüssel aus src/config/services.ts */
export const serviceIcons: Record<string, (props: IconProps) => React.ReactElement> = {
  sparkles: SparklesIcon,
  box: BoxIcon,
  window: WindowIcon,
  building: BuildingIcon,
  stairs: StairsIcon,
  sofa: SofaIcon,
};

export function ServiceIcon({ name, ...props }: IconProps & { name: string }) {
  const Icon = serviceIcons[name] ?? SparklesIcon;
  return <Icon {...props} />;
}
