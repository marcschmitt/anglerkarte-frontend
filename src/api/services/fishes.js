import { useQuery } from "react-query";

const fetchFishes = async () => {
  const response = await fetch(
    "https://anglerkarte-backend.herokuapp.com/api/fishes?sort[0]=name%3Aasc"
  );
  if (!response.ok) {
    throw new Error("Network response was not okay");
  }
  return response.json();
};

export const useGetFishes = () => {
  return useQuery("fishes", fetchFishes);
};
