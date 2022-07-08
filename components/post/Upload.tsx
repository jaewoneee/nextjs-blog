/* eslint-disable react-hooks/rules-of-hooks */
import { gql, useMutation } from "@apollo/client";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./Upload.module.css";

const M_CREATE = gql`
  mutation CreatePost($date: String!, $title: String!, $content: String!) {
    createPost(date: $date, title: $title, content: $content) {
      date
      title
      content
    }
  }
`;

export default function PostUpload() {
  const [src, setSrc] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [createPost, { data, loading, error }] = useMutation(M_CREATE);

  if (loading) return "Submitting...";
  if (error) return `Submission error! ${error.message}`;
  // if (data) console.log("data=======>", data);

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
          <div className={styles.imageBox} onClick={() => setSrc("")}>
            <Image
              src={src}
              alt="thumbnail"
              objectFit="contain"
              layout="fill"
            />
          </div>
        )}
      </div>
      <div className={styles.textUploadBox}>
        <input
          type="text"
          placeholder="제목을 입력해 주세요"
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          name=""
          id=""
          placeholder="내용을 입력해 주세요"
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <div className={styles.buttonRow}>
          <button
            type="button"
            onClick={() => {
              createPost({
                variables: {
                  date: new Date()
                    .toISOString()
                    .slice(0, 10)
                    .replaceAll("-", "."),
                  title,
                  content,
                },
              });
              console.log(data);
            }}
          >
            등록하기
          </button>
          <button>취소</button>
        </div>
      </div>
    </div>
  );
}
