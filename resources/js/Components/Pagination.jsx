import React from "react";
import { Link, Head } from "@inertiajs/react";

const Pagination = ({ props }) => {
    const prev = props.links[0].url;
    const next = props.links[props.links.length - 1].url;
    const current_page = props.current_page;
    return (
        <div className="join">
            {prev && (
                <Link href={prev} className="join-item btn">
                    «
                </Link>
            )}
            <button className="join-item btn">Page {current_page}</button>
            {next && (
                <Link href={next} className="join-item btn">
                    »
                </Link>
            )}
        </div>
    );
};

export default Pagination;
