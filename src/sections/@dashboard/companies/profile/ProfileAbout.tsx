import useLocales from '@/hooks/useLocales';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Card, Typography, CardHeader, Stack } from '@mui/material';
// @types
import { Profile } from '../../../../@types/user';
// components
import Iconify from '../../../../components/Iconify';

// ----------------------------------------------------------------------

const IconStyle = styled(Iconify)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2),
}));

// ----------------------------------------------------------------------

type Props = {
  profile: any;
};

export default function ProfileAbout({ profile }: Props) {
  const { translate } = useLocales();

  const { quote, country, email, role, company, school, company_size, industry } = profile;

  return (
    <Card>
      <CardHeader title={translate('companies.profile.tabs.pfofile.about')} />

      <Stack spacing={2} sx={{ p: 3 }}>
        <Typography variant="body2">{quote}</Typography>

        <Stack direction="row">
          <IconStyle icon={'la:industry'} />
          <Typography variant="body2">
            {industry}
          </Typography>
        </Stack>

        <Stack direction="row">
          <IconStyle icon={'clarity:employee-group-line'} />
          <Typography variant="body2">
            {company_size}
          </Typography>
        </Stack>

        <Stack direction="row">
          <IconStyle icon={'eva:pin-fill'} />
          <Typography variant="body2">
            {country}
          </Typography>
        </Stack>

        { email && 
          <Stack direction="row">
            <IconStyle icon={'eva:email-fill'} />
            <Typography variant="body2">{email}</Typography>
          </Stack>
        }

        { company && 
        <Stack direction="row">
          <IconStyle icon={'ic:round-business-center'} />
          <Typography variant="body2">
            {role} at &nbsp;
            <Link component="span" variant="subtitle2" color="text.primary">
              {company}
            </Link>
          </Typography>
        </Stack>
        }

        { school &&
        <Stack direction="row">
          <IconStyle icon={'ic:round-business-center'} />
          <Typography variant="body2">
            Studied at &nbsp;
            <Link component="span" variant="subtitle2" color="text.primary">
              {school}
            </Link>
          </Typography>
        </Stack>
        }
        
      </Stack>
    </Card>
  );
}
