import { Fragment, useEffect, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { MenuAlt3Icon, XIcon } from "@heroicons/react/outline";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { getToken } from "../helper";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, logout } from "../actions/auth.action";
import nprogress from "nprogress";

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { inProgressLogout, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  useEffect(async () => {
    await fetchUser()(dispatch);
  }, [searchParams, dispatch]);

  const handleSubmitLogout = async (e) => {
    await logout()(dispatch);
    navigate("/login");
  };

  const navigation = [
    {
      isEnable: true,
      name: "Home",
      href: "/",
    },
    {
      isEnable: user && user.time_schedule_confirguations_count > 0,
      name: "Time Schedule",
      href: "/time-schedule",
    },
    {
      isEnable:
        user &&
        user.time_schedule_confirguations_count > 0 &&
        user.time_schedules_count > 0,
      name: "Bus Schedule",
      href: "/bus-schedule",
    },
    {
      isEnable:
        user &&
        user.time_schedule_confirguations_count > 0 &&
        user.time_schedules_count > 0 &&
        user.bus_schedules_count > 0,
      name: "Show Movie Time",
      href: "/show-movie",
    },
  ];

  return (
    <>
      <div className="h-full ">
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 flex z-40 justify-end  lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-opacity-75" />
            </Transition.Child>
            <div className="flex-shrink-0 w-14 " aria-hidden="true">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="-translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="relative flex-1 h-full mt-16 flex flex-col max-w-xs w-full ">
                <div
                  aria-label="Sidebar"
                  className="h-full bg-white text-primary flex flex-col shadow-md"
                >
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className="flex flex-col  overflow-y-auto py-2">
                    <nav
                      className="flex-1 flex flex-col overflow-y-auto"
                      aria-label="Sidebar"
                    >
                      <div className="">
                        {navigation.map((item) => (
                          <Link
                            to={item.isEnable ? item.href : "#"}
                            key={item.name}
                            onClick={(e) => {
                              setSidebarOpen(false);
                            }}
                            className={`group flex items-center py-2 text-sm leading-6 outline-none border-none  px-2 pl-7 ${
                              location.pathname === item.href
                                ? " text-primary"
                                : "text-black"
                            }`}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </nav>
                  </div>

                  <div className="flex-1 flex flex-col h-full gap-4 py-4 items-center">
                    <div className="flex gap-2">
                      <button
                        disabled={inProgressLogout}
                        className="bg-primary text-white  px-3 py-2  rounded-lg  cursor-pointer  uppercase inline-flex gap-2 justify-center items-center"
                        onClick={handleSubmitLogout}
                      >
                        {inProgressLogout && (
                          <svg
                            role="status"
                            className="inline mr-3 w-4 h-4 text-white animate-spin"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                              fill="#E5E7EB"
                            />
                            <path
                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                              fill="currentColor"
                            />
                          </svg>
                        )}
                        Logout
                      </button>
                    </div>
                    <div className="flex gap-2  h-8 justify-center"></div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </Dialog>
        </Transition.Root>

        <div className="flex w-full h-full flex-col">
          <div className="z-10 flex-shrink-0 fixed w-full flex items-center justify-between h-16  bg-white text-primary shadow-md">
            <div className="h-10 w-80 text-3xl font-extrabold uppercase ml-7">
              <Link to="/">Show Flim</Link>
            </div>
            <div className="flex-1 sm:flex justify-end items-center hidden mr-10">
              {navigation.map((item) => (
                <Link
                  to={item.isEnable ? item.href : "#"}
                  key={item.name}
                  onClick={(e) => {
                    setSidebarOpen(false);
                  }}
                  className={`group flex items-center py-2 text-base leading-6 outline-none border-none  px-2 pl-7 ${
                    location.pathname === item.href
                      ? " text-primary"
                      : "text-black"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <button
                disabled={inProgressLogout}
                className="bg-primary ml-10 text-white  px-3 py-2  rounded-lg  cursor-pointer  uppercase inline-flex gap-2 justify-center items-center"
                onClick={handleSubmitLogout}
              >
                {inProgressLogout && (
                  <svg
                    role="status"
                    className="inline mr-3 w-4 h-4 text-white animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#E5E7EB"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                    />
                  </svg>
                )}
                Logout
              </button>
            </div>
            <div className="lg:hidden flex justify-center gap-2 items-center mr-2">
              <div
                onClick={() => {
                  setSidebarOpen(!sidebarOpen);
                }}
              >
                {sidebarOpen ? (
                  <XIcon className="text-secondary-light h-10 w-10" />
                ) : (
                  <MenuAlt3Icon className="text-secondary-light h-10 w-10" />
                )}
              </div>
            </div>
          </div>
          <div className="h-full main w-full mt-16 lg:mt-20">
            <main className="h-full w-full">{children}</main>
          </div>
        </div>
      </div>
    </>
  );
}
