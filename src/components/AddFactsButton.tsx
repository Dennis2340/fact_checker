import React, { useState } from 'react'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { Label } from './ui/label';
import { useToast } from "@/components/ui/use-toast"

interface Props {}

const AddFactsForm = () => {

    const [content, setContent] = useState<string>('');
    const [sourceLink, setSourceLink] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const { toast } = useToast()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
    
        try {
          const response = await fetch('/api/facts', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content, sourceLink }),
          });
    
          if (!response.ok) {
            throw new Error('Failed to submit the fact.');
          }else {
            toast({
                title: "Fact Submitted",
              })
          }
    
        } catch (error: any) {
          setError(error.message);
          toast({
            title: "Error Occured",
            description: "try again",
            variant: "destructive"
          })
        } finally {
          setIsSubmitting(false);
        }
      };
    
  return (
    <form className="space-y-6">
        <div>
        <Label htmlFor="content" className="text-gray-700">
            Fact Content
        </Label>
        <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter the fact content..."
            className="mt-1 block w-full"
            required
        />
        </div>

        <div>
        <Label htmlFor="sourceLink" className="text-gray-700">
            Source Link
        </Label>
        <Input
            id="sourceLink"
            type="url"
            value={sourceLink}
            onChange={(e) => setSourceLink(e.target.value)}
            placeholder="https://example.com"
            className="mt-1 block w-full"
            required
        />
        </div>

       {error && <p className="text-red-600">{error}</p>}

        <Button
        className="w-full"
        disabled={isSubmitting}
        onClick={handleSubmit}
        >
        {isSubmitting ? <Loader2 className='w-4 h-4 animate-spin'/> : 'Submit Fact'}
        </Button>
  </form>

  )
}

const AddFactsButton = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
  return (
    <>
    <Dialog open={isOpen} onOpenChange={(v) => {
        if(!v){
            setIsOpen(v)
        }
    }}>
        <DialogTrigger asChild onClick={() => setIsOpen(true)}>
            <Button>Add Facts</Button>
        </DialogTrigger>

        <DialogContent>
            <AddFactsForm/>
        </DialogContent>
    </Dialog>

  </>
  )
}


export default AddFactsButton