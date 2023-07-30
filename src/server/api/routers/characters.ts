import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";

export const charactersRouter = createTRPCRouter({
  getInfinite: publicProcedure
    .input(
      z.object({
        limit: z.number(),
        cursor: z.number().nullish(),
        skip: z.number().optional(),
        query: z.string().optional(),
        reverse: z.boolean().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { limit, skip, cursor, query, reverse } = input;

      const characters = await ctx.prisma.character.findMany({
        skip: skip,
        take: limit + 1,
        where: {
          name: {
            contains: query,
          },
        },
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: reverse
          ? [{ elo: "asc" }, { id: "desc" }]
          : [{ elo: "desc" }, { id: "asc" }],
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
