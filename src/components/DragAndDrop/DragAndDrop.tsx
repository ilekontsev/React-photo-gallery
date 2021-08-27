import React from "react";

import Story from "../../stories/Story";
import { observer } from "mobx-react";

import style from "../../../styles/Settings.module.sass";
import axios from "axios";

export interface PropsDragAndDrop{
    title: string
}
export interface DescFiles{
    lastModified: number
    lastModifiedDate: Date
    name: string
    size: number
    type: string
}

const DragAndDrop = observer((props: PropsDragAndDrop) => {

    const dragOver = (e: React.DragEvent) => {
        e.preventDefault();
    }

    const dragEnter = (e:React.DragEvent) => {
        e.preventDefault();
    }

    const dragLeave = (e:React.DragEvent) => {
        e.preventDefault();
    }

    const uploadFile = async (file: any) => {
        if(validateFile(file)){
            let formData = new FormData()
            formData.append('image', file)
            await axios.post("http://localhost:5000/save", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }})
        }
    }

    const previewFile = (file: any) => {
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = function(e:any) {
            Story.setImages(e.target.result)
        }
    }

    const handleFiles = (files: any) => {
        files = [...files]
        files.forEach(uploadFile)
        files.forEach(previewFile)
    }

    const validateFile = (file: DescFiles) => {
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        if (validTypes.indexOf(file.type) === -1) {
            return false;
        }
        return true;
    }

    const fileDrop = (e:React.DragEvent) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        if (files.length) {
            handleFiles(files);
        }
    }

    return (
        <div className={style.dragAndDrop} onDragOver={dragOver}
             onDragEnter={dragEnter}
             onDragLeave={dragLeave}
             onDrop={fileDrop}>{props.title}</div>
    )
}
)
export default DragAndDrop;