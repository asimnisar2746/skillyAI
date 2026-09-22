import Link from "next/link";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <div className="py-4 sm:py-6 bg-[#EFF4FF] border-t-2">
      <div className="max-w-300 w-full mx-auto flex flex-col sm:flex-row space-y-2 sm:space-y-0 justify-between px-4">
        <div>
          <Link href="/">
            <h4 className="text-primary text-xl font-bold">Skilly</h4>
          </Link>
        </div>
        <div>
          <nav className="flex gap-3 sm:gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="underline underline-offset-4 text-chart-3 text-xs sm:text-sm font-medium hover:text-primary transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div>
          <p className="text-primary text-xs sm:text-sm">
            © 2024 Skilly AI. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
