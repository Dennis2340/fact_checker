"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { Loader2, ArrowUpRight } from 'lucide-react';

interface Fact {
  id: string;
  content: string;
  sourceLink: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  votes: number;
}

const mockFact: Fact = {
    id: "1",
    content: "The Earth revolves around the Sun.",
    sourceLink: "https://example.com/earth-revolves",
    userId: "user123",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    votes: 42,
};
const IndividualFacts = ({factId}: {factId:string}) => {
  const [fact, setFact] = useState<Fact | null>(mockFact);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isVoting, setIsVoting] = useState<boolean>(false);
  const [voteCount, setVoteCount] = useState<number>(0);
  

  useEffect(() => {
    const fetchFactDetails = async () => {
        try {
          setIsLoading(true);
          const response = await fetch(`/api/facts/${factId}`);
          const data = await response.json();
          setFact(data);
          setVoteCount(data.votes);
        } catch (error) {
          console.error('Error fetching fact details:', error);
        } finally {
          setIsLoading(false);
        }
      };
    if (factId) {
      fetchFactDetails();
    }
  }, [factId]);



  const handleVote = async () => {
    try {
      setIsVoting(true);
      const response = await fetch(`/api/facts/${factId}/vote`, {
        method: 'POST',
      });
      if (response.ok) {
        setVoteCount((prevCount) => prevCount + 1);
      } else {
        console.error('Failed to vote');
      }
    } catch (error) {
      console.error('Error voting:', error);
    } finally {
      setIsVoting(false);
    }
  };

  if (isLoading) {
    return <Loader2 className="animate-spin h-10 w-10 text-gray-800 mx-auto mt-20" />;
  }

  if (!fact) {
    return <div className="text-center text-gray-700 mt-20">Fact not found.</div>;
  }

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">{fact.content}</h1>
      <p className="text-sm text-gray-500 mb-4">
        Posted on: {new Date(fact.createdAt).toLocaleDateString()}
      </p>
      <div className="flex items-center justify-between mb-6">
        <Button onClick={handleVote} disabled={isVoting}>
          {isVoting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Vote'}
        </Button>
        <span className="text-gray-700">{voteCount} {voteCount === 1 ? 'Vote' : 'Votes'}</span>
      </div>
      <a
        href={fact.sourceLink}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center text-blue-600 hover:underline"
      >
        View Source <ArrowUpRight className="ml-1 h-4 w-4" />
      </a>
    </main>
  );
};

export default IndividualFacts;
