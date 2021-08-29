import React, { useState, useEffect } from "react";
import Story from "../../stories/Story";
import { observer } from "mobx-react";
import axios from "axios"

import Button from "../Button/Button";

import style from "../../../styles/PhotoGallery.module.sass";

const PhotoGallery = observer(() => {

    const [open, setOpen] = useState<boolean>(false)
    const [image, setImage] = useState<string>("")

    useEffect(()=>{
        Story.getData()
    },[])

    const showImage = (image: string) => {
        setImage(image)
        setOpen(!open)
    }

    const backPage = () => {
        Story.changeCount('back')
    }
    const homePage = () => {
        Story.changeCount('home')
    }
    const forwardPage = () => {
        Story.changeCount('forward')
    }

    return(
        <div className={style.photoGalleryWrapper}>
            <div className={style.photoGalleryTitle}>{Story.title}</div>
            <div className={style.photoGallerySubTitle}>{Story.description}</div>

            <div className={style.photoGalleryImagesContainer}>
                {Story.images && Story.images.map((image, index) => (
                    <img key={index + image} className={style.photoGalleryImage} onClick={() => showImage(image)} src={image} alt="img"/>
                ))}
            </div>
            {open && <div className={style.photoGalleryModalContainer} onClick={() => showImage("")}>
                <img className={style.photoGalleryModal} src={image} alt=""/>
            </div>}


            <div className={style.photoGalleryButtonContainer}>
                <Button svg={'back'} disabled={Story.disabledBack} action={backPage} view="light"/>
                <Button svg={'home'} action={homePage} view="light"/>
                <Button svg={'forward'} disabled={Story.disabledForward} action={forwardPage} view="light"/>
            </div>
        </div>
    )
})

export default PhotoGallery;