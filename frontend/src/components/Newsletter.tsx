import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { useTranslation } from "react-i18next";

import { contactNewsletterSet } from "../api/contact";
import { ToastContext } from "../providers/ToastProvider";
import FormJup from "../util/form-jup";
import { GinParseErrors } from "../util/gin-errors";

interface FormValues {
  name: string;
  email: string;
}

export const Newsletter = () => {
  const { t } = useTranslation();
  const { addToastError } = useContext(ToastContext);

  const [submitted, setSubmitted] = useState(false);
  const [isError, setIsError] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const values = FormJup<FormValues>(e);
    (async () => {
      try {
        await contactNewsletterSet(values.name, values.email, true);
      } catch (err: any) {
        console.error("Unable to set newsletter", err, values.email);
        addToastError(GinParseErrors(t, err), err?.status);

        setIsError(true);
        setTimeout(() => setIsError(false), 3000);

        return;
      }

      setSubmitted(true);
    })();
  }

  return (
    <form
      onSubmit={onSubmit}
      className="bg-teal-light lg:w-1/2 p-6 sm:p-10 lg:py-14 lg:px-16 lg:min-h-[456px]"
    >
      {submitted ? (
        <div className="max-w-[600px] mx-auto lg:mx-0">
          <p className="font-serif text-secondary font-bold text-5xl mb-4 leading-snug">
            {t("thankYouForSigningUp")}
          </p>
          <p>{t("youAreNowSubscribedToOurMonthlyNewsletter")}</p>
        </div>
      ) : isError ? (
        <div className="max-w-[600px] mx-auto lg:mx-0">
          <p className="font-serif text-secondary font-bold text-5xl mb-4 leading-snug">
            {t("somethingIsWrong")}
          </p>
          <p>{t("pleaseTryAgainInSeconds")}</p>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row lg:flex-col max-w-screen-md mx-auto">
          <div className="w-full sm:w-1/2 md:w-2/3 lg:w-full ltr:sm:pr-8 rtl:sm:pl-8">
            <h2 className="font-serif text-secondary font-bold text-5xl mb-4 leading-snug">
              {t("keepUpWithOurLatestNews")}
            </h2>
            <p className="mb-8 sm:mb-0 lg:mb-8">
              {t("subscribeToRecieveOurLatestNews")}
            </p>
          </div>

          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-full flex flex-col sm:pl-4 md:pl-0 justify-center">
            <div className="flex flex-col lg:flex-row lg:max-w-screen-xs">
              <label
                className="form-control mb-5 ltr:lg:mr-5 rtl:lg:ml-5"
                aria-label="name"
              >
                <input
                  type="text"
                  name="name"
                  className="input input-bordered w-full input-secondary"
                  placeholder={t("name")}
                  min={3}
                  required
                />
              </label>
              <label className="form-control mb-5" aria-label="email">
                <input
                  type="email"
                  name="email"
                  placeholder={t("emailAddress")}
                  className="input input-bordered w-full input-secondary"
                  required
                />
              </label>
            </div>
            <div className="inline-block">
              <button
                className="btn btn-primary w-full sm:w-auto"
                type="submit"
              >
                {t("submit")}
                <span className="feather feather-arrow-right ml-3 rtl:hidden"></span>
                <span className="feather feather-arrow-left mr-3 ltr:hidden"></span>
              </button>
            </div>
          </div>
        </div>
      )}
    </form>
  );
};
