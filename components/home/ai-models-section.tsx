import Image from 'next/image'
import React from 'react'

export const AiModelsSection = () => {
  return (
    <section className='w-full py-6'>
      <div className="container mx-auto max-w-screen-xl flex justify-center">
        <div className="inline-flex flex-col gap-4 max-w-3xl mx-auto">
          <Image src='/images/ai_model_top.png' alt='ai' width={1723} height={638} />

          <h5 className='text-4xl font-bold text-center'>
            Over 1,500 AI models reviewed, sorted and polished for daily usage
          </h5>

          <Image src='/images/ai_model_bottom.png' alt='ai' width={1723} height={638} />
        </div>
      </div>
    </section>
  )
}
