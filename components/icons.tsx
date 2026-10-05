const S = { viewBox: "0 0 24 24", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" } as const
export const IcReceipt = () => (<svg {...S}><path d="M9 3h6a2 2 0 0 1 2 2v14l-3-2-2 2-2-2-3 2V5a2 2 0 0 1 2-2Z" /><path d="M9 8h6M9 12h6" /></svg>)
export const IcBox = () => (<svg {...S}><path d="m21 8-9-5-9 5 9 5 9-5Z" /><path d="M3 8v8l9 5 9-5V8" /><path d="M12 13v8" /></svg>)
export const IcPeople = () => (<svg {...S}><circle cx="9" cy="7" r="3.2" /><path d="M2.5 20a6.5 6.5 0 0 1 13 0" /><circle cx="17.5" cy="8" r="2.6" /><path d="M15 20a5 5 0 0 1 8 0" /></svg>)
export const IcBag = () => (<svg {...S}><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18M16 10a4 4 0 0 1-8 0" /></svg>)
export const IcHeart = () => (<svg {...S}><path d="M12 21s-7-4.4-9.5-8.8C.6 8.4 2.6 5 6 5c2 0 3.4 1 4.9 2.7C12.6 6 14 5 16 5c3.4 0 5.4 3.4 3.5 7.2C19 16.6 12 21 12 21Z" /></svg>)
export const IcBriefcase = () => (<svg {...S}><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18" /></svg>)
export const IcSite = () => (<svg {...S}><path d="M3 21h18M5 21V9l7-5 7 5v12M9 21v-6h6v6" /></svg>)
export const IcCheck = () => (<svg {...S}><path d="m5 12 4.5 4.5L19 7" /></svg>)
export const IcPlay = () => (<svg {...S} fill="none"><path d="m10 8 6 4-6 4V8Z" /><rect x="2" y="5" width="20" height="14" rx="3" /></svg>)
export const IcMail = () => (<svg {...S} fill="none"><path d="M22 6 12 13 2 6" /><rect x="2" y="4" width="20" height="16" rx="2" /></svg>)
export const IcPhone = () => (<svg {...S} fill="none"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.5 2.1L8 9.7a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.7 2Z" /></svg>)
export const Arc = () => (
  <svg className="arc-line" viewBox="0 0 600 50" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M10 8 C 190 48, 410 48, 590 8" stroke="url(#arcGrad)" strokeWidth="1.5" strokeLinecap="round" />
    <defs><linearGradient id="arcGrad" x1="0" y1="0" x2="600" y2="0" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#C9862F" stopOpacity="0" /><stop offset="0.5" stopColor="#C9862F" stopOpacity="0.5" /><stop offset="1" stopColor="#C9862F" stopOpacity="0" /></linearGradient></defs>
  </svg>
)
