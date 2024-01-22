import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, Link } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";

export default function Dashboard(props) {
    const [image_name, setImageName] = useState("");
    const [image_description, setImageDescription] = useState("");
    const [image_category, setImageCategory] = useState("");
    const [image_path, setImagePath] = useState("");
    const [isNotif, setNotif] = useState(false);
    const { flash } = usePage().props;


    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image_name", image_name);
        formData.append("image_description", image_description);
        // formData.append("image_category", image_category);
        formData.append("image_path", image_path);

        router.post("/CuyGallery/public/upload", formData);
        setNotif(true);
        // setImageCategory("");
        setImageDescription("");
        setImageName("");
        setImagePath("");
    };

    return (
        <AuthenticatedLayout
            user={props.auth}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden border-gray-200 shadow-sm sm:rounded-lg p-6">
                        {isNotif ? (
                            <div role="alert" className="alert">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    className="stroke-info shrink-0 w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    ></path>
                                </svg>
                                <span>{flash.message}</span>
                            </div>
                        ) : (
                            ""
                        )}
                        <input
                            type="text"
                            name="image_name"
                            placeholder="Judul"
                            onChange={(e) => setImageName(e.target.value)}
                            className="input input-bordered w-full my-2"
                        />
                        <input
                            type="text"
                            name="image_description"
                            onChange={(e) =>
                                setImageDescription(e.target.value)
                            }
                            placeholder="Deskripsi"
                            className="input input-bordered  w-full my-2"
                        />
                        <input
                            type="file"
                            className="input input-bordered  w-full my-2"
                            label="File"
                            name="file"
                            onChange={(e) => setImagePath(e.target.files[0])}
                        />
                        <button
                            onClick={handleSubmit}
                            className="btn btn-primary my-2"
                        >
                            SUBMIT
                        </button>
                    </div>
                    <div className="mt-5">
                        <h1 className="font-semibold text-xl text-gray-800 ">
                            Image List
                        </h1>
                        <div
                            className="w-full"
                            style={{
                                height: "1px",
                                backgroundColor: "gray",
                            }}
                        ></div>
                        <div className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
                            <ImageList
                                auth={props.auth}
                                props={props.images.data}
                            />
                        </div>
                    </div>
                    <div className="mx-auto flex justify-center max-w-7xl p-5 xs:px-4 sm:px-6 lg:px-8">
                        <Pagination props={props.images.meta} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

const ImageList = ({ props, auth }) => {
    return (
        <>
            {props.map(
                (image, i) => (
                    console.log(image.image_path),
                    (
                        <div
                            className="w-85 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
                            key={i}
                        >
                            <figure>
                                <img
                                    src={
                                        `http://siswa.smkn6jember.net/CuyGallery/public/uploads/` +
                                        image.image_path
                                    }
                                    alt="Shoes"
                                    style={{ height: "auto" }}
                                />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">
                                    {image.image_name}
                                </h2>
                                <p>{image.image_description}</p>

                                <div className="flex justify-between">
                                    <div>
                                        <Link
                                            href={route("edit")}
                                            data={{ id: image.id }}
                                            method="get"
                                            as="button"
                                            className="btn btn-primary btn-sm mr-2"
                                        >
                                            edit
                                        </Link>
                                        <Link
                                            href={route("delete")}
                                            data={{ id: image.id }}
                                            method="post"
                                            as="button"
                                            className="btn btn-danger btn-sm"
                                        >
                                            delete
                                        </Link>
                                    </div>
                                    <footer className="flex justify-between ">
                                        <a
                                            className="flex items-center no-underline hover:underline text-black"
                                            href="#"
                                        >
                                            <img
                                                alt="Placeholder"
                                                className="block rounded-full"
                                                src="https://picsum.photos/32/32/?random"
                                            />
                                            <p className="ml-2 text-sm">
                                                Author : {auth.name}
                                            </p>
                                        </a>
                                        <a
                                            className="no-underline text-grey-darker hover:text-red-dark"
                                            href="#"
                                        >
                                            <span className="hidden">Like</span>
                                            <i className="fa fa-heart"></i>
                                        </a>
                                    </footer>
                                </div>
                            </div>
                        </div>
                    )
                )
            )}
        </>
    );
};
