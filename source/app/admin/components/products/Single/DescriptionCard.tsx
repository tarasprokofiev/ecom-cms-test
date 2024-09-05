import {BlockStack, Button, Card, InlineGrid, Text} from '@shopify/polaris';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {EditIcon} from '@shopify/polaris-icons';
import React, {FC} from 'react';
import {TProductDto} from '~/.server/admin/dto/product.dto';
import {useTranslation} from 'react-i18next';
import {translatedDescription} from '~/admin/utils/product.util';
import {LANGUAGES} from '~/admin/locale/i18n.config';

export type Props = {
  product: Pick<TProductDto, 'translations' | 'id'>;
}

export const DescriptionCard: FC<Props> = ({product}) => {
  const {translations} = product;
  const {t} = useTranslation();

  const languages = LANGUAGES.map((lang) => lang.toUpperCase());

  return (
    <Card>
      <BlockStack gap="200">
        <InlineGrid columns="1fr auto">
          <Text as="h2" variant="headingSm">
            {t('product.single.descriptionCard.title')}
          </Text>
          <Button
            url={`${EAdminNavigation.products}/${product.id}/edit-translation`}
            accessibilityLabel="Edit translation"
            icon={EditIcon}
          />
        </InlineGrid>
        {languages.map((lang) => (
          <BlockStack gap="200" key={lang}>
            <Text as="h3" variant="headingXs" fontWeight="medium">
              {lang}
            </Text>
            <Text as="p" variant="bodyMd">
              {translatedDescription(translations, lang)}
            </Text>
          </BlockStack>
        ))}

      </BlockStack>
    </Card>
  );
};
