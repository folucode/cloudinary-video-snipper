import { SubmitButton } from '@/app/submit-button';
import formStyles from './form.module.css';

export default function VideoUploadForm() {
  async function upload(formData: FormData) {}

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
