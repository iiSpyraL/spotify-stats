import { useQuery } from "@tanstack/react-query";

const clientId = "414e11fca66f4748964a40a7e5ac7274";
const params = new URLSearchParams(window.location.search);
const code = params.get("code");

const TOKEN_TTL = 1000 * 60 * 60;

const setTokenWithExpiry = (token: string, ttl: number) => {
  const now = new Date();

  const item = {
    value: token,
    expiry: now.getTime() + ttl,
  };

  localStorage.setItem("accessToken", JSON.stringify(item));
};

const getTokenWithExpiry = () => {
  const itemString = localStorage.getItem("accessToken");

  if (!itemString || itemString === "undefined") return null;

  const item = JSON.parse(itemString);
  const now = new Date();

  console.log(now.getTime() > item.expiry);

  if (now.getTime() > item.expiry) {
    localStorage.removeItem("accessToken");
    return null;
  }

  return item.value;
};

export const useGetToken = () => {
  const tokenFromStorage = getTokenWithExpiry();
  console.log(tokenFromStorage);
  // const thereIsAnAccessToken =
  //   !!localStorage.getItem("accessToken") &&
  //   localStorage.getItem("accessToken") !== "undefined";

  if (!tokenFromStorage && !code) {
    redirectToAuthCodeFlow(clientId);
  }

  if (!tokenFromStorage && code) {
    const accessToken = getAccessToken(clientId, code);
    console.log(accessToken);

    // localStorage.setItem("accessToken", accessToken);
    params.delete("code");
    window.history.pushState({}, document.title, "/");
    setTokenWithExpiry(accessToken, TOKEN_TTL);
  }

  // const tokenFromStorage2 = getTokenWithExpiry();
  return {
    ready: getTokenWithExpiry(),
  };
};

function getAccessToken(clientId: string, code: string) {
  const verifier = localStorage.getItem("verifier");

  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  params.append("redirect_uri", "http://localhost:5173/callback");
  params.append("code_verifier", verifier!);

  const { data } = useQuery({
    queryKey: ["getAccessToken"],
    queryFn: async () => {
      const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params,
      });

      const { access_token } = await result.json();
      return access_token;
    },
  });

  return data;
}

async function redirectToAuthCodeFlow(clientId: string) {
  const verifier = generateCodeVerifier(128);
  const challenge = await generateCodeChallenge(verifier);

  localStorage.setItem("verifier", verifier);

  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("response_type", "code");
  params.append("redirect_uri", "http://localhost:5173/callback");
  params.append(
    "scope",
    "user-read-private user-read-email user-top-read user-library-read"
  );
  params.append("code_challenge_method", "S256");
  params.append("code_challenge", challenge);

  document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

function generateCodeVerifier(length: number) {
  let text = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

async function generateCodeChallenge(codeVerifier: string) {
  const data = new TextEncoder().encode(codeVerifier);
  const digest = await window.crypto.subtle.digest("SHA-256", data);
  return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}
