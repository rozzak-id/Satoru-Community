import React from 'react';

interface HeroBannerProps {
  title: string;
  subtitle?: string;
  metaLine?: string;
  backgroundImage?: string;
  variant?: 'dark' | 'light';
  children?: React.ReactNode;
}

export function HeroBanner({
  title,
  subtitle,
  metaLine,
  backgroundImage,
  variant = 'dark',
  children,
}: HeroBannerProps) {
  if (variant === 'light') {
    return (
      <section className="relative bg-white border-b border-[#E5E3DD]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 text-center">
          <h1 className="font-display font-bold text-3xl sm:text-5xl lg:text-[3.5rem] tracking-tight text-[#141318] leading-tight">
            {title}
          </h1>
          <div className="mx-auto mt-4 sm:mt-5 h-[3px] w-16 bg-[#B5945B]" aria-hidden="true" />
          {subtitle && (
            <p className="mt-4 sm:mt-5 text-sm sm:text-lg text-[#5E5B66] max-w-2xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}
          {metaLine && (
            <p className="mt-3 text-xs font-mono text-[#74707D]">{metaLine}</p>
          )}
          {children && <div className="mt-6 sm:mt-8">{children}</div>}
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-[#1D0444] text-white border-b border-black/20">
      {backgroundImage && (
        <img
          src={backgroundImage}
          alt=""
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/75"
        aria-hidden="true"
      />
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-24 text-center">
        <h1 className="font-display font-bold text-3xl sm:text-5xl lg:text-[3.75rem] tracking-tight text-white leading-[1.1]">
          {title}
        </h1>
        <div className="mx-auto mt-4 sm:mt-5 h-[3px] w-16 bg-[#C8A86B]" aria-hidden="true" />
        {subtitle && (
          <p className="mt-4 sm:mt-5 font-display text-base sm:text-xl text-white/90 max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
        {metaLine && (
          <p className="mt-2.5 sm:mt-3 text-[11px] sm:text-sm text-white/80 font-mono leading-relaxed">
            {metaLine}
          </p>
        )}
        {children && <div className="mt-6 sm:mt-8">{children}</div>}
      </div>
    </section>
  );
}
