import { getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { usersDBConnection } from '../../users-database';
import { EUserGroupCodes, UserGroup } from '../user-group';
import { USERS_COLLECTION_NAME } from './user-constants';
import { EUserFields } from './user-enum';

const usersModelOptions = {
    existingConnection: usersDBConnection,
    schemaOptions: { collection: USERS_COLLECTION_NAME },
};

@modelOptions(usersModelOptions)
export class User {
    @prop({ minlength: 3, required: true })
    public [EUserFields.FirstName]!: string;

    @prop({ minlength: 3, required: true })
    public [EUserFields.Login]!: string;

    @prop({ minlength: 3, required: true })
    public [EUserFields.Password]!: string;

    @prop({ minlength: 3, required: true })
    public [EUserFields.SecondNameName]!: string;

    @prop({ default: EUserGroupCodes.User })
    public [EUserFields.UserGroupCode]!: string;
}

export const userModel = getModelForClass(User);