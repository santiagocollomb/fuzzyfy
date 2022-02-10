import { Link } from "remix";
import { Artist } from "~/helpers/types";

const ArtistCardsList = ({ artists }: { artists: Artist[] }) => {
  return (
    <div className="grid">
      {artists.map((artist: any) => (
        <div className="card" key={artist.id}>
          <Link to={`/admin/artist/${artist.id}`}>
            <header
              className="card__thumb"
              style={{ backgroundImage: `url('${artist.images[0].url}')` }}
            ></header>

            <div className="card__body">
              <h2 className="card__title">
                <a href="#">{artist.name}</a>
              </h2>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ArtistCardsList;
