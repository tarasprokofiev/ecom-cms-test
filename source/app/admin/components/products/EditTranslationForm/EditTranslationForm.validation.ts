import {withZod} from '@rvf/zod';
import {z} from 'zod';
import {translationRule} from '~/admin/components/products/NewForm/NewForm.validator';


export const editTranslationFormValidation = withZod(
  z.object({
    translations: z.array(translationRule)
  })
);
