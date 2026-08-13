import { cn } from '@/lib/cn';
import { euro } from '@/lib/format';

type ObjectHeaderProps = {
  adres: string;
  postcode?: string | null;
  plaats: string;
  prijs?: number | null;
  prijsConditie?: string | null;
  soortWoning?: string | null;
  bouwjaar?: number | null;
  woonoppervlak?: number | null;
  perceel?: number | null;
  inhoud?: number | null;
  kamers?: number | null;
  slaapkamers?: number | null;
  energielabel?: string | null;
};

/** Green for the efficient labels, sand for the middle, burgundy for the rest. */
function labelClass(label: string) {
  if (/^A/.test(label) || label === 'B') return 'bg-sage-deep text-white';
  if (label === 'C' || label === 'D') return 'bg-sand text-ink';
  return 'bg-burgundy text-white';
}

type Spec = { value: React.ReactNode; label: string };

function Spec({ value, label }: Spec) {
  return (
    <div className='bg-cream px-[22px] py-5 max-sm:px-[18px] max-sm:py-4'>
      <b className='mb-[3px] block font-display text-[1.5rem] font-medium max-sm:text-[1.28rem]'>
        {value}
      </b>
      <span className='text-[0.78rem] font-semibold tracking-[0.1em] text-ink-45 uppercase max-sm:text-[0.7rem]'>
        {label}
      </span>
    </div>
  );
}

export function ObjectHeader({
  adres,
  postcode,
  plaats,
  prijs,
  prijsConditie,
  soortWoning,
  bouwjaar,
  woonoppervlak,
  perceel,
  inhoud,
  kamers,
  slaapkamers,
  energielabel,
}: ObjectHeaderProps) {
  const subtitle = [
    [postcode, plaats].filter(Boolean).join(' '),
    [soortWoning, bouwjaar ? `bouwjaar ${bouwjaar}` : null].filter(Boolean).join(', '),
  ].filter(Boolean);

  const allSpecs: (Spec | null)[] = [
    woonoppervlak ? { value: `${woonoppervlak} m²`, label: 'Woonoppervlak' } : null,
    perceel ? { value: `${perceel} m²`, label: 'Perceel' } : null,
    inhoud ? { value: `${inhoud} m³`, label: 'Inhoud' } : null,
    kamers ? { value: kamers, label: 'Kamers' } : null,
    slaapkamers ? { value: slaapkamers, label: 'Slaapkamers' } : null,
    energielabel
      ? {
          value: (
            <span
              className={cn(
                'inline-flex h-[30px] min-w-[34px] items-center justify-center rounded px-[9px]',
                'font-sans text-[1rem] font-bold',
                labelClass(energielabel),
              )}
            >
              {energielabel}
            </span>
          ),
          label: 'Energielabel',
        }
      : null,
  ];

  const specs = allSpecs.filter((spec): spec is Spec => spec !== null);

  return (
    <>
      <div className='mb-[34px]'>
        <div className='mb-2 flex flex-wrap items-baseline justify-between gap-6 max-sm:gap-1.5'>
          <h1 className='text-[clamp(1.9rem,3.6vw,2.9rem)] max-sm:text-[clamp(1.6rem,6.6vw,2.2rem)]'>
            {adres}
          </h1>
          {prijs ? (
            <div className='font-display text-[clamp(1.5rem,2.4vw,2rem)] font-medium whitespace-nowrap'>
              {euro(prijs)}{' '}
              {prijsConditie ? (
                <span className='font-sans text-[0.6em] font-medium tracking-normal'>
                  {prijsConditie}
                </span>
              ) : null}
            </div>
          ) : null}
        </div>
        <p className='text-[0.95rem] text-ink-70'>{subtitle.join('  ·  ')}</p>
      </div>

      {specs.length > 0 ? (
        <div
          className={cn(
            'mb-11 grid grid-cols-3 gap-px overflow-hidden rounded bg-ink/12',
            'max-sm:mb-[34px] max-sm:grid-cols-2 max-xs:grid-cols-1',
          )}
        >
          {specs.map((spec) => (
            <Spec key={spec.label} value={spec.value} label={spec.label} />
          ))}
        </div>
      ) : null}
    </>
  );
}
