import FactBrowsingDashboard, { Fact } from '@/components/FactBrowsingDashboard'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import React from 'react'

interface Props {}

const mockFacts: Fact[] = [
  {
    id: '1',
    title: 'The Eiffel Tower can be 15 cm taller during the summer.',
    createdAt: '2024-01-15T12:34:56Z',
    _count: { votes: 3 },
  },
  {
    id: '2',
    title: 'Honey never spoils.',
    createdAt: '2024-02-20T09:24:11Z',
    _count: { votes: 5 },
  },
  {
    id: '3',
    title: 'Bananas are berries, but strawberries aren’t.',
    createdAt: '2024-03-03T08:14:22Z',
    _count: { votes: 1 },
  },
];

const Page = () => {
  return (
    <MaxWidthWrapper>
      <FactBrowsingDashboard facts={mockFacts} isLoading={false}/>
    </MaxWidthWrapper>
  )
}

export default Page