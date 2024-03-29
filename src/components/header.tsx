import Image from "next/image";
import Link from "next/link";
import React from "react";
import Arrow from "./ui/arrow";
import useTranslation from "next-translate/useTranslation";
import { useWindowSize } from "@uidotdev/usehooks";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";

export default function Header() {
  const { t, lang } = useTranslation("common");
  const { width } = useWindowSize();

  const isBigScreen = width && width >= 768;
  const isSmallScreen = !isBigScreen;

  const links = (
    <>
      <Link className="hover:text-secondary hover:cursor-pointer  p-2" href="/">
        {t("navbar.Home")}
      </Link>
      <Link
        className="hover:text-secondary hover:cursor-pointer  p-2"
        href="/#about"
      >
        {t("navbar.About us")}
      </Link>
      <Link
        className="hover:text-secondary hover:cursor-pointer p-2"
        href="/#systems"
      >
        {t("navbar.Our System")}
      </Link>
      <Link
        className="hover:text-secondary hover:cursor-pointer  p-2"
        href="/#dist"
      >
        {t("DISTRIBUTION NETWORK")}
      </Link>

      <Link
        className="hover:text-secondary hover:cursor-pointer  p-2"
        href="/#categories"
      >
        {t("navbar.Products")}
      </Link>
    </>
  );

  return (
    <header className="border-b-8 border-b-slate-200">
      <div className="flex container mx-auto justify-between gap-6 items-center">
        <Image
          src="/logo.svg"
          width={200}
          height={80}
          alt="logo"
          className="lg:w-72 py-4 lg:py-10"
        />
        {isBigScreen && (
          <div className="flex items-center gap-3">
            <a
              href="https://b2bordering.abawazir.net/login"
              className="text-sm lg:text-lg hover:bg-secondary px-3 rounded-full bg-primary text-primary-foreground"
            >
              {t("signin")}
            </a>
            <a
              href="#"
              className="text-sm lg:text-lg hover:bg-primary px-3 rounded-full bg-secondary text-primary-foreground"
            >
              {t("signup")}
            </a>
            <Link
              href="/"
              locale={lang === "ar" ? "en" : "ar"}
              className="flex items-center gap-1"
            >
              <span className="uppercase">{lang === "ar" ? "en" : "عربي"}</span>
              <Arrow width={10} height={10} />
            </Link>
            <button>
              <svg
                viewBox="0 0 1200 1227"
                xmlns="http://www.w3.org/2000/svg"
                role="none"
              >
                <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z"></path>
              </svg>
            </button>
          </div>
        )}

        {isSmallScreen && (
          <div className="flex gap-2">
            <Link
              href="/"
              locale={lang === "ar" ? "en" : "ar"}
              className="flex items-center gap-1"
            >
              <span className="uppercase">{lang === "ar" ? "en" : "عربي"}</span>
              <Arrow width={10} height={10} />
            </Link>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MenuIcon />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="grid gap-4 py-4">{links}</div>

                <div className="grid text-center grid-cols-2 gap-4">
                  <a
                    href="#"
                    className="text-sm lg:text-lg hover:bg-secondary py-1 px-3 rounded-full bg-primary text-primary-foreground"
                  >
                    {t("signin")}
                  </a>
                  <a
                    href="#"
                    className="text-sm lg:text-lg hover:bg-primary py-1 px-3 rounded-full bg-secondary text-primary-foreground"
                  >
                    {t("signup")}
                  </a>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        )}
      </div>
      {isBigScreen && (
        <div className="border-t border-t-slate-200">
          <nav className="flex uppercase text-primary py-2 text-nowrap ltr:tracking-widest text-xs md:text-lg font-medium container mx-auto justify-center items-center gap-6">
            {links}
          </nav>
        </div>
      )}
    </header>
  );
}
