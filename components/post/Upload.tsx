import Image from "next/image";
import { useState } from "react";
import styles from "./Upload.module.css";

export default function PostUpload() {
  const [src, setSrc] = useState("");

  const encodeFileToBase64 = (fileBlob: Blob) => {
    const reader = new FileReader();

    reader.readAsDataURL(fileBlob);

    return new Promise<void>((resolve) => {
      reader.onload = () => {
        setSrc(reader.result as string);
        resolve();
      };
    });
  };

  return (
    <div id={styles.upload}>
      <div className={styles.fileUploadBox}>
        {!src ? (
          <>
            <input
              type="file"
              id="file-upload"
              accept="image/jpeg,image/jpg,image/gif,image/png"
              onChange={(e) =>
                e.target.files && encodeFileToBase64(e.target.files[0])
              }
            />
            <label htmlFor="file-upload">
              <span>Upload Image</span>
            </label>
          </>
        ) : (
          <Image
            src={src}
            alt="thumbnail"
            width={500}
            height={300}
            objectFit="cover"
            onClick={() => setSrc("")}
          />
        )}
      </div>
      <div className={styles.textUploadBox}>
        <input type="text" placeholder="제목을 입력해 주세요" />
        <textarea name="" id="" placeholder="내용을 입력해 주세요"></textarea>
        <div className={styles.buttonRow}>
          <button>등록하기</button>
          <button>취소</button>
        </div>
      </div>
    </div>
  );
}
