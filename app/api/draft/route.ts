import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  
  // Get the pathname to redirect to
  const pathname = searchParams.get('sanity-preview-pathname') || 
                   searchParams.get('slug') || 
                   '/'

  // Enable Draft Mode
  const draft = await draftMode()
  draft.enable()

  // Redirect to the path
  redirect(pathname)
}
