// hooks/useCrispChat.ts
import { useEffect, useCallback, useState } from "react";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    $crisp: any[];
    CRISP_WEBSITE_ID: string;
  }
}

interface UseCrispChatReturn {
  openChat: () => void;
  closeChat: () => void;
  isChatOpen: boolean;
}

export const useCrispChat = (websiteId: string): UseCrispChatReturn => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Set up Crisp event listeners
  const setupCrispListeners = useCallback(() => {
    if (!window.$crisp) return;

    // Listen for when chat is opened
    window.$crisp.push([
      "on",
      "chat:opened",
      () => {
        setIsChatOpen(true);
        console.log("Chat opened");
      },
    ]);

    // Listen for when chat is closed
    window.$crisp.push([
      "on",
      "chat:closed",
      () => {
        setIsChatOpen(false);
        // Hide the floating widget when chat is closed
        window.$crisp.push(["do", "chat:hide"]);
        // window.$crisp.push(["do", "message:hide"]);
        console.log("Chat closed - hiding widget");
      },
    ]);

    // Listen for when message is sent (optional)
    window.$crisp.push([
      "on",
      "message:sent",
      () => {
        console.log("Message sent");
      },
    ]);

    // Check initial chat state
    setTimeout(() => {
      if (window.$crisp) {
        window.$crisp.push([
          "get",
          "chat:isOpen",
          (isOpen: boolean) => {
            setIsChatOpen(isOpen);
            if (!isOpen) {
              // Ensure widget is hidden if chat is not open
              window.$crisp.push(["do", "chat:hide"]);
              //   window.$crisp.push(["do", "message:hide"]);
            }
          },
        ]);
      }
    }, 1000);
  }, []);

  // Initialize Crisp and set up event listeners
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Prevent double initialization
    if (window.$crisp) {
      // If already initialized, set up listeners
      setupCrispListeners();
      return;
    }

    window.$crisp = [];
    window.CRISP_WEBSITE_ID = websiteId;

    // Hide floating widget by default
    window.$crisp.push(["do", "chat:hide"]);
    // window.$crisp.push(["do", "message:hide"]);

    const script = document.createElement("script");
    script.src = "https://client.crisp.chat/l.js";
    script.async = true;

    script.onload = () => {
      // Set up event listeners after Crisp loads
      setupCrispListeners();
    };

    document.head.appendChild(script);

    // Cleanup function
    return () => {
      if (window.$crisp) {
        window.$crisp.push(["do", "chat:close"]);
        window.$crisp.push(["do", "session:reset"]);
      }
    };
  }, [websiteId, setupCrispListeners]);

  // Effect to monitor chat state and hide widget when closed
  useEffect(() => {
    if (!isChatOpen && window.$crisp) {
      // When chat is closed, ensure floating widget is hidden
      window.$crisp.push(["do", "chat:hide"]);
      //   window.$crisp.push(["do", "message:hide"]);
    }
  }, [isChatOpen]);

  const openChat = useCallback(() => {
    if (window.$crisp) {
      // Show chat and open it
      window.$crisp.push(["do", "chat:show"]);
      window.$crisp.push(["do", "chat:open"]);
      setIsChatOpen(true);
    }
  }, []);

  const closeChat = useCallback(() => {
    if (window.$crisp) {
      window.$crisp.push(["do", "chat:close"]);
      window.$crisp.push(["do", "chat:hide"]);
      //   window.$crisp.push(["do", "message:hide"]);
      setIsChatOpen(false);
    }
  }, []);

  return {
    openChat,
    closeChat,
    isChatOpen,
  };
};
