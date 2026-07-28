import React, { useState } from "react";
import toast from "react-hot-toast";

type CopyButtonProps = {
  text: string;
  className?: string;
};

const CopyButton: React.FC<CopyButtonProps> = ({ text, className = "" }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy");
    }
  };

  return (
    <div
      className={`${className} flex gap-3 rounded-full bg-white/40 items-center p-2 `}
    >
      <div className="uppercase font-semibold">{text}</div>

      <button
        onClick={handleCopy}
        className="rounded-full bg-white text-brand text-sm w-18 p-1"
      >
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
};

export default CopyButton;
