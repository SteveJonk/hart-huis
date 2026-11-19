import Image from '@/components/ui/Image';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { Wrap } from '@/components/ui/Wrap';
import {
  OVER_ONS_TEAM,
  OVER_ONS_TEAM_INTRO,
  type TeamMember,
} from '@/lib/over-ons-content';

export type TeamProps = {
  eyebrow?: string;
  title?: string;
  lead?: string;
  members?: TeamMember[];
};

const DEFAULTS: Required<TeamProps> = {
  eyebrow: OVER_ONS_TEAM_INTRO.eyebrow,
  title: OVER_ONS_TEAM_INTRO.title,
  lead: OVER_ONS_TEAM_INTRO.lead,
  members: OVER_ONS_TEAM,
};

/** Teamleden: foto, naam, rol en een kort tekstje. Groeit mee met het aantal. */
export function Team({
  eyebrow = DEFAULTS.eyebrow,
  title = DEFAULTS.title,
  lead = DEFAULTS.lead,
  members = DEFAULTS.members,
}: TeamProps = {}) {
  return (
    <section className='bg-sand py-[122px] max-sm:py-[82px]'>
      <Wrap>
        <Reveal className='mb-14 max-w-[620px] max-sm:mb-[34px]'>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className='mb-4 text-[clamp(2rem,3.6vw,3rem)]'>{title}</h2>
          {lead ? <p className='leading-[1.72] text-ink-70'>{lead}</p> : null}
        </Reveal>

        <div className='grid grid-cols-3 gap-[34px] max-md:grid-cols-2 max-sm:grid-cols-1 max-sm:gap-11'>
          {members.map((member, index) => (
            <Reveal
              key={member.name}
              delay={(index % 3 === 0 ? undefined : index % 3) as 1 | 2 | undefined}
            >
              <div className='relative mb-6 aspect-[4/5] overflow-hidden rounded-arch max-sm:aspect-[4/4.4]'>
                <Image
                  src={member.image.src}
                  alt={member.image.alt}
                  fill
                  sizes='(max-width: 680px) 100vw, (max-width: 960px) 50vw, 33vw'
                  className='object-cover'
                />
              </div>
              <h3 className='mb-1 text-[1.42rem]'>{member.name}</h3>
              <p className='mb-3 text-[0.72rem] font-semibold tracking-[0.16em] text-burgundy uppercase'>
                {member.role}
              </p>
              <p className='text-[0.95rem] leading-[1.7] text-ink-70'>{member.body}</p>
            </Reveal>
          ))}
        </div>
      </Wrap>
    </section>
  );
}
