import { Types } from "mongoose";
import UserModel from "../models/user.model";
import appAssert from "../utils/AppAssert";
import { BAD_REQUEST, NOT_FOUND } from "../constants/HttpStatusCode";
import bcrypt from "bcryptjs";

interface UserParams {
  avatar?: string;
  email?: string;
  username?: string;
  password?: string;
  newPassword?: string;
}

export const editUserProfile = async (
  userId: Types.ObjectId,
  data: UserParams
) => {
  const user = await UserModel.findById(userId);
  appAssert(user, NOT_FOUND, "User not found");

  //   user.avatar = data.avatar;
  if (data.email) {
    user.email = data.email;
  }

  if (data.username) {
    user.username = data.username;
  }

  if (data.password && data.newPassword && data.password !== data.newPassword) {
    appAssert(
      await bcrypt.compare(data.password, user.password),
      BAD_REQUEST,
      "Wrong password"
    );
  } else if (
    data.password &&
    data.newPassword &&
    data.password === data.newPassword
  ) {
    user.password = await bcrypt.hash(data.newPassword, 10);
  }

  await user.save();
  return { user };
};
