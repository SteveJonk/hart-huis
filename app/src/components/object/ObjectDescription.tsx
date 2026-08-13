'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { parseAanbiedingstekst, splitBold } from '@/lib/aanbiedingstekst';
import { cn } from '@/lib/cn';

type ObjectDescriptionProps = {
  tekst?: string | null;
};

function Inline({ text }: { text: string }) {
  return (
    <>
      {splitBold(text).map((part, index) =>
        part.bold ? (
          <strong key={index} className='font-semibold text-ink'>
            {part.text}
          </strong>
        ) : (
          <span key={index}>{part.text}</span>
        ),
      )}
    </>
  );
}

/** Omschrijving, collapsed behind a fade until "lees de volledige omschrijving". */
export function ObjectDescription({ tekst }: ObjectDescriptionProps) {
  const [open, setOpen] = useState(false);
  const blocks = parseAanbiedingstekst(tekst);

  if (blocks.length === 0) return null;

  return (
    <div className='mb-12'>
      <h2 className='mb-[18px] text-[1.7rem] max-sm:text-[1.42rem]'>Omschrijving</h2>

      <div
        id='omschrijving'
        className={cn(
          'relative overflow-hidden transition-[max-height] duration-[600ms] ease-brand',
          'after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-[110px]',
          'after:bg-[linear-gradient(180deg,rgba(236,228,225,0),#ece4e1)] after:transition-opacity after:duration-[400ms]',
          open
            ? 'max-h-[4000px] after:opacity-0'
            : 'max-h-[290px] after:opacity-100 max-sm:max-h-[230px]',
        )}
      >
        {blocks.map((block, index) =>
          block.type === 'paragraph' ? (
            <p key={index} className='mb-4 max-w-[62ch] leading-[1.8] text-ink-70'>
              <Inline text={block.text} />
            </p>
          ) : (
            <ul key={index} className='mt-2 mb-4 max-w-[62ch] list-none'>
              {block.items.map((item) => (
                <li
                  key={item}
                  className={cn(
                    'relative mb-[7px] pl-[22px] leading-[1.7] text-ink-70',
                    'before:absolute before:top-[11px] before:left-0 before:h-[7px] before:w-[7px]',
                    'before:rounded-full before:bg-sand before:content-[""]',
                  )}
                >
                  <Inline text={item} />
                </li>
              ))}
            </ul>
          ),
        )}
      </div>

      <div className='mt-[18px]'>
        <Button
          href='#omschrijving'
          variant='ink'
          size='sm'
          className='max-sm:w-full max-sm:justify-center'
          onClick={(event) => {
            event.preventDefault();
            setOpen((value) => !value);
          }}
        >
          {open ? 'Toon minder' : 'Lees de volledige omschrijving'}
        </Button>
      </div>
    </div>
  );
}
