import React from "react";
import "./css/Nf.css";

export default function Nf() {
  return (
    <div className="py-10">
      <div id="not-found"></div>
      <div className="relative bottom-96 opacity-100 text-slate-800 pr-0">
        <span className="lg:text-5xl text-xl">
          OOPs! Not Found Go Back to HomePage
        </span>
      </div>
    </div>
  );
}
