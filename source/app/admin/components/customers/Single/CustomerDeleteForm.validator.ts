import {withZod} from '@rvf/zod';
import {z} from 'zod';
import {EAdminCustomerAction, FORM_ACTION_FIELD} from '~/admin/constants/action.constant';

export const customerDeleteFormValidator = withZod(
  z.object({
    [FORM_ACTION_FIELD]: z.literal(EAdminCustomerAction.deleteCustomer),
  })
);
