import { getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { usersDBConnection } from '../../users-database';
import { UserGroup } from '../user-group';
import { USERS_COLLECTION_NAME } from './user-constants';
import { EUserFields } from './user-enum';

const usersModelOptions = {
    existingConnection: usersDBConnection,
    schemaOptions: { collection: USERS_COLLECTION_NAME },
};

@modelOptions(usersModelOptions)
export class User {
    @prop({ required: true })
    public [EUserFields.Email]!: string;

    @prop({ required: true })
    public [EUserFields.Password]!: string;

    @prop({ required: true })
    public [EUserFields.FirstName]!: string;

    @prop({ required: true })
    public [EUserFields.SecondNameName]!: string;

    @prop({ ref: () => UserGroup, required: true })
    public [EUserFields.UserGroupCode]!: Ref<UserGroup>;
}

export const userModel = getModelForClass(User);