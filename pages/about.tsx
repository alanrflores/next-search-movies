import PageLayout from '@/components/PageLayout';
import styles from '@/styles/Home.module.css'
export default function About() {
  return (
    <PageLayout title='Next - About'>
    <div className={styles.main}>
      <h2>Esta pagina se trata de un test en Next Js</h2>
    </div>
    </PageLayout>
  );
}
