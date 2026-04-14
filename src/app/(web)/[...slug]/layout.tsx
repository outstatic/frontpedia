import { Logo } from "@/components/logo";
import { TransitionLink } from "@/components/transition-link";
import { Background } from "@/components/ui/background";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Background hideMobile />
      <header className="relative w-full flex items-center justify-center h-20">
        <TransitionLink href="/">
          <Logo link />
        </TransitionLink>
      </header>
      {children}
    </>
  );
}
