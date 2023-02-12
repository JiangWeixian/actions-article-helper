export interface Comment {
    id: number;
    body?: string;
    user: {
        login: string;
    } | null;
    created_at: string;
}
