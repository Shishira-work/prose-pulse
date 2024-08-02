"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  CopyIcon,
  MonitorCog,
  MoonStarIcon,
  RabbitIcon,
  RefreshCwIcon,
  SunIcon,
  WandSparkles,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { FormComponent } from "@/components/FormComponent";
import { set } from "react-hook-form";
export default function Home() {
  const { setTheme } = useTheme();
  const [darkMode, setDarkMode] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [show, setShow] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    setTheme(darkMode ? "light" : "dark");
  };
  const [draft, setDraft] = useState("");
  const [result, setResult] = useState("");
  const features = [
    {
      description: "Breathe Life into Your Stories!",
      icon: MonitorCog,
    },
    {
      description:
        " Start writing your story, 30 seconds inactivity and your characters will be gone!",
      icon: WandSparkles,
    },
    {
      description: "Taking you snooze, you lose to a whole new level :p",
      icon: RabbitIcon,
    },
  ];
  const copyToClipboard = (text: string) => {
    if ((result || draft) && !refresh) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          alert("Copied to clipboard!");
        })

        .catch((err) => {
          console.error("Failed to copy text: ", err);
        });
    } else {
      alert("Nothing to copy!");
      setRefresh(false);
    }
  };
  return (
    <main className="min-h-screen bg-gradient-to-tr from-purple-700 to-white p-7  dark:bg-gradient-to-bl dark:from-purple-700 dark:to-neutral-900">
      <div className="flex min-h-screen rounded-lg bg-white flex-col items-center relative p-5 sm:p-20 dark:bg-neutral-900 ">
        <div>
          <h1 className="text-4xl font-semibold text-center p-1">
          Welcome to <span className="text-purple-700"> Prose Pulse! </span>
          </h1>
          <div className="mx-auto mt-16 mb-8 max-w-7xl px-6 sm:mt-20 md:mt-10 lg:px-8">
            <dl className="mx-auto grid  grid-cols-1 gap-x-6 gap-y-10 text-base leading-7 text-gray-600 sm:grid-cols-2 lg:mx-0 lg:max-w-5xl lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16 dark:text-gray-200">
              {features.map((feature) => (
                <div key={feature.description} className="relative pl-9">
                  <feature.icon
                    aria-hidden="true"
                    className="absolute left-1 top-1 h-5 w-5 text-purple-700 "
                  />
                  <dd>{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
        <FormComponent
          setResult={setResult}
          setDraft={setDraft}
          setShow={setShow}
          setShowResult={setShowResult}
        />

        <div className=" mt-4 w-4/5 mx-auto grid grid-cols-2 gap-28 justify-between ">
          {show && showResult ? (
            <div className="border-2 border-purple-400  rounded-lg p-5 h-max bg-purple-50 dark:bg-neutral-800">
              <div className="pb-4 px-4 flex justify-end space-x-4">
                <RefreshCwIcon
                  className="h-9 w-9 bg-indigo-200 p-2 rounded-full dark:bg-neutral-600"
                  onClick={() => {
                    setRefresh(true);
                    setResult("");
                  }}
                />
                <CopyIcon
                  className="h-9 w-9 bg-indigo-200 p-2 rounded-full dark:bg-neutral-600"
                  onClick={() => copyToClipboard(result)}
                />
              </div>
              Your Submitted text:{" "}
              <pre className="whitespace-pre-wrap pt-1">{result}</pre>
            </div>
          ) : (
            <></>
          )}
          {show ? (
            <div className="border-2 border-purple-400 rounded-lg p-5 h-max bg-purple-50 dark:bg-neutral-800">
              <div className="pb-4 px-4 flex justify-end space-x-4">
                <RefreshCwIcon
                  onClick={() => {
                    setRefresh(true);
                    setDraft("");
                  }}
                  className="h-9 w-9 bg-indigo-200 p-2 rounded-full dark:bg-neutral-600"
                />
                <CopyIcon
                  className="h-9 w-9 bg-indigo-200 p-2 rounded-full dark:bg-neutral-600"
                  onClick={() => copyToClipboard(draft)}
                />
              </div>
              Here&apos;s a draft (if you forgot submitting it):{" "}
              <pre className="whitespace-pre-wrap pt-1">{draft}</pre>
            </div>
          ) : (
            <></>
          )}
        </div>
        <Button
          onClick={toggleDarkMode}
          className="absolute w-14 h-14 hidden sm:flex lg:top-12 lg:right-16 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 sm:top-6 sm:right-6"
        >
          {darkMode ? (
            <SunIcon className="w-6 h-6" />
          ) : (
            <MoonStarIcon className="w-6 h-6" />
          )}
        </Button>
      </div>
    </main>
  );
}
