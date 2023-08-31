import React from 'react';
import styles from './Footer.module.css';
import { FaGithub } from 'react-icons/fa'

const FooterSection = () => {
    return (
        <div className={styles.footer}>
            <div className={styles.links}>
                <a href="https://github.com/mzalazar1" target="_blank" rel="noopener noreferrer">
                    <FaGithub className={styles.icon} />
                    <span>https://github.com/mzalazar1</span>
                </a>
            </div>
            <p className={styles.copyRight}>&copy; {new Date().getFullYear()} Marcos Zalazar-TC TD Final</p>
        </div>
    );
}
export default React.memo(FooterSection);