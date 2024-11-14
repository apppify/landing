import Form from 'next/form'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

export const NewsLetterSection = () => {
  return (
    <section className='relative w-full py-6'>
      <p className='absolute -z-[1] top-0 left-1/2 -translate-x-1/2 text-[10vw] text-center leading-none font-dots text-muted-foreground/10'>SUBSCRIBE</p>
      <div className="container mx-auto max-w-screen-xl min-h-56 rounded-2xl p-5 mt-16 bg-gray-900/80">
        <h3>Subscribe to weekly digests</h3>
        
        <p>Stay ahead with weekly updates: get platform news, explore projects, discover updates, and dive into case studies and feature breakdowns.</p>

        <Form action='' className="flex flex-col gap-2">
          <Input type="email" placeholder="Email" />
          <Button>Subscribe</Button>
        </Form>
      </div>
    </section>
  )
}
