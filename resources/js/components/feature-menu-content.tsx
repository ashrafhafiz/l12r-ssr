import { DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { Feature } from '@/types';
import { Link } from '@inertiajs/react';
import { Pencil, Trash2 } from 'lucide-react';

interface FeatureMenuContentProps {
  feature: Feature;
}

export function FeatureMenuContent({ feature }: FeatureMenuContentProps) {
  const cleanup = useMobileNavigation();

  return (
    <>
      <DropdownMenuGroup>
        <DropdownMenuItem asChild>
          <Link className="block w-full" href={route('features.edit', feature.id)} as="button" prefetch onClick={cleanup}>
            <Pencil className="mr-2" />
            Edit
          </Link>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem asChild>
        <Link className="block w-full" method="delete" href={route('features.destroy', feature.id)} as="button" onClick={cleanup}>
          <Trash2 className="mr-2" />
          Delete
        </Link>
      </DropdownMenuItem>
    </>
  );
}
