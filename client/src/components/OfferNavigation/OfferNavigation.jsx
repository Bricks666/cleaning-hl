import { NavLink } from "react-router-dom";
import { WorkerNavigation } from "../WorkerNavigation";

const navigation = [
  {
    path: "sended",
    label: "Sended offers",
  },
];

const workerNavigation = [
  {
    path: "received",
    label: "Received offers",
  },
];

export const OfferNavigation = () => {
  return (
    <ul>
      {navigation.map(({ path, label }) => (
        <li key={path}>
          <NavLink to={path}>{label}</NavLink>
        </li>
      ))}
      <WorkerNavigation>
        {workerNavigation.map(({ path, label }) => (
          <li key={path}>
            <NavLink to={path}>{label}</NavLink>
          </li>
        ))}
      </WorkerNavigation>
    </ul>
  );
};
