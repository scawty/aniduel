import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const matchupsRouter = createTRPCRouter({
  getMatchup: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.character.findMany();
  }),
});
