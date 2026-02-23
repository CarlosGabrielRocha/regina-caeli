import { ContactRequest } from "../../../../actions/types/Modals";
import { Home } from "lucide-react";
import InterestItem from "./InterestItem";

export default function InterestsArea({
  request,
}: {
  request?: ContactRequest;
}) {
  return (
    <div className="space-y-3">
      <h4 className="text-sm font-semibold flex items-center gap-2">
        <Home className="w-4 h-4" />
        Interesses
      </h4>

      {request?.interests && request?.interests.length > 0 ? (
        request?.interests.map((interest) => (
          <InterestItem
            key={interest.id}
            interest={interest}
            contactRequestId={request.id}
          />
        ))
      ) : (
        <p className="text-sm text-muted-foreground">
          Nenhum interesse associado a esta solicitação.
        </p>
      )}
    </div>
  );
}
