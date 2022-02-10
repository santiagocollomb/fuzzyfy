import {
  ActionFunction,
  Form,
  redirect,
  useActionData,
  useTransition,
} from "remix";
import invariant from "tiny-invariant";
import ArtistCardsList from "~/components/ArtistCardsList";
import Loader from "~/components/Loader";
import TrackList from "~/components/TrackList";
import { tokenIsValid } from "~/helpers/helpers";
import { searchForItems } from "~/services/search";
import { getSession } from "~/sessions";
import searchStyles from "../../../styles/search.css";

export const links = () => {
  return [{ rel: "stylesheet", href: searchStyles }];
};

type SearchError = {
  query?: boolean;
};

export const action: ActionFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));

  if (!session.has("accessToken") || !tokenIsValid(session.get("expiresAt"))) {
    // Redirect to the home page if they are already signed in.
    return redirect("/");
  }
  const formData = await request.formData();

  const query = formData.get("search");

  const errors: SearchError = {};
  if (!query) errors.query = true;

  if (Object.keys(errors).length) {
    return errors;
  }
  invariant(typeof query === "string");

  const items = await searchForItems(query, session.get("accessToken"));

  return items;
};

const Buscar = () => {
  const items = useActionData();
  const errors = useActionData();
  const transition = useTransition();

  return (
    <>
      <div className="wrapper">
        <Form method="post" className="search">
          <input
            type="text"
            name="search"
            className="searchTerm"
            placeholder="Busca tus artistas y canciones"
          />
          <button type="submit" className="searchButton">
            Buscar
          </button>
        </Form>
        {errors && errors.query && (
          <span className="error">*Tenés que escribir al menos una letra</span>
        )}
        {items && items.artists.items.length > 0 && (
          <>
            <h1>Artistas</h1>
            <ArtistCardsList artists={items.artists.items} />
          </>
        )}
        {items && items.tracks.items.length > 0 && (
          <>
            <h1 className="mt-2">Canciones</h1>
            <TrackList tracks={items.tracks.items} />
          </>
        )}
      </div>
      <Loader state={transition.state} />
    </>
  );
};

export default Buscar;
