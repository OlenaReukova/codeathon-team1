'use client';

import {
  BarChart,
  Compass,
  Layout,
  List,
  UserCog,
  Building2,
  ShieldQuestion,
} from 'lucide-react';
import { usePathname } from 'next/navigation';

import { SidebarItem } from './sidebar-item';

const guestRoutes = [
  {
    icon: BarChart,
    label: 'Analytics',
    href: '/dashboard',
  },
  {
    icon: Building2,
    label: 'Verified Companies',
    href: '/dashboard/verified-companies',
  },
  {
    icon: Compass,
    label: 'Browse',
    href: '/dashboard/search',
  },
];

const adminRoutes = [
  {
    icon: List,
    label: 'Campaigns',
    href: '/dashboard/admin/campaigns',
  },
  {
    icon: ShieldQuestion,
    label: 'UnVerified Companies',
    href: '/dashboard/admin/unverified-companies',
  },
];

export const SidebarRoutes = () => {
  const pathname = usePathname();

  const isAdminPage = pathname?.includes('/dashboard/admin');

  const routes = isAdminPage ? adminRoutes : guestRoutes;

  return (
    <div className='flex flex-col w-full'>
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
};
