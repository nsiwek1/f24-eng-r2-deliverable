"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { createBrowserSupabaseClient } from "@/lib/client-utils";
import type { Database } from "@/lib/schema"; // Ensure this import is correct
import { useRouter } from "next/navigation";
import { useState } from "react";

type Species = Database["public"]["Tables"]["species"]["Row"];

interface DeleteSpeciesProps {
  species: Species;
}

export default function DeleteSpecies({ species }: DeleteSpeciesProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    const supabase = createBrowserSupabaseClient(); // No type argument needed
    const { error } = await supabase.from("species").delete().eq("id", species.id);

    if (error) {
      return toast({
        title: "Something went wrong.",
        description: error.message,
        variant: "destructive",
      });
    }

    setOpen(false);
    router.refresh();
    return toast({
      title: "Species deleted!",
      description: `Successfully deleted ${species.scientific_name}.`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete Species</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Species</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete {species.scientific_name}? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end space-x-2">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            variant="destructive"
            onClick={() => {
              handleDelete().catch((error) => {
                console.error("Error deleting species:", error);
              });
            }}
          >
            Confirm Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
