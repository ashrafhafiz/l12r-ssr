import AppLayout from '@/layouts/app-layout';
import { SharedData, User, type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { UserPen } from 'lucide-react';
// import { Plus } from 'lucide-react';
import { useEffect } from 'react';
import { Toaster, toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Users',
    href: '/users',
  },
];

export default function Index({ users }: { users: User[] }) {
  // const currentUser: User = usePage<SharedData>().props.auth.user;
  const { success } = usePage<SharedData>().props;

  useEffect(() => {
    if (success) {
      toast.success(success as string);
    }

  }, [success])

  // console.log(users);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Toaster position='top-right' richColors duration={2000} />
      <Head title="Users" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div className="flex">
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold">Users</h1>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              This is a list of users registered in the application.
            </p>
          </div>

        </div>

        <div className="grid grid-cols-1 gap-4">

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    User name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Created At
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Roles
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  users.map((user) => (
                    <tr key={user.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {user.name}
                      </th>
                      <td className="px-6 py-4">
                        {user.email}
                      </td>
                      <td className="px-6 py-4">
                        {user.created_at_human}
                      </td>
                      <td className="px-6 py-4">
                        {user.roles && user.roles.join(', ')}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <Link href={route('users.edit', user.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline"><UserPen /></Link>
                      </td>
                    </tr>
                  ))
                }

              </tbody>
            </table>
          </div>

        </div>
      </div>
    </AppLayout>
  );
}
