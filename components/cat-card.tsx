import {
  Card,
  CardBody,
  CardButton,
  CardImage,
  InfoLine,
  Label,
} from "@/components/cat-card.styles";
import type { CatCardData } from "@/lib/types";

type CatCardProps = {
  cat: CatCardData;
  buttonText: string;
  onButtonClick: (cat: CatCardData) => void;
};

export function CatCard({ cat, buttonText, onButtonClick }: CatCardProps) {
  return (
    <Card>
      <CardImage src={cat.imageUrl} alt={cat.breed} />
      <CardBody>
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
        <CardButton type="button" onClick={() => onButtonClick(cat)}>
          {buttonText}
        </CardButton>
      </CardBody>
    </Card>
  );
}
