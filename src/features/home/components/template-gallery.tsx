"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { templates } from "@/constants/templates";
import { useCreateDocument } from "@/features/documents/hooks/use-create-document";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export const TemplateGallery = () => {
  const router = useRouter();
  const isCreating = false;
  const { createDocument } = useCreateDocument();

  const handleCreateDocument = async (template: {
    label: string;
    initialContent: string;
  }) => {
    const document = await createDocument({
      title: template.label + " - " + new Date().toISOString(),
      initialContent: template.initialContent,
    });
    router.push(`/documents/${document.id}`);
  };

  return (
    <div className="bg-gray-100">
      <div className="max-w-screen-xl mx-auto px-16 py-6 flex flex-col gap-4">
        <h3 className="text-2xl font-bold">Start a new document</h3>
        <Carousel>
          <CarouselContent className="-ml-4">
            {templates.map(({ id, label, imageUrl }) => (
              <CarouselItem
                key={id}
                className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
              >
                <div
                  className={cn(
                    "aspect-[3/4] flex flex-col gap-y-2",
                    isCreating && "opacity-50 pointer-events-none"
                  )}
                >
                  <button
                    disabled={isCreating}
                    onClick={() => {
                      handleCreateDocument({
                        label,
                        initialContent: "",
                      });
                    }}
                    className={`flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat size-full hover:border-blue-500 hover:bg-blue-500/10`}
                    style={{
                      backgroundImage: `url(${imageUrl})`,
                    }}
                  />
                  <p className="text-sm font-medium truncate">{label}</p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};
