import {ActionFunctionArgs, json} from '@remix-run/node';
import {ADMIN_AUTH_STRATEGY, authenticator} from '~/.server/admin/services/auth.service';
import {EAdminNavigation} from '~/.server/admin/constants/navigation.constant';
import {AuthorizationError} from 'remix-auth';

export async function adminAuthLoginAction({request}: ActionFunctionArgs) {
  try {
    return await authenticator.authenticate(ADMIN_AUTH_STRATEGY, request, {
      successRedirect: EAdminNavigation.dashboard,
      //failureRedirect: EAdminNavigation.authLogin,
      throwOnError: true,
    });
  } catch (error) {
    // Because redirects work by throwing a Response, you need to check if the
    // caught error is a response and return it or throw it again
    if (error instanceof Response) {
      return error;
    }


    if (error instanceof AuthorizationError) {
      return json({
        error: {
          message: error.message
        }
      });
    }

    return json({
      error: {
        message: 'Unknown Error'
      }
    });
  }
}
