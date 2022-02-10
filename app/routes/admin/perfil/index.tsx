import { LoaderFunction, redirect, useLoaderData } from "remix";
import ProfileHeader from "~/components/ProfileHeader";
import { tokenIsValid } from "~/helpers/helpers";
import { Profile } from "~/helpers/types";
import { getProfile } from "~/services/users";
import { getSession } from "~/sessions";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));

  if (!session.has("accessToken") || !tokenIsValid(session.get("expiresAt"))) {
    // Redirect to the home page if they are already signed in.
    return redirect("/");
  }

  const profile = getProfile(session.get("accessToken"));

  return profile;
};

const Perfil = () => {
  const profile: Profile = useLoaderData();

  const profileImage =
    profile.images.length > 0 && profile.images[0].url
      ? profile.images[0].url
      : "https://skillz4kidzmartialarts.com/wp-content/uploads/2017/04/default-image.jpg";

  return (
    <ProfileHeader
      image={profileImage}
      title={profile.display_name}
      subtitle={profile.email}
      type={profile.product}
    />
  );
};

export default Perfil;
