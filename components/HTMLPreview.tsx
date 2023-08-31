"use client";
import { FormEvent, useEffect, useRef, useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/Drawer";
import Button from "@/components/Button";
import LoadingSpinner from "@/components/loadingSpinner";
import { updateProject, wait } from "@/utils/helpers";

interface HTMLPreviewProps {
  html: string;
  id?: string;
}

export default function HTMLPreview({ html, id }: HTMLPreviewProps) {
  const iframe = useRef<HTMLIFrameElement>(null);
  const [selected, setSelected] = useState<HTMLElement | null>(null);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savedText, setSavedText] = useState<string>();

  useEffect(() => {
    const element = iframe.current;
    if (!element || !html || !id) return;

    let eventElements: NodeListOf<HTMLElement> | undefined;

    setTimeout(() => {
      eventElements = element.contentDocument?.querySelectorAll("body *");
      eventElements?.forEach((element) => {
        element.addEventListener("mouseover", mouseoverListener);
        element.addEventListener("click", clickHandler);
        element.addEventListener("mouseout", mouseoutListener);
      });
    }, 2000);

    return () => {
      eventElements?.forEach((element) => {
        element.removeEventListener("mouseover", mouseoverListener);
        element.removeEventListener("click", clickHandler);
        element.removeEventListener("mouseout", mouseoutListener);
      });
    };
  }, [html, id]);

  async function onSave(values: [string, string][]) {
    if (!selected || !id) return;

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
      await wait(1000);
      setSavedText("Saved 🎉");

      await wait(2000);
      setSavedText(undefined);
      setSaving(false);
    } catch {
      alert("Failed to save changes");
      setSaving(false);
    }
  }

  function mouseoverListener(e: Event) {
    setOutline(e.target as HTMLElement);
  }

  function clickHandler(e: Event) {
    removeOutline(e.target as HTMLElement);
    setSelected(e.target as HTMLElement);
    setOpen(true);
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

  return (
    <>
      {saving && (
        <div className="absolute right-0 p-2 pointer-events-none">
          <div className="bg-white/50 p-2 text-slate-600 backdrop-blur-sm rounded flex items-center justify-center">
            {savedText ? (
              <span className="text-sm">{savedText}</span>
            ) : (
              <LoadingSpinner />
            )}
          </div>
        </div>
      )}
      {id && (
        <Panel
          onSave={onSave}
          open={open}
          onOpenChange={setOpen}
          selected={selected}
        />
      )}
      <iframe
        ref={iframe}
        className="w-full min-h-screen cursor-pointer"
        srcDoc={html}
      />
    </>
  );
}

interface PanelProps {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  selected?: HTMLElement | null;
  onSave: (values: [string, string][]) => void;
}
function Panel(props: PanelProps) {
  const { open, onOpenChange, selected, onSave } = props;
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

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!selected) return;
    const formData = new FormData(e.target as HTMLFormElement);
    onSave?.(Array.from(formData.entries()) as [string, string][]);
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="px-0">
        <form
          onSubmit={onSubmit}
          className="grid gap-0 max-h-full grid-rows-[auto_1fr_60px] px-0 h-full"
        >
          <SheetHeader className="sticky border-b px-6 py-4 top-0 bg-white">
            <SheetTitle>Edit selected section</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col gap-2 px-6 py-4 overflow-y-auto">
            <div>
              <label>Text Content</label>
              <input
                name="textContent"
                className="border-gray-200 rounded w-full"
                type="text"
                defaultValue={selected?.innerText}
              />
            </div>
            {selected &&
              Object.entries(getComputedStyle(selected))
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
          </div>
          <SheetFooter className="px-6 py-4 border-t flex items-center">
            <SheetClose asChild>
              <Button type="submit">Save changes</Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
