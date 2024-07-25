import type { User } from "@prisma/client";
import { Authenticator } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import { sessionStorage } from "~/.server/utils/session.util";
import { invariant } from "@remix-run/router/history";
import {comparePassword, hashPassword} from "~/.server/utils/auth.util";
import { prisma } from "~/.server/utils/prisma.util";

export const ADMIN_AUTH_STRATEGY = 'admin-pass'

export const authenticator = new Authenticator<User>(sessionStorage);

const findUser = async (email: string, password: string): Promise<User> => {
  const user = await prisma.user.findUniqueOrThrow({where: {email: email}});

  invariant(await comparePassword(password, user.password), "Wrong password");

  return user;
}

authenticator.use(
  new FormStrategy(async ({ form }) => {
    let email = form.get("email");
    let password = form.get("password");

    // You can validate the inputs however you want
    invariant(typeof email === "string", "email must be a string");
    invariant(email.length > 0, "email must not be empty");

    invariant(typeof password === "string", "password must be a string");
    invariant(password.length > 0, "password must not be empty");

    return await findUser(email, password);
  }),
  ADMIN_AUTH_STRATEGY
);
