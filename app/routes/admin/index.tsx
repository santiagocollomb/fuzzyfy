import { LoaderFunction, redirect, useLoaderData, useTransition } from "remix";
import ArtistCardsList from "~/components/ArtistCardsList";
import { getTopItems } from "~/services/users";
import { getSession } from "~/sessions";
import { tokenIsValid } from "~/helpers/helpers";
import TrackList from "~/components/TrackList";
import Loader from "~/components/Loader";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));

  if (!session.has("accessToken") || !tokenIsValid(session.get("expiresAt"))) {
    return redirect("/");
  }

  const artistsResponse = await getTopItems(session.get("accessToken"));
  const tracksResponse = await getTopItems(
    session.get("accessToken"),
    "tracks"
  );

  return { artists: artistsResponse.items, tracks: tracksResponse.items };
};

const Admin = () => {
  const { artists, tracks } = useLoaderData();
  const transition = useTransition();
  return (
    <>
      <h1>Tu top de Artistas</h1>
      <ArtistCardsList artists={artists} />

      <h1 className="mt-2">Tu top de Canciones</h1>
      <TrackList tracks={tracks} />
      <Loader state={transition.state} />
    </>
  );
};

export default Admin;
