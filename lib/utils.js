import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const getFormatedDate=(d)=>{
  const date = new Date(d);

const day = date.getUTCDate().toString().padStart(2, "0");
const month = date.toLocaleString("en-GB", { month: "long", timeZone: "UTC" });
const year = date.getUTCFullYear();
const hour = date.getUTCHours().toString().padStart(2, "0");
const minute = date.getUTCMinutes().toString().padStart(2, "0");

const formattedUTC = `${day} ${month} ${year}, ${hour}:${minute}`;

return formattedUTC
}