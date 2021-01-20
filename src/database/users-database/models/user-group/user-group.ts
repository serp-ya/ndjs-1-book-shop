import { userGroupModel } from './user-group-model';
import { EUserGroupFields } from './user-group-enum'

export const getUserGroupCode = async (userGroupId: string) => (
    await  await userGroupModel.findById(userGroupId).select(EUserGroupFields.GroupCode)
);
