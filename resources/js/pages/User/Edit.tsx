import { User, type BreadcrumbItem } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import Heading from '@/components/heading';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import DeleteUserByAdmin from '@/components/delete-user-by-admin';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Edit User',
    href: '/users/edit',
  },
];

type ProfileForm = {
  name: string;
  email: string;
  role: string;
}

export default function Edit({ user, roles, roleLabels }: { user: User, roles: any, roleLabels: Record<string, string> }) {
  // const { auth } = usePage<SharedData>().props;

  const { data, setData, patch, errors, processing, recentlySuccessful } = useForm<Required<ProfileForm>>({
    name: user.name,
    email: user.email,
    role: user.roles[0],
  });

  // const [selectedOption, setSelectedOption] = useState(user.roles[0]);

  console.log(user);

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    patch(route('users.update', user.id), {
      preserveScroll: true,
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Edit User Data" />

      <div className="px-4 py-6">
        <Heading title="Settings" description="Manage your profile and account settings" />

        <div className="flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:space-x-12">

          <div className="flex-1 md:max-w-2xl">
            <section className="max-w-xl space-y-12">

              <div className="space-y-6">
                <HeadingSmall title="User information" description="Update user name and email address" />

                <form onSubmit={submit} className="space-y-6">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>

                    <Input
                      id="name"
                      className="mt-1 block w-full"
                      value={data.name}
                      onChange={(e) => setData('name', e.target.value)}
                      required
                      autoComplete="name"
                      placeholder="Full name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="email">Email address</Label>

                    <Input
                      id="email"
                      type="email"
                      className="mt-1 block w-full"
                      value={data.email}
                      onChange={(e) => setData('email', e.target.value)}
                      required
                      autoComplete="username"
                      placeholder="Email address"
                    />

                    <InputError className="mt-2" message={errors.email} />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="email">Role</Label>

                    <Select value={data.role} onValueChange={(value) => setData('role', value)}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Select a role:</SelectLabel>
                          {
                            roles.map((role: any) => (
                              <SelectItem key={role.id} value={role.name}>
                                {roleLabels[role.name]}
                              </SelectItem>
                            ))
                          }
                        </SelectGroup>
                      </SelectContent>
                    </Select>

                    <InputError className="mt-2" message={errors.email} />
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

              <DeleteUserByAdmin user={user} />

            </section>
          </div>
        </div>
      </div>

    </AppLayout>
  );
}
