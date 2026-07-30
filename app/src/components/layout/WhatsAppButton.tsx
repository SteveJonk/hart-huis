import { SITE } from "@/lib/site";
import { cn } from "@/lib/cn";

export function WhatsAppButton() {
  return (
    <a
      href={SITE.whatsappHref}
      aria-label="Stuur ons een WhatsApp-bericht"
      className={cn(
        "group fixed z-wa flex items-center overflow-hidden rounded-pill bg-white shadow-wa",
        "right-[26px] bottom-[26px] p-3 transition duration-[350ms] ease-brand",
        "max-md:right-4 max-md:bottom-4 max-md:p-[11px]",
        "max-xs:right-3 max-xs:bottom-3 max-xs:p-[9px]",
      )}
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="size-[30px] fill-sage-deep max-xs:size-[25px]"
      >
        <path d="M12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.2-1.4c1.4.8 3.1 1.2 4.8 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2zm5.9 14.2c-.2.6-1.4 1.2-1.9 1.3-.5.1-1.1.1-1.8-.1-.4-.1-1-.3-1.7-.6-3-1.3-4.9-4.3-5.1-4.5-.1-.2-1.2-1.6-1.2-3s.7-2.1 1-2.4c.3-.3.6-.4.8-.4h.6c.2 0 .4 0 .6.5.2.5.7 1.8.8 1.9.1.2.1.3 0 .5-.1.2-.1.3-.3.5l-.4.5c-.1.2-.3.3-.1.6.2.3.9 1.4 1.9 2.3 1.3 1.1 2.3 1.5 2.7 1.7.3.1.4.1.6-.1.2-.2.7-.8.9-1.1.2-.3.4-.2.6-.1.2.1 1.5.7 1.8.8.3.1.4.2.5.3.1.1.1.7-.1 1.3z" />
      </svg>
      <span
        className={cn(
          "max-w-0 overflow-hidden whitespace-nowrap text-arrow font-semibold opacity-0",
          "transition-[max-width,opacity,margin] duration-[350ms] ease-brand",
          "group-hover:mr-2 group-hover:ml-2.5 group-hover:max-w-[180px] group-hover:opacity-100",
          "max-md:hidden",
        )}
      >
        App ons
      </span>
    </a>
  );
}
