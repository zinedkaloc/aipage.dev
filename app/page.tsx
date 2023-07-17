"use client";
import { useChat } from "ai/react";
import { SetStateAction, useEffect, useRef, useState } from "react";
import Frame from "react-frame-component";
import dynamic from "next/dynamic";
import Image from "next/image";

enum DeviceSize {
  Mobile = "w-1/2",
  Tablet = "w-3/4",
  Desktop = "w-full",
}

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat();

  const [iframeContent, setIframeContent] = useState("");
  const [deviceSize, setDeviceSize] = useState(DeviceSize.Desktop);
  const iframeRef = useRef(null);
  const [fileName, setFileName] = useState("");
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  const [editedContent, setEditedContent] = useState<string>("");
  const [editingMode, setEditingMode] = useState(false);
  const [codeViewActive, setCodeViewActive] = useState(false);

  const appendToIframe = (content: any) => {
    if (iframeRef.current) {
      const iframeDocument = (iframeRef.current as HTMLIFrameElement)
        .contentDocument;
      if (iframeDocument) {
        const newNode = iframeDocument.createElement("div");
        newNode.innerHTML = content;
        newNode.querySelectorAll<HTMLElement>("*").forEach((element) => {
          element.addEventListener("mouseover", () => {
            element.classList.add("outline-blue"); // Blue border
          });
          element.addEventListener("mouseout", () => {
            element.style.outline = "none";
          });
          element.addEventListener("click", () => {
            setSelectedElement(element);
            setEditedContent(element.innerHTML);
          });
        });
        requestAnimationFrame(() => {
          iframeDocument.body.appendChild(newNode);
        });
      }
    }
  };

  useEffect(() => {
    const stream = new EventSource("/api/chat");
    stream.onmessage = (event) => {
      appendToIframe(event.data);
    };

    return () => stream.close();
  }, []);

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && lastMessage.role !== "user") {
      setIframeContent(lastMessage.content);
    }
  }, [messages]);

  const handleSave = () => {
    const element = document.createElement("a");
    const file = new Blob([iframeContent], { type: "text/html" });
    element.href = URL.createObjectURL(file);
    element.download = fileName || "index.html";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    const completionInput = iframeContent;
  };

  const listenersMap = useRef<
    Map<HTMLElement, { mouseover: () => void; mouseout: () => void }>
  >(new Map());

  // Create a map to store the listeners for each element

  const handleEdit = () => {
    if (editingMode) {
      // Save the updated iframe content
      if (iframeRef.current) {
        const iframeDocument = (iframeRef.current as HTMLIFrameElement)
          .contentDocument;
        if (iframeDocument) {
          setIframeContent(iframeDocument.documentElement.innerHTML);
        }
      }

      // Disable editing mode by setting the contentEditable property of all elements to false and remove the event listeners
      if (iframeRef.current) {
        const iframeDocument = (iframeRef.current as HTMLIFrameElement)
          .contentDocument;
        if (iframeDocument) {
          iframeDocument
            .querySelectorAll<HTMLElement>("*")
            .forEach((element) => {
              element.contentEditable = "false";

              // Get the listeners for the element from the map
              const listeners = listenersMap.current.get(element);
              if (listeners) {
                // Remove the listeners
                element.removeEventListener("mouseover", listeners.mouseover);
                element.removeEventListener("mouseout", listeners.mouseout);
                // Remove the element from the map
                listenersMap.current.delete(element);
              }
            });
        }
      }
    } else {
      // Enable editing mode by setting the contentEditable property of all elements to true and add event listeners
      if (iframeRef.current) {
        const iframeDocument = (iframeRef.current as HTMLIFrameElement)
          .contentDocument;
        if (iframeDocument) {
          iframeDocument
            .querySelectorAll<HTMLElement>("*")
            .forEach((element) => {
              element.contentEditable = "true";

              // Create the event listeners
              const mouseoverListener = () => {
                element.classList.add("outline-blue");
                console.log("Mouseover event fired");
              };
              const mouseoutListener = () => {
                console.log("Mouseout event fired");
                element.classList.remove("outline-blue");
              };

              // Add the listeners to the element
              element.addEventListener("mouseover", mouseoverListener);
              element.addEventListener("mouseout", mouseoutListener);

              // Store the listeners in the map
              listenersMap.current.set(element, {
                mouseover: mouseoverListener,
                mouseout: mouseoutListener,
              });
            });
        }
      }
    }

    setEditingMode(!editingMode);
  };

  const handleUpdate = () => {
    if (selectedElement) {
      selectedElement.innerHTML = editedContent;
      setSelectedElement(null);
      setEditedContent("");
      if (iframeRef.current) {
        const iframeDocument = (iframeRef.current as HTMLIFrameElement)
          .contentDocument;
        if (iframeDocument) {
          setIframeContent(iframeDocument.documentElement.innerHTML);
        }
      }
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen py-24 mx-auto px-8 md:px-16 lg:px-24 overflow-hidden">
      <Image
        src="/logoa.png"
        alt="A logo"
        width={200}
        height={200}
        className="mx-auto h-32 w-32"
      />
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          className={`w-full p-2 mb-4 border text-ellipsis border-gray-300 rounded ${
            isLoading ? "rounded-xl" : "rounded-xl shadow-xl"
          }`}
          value={input}
          // update placeholder when the GPT is typing
          placeholder={isLoading ? "Generating... " : "Say something..."}
          onChange={handleInputChange}
          disabled={isLoading}
        />
        {isLoading ? null : (
          <p className="text-xs ml-2 font-medium text-gray-900">
            Tip: A landing page for Medical website
          </p>
        )}
      </form>

      {editingMode && selectedElement && (
        <div className="absolute z-50">
          <p>Edit the selected element:</p>
          <input
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
          <button onClick={handleUpdate}>Update</button>
        </div>
      )}
      {iframeContent && (
        <div className="flex flex-col items-center h-full">
          <div className={`border rounded-xl ${deviceSize}`}>
            <div className="flex items-center justify-between p-3 border-b lg:px-12 ">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="flex-1 text-center">
                <div className="flex items-center justify-center space-x-2 bg-gray-200 rounded-xl mx-8 py-1 px-2">
                  acme.co
                  {isLoading && <span className="ml-4 animate-spin">🟠</span>}
                  <button
                    className="ml-4 hidden md:flex"
                    onClick={() => setDeviceSize(DeviceSize.Mobile)}
                  >
                    📱
                  </button>
                  <button
                    className="ml-4 hidden md:flex"
                    onClick={() => setDeviceSize(DeviceSize.Tablet)}
                  >
                    💻
                  </button>
                  <button
                    className="ml-4 hidden md:flex"
                    onClick={() => setDeviceSize(DeviceSize.Desktop)}
                  >
                    🖥️
                  </button>
                  <button
                    className="ml-4"
                    onClick={() => setCodeViewActive(!codeViewActive)}
                  >
                    {codeViewActive ? "🖼️" : "🖨️"}
                  </button>
                </div>
              </div>
              <div></div>
              <div className="flex justify-end space-x-4">
                <button onClick={handleSave}>
                  <span role="img" aria-label="paper-plane">
                    📩
                  </span>
                </button>

                {!isLoading && iframeContent && (
                  <button onClick={handleEdit} className="ml-4">
                    {editingMode ? "💾" : "✏️"}
                  </button>
                )}
              </div>
            </div>
            <div className="h-[96rem]">
              <Frame
                ref={iframeRef}
                sandbox="allow-same-origin allow-scripts"
                style={{ width: "100%", height: "100%" }}
              >
                {codeViewActive ? (
                  <pre>{iframeContent}</pre>
                ) : (
                  <div dangerouslySetInnerHTML={{ __html: iframeContent }} />
                )}
              </Frame>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
