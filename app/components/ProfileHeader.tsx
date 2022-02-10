const ProfileHeader = ({
  image,
  title,
  subtitle,
  type,
}: {
  image: string;
  title: string;
  subtitle: string;
  type: string;
}) => {
  return (
    <div className="profile_header">
      <div
        className="thumbnail"
        style={{ backgroundImage: `url('${image}')` }}
      />
      <div className="profile_header_body">
        <div className="check">
          <i className="fas fa-check"></i>
        </div>
        <h2 className="name">{title}</h2>
        <p className="title">{subtitle}</p>
        <button type="button" className="btn">
          {type}
        </button>
      </div>
    </div>
  );
};

export default ProfileHeader;
