import css from './css/header.module.css';
import Link from 'next/link';

export default function Header() {
    return (
        <div className={css.header}>
            <div className={css.name}>
                <p>Aida Keighron</p>
            </div>
            <div className='horizontal'>
                <Link href={'/'}>Home</Link>
                <Link href={'/currentprojects'}>Current Projects</Link>
                <Link href={'/currentrobots'}>Current Robots</Link>
                <Link href={'/aboutme'}>About Me</Link>
            </div>
        </div>
    );
};