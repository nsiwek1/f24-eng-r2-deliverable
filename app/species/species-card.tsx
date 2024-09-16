"use client";

import type { Database } from "@/lib/schema";
import Image from "next/image";
import DeleteSpecies from "./deletespecies";
import EditSpecies from "./editspecies";
import SpeciesDetailDialog from "./learn-more";
type Species = Database["public"]["Tables"]["species"]["Row"];

interface SpeciesCardProps {
  species: Species;
  userId: string;
}
/* renders the card with name, scientific name and shows options for deleting, learning more and editing */
export default function SpeciesCard({ species, userId }: SpeciesCardProps) {
  return (
    <div className="m-4 w-72 min-w-72 flex-none rounded border-2 p-3 shadow">
      {species.image && (
        <div className="relative h-40 w-full">
          <Image src={species.image} alt={species.scientific_name} fill style={{ objectFit: "cover" }} />
        </div>
      )}
      <h3 className="mt-3 text-2xl font-semibold">{species.scientific_name}</h3>
      <h4 className="text-lg font-light italic">{species.common_name}</h4>
      <p>{species.description ? species.description.slice(0, 150).trim() + "..." : ""}</p>
      <SpeciesDetailDialog species={species} />
      <EditSpecies species={species} userId={userId} />
      <DeleteSpecies species={species} />
    </div>
  );
}
