const Loader = ({ state }: { state: "idle" | "submitting" | "loading" }) => {
  if (state === "submitting" || state === "loading")
    return <div className="loader">Loading...</div>;
  return null;
};

export default Loader;
