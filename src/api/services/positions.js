import { useQuery } from "react-query";

const fetchPositions = async () => {
  const response = await fetch(
    "https://anglerkarte-backend.herokuapp.com/api/ways?populate=*"
  );
  if (!response.ok) {
    throw new Error("Network response not okay");
  }
  return response.json();
};

export const useGetPositions = () => {
  return useQuery("positions", fetchPositions);
};
