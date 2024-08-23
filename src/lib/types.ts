export type SnippetWithUser = {
	id: string;
	user_id: string;
	title: string;
	description: string;
	language: string;
	code: string;
	username: string;
	email: string;
	created_at: string;
	updated_at: string;
}

export type APIResponse = {
	status: boolean;
	message: string;
	data: any
}
