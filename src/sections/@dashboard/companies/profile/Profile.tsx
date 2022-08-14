import useLocales from '@/hooks/useLocales';
// @mui
import { Grid, Stack, Typography, Card, CardHeader } from '@mui/material';
// @types
import { Profile as UserProfile, UserPost } from '../../../../@types/user';
//
import ProfileAbout from './ProfileAbout';
import ProfilePostCard from './ProfilePostCard';
import ProfilePostInput from './ProfilePostInput';
import ProfileFollowInfo from './ProfileFollowInfo';
import ProfileSocialInfo from './ProfileSocialInfo';

// ----------------------------------------------------------------------

type Props = {
  myProfile: any;
  posts: UserPost[];
};

export default function Profile({ myProfile, posts }: Props) {
  const { translate } = useLocales();
  
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Stack spacing={3}>
          <ProfileFollowInfo profile={myProfile} />
          <ProfileAbout profile={myProfile} />
          <ProfileSocialInfo profile={myProfile} />
        </Stack>
      </Grid>

      <Grid item xs={12} md={8}>
        <Card sx={{  p: 2 }}>
          <CardHeader title={translate('companies.profile.tabs.pfofile.overview')} />

          <Stack sx={{ p:3 }}>
            <Typography
              variant="body1"
              align="left"
              style={{ wordWrap: "break-word" }}
            >
              {myProfile.overview}
            </Typography>
          </Stack>
        </Card>
        {/* <Stack spacing={3}>
          <ProfilePostInput />
          {posts.map((post) => (
            <ProfilePostCard key={post.id} post={post} />
          ))}
        </Stack> */}
      </Grid>
    </Grid>
  );
}
