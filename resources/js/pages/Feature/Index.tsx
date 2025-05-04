import FeatureItem from '@/components/FeatureItem';
import { Button } from '@/components/ui/button';
import { can } from '@/helper';
import AppLayout from '@/layouts/app-layout';
import { Features, SharedData, User, type BreadcrumbItem } from '@/types';
import { Head, Link, usePage, usePoll } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { useEffect } from 'react';
import { Toaster, toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Features',
    href: '/features',
  },
];

export default function Index({ features }: { features: Features }) {
  const user: User = usePage<SharedData>().props.auth.user;
  const { success } = usePage<SharedData>().props;

  usePoll(6000);

  useEffect(() => {
    if (success) {
      toast.success(success as string);
    }

  }, [success])

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Toaster position='top-right' richColors duration={2000} />
      <Head title="Features" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div className="flex">
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold">Features</h1>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              This is a list of features available in the application.
            </p>
          </div>
          {
            can(user, 'manage_features') &&
            <div className="ml-auto flex flex-col justify-center">
              <Link href={route('features.create')}>
                <Button className='cursor-pointer'><Plus />Create new feature</Button>
              </Link>
            </div>
          }
        </div>

        <div className="grid grid-cols-1 gap-4">
          {features.data.map((feature) => (
            <div key={feature.id} className="flex flex-col gap-4 rounded-xl border border-neutral-200 bg-slate-100 p-4 shadow-sm dark:border-neutral-700 dark:bg-neutral-800">
              <FeatureItem feature={feature} />
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
