import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <span className="inline-flex items-center gap-2"><Logo size="lg" /><h1 className="font-extrabold text-4xl text-[linear-gradient(180deg,#fff,#adadad)]">Apppify</h1></span>

        <article className="prose lg:prose-xl dark:prose-invert">
          <h3>Exciting Updates in Progress!</h3>

          <p>We`re currently hard at work refining our product to deliver an even better experience. Our landing page will be live soon, and we can`t wait to share it with you!</p>

          <p>In the meantime, feel free to reach out via <Link href="mailto:info@apppify.com" target="_blank" rel="noopener noreferrer">email</Link> if you have any questions. If you`re interested in following our progress, you can also join us on GitHub. Thank you for your patience and support!</p>
        </article>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Button asChild>
            <Link href="https://github.com/apppify"
              target="_blank"
              rel="noopener noreferrer">
              <Image src={'/icons/github.svg'} className="w-5 h-5" width={20} height={20} alt="github" />
              Support us on Github
            </Link>
          </Button>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <ModeToggle />
      </footer>
    </div>
  );
}
