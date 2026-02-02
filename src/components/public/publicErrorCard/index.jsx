import React, { useEffect, useState } from "react";

export default function PublicErrorCard({ title, text }){
    return (
        <div className="ph-publicProfile">
        <div className="ph-publicProfile__hero">
          <div className="ph-publicProfile__heroInner">
            <h1 className="ph-publicProfile__name" style={{ margin: 0 }}>
              {title}
            </h1>
            <p style={{ marginTop: 10, color: "var(--ph-muted)" }}>
              {text}
            </p>
          </div>
        </div>
      </div>
    );
}