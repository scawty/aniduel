import type { Meta, StoryObj } from "@storybook/react";
import type { Character } from "@prisma/client";

import MatchupCard from "~/components/MatchupCard";

const meta: Meta<typeof MatchupCard> = {
  component: MatchupCard,
};

export default meta;

type Story = StoryObj<typeof MatchupCard>;

export const Loading: Story = {
  render: () => <MatchupCard isLoading={true} />,
};

const character: Character = {
  id: 1,
  updatedAt: new Date("2023-06-28T16:33:01.282Z"),
  malId: 417,
  name: "Lelouch Lamperouge",
  imgUrl: "https://cdn.myanimelist.net/images/characters/8/406163.webp",
  smallImgUrl: "https://cdn.myanimelist.net/images/characters/8/406163t.webp",
  malUrl: "https://myanimelist.net/character/417/Lelouch_Lamperouge",
  elo: 1200,
};

export const WithCharacter: Story = {
  render: () => (
    <MatchupCard
      isLoading={false}
      character={character}
      handleMatchupResult={() => {}}
    />
  ),
};
