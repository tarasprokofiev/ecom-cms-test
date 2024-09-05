import {TProductTranslateDto} from '~/.server/admin/dto/product.dto';
import {$Enums} from '@prisma/client';

export const translatedTitle = (translations: TProductTranslateDto[], language: string) => {
  language = language.toUpperCase();

  const title = translations.find(({language: lang}) => lang === language)?.title;

  if (title) {
    return title;
  }

  return translations.find(({language: lang}) => lang === $Enums.Language.EN)?.title || '-/-';
};

export const translatedDescription = (translations: TProductTranslateDto[], language: string) => {
  language = language.toUpperCase();

  const title = translations.find(({language: lang}) => lang === language)?.description;

  if (title) {
    return title;
  }

  return translations.find(({language: lang}) => lang === $Enums.Language.EN)?.description || '-/-';
};
