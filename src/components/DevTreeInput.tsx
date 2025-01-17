import { Switch } from "@headlessui/react";
import { classNames } from "../utils";
import { DevTreeLink } from "../types";
import { ChangeEvent } from "react";

type DevTreeInputProps = {
    link: DevTreeLink
    handleUrlChange: (e: ChangeEvent<HTMLInputElement>) => void
    handleStateClick: (name: DevTreeLink["name"]) => void
}

export default function DevTreeInput({ link, handleUrlChange, handleStateClick }: DevTreeInputProps) {

    return (
        <div className="bg-white shadow-sm flex p-5 items-center gap-3">
            <div className="w-12 h-12 bg-cover" style={{ backgroundImage: `url('/social/icon_${link.name}.svg')`}}></div>
            <input type="text" className="flex-1 border border-gray-100 rounded-lg" value={link.url} onChange={handleUrlChange} name={link.name}/>
            <Switch
                checked={link.enabled}
                onChange={() => handleStateClick(link.name)}
                className={classNames(
                    link.enabled ? 'bg-emerald-500' : 'bg-gray-200',
                    'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                )}
            >
                <span
                    aria-hidden="true"
                    className={classNames(
                        link.enabled ? 'translate-x-5' : 'translate-x-0',
                        'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                    )}
                />
            </Switch>
        </div>
    );
}