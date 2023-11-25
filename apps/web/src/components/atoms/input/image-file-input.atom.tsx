import { fileValidate, getBase64 } from '@shopizer/utils/file';
import { Upload, UploadProps, notification } from 'antd';
import ImgCrop from 'antd-img-crop';
import { RcFile, UploadChangeParam, UploadFile } from 'antd/es/upload';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { on } from 'events';
import { useState } from 'react';
import { fetcher } from '@shopizer/apis/fetcher';
import { BACKEND_DOMAIN } from '@shopizer/constants';
interface AImageFileInputProps {
  value?: any;
  onChange?: any;
  apiEndpoint: string;
  count?: number;
  name: string;
}
export function AImageFileInput(props: AImageFileInputProps) {
  const token = localStorage.getItem('accessToken') || null;

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const beforeUpload = (file: RcFile) => {
    return fileValidate(file, {
      fileSize: 2,
      fileType: ['image/png', 'image/jpeg', 'image/jpg'],
      fileTypeMessage: 'Chỉ hỗ trợ định dạng ảnh png, jpg, jpeg',
    });
  };
  return (
    <ImgCrop rotationSlider>
      <Upload
        listType="picture-card"
        className="avatar-uploader"
        accept="image/*"
        fileList={props.value || []}
        onRemove={(file) =>
          props.onChange(
            props.value.filter((item: any) => item.uid !== file.uid),
          )
        }
        beforeUpload={beforeUpload}
        disabled={loading}
        customRequest={async ({ file, onSuccess, onError }) => {
          const formData = new FormData();
          formData.append(props.name, file);
          setLoading(true);
          const res = await fetcher(props.apiEndpoint, formData, 'POST');
          if (!res.errorStatusCode) {
            onSuccess?.(res, file as any);
            props.onChange([
              ...(props.value || []),
              {
                uid: res?.file?.filename,
                name: res?.file?.filename,
                status: 'done',
                url: BACKEND_DOMAIN + res?.file?.path?.slice(6),
              },
            ]);
          } else {
            onError?.(res.err);
          }
          setLoading(false);
        }}
      >
        {(props.value?.length || 0) < (props.count || 1) && (
          <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>
              Upload
              {props.count && props.count > 1
                ? ` (${props.value?.length || 0}/${props.count})`
                : ''}
            </div>
          </div>
        )}
      </Upload>
    </ImgCrop>
  );
}
