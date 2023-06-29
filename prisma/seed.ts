import { Character, PrismaClient } from "@prisma/client";
import { Jakan } from "jakan";

// Build a JakanMisc client
const miscClient = new Jakan().withMemory().forMisc();

const prisma = new PrismaClient();

async function main() {
  const numberOfCharacters = 1000;
  const pages = numberOfCharacters / 25; // 25 characters per page

  for (let currentPage = 1; currentPage < pages + 1; currentPage++) {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // add a 1s delay to stay comfortably under rate limit

    // get page of characters
    const pageCharacters = await miscClient.top("characters", {
      page: currentPage,
    });

    const data = pageCharacters.data.map((character: any) => ({
      malId: character.mal_id,
      name: character.name,
      imgUrl: character.images.webp.image_url,
      smallImgUrl: character.images.webp.small_image_url,
      malUrl: character.url,
    }));

    console.log(data);

    // add page of characters to db
    await prisma.character.createMany({
      data,
      skipDuplicates: true,
    });
  }
}

main();
