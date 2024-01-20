import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, Link } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";

const EditImage = (props) => {
    const [image_name, setImageName] = useState("");
    const [image_description, setImageDescription] = useState("");
    const [image_category, setImageCategory] = useState("");
    const [image_path, setImagePath] = useState("");
    const [isNotif, setNotif] = useState(false);
    const { flash } = usePage().props;

    useEffect(() => {
        setImageName(props.editImage.image_name);
        setImageDescription(props.editImage.image_description);
        setImageCategory(props.editImage.image_category);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append("id", props.editImage.id);
        formData.append("image_name", image_name);
        formData.append("image_description", image_description);
        formData.append("image_path", image_path);

        router.post("/upload/update", formData);
        setNotif(true);
        // setImageCategory("");
    };

    console.log(props);
    return (
        <AuthenticatedLayout
            user={props.auth}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Edit Data
                </h2>
            }
        >
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden border-gray-200 shadow-sm sm:rounded-lg p-6">
                        <input
                            type="text"
                            name="image_name"
                            placeholder="Judul"
                            onChange={(e) => setImageName(e.target.value)}
                            defaultValue={props.editImage.image_name}
                            className="input input-bordered w-full my-2"
                        />
                        <input
                            type="text"
                            name="image_description"
                            onChange={(e) =>
                                setImageDescription(e.target.value)
                            }
                            defaultValue={props.editImage.image_description}
                            placeholder="Deskripsi"
                            className="input input-bordered  w-full my-2"
                        />
                        <input
                            type="file"
                            name="image_path"
                            onChange={(e) => setImagePath(e.target.files[0])}
                            placeholder="Image Path"
                            className="input input-bordered  w-full my-2"
                        />
                        <div className="row">
                            <div className="flex">
                                <Link
                                    className="btn btn-primary my-2 "
                                    href="/dashboard"
                                >
                                    KEMBALI
                                </Link>
                                <button
                                    onClick={handleSubmit}
                                    className="btn btn-primary my-2 mx-2"
                                >
                                    SUBMIT
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Head title="Dashboard" />
        </AuthenticatedLayout>
    );
};

export default EditImage;
