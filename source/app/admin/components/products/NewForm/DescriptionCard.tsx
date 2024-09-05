import {BlockStack, Card, FormLayout, Text} from '@shopify/polaris';
import React, {FC} from 'react';
import {ValidatedTextField} from '~/admin/ui/ValidatedTextField/ValidatedTextField';
import {TProductDto} from '~/.server/admin/dto/product.dto';
import {LANGUAGES} from '~/admin/locale/i18n.config';
import {useTranslation} from 'react-i18next';

type Props = {
  product?: Omit<TProductDto, 'category'>
}

export const DescriptionCard: FC<Props> = (props) => {
  const {product} = props;
  const {t} = useTranslation();

  const languages = LANGUAGES.map((lang) => lang.toUpperCase());

  const fields = languages.map((lang, idx) => {
    const value = product?.translations.find((translation) => translation.language === lang)?.description;

    return (
      <ValidatedTextField
        key={lang}
        label={lang}
        type="text"
        name={`translations[${idx}].description`}
        autoComplete="off"
        defaultValue={value}
        multiline={6}
      />
    );
  });

  return (
    <Card>
      <BlockStack gap="200">
        <Text as="h2" variant="headingSm">
          {t('product.single.descriptionCard.title')}
        </Text>
        <FormLayout>
          {fields}
        </FormLayout>
      </BlockStack>
    </Card>
  );
};
