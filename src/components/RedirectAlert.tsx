import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { X } from "lucide-react";
import { Button } from "./ui/button";
import Text from "./Text";

interface RedirectAlertProps {
  title: string;
  description: string;
  redirectText: string;
  onRedirect: () => void;
  onClose?: () => void;
}

export default function RedirectAlert({
  title,
  description,
  redirectText,
  onRedirect,
  onClose,
}: RedirectAlertProps) {
  return (
    <Alert className="relative flex flex-col justify-between gap-3 pr-8">
      {onClose && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2 h-6 w-6 text-muted-foreground hover:bg-transparent"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Fechar</span>
        </Button>
      )}
      <div className="flex-1 gap-2">
        <AlertTitle>
          <Text type="h1" size="medium">
            {title}
          </Text>
        </AlertTitle>
        <AlertDescription>
          <Text type="p" size="medium">
            {description}
          </Text>
        </AlertDescription>
      </div>
      <Button variant="outline" className="w-fit" onClick={onRedirect}>
        <Text type="span" size="small">
          {redirectText}
        </Text>
      </Button>
    </Alert>
  );
}
