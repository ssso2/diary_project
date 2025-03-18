import { Editor } from "@tinymce/tinymce-react";
import { useEffect, useRef, useState } from "react";

export default function TinyForm({
    content,
    setContent,
    editorRef,
    imgs,
    setImgs,
}) {
    // const editorRef = useRef(null);

    const [isLoaded, setIsLoaded] = useState(false);

    // if (editorRef.current) {
    //     console.log("내용", editorRef.current.getContent());
    // }

    // const EditorChange = newContent => {
    //     const tempDiv = document.createElement("div"); //문자열 임시 DOM 객체로 변환
    //     tempDiv.innerHTML = newContent;
    //     const imgArr = tempDiv.querySelectorAll("img"); //이미지 태그 찾기

    //     const base64Images = Array.from(imgArr)
    //         .map(img => img.src)
    //         .filter(src => src.startsWith("data:image")); //base64 필터링

    //     setImgs(base64Images); // 이미지 따로 업데이트
    //     setContent(newContent); // 전체 HTML 저장
    // };

    useEffect(() => {
        console.log("업데이트된 값 확인", content, imgs);
    }, [imgs, content]);

    return (
        <div>
            <Editor
                apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
                initialValue={content || ""}
                onInit={(evt, editor) => {
                    editorRef.current = editor;
                    // setIsLoaded(true);
                }}
                //수정 핸들러
                // onEditorChange={EditorChange}
                init={{
                    height: 500,
                    menubar: false,
                    placeholder:
                        "내용을 입력해주세요. (이미지는 한번에 최대 5개까지 첨부할 수 있습니다)",
                    plugins: [
                        "advlist",
                        "autolink",
                        "lists",
                        "link",
                        "image",
                        "charmap",
                        "table",
                        "wordcount",
                        // "paste",
                    ],

                    paste_as_text: false,
                    paste_data_images: true,
                    toolbar:
                        "image | " +
                        "blocks |" +
                        "bold italic forecolor | alignleft aligncenter " +
                        "alignright alignjustify | bullist numlist outdent indent | " +
                        "emotions | " +
                        "undo redo |  ",
                    content_style:
                        "body { font-family:Helvetica,Arial,sans-serif; font-size:14px; padding: 12px; }",

                    a11y_advanced_options: true, // 접근성고려
                    file_picker_types: "image",
                    // automatic_uploads: true,
                    images_upload_max_filesize: 5 * 1024 * 1024, // 5MB
                    image_title: true,
                    automatic_uploads: false, // images_upload_handler와 같이 사용해야함

                    //이미지 미리보기
                    file_picker_callback: (callback, value, meta) => {
                        //input 생성후 클릭
                        const input = document.createElement("input");
                        input.setAttribute("type", "file");
                        input.setAttribute("accept", "image/*");
                        input.click();

                        input.onchange = function () {
                            const file = input.files[0];
                            const reader = new FileReader();
                            console.log("reader", reader);
                            reader.onload = function () {
                                const base64 = reader.result;
                                console.log(reader);
                                if (editorRef.current) {
                                    const blobCache =
                                        editorRef.current.editorUpload
                                            .blobCache;
                                    const id = "blobid" + new Date().getTime();
                                    const blobInfo = blobCache.create(
                                        id,
                                        file,
                                        base64
                                    );
                                    blobCache.add(blobInfo);
                                    callback(blobInfo.blobUri(), {
                                        title: file.name,
                                    });
                                    setImgs(prev => [...prev, base64]);
                                }
                            };
                            reader.readAsDataURL(file);
                        };
                        //다시오류
                        // input.onchange = function () {
                        //     const file = input.files[0];
                        //     if (!file) return;

                        //     //에디터 내부저장
                        //     if (editorRef.current) {
                        //         const blobCache =
                        //             editorRef.current.editorUpload.blobCache;
                        //         const id = "blobid" + new Date().getTime();
                        //         const blobInfo = blobCache.create(id, file);
                        //         blobCache.add(blobInfo);
                        //         callback(blobInfo.blobUri(), {
                        //             title: file.name,
                        //         });
                        //     }

                        //     // 이미지관리용 FileReader 따로 분리
                        //     const reader = new FileReader();
                        //     reader.onload = function () {
                        //         const base64 = reader.result;
                        //         setImgs(prev => [...prev, base64]);
                        //     };
                        //     reader.readAsDataURL(file);
                        // };
                    },

                    // 이미지 업로드 핸들러
                    // images_upload_handler: null,
                    // images_upload_handler: async (blobInfo, progress) => {
                    //     try {
                    //         const formData = new FormData();
                    //         formData.append(
                    //             "file",
                    //             blobInfo.blob(), // 파일 데이터
                    //             blobInfo.filename()
                    //         );

                    //         const config = {
                    //             headers: {
                    //                 "Content-Type": "multipart/form-data",
                    //             },
                    //             // onUploadProgress: progressEvent => {
                    //             //     const percentCompleted = Math.round(
                    //             //         (progressEvent.loaded * 100) /
                    //             //             progressEvent.total
                    //             //     );
                    //             //     progress(percentCompleted);
                    //             // },
                    //         };

                    //         const response = await axios.post(
                    //             `${URL}/diary/upload`,
                    //             formData,
                    //             config
                    //         );

                    //         // 성공하면 URL 반환
                    //         return response.data.location;
                    //     } catch (error) {
                    //         // 오류 처리
                    //         if (error.response) {
                    //             throw `서버 에러: ${error.response.status}`;
                    //         } else if (error.request) {
                    //             throw "서버에서 응답이 없습니다.";
                    //         } else {
                    //             throw `오류 발생: ${error.message}`;
                    //         }
                    //     }
                    // }
                }}
            />
        </div>
    );
}
