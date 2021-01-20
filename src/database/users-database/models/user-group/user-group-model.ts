import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { usersDBConnection } from '../../users-database';
import { USERS_GROUPS_COLLECTION_NAME } from './user-group-constants';
import { EUserGroupFields } from './user-group-enum';

const userGroupModelOptions = {
    existingConnection: usersDBConnection,
    schemaOptions: { collection: USERS_GROUPS_COLLECTION_NAME },
};

@modelOptions(userGroupModelOptions)
export class UserGroup {
    @prop({ required: true })
    public [EUserGroupFields.GroupCode]!: string;

    @prop({ required: true })
    public [EUserGroupFields.GroupName]!: string;
}

export const userGroupModel = getModelForClass(UserGroup);