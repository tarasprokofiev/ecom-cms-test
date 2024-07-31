import {TopBar, TopBarProps} from '@shopify/polaris';
import {FC, useCallback, useState} from 'react';
import {TUserDto} from '~/.server/admin/dto/user.dto';

export interface AppBarProps {
  onNavigationToggle: TopBarProps['onNavigationToggle'];
  user: TUserDto;
}

export const AppBar: FC<AppBarProps> = ({onNavigationToggle, user}) => {
  const [userMenuActive, setUserMenuActive] = useState(false);

  const toggleUserMenuActive = useCallback(
    () => setUserMenuActive((userMenuActive) => !userMenuActive),
    [],
  );

  const userMenuActions = [
    {
      items: [{content: 'Community forums'}],
    },
  ];

  const userMenuMarkup = (
    <TopBar.UserMenu
      actions={userMenuActions}
      name={user.fullName || ''}
      detail={'storeName'}
      initials={user.fullName?.[0]}
      open={userMenuActive}
      onToggle={toggleUserMenuActive}
    />
  );

  return (
    <TopBar
      showNavigationToggle
      userMenu={userMenuMarkup}
      onNavigationToggle={onNavigationToggle}
    />
  );
};
