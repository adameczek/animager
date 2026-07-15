import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getRandomAnimalUrl } from "@/lib/serverUtils";

export type AnimalCardProps = {
  name: string;
  breed?: string;
  age?: number;
  imageUrl?: string;
  dietType?: string;
  lastVetVisit?: string;
};
export default function AnimalCard({
  name,
  breed,
  age,
  imageUrl,
  dietType,
  lastVetVisit,
}: AnimalCardProps) {
  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0">
      <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
      <Image
        src={imageUrl ?? getRandomAnimalUrl()}
        alt={name}
        className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
      />
      <CardHeader>
        {age && (
          <CardAction>
            <Badge variant="secondary">{age} years old.</Badge>
          </CardAction>
        )}

        <CardTitle>{name}</CardTitle>
        <CardContent>
          <ul className="grid gap-2 py-2 text-sm">
            {breed && (
              <li>
                <strong>Breed:</strong> {breed}
              </li>
            )}
            {dietType && (
              <li>
                <strong>Diet Type:</strong> {dietType}
              </li>
            )}
            {lastVetVisit && (
              <li>
                <strong>Last Vet Visit:</strong> {lastVetVisit}
              </li>
            )}
          </ul>
        </CardContent>
      </CardHeader>
      <CardFooter>
        <Button className="w-full">View Event</Button>
      </CardFooter>
    </Card>
  );
}
