interface SignUpUser {
  name: "string";
  email: "string";
  password: "string";
}

interface PostSigninUser {
  email: "string";
  password: "string";
}

interface GetSigninUser {
  name: "string";
  iconUrl: "string";
}

export type { SignUpUser, PostSigninUser, GetSigninUser };
