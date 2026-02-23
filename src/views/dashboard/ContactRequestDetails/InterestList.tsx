import { Interest } from "../../../actions/types/Modals";
import Properties from "../../../components/properties";
import Text from "../../../components/Text";

interface InterestListProps {
  interests: Interest[];
}

export default function InterestList({ interests }: InterestListProps) {
  if (!interests || interests.length === 0) {
    return (
      <Text
        size="big"
        className="p-4 bg-tertiary/20 rounded-lg text-center text-muted-foreground"
      >
        Nenhum interesse registrado.
      </Text>
    );
  }

  const properties = interests.map((interest) => {
    return interest.property;
  });

  return <Properties properties={properties} />;
}
