import {
  CreditCardIcon,
  KeyIcon,
  UserCircleIcon,
  UserGroupIcon,
  ViewGridAddIcon,
} from "@heroicons/react/outline";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { useEffect, useState, Fragment } from "react";
import Container from "../components/container";
import SettingsProfile from "./settings-profile";
import useQuery from "../helpers/useQuery";
import SettingsLeague from "./settings-league";
import Navbar from "../components/navbar";

const navigation = [
  { name: "Account", href: "/settings", icon: UserCircleIcon, current: true },
  {
    name: "Koruma Gonca Lig",
    href: "/settings?tab=selectedLeague",
    icon: KeyIcon,
    current: false,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Settings(props) {
  const tab = useQuery("tab");
  const [isProfile, setIsProfile] = useState(true);

  useEffect(() => {
    setIsProfile(tab !== "selectedLeague");
  }, [tab]);

  return (
    <>
      <Navbar />
      <Container className="my-12">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
          <aside className="py-6 px-2 sm:px-6 lg:py-0 lg:px-0 lg:col-span-3">
            <nav className="space-y-1">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-50 text-pink-700 hover:text-pink-700 hover:bg-white"
                      : "text-gray-900 hover:text-gray-900 hover:bg-gray-50",
                    "group rounded-md px-3 py-2 flex items-center text-sm font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  <item.icon
                    className={classNames(
                      item.current
                        ? "text-pink-500 group-hover:text-pink-500"
                        : "text-gray-400 group-hover:text-gray-500",
                      "flex-shrink-0 -ml-1 mr-3 h-6 w-6"
                    )}
                    aria-hidden="true"
                  />
                  <span className="truncate">{item.name}</span>
                </a>
              ))}
            </nav>
          </aside>
          {isProfile ? <SettingsProfile /> : <SettingsLeague />}
        </div>
      </Container>
    </>
  );
}
