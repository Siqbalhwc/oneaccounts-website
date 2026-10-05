import PostForm from "@/components/PostForm"
export default async function New({ searchParams }: { searchParams: Promise<{ e?: string }> }) {
  const { e } = await searchParams
  return (<><h1>New guide</h1><PostForm error={e} /></>)
}
