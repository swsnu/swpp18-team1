export class User {
    id?: number;
    is_manager: boolean;

    // for manager
    email?: string;
    password?: string;
    key?: string;

    // for user
    nickname?: string;
    profile_picture?: string;
}
