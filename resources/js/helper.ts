import { User } from './types';

export function can(user: User, permission: string): boolean {
    return user.permissions.includes(permission);
}

export function canAny(user: User, permissions: string[]): boolean {
    for (let i = 0; i < permissions.length; i++) {
        if (can(user, permissions[i])) {
            return true;
        }
    }
    return false;
}

export function canAll(user: User, permissions: string[]): boolean {
    for (let i = 0; i < permissions.length; i++) {
        if (!can(user, permissions[i])) {
            return false;
        }
    }
    return true;
}

export function hasRole(user: User, role: string): boolean {
    return user.roles.includes(role);
}

export function hasAnyRole(user: User, roles: string[]): boolean {
    for (let i = 0; i < roles.length; i++) {
        if (hasRole(user, roles[i])) {
            return true;
        }
    }
    return false;
}
