type LogoMarkProps = {
  className?: string;
};

export function LogoMark({ className = "" }: LogoMarkProps) {
  return (
    <span className={["mark", className].filter(Boolean).join(" ")}>
      <span className="mark__in">
        <span className="mark__amp">&amp;</span>
        <b>Hart</b>
        <b>Huis</b>
        <i>MAKELAARDIJ</i>
      </span>
    </span>
  );
}
