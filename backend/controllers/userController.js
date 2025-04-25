import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
export const registerUser = async (req, res) => {
  const {
    f_name,
    l_name,
    date,
    pronouns,
    month,
    year,
    gender,
    m_mail,
    password,
  } = req.body;

  if (
    !f_name ||
    !l_name ||
    !date ||
    !month ||
    !year ||
    !gender ||
    !m_mail ||
    !password
  ) {
    res.status(400);
    throw new Error("Please enter all the required fields");
  }

  // check whether the email exists or not

  let checkUser = await User.findOne({ m_mail });

  if (checkUser) {
    res.status(401);
    throw new Error("Email already registered");
  }

  // hash / encrypt the password

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    f_name,
    l_name,
    date,
    month,
    year,
    gender,
    m_mail,
    password: hashedPassword,
    pronouns,
  });

  res.send(newUser);
};
