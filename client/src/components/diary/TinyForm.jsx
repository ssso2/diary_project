import { Editor } from "@tinymce/tinymce-react";
import { useEffect, useRef, useState } from "react";

export default function TinyForm({
    content,
    setContent,
    editorRef,
    imgs,
    setImgs,
}) {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // console.log("업데이트된 값 확인", content, imgs);
    }, [imgs, content]);

    return (
        <div>
            <Editor
                apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
                initialValue={content || ""}
                onInit={(evt, editor) => {
                    editorRef.current = editor;
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
                    // toolbar_mode: "wrap",
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
                            // console.log("reader", reader);
                            reader.onload = function () {
                                const base64 = reader.result;
                                // console.log(reader);
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
                    },
                }}
            />
        </div>
    );
}
