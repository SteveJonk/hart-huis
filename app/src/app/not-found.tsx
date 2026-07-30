import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Wrap } from '@/components/ui/Wrap';

export default function NotFound() {
  return (
    <main className='flex min-h-[70vh] items-center py-32 max-sm:py-24'>
      <Wrap className='max-w-160'>
        <Eyebrow>404</Eyebrow>
        <h1 className='mb-5 text-[clamp(2.2rem,4vw,3.4rem)]'>
          Deze pagina bestaat niet
        </h1>
        <p className='mb-9 max-w-[36ch] leading-[1.7] text-ink-70'>
          De link is verlopen, verplaatst of heeft nooit bestaan. Ga terug naar home of
          bel ons als je iets zoekt.
        </p>
        <div className='flex flex-wrap gap-3.5'>
          <Button href='/' variant='primary'>
            Naar home
          </Button>
        </div>
      </Wrap>
    </main>
  );
}
