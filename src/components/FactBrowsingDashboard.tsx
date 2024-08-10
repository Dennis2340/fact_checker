"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Plus, Loader2, MessageSquare, Trash, Ghost } from 'lucide-react';
import Skeleton from 'react-loading-skeleton'
import AddFactsButton from './AddFactsButton';
import { MyLoader } from './MyLoader';

export interface Fact {
    id: string;
    content: string;
    createdAt: string;
    falseVotes:number
    trueVotes:number
  }
  
  interface Props {
    facts: Fact[];
    isLoading: boolean;
  }


  const mockFacts: Fact[] = [
    {
      id: '1',
      content: 'The Eiffel Tower can be 15 cm taller during the summer.',
      createdAt: '2024-01-15T12:34:56Z',
      falseVotes: 1,
      trueVotes: 4
    },
    {
      id: '2',
      content: 'Honey never spoils.',
      createdAt: '2024-02-20T09:24:11Z',
      falseVotes: 1,
      trueVotes: 4
    },
    {
      id: '3',
      content: 'Bananas are berries, but strawberries aren’t.',
      createdAt: '2024-03-03T08:14:22Z',
      falseVotes: 1,
      trueVotes: 4
    },
  ]

const FactBrowsingDashboard = () => {

    const [facts, setFacts] = useState<Fact[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchFacts = async () => {
          try {
            const response = await fetch('/api/facts'); // Adjust the endpoint if needed
            if (!response.ok) {
              throw new Error('Failed to fetch facts');
            }
            const data = await response.json();
            setFacts(data);
            console.log(data)
          } catch (error) {
            console.error('Error fetching facts:', error);
          } finally {
            setIsLoading(false);
          }
        };
    
        fetchFacts();
      }, []);
      
  return (
    <main className='mx-auto max-w-7xl md:p-10'>
      <div className='mt-8 flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:gap-0'>
        <h1 className='mt-3 font-bold text-5xl text-gray-900'>
          Facts
        </h1>
        
        <div>
          <AddFactsButton/>
        </div>
      </div>
      {isLoading ? (
        <div className='mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {[...Array(4)].map((_, index) => (
            <div key={index} className='col-span-1'>
                <MyLoader />
            </div>
        ))}
        </div>
          ): facts && facts.length !== 0 ? (
         <ul className='mt-8 grid grid-cols-1 gap-6 divide-y divide-zinc-200 md:grid-cols-2 lg:grid-cols-3'>
          {facts
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .map((fact) => (
              <li key={fact.id} className='col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow transition hover:shadow-lg'>
                <Link href={`/dashboard/${fact.id}`} className='flex flex-col gap-2 '>
                  <div className="pt-6 flex w-full items-center justify-between space-x-6">
                    <div className='h-10 w-10 ml-2 flex-shrink-0 rounded-full bg-gradient-to-b from-zinc-400 to-zinc-600' />
                    <div className="flex-1 truncate">
                      <div className="flex items-center space-x-3">
                        <h3 className='truncate text-lg font-medium text-zinc-900'>{fact.content}</h3>
                      </div>
                    </div>
                  </div>
                </Link>
                <div className='px-6 mt-4 grid grid-cols-3 place-items-center py-2 gap-6 text-xs text-zinc-500'>
                  <div className="flex items-center gap-2 ">
                    <Plus className='h-4 w-4' />
                    {new Date(fact.createdAt).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-2 ">
                    {fact.falseVotes + fact.trueVotes} {fact.falseVotes + fact.trueVotes > 1 ? "Votes" : "Vote"}
                  </div>
                  
                </div>
              </li>
            ))}
        </ul>
     ): (
        <div className='mt-16 flex flex-col items-center gap-2'>
        <Ghost className='h-8 w-8 text-zinc-800' />
        <h3 className='font-semibold text-xl'>No facts yet</h3>
        <p>Let&apos;s add your first fact.</p>
        </div>
     )}
      {/* {facts && facts.length !== 0 ? (
        <ul className='mt-8 grid grid-cols-1 gap-6 divide-y divide-zinc-200 md:grid-cols-2 lg:grid-cols-3'>
          {facts
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .map((fact) => (
              <li key={fact.id} className='col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow transition hover:shadow-lg'>
                <Link href={`/dashboard/${fact.id}`} className='flex flex-col gap-2 '>
                  <div className="pt-6 flex w-full items-center justify-between space-x-6">
                    <div className='h-10 w-10 ml-2 flex-shrink-0 rounded-full bg-gradient-to-b from-zinc-400 to-zinc-600' />
                    <div className="flex-1 truncate">
                      <div className="flex items-center space-x-3">
                        <h3 className='truncate text-lg font-medium text-zinc-900'>{fact.content}</h3>
                      </div>
                    </div>
                  </div>
                </Link>
                <div className='px-6 mt-4 grid grid-cols-3 place-items-center py-2 gap-6 text-xs text-zinc-500'>
                  <div className="flex items-center gap-2 ">
                    <Plus className='h-4 w-4' />
                    {new Date(fact.createdAt).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-2 ">
                    {fact.falseVotes + fact.trueVotes} {fact.falseVotes + fact.trueVotes > 1 ? "Votes" : "Vote"}
                  </div>
                  
                </div>
              </li>
            ))}
        </ul>
      ) : isLoading ? (
        <Skeleton height={100} className='my-2' count={3} />
      ) : (
        <div className='mt-16 flex flex-col items-center gap-2'>
          <Ghost className='h-8 w-8 text-zinc-800' />
          <h3 className='font-semibold text-xl'>No facts yet</h3>
          <p>Let&apos;s add your first fact.</p>
        </div>
      )} */}
    </main>
  );
}

export default FactBrowsingDashboard;
