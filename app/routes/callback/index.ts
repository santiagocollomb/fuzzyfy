import { LoaderFunction, redirect } from "remix";
import invariant from "tiny-invariant";
import { tokenIsValid } from "~/helpers/helpers";
import { requestAccessToken } from "~/services/auth";
import { commitSession, getSession } from "~/sessions";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));

  if (session.has("accessToken") && tokenIsValid(session.get("expiresAt"))) {
    // Redirect to the home page if they are already signed in.
    return redirect("/admin");
  }
  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  invariant(code, "Error while loging in. Missing code");

  const {
    access_token: accessToken,
    token_type: tokenType,
    refresh_token: refreshToken,
    expires_in: expiresIn,
  } = await requestAccessToken(code);

  if (!accessToken) {
    session.flash("error", "Invalid username/password");

    // Redirect back to the login page with errors.
    return redirect("/", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }

  const actualDate = new Date();

  session.set("accessToken", accessToken);
  session.set("tokenType", tokenType);
  session.set("refreshToken", refreshToken);
  session.set("expiresAt", new Date(actualDate.getTime() + expiresIn * 1000));

  // Login succeeded, send them to the home page.
  return redirect("/admin", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};
