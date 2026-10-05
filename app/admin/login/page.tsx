"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { browserClient } from "@/lib/supabase/browser"

export default function Login() {
  const r = useRouter()
  const [err, setErr] = useState(""), [busy, setBusy] = useState(false)
  async function go(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setBusy(true); setErr("")
    const f = new FormData(e.currentTarget)
    const { error } = await browserClient().auth.signInWithPassword({ email: String(f.get("email")), password: String(f.get("password")) })
    if (error) { setErr("Wrong email or password."); setBusy(false); return }
    r.replace("/admin"); r.refresh()
  }
  return (
    <div style={{ maxWidth: 400, margin: "12vh auto", padding: 24 }}>
      <h1 style={{ fontSize: 28, color: "var(--navy)", marginBottom: 6 }}>OneAccounts admin</h1>
      <p style={{ color: "var(--ink-soft)", marginBottom: 24 }}>Sign in to manage guides and leads.</p>
      <form className="form" onSubmit={go}>
        <label>Email<input name="email" type="email" required autoComplete="username" /></label>
        <label>Password<input name="password" type="password" required autoComplete="current-password" /></label>
        {err && <div className="msg er">{err}</div>}
        <button className="btn-primary" style={{ border: 0, cursor: "pointer", justifySelf: "start" }} disabled={busy}>{busy ? "Signing in..." : "Sign in"}</button>
      </form>
    </div>
  )
}
