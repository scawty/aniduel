import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const matchupsRouter = createTRPCRouter({
  getMatchup: publicProcedure.query(async ({ ctx }) => {
    // Generate two unique random numbers
    const totalCharacters = 1000;
    let id1, id2;
    do {
      id1 = Math.floor(Math.random() * totalCharacters) + 1;
      id2 = Math.floor(Math.random() * totalCharacters) + 1;
    } while (id1 === id2);

    // Fetch the two random users
    const character1 = await ctx.prisma.character.findUnique({
      where: { id: id1 },
    });
    const character2 = await ctx.prisma.character.findUnique({
      where: { id: id2 },
    });

    return [character1, character2];
  }),
});
