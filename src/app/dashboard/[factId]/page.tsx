import IndividualFacts from '@/components/IndividualFacts'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import React from 'react'

interface PageProps {
  params: {
    factId: string
  }
}
const Page = ({ params }: PageProps) => {
  const { factId } = params
  return (
    <MaxWidthWrapper>
      <IndividualFacts factId={factId}/>
    </MaxWidthWrapper>
  )
}

export default Page