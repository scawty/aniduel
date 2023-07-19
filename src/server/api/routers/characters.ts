import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";

export const charactersRouter = createTRPCRouter({
  getInfinite: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.number().nullish(),
      })
    )
    .query(async ({ ctx, input }) => {
      const limit = input.limit ?? 1000;
      const { cursor } = input;
      const myCursor = cursor ? { id: cursor } : undefined;

      const characters = await ctx.prisma.character.findMany({
        skip: myCursor ? 1 : 0,
        take: limit + 1,
        where: {},
        cursor: myCursor,
        orderBy: { elo: "desc" },
      });
      let nextCursor: typeof cursor | undefined = undefined;
      if (characters.length > limit) {
        const nextCharacter = characters.pop();
        nextCursor = nextCharacter?.id;
      }
      return {
        characters,
        nextCursor,
      };
    }),
});
