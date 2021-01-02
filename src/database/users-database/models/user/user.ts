import { User, userModel } from './user-model';
import { EUserFields } from './user-enum';
import { encryptPassword } from './user-utils';

export const getUserByLogin = async (userLogin: string) => (
    await userModel.findOne({ [EUserFields.Login]: userLogin }).select(`-${EUserFields.Password}`)
);

export const getUserById = async (id: string) => (
    await userModel.findById(id).select(`-${EUserFields.Password}`)
);

export const authUser = async (userLogin: string, userPassword: string) => (
    await userModel.findOne({
        [EUserFields.Login]: userLogin,
        [EUserFields.Password]: encryptPassword(userPassword),
    }).select(`-${EUserFields.Password}`)
);

export const createUser = async (user: User) => {
    const userByLogin = await getUserByLogin(user.login);

    if (userByLogin) {
        throw new Error(`Login ${userByLogin} already exist`);
    }

    return await userModel.create({ ...user, password: encryptPassword(user.password)});
};

export const updateUser = async (userLogin: string, userPassword: string, userData: Partial<User>) => {
    const userIsAuthentificated = await authUser(userLogin, userPassword);

    if (!userIsAuthentificated) {
        throw new Error('User is not authentificated');
    }

    return await userModel.findOneAndUpdate(
        { [EUserFields.Login]: userLogin },
        userData,
        { upsert: true, new: true, setDefaultsOnInsert: true },
    ).select(`-${EUserFields.Password}`);
};