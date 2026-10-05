import { notFound } from "next/navigation"
import PostForm from "@/components/PostForm"
import { adminClient } from "@/lib/supabase/admin"
export default async function Edit({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ e?: string }> }) {
  const { id } = await params; const { e } = await searchParams
  const { data } = await adminClient().from("posts").select("*").eq("id", id).maybeSingle()
  if (!data) notFound()
  return (<><h1>Edit guide</h1><PostForm post={data} error={e} /></>)
}
