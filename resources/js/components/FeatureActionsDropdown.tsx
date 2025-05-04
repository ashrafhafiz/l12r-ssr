import { Feature } from "@/types";
import { Ellipsis } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { FeatureMenuContent } from "./feature-menu-content";

export default function FeatureActionsDropdown({ feature }: { feature: Feature }) {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="size-10 rounded-full p-1 flex items-start justify-center">
          <Ellipsis />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-32" align="end">
        <FeatureMenuContent feature={feature} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
