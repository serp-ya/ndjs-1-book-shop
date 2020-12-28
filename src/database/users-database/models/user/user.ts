import { User, userModel } from './user-model';
import { EUserFields } from './user-enum';
import { encryptPassword } from './user-utils';

const checkEmailIsExist = async (userEmail: string) => (
    await userModel.findOne({ [EUserFields.Email]: userEmail })
);

export const authUser = async (userEmail: string, userPassword: string) => (
    await userModel.findOne({
        [EUserFields.Email]: userEmail,
        [EUserFields.Password]: encryptPassword(userPassword),
    })
);

export const createUser = async (user: User) => {
    const emailIsExist = await checkEmailIsExist(user.email);

    if (emailIsExist) {
        throw new Error(`Email ${emailIsExist} already exist`);
    }

    return await userModel.create(user);
};

export const updateUser = async (userEmail: string, userPassword: string, userData: Partial<User>) => {
    const userIsAuthentificated = await authUser(userEmail, userPassword);

    if (!userIsAuthentificated) {
        throw new Error('User is not authentificated');
    }

    return await userModel.findOneAndUpdate(
        { [EUserFields.Email]: userEmail },
        userData,
        { upsert: true, new: true, setDefaultsOnInsert: true },
    );
};