import {json, LoaderFunctionArgs, redirect} from '@remix-run/node';
import {getAuthUser} from '~/.server/admin/services/auth.service';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {userMapper} from '~/.server/admin/mappers/user.mapper';
import {prisma} from '~/.server/shared/services/prisma.service';
import {hasAdminRoleOrRedirect} from '~/.server/admin/utils/auth.util';

export async function adminUsersSingleLoader({request, params}: LoaderFunctionArgs) {
  const authUser = await getAuthUser(request);
  hasAdminRoleOrRedirect(authUser);

  const {id} = params;
  if (!id) {
    return redirect(EAdminNavigation.users);
  }

  // get user
  const user = await prisma.user.findFirst({
    where: {id: Number(id)}
  });

  // if not exist
  if (!user) {
    return redirect(EAdminNavigation.users);
  }

  return json({user: userMapper(user)});
}
