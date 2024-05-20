import { redirect } from 'next/navigation';
import cloudinary from '../lib/cloudinary';
import { UploadApiResponse } from 'cloudinary';
import { SubmitButton } from '@/app/submit-button';
import formStyles from './form.module.css';

export default function VideoUploadForm() {
  async function upload(formData: FormData) {
    'use server';

    const file = formData.get('video') as File;
    const start = formData.get('start') as string;
    const end = formData.get('end') as string;

    const buffer: Buffer = Buffer.from(await file.arrayBuffer());

    let url: string = '';

    try {
      const uploadResult: UploadApiResponse = await cloudinary.uploader.upload(
        `data:${file.type};base64,${buffer.toString('base64')}`,
        {
          resource_type: 'video',
          public_id: `video-snippets/${Date.now()}`,
        }
      );

      const snipResult: UploadApiResponse = await cloudinary.uploader.upload(
        uploadResult.secure_url,
        {
          resource_type: 'video',
          transformation: [
            { start_offset: start, end_offset: end },
            { aspect_ratio: '9:16', crop: 'fill' },
          ],
          public_id: `video-snippets/snipped-${Date.now()}`,
        }
      );

      url = snipResult.secure_url;
    } catch (error: any) {
      console.error(error);
    }

    redirect(url);
  }

  return (
    <div className={formStyles['upload-form']}>
      <h2>Upload and Snip Your Video for TikTok</h2>
      <form action={upload}>
        <div className={formStyles['form-group']}>
          <label htmlFor='video'>Upload Video:</label>
          <input type='file' name='video' accept='video/*' required />
        </div>
        <div className={formStyles['form-group']}>
          <label htmlFor='start'>Start Time (seconds):</label>
          <input type='number' name='start' min='0' required />
        </div>
        <div className={formStyles['form-group']}>
          <label htmlFor='end'>End Time (seconds):</label>
          <input type='number' name='end' min='0' required />
        </div>
        <SubmitButton />
      </form>
    </div>
  );
}
