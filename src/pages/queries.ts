import { useQuery } from "@tanstack/react-query";

export const fetchName = (token: string) => {
  const { data, isLoading } = useQuery<UserProfile>({
    queryKey: ["profileData"],
    queryFn: async () => {
      const response = await fetch("https://api.spotify.com/v1/me", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      return await response.json();
    },
  });

  return {
    profile: data,
    profileLoading: isLoading,
  };
};

export const getRecommendations = ({
  token,
  artists,
  tracks,
}: {
  token: string;
  artists: string;
  tracks: string;
}) => {
  const { data, isLoading } = useQuery<Recommendations>({
    queryKey: ["recommendations"],
    queryFn: async () => {
      const res = await fetch(
        `https://api.spotify.com/v1/recommendations?seed_artists=${artists}&seed_tracks=${tracks}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return await res.json();
    },
  });

  return {
    recommendations: data,
    recommendationsLoading: isLoading,
  };
};

const getTopItems = ({
  token,
  type,
  range = "medium_term",
  limit = 20, //range 0-50
  offset = 0,
  queryKey,
}: {
  token: string;
  type: "artists" | "tracks";
  range?: string; //create type;
  limit?: number;
  offset?: number;
  queryKey: string;
}) => {
  const { data, isLoading } = useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const response = await fetch(
        `https://api.spotify.com/v1/me/top/${type}?time_range=${range}&limit=${limit}&offset=${offset}`,
        { method: "GET", headers: { Authorization: `Bearer ${token}` } }
      );
      return await response.json();
    },
  });

  return {
    topItems: data,
    topItemsLoading: isLoading,
  };
};

export const getTopTracks = ({
  token,
  range,
  limit,
  offset,
  queryKey,
}: {
  token: string;
  range?: string; //create type;
  limit?: number;
  offset?: number;
  queryKey: string;
}) =>
  getTopItems({
    token,
    type: "tracks",
    range,
    limit,
    offset,
    queryKey,
  });

export const getTopArtists = ({
  token,
  range,
  limit,
  offset,
  queryKey,
}: {
  token: string;
  range?: string; //create type;
  limit?: number;
  offset?: number;
  queryKey: string;
}) =>
  getTopItems({
    token,
    type: "artists",
    range,
    limit,
    offset,
    queryKey,
  });
