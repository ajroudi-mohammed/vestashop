
import { faDesktop, faMobileAlt, faTabletAlt } from '@fortawesome/free-solid-svg-icons';

const activityOverview = [
    { id: 1, label: "Online visitors", value: 60, color: "secondary", icon: faDesktop },
    { id: 2, label: "Active carts", value: 30, color: "primary", icon: faMobileAlt },
];

const totalOrders = [
    { id: 1, label: "July", value: [1, 5, 2, 5, 4, 3], color: "primary" },
    { id: 2, label: "August", value: [2, 3, 4, 8, 1, 2], color: "secondary" }
];

export {
    activityOverview,
    totalOrders
};