'use client';

import { useEffect, useRef, useState } from 'react';
import { FormRenderer, type FormRecaptcha } from '@/components/form/FormRenderer';
import { cn } from '@/lib/cn';
import { fillTokens, type FormDefinition } from '@/lib/form-fields';

export type ObjectContactDialogProps = {
  /** Text on the button that opens the dialog. */
  label: string;
  form: FormDefinition;
  title?: string;
  lead?: string;
  recaptcha?: FormRecaptcha;
  /** What the form's hidden `{{token}}` fields — and the lead — are filled from. */
  context: Record<string, string>;
  className?: string;
};

function IconClose() {
  return (
    <svg width='16' height='16' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
      <path d='M5 5l14 14M19 5 5 19' stroke='currentColor' strokeWidth='1.8' />
    </svg>
  );
}

/**
 * The price card's call to action, and the modal it opens.
 *
 * A native `<dialog>`, so Escape, the top layer and the focus trap come from
 * the browser. The form inside is a plain `form` document, which is why the
 * object's address is passed as context rather than baked in: an editor adds a
 * hidden field with `{{adres}}` and it lands in the mail.
 */
export function ObjectContactDialog({
  label,
  form,
  title,
  lead,
  recaptcha,
  context,
  className,
}: ObjectContactDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  // The page behind a modal must not scroll along with it.
  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [open]);

  function show() {
    setOpen(true);
    dialogRef.current?.showModal();
  }

  function hide() {
    dialogRef.current?.close();
  }

  return (
    <>
      <button
        type='button'
        onClick={show}
        className={cn(
          'inline-flex items-center justify-center gap-2.5 rounded-pill border border-transparent cursor-pointer',
          'bg-sage px-[30px] py-4 text-btn font-semibold text-moss',
          'transition-[background,transform,translate,scale,rotate] duration-300 ease-brand hover:-translate-y-0.5 hover:bg-sage-hover',
          'focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-burgundy',
          className,
        )}
      >
        {label}
      </button>

      <dialog
        ref={dialogRef}
        onClose={() => setOpen(false)}
        // Clicks land on the dialog itself only when they hit the backdrop —
        // the panel inside catches its own.
        onClick={(event) => {
          if (event.target === dialogRef.current) hide();
        }}
        className={cn(
          'm-auto w-[min(560px,calc(100vw-32px))] rounded bg-cream p-0 text-ink',
          'shadow-[0_30px_80px_rgba(0,0,0,0.28)]',
          'backdrop:bg-ink/55 backdrop:backdrop-blur-[2px]',
          'max-h-[calc(100dvh-48px)] overflow-y-auto overscroll-contain',
        )}
      >
        <div className='relative px-9 py-10 max-sm:px-6 max-sm:py-8'>
          <button
            type='button'
            onClick={hide}
            aria-label='Sluiten'
            className={cn(
              'absolute top-5 right-5 grid size-9 place-items-center rounded-full',
              'text-ink-45 transition-colors duration-250 ease-brand hover:bg-white hover:text-ink',
              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burgundy',
            )}
          >
            <IconClose />
          </button>

          {/* Mounted only while open, so a closed dialog keeps no half-filled
              form — and reopening starts at step one again. */}
          {open ? (
            <FormRenderer
              form={form}
              variant='compact'
              recaptcha={recaptcha}
              context={context}
              title={title}
              lead={lead ? fillTokens(lead, context) : undefined}
            />
          ) : null}
        </div>
      </dialog>
    </>
  );
}
