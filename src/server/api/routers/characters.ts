import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const charactersRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const characters = await ctx.prisma.character.findMany();
    return characters;
  }),
});
