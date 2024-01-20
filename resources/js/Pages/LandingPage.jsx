import React from "react";
import { router, Link, Head } from "@inertiajs/react";
import Navbar from "../Layouts/Guest/Navbar";
import ImageList from "../Components/ImageList";
import Pagination from "../Components/Pagination";
import { useState } from "react";
import { useEffect } from "react";

export default function LandingPage(props) {
    const [search, setSearch] = useState("");
    // Fungsi untuk melakukan pencarian
    const handleSubmit = (e) => {
        e.preventDefault();

        router.get(`/?search=${search}`);
    };

    return (
        <>
            <Navbar user={props.auth.user} />
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-8 py-6">
                    <label htmlFor="" className="mb-2">
                        Cari Image
                    </label>
                    <form>
                        <label
                            htmlFor="default-search"
                            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                        >
                            Search
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg
                                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                    />
                                </svg>
                            </div>
                            <input
                                type="search"
                                id="default-search"
                                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Search Judul, Author..."
                                autoComplete="off"
                                onChange={(e) => setSearch(e.target.value)}
                                required
                            />
                            <button
                                type="submit"
                                onClick={handleSubmit}
                                className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Search
                            </button>
                        </div>
                    </form>
                </div>
            </header>
            <div className="mx-auto max-w-7xl px-2 py-3 sm:px-6 lg:px-8">
                <ImageList props={props.images} />
            </div>
            <div className="mx-auto flex justify-center max-w-7xl p-5 sm:px-6 lg:px-8">
                <Pagination props={props.images.meta} />
            </div>
            <Head title="Landing Page" />
        </>
    );
}
