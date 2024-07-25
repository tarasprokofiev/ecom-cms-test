import {env} from "node:process";

export const environment = {
  users: {
    admin: {
      email: env.DEFAULT_ADMIN_EMAIL,
      password: env.DEFAULT_ADMIN_PASSWORD,
    }
  }
}
