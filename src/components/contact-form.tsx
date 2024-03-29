import { useForm } from "@formspree/react";
import { FormEvent, ReactNode } from "react";
import { m } from "framer-motion";
import { Button } from "./ui/button";
import useTranslation from "next-translate/useTranslation";
import { SendHorizonal } from "lucide-react";

type Props = {
  title?: ReactNode;
  children?: ReactNode;
  className?: string;
  /** formspree code */
  formspreeCode?: string;
  /** When `stopGrid` prop is set to `true`, this will disable the grid and display `title` and `children` on separate rows instead of in the same row. */
  stopGrid?: boolean;
};
const ContactForm = ({
  children,
  className,
  formspreeCode = "xpzeypyr",
  stopGrid = false,
}: Props) => {
  const [state, submit] = useForm(formspreeCode);
  const { t } = useTranslation("common");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    submit(event);
  };

  return (
    <>
      <style jsx>
        {`
          label {
            display: block;
          }

          input,
          textarea {
            width: 100%;
            background: hsl(var(--primary));
            padding: 8px;
            margin-top: 4px;
            border-radius: 4px;
            border: 1px solid hsl(var(--primary-foreground));
          }
        `}
      </style>
      {/* <Script src="https://www.google.com/recaptcha/api.js?render=6LcaqG0lAAAAAGYzYt7bs9MJ1IvJmKkM7zvZHp9q" /> */}
      <div className="relative overflow-hidden">
        <div
          className={[
            className,
            "bg-gray-500/10 p-4 sm:p-6 md:p-8 rounded-2xl py-sectionLg relative z-10",
          ].join(" ")}
        >
          <div className="">
            <div
              className={[
                stopGrid ? "" : "grid lg:grid-cols-2 gap-5 lg:gap-24",
              ].join(" ")}
            >
              <div>
                <h3 className="mb-10 text-3xl">{t("Contact us")}</h3>
                {children}
              </div>
              {state.succeeded ? (
                <div className="flex justify-center items-center">
                  Thank you for submit!
                </div>
              ) : (
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                  <div>
                    <label className="font-bold md:text-lg">{t("Name")}</label>
                    <input
                      required
                      title={t("Name")}
                      name="Name"
                      placeholder={t("Name")}
                    />
                  </div>
                  <div>
                    <label className="font-bold md:text-lg">{t("Email")}</label>
                    <input
                      title={t("Email")}
                      name="Email"
                      type="email"
                      required
                      placeholder={t("Email")}
                    />
                  </div>
                  <div className="md:col-span-2 flex flex-col">
                    <label className="font-bold md:text-lg">
                      {t("Message")}
                    </label>
                    <textarea
                      title={t("Message")}
                      name="Message"
                      required
                      placeholder={t("Message")}
                    />
                  </div>
                  <div className="hidden md:block"></div>
                  <Button
                    type="submit"
                    variant={"secondary"}
                    className="w-full flex gap-2"
                    size="lg"
                  >
                    {t("Submit")}

                    <SendHorizonal />
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactForm;
