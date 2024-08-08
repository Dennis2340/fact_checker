import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { content, sourceLink } = body;

    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const userId = user?.id;

    if (!userId) return new Response("Unauthorized", { status: 401 });

    const newFact = await db.fact.create({
      data: {
        content,
        sourceLink,
        user: { connect: { id: userId } },
      },
    });

    return new Response(JSON.stringify(newFact), { status: 201, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "Error Occurred", error }), { status: 500 });
  }
}

export async function GET(req: Request) {
    try {
      const facts = await db.fact.findMany({
        include: {
          user: true,
          votes: true,
        },
      });
  
      const summarizedFacts = facts.map((fact:any) => {
        const trueVotes = fact.votes.filter((vote: { value: any; }) => vote.value).length;
        const falseVotes = fact.votes.filter((vote: { value: any; })  => !vote.value).length;
        return {
          ...fact,
          trueVotes,
          falseVotes,
        };
      });
      
      return new Response(JSON.stringify(summarizedFacts), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
      console.log(error);
      return new Response(JSON.stringify({ message: "Error Occurred", error }), { status: 500 });
    }
  }