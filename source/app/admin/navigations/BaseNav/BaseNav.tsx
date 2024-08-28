import {Navigation} from '@shopify/polaris';
import {HomeIcon, OrderIcon, PersonIcon, ProductIcon, WorkIcon} from '@shopify/polaris-icons';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {useLocation} from 'react-router';
import {FC, useMemo} from 'react';
import {TUserDto} from '~/.server/admin/dto/user.dto';
import {hasAdminRole} from '~/admin/utils/access.util';

type Props = {
  user: TUserDto;
}

export const BaseNav: FC<Props> = ({user}) => {
  const location = useLocation();

  const items = useMemo(() => {
    if (!hasAdminRole(user)) {
      return [
        {
          url: EAdminNavigation.dashboard,
          label: 'Home',
          icon: HomeIcon,
          matchPaths: [EAdminNavigation.dashboard],
        },
        {
          url: EAdminNavigation.products,
          label: 'Products',
          icon: ProductIcon,
        },
      ];
    }

    return [
      {
        url: EAdminNavigation.dashboard,
        label: 'Home',
        icon: HomeIcon,
        matchPaths: [EAdminNavigation.dashboard]
      },
      {
        url: EAdminNavigation.users,
        label: 'Users',
        icon: WorkIcon,
        matchPaths: [EAdminNavigation.users]
      },
      {
        url: EAdminNavigation.customers,
        label: 'Customers',
        icon: PersonIcon,
      },
      {
        url: EAdminNavigation.products,
        label: 'Products',
        icon: ProductIcon,
        subNavigationItems: [
          {
            url: EAdminNavigation.categories,
            disabled: false,
            label: 'Categories',
          },
        ],
      },
      {
        url: EAdminNavigation.orders,
        label: 'Orders',
        icon: OrderIcon,
        subNavigationItems: [
          {
            url: EAdminNavigation.carts,
            disabled: false,
            label: 'Carts',
          },
        ],
      },
    ];
  }, [user.role]);

  return (
    <Navigation location={location.pathname}>
      <Navigation.Section
        items={items}
      />
    </Navigation>
  );
};
