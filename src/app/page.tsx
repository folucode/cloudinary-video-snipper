import styles from './page.module.css';
import VideoUploadForm from './VideoUploadForm';

export default function HomePage() {
  return (
    <div className={styles.main}>
      <h2>Upload and Snip Your Video for TikTok</h2>
      <VideoUploadForm />
    </div>
  );
}
