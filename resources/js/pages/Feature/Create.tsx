import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Transition } from '@headlessui/react';
import { FormEventHandler, useRef } from 'react';
import { TextInput } from '@/components/ui/text-input';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Features',
    href: '/features',
  },
  {
    title: 'Create New Feature',
    href: '/features/create',
  },
];

type CreateForm = {
  name: string;
  description: string;
}

export default function Create() {

  // const { auth } = usePage<SharedData>().props;
  const success: string = usePage().props.success;

  const nameInput = useRef<HTMLInputElement>(null);
  const descriptionInput = useRef<HTMLTextAreaElement>(null);

  const { data, setData, post, errors, processing, recentlySuccessful } = useForm<Required<CreateForm>>({
    name: '',
    description: '',
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route('features.store'), {
      preserveScroll: true,
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Create New Feature" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold">Create New Feature</h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            This is where you can create a new feature.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4">

          <form onSubmit={submit} className="space-y-6">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>

              <Input
                id="name"
                ref={nameInput}
                className="mt-1 block w-full"
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                required
                autoComplete="name"
                placeholder="Feature name"
              />

              <InputError className="mt-2" message={errors.name} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Description</Label>

              <TextInput
                id="description"
                ref={descriptionInput}
                rows={4}
                className="mt-1 block w-full"
                value={data.description}
                onChange={(e) => setData('description', e.target.value)}
                placeholder="Feature description"
              />

              <InputError className="mt-2" message={errors.description} />
            </div>

            <div className="flex items-center gap-4">
              <Button disabled={processing}>Save</Button>

              <Transition
                show={recentlySuccessful}
                enter="transition ease-in-out"
                enterFrom="opacity-0"
                leave="transition ease-in-out"
                leaveTo="opacity-0"
              >
                <p className="text-sm text-neutral-600">Saved</p>
              </Transition>
            </div>
          </form>

        </div>
      </div>
    </AppLayout>
  );
}
