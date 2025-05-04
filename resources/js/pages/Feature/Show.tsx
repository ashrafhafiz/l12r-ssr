import AppLayout from '@/layouts/app-layout';
import { Feature, SharedData, User, type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';

import FeatureItem from '@/components/FeatureItem';
import FeatureNewCommentForm from '@/components/FeatureNewCommentForm';
import FeatureCommentItem from '@/components/FeatureCommentItem';
import { useEffect } from 'react';
import { toast, Toaster } from 'sonner';
import { can } from '@/helper';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Features',
    href: '/features',
  },
  {
    title: 'Show Feature',
    href: '/features/show',
  },
];

export default function Show({ feature }: { feature: Feature }) {

  const user: User = usePage<SharedData>().props.auth.user;
  const { success, error } = usePage().props;

  useEffect(() => {
    if (success) {
      toast.success(success as string);
    }
    if (error) {
      toast.error(error as string);
    }

  }, [success, error])

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Edit Feature" />
      <Toaster position='top-right' richColors duration={2000} />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold">Show Feature</h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            This is where you can show feature details.
          </p>
        </div>

        <div className="flex flex-col gap-4 rounded-xl border border-neutral-200 bg-slate-100 p-4 shadow-sm dark:border-neutral-700 dark:bg-neutral-800">
          <FeatureItem feature={feature} />


          <div className='ml-24 flex flex-col gap-8'>
            {
              can(user, 'manage_comments') && <FeatureNewCommentForm feature={feature} />
            }
            {
              feature.comments ? feature.comments.map((comment) => (
                <FeatureCommentItem key={comment.id} comment={comment} />
              )) : <p className="text-sm text-neutral-500 dark:text-neutral-400">No comments yet.</p>
            }
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
