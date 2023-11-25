import { message } from 'antd';
import { RcFile } from 'antd/es/upload';

export const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

export const fileValidate = (
  file: RcFile,
  rule?: {
    fileType?: string[];
    fileTypeMessage?: string;
    fileSize?: number;
    fileSizeMessage?: string;
  },
) => {
  let isValid = true;
  if (rule?.fileType && !rule?.fileType?.includes(file.type)) {
    isValid = false;
    message.error(
      rule?.fileTypeMessage || 'Loại tập tin này không được cho phép!',
    );
  }
  if (rule?.fileSize && file.size / 1024 / 1024 > rule?.fileSize) {
    isValid = false;
    message.error(
      rule?.fileSizeMessage ||
        `Kích thước tập tin vượt quá ${rule?.fileSize} MB!`,
    );
  }

  console.log('check', file, isValid);
  return isValid;
};
