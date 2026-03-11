import Text from "@/components/Text";
import { CheckCircle, Clock, Info } from "lucide-react";

export default function StatusBadge({ status }: { status: string }) {
  const styles = {
    pending: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    done: "bg-green-500/10 text-green-500 border-green-500/20",
    inProgress: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    rejected: "bg-red-500/10 text-red-500 border-red-500/20",
  };

  const labels = {
    pending: "Pendente",
    done: "Concluído",
    inProgress: "Em Progresso",
  };

  const Icons = {
    pending: Clock,
    done: CheckCircle,
    inProgress: Info,
  };

  const Icon = Icons[status as keyof typeof Icons] || Info;

  const currentStyle =
    styles[status as keyof typeof styles] ||
    "bg-gray-500/10 text-gray-500 border-gray-500/20";
  const label = labels[status as keyof typeof labels] || status;

  return (
    <Text size="smaller"
      className={`flex items-center gap-1 px-2.5 py-1 rounded-full font-medium border ${currentStyle}`}
    >
      <Icon className="size-3 2xl:size-4 3xl:size-5" />
      <Text type="span">{label}</Text>
    </Text>
  );
}