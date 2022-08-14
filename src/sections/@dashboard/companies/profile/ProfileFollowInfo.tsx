import useLocales from '@/hooks/useLocales';

import { Card, CardHeader, Stack, Typography, Divider } from '@mui/material';
// utils
import { fNumber } from '../../../../utils/formatNumber';
// @types
import { Profile } from '../../../../@types/user';

// ----------------------------------------------------------------------

type Props = {
  profile: any;
};

export default function ProfileFollowInfo({ profile }: Props) {
  const { follower, employee_linkedin } = profile;

  const { translate } = useLocales();

  return (
    <Card sx={{ p: 1 }}>
      {/* <CardHeader title='LinkedIN'/> */}
      <Typography variant="h4" align="center">LinkedIN</Typography>

      <Stack direction="row" divider={<Divider orientation="vertical" flexItem />}>
        <Stack width={1} textAlign="center">
          <Typography variant="h4">{fNumber(follower)}</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {translate('companies.profile.tabs.profile.followers')}
          </Typography>
        </Stack>

        <Stack width={1} textAlign="center">
          <Typography variant="h4">{fNumber(employee_linkedin)}</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {translate('companies.profile.tabs.profile.employees')}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
