import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug') || '/'

  // Disable Draft Mode
  const draft = await draftMode()
  draft.disable()

  // Redirect to the path
  redirect(slug)
}
