import { db } from "@/db";

export async function GET(req: Request, { params }: { params: { factId: string } }) {
  try {
    const votes = await db.vote.findMany({
      where: { factId: params.factId },
      include: {
        user: {
          select: { name: true },
        },
      },
    });

    return new Response(JSON.stringify(votes), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "Error Occurred", error }), { status: 500 });
  }
}
