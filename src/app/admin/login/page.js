import Chapter from "@/components/common/Chapter";
import Eyebrow from "@/components/common/Eyebrow";
import SurfaceCard from "@/components/common/SurfaceCard";
import LoginForm from "./LoginForm";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin sign in",
  robots: { index: false, follow: false },
};

export default async function LoginPage({ searchParams }) {
  const { next } = await searchParams;

  return (
    <Chapter tone="paper" grid className="min-h-[70vh] flex items-center py-20">
      <div className="w-full max-w-md mx-auto px-4">
        <SurfaceCard className="p-8 gap-0">
          <Eyebrow className="mb-4 max-w-xs">Title block · Admin</Eyebrow>
          <h1 className="font-display text-3xl font-bold text-tone-heading mb-6 tracking-tight">
            Sign in
          </h1>
          <LoginForm next={typeof next === "string" ? next : undefined} />
        </SurfaceCard>
      </div>
    </Chapter>
  );
}
