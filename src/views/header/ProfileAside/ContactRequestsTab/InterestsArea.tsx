import { ContactRequest } from "../../../../actions/types/Modals";
import { Home } from "lucide-react";
import InterestItem from "./InterestItem";
import Text from "@/components/Text";

export default function InterestsArea({
  request,
}: {
  request?: ContactRequest;
}) {
  return (
    <div className="space-y-3">
      <Text type="h4" className="text-sm font-semibold flex items-center gap-2">
        <Home className="size-4 2xl:size-5 3xl:size-6" />
        Interesses
      </Text>

      {request?.interests && request?.interests.length > 0 ? (
        request?.interests.map((interest) => (
          <InterestItem
            key={interest.id}
            interest={interest}
            contactRequestId={request.id}
          />
        ))
      ) : (
        <Text className="text-muted-foreground">
          Nenhum interesse associado a esta solicitação.
        </Text>
      )}
    </div>
  );
}
