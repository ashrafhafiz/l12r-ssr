import { Feature } from '@/types';
import { useForm } from '@inertiajs/react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Transition } from '@headlessui/react';
import { FormEventHandler, useRef } from 'react';

type FeatureNewCommentForm = {
  comment: string;
  feature_id: number;
}

export default function FeatureNewCommentForm({ feature }: { feature: Feature }) {

  const commentInput = useRef<HTMLInputElement>(null);

  const { data, setData, post, errors, processing, recentlySuccessful } = useForm<Required<FeatureNewCommentForm>>({
    comment: '',
    feature_id: feature.id,
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route('comments.store', feature.id), {
      preserveScroll: true,
      preserveState: true,
      onSuccess: () => {
        setData('comment', '');
        commentInput.current?.focus();
      },
    });
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      <form onSubmit={submit} className="space-y-6">
        <div className="grid gap-2">
          <Label htmlFor="name">Comment</Label>

          <Input
            id="comment"
            ref={commentInput}
            className="mt-1 block w-full"
            value={data.comment}
            onChange={(e) => setData('comment', e.target.value)}
            required
            autoComplete="comment"
            placeholder="Add comment..."
          />

          <InputError className="mt-2" message={errors.comment} />
        </div>

        <div className="flex items-center gap-4">
          <Button disabled={processing}>Submit</Button>

          <Transition
            show={recentlySuccessful}
            enter="transition ease-in-out"
            enterFrom="opacity-0"
            leave="transition ease-in-out"
            leaveTo="opacity-0"
          >
            <p className="text-sm text-neutral-600">Submited</p>
          </Transition>
        </div>
      </form>
    </div>
  );
}
