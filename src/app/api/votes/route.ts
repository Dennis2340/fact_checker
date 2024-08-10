import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { factId, value } = body;

    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const userId = user?.id;

    if (!userId) return new Response("Unauthorized", { status: 401 });

    const dbUser = await db.user.findFirst({
      where: { id: userId },
    });
    if (!dbUser) return new Response("Unauthorized", { status: 401 });

    const existingVote = await db.vote.findFirst({
      where: {
        factId,
        userId: dbUser.id,
      },
    });

    if (existingVote) {
      // If vote exists, update it
      const updatedVote = await db.vote.update({
        where: { id: existingVote.id },
        data: { value },
      });
      return new Response(JSON.stringify(updatedVote), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      const newVote = await db.vote.create({
        data: {
          value,
          user: { connect: { id: userId } },
          fact: { connect: { id: factId } },
        },
      });
      return new Response(JSON.stringify(newVote), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ message: "Error Occurred", error }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function GET(req: Request) {
  try {
    const body = await req.json();
    const { factId} = body;

    const votes = await db.vote.findMany({
      where: { factId:  factId},
      include: {
        user: true,
      },
    });

    return new Response(JSON.stringify(votes), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ message: "Error Occurred", error }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
