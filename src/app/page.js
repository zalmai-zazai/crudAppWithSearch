import Image from 'next/image';
import styles from './page.module.css';
import Posts from './posts/page';

export default function Home() {
  return (
    <div>
      <Posts />
    </div>
  );
}
