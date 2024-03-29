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
        href="/#services"
      >
        {t("navbar.Our Services")}
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
          src="/logo.png"
          width={50}
          height={80}
          alt="logo"
          className="py-4"
        />
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
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
