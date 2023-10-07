"use client";

import { useState, useEffect } from "react";
import Avatar from "react-avatar-edit";

const UploadAvatar = ({avatarChange}) => {
  const [src, setSrc] = useState(null);
  const [preview, setPreview] = useState(null);


  const onClose = () => {
    setPreview(null);
  };

  const onCrop = (view) => {
    setPreview(view);
    
    avatarChange(preview)
  };

  useEffect(() => {
  }, [preview]);

  return (
    <div>
      <Avatar
        width={150}
        height={150}
        label={"Выберите изображение"}
        labelStyle={{
          fontSize: "10px",
          paddinRight: "20px"
        }}
        onCrop={onCrop}
        onClose={onClose}
        src={src}
      />
    </div>
  );
};

export { UploadAvatar };
