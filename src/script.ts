// const clientId = "414e11fca66f4748964a40a7e5ac7274"; // Replace with your client id
// const params = new URLSearchParams(window.location.search);
// const code = params.get("code");
// console.log(code);
// if (!code) {
//   redirectToAuthCodeFlow(clientId);
// } else {
//   const accessToken = await getAccessToken(clientId, code);
//   const profile = await fetchProfile(accessToken);
//   console.log(profile);

//   const topItems = await getTopItems(accessToken);
//   populateUI(profile, topItems);
//   console.log(topItems);

//   const tracks = await getTracks(accessToken);
//   console.log(tracks);
// }

// export async function redirectToAuthCodeFlow(clientId: string) {
//   const verifier = generateCodeVerifier(128);
//   const challenge = await generateCodeChallenge(verifier);

//   localStorage.setItem("verifier", verifier);

//   const params = new URLSearchParams();
//   params.append("client_id", clientId);
//   params.append("response_type", "code");
//   params.append("redirect_uri", "http://localhost:5173/callback");
//   params.append(
//     "scope",
//     "user-read-private user-read-email user-top-read user-library-read"
//   );
//   params.append("code_challenge_method", "S256");
//   params.append("code_challenge", challenge);

//   document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
// }

// function generateCodeVerifier(length: number) {
//   let text = "";
//   let possible =
//     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

//   for (let i = 0; i < length; i++) {
//     text += possible.charAt(Math.floor(Math.random() * possible.length));
//   }
//   return text;
// }

// async function generateCodeChallenge(codeVerifier: string) {
//   const data = new TextEncoder().encode(codeVerifier);
//   const digest = await window.crypto.subtle.digest("SHA-256", data);
//   return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
//     .replace(/\+/g, "-")
//     .replace(/\//g, "_")
//     .replace(/=+$/, "");
// }

// export async function getAccessToken(
//   clientId: string,
//   code: string
// ): Promise<string> {
//   const verifier = localStorage.getItem("verifier");

//   const params = new URLSearchParams();
//   params.append("client_id", clientId);
//   params.append("grant_type", "authorization_code");
//   params.append("code", code);
//   params.append("redirect_uri", "http://localhost:5173/callback");
//   params.append("code_verifier", verifier!);

//   const result = await fetch("https://accounts.spotify.com/api/token", {
//     method: "POST",
//     headers: { "Content-Type": "application/x-www-form-urlencoded" },
//     body: params,
//   });

//   const { access_token } = await result.json();
//   return access_token;
// }

// async function fetchProfile(token: string): Promise<UserProfile> {
//   const result = await fetch("https://api.spotify.com/v1/me", {
//     method: "GET",
//     headers: { Authorization: `Bearer ${token}` },
//   });

//   return await result.json();
// }

// async function getTopItems(token: string): Promise<any> {
//   const result = await fetch(
//     "https://api.spotify.com/v1/me/top/artists?time_range=short_term",
//     {
//       method: "GET",
//       headers: { Authorization: `Bearer ${token}` },
//     }
//   );

//   return await result.json();
// }

// async function getTracks(token: string): Promise<any> {
//   const result = await fetch("https://api.spotify.com/v1/me/tracks", {
//     method: "GET",
//     headers: { Authorization: `Bearer ${token}` },
//   });

//   return await result.json();
// }

// function populateUI(profile: UserProfile, tracks: Thing) {
//   document.getElementById("displayName")!.innerText = profile.display_name;
//   if (profile.images[0]) {
//     const profileImage = new Image(200, 200);
//     profileImage.src = profile.images[0].url;
//     document.getElementById("avatar")!.appendChild(profileImage);
//   }
//   document.getElementById("id")!.innerText = profile.id;
//   document.getElementById("email")!.innerText = profile.email;
//   document.getElementById("uri")!.innerText = profile.uri;
//   document
//     .getElementById("uri")!
//     .setAttribute("href", profile.external_urls.spotify);
//   document.getElementById("url")!.innerText = profile.href;
//   document.getElementById("url")!.setAttribute("href", profile.href);
//   document.getElementById("imgUrl")!.innerText =
//     profile.images[0]?.url ?? "(no profile image)";

//   console.log(tracks);

//   const names = tracks.items.map((item) => item.name);

//   document.getElementById("tracks")!.innerText = names.join(", ");

//   //   document.getElementById("tracks")!.innerText = tracks.items[0].name;
// }







//On load
//if no accessToken in localStorage - redirect to auth flow
//if accessToken in localStorage - use it and run app
//on logout, clear accessToken from local storage
//set timestamp so that after 1 hour, accessToken is cleared form local storage