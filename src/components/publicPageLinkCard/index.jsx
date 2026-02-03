import React, { useMemo, useState } from "react";
import "./index.scss";
import Card from "../card";
import { getUser } from "../../api/client";

export default function PublicPageLinkCard() {
  const user = getUser();
  const username = user?.username || "";

  const publicUrl = useMemo(() => {
    if (!username) return "";
    // adjust path if your public page route differs
    return `${window.location.origin}/public/${username}`;
  }, [username]);

  const [copied, setCopied] = useState(false);

  async function onCopy() {
    if (!publicUrl) return;
    try {
      await navigator.clipboard.writeText(publicUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch (e) {
      // fallback: select text approach could be added later if needed
      setCopied(false);
    }
  }

  function onOpen() {
    if (!publicUrl) return;
    window.open(publicUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <Card title="Your public page" subtitle="Link to your public profile">
      {!publicUrl ? (
        <div className="ph-profileEdit__muted">Public link is unavailable.</div>
      ) : (
        <>
          <div className="ph-publicLink__url">{publicUrl}</div>

          <div className="ph-publicLink__btnRow">
            <button
              type="button"
              className="ph-profileEdit__primaryBtn"
              onClick={onOpen}
            >
              Open
            </button>

            <button
              type="button"
              className="ph-profileEdit__primaryBtn"
              onClick={onCopy}
            >
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </>
      )}
    </Card>
  );
}
