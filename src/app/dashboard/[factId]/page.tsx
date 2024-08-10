import IndividualFacts from '@/components/IndividualFacts'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import React from 'react'
import { db } from '@/db'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { redirect } from 'next/navigation'
interface PageProps {
  params: {
    factId: string
  }
}
const Page = async({ params }: PageProps) => {
  const { factId } = params

  const { getUser } = getKindeServerSession()

  const user = await getUser()
  if(!user || !user.id) redirect("/auth-callback?origin=dashboard")

  const dbUser = await db.user.findFirst({
    where: {id : user.id}
  })
  
  if(!dbUser){
    redirect("/auth-callback?origin=dashboard")
  }

  return (
    <MaxWidthWrapper>
      <IndividualFacts factId={factId}/>
    </MaxWidthWrapper>
  )
}

export default Page