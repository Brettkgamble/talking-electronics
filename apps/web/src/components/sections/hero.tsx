import type { PagebuilderType } from "@/types";
import { SanityButtons } from "../sanity-buttons";
import { Button } from "@workspace/ui/components/button";
import { Badge } from "@workspace/ui/components/badge";
import { ArrowDownRight } from "lucide-react";

type HeroBlockProps = PagebuilderType<"hero">;

export function HeroBlock({
  title,
  buttons,
  badge,
  image,
}: HeroBlockProps) {
  return (
    <section className="py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <Badge variant="outline">{badge}</Badge>
            <h1 className="my-6 text-pretty text-4xl font-bold lg:text-6xl">
              {title}
            </h1>
            <p className="mb-8 max-w-xl text-muted-foreground lg:text-xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Elig doloremque mollitia fugiat omnis! Porro facilis quo
              animi consequatur. Explicabo.
            </p>
            <SanityButtons
              buttons={buttons}
              buttonClassName="w-full sm:w-auto"
              className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start"
            />
          </div>
          <div className="h-96 w-full">
            <img
              src="https://shadcnblocks.com/images/block/placeholder-1.svg"
              alt="placeholder hero"
              className="max-h-96 w-full rounded-md object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}


