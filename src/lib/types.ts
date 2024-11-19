export type SnippetWithUser = {
	id: string;
	user_id: string;
	title: string;
	description: string;
	username: string;
	email: string;
	avatar: string;
	created_at: string;
	updated_at: string;
	language: string;
	code: string;
}

export type APIResponse = {
	status: boolean;
	message: string;
	data: any
}

export type AuthUser = {
	id: string;
	username: string;
	auth_token: string;
	email: string;
	avatar: string;
	created_at: string;
	updated_at: string;
}

export type AuthResponse = {
	status: string;
	message: string;
	data: AuthUser
}
