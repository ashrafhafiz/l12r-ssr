import AuthLayoutTemplate from '@/layouts/auth/auth-simple-layout';
// import { usePage } from '@inertiajs/react';

export default function AuthLayout({ children, title, description, ...props }: { children: React.ReactNode; title: string; description: string }) {
  // const user = usePage().props;
  // console.log('user', user);
  return (
    <AuthLayoutTemplate title={title} description={description} {...props}>
      {children}
    </AuthLayoutTemplate>
  );
}
