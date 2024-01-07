import userModel from 'api/src/models/user.model';

export const createUser = async (data) => {
  try {
    const user = await userModel.create({
      email: data.email,
      password: data.password,
      profile: {
        firstName: data.firstName,
        lastName: data.lastName,
      },
    });

    return { data: user };
  } catch (error) {
    return {
      error: error.message,
    };
  }
};
