import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";

const fetchName = (token: string) => {
  const { data, isLoading, error } = useQuery<UserProfile>({
    queryKey: ["profileData"],
    queryFn: async () => {
      const response = await fetch("https://api.spotify.com/v1/me", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      return await response.json();
    },
  });

  if (isLoading) return "...Loading";

  if (error || !data) return "error or no data";

  sessionStorage.setItem("user", data.display_name);
  return data.display_name;
};

const getTopSong = (token: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["topSong"],
    queryFn: async () => {
      const response = await fetch(
        "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=1",
        { method: "GET", headers: { Authorization: `Bearer ${token}` } }
      );
      return await response.json();
    },
  });

  if (isLoading) return "...";

  if (error || !data) return error?.message;

  const track = data.items[0].name;
  const artist = data.items[0].artists[0].name;

  return `${track} by ${artist}`;
};

export const Home = ({ accessToken }: { accessToken: string }) => {
  const name = fetchName(accessToken);
  const topSong = getTopSong(accessToken);

  const onLogout = () => {
    window.location.reload();
    localStorage.removeItem("accessToken");
  };

  return (
    <Wrapper>
      <span>
        Hello <Green>{name}</Green>! Your favourite song right now is {topSong}.
      </span>
      <Logout onClick={onLogout}>Logout</Logout>
    </Wrapper>
  );
};

const Green = styled.span`
  color: limegreen;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const Logout = styled.button`
  background: #777777;
`;
