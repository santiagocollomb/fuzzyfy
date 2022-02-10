import { LoaderFunction, redirect } from "remix";
import { tokenIsValid } from "~/helpers/helpers";
import { requestUserAuth } from "~/services/auth";
import { getSession } from "~/sessions";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));

  if (session.has("accessToken") && tokenIsValid(session.get("expiresAt"))) {
    // Redirect to the home page if they are already signed in.
    return redirect("/admin/");
  }
  return {};
};

const Index = () => {
  return (
    <div className="login_page">
      <svg className="cirle-a" height="160" width="160">
        <circle cx="80" cy="80" r="80" />
      </svg>
      <svg className="cirle-b" height="60" width="60">
        <circle cx="30" cy="30" r="30" />
      </svg>
      <svg className="cirle-c" height="600" width="600">
        <circle cx="300" cy="300" r="300" />
      </svg>
      <svg className="cirle-d" height="60" width="60">
        <circle cx="30" cy="30" r="30" />
      </svg>
      <div className="login_text">
        <h1>
          <p>
            Con <span>Fuzzyfy</span>{" "}
          </p>
          Tu música en un solo lugar
        </h1>
        <a href={requestUserAuth()} className="login_button">
          Ingresá con Spotify
        </a>
      </div>
    </div>
  );
};

export default Index;
