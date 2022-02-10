import { Link } from "remix";
import { Track } from "../helpers/types";

const TrackCard = ({ track }: { track: Track }) => {
  return (
    <div className="card" key={track.id}>
      <Link to={`/admin/track/${track.id}`}>
        <header
          className="card__thumb"
          style={{ backgroundImage: `url('${track.album.images[0].url}')` }}
        ></header>

        <div className="card__body">
          <h2 className="card__title">
            <a href="#">{track.name}</a>
          </h2>
        </div>
      </Link>
    </div>
  );
};

export default TrackCard;
