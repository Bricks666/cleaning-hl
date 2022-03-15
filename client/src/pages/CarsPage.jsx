import { Cars } from "../components/Cars";
import { AddCarForm } from "../components/AddCarForm";

export const CarsPage = () => {
  return (
    <main>
      <h2>My cars</h2>
      <AddCarForm />
      <Cars />
    </main>
  );
};
