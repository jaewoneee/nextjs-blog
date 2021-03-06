/* eslint-disable react-hooks/rules-of-hooks */
import { gql, useMutation, useQuery } from "@apollo/client";
import Image from "next/image";
import Router from "next/router";
import { useEffect, useState } from "react";
import client from "../../apollo-client";
import styles from "./Upload.module.css";

// 포스트 업로드하기(Create)
const ADD_POST = gql`
  mutation CreatePost($date: String!, $title: String!, $content: String!) {
    createPost(date: $date, title: $title, content: $content) {
      id
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
  const [createPost] = useMutation(ADD_POST);

  const clickHandler = () => {
    createPost({
      variables: {
        date: new Date().toISOString().slice(0, 10).replaceAll("-", "."),
        title,
        content,
      },
      update(cache, { data: createPost }) {
        cache.modify({
          fields: {
            posts(existingPosts = []) {
              return [...existingPosts, createPost];
            },
          },
        });
      },
    });
    Router.push("/list");
  };

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
          <button type="button" onClick={clickHandler}>
            등록하기
          </button>
          <button>취소</button>
        </div>
      </div>
    </div>
  );
}
