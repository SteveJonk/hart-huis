import { cn } from '@/lib/cn';

export type KenmerkGroep = {
  titel?: string | null;
  rijen?: Array<{
    label?: string | null;
    waarde?: string[] | null;
  } | null> | null;
};

type ObjectFeaturesProps = {
  groepen?: KenmerkGroep[] | null;
};

/** The kenmerken table: one white card per group, label/value rows inside. */
export function ObjectFeatures({ groepen }: ObjectFeaturesProps) {
  const cards = (groepen ?? []).filter((groep) => groep?.titel && groep.rijen?.length);

  if (cards.length === 0) return null;

  return (
    <div>
      <h2 className='mb-6 text-[1.7rem] max-sm:text-[1.42rem]'>Kenmerken</h2>

      <div
        className={cn(
          'grid grid-cols-2 gap-[22px]',
          'max-lg:grid-cols-1 max-md:grid-cols-2 max-sm:grid-cols-1 max-sm:gap-3.5',
        )}
      >
        {cards.map((groep) => (
          <div
            key={groep.titel}
            className='rounded bg-white px-7 pt-[26px] pb-[22px] max-sm:px-[22px] max-sm:pt-[22px] max-sm:pb-[18px]'
          >
            <h3 className='mb-4 font-sans text-[0.72rem] font-semibold tracking-[0.18em] text-burgundy uppercase'>
              {groep.titel}
            </h3>
            <dl>
              {(groep.rijen ?? [])
                .filter((rij) => rij?.label && rij.waarde?.length)
                .map((rij) => (
                  <div
                    key={rij!.label}
                    className={cn(
                      'flex justify-between gap-[18px] border-t border-cream py-[11px] text-[0.93rem]',
                      'first:border-t-0 first:pt-0',
                      'max-sm:text-[0.88rem] max-xs:flex-col max-xs:gap-0.5',
                    )}
                  >
                    <dt className='shrink-0 text-ink-45'>{rij!.label}</dt>
                    <dd className='text-right font-medium max-xs:text-left'>
                      {rij!.waarde!.length === 1 ? (
                        rij!.waarde![0]
                      ) : (
                        <ul className='list-none'>
                          {rij!.waarde!.map((waarde) => (
                            <li key={waarde} className='leading-[1.55]'>
                              {waarde}
                            </li>
                          ))}
                        </ul>
                      )}
                    </dd>
                  </div>
                ))}
            </dl>
          </div>
        ))}
      </div>
    </div>
  );
}
