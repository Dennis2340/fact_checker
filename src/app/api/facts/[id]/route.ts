import { db } from "@/db";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const fact = await db.fact.findUnique({
      where: { id: params.id },
      include: {
        user: {
          select: { name: true, email: true },
        },
        votes: {
          include: {
            user: {
              select: { name: true },
            },
          },
        },
      },
    });

    if (!fact) {
      return new Response("Fact not found", { status: 404 });
    }

    const trueVotes = fact.votes.filter((vote: { value: any; }) => vote.value).length;
    const falseVotes = fact.votes.filter((vote: { value: any; }) => !vote.value).length;

    const detailedFact = {
      ...fact,
      trueVotes,
      falseVotes,
    };

    return new Response(JSON.stringify(detailedFact), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "Error Occurred", error }), { status: 500 });
  }
}
