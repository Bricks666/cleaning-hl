import { useCars } from "../../hooks/";
import { useCarsLoading } from "./useCarsLoading";
import { Loading } from "../Loading";
import { Car } from "./Car";

export const Cars = () => {
  const cars = useCars();
  const isLoading = useCarsLoading();

  return (
    <Loading isLoading={isLoading}>
      <ul>
        {cars.map((car) => (
          <li key={car.id}>
            <Car {...car} />
          </li>
        ))}
      </ul>
    </Loading>
  );
};
