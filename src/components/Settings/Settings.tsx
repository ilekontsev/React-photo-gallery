import React, { useCallback } from "react";

import Story from "../../stories/Story";
import { observer } from "mobx-react";

import Button from "../Button/Button";
import DragAndDrop from "../DragAndDrop/DragAndDrop";

import { useDebouncedCallback } from "use-debounce";

import style from "../../../styles/Settings.module.sass";

const Settings = observer(() => {

    const debounced = useDebouncedCallback((value, text) => {
        Story.setTextOnServ(value, text)
    }, 400);

    const inputTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        Story.setTitle(e.target.value)
        debounced(e.target.value, "title");
    }

    const inputDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
        Story.setDescription(e.target.value)
        debounced(e.target.value, "desc");
    }

    const deleteAllImg = () => {
        Story.deleteImages()
    }

    return (
        <div className={style.settingsWrap}>
            <div className={style.settingsInputContainer}>
                <input className={style.settingsInput} type="text" onChange={inputTitle} value={Story.title} placeholder="Title"/>
                <input className={style.settingsInput} type="text" onChange={inputDescription} value={Story.description} placeholder="Description"/>
            </div>

            <div>
                <DragAndDrop title="Drag photos here"/>
            </div>

            <Button title="Delete ALL photos" view="danger" action={deleteAllImg}/>
        </div>
    );
})

export default Settings;