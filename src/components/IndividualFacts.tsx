"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { Loader2, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

interface Fact {
    id: string;
    content: string;
    sourceLink: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
    trueVotes: number;
    falseVotes: number;
    user: {
      id: string;
      name: string;
      email: string;
    };
  }

const mockFact: Fact = {
    id: "1",
    content: "The Earth revolves around the Sun.",
    sourceLink: "https://example.com/earth-revolves",
    userId: "user123",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    trueVotes: 42,
    falseVotes: 2,
    user: {id: "", name: "", email: ""}
};
const IndividualFacts = ({factId}: {factId:string}) => {
  const [fact, setFact] = useState<Fact | null>(mockFact);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isVotingTrue, setIsVotingTrue] = useState<boolean>(false);
  const [isVotingFalse, setIsVotingFalse] = useState<boolean>(false);
  

  useEffect(() => {
    const fetchFactDetails = async () => {
        try {
          setIsLoading(true);
          const response = await fetch(`/api/facts/${factId}`);
          const data = await response.json();
          setFact(data);
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



  const handleVote = async (voteValue: boolean) => {
    try {
        if(voteValue){
            setIsVotingTrue(true);
        }else {
            setIsVotingFalse(true);
        }
      const response = await fetch(`/api/votes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ factId, value: voteValue }),
      });
  
      if (response.ok) {
        const data = await response.json();
        setFact((prevFact) => prevFact && {
          ...prevFact,
          trueVotes: data.trueVotes,
          falseVotes: data.falseVotes,
        });
      } else {
        console.error('Failed to vote');
      }
    } catch (error) {
      console.error('Error voting:', error);
    } finally {
      setIsVotingTrue(false);
      setIsVotingFalse(false);
    }
  };
  

  if (isLoading) {
    return <Loader2 className="animate-spin h-10 w-10 text-gray-800 mx-auto mt-20" />;
  }

  if (!fact) {
    return <div className="text-center text-gray-700 mt-20">Fact not found.</div>;
  }

  return (
    <main className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center gap-4 mb-6">
        <Avatar>
          <AvatarImage src={`https://api.adorable.io/avatars/40/${fact.user.email}.png`} alt={fact.user.name} />
          <AvatarFallback>{fact.user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-xl font-bold text-gray-900">{fact.user.name}</h2>
          <p className="text-sm text-gray-500">Posted on: {new Date(fact.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
      
      <h1 className="text-3xl font-bold text-gray-900 mb-4">{fact.content}</h1>
      <div className="flex items-center justify-between mb-6">
        <Button onClick={() => handleVote(true)} disabled={isVotingTrue}>
          {isVotingTrue? <Loader2 className="h-4 w-4 animate-spin" /> : 'True'}
        </Button>
        <Button onClick={() => handleVote(false)} disabled={isVotingFalse}>
          {isVotingFalse ? <Loader2 className="h-4 w-4 animate-spin" /> : 'False'}
        </Button>
        <div className="flex items-center gap-4">
          <span className="text-green-600">{fact.trueVotes} True Votes</span>
          <span className="text-red-600">{fact.falseVotes} False Votes</span>
        </div>
      </div>
      <Link
        href={fact.sourceLink}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center text-blue-600 hover:underline"
      >
        View Source <ArrowUpRight className="ml-1 h-4 w-4" />
      </Link>
    </main>
  );
};

export default IndividualFacts;
