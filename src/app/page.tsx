import styles from './page.module.css';
import VideoUploadForm from './VideoUploadForm';

export default function HomePage() {
  return (
    <div className={styles.main}>
      <VideoUploadForm />
    </div>
  );
}
