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

export const getUserWithEmail = async (email) => {
  try {
    const user = await userModel.findOne({
      email,
    });

    if (user) {
      return { data: user };
    } else {
      return { error: `User with Email: ${email} not found!` };
    }
  } catch (error) {
    return {
      error: error.message,
    };
  }
};
