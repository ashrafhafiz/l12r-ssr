import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    created_at_human: string;
    updated_at: string;
    updated_at_human: string;
    permissions: string[];
    roles: string[];
    [key: string]: unknown; // This allows for additional properties...
}

export interface Comment {
    id: number;
    comment: string;
    feature_id: number;
    user_id: number;
    user: User;
    feature: Feature;
    created_at: string;
    created_at_human: string;
    updated_at: string;
    updated_at_human: string;
}

export interface Feature {
    id: number;
    name: string;
    description: string;
    created_at: string;
    created_at_human: string;
    updated_at: string;
    updated_at_human: string;
    upvote_count: number;
    user_upvoted: boolean;
    user_downvoted: boolean;
    user_id: number;
    user: User;
    comments: Comment[];
}

export interface Features {
    data: Feature[];
    links: {
        first: string | null;
        last: string | null;
        prev: string | null;
        next: string | null;
    };
    meta: {
        current_page: number;
        from: number;
        last_page: number;
        links: {
            active: boolean;
            label: string | null;
            url: string | null;
        }[];
        per_page: number;
        to: number;
        total: number;
    };
}

// export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
//     auth: {
//         user: User;
//     };
//     ziggy: Config & { location: string };
// };
