import { useQuery } from "react-query";

const fetchMarkers = async () => {
  const response = await fetch(
    "https://anglerkarte-backend.herokuapp.com/api/markers?populate=*"
  );
  if (!response.ok) {
    throw new Error("Network response was not okay");
  }
  return response.json();
};

export const useGetMarkers = () => {
  return useQuery("markers", fetchMarkers);
};
