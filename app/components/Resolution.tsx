import { Form, useSubmit } from '@remix-run/react';
import React, { ChangeEventHandler } from 'react';
import type { ResolutionProp } from "~/routes/resolutions";

interface ResolutionListProps {
    resolution: ResolutionProp;
}

const Resolution = ({ resolution }: ResolutionListProps) => {
    const submit = useSubmit()

    const handleChange: ChangeEventHandler<HTMLFormElement> = event => {
        submit(event.currentTarget)
    }

    return (
        <div className="flex flex-row items-center justify-between p-4 bg-gray-800 rounded-lg shadow-md">
            <div className="flex justify-center items-center space-x-2">
                <p className="text-gray-500">{resolution.year}</p>
                <h2 className={`text-lg text-gray-500 font-semibold ${resolution.isComplete ? "line-through" : "no-underline"}`}>
                    {resolution.resolution}
                </h2>
            </div>
            <div className="flex items-center">
                <Form method='post' onChange={handleChange}>
                    <input
                        type="checkbox"
                        name='isComplete'
                        id='isComplete'
                        checked={resolution.isComplete}
                        readOnly
                        className="mr-2"
                    />
                    <input type="hidden" name="id" value={resolution.id} />
                    <input type="hidden" name="action" value="toggleCompletion" />
                </Form>

                <Form method='post'>
                    <button
                        type='submit'
                        name='action'
                        value='deleteResolution'
                        className="bg-red-500 text-white px-4 py-2 rounded-md ml-2"
                    >
                        Delete
                    </button>
                    <input type="hidden" name="id" value={resolution.id} />
                </Form>
            </div>
        </div>
    );
};

export default Resolution;