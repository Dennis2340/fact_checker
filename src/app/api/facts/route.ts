import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { content, sourceLink } = body;

    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const userId = user?.id;
    const email = user?.email;

    if (user && !userId && email) return new Response("Unauthorized", { status: 401 });

    const dbUser = await db.user.findFirst({
      where: {id: userId}
    })
    console.log("this is the dbUser: ", dbUser)
    if(!dbUser) {
      const userCreated = await db.user.create({
        data: {
            name: `${user?.given_name} ${user?.family_name}`,
            id: user?.id!,
            email: user?.email!,
        },
       });
       console.log(userCreated)
       const newFact = await db.fact.create({
        data: {
          content,
          sourceLink,
          user: { connect: { id: userCreated.id, email: userCreated.email } },

        },
      });
      console.log(newFact)
    }

    const newFact = await db.fact.create({
      data: {
        content,
        sourceLink,
        user: { connect: { id: dbUser?.id } },
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