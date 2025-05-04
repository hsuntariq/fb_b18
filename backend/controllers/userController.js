import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import asyncHandler from "express-async-handler";
const generateOTP = () => {
  let random = Math.random() * 999999;
  if (random < 100000) {
    random *= 10;
  }
  const ceil = Math.ceil(random);
  return ceil;
};

const sendOTP = (m_mail, newUser) => {
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const options = {
    from: "hsuntariq@gmail.com",
    to: m_mail,
    subject: "OTP Verification",
    html: `
      <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>OTP Verification</title>
  <style>
    body {
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      background-color: #e9ebee;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      background-color: #ffffff;
      margin: 50px auto;
      padding: 40px 30px;
      border-radius: 10px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      border-top: 8px solid #1877f2;
    }
    .header {
      text-align: center;
    }
    .header img {
      width: 80px;
      margin-bottom: 10px;
    }
    .header h2 {
      color: #1877f2;
      margin: 0;
      font-size: 24px;
    }
    .message {
      font-size: 16px;
      color: #333333;
      text-align: center;
      margin: 20px 0;
      line-height: 1.6;
    }
    .otp-box {
      font-size: 32px;
      letter-spacing: 12px;
      font-weight: bold;
      text-align: center;
      color: #ffffff;
      background-color: #1877f2;
      padding: 20px;
      border-radius: 10px;
      margin: 20px 0;
    }
    .note {
      font-size: 14px;
      color: #555555;
      text-align: center;
      margin-top: 15px;
    }
    .footer {
      text-align: center;
      font-size: 12px;
      color: #999999;
      margin-top: 40px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="https://static.vecteezy.com/system/resources/previews/041/643/208/non_2x/facebook-logo-facebook-icon-transparent-white-background-free-png.png" alt="Facebook Logo">
      <h2>Email Verification</h2>
    </div>
    <div class="message">
      <p>We received a request to verify your email address. Use the following OTP code to complete the process. This code will expire in 10 minutes.</p>
    </div>
    <div class="otp-box">${newUser.otp}</div>
    <div class="note">
      <p>If you did not request this, you can safely ignore this email.</p>
    </div>
    <div class="footer">
      &copy; ${new Date().getFullYear()} Your App. All rights reserved.
    </div>
  </div>
</body>
</html>
`,
  };

  const sendMail = transport.sendMail(options, (error, info) => {
    if (error) {
      res.status(400);
      throw new Error(error.message);
    } else {
      console.log("mail sent");
    }
  });
};

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
    otp: generateOTP(),
  });

  sendOTP(m_mail, newUser);

  res.send(newUser);
};

// verify OTP

export const verifyOTP = asyncHandler(async (req, res) => {
  const { otp } = req.body;
  const { user_id } = req.params;

  if (!otp) {
    res.status(400);
    throw new Error("Please enter the OTP");
  }

  // fint the relevant user

  const findUser = await User.findById(user_id);
  if (!findUser) {
    res.status(404);
    throw new Error("User not found");
  }

  if (findUser.otp == otp) {
    findUser.otp = null;
    await findUser.save();
    res.send(findUser);
  } else {
    res.status(401);
    throw new Error("Invalid OTP");
  }
});

// login user

export const loginUser = async (req, res) => {
  const { m_mail, password } = req.body;

  if (!m_mail || !password) {
    res.status(400);
    throw new Error("Please enter all the fields");
  }

  // check if the email is correct
  const checkMail = await User.findOne({ m_mail });

  if (!checkMail) {
    res.status(404);
    throw new Error("Invalid Email");
  }

  if (await bcrypt.compare(password, checkMail.password)) {
    res.send(checkMail);
  } else {
    res.status(401);
    throw new Error("Invalid Password");
  }
};
