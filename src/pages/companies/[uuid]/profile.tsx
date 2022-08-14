import { capitalCase } from 'change-case';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Tab, Box, Card, Tabs, Container } from '@mui/material';
import { PATH_DASHBOARD } from '@/routes/paths';
import useTabs from '@/hooks/useTabs';
import useAuth from '@/hooks/useAuth';
import useSettings from '@/hooks/useSettings';
import useLocales from '@/hooks/useLocales';
import { _userFeeds, _userFriends, _userGallery, _userFollowers } from '@/_mock';
import { companyProfile } from '@/fetchDATA/companies'

// layouts
import Layout from '@/layouts';
// components
import Page from '@/components/Page';
import Iconify from '@/components/Iconify';
import HeaderBreadcrumbs from '@/components/HeaderBreadcrumbs';
// sections
import {
  Profile,
  ProfileCover,
  ProfileFriends,
  ProfileGallery,
  ProfileFollowers,
} from '@/sections/@dashboard/companies/profile';
// ----------------------------------------------------------------------

const TabsWrapperStyle = styled('div')(({ theme }) => ({
  zIndex: 9,
  bottom: 0,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.up('sm')]: {
    justifyContent: 'center',
  },
  [theme.breakpoints.up('md')]: {
    justifyContent: 'flex-end',
    paddingRight: theme.spacing(3),
  },
}));

// ----------------------------------------------------------------------

UserProfile.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function UserProfile() {
  const { translate } = useLocales();
  
  const { query } = useRouter();

  const { uuid } = query;

  const [ companyDATA, setCompanyDATA ] = useState({})
  
  useEffect(() => {
      companyProfile( setCompanyDATA, String( uuid ) )
    }
  ,[])
  
  const { themeStretch } = useSettings();

  const { user } = useAuth();

  const { currentTab, onChangeTab } = useTabs('profile');

  const [findFriends, setFindFriends] = useState('');

  const handleFindFriends = (value: string) => {
    setFindFriends(value);
  };

  const PROFILE_TABS = [
    {
      value: 'profile',
      label: translate('companies.profile.tabs.pfofile.name'),
      icon: <Iconify icon={'ic:round-account-box'} width={20} height={20} />,
      component: <Profile myProfile={companyDATA} posts={_userFeeds} />,
    },
    // {
    //   value: 'followers',
    //   icon: <Iconify icon={'eva:heart-fill'} width={20} height={20} />,
    //   component: <ProfileFollowers followers={_userFollowers} />,
    // },
    // {
    //   value: 'friends',
    //   icon: <Iconify icon={'eva:people-fill'} width={20} height={20} />,
    //   component: (
    //     <ProfileFriends
    //       friends={_userFriends}
    //       findFriends={findFriends}
    //       onFindFriends={handleFindFriends}
    //     />
    //   ),
    // },
    // {
    //   value: 'gallery',
    //   icon: <Iconify icon={'ic:round-perm-media'} width={20} height={20} />,
    //   component: <ProfileGallery gallery={_userGallery} />,
    // },
  ];

  return (
    <Page title="User: Profile">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Profile"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'User', href: PATH_DASHBOARD.user.root },
            { name: user?.displayName || '' },
          ]}
        />
        <Card
          sx={{
            mb: 3,
            height: 280,
            position: 'relative',
          }}
        >
          <ProfileCover myProfile={companyDATA} />

          <TabsWrapperStyle>
            <Tabs
              allowScrollButtonsMobile
              variant="scrollable"
              scrollButtons="auto"
              value={currentTab}
              onChange={onChangeTab}
            >
              {PROFILE_TABS.map((tab) => (
                <Tab
                  disableRipple
                  key={tab.value}
                  value={tab.value}
                  icon={tab.icon}
                  label={tab.label}
                  />
              ))}
            </Tabs>
          </TabsWrapperStyle>
        </Card>

        {PROFILE_TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && <Box key={tab.value}>{tab.component}</Box>;
        })}
      </Container>
    </Page>
  );
}