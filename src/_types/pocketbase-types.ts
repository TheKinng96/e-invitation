/**
* This file was @generated using pocketbase-typegen
*/

export enum Collections {
	Comments = "comments",
	Images = "images",
	Likes = "likes",
	Messages = "messages",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type CommentsRecord = {
	content: string
	user?: RecordIdString
}

export type ImagesRecord = {
	user: RecordIdString
	title?: string
	aspect_ratio?: string
	height?: number
	image: string
}

export type LikesRecord = {
	image?: RecordIdString
	user?: RecordIdString
}

export type MessagesRecord = {
	text: HTMLString
	user: RecordIdString
}

export type UsersRecord = {
	avatar?: string
	attending: string
	name: string
}

// Response types include system fields and match responses from the PocketBase API
export type CommentsResponse<Texpand = unknown> = CommentsRecord & BaseSystemFields<Texpand>
export type ImagesResponse<Texpand = unknown> = ImagesRecord & BaseSystemFields<Texpand>
export type LikesResponse<Texpand = unknown> = LikesRecord & BaseSystemFields<Texpand>
export type MessagesResponse<Texpand = unknown> = MessagesRecord & BaseSystemFields<Texpand>
export type UsersResponse = UsersRecord & AuthSystemFields

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	comments: CommentsRecord
	images: ImagesRecord
	likes: LikesRecord
	messages: MessagesRecord
	users: UsersRecord
}

export type CollectionResponses = {
	comments: CommentsResponse
	images: ImagesResponse
	likes: LikesResponse
	messages: MessagesResponse
	users: UsersResponse
}