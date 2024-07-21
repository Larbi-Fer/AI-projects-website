'use client'

import { convertFileToUrl } from "@lib/utils"
import React, { ChangeEvent, Dispatch, SetStateAction, useEffect, useRef, useState } from "react"

const ImageZone = ({ setImageUrl, AboveImage, UnderImage } : { setImageUrl: Dispatch<SetStateAction<string | null>>, AboveImage?: React.ReactNode, UnderImage?: React.ReactNode }) => {
  const [url, setUrl] = useState('')

  const dropzone = useRef<HTMLInputElement>(null)
  const fileInput = useRef<HTMLInputElement>(null)

  useEffect(() => {

    dropzone.current?.addEventListener('drop', event => {
      console.log('start');

      event.preventDefault();
      event.stopPropagation();
      if (!event.dataTransfer?.files) return
        loadImage(event.dataTransfer.files)
    }, false)

    dropzone.current?.addEventListener('dragenter', e => {
      e.preventDefault()
    })

    dropzone.current?.addEventListener('dragleave', e => {
      e.preventDefault()
    })

    window.addEventListener('dragenter', e => { e.preventDefault() })
    window.addEventListener('dragover', e => { e.preventDefault() })
    window.addEventListener('drop', e => { e.preventDefault() })
  }, [])

  const loadImage = (files: FileList) => {
    let file = files[0];
    if (!file || !file.type.startsWith('image')) return
    
    const url = convertFileToUrl(file);
    setImageUrl(url)
    setUrl(url)
  }

  return (
      <div className="drag-drop" ref={dropzone} onClick={() => fileInput.current?.click()}>
        { url ?
          <>
            {AboveImage}
            <img src={url} alt="" id="image" className="image" />
            {UnderImage}
            <div style={{ backgroundImage: `url(${url})` }} className="show-image"></div>
          </>
          :
          <div className="border">
            <i> <img src="/icons/upload.svg" alt="" /> </i>
            <p>Drag files here</p>
          </div>
        }
        <input type="file" ref={fileInput} style={{ display: 'none' }} accept="image/*" onChange={e => e.target.files && loadImage(e.target.files)} />
      </div>

  )
}

export default ImageZone