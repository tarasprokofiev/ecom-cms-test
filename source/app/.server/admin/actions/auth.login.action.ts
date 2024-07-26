import {ActionFunctionArgs} from '@remix-run/node';
import {ADMIN_AUTH_STRATEGY, authenticator} from '~/.server/admin/services/auth.service';
import {EAdminNavigation} from '~/.server/admin/constants/navigation.constant';

export async function adminAuthLoginAction({request}: ActionFunctionArgs) {
  return await authenticator.authenticate(ADMIN_AUTH_STRATEGY, request, {
    successRedirect: EAdminNavigation.dashboard,
    failureRedirect: EAdminNavigation.authLogin,
  });
}
