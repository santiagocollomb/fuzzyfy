import { LoaderFunction, redirect, useLoaderData, useTransition } from "remix";
import invariant from "tiny-invariant";
import ArtistCardsList from "~/components/ArtistCardsList";
import ProfileHeader from "~/components/ProfileHeader";
import Loader from "~/components/Loader";
import TrackList from "~/components/TrackList";
import { tokenIsValid } from "~/helpers/helpers";
import { Artist, Track } from "~/helpers/types";
import {
  getArtist,
  getArtistRelated,
  getArtistTopTracks,
} from "~/services/artist";
import { getSession } from "~/sessions";

export const loader: LoaderFunction = async ({ request, params }) => {
  const session = await getSession(request.headers.get("Cookie"));

  if (!session.has("accessToken") || !tokenIsValid(session.get("expiresAt"))) {
    return redirect("/");
  }
  invariant(params.id);
  const artist = await getArtist(params.id, session.get("accessToken"));
  const artistTopTracks = await getArtistTopTracks(
    params.id,
    session.get("accessToken")
  );
  const artistsRelated = await getArtistRelated(
    params.id,
    session.get("accessToken")
  );
  return { artist, artistTopTracks, artistsRelated };
};

const ArtistSlug = () => {
  const {
    artist,
    artistTopTracks,
    artistsRelated,
  }: { artist: Artist; artistTopTracks: Track[]; artistsRelated: any } =
    useLoaderData();
  const transition = useTransition();

  return (
    <>
      <ProfileHeader
        image={artist.images[0].url}
        title={artist.name}
        subtitle={artist.genres.slice(0, 3).join(" - ")}
        type={artist.type}
      />

      {artistTopTracks && (
        <>
          <h1 className="mt-2">Top de Canciones</h1>
          <TrackList tracks={artistTopTracks.slice(0, 5)} />
        </>
      )}

      {artistsRelated && (
        <>
          <h1 className="mt-2">Artistas relacionados</h1>
          <ArtistCardsList artists={artistsRelated.slice(0, 5)} />
        </>
      )}
      <Loader state={transition.state} />
    </>
  );
};

export default ArtistSlug;
