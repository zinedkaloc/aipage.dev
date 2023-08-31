"use client";

import { FormEvent, RefObject, useEffect, useState } from "react";
import { updateProject, wait } from "@/utils/helpers";
import Button from "@/components/Button";
import LoadingSpinner from "@/components/loadingSpinner";

const includedKeys = [
  "padding",
  "color",
  "width",
  "height",
  "margin",
  "fontSize",
  "display",
  "position",
  "top",
  "left",
  "right",
  "bottom",
  "border",
  "background",
  "transform",
];

interface EditPanelProps {
  id: string;
  iframe: RefObject<HTMLIFrameElement>;
}
export default function EditPanel({ id, iframe }: EditPanelProps) {
  const [selected, setSelected] = useState<HTMLElement | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const element = iframe.current;
    if (!element) return;

    let eventElements: NodeListOf<HTMLElement> | undefined;

    setTimeout(() => {
      eventElements = element.contentDocument?.querySelectorAll("body *");
      eventElements?.forEach((element) => {
        element.addEventListener("mouseover", mouseoverListener);
        element.addEventListener("click", clickHandler);
        element.addEventListener("mouseout", mouseoutListener);
      });
      console.log("added event listeners");
    }, 2000);

    return () => {
      eventElements?.forEach((element) => {
        element.removeEventListener("mouseover", mouseoverListener);
        element.removeEventListener("click", clickHandler);
        element.removeEventListener("mouseout", mouseoutListener);
      });
    };
  }, []);

  function mouseoverListener(e: Event) {
    setOutline(e.target as HTMLElement);
  }

  function clickHandler(e: Event) {
    removeOutline(e.target as HTMLElement);
    setSelected(e.target as HTMLElement);
  }

  function mouseoutListener(e: Event) {
    removeOutline(e.target as HTMLElement);
  }

  function setOutline(target: HTMLElement) {
    target.style.outline = "2px solid #79155B";
    target.style.outlineOffset = "3px";
  }

  function removeOutline(target: HTMLElement) {
    target.style.outline = "";
    target.style.outlineOffset = "";
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!selected) return;
    const formData = new FormData(e.target as HTMLFormElement);
    const values = Array.from(formData.entries()) as [string, string][];

    values
      .filter(([, value]) => !!value)
      .forEach(([key, value]) => {
        if (key === "textContent") {
          selected.innerText = value;
        } else {
          if (selected.style.getPropertyValue(key) !== value)
            selected.style.setProperty(key, value);
        }
      });

    try {
      setSaving(true);
      const html = iframe.current?.contentDocument?.documentElement
        .outerHTML as string;
      await updateProject(
        {
          result: html,
        },
        id,
      );
      setSaving(false);
    } catch {
      alert("Failed to save changes");
      setSaving(false);
    }
  }

  if (!selected) return <></>;

  return (
    <form
      onSubmit={onSubmit}
      className="grid h-full grid-rows-[1fr_60px] gap-2 overflow-y-auto"
    >
      <div className="overflow-y-auto max-h-full pt-4 px-4">
        {selected && (
          <>
            <div>
              <label>Text Content</label>
              <input
                name="textContent"
                className="border-gray-200 rounded w-full"
                type="text"
                defaultValue={selected?.innerText}
              />
            </div>
            {Object.entries(getComputedStyle(selected))
              .filter(
                ([key]) =>
                  !key.match(/\d/) &&
                  includedKeys.includes(key) &&
                  !key.startsWith("webkit"),
              )
              .map(([key, value]) => (
                <div key={key}>
                  <label>{key}</label>
                  <input
                    name={key}
                    className="border-gray-200 rounded w-full"
                    type="text"
                    defaultValue={value}
                  />
                </div>
              ))}
          </>
        )}
      </div>
      <div className="bg-white flex items-center px-4">
        <Button className="w-full" type="submit">
          {saving ? <LoadingSpinner /> : "Save changes"}
        </Button>
      </div>
    </form>
  );
}
