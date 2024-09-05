import {Box} from '@shopify/polaris';
import React, {FC} from 'react';
import {LANGUAGES} from '~/admin/locale/i18n.config';


export const LanguageHiddenCard: FC = () => {
  const languages = LANGUAGES.map((lang) => lang.toUpperCase());

  const fields = languages.map((lang, idx) => {
    return (
      <input
        key={lang}
        type="hidden"
        name={`translations[${idx}].language`}
        value={lang}
      />
    );
  });

  return (
    <Box visuallyHidden>
      {fields}
    </Box>
  );
};
