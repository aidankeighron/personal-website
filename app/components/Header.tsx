import css from './css/header.module.css';
import Link from 'next/link';

export default function Header() {
    return (
        <div className={css.header}>
            <div className={css.name}>
                <p>Aidan Keighron</p>
            </div>
            <div className={css.bar}>
                <Link href={'/'}><p className={css.bar}>Home</p></Link>
                <Link href={'/currentprojects'}><p className={css.bar}>Current Projects</p></Link>
                <Link href={'/currentrobots'}><p className={css.bar}>Current Robots</p></Link>
                <Link href={'/aboutme'}><p className={css.bar}>About Me</p></Link>
            </div>
        </div>
    );
};