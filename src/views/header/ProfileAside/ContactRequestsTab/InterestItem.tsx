"use client";

import { Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../../../../components/ui/button";
import { Loader } from "../../../../components/ui/loader";
import { Interest } from "../../../../actions/types/Modals";
import Text from "../../../../components/Text";
import { useState } from "react";
import deleteInterestAction from "../../../../actions/contactRequest/deleteInterest";
import { useUser } from "../../../../contexts/UserContext";
import { toast } from "sonner";
import { useProfile } from "@/contexts/ProfileContext";

interface InterestItemProps {
  interest: Interest;
  contactRequestId: string;
}

export default function InterestItem({
  interest,
  contactRequestId,
}: InterestItemProps) {
  const [loading, setLoading] = useState(false);
  const { getUser } = useUser();
  const { closeProfile } = useProfile()


  const removeInterest = async (contactReqId: string, interestId: string) => {
    setLoading(true);
    try {
      const result = await deleteInterestAction({
        contactReqId: contactReqId,
        interestId: interestId,
      });
      await getUser({ load: false });
      if (result.status === "error") {
        toast.error(result.message, {
          closeButton: true,
          duration: 5000,
        });
      }
    } catch (error) {
      toast.error("Erro ao tentar remover interesse", {
        closeButton: true,
        duration: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-linear-to-r from-primary to-secondary hover:opacity-75 transition-colors shadow-xs rounded-md px-3 py-5 flex flex-col gap-3 border border-border/50 relative group">
      <div className="absolute top-2 right-2 h-5 flex items-center justify-end">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full text-white"
          onClick={() => removeInterest(contactRequestId, interest.id)}
          disabled={loading}
        >
          {loading ? (
            <Loader className="h-4 w-4" />
          ) : (
            <Trash2 className="h-4 w-4" />
          )}
        </Button>
      </div>
      <Link
        href={interest.property?.id ? `/property/${interest.property.id}` : "#"}
        className={`flex-1 flex gap-3 ${
          !interest.property ? "pointer-events-none cursor-default" : ""
        }`}
        onClick={closeProfile}
      >
        <div className="relative w-16 h-16 rounded-md overflow-hidden shrink-0">
          <Image
            src={
              interest.property?.coverImg?.url ||
              "/images/apartament-placeholder1.jpg"
            }
            alt={interest.property?.title || "Imóvel indisponível"}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="flex-1 min-w-0 flex flex-col justify-center">
          <Text size="small" className="font-medium line-clamp-2">
            {interest.property?.title || "Imóvel indisponível"}
          </Text>
          {interest.property?.address && (
            <Text size="smaller" className="text-muted-foreground mt-1">
              {interest.property.address.city},{" "}
              {interest.property.address.state}
            </Text>
          )}
        </div>
      </Link>
    </div>
  );
}
