import {json, LoaderFunctionArgs} from '@remix-run/node';
import {getAuthUser} from '~/.server/admin/services/auth.service';
import {userMapper} from '~/.server/admin/mappers/user.mapper';

export async function adminDashboardLoader({request}: LoaderFunctionArgs) {
  const user = await getAuthUser(request);

  return json({user: userMapper(user)});
}
