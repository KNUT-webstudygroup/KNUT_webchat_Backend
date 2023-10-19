import type {ColumnType} from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
	? ColumnType<S, I | undefined, U>
	: ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type AccountFindQuest = {
	userId: number;
	loginId: string;
	email: string;
	questindex: number;
	quest: string;
	answer: string;
};
export type Group = {
	id: Generated<number>;
	name: string;
	desc: string;
	admin: number;
	capacity: number;
	total: number;
	createdAt: Generated<Timestamp>;
};
export type GroupChatsImage = {
	imageLinkId: number;
	count: number;
	link: string;
};
export type GroupProfile = {
	id: Generated<number>;
	name: string;
	desc: string;
};
export type GroupTags = {
	groupId: number;
	groupTag: string;
};
export type Message = {
	id: Generated<number>;
	content: string;
	sender: number;
	groupId: number;
	imageLinkId: number | null;
	sendTime: Generated<Timestamp>;
};
export type User = {
	id: Generated<number>;
	loginId: string;
	pw: string;
	email: string;
	phone: string | null;
	createdAt: Generated<Timestamp>;
	updatedAt: Generated<Timestamp>;
};
export type UserGroup = {
	userid: number;
	groupId: number;
};
export type DB = {
	AccountFindQuest: AccountFindQuest;
	GroupChatsImage: GroupChatsImage;
	GroupProfile: GroupProfile;
	GROUPS: Group;
	GroupTags: GroupTags;
	MESSAGES: Message;
	UserGroup: UserGroup;
	USERS: User;
};
