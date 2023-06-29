import { createTRPCRouter } from "~/server/api/trpc";
import { charactersRouter } from "./routers/characters";
import { matchupsRouter } from "./routers/matchups";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  characters: charactersRouter,
  matchups: matchupsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
