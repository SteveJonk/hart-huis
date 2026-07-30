import { IconArrow } from "./IconArrow";

type ArrowLinkProps = {
  href: string;
  children: React.ReactNode;
  iconSize?: number;
};

export function ArrowLink({ href, children, iconSize = 13 }: ArrowLinkProps) {
  return (
    <a href={href} className="arrowlink">
      {children}{" "}
      <span className="circ">
        <IconArrow size={iconSize} />
      </span>
    </a>
  );
}
