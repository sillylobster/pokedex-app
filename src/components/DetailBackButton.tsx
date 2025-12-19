import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface DetailBackButtonProps {
  onBack: () => void;
}

export const DetailBackButton = ({ onBack }: DetailBackButtonProps) => (
  <Button onClick={onBack} variant="outline" className="mb-6">
    <ArrowLeft className="mr-2 h-4 w-4" />
    Back to Pokédex
  </Button>
);
