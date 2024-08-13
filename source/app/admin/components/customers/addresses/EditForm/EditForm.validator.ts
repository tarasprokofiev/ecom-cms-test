import {withZod} from '@rvf/zod';
import {z} from 'zod';
import {addressRule} from '~/admin/components/customers/NewForm/NewForm.validator';


export const editFormValidator = withZod(
  z.object({
    address: addressRule
  })
);
