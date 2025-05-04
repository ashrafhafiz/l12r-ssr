<?php

namespace App\Enum;

enum RolesEnum: string
{
    case Admin = 'admin';
    case Commenter = 'commenter';
    case User = 'user';

    public static function labels(): array
    {
        return [
            self::Admin->value => 'Admin',
            self::Commenter->value => 'Commenter',
            self::User->value => 'User',
        ];
    }

    public function label(): string
    {
        // return self::labels()[$this->value] ?? 'Unknown';
        return match ($this) {
            self::Admin => 'Admin',
            self::Commenter => 'Commenter',
            self::User => 'User',
        };
    }

    // public static function permissions(): array
    // {
    //     return [
    //         self::Admin->value => [
    //             PermissionsEnum::ManageFeatures->value,
    //             PermissionsEnum::ManageUsers->value,
    //             PermissionsEnum::ManageComments->value,
    //             PermissionsEnum::UpvoteDownvote->value,
    //             PermissionsEnum::ManageRoles->value,
    //             PermissionsEnum::ManagePermissions->value,
    //         ],
    //         self::Commenter->value => [
    //             PermissionsEnum::ManageComments->value,
    //             PermissionsEnum::UpvoteDownvote->value,
    //         ],
    //         self::User->value => [
    //             PermissionsEnum::UpvoteDownvote->value,
    //         ],
    //     ];
    // }

    // public static function getPermissions(string $role): array
    // {
    //     return self::permissions()[$role] ?? [];
    // }

    // public static function getLabel(string $role): string
    // {
    //     return self::labels()[$role] ?? 'Unknown';
    // }

    // public static function getRoles(): array
    // {
    //     return array_keys(self::labels());
    // }

    // public static function getRolesWithLabels(): array
    // {
    //     return self::labels();
    // }

    // public static function getRolesWithPermissions(): array
    // {
    //     return self::permissions();
    // }

    // public static function getRolesWithLabelsAndPermissions(): array
    // {
    //     return array_map(
    //         fn($permissions) => [
    //             'label' => self::getLabel($permissions),
    //             'permissions' => $permissions,
    //         ],
    //         self::getRolesWithPermissions()
    //     );
    // }

    // public static function getRolesWithLabelsAndPermissionsAsArray(): array
    // {
    //     return array_map(
    //         fn($permissions) => [
    //             'label' => self::getLabel($permissions),
    //             'permissions' => $permissions,
    //         ],
    //         self::getRolesWithPermissions()
    //     );
    // }

    // public static function getRolesWithLabelsAndPermissionsAsJson(): string
    // {
    //     return json_encode(self::getRolesWithLabelsAndPermissions());
    // }

    // public static function getRolesWithLabelsAndPermissionsAsJsonArray(): array
    // {
    //     return json_decode(self::getRolesWithLabelsAndPermissionsAsJson(), true);
    // }
}
