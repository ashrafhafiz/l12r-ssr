import AppLayout from '@/layouts/app-layout';
import { Feature, type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';

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
    title: 'Edit Feature',
    href: '/features/edit',
  },
];

type EditForm = {
  name: string;
  description: string;
}

export default function Edit({ feature }: { feature: Feature }) {

  // const { auth } = usePage<SharedData>().props;
  const nameInput = useRef<HTMLInputElement>(null);
  const descriptionInput = useRef<HTMLTextAreaElement>(null);

  const { data, setData, put, errors, processing, recentlySuccessful } = useForm<Required<EditForm>>({
    name: feature.name,
    description: feature.description,
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    put(route('features.update', feature.id), {
      preserveScroll: true,
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Edit Feature" />

      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold">Edit Feature</h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            This is where you can edit feature.
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
              />

              <InputError className="mt-2" message={errors.description} />
            </div>

            <div className="flex items-center gap-4">
              <Button disabled={processing}>Update</Button>

              <Transition
                show={recentlySuccessful}
                enter="transition ease-in-out"
                enterFrom="opacity-0"
                leave="transition ease-in-out"
                leaveTo="opacity-0"
              >
                <p className="text-sm text-neutral-600">Updated</p>
              </Transition>
            </div>
          </form>

        </div>
      </div>
    </AppLayout>
  );
}
