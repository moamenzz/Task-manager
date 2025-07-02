import { NOT_FOUND } from "../constants/HttpStatusCode";
import UserModel from "../models/user.model";
import { editProfileSchema } from "../schemas/auth.schema";
import { editUserProfile } from "../services/user.service";
import appAssert from "../utils/AppAssert";
import catchErrors from "../utils/catchError";

export const getUser = catchErrors(async (req, res) => {
  const userId = req.userId;
  const user = await UserModel.findById(userId);
  appAssert(user, NOT_FOUND, "User not found");

  res.status(200).json(user.omitPassword());
});

export const handleEditProfile = catchErrors(async (req, res) => {
  const userId = req.userId;
  const data = editProfileSchema.parse(req.body);

  const { user } = await editUserProfile(userId, data);

  res.status(200).json(user);
});
