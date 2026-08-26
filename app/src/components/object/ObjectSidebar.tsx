import type { FormRecaptcha } from '@/components/form/FormRenderer';
import { ObjectContactDialog } from '@/components/object/ObjectContactDialog';
import { ShareButton } from '@/components/object/ShareButton';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/cn';
import type { FormDefinition } from '@/lib/form-fields';
import { euro, shortDate } from '@/lib/format';
import { statusOf, type ObjectMakelaar } from '@/lib/object-content';
import { SITE } from '@/lib/site';

type ObjectSidebarProps = {
  adres: string;
  status?: string | null;
  prijs?: number | null;
  prijsConditie?: string | null;
  aanvaarding?: string | null;
  aangebodenSinds?: string | null;
  woonoppervlak?: number | null;
  perceel?: number | null;
  brochureUrl?: string | null;
  /** De kaart onder de prijskaart — uit het `makelaar`-veld op de woning. */
  makelaar: ObjectMakelaar;
  /** De knop bovenaan: label, en het formulier dat erachter opent. */
  cta: {
    label: string;
    fallbackHref: string;
    form?: FormDefinition;
    dialogTitle?: string;
    dialogLead?: string;
    recaptcha?: FormRecaptcha;
    /** Wat de verborgen velden in het formulier invullen. */
    context: Record<string, string>;
  };
};

const pillTone = {
  white: 'bg-white text-ink',
  sand: 'bg-sand text-burgundy',
  burgundy: 'bg-burgundy text-white',
} as const;

const card = 'rounded bg-white px-[26px] py-7 max-sm:px-[22px] max-sm:py-6';

const shareLink = cn(
  'flex flex-1 items-center justify-center gap-[7px] rounded-pill border border-ink/18',
  'px-[11px] py-[13px] text-[0.8rem] font-semibold transition duration-300 ease-brand',
  'hover:border-ink hover:bg-ink hover:text-cream',
);

function IconDownload() {
  return (
    <svg width='14' height='14' viewBox='0 0 24 24' fill='none' aria-hidden>
      <path
        d='M12 3v13M7.5 11.5 12 16l4.5-4.5M4 20h16'
        stroke='currentColor'
        strokeWidth='1.7'
        strokeLinejoin='round'
      />
    </svg>
  );
}

function IconShare() {
  return (
    <svg width='14' height='14' viewBox='0 0 24 24' fill='none' aria-hidden>
      <circle cx='18' cy='5.5' r='2.6' stroke='currentColor' strokeWidth='1.6' />
      <circle cx='6' cy='12' r='2.6' stroke='currentColor' strokeWidth='1.6' />
      <circle cx='18' cy='18.5' r='2.6' stroke='currentColor' strokeWidth='1.6' />
      <path d='m8.4 10.8 7.2-4M8.4 13.2l7.2 4' stroke='currentColor' strokeWidth='1.6' />
    </svg>
  );
}

function Feit({ label, value }: { label: string; value: string }) {
  return (
    <div className='flex justify-between gap-3.5 border-t border-cream py-2.5 text-[0.86rem]'>
      <span className='text-ink-45'>{label}</span>
      <span className='text-right font-medium'>{value}</span>
    </div>
  );
}

/** Sticky price card + makelaar card; moves above the content on small screens. */
export function ObjectSidebar({
  adres,
  status,
  prijs,
  prijsConditie,
  aanvaarding,
  aangebodenSinds,
  woonoppervlak,
  perceel,
  brochureUrl,
  makelaar,
  cta,
}: ObjectSidebarProps) {
  const { label, tone } = statusOf(status);
  const conditie = [
    prijsConditie === 'v.o.n.' ? 'vrij op naam' : 'kosten koper',
    aanvaarding ? `${aanvaarding.toLowerCase()} te aanvaarden` : null,
  ]
    .filter(Boolean)
    .join(' · ');

  const feiten = [
    aangebodenSinds
      ? { label: 'Aangeboden sinds', value: shortDate(aangebodenSinds)! }
      : null,
    woonoppervlak ? { label: 'Woonoppervlak', value: `${woonoppervlak} m²` } : null,
    perceel ? { label: 'Perceel', value: `${perceel} m²` } : null,
  ].filter((feit): feit is { label: string; value: string } => Boolean(feit));

  return (
    <aside className='sticky top-[100px] grid gap-4 max-md:static max-md:order-first'>
      <div className={card}>
        <div className='mb-[18px] flex items-center gap-[9px]'>
          <span
            className={cn(
              'rounded-pill px-[13px] py-[7px] text-[0.65rem] font-semibold tracking-[0.13em] uppercase',
              tone === 'white' ? 'bg-sage text-moss' : pillTone[tone],
            )}
          >
            {label}
          </span>
        </div>

        {prijs ? (
          <div className='font-display text-[1.85rem] leading-[1.1] font-medium'>
            {euro(prijs)}
          </div>
        ) : null}
        <span className='mb-[22px] block text-[0.83rem] text-ink-45'>{conditie}</span>

        {cta.form ? (
          <ObjectContactDialog
            label={cta.label}
            form={cta.form}
            title={cta.dialogTitle}
            lead={cta.dialogLead}
            recaptcha={cta.recaptcha}
            context={cta.context}
            className='mb-2.5 w-full'
          />
        ) : (
          <Button href={cta.fallbackHref} className='mb-2.5 w-full justify-center'>
            {cta.label}
          </Button>
        )}
        <Button href={SITE.phoneHref} variant='ink' className='w-full justify-center'>
          {SITE.phone}
        </Button>

        {feiten.length > 0 ? (
          <div className='mt-5'>
            {feiten.map((feit) => (
              <Feit key={feit.label} label={feit.label} value={feit.value} />
            ))}
          </div>
        ) : null}

        <div className='mt-1 flex gap-2'>
          {brochureUrl ? (
            <a
              href={brochureUrl}
              target='_blank'
              rel='noopener noreferrer'
              className={shareLink}
            >
              <IconDownload />
              Brochure
            </a>
          ) : null}
          <ShareButton title={adres} className={cn(shareLink, 'cursor-pointer')}>
            <IconShare />
            Delen
          </ShareButton>
        </div>
      </div>

      <div className={card}>
        <div className='mb-[18px] flex items-center gap-3.5'>
          <span className='grid h-[52px] w-[52px] shrink-0 place-items-center rounded-full bg-sand font-display text-[1rem] font-medium'>
            {makelaar.initials}
          </span>
          <span>
            <b className='block text-[0.98rem] font-semibold'>{makelaar.name}</b>
            <span className='text-[0.81rem] leading-[1.4] text-ink-45'>
              {makelaar.role}
            </span>
          </span>
        </div>
        <p className='mb-[18px] text-[0.89rem] leading-[1.65] text-ink-70'>
          {makelaar.body}
        </p>
        <Button
          href={makelaar.phoneHref}
          variant='ink'
          size='sm'
          className='w-full justify-center'
        >
          {makelaar.phone}
        </Button>
      </div>
    </aside>
  );
}
