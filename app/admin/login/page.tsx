"use client"
import { Suspense, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { browserClient } from "@/lib/supabase/browser"

function Form() {
  const r = useRouter(), q = useSearchParams()
  const [err, setErr] = useState(""), [busy, setBusy] = useState(false)
  const e = q.get("e"), u = q.get("u")
  const note =
    e === "denied" ? `You are signed in as ${u}, but that email is not listed in ADMIN_EMAILS in Vercel. Add it there (exactly as written) and redeploy.` :
    e === "noenv" ? `Vercel cannot see ADMIN_EMAILS (missing: ${q.get("m") || "ADMIN_EMAILS"}). Check the name is exactly ADMIN_EMAILS, that Production is ticked, then redeploy.` :
    e === "session" ? "The sign-in was not kept. Please try once more. If it repeats, check the Supabase URL and anon key in Vercel." : ""
  async function go(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault(); setBusy(true); setErr("")
    const f = new FormData(ev.currentTarget)
    const { error } = await browserClient().auth.signInWithPassword({ email: String(f.get("email")).trim(), password: String(f.get("password")) })
    if (error) { setErr(error.message.toLowerCase().includes("confirm") ? "This email is not confirmed in Supabase yet." : "Wrong email or password."); setBusy(false); return }
    window.location.assign("/admin")
  }
  return (
    <div style={{ maxWidth: 420, margin: "12vh auto", padding: 24 }}>
      <h1 style={{ fontSize: 28, color: "var(--navy)", marginBottom: 6 }}>OneAccounts admin</h1>
      <p style={{ color: "var(--ink-soft)", marginBottom: 24 }}>Sign in to manage guides and leads.</p>
      <form className="form" onSubmit={go}>
        <label>Email<input name="email" type="email" required autoComplete="username" /></label>
        <label>Password<input name="password" type="password" required autoComplete="current-password" /></label>
        {note && <div className="msg er">{note}</div>}
        {err && <div className="msg er">{err}</div>}
        <button className="btn-primary" style={{ border: 0, cursor: "pointer", justifySelf: "start" }} disabled={busy}>{busy ? "Signing in..." : "Sign in"}</button>
      </form>
    </div>
  )
}
export default function Login() { return <Suspense><Form /></Suspense> }
