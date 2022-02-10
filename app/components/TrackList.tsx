import { millisToMinutesAndSeconds } from "~/helpers/helpers";
import { Track } from "../helpers/types";

const TrackList = ({ tracks }: { tracks: Track[] }) => {
  return (
    <div className="track_list">
      {tracks.map((track: Track, i: number) => (
        <div className="track_items" key={track.id}>
          <article className="track_item">
            <div
              style={{
                backgroundImage: `url(${track.album.images[0].url})`,
              }}
              className="track_picture"
            />
            <span className="track_count">{i + 1}</span>
            <span className="track_name">{track.name}</span>
            <span className="track_duration">
              {millisToMinutesAndSeconds(track.duration_ms)}
            </span>
          </article>
        </div>
      ))}
    </div>
  );
};

export default TrackList;
