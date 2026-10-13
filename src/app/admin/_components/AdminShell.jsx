import Link from "next/link";
import Chapter from "@/components/common/Chapter";
import Eyebrow from "@/components/common/Eyebrow";
import { Button } from "@/components/ui/button";
import { logout } from "../login/actions";

/**
 * AdminShell — the paper-toned frame every admin page sits in: a title
 * block (eyebrow + heading + optional actions) and a thin toolbar with
 * the signed-in address and sign-out.
 */
export default function AdminShell({ eyebrow, title, actions, email, children }) {
  return (
    <Chapter tone="paper" grid className="min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-tone-line/25 pb-4 mb-8 font-mono text-[11px] uppercase tracking-widest text-tone-muted">
          <nav className="flex items-center gap-4">
            <Link href="/admin" className="hover:text-tone-heading">Admin · Projects</Link>
            <Link href="/portfolio" className="hover:text-tone-heading" target="_blank" rel="noreferrer">View site ↗</Link>
          </nav>
          <form action={logout} className="flex items-center gap-3">
            {email && <span className="normal-case tracking-normal">{email}</span>}
            <Button type="submit" variant="ghost" size="sm" className="font-mono text-[11px] uppercase tracking-widest">
              Sign out
            </Button>
          </form>
        </div>

        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            {eyebrow && <Eyebrow rules={false} className="mb-2">{eyebrow}</Eyebrow>}
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-tone-heading tracking-tight">{title}</h1>
          </div>
          {actions && <div className="flex gap-3">{actions}</div>}
        </div>

        {children}
      </div>
    </Chapter>
  );
}
