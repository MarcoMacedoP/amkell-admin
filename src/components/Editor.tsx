import React from "react";

import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials";
import Autoformat from "@ckeditor/ckeditor5-autoformat/src/autoformat";
import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold";
import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic";
import EasyImage from "@ckeditor/ckeditor5-easy-image/src/easyimage";
import Heading from "@ckeditor/ckeditor5-heading/src/heading";
import ImageUpload from "@ckeditor/ckeditor5-image/src/imageupload";
import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph";
import Ckeditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import Base64UploadAdapter from "@ckeditor/ckeditor5-upload/src/adapters/base64uploadadapter";
import Image from "@ckeditor/ckeditor5-image/src/image";
import ImageToolbar from "@ckeditor/ckeditor5-image/src/imagetoolbar";
import ImageCaption from "@ckeditor/ckeditor5-image/src/imagecaption";
import ImageStyle from "@ckeditor/ckeditor5-image/src/imagestyle";

const editorConfigurationBase = {
  plugins: [
    Essentials,
    Bold,
    Italic,
    Paragraph,
    Autoformat,
    Image,
    EasyImage,
    Heading,
  ],
  image: {
    toolbar: [
      "imageTextAlternative",
      "|",
      "imageStyle:full",
      "imageStyle:side",
    ],
  },
  toolbar: ["heading", "|", "bold", "italic"],
};

const editorConfigurationWithImage = {
  ...editorConfigurationBase,
  plugins: [
    ...editorConfigurationBase.plugins,
    ImageCaption,
    ImageStyle,
    ImageToolbar,
    ImageUpload,
    Base64UploadAdapter,
  ],
  toolbar: ["heading", "|", "bold", "italic", "imageUpload"],
};
type EditorProps = {
  value: any;
  onChange: (data: any) => void;
  canAddImage?: boolean;
};
export const Editor = ({ onChange, value }: EditorProps) => (
  <Ckeditor
    config={editorConfigurationBase}
    editor={ClassicEditor}
    onChange={(event: any, editor: any) => onChange(editor.getData())}
    data={value}
  />
);
