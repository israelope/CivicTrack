import SubmitForm from '@/components/SubmitForm'

// This tells Next.js to render this page dynamically
// This is now VALID because this file is a Server Component
export const dynamic = 'force-dynamic'

export default function HomePage() {
  // This is now a Server Component
  // It renders your Client Component
  return <SubmitForm />
}