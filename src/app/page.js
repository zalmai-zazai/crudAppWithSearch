import Image from 'next/image';
import styles from './page.module.css';
import Posts from './posts/page';
import Login from './Login/page';

export default function Home() {
  return (
    <div>
      <Login />
      {/* <Posts /> */}
    </div>
  );
}
