import React from "react";
import { Link, Head } from "@inertiajs/react";

const Navbar = ({ user }) => {
    return (
        <div className="navbar bg-neutral text-neutral-content">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">Gallery CuyUniverse</a>
            </div>
            <div className="flex-none gap-2">
                <div className="dropdown dropdown-end items-center">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost btn-circle avatar item-centers"
                    >
                        <div className="w-10 items-center mt-3 rounded-full">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src="https://picsum.photos/32/32/?random"
                            />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-40"
                    >
                        {!user ? (
                            <li>
                                <Link
                                    href={route("login")}
                                    className="text-gray-700 "
                                >
                                    Login
                                </Link>
                                <Link
                                    href={route("register")}
                                    className="text-gray-700 "
                                >
                                    Register
                                </Link>
                            </li>
                        ) : (
                            <>
                                <li>
                                    <Link
                                        href={route("dashboard")}
                                        className="text-gray-700 "
                                    >
                                        Profile
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={route("dashboard")}
                                        className="text-gray-700 "
                                    >
                                        Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={route("logout")}
                                        method="post"
                                        as="button"
                                        className="text-gray-700 "
                                    >
                                        Logout
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
