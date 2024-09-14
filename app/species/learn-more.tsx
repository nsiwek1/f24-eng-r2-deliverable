"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import type { Database } from "@/lib/schema";

type Species = Database["public"]["Tables"]["species"]["Row"];

interface SpeciesDetailDialogProps {
  species: Species;
}

export default function SpeciesDetailDialog({ species }: SpeciesDetailDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mt-3 w-full">Learn More</Button>
      </DialogTrigger>
      <DialogContent>
        {species ? (
          <div className="p-4">
            <h2 className="text-2xl font-bold">{species.scientific_name}</h2>
            <h3 className="text-lg italic">{species.common_name}</h3>
            <p className="mt-2">
              <strong>Total Population:</strong> {species.total_population}
            </p>
            <p className="mt-1">
              <strong>Kingdom:</strong> {species.kingdom}
            </p>
            <p className="mt-1">
              <strong>Endangered Status:</strong> {species.endangered ? "Endangered" : "Not Endangered"}
            </p>
            <p className="mt-4">{species.description}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </DialogContent>
    </Dialog>
  );
}
