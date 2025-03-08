import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import { useRef, useState } from "react";

export default function TinyForm() {
    const URL = process.env.REACT_APP_BACK_URL;
    const [content, setcontent] = useState("");
    const editorRef = useRef(null);
    if (editorRef.current) {
        console.log("내용", editorRef.current.getContent());
    }
    return (
        <div>
            <Editor
                apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
                initialValue=""
                onInit={(_evt, editor) => (editorRef.current = editor)}
                init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                        "advlist",
                        "autolink",
                        "lists",
                        "link",
                        "image",
                        "charmap",
                        "table",
                        "wordcount",
                        "paste",
                    ],
                    paste_data_images: true,
                    paste_as_text: false,
                    toolbar:
                        "image | " +
                        "blocks |" +
                        "bold italic forecolor | alignleft aligncenter " +
                        "alignright alignjustify | bullist numlist outdent indent | " +
                        "emotions | " +
                        "undo redo |  ",
                    content_style:
                        "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                    a11y_advanced_options: true, // 접근성고려
                    file_picker_types: "image",
                    images_upload_max_filesize: 5 * 1024 * 1024, // 5MB
                    // 이미지 업로드 핸들러
                    images_upload_handler: async (blobInfo, progress) => {
                        try {
                            const formData = new FormData();
                            formData.append(
                                "file",
                                blobInfo.blob(), // 파일 데이터
                                blobInfo.filename()
                            );

                            const config = {
                                headers: {
                                    "Content-Type": "multipart/form-data",
                                },
                                // onUploadProgress: progressEvent => {
                                //     const percentCompleted = Math.round(
                                //         (progressEvent.loaded * 100) /
                                //             progressEvent.total
                                //     );
                                //     progress(percentCompleted);
                                // },
                            };

                            const response = await axios.post(
                                `${URL}/diary/upload`,
                                formData,
                                config
                            );

                            // 성공하면 URL 반환
                            return response.data.location;
                        } catch (error) {
                            // 오류 처리
                            if (error.response) {
                                throw `서버 에러: ${error.response.status}`;
                            } else if (error.request) {
                                throw "서버에서 응답이 없습니다.";
                            } else {
                                throw `오류 발생: ${error.message}`;
                            }
                        }
                    },
                }}
            />
        </div>
    );
}
