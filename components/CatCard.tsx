// Member: Yuchen Bao
// CatCard component

import {
  Card,
  CardBody,
  CardButton,
  CardImage,
  InfoLine,
  Label,
} from "@/components/CatCard.styles";
import type { CatCardData } from "@/lib/types";

type CatCardProps = {
  cat: CatCardData;
  buttonText: string;
  onButtonClick: (cat: CatCardData) => void;
};

export function CatCard({ cat, buttonText, onButtonClick }: CatCardProps) {
  return (
    <Card>
      {/* cat img */}
      <CardImage src={cat.imageUrl} alt={cat.breed} />
      <CardBody>
        {/* cat info */}
        <InfoLine>
          <Label>Breed:</Label> {cat.breed}
        </InfoLine>
        <InfoLine>
          <Label>Life span:</Label> {cat.lifeSpan}
        </InfoLine>
        <InfoLine>
          <Label>Temperament:</Label> {cat.temperament}
        </InfoLine>
        <InfoLine>
          <Label>ID:</Label> {cat.id}
        </InfoLine>
        {/* like button */}
        <CardButton type="button" onClick={() => onButtonClick(cat)}>
          {buttonText}
        </CardButton>
      </CardBody>
    </Card>
  );
}
