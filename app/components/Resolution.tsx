import React from 'react';
import type { ResolutionProp } from "~/routes/resolutions";

interface ResolutionListProps {
    resolution: ResolutionProp;
}

const Resolution = ({ resolution }: ResolutionListProps) => {
    return (
        <div className="flex flex-row items-center justify-between p-4 bg-white rounded-lg shadow-md">
            <div className="flex justify-center items-center space-x-2">
                <p className="text-gray-500">{resolution.year}</p>
                <h2 className="text-lg text-gray-500 font-semibold">{resolution.resolution}</h2>
            </div>
            <div className="flex items-center">
                <input
                    type="checkbox"
                    checked={resolution.isComplete}
                    readOnly
                    className="mr-2"
                />
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                    Edit
                </button>
                <button className="bg-red-500 text-white px-4 py-2 rounded-md ml-2">
                    Delete
                </button>
            </div>
        </div>
    );
};

export default Resolution;