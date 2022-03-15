import { useSelector } from "react-redux";

export const useCarsLoading = () =>
  useSelector((state) => state.cars.isLoading);
