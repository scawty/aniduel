import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import ELO from "arpad";

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
  postMatchupResult: publicProcedure
    .input(z.object({ winnerId: z.number(), loserId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const elo = new ELO();

      const winner = await ctx.prisma.character.findUnique({
        where: { id: input.winnerId },
      });
      const loser = await ctx.prisma.character.findUnique({
        where: { id: input.loserId },
      });

      if (!winner) {
        throw new Error(`Winner with id ${input.winnerId} not found`);
      }

      if (!loser) {
        throw new Error(`Loser with id ${input.loserId} not found`);
      }

      const newWinnerRating = elo.newRatingIfWon(winner.elo, loser.elo);
      const newLoserRating = elo.newRatingIfLost(loser.elo, winner.elo);

      const winnerData = await ctx.prisma.character.update({
        where: { id: input.winnerId },
        data: { elo: newWinnerRating },
      });
      const loserData = await ctx.prisma.character.update({
        where: { id: input.loserId },
        data: { elo: newLoserRating },
      });

      return [winnerData, loserData];
    }),
});
