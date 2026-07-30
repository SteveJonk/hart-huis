import { LogoMark } from "@/components/ui/LogoMark";
import {
  FOOTER_CERTS,
  FOOTER_DIENSTEN,
  FOOTER_QUICK,
  SITE,
} from "@/lib/site";

export function SiteFooter() {
  return (
    <footer>
      <div className="wrap">
        <div className="fgrid">
          <div>
            <LogoMark />
            <p>
              Jouw NVM-makelaar voor verkoop, aankoop en taxaties in Haarlem en
              omstreken.
            </p>
          </div>
          <div>
            <h5>Diensten</h5>
            <ul className="flist">
              {FOOTER_DIENSTEN.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5>Snel naar</h5>
            <ul className="flist">
              {FOOTER_QUICK.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5>Contact</h5>
            <ul className="flist">
              <li>
                {SITE.address[0]}
                <br />
                {SITE.address[1]}
              </li>
              <li>
                <a href={SITE.phoneHref}>{SITE.phone}</a>
              </li>
              <li>
                <a href={SITE.emailHref}>{SITE.email}</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="fbot">
          <span>
            © 2026 Hart &amp; Huis Makelaardij — Algemene voorwaarden · Privacy
          </span>
          <div className="fcerts">
            {FOOTER_CERTS.map((cert) => (
              <span key={cert}>{cert}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
