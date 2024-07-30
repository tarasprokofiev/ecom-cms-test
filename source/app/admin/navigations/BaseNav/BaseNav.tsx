import {Navigation} from '@shopify/polaris';
import {ArrowLeftIcon, ChatIcon, HomeIcon, OrderIcon} from '@shopify/polaris-icons';

export const BaseNav = () => {
  return (
    <Navigation location="/">
      <Navigation.Section
        items={[
          {
            label: 'Back to Shopify',
            icon: ArrowLeftIcon,
          },
        ]}
      />
      <Navigation.Section
        separator
        title="Jaded Pixel App"
        items={[
          {
            label: 'Dashboard',
            icon: HomeIcon,
            onClick: () => console.log('dashboard'),
          },
          {
            label: 'Jaded Pixel Orders',
            icon: OrderIcon,
            onClick: () => console.log('Jaded Pixel Orders'),
          },
        ]}
        action={{
          icon: ChatIcon,
          accessibilityLabel: 'Contact support',
          onClick: () => console.log('contact'),
        }}
      />
    </Navigation>
  );
};
